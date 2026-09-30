// Krepšelio puslapis (handlekurv.html) — pilna cart UI + Stripe Checkout (api/checkout.js).
import {getItems, getSubtotal, updateQty, removeItem, clear, subscribe} from './cart.js';
import {formatPrice, escapeHtml} from './format.js';

const SHOP_EMAIL = 'akvastudio75@gmail.com';
const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_PRICE = 79;
const STUDIO_ADDRESS = 'Myreneveien 35, 4847 Arendal';

let delivery = 'ship';
let notice = null; // {type: 'success' | 'info', text}
let checkoutPending = false;
let checkoutError = '';

function shippingCost(subtotal) {
  if (delivery === 'pickup' || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_PRICE;
}

function renderNotice() {
  if (!notice || notice.type === 'success') return '';
  return `<p class="cart-notice" role="status">${escapeHtml(notice.text)}</p>`;
}

function renderEmpty() {
  if (notice?.type === 'success') {
    return `
      <div class="cart-empty cart-success">
        <h2>Takk for bestillingen!</h2>
        <p>Bestillingen din er registrert. Du får en bekreftelse på e-post når betalingen er gjennomført, og vi gir beskjed når varene er sendt eller klare for henting.</p>
        <a href="/produkter" class="btn btn-primary">Tilbake til butikken</a>
      </div>
    `;
  }
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
  const shipping = shippingCost(subtotal);
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

      <fieldset class="cart-delivery">
        <legend>Levering</legend>
        <label class="cart-delivery-option">
          <input type="radio" name="delivery" value="ship" ${delivery === 'ship' ? 'checked' : ''} ${checkoutPending ? 'disabled' : ''} data-delivery>
          <span>PostNord, 2–5 virkedager</span>
          <strong>${subtotal >= FREE_SHIPPING_THRESHOLD ? 'Gratis' : formatPrice(SHIPPING_PRICE)}</strong>
        </label>
        <label class="cart-delivery-option">
          <input type="radio" name="delivery" value="pickup" ${delivery === 'pickup' ? 'checked' : ''} ${checkoutPending ? 'disabled' : ''} data-delivery>
          <span>Henting i studio<small>${STUDIO_ADDRESS}</small></span>
          <strong>Gratis</strong>
        </label>
      </fieldset>

      ${
        delivery === 'pickup'
          ? ''
          : freeShippingMissing > 0
            ? `<p class="cart-summary-shipping">Du mangler <strong>${formatPrice(freeShippingMissing)}</strong> for fri frakt.</p>`
            : `<p class="cart-summary-shipping cart-summary-shipping-free">✓ Fri frakt!</p>`
      }
      <dl class="cart-summary-line">
        <dt>Frakt</dt><dd>${shipping === 0 ? 'Gratis' : formatPrice(shipping)}</dd>
      </dl>
      <dl class="cart-summary-total">
        <dt>Total</dt><dd>${formatPrice(subtotal + shipping)}</dd>
      </dl>

      <button type="button" class="btn btn-primary cart-checkout-btn" data-checkout ${checkoutPending ? 'disabled' : ''}>${checkoutPending ? 'Sender deg til betaling…' : 'Gå til betaling'}</button>
      <p class="cart-checkout-error" data-checkout-error role="alert">${escapeHtml(checkoutError)}</p>
      <p class="cart-checkout-note">
        Sikker betaling med kort, Apple Pay eller Google Pay via Stripe.
        <a href="${mailto}">Eller bestill via e-post</a>.
      </p>

      <button class="cart-clear-btn" data-cart-clear>Tøm handlekurven</button>
    </aside>
  `;
}

// Visas krepšelis perpiešiamas per innerHTML — prieš tai įsimenam fokusuotą valdiklį, po to jį grąžinam.
const FOCUS_ATTRS = ['data-delivery', 'data-qty-incr', 'data-qty-decr', 'data-checkout'];

function focusedSelector() {
  const el = document.activeElement;
  if (!el || !el.closest('[data-cart-page]')) return null;
  if (el.hasAttribute('data-delivery')) return `[data-delivery][value="${el.value}"]`;
  const attr = FOCUS_ATTRS.find((a) => el.hasAttribute(a));
  return attr ? `[${attr}="${CSS.escape(el.getAttribute(attr))}"]` : null;
}

function render() {
  const root = document.querySelector('[data-cart-page]');
  if (!root) return;
  const refocus = focusedSelector();
  paint(root);
  if (refocus) document.querySelector(refocus)?.focus();
}

function paint(root) {
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
        ${renderNotice()}
        ${renderItems(items)}
      </section>
      ${renderSummary(subtotal, items)}
    </div>
  `;
  bindActions();
}

function checkoutErrorText(status, data) {
  if (status === 409 && data?.title) {
    return data.available > 0
      ? `Beklager, vi har bare ${data.available} stk av «${data.title}» på lager.`
      : `Beklager, «${data.title}» er utsolgt.`;
  }
  if (status === 400 && data?.error === 'unavailable') {
    return 'Et av produktene er ikke lenger tilgjengelig. Fjern det fra handlekurven og prøv igjen.';
  }
  return 'Betalingen kunne ikke startes. Prøv igjen om litt, eller bestill via e-post.';
}

async function startCheckout() {
  if (checkoutPending) return;
  checkoutPending = true;
  checkoutError = '';
  render();
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        delivery,
        items: getItems().map((i) => ({productId: i.productId, quantity: i.quantity})),
      }),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.url) {
      window.location.href = data.url;
      return;
    }
    checkoutError = checkoutErrorText(res.status, data);
  } catch {
    checkoutError = checkoutErrorText(0, null);
  }
  checkoutPending = false;
  render();
  document.querySelector('[data-checkout]')?.focus();
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
  document.querySelectorAll('[data-delivery]').forEach((input) => {
    input.addEventListener('change', () => {
      delivery = input.value === 'pickup' ? 'pickup' : 'ship';
      render();
    });
  });
  document.querySelector('[data-checkout]')?.addEventListener('click', startCheckout);
  document.querySelector('[data-cart-clear]')?.addEventListener('click', () => {
    if (confirm('Er du sikker på at du vil tømme handlekurven?')) clear();
  });
}

// Grįžimas iš Stripe: ?betaling=ok → išvalom krepšelį; ?betaling=avbrutt → paliekam krepšelį su pranešimu.
function readReturnStatus() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('betaling');
  if (status === 'ok') {
    notice = {type: 'success', text: 'Takk for bestillingen!'};
    clear();
  } else if (status === 'avbrutt') {
    notice = {type: 'info', text: 'Betalingen ble avbrutt. Handlekurven din er lagret.'};
  }
  if (status) window.history.replaceState(null, '', window.location.pathname);
}

export function initCartPage() {
  if (!document.querySelector('[data-cart-page]')) return;
  readReturnStatus();
  subscribe(() => {
    checkoutError = ''; // krepšelis pasikeitė — sena likučio klaida nebeaktuali
    render();
  });
  // Grįžus iš Stripe naršyklės „Back“ mygtuku puslapis atkuriamas iš bfcache su „Sender deg…“ būsena.
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    checkoutPending = false;
    render();
  });
}
