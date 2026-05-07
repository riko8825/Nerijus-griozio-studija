# Sanity Studio — setup instrukcija

**Auditorija:** Tu (developer) ARBA klientė pirmą kartą setup'ui.

## 1. Projekto sukūrimas (~5 min)

1. Atidaryk https://www.sanity.io/manage
2. Login per Google (`akvastudio75@gmail.com`)
3. **Create new project**
   - Name: `Akva Studio`
   - Plan: **Free** (3 users, 10k API requests/mo, 5GB assets — pakanka)
4. Atsidarius — nukopijuok `Project ID` (~12 simbolių)

## 2. Studio config (~2 min)

```bash
cd studio
npm install
```

Sukurk `studio/.env`:
```
SANITY_STUDIO_PROJECT_ID=tavo_project_id
SANITY_STUDIO_DATASET=production
```

(arba edit'ink `sanity.config.ts` ir įrašyk hardcode'u — bet `.env` rekomenduojamas)

## 3. Lokalus dev (~1 min)

```bash
cd studio
npm run dev
```

Atidaro http://localhost:3333 — gali kurti produktus, kategorijas. Visi pakeitimai → Sanity Cloud iš karto.

## 4. Studio deploy (~3 min)

```bash
cd studio
npm run deploy
```

Pirmą kartą paklaus subdomain'o — pasirink `akva-studio` → live URL: **https://akva-studio.sanity.studio**

## 5. Klientės pridėjimas

1. https://www.sanity.io/manage → tavo projektas → **Members**
2. **Invite** → įvesk klientės email (`akvastudio75@gmail.com`)
3. Role: **Editor** (gali kurti/redaguoti, bet ne keisti schemos)
4. Klientė gauna email su prisijungimo nuoroda

## 6. Frontend prijungimas

Kiekviename shop HTML faile (`produkter.html`, `produkt.html`, `handlekurv.html`) atnaujink:
```html
<meta name="sanity-project-id" content="TAVO_PROJECT_ID">
```

Vietoj `REPLACE_WITH_PROJECT_ID`.

Po sync'o (`scripts/sync-html.sh`) — root failai gauna naują ID, frontend automatiškai pereina iš static JSON į live Sanity.

## 7. Build pipeline (Vercel)

Vercel dashboard → Settings → Environment Variables:
- `SANITY_PROJECT_ID` = projekto ID
- `SANITY_DATASET` = `production`

Build command (jei nori pre-fetch'inti duomenis prieš deploy):
```
node scripts/fetch-sanity-data.mjs && bash scripts/sync-html.sh
```

(neprivaloma — frontend veiks ir be šito, runtime fetchins per CDN)

## 8. Schema migration ateityje

Jei reikės pakeisti schemą (pvz., `string` → `localeString`):

1. Edit `studio/schemaTypes/product.ts`
2. Push schemą: `cd studio && npm run deploy`
3. Migration script (jei reikia data backfill'inti) — žr. https://www.sanity.io/docs/migrating-data

## Kainos

| Plan | Free | Growth ($15/mo) |
|---|---|---|
| Users | 3 | 20 |
| API CDN req/mo | 10k | 1M |
| Assets | 5GB | 50GB |

Akva Studio (12 produktų, ~5 lankytojai/d.) — Free plan'o pakanka su atsarga.

## Troubleshooting

**"Studio neatidaro"** — patikrink ar `SANITY_STUDIO_PROJECT_ID` teisingas.

**"Klientė neturi prieigos"** — Members → patikrink ar Editor role priskirta.

**"Frontend nepamato naujų produktų"** — patikrink ar `isAvailable: true` produkte; CDN cache iki 60s.
