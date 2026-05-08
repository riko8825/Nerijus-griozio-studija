# STRUCTURE.md — AKVA STUDIO

Atnaujinta: 2026-05-04

---

## HTML SEKCIJŲ ŽEMĖLAPIS (index.html)

| # | Sekcija | ID | Aprašas |
|---|---|---|---|
| 1 | Header | `#top` | Logo, nav (5 punktai), lang switcher (LT/EN/NO), CTA mygtukas |
| 2 | Mobile nav overlay | `#mobile-nav` | Pilnas ekranas, rodomas tik mobile |
| 3 | Hero | `#hero` | Antraštė, sub, 2× CTA, 3 stats (200+ / 10+ / 500+), SVG iliustracija |
| 4 | Services | `#services` | 2 kategorijos × 8 subkategorijos × 17 paslaugų eilučių |
| 5 | Products | `#products` | 3 placeholder kortelės + bottom CTA |
| 6 | About | `#about` | Akvilės nuotrauka kairėje, klientės balso tekstas dešinėje |
| 7 | Why Us | `#whyus` | 4 privalumai su numeriais (grid) |
| 8 | Portfolio | `#portfolio` | 4 nuotraukų kortelės (klientė atsiųs) |
| 9 | Testimonials | `#reviews` | 6 atsiliepimai (3 LT + 3 NO: Janne, Marie, Anita) |
| 10 | Booking | `#booking` | Forma su 17 paslaugų `<select>` + `<optgroup>` |
| 11 | Footer | — | Logo, navigacija (su Produktais), kontaktai, copyright |

---

## CSS KLASIŲ ŽEMĖLAPIS

### Layout
- `.container` — max 1200px, centered, 24px padding
- `.hero-inner` — 2-col grid
- `.about-inner` — 2-col grid
- `.booking-inner` — 2-col grid
- `.services-categories` — auto-fit minmax(420px) ← **NAUJAS** (pakeitė `.services-grid`)
- `.products-grid` — auto-fit minmax(260px) ← **NAUJAS**
- `.whyus-grid` — auto-fit minmax(240px)
- `.portfolio-grid` — auto-fit minmax(280px)
- `.testimonials-grid` — auto-fit minmax(300px) (dabar 6 kortelės)
- `.footer-inner` — 3-col grid (2fr 1fr 1fr)

### Komponentai
- `.btn` `.btn-primary` `.btn-outline` `.btn-sm` — mygtukai
- `.service-category` — paslaugų kategorinė kortelė ← **NAUJAS**
- `.service-subgroup` `.service-subgroup-title` — subkategorija ← **NAUJAS**
- `.service-row` — paslaugos eilutė (4-col desktop / 2x2 mobile) ← **NAUJAS**
- `.service-row-name` `.service-row-time` `.service-row-price` `.service-row-btn` — eilutės elementai
- `.product-card` `.product-icon` `.product-card-tag` — produktų kortelė ← **NAUJAS**
- `.products-cta` — bottom susisiekimo blokas ← **NAUJAS**
- `.testimonial-card` — atsiliepimo kortelė
- `.booking-form` — kontaktų forma
- `.lang-switcher` `.lang-btn.active` — kalbų switcher
- ~~`.hero-floating-card` — plaukiojanti kortelė~~ — **pašalinta sesijoje #7**
- `.hero-image-frame--illustration` — modifier hero SVG iliustracijai (desktop only)
- `.hero-illustration` — img tag stiliai (desktop only)
- Mobile (<1024px): `.hero` `background-image: url('../assets/images/hero-mobile.png')` `background-size: contain` ← **#7**

### Būsenos
- `.header.scrolled` — pridedama scroll metu
- `.lang-btn.active` — aktyvi kalba
- `.mobile-nav.open` — rodomas mobile meniu
- `.form-success.visible` — sėkmingo siuntimo pranešimas

### Šalintos klasės (ne naudojamos, bet CSS palikta)
- `.services-grid` `.service-card` `.service-icon` `.service-price` `.price-tag` — buvo naudojamos senose 4 paprastose kortelėse, dabar pakeista į kategorinį layout

---

## JS FUNKCIJŲ ŽEMĖLAPIS (main.js)

| Funkcija | Aprašas |
|---|---|
| `translations` | Objektas su LT/EN/NO vertimais (132 raktai per kalbą) |
| `applyLang(lang)` | Keičia kalbą, atnaujina visus `[data-i18n]`, `[data-i18n-placeholder]`, `[data-i18n-label]` elementus |
| `initScrollHeader()` | Prideda `.scrolled` klasę header'iui |
| `initMobileNav()` | Burger meniu atidarymas/uždarymas |
| `initLangSwitcher()` | Kalbų mygtukų event listeners |
| `initSmoothScroll()` | Sklandus slinkimas į sekcijas |
| `initForm()` | Kontaktų formos siuntimas → Formspree |

### i18n sistema
- `[data-i18n="key"]` — teksto keitimas pagal kalbą (textContent)
- `[data-i18n-placeholder="key"]` — input/textarea placeholder
- `[data-i18n-label="key"]` — `<optgroup>` label atributas ← **NAUJAS**
- `localStorage.akva_lang` — išsaugota kalba

---

## I18N RAKTŲ KATEGORIJOS

| Kategorija | Raktai | Pavyzdžiai |
|---|---|---|
| Navigation | 6 | `nav_services`, `nav_products`, `nav_book`, ... |
| Hero | 9 | `hero_title_1..3`, `hero_sub`, `hero_cta1..2`, `stat_*` |
| Services meta | 5 | `services_label`, `services_title`, `services_sub`, `cat_*_name`, `cat_*_sub` |
| Subgroups | 8 | `sub_face`, `sub_legs`, `sub_arms`, `sub_bikini`, `sub_underarms`, `sub_lash_new`, `sub_lash_refill`, `sub_lash_lam` |
| Service rows | 17 | `srv_face_lip`, ..., `srv_lash_lamination` |
| Optgroups | 8 | `opt_g_face`, ..., `opt_g_lash_lam` |
| Products | 11 | `products_label`, `prod1..3_title`, `prod1..3_desc`, `products_cta_*`, `products_tag` |
| About | 7 | `about_label`, `about_title`, `about_p1..2`, `about_li1..4`, `about_cta` |
| Why us | 9 | `whyus_label`, `whyus_title`, `whyus_sub`, `why1..4_t`, `why1..4_d` |
| Portfolio + Reviews | 9 | `portfolio_*`, `reviews_*`, `rev1..6_text/name/sub` |
| Booking + Form | 12 | `booking_*`, `book_f1..3`, `form_*` |
| Footer | 4 | `footer_*` |
| Common | 1 | `book_btn` |

**Iš viso:** 132 raktai × 3 kalbos = **396 vertimo įrašai**

---

## FORM INTEGRACIJOS ŽEMĖLAPIS

Forma: `#booking-form`
Action: `https://formspree.io/f/REPLACE_WITH_FORMSPREE_ID`
Laukai: `name`, `phone`, `service` (17 optgroup options), `message`
Siunčiama: JSON → Formspree → akvastudio75@gmail.com

**TODO:** Sukurti Formspree paskyrą ir pakeisti `REPLACE_WITH_FORMSPREE_ID`
**ATIDĖTA:** Kalendorinė rezervacija (Booksy / Calendly / Cal.com)

---

## ASSETS

```
src/assets/images/
  └── woman-face.svg   ← Hero iliustracija (5.3 KB, vector, ARIA)
```

**Reikia gauti iš klientės:**
- Logo (SVG/PNG, šiuo metu turima JPG)
- Akvilės nuotrauka (about sekcija)
- Portfolio nuotraukos (4 vietos)

---

## SPALVŲ SISTEMA

```css
--color-bg:       #FDF6F0   ← pagrindinis fonas (hero, products)
--color-surface:  #FAF0E8   ← sekcijų fonas (services, about, whyus)
--color-surface2: #F5E8DC   ← tamsesnis fonas (portfolio, accent zonos)
--color-primary:  #B07D6A   ← pagrindinis akcentas (rose-brown)
--color-accent:   #C9967F   ← šviesesnė rose
--color-text:     #2C1810   ← pagrindinis tekstas
--color-muted:    #8A6A5E   ← antrinis tekstas
--color-border:   #E8D5C9   ← kraštinės
--color-white:    oklch(99% 0.005 55)   ← šilta balta (kortelės)
```

---

## FONT'AI
- `Gilda Display` — h1, h2, h3, h4, kainos, logo (elegant serif)
- `Nunito Sans` — body, buttons, labels (clean sans-serif)

---

## RESPONSIVE BREAKPOINTS
- `> 1024px` — pilnas 2-col layout
- `≤ 1024px` — hero, about, booking → 1 col
- `≤ 768px` — mobile nav, visi grid → 1 col, paslaugų eilutės → 2x2 grid
- `≤ 480px` — portfolio 1 col, smulkūs patikslinimai

---

## SYNC WORKFLOW

```bash
cp src/pages/index.html index.html
```

Po kiekvieno HTML keitimo paleisti — atnaujina root `index.html` (Vercel deploy target).
