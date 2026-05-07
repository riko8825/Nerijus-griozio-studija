# SESSION STATUS — AKVA STUDIO

**Paskutinė sesija:** 2026-05-07 (#5)
**Statusas:** 🟢 Hero mobile redesign + booking CTA overflow fix · LIVE Vercel'e

---

## ISTORIJA

| Data | Sesija | Pagrindiniai pakeitimai |
|---|---|---|
| 2026-04-17 | #1 | Pradinė projekto struktūra: HTML, CSS, JS skeletas (LT placeholder) |
| 2026-05-04 | #2 | Etapai 1–5, 7–8: el. paštas, hero stats, APIE MUS perrašyta, SVG iliustracija, norvegiški atsiliepimai, paslaugų kategorijos su pilnu kainoraščiu, PRODUKTAI sekcija, EN/NO vertimai (132 raktai) |
| 2026-05-05 | #3 | Setmore booking integracija (19 service btn → tiesioginis link, iframe embed); klientės nuotraukos + video integruoti su `<picture>` + srcset (3 dydžiai × WebP/JPG); about sekcija → background video; portfolio 4 nuotraukos + 1 vertikalus video; sync skripto fix |
| 2026-05-07 | #4 | E-shop F1 fundament: Sanity Studio (5 schemos), 3 nauji NO puslapiai (produkter/produkt/handlekurv), 8 ES modules, krepšelio sistema, Vercel rewrites, hero siluetas, depiliacijos pavyzdys, video grid integracija, visi Rezervuoti btns → Setmore tiesiogiai, Setmore embed mobile fix, abs paths fix, Vercel live |
| 2026-05-07 | #5 | Hero mobile redesign — `siluetas.png` kaip full background image (<1024px) su fine-tuned position 768px/480px breakpoint'ams; `hero-visual` paslėptas mobile, `hero-content` su gradient overlay. Booking CTA overflow fix — `min-width: 0`, `max-width: 100%`, mobile `width: 100%` + `padding: 16px` kad „Atidaryti rezervaciją naujame lange" mygtukas neuzeitų už container'io (390px CTA → 319px @ 390px viewport) |

---

## SESIJA #5 (2026-05-07) — DETALĖS

### Atlikta

**Hero mobile redesign (siluetas.png kaip full background)**
- `<1024px`: `.hero` gauna `background-image: url(siluetas.png)`, `cover`, `center top`; `.hero::before` rose-glow paslėpta (image rays jį pakeičia); `.hero-visual` `display: none` mobile
- `.hero-content` gauna gradient overlay nuo apačios (transparent → bg) su `margin-top: 55vh` kad image užima ~viršuje pusę screen
- 768px breakpoint: `background-size: 240% auto`, `background-position: 30% top`
- 480px breakpoint (iPhone 390/Android 360): `background-size: 230% auto`, `background-position: 22% top`
- Desktop (≥1024px) split layout NEPALIESTAS — text kairėj, hero-visual frame dešinėj

**Booking CTA overflow fix**
- Root cause: `.booking-embed-cta` (a.btn) flex-column container'yje turėjo `min-width: auto` (default) + ilgas text + 36px padding → btn min-width buvo 390px > parent embed (342px) → overflow
- Global: `min-width: 0; max-width: 100%`
- Mobile (`<480px`): `width: 100%`, `box-sizing: border-box`, `white-space: normal`, `padding: 16px` (vietoj 36px), `word-break: break-word`
- Verify Playwright: 390px viewport CTA 319px ✓, 360px CTA 289px ✓, 1280px desktop 390px su `align-self: center` ✓

**Deploy**
- Commit `11e82c6` → `git push origin main` → Vercel auto-deploy

### Vizualus testavimas (Playwright local)
- 390×844 (iPhone): ✓ no horizontal scroll, hero image full vertical, rays matomi dešinėj-viršuj, CTA telpa
- 360×800 (Android): ✓ no horizontal scroll, kompozicija išlaikyta
- 1280×900 (desktop): ✓ split layout nepaliestas, no regression

### Ko NE padaryta / nepatvirtinta
1. **Production Vercel verify** — fix'ai live, bet vizualus patikrinimas nepadarytas
2. **Hero crop ne 100% match'inasi** su klientės screenshot — landscape image (1.6:1) limitas. Geriausias sprendimas: paruošti `siluetas-mobile.png` portrait 800×1400px

### Kitas žingsnis (sesija #6)
1. **Production verify** ant `https://akva-studio.vercel.app/` — patikrinti hero + booking iframe mobile chrome devtools
2. (Opcionalu) Paruošti `siluetas-mobile.png` portrait crop ir naudoti kaip mobile-only background image
3. Tęsti su F1 deployment user actions: Studio deploy + Sanity CORS + klientės invite (jei klientė pasirengusi)

---

## SESIJA #4 (2026-05-07) — DETALĖS

### Atlikta

**E-shop F1 fundament (Sanity + Frontend)**
- Sanity Studio (`studio/`): 5 schemos — `product` (5 grupės: main/details/inventory/seo/advanced), `category`, `siteSettings` singleton, `seo` object, `localeString` (palikta ateičiai LT/EN)
- Sanity projektas `vwtjc4wg` → produkcija aktyvi, 1 test produktas Sanity'je („Kavapukas nr 1", kategorija „bandymas")
- 3 nauji puslapiai NO default: `produkter.html` (katalogas), `produkt.html` (template), `handlekurv.html` (krepšelis)
- 8 ES modules: `shop-init`, `sanity-client` (su fallback į src/data/*.json), `products`, `product-detail`, `cart` (localStorage state), `cart-page`, `cart-icon`, `format` (NOK)
- Krepšelio counter homepage'e per `localStorage` listener (be ES module dependency main.js)
- Schema.org Product+Offer markup, NOK valiuta, mailto checkout placeholder
- 12 demo Aromatic89 produktų sukurta `src/data/products.json` → vėliau ištrinta į `[]` (variantas A: tik Sanity)

**Vercel routing & deploy**
- `vercel.json` rewrites: `/produkter/:slug` → `/produkt?slug=:slug` (cleanUrls compatible)
- Live URL: `https://akva-studio.vercel.app` ✅
- Visi 4 root failai (index/produkter/produkt/handlekurv) absolute paths `/src/...`

**Portfolio fixes (homepage)**
- HERO: `hero-lashes` → `siluetas.png` (rose-gold linijinis siluetas + `--illustration` modifier)
- 5-tas portfolio item: `pavyzdys-1.png` (depiliacijos prieš/po, span 2)
- Video perkeltas iš standalone block į grid `.portfolio-item-video` (autoplay/muted/loop, span 2, fill row)
- Booking sub paragraph („Užpildykite formą...") ištrintas iš 3 i18n kalbų

**Header/Nav atnaujinimai**
- Cart icon su counter (svg + counter span)
- Nav: „Produktai" (#products anchor) → „Parduotuvė" (/produkter)
- Pridėtas „Krepšelis" link mobile nav
- i18n raktai: `nav_shop`, `nav_cart` (LT/EN/NO)

**Visi 15 Rezervuoti mygtukų → tiesiai į Setmore**
- `https://akvastudio.setmore.com/akvile` su `target="_blank" rel="noopener"`
- Visuose 4 puslapiuose: header, mobile nav, hero CTA, products CTA, about CTA, footer
- `#booking` sekcija homepage'e palikta orphan (HTML faile, neskaitoma niekur)

**Bug fixes sesijos eigoje**
1. **tsconfig.json** Sanity Studio'je extends nuoroda į neegzistuojantį package — perrašyta į pilną inline config'ą
2. **Vercel rewrite path** — `/produkt.html` rewrite konfliktavo su `cleanUrls` (308 redirect) → pakeista į `/produkt`
3. **Absolute paths** — `src/...` → `/src/...` (CSS/JS 404 nuo nested URL'ų `/produkter/[slug]`)
4. **Setmore embed mobile responsive** — `.booking-embed`/`.booking-iframe` su `max-width: 100%`, `min-width: 0`, `box-sizing: border-box`; `<480px` breakpoint pridėtas (iPhone 390, Android 360)

**Dokumentacija**
- `src/docs/eshop-architecture.md` (architektūra, data flow, URL routing, migration plan F2)
- `src/docs/sanity-setup.md` (developer setup, deploy, klientės invite)
- `src/docs/client-cms-guide.md` (LT klientei — kaip kurti produktus per Studio)
- `studio/README.md`
- `.env.example` su Sanity + future placeholders

**Sync workflow**
- `scripts/sync-html.sh` — visi 4 puslapiai per vieną komandą (sed pattern atnaujinta absolute paths)
- CLAUDE.md sync sekcija atnaujinta
- Memory `feedback_sync_paths.md` atnaujinta

### Ko NE padaryta (laukia user'io)

1. **Studio deploy** (`cd studio && npm run deploy`) — Studio vis dar tik `localhost:3333`
2. **Sanity CORS** Vercel domain'ui (`https://akva-studio.vercel.app`) — neaišku, ar pridėjai
3. **Klientės invite** į Sanity (Editor role) per sanity.io/manage Members
4. **Mobile fix vizualus testas** — Playwright MCP nebuvo prieinamas, tu patvirtinimo nedavei
5. **Realūs Aromatic89 produktai Sanity'je** — tik 1 test produktas

---

## SESIJA #3 (2026-05-05) — DETALĖS

### Atlikta

**Setmore booking integracija**
- 19 paslaugų `service-row-btn` → `https://akvastudio.setmore.com/akvile` (target=_blank)
- `#booking` sekcija: Formspree forma pakeista į Setmore iframe (720px desktop / 640px mobile) + backup CTA + email fallback
- LT/EN/NO vertimai: `book_f1/2`, `booking_fallback`, `booking_open_full`

## SESIJA #3 (2026-05-05) — DETALĖS

### Atlikta

**Setmore booking integracija**
- 19 paslaugų `service-row-btn` → `https://akvastudio.setmore.com/akvile` (target=_blank)
- `#booking` sekcija: Formspree forma pakeista į Setmore iframe (720px desktop / 640px mobile) + backup CTA + email fallback
- LT/EN/NO vertimai: `book_f1/2`, `booking_fallback`, `booking_open_full`

**Media optimizacija ir integracija**
- 7 originalūs failai (17MB) → 5 semantiškai pavadintos nuotraukos × 3 dydžiai (480/768/1200w) × 2 formatai (JPG + WebP) = **30 versijų** (10–169KB)
- Python skriptas `scripts/optimize-images.py` (PIL, lanczos resize, JPEG q82 + WebP q80)
- Hero: `<picture>` + WebP fallback, `loading="eager"` + `fetchpriority="high"`
- Portfolio: 4× `<figure>` + `<picture>` (lazy)
- About sekcija: Akvilės placeholder → `akva-video-1.mp4` (autoplay/muted/loop/playsinline, aria-hidden)
- Portfolio video block: `akva-video-2.mp4` su controls (vertikalus 9:16, max-width 320px, object-fit contain)
- LT/EN/NO vertimai 5 portfolio caption'ams

**CSS pakeitimai**
- `.booking-embed`, `.booking-iframe`, `.booking-fallback`, `.booking-embed-cta`
- `.about-video`, `.about-video-player`
- `.portfolio-video-block`, `.portfolio-video-frame`, `.portfolio-video`, `.portfolio-video-caption`
- Portfolio grid: 3 kolonos → 4 kolonos (4 nuotraukos = 1 eilutė), height: 280px desktop / 220px tablet / 180px small mobile, gap: 8px, border-radius: 8px

**Bug fixes**
- Sync sed pattern: `"\.\./...|"src/...` → `\.\./...|src/...` (be `"`), kad apimtų multi-line `srcset` atributus, kur kelias prasideda po įtrauktais tarpais
- `CLAUDE.md` sync komanda atnaujinta

**Klientės klausimai (atsakymo draft pateiktas):**
1. Setmore paslaugos — patikrinta, OK
2. Tel. nr. — gali dėti asmeninį, vėliau pakeisti
3. Aromatic89 produktai — laukia foto + aprašymų + kainų
4. Daugiau short video / nuotraukos — lauks failų

---

## KAS LIKO

### Aktyvūs blokeriai
- [ ] **Studio deploy** — `cd studio && npm install && npm run deploy` → live `akva-studio.sanity.studio` (klientė dabar negali prisijungti per localhost)
- [ ] **Sanity CORS** Vercel domenui — `https://akva-studio.vercel.app` reikia pridėti į sanity.io/manage/project/vwtjc4wg/api → CORS origins (anksčiau pridėti tik localhost:3333/8080/3000)
- [ ] **Klientės invite į Sanity** (akvastudio75@gmail.com, Editor role) per Members
- [ ] **Realūs Aromatic89 produktai Sanity'je** — Sanity'je tik 1 test produktas „Kavapukas nr 1", reikia 5–15 realių (klientė ar tu pildys)
- [ ] **Mobile responsive vizualus testas** — Setmore embed fix nepatikrintas iPhone 390 / Android 360 (Playwright MCP nebuvo prieinamas)
- [ ] **Akvilės nuotrauka** (about sekcija) — dabar rodomas video1, ne foto
- [ ] **Daugiau klientės darbo nuotraukų ir short video** — klientė paminėjo papildomus failus
- [ ] **Realūs lietuviški atsiliepimai** (3 esami — Laura K., Monika P., Gintarė S. — placeholder)
- [ ] **Logo SVG/PNG** (turima JPG)
- [ ] **Telefono numeris Setmore'e ir svetainėje** — laukia klientės sprendimo dėl atskiro / asmeninio nr.

### Setup darbai
- [ ] **Custom domain** (akvastudio.no arba kt.) → Vercel → Domains
- [ ] **Klientės patvirtinimas dėl Vercel preview live URL** (`akva-studio.vercel.app`)
- [ ] **Video failo dydžio compress** — `akva-video-2.mp4` yra 5MB, reikia ffmpeg compress į ~1–2MB
- [ ] **F2 fazė: mokėjimų gateway** — klientė turės pasirinkti tarp Snipcart / Shopify Buy Button / Stripe+Supabase (žr. `src/docs/eshop-architecture.md`)

### Technical debt
- [ ] **Cache-buster** prie `<link rel="stylesheet">` — klientė turėjo Ctrl+Shift+R hard reload kai keitėsi CSS
- [ ] **`#booking` orphan sekcija** — homepage'e iframe + form kodas, į kurį niekas neveda; gali būti ištrinta
- [ ] **Galerijos vizualinis patvirtinimas** — paskutinė pataisa (4-kolonų grid + 9:16 video) nepatvirtinta klientės screenshot'u
- [ ] **Sanity webhook revalidate** — `api/revalidate.ts` placeholder neimplementuotas (klientė pakeitė produktą → laukia ~60s CDN cache)

### Išspręsta šioje sesijoje
- [x] ~~E-shop fundament~~ → Sanity Studio + 3 puslapiai + cart + Vercel live ✅
- [x] ~~Hero blakstienos~~ → siluetas.png ✅
- [x] ~~Setmore embed mobile fix~~ → CSS atnaujintas (vizualiai nepatikrintas) ⚠️
- [x] ~~Visi Rezervuoti btn → Setmore tiesiogiai~~ ✅
- [x] ~~Sync skriptas~~ → `bash scripts/sync-html.sh` (4 puslapiai) ✅

---

## KITAS ŽINGSNIS

1. **Studio deploy** — `cd studio && npm run deploy` → live URL klientei + invite į Members
2. **Sanity CORS** — pridėti `https://akva-studio.vercel.app` (production) ir bet koks future domain
3. **Aromatic89 produktų pildymas Sanity'je** — klientė pildys per Studio kai gaus prieigą; jei skubu — tu gali įvesti pirmus 5 demo
4. **Mobile fix patvirtinimas** — atidaryk Chrome DevTools (Ctrl+Shift+M → iPhone 12 → 390px) ant `https://akva-studio.vercel.app`, patikrink ar nėra horizontal scroll'o

---

## SVARBU
- Kontaktų el. paštas: **akvastudio75@gmail.com**
- Setmore: **https://akvastudio.setmore.com/akvile**
- Logo failas: prisegtas klausimyne (rose gold AKVA STUDIO)
- Domenas: rekomenduoti akva.lt arba akvastudio.lt
- Kainos: visur **kr** (norvegiškos kronos)
- Norvegiški atsiliepimai: vardas (Janne/Marie/Anita) lieka norvegiškas visose kalbų versijose, tekstas verčiamas
- Sync komanda (atnaujinta): `cp src/pages/index.html index.html && sed -i 's|\.\./css/|src/css/|g; s|\.\./js/|src/js/|g; s|\.\./assets/|src/assets/|g' index.html`
