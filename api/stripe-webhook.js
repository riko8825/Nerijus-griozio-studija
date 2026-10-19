// Stripe webhook — užsakymo įvykdymas po apmokėjimo.
// Parašas tikrinamas rankiniu būdu (HMAC-SHA256, v1 schema, 5 min tolerancija) — be npm priklausomybių.
// Įvykdymas: viena Sanity transakcija = sukuriamas `order` dokumentas (be asmens duomenų) + sumažinamas `stock`.
// Tas pats session.id antrą kartą → `orders.<id>` jau yra → transakcija atmetama → likutis nemažinamas du kartus.
// Test režimo (livemode=false) pirkimai įrašomi, bet tikro likučio nemažina.
// Env: STRIPE_WEBHOOK_SECRET (whsec_…), STRIPE_SECRET_KEY, SANITY_WRITE_TOKEN — visi Vercel, Sensitive.

const crypto = require('crypto');

const SANITY_BASE = 'https://vwtjc4wg.api.sanity.io/v2026-01-01/data';
const STRIPE_VERSION = '2026-08-26.dahlia';
const TOLERANCE_SEC = 300;
const ID_RE = /^[\w-]{1,100}$/;
const VARIANT_RE = /^[\w-]{1,64}$/;

// Vercel req.body parsinamas tik jį perskaičius (getter) — todėl skaitom žalią srautą ir req.body neliečiam.
// https://vercel.com/docs/functions/runtimes/node-js
function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(typeof c === 'string' ? Buffer.from(c) : c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function verifySignature(rawBody, header, secret, nowSec = Math.floor(Date.now() / 1000)) {
  if (!header) return false;
  let timestamp = NaN;
  const signatures = [];
  for (const part of header.split(',')) {
    const [prefix, value] = part.split('=');
    if (prefix === 't') timestamp = /^\d+$/.test(value) ? Number(value) : NaN;
    else if (prefix === 'v1' && /^[0-9a-f]{64}$/.test(value || '')) signatures.push(value);
  }
  if (!Number.isInteger(timestamp) || signatures.length === 0) return false;
  if (Math.abs(nowSec - timestamp) > TOLERANCE_SEC) return false;

  const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.${rawBody.toString('utf8')}`).digest();
  return signatures.some((sig) => crypto.timingSafeEqual(Buffer.from(sig, 'hex'), expected));
}

function sanityHeaders() {
  return {Authorization: `Bearer ${process.env.SANITY_WRITE_TOKEN}`, 'Content-Type': 'application/json'};
}

// metadata.items = "sanityId:qty[:variantKey],..." (nustato api/checkout.js); jei nėra — imam iš line_items.
async function getOrderItems(session) {
  const meta = session.metadata?.items;
  let items;
  if (meta) {
    items = meta.split(',').map((part) => {
      const [productId, qty, variantKey] = part.split(':');
      return {productId, quantity: Number(qty), variantKey: variantKey || null};
    });
  } else {
    const url = `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(session.id)}/line_items?limit=100&expand[]=data.price.product`;
    const res = await fetch(url, {
      headers: {Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Stripe-Version': STRIPE_VERSION},
    });
    if (!res.ok) throw new Error(`Stripe line_items ${res.status}`);
    const data = await res.json();
    items = data.data.map((li) => ({
      productId: li.price?.product?.metadata?.sanity_id,
      quantity: li.quantity,
      variantKey: li.price?.product?.metadata?.variant_key || null,
    }));
  }
  return items.filter(
    (i) =>
      ID_RE.test(i.productId || '') &&
      Number.isInteger(i.quantity) &&
      i.quantity > 0 &&
      (i.variantKey === null || VARIANT_RE.test(i.variantKey)),
  );
}

// Publikuotas produktas ir jo Studio juodraštis (drafts.<id>) — abu turi gauti tą patį sumažinimą,
// kitaip juodraščio publikavimas perrašytų likutį.
async function fetchStockDocs(productIds) {
  const ids = productIds.flatMap((id) => [id, `drafts.${id}`]);
  const query = '*[_id in $ids]{_id, stock, "variants": variants[]{_key, stock}}';
  const url = `${SANITY_BASE}/query/production?query=${encodeURIComponent(query)}&%24ids=${encodeURIComponent(JSON.stringify(ids))}&perspective=raw`;
  const res = await fetch(url, {headers: sanityHeaders()});
  if (!res.ok) throw new Error(`Sanity query ${res.status}`);
  const data = await res.json();
  return new Map((data.result || []).map((d) => [d._id, d]));
}

async function mutate(mutations, returnDocuments = false) {
  const url = `${SANITY_BASE}/mutate/production${returnDocuments ? '?returnDocuments=true' : ''}`;
  const res = await fetch(url, {method: 'POST', headers: sanityHeaders(), body: JSON.stringify({mutations})});
  const text = await res.text();
  return {ok: res.ok, status: res.status, text};
}

// Ar dokumente yra ką mažinti: variantas su skaitiniu likučiu arba produkto likutis.
function hasStockTarget(doc, variantKey) {
  if (!variantKey) return typeof doc.stock === 'number';
  return (doc.variants || []).some((v) => v && v._key === variantKey && typeof v.stock === 'number');
}

async function fulfillOrder(session) {
  const orderId = `orders.${session.id}`;
  const items = await getOrderItems(session);
  const adjustStock = Boolean(session.livemode);
  const docs = adjustStock ? await fetchStockDocs(items.map((i) => i.productId)) : new Map();

  const patches = [];
  const missing = [];
  for (const {productId, quantity, variantKey} of items) {
    const published = docs.get(productId);
    const label = variantKey ? `${productId}:${variantKey}` : productId;
    if (adjustStock && !(published && hasStockTarget(published, variantKey))) missing.push(label);
    for (const doc of [published, docs.get(`drafts.${productId}`)]) {
      if (!doc || !hasStockTarget(doc, variantKey)) continue;
      const path = variantKey ? `variants[_key=="${variantKey}"].stock` : 'stock';
      patches.push({patch: {id: doc._id, dec: {[path]: quantity}}});
    }
  }

  const order = {
    _id: orderId,
    _type: 'order',
    stripeSessionId: session.id,
    paymentIntent: session.payment_intent || null,
    livemode: Boolean(session.livemode),
    stockAdjusted: adjustStock,
    delivery: session.metadata?.delivery === 'pickup' ? 'pickup' : 'ship',
    amountTotal: (session.amount_total || 0) / 100,
    currency: session.currency,
    items: items.map((i) => ({
      _key: crypto.createHash('sha1').update(`${i.productId}:${i.variantKey || ''}`).digest('hex').slice(0, 12),
      productId: i.productId,
      variantKey: i.variantKey || undefined,
      quantity: i.quantity,
    })),
    needsReview: missing.length > 0 || items.length === 0,
    missingProducts: missing,
    paidAt: new Date().toISOString(),
  };

  const result = await mutate([{create: order}, ...patches], patches.length > 0);
  if (!result.ok) {
    // Dublikatas — tik jei atmetimo priežastis yra būtent šis užsakymo dokumentas.
    if (/already exists/i.test(result.text) && result.text.includes(orderId)) return 'duplicate';
    throw new Error(`Sanity mutate ${result.status}: ${result.text.slice(0, 300)}`);
  }
  if (missing.length) console.error(`[webhook] ${session.id}: products not found, stock not adjusted: ${missing.join(',')}`);

  // Parduota daugiau nei buvo (du pirkėjai už paskutinį vienetą) → užsakymą pažymim peržiūrai.
  if (patches.length) {
    const body = JSON.parse(result.text);
    const oversold = [];
    for (const d of (body.results || []).map((r) => r.document)) {
      if (!d || d._type !== 'product') continue;
      if (d.stock < 0) oversold.push(d._id);
      for (const v of d.variants || []) if (v && v.stock < 0) oversold.push(`${d._id}:${v._key}`);
    }
    if (oversold.length) {
      console.error(`[webhook] ${session.id}: stock below zero for ${oversold.join(',')}`);
      const flag = await mutate([{patch: {id: orderId, set: {needsReview: true, oversold}}}]);
      if (!flag.ok) console.error(`[webhook] could not flag ${orderId}: ${flag.status}`);
    }
  }
  return 'fulfilled';
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({error: 'method_not_allowed'});
  }
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !process.env.SANITY_WRITE_TOKEN) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET or SANITY_WRITE_TOKEN missing');
    return res.status(500).json({error: 'not_configured'});
  }

  const rawBody = await readRawBody(req);
  if (rawBody.length === 0) {
    console.error('[webhook] empty raw body');
    return res.status(400).json({error: 'empty_body'});
  }
  if (!verifySignature(rawBody, req.headers['stripe-signature'], secret)) {
    return res.status(400).json({error: 'invalid_signature'});
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch {
    return res.status(400).json({error: 'invalid_json'});
  }

  const session = event.data?.object;
  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        // Tik sesijos, sukurtos per api/checkout.js (pvz. ne Payment Links).
        if (!session?.metadata?.delivery) {
          return res.status(200).json({received: true, status: 'ignored'});
        }
        if (session.payment_status === 'unpaid') {
          return res.status(200).json({received: true, status: 'awaiting_payment'});
        }
        const status = await fulfillOrder(session);
        console.log(`[webhook] ${event.type} ${session.id}: ${status}`);
        return res.status(200).json({received: true, status});
      }
      case 'checkout.session.async_payment_failed':
        console.warn(`[webhook] async payment failed: ${session?.id}`);
        return res.status(200).json({received: true, status: 'payment_failed'});
      default:
        return res.status(200).json({received: true, status: 'ignored'});
    }
  } catch (e) {
    // 500 → Stripe kartos įvykį vėliau (iki 3 dienų).
    console.error(`[webhook] fulfillment failed for ${session?.id}:`, e.message);
    return res.status(500).json({error: 'fulfillment_failed'});
  }
}

module.exports = handler;
module.exports.verifySignature = verifySignature;
