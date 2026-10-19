# DECISION LOG — AKVA STUDIO

Architektūriniai ir produkto sprendimai. Naujausi viršuje.

---

## 2026-10-19 — Prekių variantai (kvapai): masyvas produkte, likutis per variantą

**Kontekstas:** Akvilė parduoda tą patį buteliuką su ~10 kvapų; nenori kelti 10 atskirų prekių.

**Sprendimas:** `product.variants[]` (`name`, `stock`, `image?`) + `variantLabel` (default „Duft“) tame pačiame Sanity dokumente. Kaina bendra prekei. Kai variantų yra — produkto `stock` laukas Studio paslepiamas, bendras likutis = variantų suma (`sanity-client.js withVariants`). Variantas identifikuojamas Sanity `_key`; krepšelio eilutė `productId:variantKey`; checkout ir webhook tikrina/mažina varianto likutį (`dec variants[_key=="…"].stock`, patikrinta Sanity `dryRun`).

**Atmesta:**
- Atskiri produktai kiekvienam kvapui — būtent tai, ko klientė nenori (dubliuotas aprašymas, nuotraukos, kategorijos).
- Atskiras `variant` dokumentų tipas su reference — Studio sudėtingesnis klientei, papildomos užklausos; ~10 variantų masyvui pakanka.
- Kaina per variantą — dabar nereikia (kvapai vienos kainos); pridėti `price` lauką galima vėliau be migracijos.

**Peržiūros trigger'iai:** reikės skirtingų kainų pagal dydį → `variants[].price`; reikės dviejų dimensijų (dydis × kvapas) → atskiras modelis.

---

## 2026-10-15 — Parduotuvės įėjimas: kategorijų kortelės vietoj filtrų

**Sprendimas:** `/produkter` be `?kategori=` rodo kategorijų korteles (Sanity `category.image` + `description`, jau egzistavę schemoje — Studio deploy nereikėjo). Tuščios kategorijos nerodomos. `?kategori=<slug>|alle` → prekių grid su filtrais. Pagal Akvilės pavyzdį (2026-10-15).

---

## 2026-10-02 — Mokėjimai: Stripe Checkout (hosted) + webhook, užsakymai Sanity be asmens duomenų

**Sprendimas:** F2 mokėjimams pasirinktas **Stripe Checkout (Stripe-hosted)** per dvi Vercel Node funkcijas be npm priklausomybių (`fetch` į Stripe REST):
- `api/checkout.js` — sesijos kūrimas; kaina, pavadinimas ir likutis imami tik iš Sanity serveryje (naršyklė siunčia `productId` + kiekį); pristatymas skaičiuojamas serveryje.
- `api/stripe-webhook.js` — įvykdymas: viena Sanity transakcija `create orders.<session.id>` + `dec stock`. Dokumento ID su tašku → viešai neprieinamas; jame **nėra asmens duomenų** (vardą, adresą, telefoną laiko Stripe).

**Atmesta:**
- Snipcart / Shopify Buy Button — papildomas % mokestis ir vendor lock-in; Stripe Checkout neturi mėnesinio mokesčio.
- Payment Element (forma svetainėje) — daugiau kodo ir PCI atsakomybės; hosted Checkout pakanka.
- Supabase orders lentelė — užsakymų sąrašą Akvilė mato Stripe Dashboard; Sanity `order` dokumentas reikalingas tik likučio idempotencijai.
- Stripe Node SDK — vienai `POST` + `GET` užklausai nereikia build žingsnio statiniam projektui.

**Taisyklės (pagal oficialų `stripe-best-practices` skill):** be `payment_method_types` (dinaminiai metodai — Vipps atsiras įjungus Dashboard'e), API versija `2026-08-26.dahlia` fiksuota, webhook privalomas (ne success page), `automatic_tax` neįjungtas, nes klientė ne MVA registre.

**Test vs live:** test režimo (`livemode=false`) užsakymai įrašomi, bet tikro likučio nemažina.

**Peržiūros trigger'iai:** Akvilė registruojasi MVA → `automatic_tax` + Stripe Tax registracija; Vipps patvirtintas → `vipps_preview=v1` antraštė; >~50 užsakymų/mėn → `order` schema Studio arba atskira DB.

---

## 2026-05-13 — Consent CMP: Cookiebot only (B variantas pasirinktas)

**Sprendimas:** Klientė nusprendė naudoti **Cookiebot** kaip vienintelę CMP visoje svetainėje. Silktide consent manager pašalinamas.

**Trigger'is:** Sesijoje #10 klientė pasakė „cookie bot bus" — t.y. sprendimas iš 2026-05-08 DECISION_LOG `C → B` perėjimo: Cookiebot license bus įsigyta, CBID atiduotas.

**Migracijos žingsniai (sekančiose sesijose):**
1. Klientė atiduoda real Cookiebot CBID → keičiame `data-cbid="CBID-PLACEHOLDER"` visuose 8 puslapiuose
2. Pašalinti Silktide artefaktus iš `index.html`:
   - `src/js/silktide-consent-manager.js` (1525 eil. vendor library)
   - `src/js/consent-init.js` (Silktide konfigūracija)
   - `src/css/silktide-consent-manager.css` (jei egzistuoja)
   - HTML `<link>` + `<script>` references
3. Patikrinti Cookiebot Declaration script (`/CBID/cd.js`) veiksmingumą `/slapukai` puslapyje (auto-generuoja slapukų sąrašą)
4. Production verify: banner pasirodo, sutikimas išsaugomas `CookieConsent` slapuke, GA4 įjungiamas tik su statistics consent

**Tarpinis status quo (iki CBID gavimo):**
- Cookiebot script visuose 8 puslapiuose su `data-cbid="CBID-PLACEHOLDER"` — banner neveikia, bet nereikia codo pakeitimų
- Silktide kodas dar `index.html` — neaktyvus iki migration žingsnio 2
- Consent Mode v2 default `denied` veikia normalu
- Slapukų politika (`/slapukai`) jau perrašyta su pilna Cookiebot dokumentacija + `Cookiebot.renew()` mygtukas

**Susiję failai:**
- `src/pages/slapukai.html` — pilna Cookiebot dokumentacija (4 sekcijos: Essential / Statistics / Marketing / Third-party)
- `src/pages/*.html:28-29` — `<script id="Cookiebot">` × 8 puslapiai
- `src/pages/index.html:815` — Silktide CSS (pašalinti)
- `src/js/consent-init.js` — Silktide config (pašalinti)

---

## 2026-05-08 — Consent CMP: hybrid status quo (atidėta) — ATMESTA 2026-05-13

> **STATUSAS:** Superseded by 2026-05-13 sprendimu. Paliekama istoriniam kontekstui.

**Sprendimas:** Palikti dabartinę consent infrastruktūrą be pakeitimų. Klientė vėliau nuspręs kuriuo keliu eiti.

**Dabartinė būsena:**
- **Silktide consent manager** — veikia tik `index.html` (CSS + JS + `consent-init.js`); localStorage saugo vartotojo pasirinkimus
- **Cookiebot CMP** — įdiegtas visuose 8 puslapiuose su `data-cbid="CBID-PLACEHOLDER"` (license dar neturim → banner'is neveikia)
- **Google Consent Mode v2** — default `denied` visuose 8 puslapiuose (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`)
- **GA4** — `G-XXXXXXXX` placeholder, dar neaktyvus

**Apsvarstyti variantai:**

| Variantas | Privalumai | Trūkumai |
|---|---|---|
| **A) Silktide visur** | Veikia iš karto, free, localStorage persist; nereikia laukti CBID | Reikia migruoti į Cookiebot vėliau, jei klientė norės pilnaverčio CMP |
| **B) Tik Cookiebot** | Vienas CMP, profesionalus, automatic blocking, audit ready | Neveikia kol klientė nenupirks Cookiebot license + neatiduos real CBID |
| **C) Hybrid (pasirinktas)** | Status quo — nieko nelaužiam | Banner'is veikia tik `index.html`; likę 7 puslapiai be funkcionalaus consent UI |

**Kodėl C:**
- Klientė dar neapsisprendė dėl Cookiebot license / GA4 setup
- Lankomumas low (kūrimo fazė) → real consent compliance dar nėra kritinis
- Sprendimas grįžtamas — bet kada galima pereiti į A arba B

**Kas trigger'ins peržiūrą:**
- Klientė atiduoda real Cookiebot CBID → automatiškai pereinam į **B**
- Klientė pasako „nereikia Cookiebot" → migruojam į **A** (Silktide visur)
- Production traffic auga → privaloma pasirinkti A arba B (GDPR/BDAR rizika)

**Susiję failai:**
- [src/pages/index.html:9-35](src/pages/index.html) — Consent Mode v2 + Cookiebot + GA4 head bloko šablonas
- [src/pages/index.html:814-817](src/pages/index.html) — Silktide CMP (tik index)
- [src/js/consent-init.js](src/js/consent-init.js) — Silktide konfigūracija (necessary + analytics)
- [src/js/silktide-consent-manager.js](src/js/silktide-consent-manager.js) — vendor library (1525 eil.)
