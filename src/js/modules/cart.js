// Krepšelio state — localStorage.
// Public API: addItem, removeItem, updateQty, getItems, getCount, getSubtotal, clear, subscribe, maxQtyOf, syncWithCatalog.
// Apmokėjimas — cart-page.js → api/checkout.js (Stripe).

const STORAGE_KEY = 'akva_cart_v1';
const CART_EXPIRATION_DAYS = 30;
// Tos pačios ribos kaip api/checkout.js (MAX_QTY, MAX_LINES).
export const MAX_QTY = 99;
export const MAX_LINES = 20;

const listeners = new Set();

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyCart();
    const cart = JSON.parse(raw);
    if (!cart || !Array.isArray(cart.items)) return emptyCart();
    if (isExpired(cart.updatedAt)) {
      clearCart();
      return emptyCart();
    }
    return cart;
  } catch {
    return emptyCart();
  }
}

function writeCart(cart) {
  cart.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  notify(cart);
}

function emptyCart() {
  return {items: [], updatedAt: new Date().toISOString(), currency: 'NOK'};
}

function isExpired(updatedAt) {
  if (!updatedAt) return false;
  const ageMs = Date.now() - new Date(updatedAt).getTime();
  return ageMs > CART_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
}

function notify(cart) {
  listeners.forEach((fn) => {
    try {
      fn(cart);
    } catch (e) {
      console.warn('[cart] listener error:', e);
    }
  });
}

export function subscribe(fn) {
  listeners.add(fn);
  fn(readCart());
  return () => listeners.delete(fn);
}

export function getItems() {
  return readCart().items;
}

export function getCount() {
  return readCart().items.reduce((sum, item) => sum + (item.quantity || 0), 0);
}

export function getSubtotal() {
  return readCart().items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0),
    0,
  );
}

// Eilutės ID: produktas be variantų → productId; su variantu → productId:variantKey.
export function lineIdOf(item) {
  return item.lineId || item.productId;
}

// Didžiausias leistinas kiekis eilutei: likutis (jei žinomas), bet ne daugiau nei MAX_QTY.
export function maxQtyOf(item) {
  return typeof item.stock === 'number' ? Math.max(0, Math.min(MAX_QTY, item.stock)) : MAX_QTY;
}

// Grąžina false, jei prekės pridėti nebegalima (krepšelyje MAX_LINES eilučių).
export function addItem(product, quantity = 1, variant = null) {
  if (!product || !product._id) {
    console.warn('[cart] addItem: invalid product');
    return false;
  }
  const lineId = variant ? `${product._id}:${variant._key}` : product._id;
  const stock = variant ? variant.stock : product.stock;
  const cart = readCart();
  const existing = cart.items.find((i) => lineIdOf(i) === lineId);
  if (existing) {
    if (typeof stock === 'number') existing.stock = stock;
    existing.quantity = Math.max(1, Math.min(maxQtyOf(existing), existing.quantity + quantity));
  } else {
    if (cart.items.length >= MAX_LINES) return false;
    cart.items.push({
      lineId,
      productId: product._id,
      variantKey: variant ? variant._key : null,
      variantLabel: variant ? product.variantLabel : null,
      variantName: variant ? variant.name : null,
      sku: product.sku,
      title: product.title,
      slug: product.slug,
      price: Number(product.price),
      image: (variant && variant.imageUrl) || product.images?.[0]?.url || null,
      stock: typeof stock === 'number' ? stock : null,
      quantity: Math.max(1, Math.min(typeof stock === 'number' ? stock : MAX_QTY, MAX_QTY, quantity)),
      addedAt: new Date().toISOString(),
    });
  }
  writeCart(cart);
  return true;
}

export function removeItem(lineId) {
  const cart = readCart();
  cart.items = cart.items.filter((i) => lineIdOf(i) !== lineId);
  writeCart(cart);
}

export function updateQty(lineId, quantity) {
  const cart = readCart();
  const item = cart.items.find((i) => lineIdOf(i) === lineId);
  if (!item) return;
  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => lineIdOf(i) !== lineId);
  } else {
    item.quantity = Math.min(quantity, Math.max(1, maxQtyOf(item)));
  }
  writeCart(cart);
}

// Krepšelis saugo kainą pridėjimo metu — atidarius krepšelį kaina, pavadinimas ir likutis atnaujinami iš katalogo.
// products = tik parduodamos prekės (getProducts). Nerasta prekė/variantas → unavailable: true (kiekis nekeičiamas).
export function syncWithCatalog(products) {
  const byId = new Map(products.map((p) => [p._id, p]));
  const cart = readCart();
  let changed = false;
  for (const item of cart.items) {
    const p = byId.get(item.productId);
    const variant = p && item.variantKey ? (p.variants || []).find((v) => v._key === item.variantKey) : null;
    // Kaip api/checkout.js: kaina > 0; prekė su variantais parduodama tik su konkrečiu variantu.
    const found = Boolean(
      p && typeof p.price === 'number' && p.price > 0 && (item.variantKey ? variant : !(p.variants || []).length),
    );
    const next = found
      ? {price: Number(p.price), title: p.title, stock: variant ? variant.stock : (typeof p.stock === 'number' ? p.stock : null), unavailable: false}
      : {unavailable: true};
    for (const [key, value] of Object.entries(next)) {
      if (item[key] !== value) {
        item[key] = value;
        changed = true;
      }
    }
  }
  if (changed) writeCart(cart);
}

export function clear() {
  clearCart();
}

function clearCart() {
  localStorage.removeItem(STORAGE_KEY);
  notify(emptyCart());
}
