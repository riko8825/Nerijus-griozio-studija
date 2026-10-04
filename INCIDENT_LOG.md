# INCIDENT LOG — AKVA STUDIO

Produkcijos incidentai ir postmortem. Naujausi viršuje.

---

## I-002 — 2026-10-02 — Stripe raktai kitame Vercel projekte + `pk_` vietoj `sk_`

**Kas nutiko:** po push'o `/api/checkout` grąžino `payment_provider_error`; Vercel API rodė 0 env kintamųjų projekte `akva-studio`.

**Priežastis:**
1. Tas pats GitHub repo (`riko8825/Nerijus-griozio-studija`) prijungtas prie **dviejų** Vercel projektų: `akva-studio` (domenai akvastudio.no) ir dublikato `nerijus-griozio-studija`. Raktai buvo įdėti į dublikatą.
2. Perkėlus į `akva-studio`, `STRIPE_SECRET_KEY` laukelyje buvo **Publishable key** (`pk_test_…`) — Stripe log'e: „cannot be made with a publishable API key“.

**Ištaisyta:** raktai perkelti į `akva-studio`, dublikate pašalinti; įdėtas `sk_test_…`; `vercel redeploy` (env taikomi tik naujam deploy'ui). E2E 8/8 ✅.

**Prevencija:** prieš testą tikrinti per Vercel API `GET /v10/projects/akva-studio/env` (tik pavadinimai/tipai); klaidų log'uose tikrinti `vercel logs --project akva-studio --level error`. Dublikatą `nerijus-griozio-studija` atjungti nuo GitHub.

---

## I-001 — 2026-05-07 → 2026-10-02 — Produkto puslapiai neveikė („Produkt ikke funnet“)

**Kas nutiko:** visi `/produkter/<slug>` puslapiai rodė „Produkt ikke funnet“ ~5 mėnesius; pastebėta tik per Stripe E2E testą. Papildomai nuo domeno keitimo (2026-09-24) neveikė ir `/produkter` katalogas.

**Priežastis:**
1. `vercel.json` rewrite `/produkter/:slug → /produkt?slug=:slug` vyksta serveryje — naršyklės URL lieka `/produkter/<slug>`, o `product-detail.js` slug skaitė tik iš `location.search`.
2. Sanity CORS leido tik `akva-studio.vercel.app`, ne naują `akvastudio.no`.

**Ištaisyta:** `getSlug()` skaito ir iš `pathname` (`0570fe3`); Sanity CORS + `https://www.akvastudio.no`, `https://akvastudio.no`.

**Prevencija:** po kiekvieno shop pakeitimo ar domeno keitimo — E2E nuo `/produkter` (katalogas → produktas → krepšelis), ne tik nuo krepšelio. Domeno keitimo checklist'e: Sanity CORS.
