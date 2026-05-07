// Krepšelio state — localStorage.
// Public API: addItem, removeItem, updateQty, getItems, getCount, getSubtotal, clear, subscribe.
// Future: checkout() metodas paliktas placeholder'iui (F2 fazė — Snipcart/Stripe).

const STORAGE_KEY = 'akva_cart_v1';
const CART_EXPIRATION_DAYS = 30;

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

export function addItem(product, quantity = 1) {
  if (!product || !product._id) {
    console.warn('[cart] addItem: invalid product');
    return;
  }
  const cart = readCart();
  const existing = cart.items.find((i) => i.productId === product._id);
  if (existing) {
    existing.quantity = Math.max(1, existing.quantity + quantity);
  } else {
    cart.items.push({
      productId: product._id,
      sku: product.sku,
      title: product.title,
      slug: product.slug,
      price: Number(product.price),
      image: product.images?.[0]?.url || null,
      quantity: Math.max(1, quantity),
      addedAt: new Date().toISOString(),
    });
  }
  writeCart(cart);
}

export function removeItem(productId) {
  const cart = readCart();
  cart.items = cart.items.filter((i) => i.productId !== productId);
  writeCart(cart);
}

export function updateQty(productId, quantity) {
  const cart = readCart();
  const item = cart.items.find((i) => i.productId === productId);
  if (!item) return;
  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => i.productId !== productId);
  } else {
    item.quantity = quantity;
  }
  writeCart(cart);
}

export function clear() {
  clearCart();
}

function clearCart() {
  localStorage.removeItem(STORAGE_KEY);
  notify(emptyCart());
}

// Placeholder ateičiai — F2 fazė
export async function checkout() {
  console.warn('[cart] checkout() not implemented yet — F2 phase (Snipcart/Stripe)');
  return {success: false, reason: 'NOT_IMPLEMENTED'};
}
