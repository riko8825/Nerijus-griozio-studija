// Produkto detalės puslapis (produkt.html) — render iš ?slug=... query param'o.
import {getProductBySlug, imageUrl} from './sanity-client.js';
import {formatPrice, calcDiscount, escapeHtml} from './format.js';
import {addItem} from './cart.js';

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug') || params.get('p') || null;
}

function injectSchema(product) {
  const oldSchema = document.getElementById('product-schema');
  if (oldSchema) oldSchema.remove();
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: (product.images || []).map((i) => i.url),
    description: product.shortDescription,
    sku: product.sku,
    brand: {'@type': 'Brand', name: product.brand || 'Aromatic89'},
    offers: {
      '@type': 'Offer',
      url: window.location.href,
      priceCurrency: 'NOK',
      price: String(product.price),
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {'@type': 'Organization', name: 'Akva Studio'},
    },
  };
  if (product.gtin13) schema.gtin13 = product.gtin13;
  if (product.mpn) schema.mpn = product.mpn;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'product-schema';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function renderProduct(product) {
  if (!product) {
    renderNotFound();
    return;
  }
  document.title = `${product.title} — Akva Studio`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', product.shortDescription || '');

  const root = document.querySelector('[data-product-detail]');
  if (!root) return;

  const discount = calcDiscount(product.price, product.compareAtPrice);
  const mainImage = product.images?.[0];
  const galleryImgs = product.images || [];
  const descBlock = renderDescription(product.description);

  root.innerHTML = `
    <nav class="product-breadcrumb" aria-label="Sti">
      <a href="/">Hjem</a> · <a href="/produkter">Produkter</a> · <span>${escapeHtml(product.title)}</span>
    </nav>
    <div class="product-detail-grid">
      <div class="product-detail-media">
        <div class="product-detail-main-image">
          <img src="${escapeHtml(imageUrl(mainImage, {w: 800}))}" alt="${escapeHtml(mainImage?.alt || product.title)}" width="800" height="800">
        </div>
        ${
          galleryImgs.length > 1
            ? `<div class="product-detail-thumbs">${galleryImgs
                .map(
                  (img, i) =>
                    `<button class="product-detail-thumb ${i === 0 ? 'is-active' : ''}" data-thumb-index="${i}"><img src="${escapeHtml(imageUrl(img, {w: 160}))}" alt="${escapeHtml(img.alt || '')}" width="160" height="160"></button>`,
                )
                .join('')}</div>`
            : ''
        }
      </div>
      <div class="product-detail-info">
        <span class="product-detail-category">${escapeHtml(product.categoryTitle || '')}</span>
        <h1 class="product-detail-title">${escapeHtml(product.title)}</h1>
        <p class="product-detail-sku">SKU: ${escapeHtml(product.sku)}${product.volume ? ` · ${escapeHtml(product.volume)}` : ''}</p>

        <div class="product-detail-price">
          <span class="product-detail-price-now">${formatPrice(product.price)}</span>
          ${product.compareAtPrice && product.compareAtPrice > product.price ? `<span class="product-detail-price-was">${formatPrice(product.compareAtPrice)}</span>` : ''}
          ${discount ? `<span class="product-detail-discount">−${discount}%</span>` : ''}
        </div>

        <p class="product-detail-short">${escapeHtml(product.shortDescription || '')}</p>

        <div class="product-detail-actions">
          <div class="product-detail-qty">
            <button data-qty-decr aria-label="Reduser antall">−</button>
            <input data-qty-input type="number" value="1" min="1" max="${product.stock || 99}" inputmode="numeric">
            <button data-qty-incr aria-label="Øk antall">+</button>
          </div>
          <button class="btn btn-primary product-detail-cta" data-add-to-cart-detail ${product.stock === 0 ? 'disabled' : ''}>
            ${product.stock === 0 ? 'Utsolgt' : 'Legg i kurv'}
          </button>
        </div>

        <p class="product-detail-stock">
          ${product.stock > 0 ? `✓ På lager (${product.stock} stk)` : '⚠️ Utsolgt'}
        </p>

        ${descBlock ? `<div class="product-detail-section"><h2>Beskrivelse</h2>${descBlock}</div>` : ''}
        ${product.ingredients ? `<div class="product-detail-section"><h2>Ingredienser</h2><p>${escapeHtml(product.ingredients)}</p></div>` : ''}
        ${product.usage ? `<div class="product-detail-section"><h2>Bruksanvisning</h2><p>${escapeHtml(product.usage)}</p></div>` : ''}
      </div>
    </div>
  `;

  bindActions(product);
  injectSchema(product);
}

function renderDescription(description) {
  if (!description) return '';
  if (typeof description === 'string') return `<p>${escapeHtml(description)}</p>`;
  if (Array.isArray(description)) {
    return description
      .map((block) => {
        if (block._type === 'block' && block.children) {
          const text = block.children.map((c) => escapeHtml(c.text || '')).join('');
          const tag = block.style && block.style.startsWith('h') ? block.style : 'p';
          return `<${tag}>${text}</${tag}>`;
        }
        return '';
      })
      .join('');
  }
  return '';
}

function bindActions(product) {
  const qtyInput = document.querySelector('[data-qty-input]');
  document.querySelector('[data-qty-decr]')?.addEventListener('click', () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });
  document.querySelector('[data-qty-incr]')?.addEventListener('click', () => {
    const max = Number(qtyInput.max) || 99;
    qtyInput.value = Math.min(max, Number(qtyInput.value) + 1);
  });

  document.querySelector('[data-add-to-cart-detail]')?.addEventListener('click', (e) => {
    e.preventDefault();
    const qty = Math.max(1, Number(qtyInput.value) || 1);
    addItem(product, qty);
    const btn = e.currentTarget;
    btn.textContent = '✓ Lagt til';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = 'Legg i kurv';
      btn.classList.remove('added');
    }, 1800);
  });

  document.querySelectorAll('[data-thumb-index]').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const idx = Number(thumb.getAttribute('data-thumb-index'));
      const mainImg = document.querySelector('.product-detail-main-image img');
      const newImg = product.images?.[idx];
      if (mainImg && newImg) {
        mainImg.src = imageUrl(newImg, {w: 800});
        mainImg.alt = newImg.alt || product.title;
      }
      document
        .querySelectorAll('[data-thumb-index]')
        .forEach((t) => t.classList.toggle('is-active', t === thumb));
    });
  });
}

function renderNotFound() {
  const root = document.querySelector('[data-product-detail]');
  if (!root) return;
  root.innerHTML = `
    <div class="product-not-found">
      <h1>Produkt ikke funnet</h1>
      <p>Beklager, vi kunne ikke finne dette produktet.</p>
      <a href="/produkter" class="btn btn-primary">Tilbake til butikken</a>
    </div>
  `;
}

export async function initProductDetail() {
  const root = document.querySelector('[data-product-detail]');
  if (!root) return;
  const slug = getSlug();
  if (!slug) {
    renderNotFound();
    return;
  }
  root.innerHTML = `<p class="products-loading">Laster produkt…</p>`;
  try {
    const product = await getProductBySlug(slug);
    renderProduct(product);
  } catch (e) {
    console.error('[product-detail] load failed:', e);
    renderNotFound();
  }
}
