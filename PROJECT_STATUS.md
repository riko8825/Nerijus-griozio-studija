# PROJECT STATUS — AKVA STUDIO

| Komponentas | Statusas | Pastaba |
|---|---|---|
| Projekto struktūra | ✅ Sukurta | CLAUDE.md, aplankai, sync workflow (sed pattern atnaujintas — absolute paths /src/) |
| Header / nav | ✅ Įgyvendinta | LT/EN/NO switcher (**NO default** nuo 2026-09-27), mobile nav, „Parduotuvė" + „Krepšelis" + cart icon counter |
| Hero | ✅ Full-bleed desktop + mobile image | **Desktop (≥1025px):** `siluetas.png` kaip `background-size: cover` per visą hero, tekstas overlay'iuje su gradient (oklch 95%→transparent iš kairės). `.hero-visual` blokas pašalintas sesijoje #10. Mobile (<1024px): `hero-mobile.png` (1536×1024) `background-size: contain`, content seka po image. |
| Paslaugos | ✅ Pilna | 2 kategorijos × 8 subkategorijos × 17 paslaugų; visi 19 „Rezervuoti" mygtukų rodo į Setmore |
| Produktai (homepage placeholder) | 🟡 Senos kortelės | 3 generinės „Netrukus" kortelės — orphan po e-shop sukūrimo |
| Apie mus | ✅ Tekstas + video | Klientės balsas, foninis video1 (autoplay/muted/loop, aria-hidden) — Akvilės foto vis dar nėra |
| Kodėl mes | ✅ Įgyvendinta | 4 privalumai |
| Portfolio | ✅ 5 nuotraukos + video grid | 4 darbai + depiliacijos pavyzdys (span 2) + video (span 2, autoplay) |
| Atsiliepimai | 🟡 Mišrus | 3 LT placeholder + 3 norvegiški (Janne/Marie/Anita) |
| **Rezervacija** | ✅ **Setmore tiesioginis** | Visi 15 mygtukų → `https://akvastudio.setmore.com/akvile` `target=_blank` |
| Footer | ✅ Įgyvendinta | Kontaktai, navigacija, copyright + Teisinė informacija (4 nuorodos) + Impressum eilutė (atsakingas asmuo + email + telefonas) |
| LT/EN/NO i18n | ✅ Pilni | **NO default + statinis NO HTML** (be LT flash, 2026-09-27); 380 raktų × 3 kalbos (+`legal_priv_li_share_7` Stripe) (sesijoje #10 pridėta ~50 legal raktai: `legal_priv_*` 5, `legal_cook_*` 25, `legal_terms_*` 11, `legal_rules_*` 5); e-shop puslapiai NO only |
| Legal puslapiai | ✅ 4 puslapiai pilnai perrašyti | Privatumo politika (10 sk.) + Slapukų politika (9 sk.) + Naudojimo sąlygos (12 sk.) + Naudojimosi taisyklės (12 sk.) × LT/EN/NO. Norvegijos teisė (forbrukerkjøpsloven, angrerettsloven, åndsverkloven). Akvilės kontaktai + akvastudio.no. **Org.nr. 937 906 463, Myreneveien 35, 4847 Arendal, ne MVA registre, PostNord 79 kr / fri frakt nuo 1000 kr / henting i studio, Stripe kaip duomenų gavėjas** — placeholder'ių 0 |
| Impressum | ✅ Klientės kontaktai | Inline footer'yje visuose 8 puslapiuose: Akvilė Sužiedelytė + akvastudio75@gmail.com + +47 462 40 853 |
| Cookie consent | 🟡 Cookiebot only (B) | Klientės sprendimas užfiksuotas 2026-05-13 DECISION_LOG: **Cookiebot only** (atmeta hybrid). Cookiebot script aktyvus visuose 8 puslapiuose su `CBID-PLACEHOLDER`. Silktide kodas dar repo (migracija laukia kliento CBID). Consent Mode v2 default `denied` |
| Klientės nuotraukos | 🟡 Iš dalies | 5 nuotraukos (hero + 4 portfolio + depiliacija) integruotos; Akvilės foto trūksta |
| Klientės video | ✅ Integruota | 2 failai: about background + portfolio grid (autoplay) |
| Logo SVG/PNG | ⬜ Laukiama | Turima JPG, reikia vector |
| Mobile responsive | ✅ Įgyvendinta | Breakpoint'ai 1024 / 768 / 480; portfolio grid: 4→2→1 kolonos |
| Setmore embed mobile | ✅ Pataisyta | CTA `min-width: 0`, mobile `width: 100%` + 16px padding; iframe telpa 390/360 viewport'e (Playwright verify ✓) |
| Image optimization | ✅ Sukurta | `scripts/optimize-images.py` (PIL, WebP+JPG, 3 dydžiai) |
| Video compress | ⬜ Nedaryta | `akva-video-2.mp4` 5MB — reikia ffmpeg install + compress |
| Cache-buster | ✅ Įgyvendinta | `?v=20260930d` styles/main.js; shop moduliai `shop-init.js?v=20261002` + versijuoti importai (cart-page, product-detail) |
| **Deploy (Vercel)** | ✅ **Live** | **`https://www.akvastudio.no`** (GoDaddy DNS: A @ 216.198.79.1, CNAME www → vercel-dns-017; apex 308 → www). Projektas `akva-studio`. ⚠️ Dublikatas `nerijus-griozio-studija` deploy'ina tą patį repo — atjungti. Hobby planas → Pro prieš live mokėjimus |
| Klientės patvirtinimas | ✅ Patinka | Akvilė 2026-10-02: „labai patinka rezultatai“ |

---

## E-SHOP MODULIAI (NAUJA — F1 fundament)

| Modulis | Statusas | Pastaba |
|---|---|---|
| Sanity Studio | ✅ Production | `https://akva-studio.sanity.studio/` (appId: `pzscsmv1w270no5ojmth9il5`); deploy 2026-05-07 |
| Sanity projektas | ✅ Production | ID: `vwtjc4wg`, dataset: `production`, dabartiniai produktai: 1 (test „Kavapukas nr 1") |
| Sanity CORS | ✅ Pilna | + `https://www.akvastudio.no`, `https://akvastudio.no` (2026-10-02, be credentials) |
| Klientės invite | ✅ Priimta | Akvilė prisijungusi; produktų dar neįkėlė |
| Frontend katalogas (`/produkter`) | ✅ Live | Render iš Sanity CDN su fallback į src/data/*.json (dabar tuščias `[]`) |
| Produkto puslapis (`/produkter/[slug]`) | ✅ Live (pataisyta) | **Nuo 2026-05 neveikė** („Produkt ikke funnet“ — slug skaitytas tik iš `?slug=`); fix `0570fe3` — slug iš pathname. E2E ✅ |
| Krepšelis (`/handlekurv`) | ✅ Live | Pristatymo pasirinkimas (PostNord 79 kr / fri frakt ≥1000 kr / henting i studio), „Gå til betaling“ → Stripe, grįžimo pranešimai, a11y fokusas, bfcache |
| Cart icon homepage'e | ✅ Live | Counter veikia per `localStorage` listener (be ES module) |
| Demo Aromatic89 produktai | ⬜ Ištrinti | 12 demo buvo, ištrinti į `[]` (variantas A: tik Sanity) |
| Realūs Aromatic89 produktai | ⬜ Nedaryta | Tik 1 test produktas Sanity'je |
| Mokėjimų gateway (F2) — Stripe Checkout | 🟢 Tested (test mode, live svetainėje) | `api/checkout.js`: kainos/likutis iš Sanity, API `2026-08-26.dahlia`, 30 min sesija, tik NO adresai, locale nb. E2E produkcijoje 2026-10-02: 8 sėkmingi test mokėjimai, atmesta kortelė, atšaukimas — visi ✅. Live: reikia `rk_live` + live webhook + Vercel Pro |
| Email confirmations (F4) | ⬜ Laukia klientės | Stripe kvitai (Settings → Customer emails) + pranešimai Akvilei — įjungia ji |
| Order management (F5) — Stripe webhook | 🟢 Tested | `api/stripe-webhook.js`: HMAC parašas, idempotentiška Sanity transakcija (`orders.<session>` be PII + `dec stock` published+draft), test mode likučio neliečia, oversold/missing → `needsReview`. 8/8 `fulfilled` produkcijoje. Studio dar neturi `order` schemos (užsakymus Akvilė mato Stripe) |
| Vipps | ⛔ Blocked | Stripe private preview — Akvilė pateikė prašymą 2026-10-01, laukia patvirtinimo; tada reikės `vipps_preview=v1` Stripe-Version antraštėje |

---

## BLOCKERS (po sesijos #11, 2026-10-04)

1. **Live mokėjimai** — reikia: Vercel Pro, Stripe live `rk_live` (Checkout Sessions: write) + live webhook endpoint + `whsec_`, Akvilės Stripe paskyros aktyvacija (banko sąskaita)
2. **Realūs produktai** — Akvilė žadėjo įkelti; test „Kavapukas nr 1“ (12 kr, Lager 5) pašalinti po to
3. **Vipps** — laukia Stripe private preview patvirtinimo
4. **Sąskaita Akvilei** — trūksta sutartos kainos + Empirra rekvizitų
5. **Cookiebot CBID + Silktide pašalinimas** — Silktide banneris (EN) vis dar rodomas index ir uždengia mobile lang switcher
6. **GA4 Measurement ID** — `G-XXXXXXXX` placeholder
7. **HTML i18n `textContent`** — legal puslapiuose nuorodos/tel/mailto nepaspaudžiami (48 nuorodos)
8. **CSP/HSTS antraštės** nenustatytos; `/api/checkout` be rate limit (Vercel Firewall)

## BLOCKERS (istoriniai, iki #10)

1. **Klientė nepradėjo naudotis Studio** — invite išsiųstas, laukia accept + login + produktų pildymo
2. **Aromatic89 realūs produktai** — be jų katalogas tuščias (live'e tik test produktas „Kavapukas nr 1")
3. **Akvilės nuotrauka** — about sekcijoje rodomas video, ne foto
4. **Custom domain** — be jo URL nepatogus klientei (`vercel.app` subdomain)
5. **Logo SVG/PNG vector** — turima tik JPG
6. **favicon.ico** — `404` ant home page (Playwright console rodo)
7. **Legal placeholder'iai (po sesijos #10)** — liko **2** placeholder'iai 2 puslapiuose: `[ADRESAS — pateiks klientė]` ir `[ORGNR — pateiks klientė]` (Privatumo §2 + Sąlygų §2). Visi kiti placeholder'iai (TELEFONAS, ATSAKINGAS ASMUO, DOMAIN, DATA, ŠALIES, ĮMONĖS PAVADINIMAS) užpildyti.
8. **Working tree neutarptintas (#10)** — ~30+ pakeitimų laukia commit'o: 4 legal pages × HTML + main.js + DECISION_LOG + hero CSS + cache-buster bumps. Production rodo seną versiją.
9. **Silktide migracija dar nepalietė kodo** — DECISION_LOG 2026-05-13 teigia Cookiebot only (B variantas), bet `silktide-consent-manager.js` (1525 eil.) + `consent-init.js` + CSS dar repo. Laukiama klientės Cookiebot CBID.
10. **HTML i18n strong/br/a tags prarandami** — `el.textContent = t[key]` JS logika (main.js:1079) konvertuoja viską į plain text. Egzistuojantis arch trūkumas, atsiranda Privatumo §2 + Sąlygų §2.

## RESOLVED THIS SESSION (#10)

- ~~Hero desktop tik split layout~~ → **full-bleed siluetas background** + gradient overlay tekstui skaitomumui
- ~~Legal puslapiai template'iniai su placeholder'iais~~ → **pilnai perrašyti pagal Akva Studio specifiką** (Norvegijos teisė, real kontaktai, real domain, real verslo modelis)
- ~~Klientės kontaktai placeholder'iuose~~ → **+47 462 40 853 + Akvilė Sužiedelytė + akvastudio.no** integruota 8 puslapiuose
- ~~Consent CMP hybrid status quo (atidėta)~~ → **Cookiebot only (B variantas)** sprendimas užfiksuotas DECISION_LOG 2026-05-13

## RESOLVED IN #8

- ~~Privatumo politika nėra~~ → **4 legal puslapiai** (`/privatumas`, `/slapukai`, `/salygos`, `/naudojimosi-taisykles`) × LT/EN/NO i18n
- ~~Impressum nėra~~ → **inline footer'yje visuose 8 puslapiuose** (atsakingas asmuo + email + telefonas)
- ~~Cache-buster nedaryta~~ → **`?v=20260508`** styles.css/main.js (Vercel CDN cache fix)
- ~~Footer be teisinių nuorodų~~ → 4-toji kolona „Teisinė informacija" su 4 legal nuorodom

## RESOLVED IN #7

- ~~`.hero-floating-card` ant hero~~ → **pašalinta** (HTML + 4 CSS blokai)
- ~~Mobile hero `cover` zoom + cropping~~ → **`contain`** (pilnas paveiksliukas matomas) + `padding-top: calc(72px + 100vw / 1.5)` rezervuoja aukštį
- ~~Klientės naujas paveiksliukas neintegruotas~~ → `hero-mobile.png` (1536×1024) live mobile
- ~~Mobile preview be DevTools~~ → `mobile-preview.html` su 5 device presets

## RESOLVED IN #6

- ~~Studio NE deploy'intas~~ → **`https://akva-studio.sanity.studio/`** ✅
- ~~Sanity CORS Vercel domenui~~ → **pridėta** `https://akva-studio.vercel.app`
- ~~Klientės invite nepadarytas~~ → **invite email išsiųstas** akvastudio75@gmail.com → editor
- ~~Mobile fix nepatikrintas vizualiai~~ → **Playwright production verify pass** (390/360/1280)
- ~~Sanity 4.x deprecation warning~~ → `sanity.cli.ts` migracija į `deployment.{appId, autoUpdates}`

## NEXT SESSION ENTRY POINTS

- A) **Commit + push pakeitimus iš #10** — ~30+ neutarptintų pakeitimų, push į main, Vercel auto-deploy. Po deploy production verify Playwright (LT/EN/NO + mobile 390) × 4 legal puslapiai
- B) **Klientės adresas + org.nr.** — gauti ir užpildyti `[ADRESAS]` + `[ORGNR]` Privatumo §2 + Sąlygų §2
- C) **Cookiebot CBID įdiegimas + Silktide migracija** — kai klientė pateiks CBID, keisti `data-cbid="CBID-PLACEHOLDER"` × 8 puslapiai, pašalinti `silktide-consent-manager.js` (1525 eil.) + `consent-init.js` + Silktide CSS, atnaujinti `index.html:815`
- D) **GA4 Measurement ID** — kai klientė pateiks, keisti `G-XXXXXXXX` × 8 puslapiai
- E) **Custom domain `akvastudio.no`** — Vercel → Domains + Sanity CORS update + DNS setup
- F) **HTML i18n perrašymo arch fix** — `main.js:1079` `el.textContent` → `el.innerHTML` (atsargiai dėl XSS) arba HTML-only kelias be `data-i18n` atributų sudėtingiems blokams (Privatumo §2, Sąlygų §2)
- G) **Klientė pradėjo Sanity Studio?** — verify ar produktai pildomi → `https://akva-studio.sanity.studio/`
- H) **Realūs Aromatic89 produktai** verify ant `/produkter` (kainos, foto, kategorijos)
- I) **favicon.ico** — pridėti į `src/assets/` + `<link rel="icon">` head'e
- J) **F2 mokėjimų sprendimas** — klientės pasirinkimas tarp Snipcart/Shopify/Stripe
- K) **Akvilės nuotrauka** — pakeisti about video į foto kai gausim
- L) **Logo SVG/PNG vector** — paprašyti klientės
- M) **Cleanup** — debug screenshot'ai (`akva-*.png` × ~18) į `.gitignore` arba ištrinti
