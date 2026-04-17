# STRUCTURE.md — AKVA STUDIO

Atnaujinta: 2026-04-17

---

## HTML SEKCIJŲ ŽEMĖLAPIS (index.html)

| Sekcija | ID | Aprašas |
|---|---|---|
| Header | `#top` | Logo, nav, lang switcher, CTA mygtukas |
| Mobile nav overlay | `#mobile-nav` | Pilnas ekranas, rodomas tik mobile |
| Hero | `#hero` | Antraštė, sub, 2xCTA, statistikos, vizualas |
| Services | `#services` | 4 paslaugų kortelės su kaina + rezervacijos mygtukais |
| About | `#about` | Nuotrauka kairėje, tekstas dešinėje |
| Why Us | `#whyus` | 4 privalumai su ikonėlėmis (grid) |
| Portfolio | `#portfolio` | 4 nuotraukų kortelės (klientė atsiųs) |
| Testimonials | `#reviews` | 3 atsiliepimų kortelės |
| Booking | `#booking` | Kontaktų forma + paaiškinimai kairėje |
| Footer | — | Logo, navigacija, kontaktai, copyright |

---

## CSS KLASIŲ ŽEMĖLAPIS

### Layout
- `.container` — max 1200px, centered, 24px padding
- `.hero-inner` — 2-col grid
- `.about-inner` — 2-col grid
- `.booking-inner` — 2-col grid
- `.services-grid` — auto-fit minmax(280px)
- `.whyus-grid` — auto-fit minmax(240px)
- `.portfolio-grid` — auto-fit minmax(280px)
- `.testimonials-grid` — auto-fit minmax(300px)
- `.footer-inner` — 3-col grid (2fr 1fr 1fr)

### Komponentai
- `.btn` `.btn-primary` `.btn-outline` — mygtukai
- `.service-card` — paslaugų kortelė
- `.testimonial-card` — atsiliepimo kortelė
- `.booking-form` — kontaktų forma
- `.lang-switcher` `.lang-btn.active` — kalbų switcher
- `.hero-floating-card` — plaukiojanti kortelė hero sekcijoje

### Būsenos
- `.header.scrolled` — pridedama scroll metu
- `.lang-btn.active` — aktyvi kalba
- `.mobile-nav.open` — rodomas mobile meniu
- `.form-success.visible` — sėkmingo siuntimo pranešimas

---

## JS FUNKCIJŲ ŽEMĖLAPIS (main.js)

| Funkcija | Aprašas |
|---|---|
| `translations` | Objektas su LT/EN/NO vertimais |
| `applyLang(lang)` | Keičia kalbą, atnaujina visus `[data-i18n]` elementus |
| `initScrollHeader()` | Prideda `.scrolled` klasę header'iui |
| `initMobileNav()` | Burger meniu atidarymas/uždarymas |
| `initLangSwitcher()` | Kalbų mygtukų event listeners |
| `initSmoothScroll()` | Sklandus slinkimas į sekcijas |
| `initForm()` | Kontaktų formos siuntimas → Formspree |

### i18n sistema
- `[data-i18n="key"]` — teksto keitimas pagal kalbą
- `[data-i18n-placeholder="key"]` — placeholder keitimas
- `localStorage.akva_lang` — išsaugota kalba

---

## FORM INTEGRACIJOS ŽEMĖLAPIS

Forma: `#booking-form`
Action: `https://formspree.io/f/REPLACE_WITH_FORMSPREE_ID`
Laukai: `name`, `phone`, `service`, `message`
Siunčiama: JSON → Formspree → akvile.suziedelyte5@gmail.com

**TODO:** Sukurti Formspree paskyrą ir pakeisti `REPLACE_WITH_FORMSPREE_ID`

---

## SPALVŲ SISTEMA

```css
--color-bg:       #FDF6F0   ← pagrindinis fonas
--color-surface:  #FAF0E8   ← sekcijų fonas
--color-surface2: #F5E8DC   ← tamsesnis fonas
--color-primary:  #B07D6A   ← pagrindinis akcentas (rose-brown)
--color-accent:   #C9967F   ← šviesesnė rose
--color-text:     #2C1810   ← pagrindinis tekstas
--color-muted:    #8A6A5E   ← antrinis tekstas
--color-border:   #E8D5C9   ← kraštinės
```

---

## FONT'AI
- `Cormorant Garamond` — h1, h2, h3, h4, logo (elegant serif)
- `Inter` — body, buttons, labels (clean sans-serif)

---

## RESPONSIVE BREAKPOINTS
- `> 1024px` — pilnas 2-col layout
- `≤ 1024px` — hero, about, booking → 1 col
- `≤ 768px` — mobile nav, visi grid → 1 col
- `≤ 480px` — portfolio 1 col, smulkūs patikslinimai
