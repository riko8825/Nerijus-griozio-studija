# PROJECT STATUS — AKVA STUDIO

| Komponentas | Statusas | Pastaba |
|---|---|---|
| Projekto struktūra | ✅ Sukurta | CLAUDE.md, aplankai, sync workflow |
| Header / nav | ✅ Įgyvendinta | LT/EN/NO switcher, mobile nav, 5 nav punktai |
| Hero | ✅ Įgyvendinta | SVG iliustracija, 10+ metų patirtis stat |
| Paslaugos | ✅ Pilna | 2 kategorijos × 8 subkategorijos × 17 paslaugų su trukmėmis ir kainomis (kr) |
| Produktai | 🟡 Placeholder | 3 generinės kortelės su „Netrukus" tag — laukia klientės produktų sąrašo |
| Apie mus | ✅ Tikras tekstas | Klientės balsas, „Labas, mieloji ✨", 10 metų patirtis |
| Kodėl mes | ✅ Įgyvendinta | 4 privalumai (be klientės korekcijos) |
| Portfolio | 🟡 Placeholder | 4 kortelės — laukia klientės nuotraukų |
| Atsiliepimai | 🟡 Mišrus | 3 LT placeholder + 3 norvegiški (Janne/Marie/Anita) |
| Booking forma | 🟡 Veikia, ne galutinė | 17 paslaugų select su `<optgroup>`, action laukia Formspree ID |
| **Rezervacija (kalendorinė)** | ⏭️ **Atidėta** | Laukia kliento sprendimo: Booksy / Calendly / Cal.com / multi-step Formspree |
| Footer | ✅ Įgyvendinta | Kontaktai, navigacija, copyright |
| LT tekstai | ✅ Pilni | 132 i18n raktai |
| EN tekstai | ✅ Pilni | 132 i18n raktai |
| NO tekstai | ✅ Pilni | 132 i18n raktai |
| Cookie consent | ✅ Įgyvendinta | Silktide consent manager |
| SVG iliustracija | ✅ Sukurta | `woman-face.svg` (5.3 KB, vector, ARIA) |
| Klientės nuotraukos | ⬜ Laukiama | About, portfolio sekcijos |
| Logo SVG/PNG | ⬜ Laukiama | Turima JPG, reikia vector |
| Formspree paskyra | ⬜ Nesukurta | Reikia ID → `REPLACE_WITH_FORMSPREE_ID` |
| Mobile responsive | ✅ Įgyvendinta | Visi sekcijos breakpoint'ai (1024 / 768 / 480) |
| Deploy (Vercel) | ⬜ Nedaryta | Domenas nesprendžiamas (akva.lt / akvastudio.lt) |
| Klientės patvirtinimas | ⬜ Laukiama | |

---

## BLOCKERS

1. **Rezervacijos sistema** — laukia klientės sprendimo dėl varianto
2. **Klientės nuotraukos** — be jų portfolio ir about lieka placeholder
3. **Formspree paskyra** — be jos forma neveiks production'e

## NEXT SESSION ENTRY POINTS

- A) Klientė pasirinko rezervacijos variantą → ETAPAS 6 įgyvendinimas
- B) Gautos nuotraukos → integruoti į about + portfolio
- C) Formspree ID gautas → pakeisti `REPLACE_WITH_FORMSPREE_ID` → testuoti formą
- D) Vercel deploy + domain setup
