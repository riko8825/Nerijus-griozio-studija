#!/usr/bin/env node
/**
 * Build-time skriptas — fetch'ina Sanity duomenis ir įrašo į src/data/*.json.
 * Naudojamas pre-deploy: `node scripts/fetch-sanity-data.mjs`
 *
 * Jei SANITY_PROJECT_ID nenustatytas, nieko nedaro (palieka demo seed'us).
 * Jei nustatytas — overwrite'ina src/data/products.json, categories.json, site-settings.json.
 */

import {writeFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET || 'production';
const API_VERSION = process.env.SANITY_API_VERSION || '2026-01-01';
const TOKEN = process.env.SANITY_PUBLIC_TOKEN || process.env.SANITY_DEPLOY_TOKEN;

if (!PROJECT_ID) {
  console.log('[fetch-sanity-data] SANITY_PROJECT_ID not set — skipping. Demo seeds preserved.');
  process.exit(0);
}

async function query(groq) {
  const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(groq)}`;
  const headers = TOKEN ? {Authorization: `Bearer ${TOKEN}`} : {};
  const res = await fetch(url, {headers});
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status} — ${await res.text()}`);
  const data = await res.json();
  return data.result;
}

async function main() {
  console.log(`[fetch-sanity-data] Project: ${PROJECT_ID}, Dataset: ${DATASET}`);

  const productsQuery = `*[_type == "product" && isAvailable == true] | order(_createdAt desc){
    _id, title, "slug": slug.current, sku, brand, price, compareAtPrice, stock,
    isAvailable, isFeatured,
    "categoryId": category->_id, "categoryTitle": category->title,
    "images": images[]{"url": asset->url, alt},
    shortDescription, description, ingredients, usage, volume,
    gtin13, mpn, seo
  }`;

  const categoriesQuery = `*[_type == "category"] | order(order asc){
    _id, title, "slug": slug.current, description, "imageUrl": image.asset->url, order
  }`;

  const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

  const [products, categories, siteSettings] = await Promise.all([
    query(productsQuery),
    query(categoriesQuery),
    query(siteSettingsQuery),
  ]);

  writeFileSync(
    resolve(ROOT, 'src/data/products.json'),
    JSON.stringify(products || [], null, 2),
  );
  writeFileSync(
    resolve(ROOT, 'src/data/categories.json'),
    JSON.stringify(categories || [], null, 2),
  );
  writeFileSync(
    resolve(ROOT, 'src/data/site-settings.json'),
    JSON.stringify(siteSettings || {}, null, 2),
  );

  console.log(
    `[fetch-sanity-data] ✓ Wrote ${products?.length || 0} products, ${categories?.length || 0} categories.`,
  );
}

main().catch((err) => {
  console.error('[fetch-sanity-data] FAIL:', err.message);
  console.error('[fetch-sanity-data] Demo seeds preserved (no overwrite).');
  process.exit(0);
});
