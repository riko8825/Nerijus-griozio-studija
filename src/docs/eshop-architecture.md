# Akva Studio E-shop — architektūra

**Versija:** 1.0 · **Data:** 2026-05-07 · **Faze:** F1 (fundament, be mokėjimų)

## Stack

- **Frontend:** statinis HTML/CSS/JS (be framework) — esama struktūra
- **CMS:** Sanity.io (atskiras `studio/` subprojektas)
- **Hosting:** Vercel (frontend) + Sanity Cloud (Studio)
- **Valiuta:** NOK only
- **Kalba:** NO default (e-shop), LT/EN palikta i18n schemoje ateičiai

## Folder layout

```
akva-studio/
├── src/
│   ├── pages/
│   │   ├── index.html         (esamas — booking)
│   │   ├── produkter.html     (NAUJAS — katalogas)
│   │   ├── produkt.html       (NAUJAS — vieno produkto template)
│   │   └── handlekurv.html    (NAUJAS — krepšelis)
│   ├── css/styles.css         (pridėta ~750 eil. shop sekcijai)
│   ├── js/
│   │   ├── main.js            (esamas — i18n, Setmore)
│   │   └── modules/           (NAUJAS — ES modules)
│   │       ├── shop-init.js   (entry point shop puslapiams)
│   │       ├── sanity-client.js
│   │       ├── products.js    (katalogo render)
│   │       ├── product-detail.js
│   │       ├── cart.js        (localStorage state)
│   │       ├── cart-page.js   (krepšelio UI)
│   │       ├── cart-icon.js   (header counter)
│   │       └── format.js      (NOK formatavimas, escapeHtml)
│   ├── data/
│   │   ├── products.json      (TUŠČIAS [] — emergency fallback; produktai live'e per Sanity)
│   │   ├── categories.json    (TUŠČIAS [] — emergency fallback)
│   │   └── site-settings.json
│   └── assets/images/products/
│       └── product-placeholder.svg
├── studio/                    (NAUJAS — Sanity Studio subprojektas)
│   ├── sanity.config.ts
│   ├── sanity.cli.ts
│   ├── package.json
│   └── schemaTypes/
│       ├── index.ts
│       ├── product.ts
│       ├── category.ts
│       ├── siteSettings.ts
│       └── objects/
│           ├── seo.ts
│           └── localeString.ts
├── scripts/
│   ├── fetch-sanity-data.mjs  (build-time GROQ → src/data/*.json)
│   └── sync-html.sh           (src/pages/*.html → root)
├── vercel.json                (rewrites + headers)
├── .env.example
└── docs/eshop-*.md
```

## Data flow (hibridinis)

```
Klientė → Sanity Studio → Sanity Cloud
                              ↓
              ┌───────────────┴───────────────┐
              ↓                               ↓
         BUILD TIME                      RUNTIME
   scripts/fetch-sanity-data.mjs   src/js/modules/sanity-client.js
              ↓                               ↓
       src/data/*.json              fetch CDN (apicdn.sanity.io)
              ↓                               ↓
              └────────→ produkter.html ←────┘
```

**Logika:**
- Jei `<meta name="sanity-project-id">` = `REPLACE_WITH_PROJECT_ID` → fallback į `src/data/products.json` (demo)
- Jei nustatyta → fetchina iš Sanity CDN, fallback į JSON jei klaida
- Build skriptas `fetch-sanity-data.mjs` veikia tik jei `SANITY_PROJECT_ID` env var

## URL routing

| URL | Failas | Aprašymas |
|---|---|---|
| `/` | `index.html` | Akva Studio homepage (LT default) |
| `/produkter` | `produkter.html` | Katalogas (NO) |
| `/produkter/[slug]` | rewrite → `produkt.html?slug=[slug]` | Produkto detalės |
| `/handlekurv` | `handlekurv.html` | Krepšelis |

Vercel `cleanUrls: true` — `/produkter` veikia be `.html`.

## Krepšelio state

`localStorage["akva_cart_v1"]`:
```json
{
  "items": [{
    "productId": "prod-001",
    "sku": "AKV-001",
    "title": "...",
    "slug": "...",
    "price": 449,
    "image": "...",
    "quantity": 2,
    "addedAt": "ISO"
  }],
  "updatedAt": "ISO",
  "currency": "NOK"
}
```

- Expiration: 30d
- Cross-tab: nėra (vienas browser only)
- Checkout: F2 fazė (kol kas — mailto su order summary)

## Schema.org markup

`product-detail.js` automatiškai inject'ina `<script type="application/ld+json">` kiekvienam produkto puslapiui:
- `@type: Product` su `name`, `image`, `sku`, `brand`
- `offers.@type: Offer` su `priceCurrency: NOK`, `availability` (InStock/OutOfStock)
- `gtin13`, `mpn` jei nustatyti (Google Shopping ready)

## Migration plan į F2 (vėliau)

| Variantas | Setup laikas | Mokesčiai | Vipps native | Verdiktas |
|---|---|---|---|---|
| Snipcart | 1-2d | 2% transaction | Per 3rd party | Greitas start |
| Shopify Buy Button | 0.5d | $5/mo + 2% | Native | Vendor lock-in |
| Stripe Checkout + Supabase | 4-6d | Tik Stripe fees | Reikia Vipps API | 100% kontrolė |

**Sprendimas atidedamas** — klientė pasirenka kai bus pasiruošusi (dokumentai + Stripe sąskaita).

## Tech debt / known issues

1. **Cache-buster** — vis dar nėra `?v=...` versionavimo (klientė turės Ctrl+Shift+R po deploy)
2. **i18n shop puslapiams** — NO only dabar; LT/EN paslėpti (data-i18n nenaudojamas shop module'iuose)
3. **Sanity webhook revalidate** — manualus deploy F1; webhook `api/revalidate.ts` paliktas placeholder'iui (NICE TO HAVE)
4. **Image optimization** — Sanity duos `?w=400&fm=webp` automatiškai, demo placeholder'ius optimizuoti nereikia (SVG)
