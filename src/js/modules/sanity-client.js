// Sanity client — fetch wrapper su graceful fallback į src/data/*.json
// Kol klientė nesusikūrė Sanity projekto, naudoja STATIC_FALLBACK = true ir grąžina lokalų JSON.
// Kai SANITY_PROJECT_ID nustatomas naršyklėje per <meta name="sanity-project-id">, automatiškai pereina į CDN fetch.

const STATIC_FALLBACK_PATH = {
  products: 'src/data/products.json',
  categories: 'src/data/categories.json',
  siteSettings: 'src/data/site-settings.json',
};

function getMeta(name) {
  const el = document.querySelector(`meta[name="${name}"]`);
  return el ? el.getAttribute('content') : null;
}

function isSanityConfigured() {
  const id = getMeta('sanity-project-id');
  return id && id !== 'REPLACE_WITH_PROJECT_ID' && id.length > 0;
}

function buildSanityUrl(query) {
  const projectId = getMeta('sanity-project-id');
  const dataset = getMeta('sanity-dataset') || 'production';
  const apiVersion = getMeta('sanity-api-version') || '2026-01-01';
  const encoded = encodeURIComponent(query);
  return `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encoded}`;
}

async function fetchJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Fetch failed: ${path} (${res.status})`);
  return res.json();
}

async function sanityQuery(query) {
  const url = buildSanityUrl(query);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`);
  const data = await res.json();
  return data.result;
}

export async function getProducts() {
  if (!isSanityConfigured()) {
    return fetchJson(STATIC_FALLBACK_PATH.products);
  }
  try {
    const query = `*[_type == "product" && isAvailable == true] | order(_createdAt desc){
      _id, title, "slug": slug.current, sku, brand, price, compareAtPrice, stock,
      isAvailable, isFeatured,
      "categoryId": category->_id, "categoryTitle": category->title,
      "images": images[]{"url": asset->url, alt},
      shortDescription, description, ingredients, usage, volume,
      gtin13, mpn, seo
    }`;
    return await sanityQuery(query);
  } catch (e) {
    console.warn('[sanity-client] fallback to static JSON:', e.message);
    return fetchJson(STATIC_FALLBACK_PATH.products);
  }
}

export async function getProductBySlug(slug) {
  if (!slug) return null;
  if (!isSanityConfigured()) {
    const products = await fetchJson(STATIC_FALLBACK_PATH.products);
    return products.find((p) => p.slug === slug) || null;
  }
  try {
    const query = `*[_type == "product" && slug.current == "${slug}" && isAvailable == true][0]{
      _id, title, "slug": slug.current, sku, brand, price, compareAtPrice, stock,
      isAvailable, isFeatured,
      "categoryId": category->_id, "categoryTitle": category->title, "categorySlug": category->slug.current,
      "images": images[]{"url": asset->url, alt},
      shortDescription, description, ingredients, usage, volume,
      gtin13, mpn, seo
    }`;
    return await sanityQuery(query);
  } catch (e) {
    console.warn('[sanity-client] fallback to static JSON:', e.message);
    const products = await fetchJson(STATIC_FALLBACK_PATH.products);
    return products.find((p) => p.slug === slug) || null;
  }
}

export async function getCategories() {
  if (!isSanityConfigured()) {
    return fetchJson(STATIC_FALLBACK_PATH.categories);
  }
  try {
    const query = `*[_type == "category"] | order(order asc){
      _id, title, "slug": slug.current, description, "imageUrl": image.asset->url, order
    }`;
    return await sanityQuery(query);
  } catch (e) {
    console.warn('[sanity-client] fallback to static JSON:', e.message);
    return fetchJson(STATIC_FALLBACK_PATH.categories);
  }
}

export async function getSiteSettings() {
  if (!isSanityConfigured()) {
    return fetchJson(STATIC_FALLBACK_PATH.siteSettings);
  }
  try {
    const query = `*[_type == "siteSettings"][0]`;
    return await sanityQuery(query);
  } catch (e) {
    console.warn('[sanity-client] fallback to static JSON:', e.message);
    return fetchJson(STATIC_FALLBACK_PATH.siteSettings);
  }
}

// Sanity image URL builder — pridės `?w=400&fm=webp&q=80` parametrus kai bus configured
export function imageUrl(image, opts = {}) {
  if (!image || !image.url) return 'src/assets/images/products/product-placeholder.svg';
  const url = image.url;
  if (!url.includes('cdn.sanity.io')) return url;
  const params = new URLSearchParams();
  if (opts.w) params.set('w', opts.w);
  if (opts.h) params.set('h', opts.h);
  params.set('fm', opts.format || 'webp');
  params.set('q', opts.quality || '80');
  params.set('auto', 'format');
  return `${url}?${params.toString()}`;
}
