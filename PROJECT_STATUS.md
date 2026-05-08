# PROJECT STATUS — AKVA STUDIO

| Komponentas | Statusas | Pastaba |
|---|---|---|
| Projekto struktūra | ✅ Sukurta | CLAUDE.md, aplankai, sync workflow (sed pattern atnaujintas — absolute paths /src/) |
| Header / nav | ✅ Įgyvendinta | LT/EN/NO switcher, mobile nav, „Parduotuvė" + „Krepšelis" + cart icon counter |
| Hero | ✅ Desktop split + mobile full-image | Desktop: split layout (text + frame). Mobile (<1024px): `hero-mobile.png` (1536×1024) `background-size: contain` (pilnas paveiksliukas matomas, neapkarpytas), content seka po image. `.hero-floating-card` pašalinta sesijoje #7 |
| Paslaugos | ✅ Pilna | 2 kategorijos × 8 subkategorijos × 17 paslaugų; visi 19 „Rezervuoti" mygtukų rodo į Setmore |
| Produktai (homepage placeholder) | 🟡 Senos kortelės | 3 generinės „Netrukus" kortelės — orphan po e-shop sukūrimo |
| Apie mus | ✅ Tekstas + video | Klientės balsas, foninis video1 (autoplay/muted/loop, aria-hidden) — Akvilės foto vis dar nėra |
| Kodėl mes | ✅ Įgyvendinta | 4 privalumai |
| Portfolio | ✅ 5 nuotraukos + video grid | 4 darbai + depiliacijos pavyzdys (span 2) + video (span 2, autoplay) |
| Atsiliepimai | 🟡 Mišrus | 3 LT placeholder + 3 norvegiški (Janne/Marie/Anita) |
| **Rezervacija** | ✅ **Setmore tiesioginis** | Visi 15 mygtukų → `https://akvastudio.setmore.com/akvile` `target=_blank` |
| Footer | ✅ Įgyvendinta | Kontaktai, navigacija, copyright + Teisinė informacija (4 nuorodos) + Impressum eilutė (atsakingas asmuo + email + telefonas) |
| LT/EN/NO i18n | ✅ Pilni | ~735 raktų × 3 kalbos (po sesijos #8 pridėta ~590 legal raktai); e-shop puslapiai NO only |
| Legal puslapiai | ✅ 4 puslapiai | `/privatumas`, `/slapukai`, `/salygos`, `/naudojimosi-taisykles` (LT/EN/NO i18n; placeholder'iai laukia klientės) |
| Impressum | ✅ Įgyvendinta | Inline footer'yje visuose 8 puslapiuose; `[ATSAKINGAS ASMUO]` + `[TELEFONAS]` placeholder'iai |
| Cookie consent | ✅ Įgyvendinta | Silktide consent manager |
| Klientės nuotraukos | 🟡 Iš dalies | 5 nuotraukos (hero + 4 portfolio + depiliacija) integruotos; Akvilės foto trūksta |
| Klientės video | ✅ Integruota | 2 failai: about background + portfolio grid (autoplay) |
| Logo SVG/PNG | ⬜ Laukiama | Turima JPG, reikia vector |
| Mobile responsive | ✅ Įgyvendinta | Breakpoint'ai 1024 / 768 / 480; portfolio grid: 4→2→1 kolonos |
| Setmore embed mobile | ✅ Pataisyta | CTA `min-width: 0`, mobile `width: 100%` + 16px padding; iframe telpa 390/360 viewport'e (Playwright verify ✓) |
| Image optimization | ✅ Sukurta | `scripts/optimize-images.py` (PIL, WebP+JPG, 3 dydžiai) |
| Video compress | ⬜ Nedaryta | `akva-video-2.mp4` 5MB — reikia ffmpeg install + compress |
| Cache-buster | ✅ Įgyvendinta | `?v=20260508` styles.css/main.js visuose 8 puslapiuose (sesija #8) |
| **Deploy (Vercel)** | ✅ **Live** | `https://akva-studio.vercel.app` ✅; custom domain laukia |
| Klientės patvirtinimas | 🟡 Reikia | Live URL klientei dar nepasidalintas |

---

## E-SHOP MODULIAI (NAUJA — F1 fundament)

| Modulis | Statusas | Pastaba |
|---|---|---|
| Sanity Studio | ✅ Production | `https://akva-studio.sanity.studio/` (appId: `pzscsmv1w270no5ojmth9il5`); deploy 2026-05-07 |
| Sanity projektas | ✅ Production | ID: `vwtjc4wg`, dataset: `production`, dabartiniai produktai: 1 (test „Kavapukas nr 1") |
| Sanity CORS | ✅ Pilna | localhost:3000/3333/8080, akva-studio.sanity.studio, akva-studio.vercel.app |
| Klientės invite | 🟡 Išsiųsta | Email akvastudio75@gmail.com → editor (laukia accept) |
| Frontend katalogas (`/produkter`) | ✅ Live | Render iš Sanity CDN su fallback į src/data/*.json (dabar tuščias `[]`) |
| Produkto puslapis (`/produkter/[slug]`) | ✅ Live | Vercel rewrite veikia, Schema.org Product+Offer markup |
| Krepšelis (`/handlekurv`) | ✅ Live | localStorage state, mailto checkout placeholder |
| Cart icon homepage'e | ✅ Live | Counter veikia per `localStorage` listener (be ES module) |
| Demo Aromatic89 produktai | ⬜ Ištrinti | 12 demo buvo, ištrinti į `[]` (variantas A: tik Sanity) |
| Realūs Aromatic89 produktai | ⬜ Nedaryta | Tik 1 test produktas Sanity'je |
| Mokėjimų gateway (F2) | ⬜ Planuojama | Snipcart / Shopify Buy / Stripe+Supabase — klientės sprendimas |
| Email confirmations (F4) | ⬜ Planuojama | Resend integracija ateityje |
| Order management (F5) | ⬜ Planuojama | Supabase orders table ateityje |

---

## BLOCKERS

1. **Klientė nepradėjo naudotis Studio** — invite išsiųstas, laukia accept + login + produktų pildymo
2. **Aromatic89 realūs produktai** — be jų katalogas tuščias (live'e tik test produktas „Kavapukas nr 1")
3. **Akvilės nuotrauka** — about sekcijoje rodomas video, ne foto
4. **Custom domain** — be jo URL nepatogus klientei (`vercel.app` subdomain)
5. **Logo SVG/PNG vector** — turima tik JPG
6. **favicon.ico** — `404` ant home page (Playwright console rodo)
7. **Legal placeholder'iai** — `[ATSAKINGAS ASMUO]`, `[TELEFONAS]`, `[ĮMONĖS PAVADINIMAS]`, `[ADRESAS]`, `[ĮMONĖS KODAS]`, `[DOMAIN]`, `[DATA]`, `[ŠALIES]` — klientė nepateikė
8. **Production verify nepilnas (#8)** — `/slapukai`, `/salygos`, `/naudojimosi-taisykles` + mobile + i18n switcher netestuoti (Claude Code crash)

## RESOLVED THIS SESSION (#8)

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

- A) **Klientė pradėjo Studio?** — verify ar produktai pildomi → `https://akva-studio.sanity.studio/`
- B) **Realūs Aromatic89 produktai** verify ant `/produkter` (kainos, foto, kategorijos)
- C) **Custom domain** — Vercel → Domains + Sanity CORS update + DNS setup
- D) **favicon.ico** — pridėti į `src/assets/` + `<link rel="icon">` head'e
- E) **F2 mokėjimų sprendimas** — klientės pasirinkimas tarp Snipcart/Shopify/Stripe
- F) **Akvilės nuotrauka** — pakeisti about video į foto kai gausim
- G) **Logo SVG/PNG vector** — paprašyti klientės
- H) ~~**Cache-buster**~~ → padaryta sesijoje #8
- I) **Production verify legal puslapių** — `/slapukai`, `/salygos`, `/naudojimosi-taisykles` + mobile 390 + i18n switcher (Playwright)
- J) **Klientė užpildo legal placeholder'ius** — be jų puslapiai juridiškai neatitinka
- K) **Cleanup** — debug screenshot'ai (`akva-*.png` × ~15) į `.gitignore` arba ištrinti
