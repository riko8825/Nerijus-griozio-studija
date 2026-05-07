// Katalogas (produkter.html) — render produktų grid + filtravimas.
import {getProducts, getCategories, imageUrl} from './sanity-client.js';
import {formatPrice, calcDiscount, escapeHtml} from './format.js';
import {addItem} from './cart.js';

const STATE = {
  products: [],
  categories: [],
  activeCategory: null,
};

function productCardHtml(p) {
  const discount = calcDiscount(p.price, p.compareAtPrice);
  const img = p.images && p.images[0];
  const imgSrc = imageUrl(img, {w: 480});
  const imgAlt = (img && img.alt) || p.title;
  return `
    <article class="product-card" data-product-id="${escapeHtml(p._id)}">
      <a class="product-card-link" href="/produkter/${escapeHtml(p.slug)}">
        <div class="product-card-media">
          ${discount ? `<span class="product-card-badge">−${discount}%</span>` : ''}
          ${p.stock === 0 ? `<span class="product-card-badge product-card-badge-soldout">Utsolgt</span>` : ''}
          <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(imgAlt)}" loading="lazy" decoding="async" width="480" height="480">
        </div>
        <div class="product-card-body">
          <span class="product-card-category">${escapeHtml(p.categoryTitle || '')}</span>
          <h3 class="product-card-title">${escapeHtml(p.title)}</h3>
          <p class="product-card-desc">${escapeHtml(p.shortDescription || '')}</p>
          <div class="product-card-price">
            <span class="product-card-price-now">${formatPrice(p.price)}</span>
            ${p.compareAtPrice && p.compareAtPrice > p.price ? `<span class="product-card-price-was">${formatPrice(p.compareAtPrice)}</span>` : ''}
          </div>
        </div>
      </a>
      <button class="btn btn-primary product-card-cta" data-add-to-cart="${escapeHtml(p._id)}" ${p.stock === 0 ? 'disabled' : ''}>
        ${p.stock === 0 ? 'Utsolgt' : 'Legg i kurv'}
      </button>
    </article>
  `;
}

function renderGrid() {
  const grid = document.querySelector('[data-products-grid]');
  if (!grid) return;
  const filtered = STATE.activeCategory
    ? STATE.products.filter((p) => p.categoryId === STATE.activeCategory)
    : STATE.products;
  if (filtered.length === 0) {
    grid.innerHTML = `<p class="products-empty">Ingen produkter funnet.</p>`;
    return;
  }
  grid.innerHTML = filtered.map(productCardHtml).join('');
  bindCardActions();
}

function bindCardActions() {
  document.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-add-to-cart');
      const product = STATE.products.find((p) => p._id === id);
      if (!product) return;
      addItem(product, 1);
      btn.textContent = '✓ Lagt til';
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = 'Legg i kurv';
        btn.classList.remove('added');
      }, 1500);
    });
  });
}

function renderFilters() {
  const filterContainer = document.querySelector('[data-products-filters]');
  if (!filterContainer) return;
  const items = [
    {id: null, title: 'Alle'},
    ...STATE.categories.map((c) => ({id: c._id, title: c.title})),
  ];
  filterContainer.innerHTML = items
    .map(
      (c) => `
      <button class="products-filter ${STATE.activeCategory === c.id ? 'is-active' : ''}" data-category="${c.id || ''}">
        ${escapeHtml(c.title)}
      </button>
    `,
    )
    .join('');
  filterContainer.querySelectorAll('[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-category') || null;
      STATE.activeCategory = id;
      renderFilters();
      renderGrid();
    });
  });
}

export async function initCatalog() {
  const grid = document.querySelector('[data-products-grid]');
  if (!grid) return;
  grid.innerHTML = `<p class="products-loading">Laster produkter…</p>`;
  try {
    const [products, categories] = await Promise.all([getProducts(), getCategories()]);
    STATE.products = products;
    STATE.categories = categories;
    renderFilters();
    renderGrid();
  } catch (e) {
    console.error('[products] load failed:', e);
    grid.innerHTML = `<p class="products-empty">Kunne ikke laste produkter. Vennligst prøv igjen senere.</p>`;
  }
}
