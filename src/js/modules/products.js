// Katalogas (produkter.html) — render produktų grid + filtravimas.
import {getProducts, getCategories, imageUrl} from './sanity-client.js';
import {formatPrice, calcDiscount, escapeHtml} from './format.js';
import {addItem} from './cart.js';

const STATE = {
  products: [],
  categories: [],
  activeCategory: null,
  view: 'products', // 'categories' | 'products'
};

const ALL = 'alle';

// Kategorijos su bent viena preke — tuščių pirkėjui nerodom.
function visibleCategories() {
  return STATE.categories.filter((c) => STATE.products.some((p) => p.categoryId === c._id));
}

function categoryImage(c) {
  if (c.imageUrl) return imageUrl({url: c.imageUrl}, {w: 360});
  const p = STATE.products.find((x) => x.categoryId === c._id && x.images && x.images[0]);
  return p ? imageUrl(p.images[0], {w: 360}) : null;
}

function countLabel(n) {
  return n === 1 ? '1 produkt' : `${n} produkter`;
}

function categoryCardHtml(c) {
  const img = categoryImage(c);
  const n = STATE.products.filter((p) => p.categoryId === c._id).length;
  return `
    <a class="category-card" href="/produkter?kategori=${encodeURIComponent(c.slug || '')}" data-category-link="${escapeHtml(c._id)}">
      <span class="category-card-media">
        ${img ? `<img src="${escapeHtml(img)}" alt="" loading="lazy" decoding="async" width="360" height="360">` : `<span class="category-card-initial" aria-hidden="true">${escapeHtml((c.title || '').charAt(0))}</span>`}
      </span>
      <span class="category-card-body">
        <span class="category-card-title">${escapeHtml(c.title)}</span>
        ${c.description ? `<span class="category-card-desc">${escapeHtml(c.description)}</span>` : ''}
        <span class="category-card-count">${countLabel(n)}</span>
      </span>
    </a>
  `;
}

function renderCategoryList() {
  const list = document.querySelector('[data-category-list]');
  if (!list) return;
  const showList = STATE.view === 'categories';
  list.hidden = !showList;
  if (!showList) {
    list.innerHTML = '';
    return;
  }
  list.innerHTML =
    visibleCategories().map(categoryCardHtml).join('') +
    `<a class="category-all-link" href="/produkter?kategori=${ALL}" data-category-link="">Se alle produkter →</a>`;
  list.querySelectorAll('[data-category-link]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      selectCategory(a.getAttribute('data-category-link') || null, true);
    });
  });
}

function slugFor(id) {
  if (!id) return ALL;
  const c = STATE.categories.find((x) => x._id === id);
  return (c && c.slug) || ALL;
}

function selectCategory(id, scroll) {
  STATE.view = 'products';
  STATE.activeCategory = id;
  const url = `/produkter?kategori=${encodeURIComponent(slugFor(id))}`;
  if (location.pathname + location.search !== url) history.pushState({}, '', url);
  render();
  if (scroll) document.querySelector('.shop-catalog')?.scrollIntoView({behavior: 'smooth', block: 'start'});
}

// Būsena iš URL: be ?kategori — kategorijų sąrašas (jei yra ką rodyti).
function readStateFromUrl() {
  const slug = new URLSearchParams(location.search).get('kategori');
  const cats = visibleCategories();
  if (!slug) {
    STATE.view = cats.length ? 'categories' : 'products';
    STATE.activeCategory = null;
    return;
  }
  const c = STATE.categories.find((x) => x.slug === slug);
  STATE.view = 'products';
  STATE.activeCategory = c ? c._id : null;
}

function render() {
  const toolbar = document.querySelector('.products-toolbar');
  const grid = document.querySelector('[data-products-grid]');
  const inProducts = STATE.view === 'products';
  if (toolbar) toolbar.hidden = !inProducts;
  if (grid) grid.hidden = !inProducts;
  renderCategoryList();
  if (inProducts) {
    renderFilters();
    renderGrid();
  }
}

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
  const cats = visibleCategories();
  const back = cats.length
    ? `<a class="products-filter products-filter-back" href="/produkter" data-back-to-categories>← Kategorier</a>`
    : '';
  const items = [
    {id: null, title: 'Alle'},
    ...cats.map((c) => ({id: c._id, title: c.title})),
  ];
  filterContainer.innerHTML =
    back +
    items
      .map(
        (c) => `
      <button type="button" class="products-filter ${STATE.activeCategory === c.id ? 'is-active' : ''}" data-category="${escapeHtml(c.id || '')}" aria-pressed="${STATE.activeCategory === c.id}">
        ${escapeHtml(c.title)}
      </button>
    `,
      )
      .join('');
  filterContainer.querySelectorAll('[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectCategory(btn.getAttribute('data-category') || null, false);
    });
  });
  filterContainer.querySelector('[data-back-to-categories]')?.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState({}, '', '/produkter');
    readStateFromUrl();
    render();
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
    readStateFromUrl();
    render();
    window.addEventListener('popstate', () => {
      readStateFromUrl();
      render();
    });
  } catch (e) {
    console.error('[products] load failed:', e);
    grid.innerHTML = `<p class="products-empty">Kunne ikke laste produkter. Vennligst prøv igjen senere.</p>`;
  }
}
