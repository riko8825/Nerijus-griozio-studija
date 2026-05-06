# PROJECT STATUS — AKVA STUDIO

| Komponentas | Statusas | Pastaba |
|---|---|---|
| Projekto struktūra | ✅ Sukurta | CLAUDE.md, aplankai, sync workflow (sed pattern atnaujintas) |
| Header / nav | ✅ Įgyvendinta | LT/EN/NO switcher, mobile nav, 5 nav punktai |
| Hero | ✅ Įgyvendinta su realia foto | `<picture>` + WebP/JPG srcset (480/768/1200w), `loading="eager"`, `fetchpriority="high"` |
| Paslaugos | ✅ Pilna | 2 kategorijos × 8 subkategorijos × 17 paslaugų; visi 19 „Rezervuoti" mygtukų rodo į Setmore |
| Produktai | 🟡 Placeholder | 3 generinės kortelės su „Netrukus" — laukia **Aromatic89** produktų sąrašo (foto + kainos) |
| Apie mus | ✅ Tekstas + video | Klientės balsas, foninis video1 (autoplay/muted/loop, aria-hidden) — Akvilės foto vis dar nėra |
| Kodėl mes | ✅ Įgyvendinta | 4 privalumai |
| Portfolio (foto) | ✅ 4 nuotraukos | Prieš/po, antakiai+blakstienos, volume, klasikinis (4-kolonų grid, 280px height) |
| Portfolio (video) | ✅ 1 video | Vertikalus 9:16, max-width 320px, controls, muted; failas 5MB — reikia compress |
| Atsiliepimai | 🟡 Mišrus | 3 LT placeholder + 3 norvegiški (Janne/Marie/Anita) |
| **Rezervacija** | ✅ **Setmore live** | iframe embed `#booking` sekcijoje + 19 paslaugų btn → tiesioginis link; Formspree forma pašalinta |
| Footer | ✅ Įgyvendinta | Kontaktai, navigacija, copyright |
| LT tekstai | ✅ Pilni | ~145 i18n raktų (5 portfolio_cap + 2 booking nauji) |
| EN tekstai | ✅ Pilni | ~145 i18n raktų |
| NO tekstai | ✅ Pilni | ~145 i18n raktų |
| Cookie consent | ✅ Įgyvendinta | Silktide consent manager |
| Klientės nuotraukos | 🟡 Iš dalies | 5 nuotraukos (hero + 4 portfolio) integruotos; Akvilės foto trūksta |
| Klientės video | ✅ Integruota | 2 failai: about background + portfolio play |
| Logo SVG/PNG | ⬜ Laukiama | Turima JPG, reikia vector |
| Mobile responsive | ✅ Įgyvendinta | Breakpoint'ai 1024 / 768 / 480; portfolio grid: 4→2 kolonos |
| Image optimization | ✅ Sukurta | `scripts/optimize-images.py` (PIL, WebP+JPG, 3 dydžiai) |
| Video compress | ⬜ Nedaryta | `akva-video-2.mp4` 5MB — reikia ffmpeg install + compress |
| Cache-buster | ⬜ Nedaryta | CSS/JS link'uose nėra `?v=...`, klientė turi hard reload |
| Deploy (Vercel) | ⬜ Nedaryta | Domenas nesprendžiamas (akva.lt / akvastudio.lt) |
| Klientės patvirtinimas | ⬜ Laukiama | Paskutinė pataisa (4-kolonų grid + 9:16 video) nepatvirtinta |

---

## BLOCKERS

1. **Aromatic89 produktų sąrašas** — be foto + aprašymų + kainų produktų sekcija lieka placeholder
2. **Akvilės nuotrauka** — about sekcijoje rodomas video, ne foto
3. **Domain pasirinkimas** — be sprendimo nėra Vercel deploy
4. **Logo vector formatas** — turima tik JPG, retina ekranuose blogai

## RESOLVED THIS SESSION

- ~~Rezervacijos sistema~~ → **Setmore live** (visa rezervacija veikia)
- ~~Formspree paskyra~~ → nebereikia (Setmore valdo confirmation/reminder/cancel)
- ~~Klientės darbo nuotraukos~~ → 5 integruotos (laukia daugiau)

## NEXT SESSION ENTRY POINTS

- A) Klientė atsiuntė Aromatic89 produktus → integruoti į `<section class="products">`
- B) Klientė atsiuntė Akvilės nuotrauką → pakeisti about video į foto (arba palikti video, foto į kitur)
- C) Domain pasirinktas → Vercel deploy + DNS
- D) Video compress → install ffmpeg, run `ffmpeg -i akva-video-2.mp4 -vcodec h264 -crf 28 -preset slow -an akva-video-2-compressed.mp4`
- E) Cache-buster → pridėti `?v=YYYYMMDD` prie CSS/JS `<link>` ir `<script>`
