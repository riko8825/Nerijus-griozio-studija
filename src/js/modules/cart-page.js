// Krepšelio puslapis (handlekurv.html) — pilna cart UI.
import {getItems, getSubtotal, updateQty, removeItem, clear, subscribe} from './cart.js';
import {formatPrice, escapeHtml} from './format.js';

const SHOP_EMAIL = 'akvastudio75@gmail.com';
const FREE_SHIPPING_THRESHOLD = 500;

function renderEmpty() {
  return `
    <div class="cart-empty">
      <h2>Handlekurven er tom</h2>
      <p>Bla i butikken og legg til produkter.</p>
      <a href="/produkter" class="btn btn-primary">Gå til butikken</a>
    </div>
  `;
}

function renderItems(items) {
  return items
    .map(
      (item) => `
    <article class="cart-item" data-cart-item="${escapeHtml(item.productId)}">
      <a class="cart-item-image" href="/produkter/${escapeHtml(item.slug)}">
        <img src="${escapeHtml(item.image || 'src/assets/images/products/product-placeholder.svg')}" alt="${escapeHtml(item.title)}" width="120" height="120" loading="lazy">
      </a>
      <div class="cart-item-info">
        <a class="cart-item-title" href="/produkter/${escapeHtml(item.slug)}">${escapeHtml(item.title)}</a>
        <p class="cart-item-sku">SKU: ${escapeHtml(item.sku)}</p>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
      </div>
      <div class="cart-item-qty">
        <button data-qty-decr="${escapeHtml(item.productId)}" aria-label="Reduser">−</button>
        <span class="cart-item-qty-value">${item.quantity}</span>
        <button data-qty-incr="${escapeHtml(item.productId)}" aria-label="Øk">+</button>
      </div>
      <p class="cart-item-total">${formatPrice(item.price * item.quantity)}</p>
      <button class="cart-item-remove" data-cart-remove="${escapeHtml(item.productId)}" aria-label="Fjern">✕</button>
    </article>
  `,
    )
    .join('');
}

function renderSummary(subtotal, items) {
  const freeShippingMissing = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const itemsCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const orderText = items
    .map((i) => `${i.quantity} × ${i.title} (${i.sku}) — ${formatPrice(i.price * i.quantity)}`)
    .join('\n');
  const mailto = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent('Bestilling fra nettbutikk')}&body=${encodeURIComponent(`Hei,\n\nJeg ønsker å bestille:\n\n${orderText}\n\nTotal: ${formatPrice(subtotal)}\n\nNavn:\nAdresse:\nTelefon:\n`)}`;

  return `
    <aside class="cart-summary">
      <h2>Sammendrag</h2>
      <dl class="cart-summary-line">
        <dt>Antall produkter</dt><dd>${itemsCount}</dd>
      </dl>
      <dl class="cart-summary-line">
        <dt>Subtotal</dt><dd>${formatPrice(subtotal)}</dd>
      </dl>
      ${
        freeShippingMissing > 0
          ? `<p class="cart-summary-shipping">Du mangler <strong>${formatPrice(freeShippingMissing)}</strong> for fri frakt.</p>`
          : `<p class="cart-summary-shipping cart-summary-shipping-free">✓ Fri frakt!</p>`
      }
      <dl class="cart-summary-total">
        <dt>Total</dt><dd>${formatPrice(subtotal)}</dd>
      </dl>

      <a href="${mailto}" class="btn btn-primary cart-checkout-btn">Bestill via e-post</a>
      <p class="cart-checkout-note">
        Nettbetaling kommer snart. Send bestilling på e-post — vi svarer innen 24 timer.
      </p>

      <button class="cart-clear-btn" data-cart-clear>Tøm handlekurven</button>
    </aside>
  `;
}

function render() {
  const root = document.querySelector('[data-cart-page]');
  if (!root) return;
  const items = getItems();
  if (items.length === 0) {
    root.innerHTML = renderEmpty();
    return;
  }
  const subtotal = getSubtotal();
  root.innerHTML = `
    <div class="cart-grid">
      <section class="cart-items">
        <h1>Handlekurv</h1>
        ${renderItems(items)}
      </section>
      ${renderSummary(subtotal, items)}
    </div>
  `;
  bindActions();
}

function bindActions() {
  document.querySelectorAll('[data-qty-decr]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-qty-decr');
      const items = getItems();
      const item = items.find((i) => i.productId === id);
      if (item) updateQty(id, item.quantity - 1);
    });
  });
  document.querySelectorAll('[data-qty-incr]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-qty-incr');
      const items = getItems();
      const item = items.find((i) => i.productId === id);
      if (item) updateQty(id, item.quantity + 1);
    });
  });
  document.querySelectorAll('[data-cart-remove]').forEach((btn) => {
    btn.addEventListener('click', () => removeItem(btn.getAttribute('data-cart-remove')));
  });
  document.querySelector('[data-cart-clear]')?.addEventListener('click', () => {
    if (confirm('Er du sikker på at du vil tømme handlekurven?')) clear();
  });
}

export function initCartPage() {
  if (!document.querySelector('[data-cart-page]')) return;
  subscribe(() => render());
}
