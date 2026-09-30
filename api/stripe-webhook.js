// Stripe webhook — užsakymo įvykdymas po apmokėjimo.
// Parašas tikrinamas rankiniu būdu (HMAC-SHA256, v1 schema, 5 min tolerancija) — be npm priklausomybių.
// Įvykdymas: viena Sanity transakcija = sukuriamas `order` dokumentas (be asmens duomenų) + sumažinamas `stock`.
// Tas pats session.id antrą kartą → transakcija atmetama (dokumentas jau yra) → likutis nemažinamas du kartus.
// Env: STRIPE_WEBHOOK_SECRET (whsec_…), STRIPE_SECRET_KEY, SANITY_WRITE_TOKEN — visi Vercel, Sensitive.

const crypto = require('crypto');

const SANITY_MUTATE = 'https://vwtjc4wg.api.sanity.io/v2026-01-01/data/mutate/production';
const STRIPE_VERSION = '2026-08-26.dahlia';
const TOLERANCE_SEC = 300;

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
  let timestamp = null;
  const signatures = [];
  for (const part of header.split(',')) {
    const [prefix, value] = part.split('=');
    if (prefix === 't') timestamp = value;
    else if (prefix === 'v1' && value) signatures.push(value);
  }
  if (!timestamp || signatures.length === 0) return false;
  if (Math.abs(nowSec - Number(timestamp)) > TOLERANCE_SEC) return false;

  const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.${rawBody.toString('utf8')}`).digest('hex');
  const expectedBuf = Buffer.from(expected, 'hex');
  return signatures.some((sig) => {
    const sigBuf = Buffer.from(sig, 'hex');
    return sigBuf.length === expectedBuf.length && crypto.timingSafeEqual(sigBuf, expectedBuf);
  });
}

// metadata.items = "sanityId:qty,sanityId:qty" (nustato api/checkout.js); jei nėra — imam iš line_items.
async function getOrderItems(session) {
  const meta = session.metadata?.items;
  if (meta) {
    return meta.split(',').map((pair) => {
      const [productId, qty] = pair.split(':');
      return {productId, quantity: Number(qty)};
    });
  }
  const url = `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(session.id)}/line_items?limit=100&expand[]=data.price.product`;
  const res = await fetch(url, {
    headers: {Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Stripe-Version': STRIPE_VERSION},
  });
  if (!res.ok) throw new Error(`Stripe line_items ${res.status}`);
  const data = await res.json();
  return data.data.map((li) => ({productId: li.price?.product?.metadata?.sanity_id, quantity: li.quantity}));
}

async function fulfillOrder(session) {
  const items = (await getOrderItems(session)).filter(
    (i) => /^[\w.-]{1,100}$/.test(i.productId || '') && Number.isInteger(i.quantity) && i.quantity > 0,
  );
  const mutations = [
    {
      create: {
        _id: `orders.${session.id}`,
        _type: 'order',
        stripeSessionId: session.id,
        paymentIntent: session.payment_intent || null,
        livemode: Boolean(session.livemode),
        delivery: session.metadata?.delivery === 'pickup' ? 'pickup' : 'ship',
        amountTotal: (session.amount_total || 0) / 100,
        currency: session.currency,
        items: items.map((i) => ({_key: i.productId.slice(0, 40), productId: i.productId, quantity: i.quantity})),
        paidAt: new Date().toISOString(),
      },
    },
    ...items.map((i) => ({patch: {id: i.productId, dec: {stock: i.quantity}}})),
  ];

  const res = await fetch(SANITY_MUTATE, {
    method: 'POST',
    headers: {Authorization: `Bearer ${process.env.SANITY_WRITE_TOKEN}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({mutations}),
  });
  if (res.status === 409) return 'duplicate';
  if (!res.ok) {
    const text = await res.text();
    if (/already exists/i.test(text)) return 'duplicate';
    throw new Error(`Sanity mutate ${res.status}: ${text.slice(0, 200)}`);
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

  // Vercel req.body parsinamas tik jį perskaičius — todėl skaitom žalią srautą, jo neliesdami.
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
        if (session.payment_status === 'unpaid') {
          return res.status(200).json({received: true, status: 'awaiting_payment'});
        }
        const status = await fulfillOrder(session);
        console.log(`[webhook] ${event.type} ${session.id}: ${status}`);
        return res.status(200).json({received: true, status});
      }
      case 'checkout.session.async_payment_failed':
        console.warn(`[webhook] async payment failed: ${session.id}`);
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
