// Stripe Checkout sesijos kūrimas.
// Kainos, pavadinimai ir likutis imami iš Sanity serveryje — naršyklė siunčia tik productId (+ variantKey) + kiekį.
// Env: STRIPE_SECRET_KEY (Vercel, Sensitive). Stripe API kviečiamas per fetch — be npm priklausomybių.

const SANITY_API = 'https://vwtjc4wg.api.sanity.io/v2026-01-01/data/query/production';
const STRIPE_API = 'https://api.stripe.com/v1/checkout/sessions';
const STRIPE_VERSION = '2026-08-26.dahlia';
const INTEGRATION_ID = 'akva-webshop-hqvtmzrk';

const SHIPPING_ORE = 7900; // PostNord 79 kr
const FREE_SHIPPING_FROM_NOK = 1000;
const STUDIO_ADDRESS = 'Myreneveien 35, 4847 Arendal';
const MAX_LINES = 20;
const MAX_QTY = 99;

const ALLOWED_ORIGINS = [
  'https://www.akvastudio.no',
  'https://akvastudio.no',
  'https://akva-studio.vercel.app',
];
const DEFAULT_ORIGIN = 'https://www.akvastudio.no';

// Stripe API priima application/x-www-form-urlencoded su nested raktais: a[b][0][c]=...
function toForm(obj, prefix = '', out = new URLSearchParams()) {
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;
    const name = prefix ? `${prefix}[${key}]` : key;
    if (typeof value === 'object') toForm(value, name, out);
    else out.append(name, String(value));
  }
  return out;
}

const ID_RE = /^[\w.-]{1,100}$/;
const VARIANT_RE = /^[\w-]{1,64}$/;

function parseItems(body) {
  const items = body && Array.isArray(body.items) ? body.items : null;
  if (!items || items.length === 0 || items.length > MAX_LINES) return null;
  // Pasikartojančios eilutės (tas pats produktas + variantas) sujungiamos — kitaip dvi eilutės po 3 vnt. apeitų likučio patikrą.
  const merged = new Map();
  for (const item of items) {
    const id = typeof item?.productId === 'string' ? item.productId : '';
    const variantKey = item?.variantKey == null ? null : item.variantKey;
    const qty = Number(item?.quantity);
    if (!ID_RE.test(id) || !Number.isInteger(qty) || qty < 1) return null;
    if (variantKey !== null && (typeof variantKey !== 'string' || !VARIANT_RE.test(variantKey))) return null;
    const lineKey = variantKey ? `${id}:${variantKey}` : id;
    const prev = merged.get(lineKey);
    merged.set(lineKey, {id, variantKey, qty: (prev ? prev.qty : 0) + qty});
  }
  const clean = [...merged.values()];
  return clean.every((i) => i.qty <= MAX_QTY) ? clean : null;
}

async function fetchProducts(ids) {
  const query = '*[_type == "product" && _id in $ids && isAvailable == true]{_id, title, price, stock, "image": images[0].asset->url, "variants": variants[]{_key, name, stock, "image": image.asset->url}}';
  const url = `${SANITY_API}?query=${encodeURIComponent(query)}&%24ids=${encodeURIComponent(JSON.stringify(ids))}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  const data = await res.json();
  return data.result || [];
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({error: 'method_not_allowed'});
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error('[checkout] STRIPE_SECRET_KEY missing');
    return res.status(500).json({error: 'not_configured'});
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body;
  const items = parseItems(body);
  const delivery = body?.delivery === 'pickup' ? 'pickup' : 'ship';
  if (!items) return res.status(400).json({error: 'invalid_items'});

  let products;
  try {
    products = await fetchProducts([...new Set(items.map((i) => i.id))]);
  } catch (e) {
    console.error('[checkout] sanity fetch failed:', e.message);
    return res.status(502).json({error: 'catalog_unavailable'});
  }

  const byId = new Map(products.map((p) => [p._id, p]));
  const lineItems = [];
  let subtotal = 0;
  for (const {id, variantKey, qty} of items) {
    const p = byId.get(id);
    if (!p || typeof p.price !== 'number' || p.price <= 0) {
      return res.status(400).json({error: 'unavailable', productId: id});
    }
    // Prekė su variantais parduodama tik su konkrečiu variantu; likutis tikrinamas variantui.
    const variants = Array.isArray(p.variants) ? p.variants.filter((v) => v && v._key && v.name) : [];
    let variant = null;
    if (variants.length || variantKey) {
      variant = variants.find((v) => v._key === variantKey);
      if (!variant) return res.status(400).json({error: 'unavailable', productId: id});
    }
    const title = variant ? `${p.title} — ${variant.name}` : p.title;
    const stock = variant ? variant.stock : p.stock;
    if (typeof stock === 'number' && qty > stock) {
      return res.status(409).json({error: 'out_of_stock', productId: id, title, available: Math.max(0, stock)});
    }
    const image = (variant && variant.image) || p.image;
    subtotal += p.price * qty;
    lineItems.push({
      quantity: qty,
      price_data: {
        currency: 'nok',
        unit_amount: Math.round(p.price * 100),
        product_data: {
          name: title || 'Produkt',
          images: image ? [`${image}?w=600`] : undefined,
          metadata: {sanity_id: id, variant_key: variant ? variant._key : undefined},
        },
      },
    });
  }

  const shippingAmount = delivery === 'pickup' || subtotal >= FREE_SHIPPING_FROM_NOK ? 0 : SHIPPING_ORE;
  const shippingRate = delivery === 'pickup'
    ? {display_name: `Henting i studio — ${STUDIO_ADDRESS}`, type: 'fixed_amount', fixed_amount: {amount: 0, currency: 'nok'}}
    : {
        display_name: shippingAmount === 0 ? 'PostNord — fri frakt' : 'PostNord',
        type: 'fixed_amount',
        fixed_amount: {amount: shippingAmount, currency: 'nok'},
        delivery_estimate: {minimum: {unit: 'business_day', value: 2}, maximum: {unit: 'business_day', value: 5}},
      };

  const origin = ALLOWED_ORIGINS.includes(req.headers.origin) ? req.headers.origin : DEFAULT_ORIGIN;
  // "id:qty" arba "id:qty:variantKey" — skaito api/stripe-webhook.js.
  const itemsMeta = items.map((i) => (i.variantKey ? `${i.id}:${i.qty}:${i.variantKey}` : `${i.id}:${i.qty}`)).join(',');

  const params = {
    mode: 'payment',
    locale: 'nb',
    integration_identifier: INTEGRATION_ID,
    // 30 min (Stripe minimumas) — trumpina langą, kai du pirkėjai moka už paskutinį vienetą.
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    line_items: lineItems,
    shipping_options: [{shipping_rate_data: shippingRate}],
    shipping_address_collection: delivery === 'ship' ? {allowed_countries: ['NO']} : undefined,
    phone_number_collection: {enabled: true},
    success_url: `${origin}/handlekurv?betaling=ok&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/handlekurv?betaling=avbrutt`,
    metadata: {delivery, items: itemsMeta.length <= 500 ? itemsMeta : undefined},
  };

  try {
    const stripeRes = await fetch(STRIPE_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Stripe-Version': STRIPE_VERSION,
      },
      body: toForm(params),
    });
    const session = await stripeRes.json();
    if (!stripeRes.ok) {
      console.error('[checkout] stripe error:', session?.error?.type, session?.error?.message);
      return res.status(502).json({error: 'payment_provider_error'});
    }
    return res.status(200).json({url: session.url});
  } catch (e) {
    console.error('[checkout] stripe request failed:', e.message);
    return res.status(502).json({error: 'payment_provider_error'});
  }
};

function safeJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}
