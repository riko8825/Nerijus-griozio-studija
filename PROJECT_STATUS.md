# PROJECT STATUS — AKVA STUDIO

| Komponentas | Statusas | Pastaba |
|---|---|---|
| Projekto struktūra | ✅ Sukurta | CLAUDE.md, aplankai, sync workflow (sed pattern atnaujintas — absolute paths /src/) |
| Header / nav | ✅ Įgyvendinta | LT/EN/NO switcher, mobile nav, „Parduotuvė" + „Krepšelis" + cart icon counter |
| Hero | ✅ Desktop split + mobile full-bg | Desktop: split layout (text + frame). Mobile (<1024px): `siluetas.png` kaip full background image, `hero-visual` paslėptas, content gradient overlay |
| Paslaugos | ✅ Pilna | 2 kategorijos × 8 subkategorijos × 17 paslaugų; visi 19 „Rezervuoti" mygtukų rodo į Setmore |
| Produktai (homepage placeholder) | 🟡 Senos kortelės | 3 generinės „Netrukus" kortelės — orphan po e-shop sukūrimo |
| Apie mus | ✅ Tekstas + video | Klientės balsas, foninis video1 (autoplay/muted/loop, aria-hidden) — Akvilės foto vis dar nėra |
| Kodėl mes | ✅ Įgyvendinta | 4 privalumai |
| Portfolio | ✅ 5 nuotraukos + video grid | 4 darbai + depiliacijos pavyzdys (span 2) + video (span 2, autoplay) |
| Atsiliepimai | 🟡 Mišrus | 3 LT placeholder + 3 norvegiški (Janne/Marie/Anita) |
| **Rezervacija** | ✅ **Setmore tiesioginis** | Visi 15 mygtukų → `https://akvastudio.setmore.com/akvile` `target=_blank` |
| Footer | ✅ Įgyvendinta | Kontaktai, navigacija, copyright |
| LT/EN/NO i18n | ✅ Pilni | ~145 raktų × 3 kalbos; e-shop puslapiai NO only |
| Cookie consent | ✅ Įgyvendinta | Silktide consent manager |
| Klientės nuotraukos | 🟡 Iš dalies | 5 nuotraukos (hero + 4 portfolio + depiliacija) integruotos; Akvilės foto trūksta |
| Klientės video | ✅ Integruota | 2 failai: about background + portfolio grid (autoplay) |
| Logo SVG/PNG | ⬜ Laukiama | Turima JPG, reikia vector |
| Mobile responsive | ✅ Įgyvendinta | Breakpoint'ai 1024 / 768 / 480; portfolio grid: 4→2→1 kolonos |
| Setmore embed mobile | ✅ Pataisyta | CTA `min-width: 0`, mobile `width: 100%` + 16px padding; iframe telpa 390/360 viewport'e (Playwright verify ✓) |
| Image optimization | ✅ Sukurta | `scripts/optimize-images.py` (PIL, WebP+JPG, 3 dydžiai) |
| Video compress | ⬜ Nedaryta | `akva-video-2.mp4` 5MB — reikia ffmpeg install + compress |
| Cache-buster | ⬜ Nedaryta | CSS/JS link'uose nėra `?v=...`, klientė turi hard reload |
| **Deploy (Vercel)** | ✅ **Live** | `https://akva-studio.vercel.app` ✅; custom domain laukia |
| Klientės patvirtinimas | 🟡 Reikia | Live URL klientei dar nepasidalintas |

---

## E-SHOP MODULIAI (NAUJA — F1 fundament)

| Modulis | Statusas | Pastaba |
|---|---|---|
| Sanity Studio | 🟡 Lokalus | `studio/` su 5 schemos veikia `localhost:3333`; **NEPADEPLOY'INTAS** į akva-studio.sanity.studio |
| Sanity projektas | ✅ Production | ID: `vwtjc4wg`, dataset: `production`, dabartiniai produktai: 1 (test „Kavapukas nr 1") |
| Sanity CORS | 🟡 Iš dalies | Pridėti localhost:3000/3333/8080; **TRŪKSTA `https://akva-studio.vercel.app`** |
| Klientės invite | ⬜ Nedaryta | Klientė neturi prieigos prie Studio |
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

1. **Studio NE deploy'intas** — klientė negali prisijungti, redaguoti produktų
2. **Sanity CORS Vercel domenui** — produkcijoje gali blokuotis `apicdn.sanity.io` fetch'ai
3. **Klientės invite nepadarytas** — laukia Studio deploy + Members invite
4. **Mobile fix nepatikrintas vizualiai** — Setmore embed iframe gali vis dar overflow'inti
5. **Aromatic89 realūs produktai** — be jų katalogas tuščias (live'e tik test produktas)
6. **Akvilės nuotrauka** — about sekcijoje rodomas video, ne foto
7. **Custom domain** — be jo URL nepatogus klientei (`vercel.app` subdomain)

## RESOLVED THIS SESSION

- ~~E-shop fundament~~ → **F1 LIVE** (Sanity + frontend katalogas + cart + Vercel deploy)
- ~~Hero blakstienos~~ → **siluetas.png** (rose-gold linijinis siluetas)
- ~~Visi „Rezervuoti" → iframe~~ → **tiesiai į Setmore** naujame lange
- ~~Setmore embed mobile overflow~~ → CSS fix įdėtas (vizualiai laukia patvirtinimo)
- ~~Sync skriptas manualus~~ → `bash scripts/sync-html.sh` (4 puslapiai)
- ~~Vercel deploy~~ → **live `https://akva-studio.vercel.app`** ✅

## NEXT SESSION ENTRY POINTS

- A) **Studio deploy + klientės invite** — `cd studio && npm run deploy`, sanity.io/manage Members
- B) **Sanity CORS** — `https://akva-studio.vercel.app` pridėti
- C) **Mobile fix patvirtinimas** — Chrome DevTools 390/360 viewport tikrinimas
- D) **Aromatic89 realūs produktai** — klientė pildo per Studio arba tu importuoji per JSON
- E) **F2 mokėjimų sprendimas** — klientės pasirinkimas tarp Snipcart/Shopify/Stripe
- F) **Custom domain** — Vercel → Domains setup
- G) **Cache-buster** — pridėti `?v=YYYYMMDD` prie CSS/JS `<link>` ir `<script>`
- H) **Akvilės nuotrauka** — pakeisti about video į foto kai gausim
