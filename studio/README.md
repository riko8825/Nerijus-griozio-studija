# Akva Studio — Sanity CMS

Sanity Studio Akva Studio internetinei parduotuvei.

## Quick start

```bash
cd studio
npm install
cp ../.env.example .env  # užpildyk SANITY_STUDIO_PROJECT_ID
npm run dev              # http://localhost:3333
```

## Pilnas setup

Žr. `../src/docs/sanity-setup.md` (LT) — projekto sukūrimas, deploy, klientės invite.

## Klientės gidas

Žr. `../src/docs/client-cms-guide.md` (LT) — kaip kurti produktus, kategorijas.

## Schemos

- `product` — produktas (Aromatic89 prekės)
- `category` — kategorija
- `siteSettings` — singleton (kontaktai, frakto info)
- `objects/seo` — SEO metadata
- `objects/localeString` — multilingual string (palikta ateičiai LT/EN)

## Deploy

```bash
npm run deploy
```

Subdomain (pirmas kartas): `akva-studio` → https://akva-studio.sanity.studio

## Lokalūs duomenys vs production

Visi pakeitimai per Studio (lokalų ar deployed) eina tiesiai į **production dataset**. Jei nori atskirto dev — sukurk `staging` dataset'ą per `manage.sanity.io`.
