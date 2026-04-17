# CLAUDE.md — AKVA STUDIO

## PROJEKTAS
**Akva Studio** — grožio studija (blakstienų priauginimas, laminavimas, depiliacija, produktų pardavimas)
**Klientas:** Akvilė Suziedelytė · akvile.suziedelyte5@gmail.com
**Statusas:** Kūrimo fazė

---

## BRAND
- **Pavadinimas:** Akva Studio
- **Tagline:** Beauty · Care · Confidence
- **Stilius:** Minimalus / modernus / tech · Šviesus · Šiltos pastelinės spalvos
- **NE:** Ryškios spalvos, tamsus fonas
- **Spalvų paletė:** Rose / nude / warm beige tones (pagal logotipą)
- **Logo:** Linijinis moters veidas + AKVA STUDIO · Rose gold gradientas

## SPALVŲ SISTEMA
```
--color-bg:        #FDF6F0   ← šiltas kreminė/ivory fonas
--color-surface:   #FAF0E8   ← sekcijų fonas
--color-primary:   #B07D6A   ← rose-brown (logotipo spalva)
--color-accent:    #C9967F   ← šviesesnė rose
--color-text:      #2C1810   ← tamsus rudas tekstas
--color-muted:     #8A6A5E   ← pilkšvai rudas
--color-border:    #E8D5C9   ← subtili riba
```

## TIKSLINĖ AUDITORIJA
Moterys 16–70 metų. Problema: nori išryškintos išvaizdos, pašalinti nepageidaujamus plaukus.

## PAGRINDINIS CTA
**Užsiregistruoti procedūrai** — matomas iš karto, be slinkimo

---

## PUSLAPIO STRUKTŪRA (index.html)

```
1. HEADER     — logo + navigacija (LT/EN/NO switcher) + CTA mygtukas
2. HERO       — pagrindinis antraštė + sub + 2x CTA + hero vizualas
3. PASLAUGOS  — procedūrų kortelės su kainomis ir "Rezervuoti" mygtuku
4. APIE MUS   — Akvilės istorija + nuotrauka + unikalumas
5. PRIVALUMAI — kodėl rinktis Akva Studio (ikonos + tekstas)
6. PORTFOLIO  — prieš/po nuotraukos arba darbo pavyzdžiai
7. ATSILIEPIMAI — klientų reviews (carousel arba grid)
8. REGISTRACIJA — forma arba Calendly/Booksy embed
9. FOOTER     — kontaktai + soc. tinklai + copyright
```

---

## TECH STACK
- **Frontend:** HTML / CSS / JS (be framework)
- **Hosting:** Vercel (rekomenduojama)
- **Forma/Rezervacija:** Kontaktų forma → akvile.suziedelyte5@gmail.com (Formspree arba EmailJS)
- **Kalbos:** LT (default) · EN · NO — JS switcher
- **Integracijos:** Nė vienos (0 pažymėta klausimyne)

## FAILŲ STRUKTŪRA
```
akva-studio/
  src/
    pages/        ← source of truth HTML
      index.html
      paslaugos.html  (ateityje)
    css/
      styles.css  ← vienintelis CSS failas
    js/
      main.js     ← vienintelis JS failas
    assets/
      images/     ← klientės nuotraukos, logo
    docs/
      structure.md  ← CSS/JS/HTML žemėlapis

  index.html      ← synced kopija (cp src/pages/index.html index.html)
  CLAUDE.md       ← šis failas
  SESSION_STATUS.md
  PROJECT_STATUS.md
```

## SYNC KOMANDA
```bash
cp src/pages/index.html index.html
```

---

## CSS/JS TAISYKLĖS
- Visas CSS → `src/css/styles.css` — jokių inline stilių
- Visas JS → `src/js/main.js` — jokių inline skriptų
- Mobile-first responsive

## KONKURENTAI (klientui patinka)
- clinicep.lt — aiški procedūrų registracija, kainos matomos iš karto
- plaukeliusalinimas.lt — "skanus" dizainas, estetiškai
- studiom.lt — aiški struktūra iš karto

## KONKURENTAI (rinkos)
- klinikkarendal.no
- helseblikk.no

---

## SESIJOS WORKFLOW
```
Kūrimas → Sync → Test lokaliai → Deploy Vercel → Production verify
```

## DEFINITION OF DONE
- [ ] Kodas veikia lokaliai
- [ ] Mobile responsive
- [ ] 3 kalbos veikia (LT/EN/NO)
- [ ] Registracijos forma siunčia el. laišką
- [ ] Deploy padarytas
- [ ] Klientė patvirtina

---

## NEVER
- Inline CSS ar JS HTML faile
- Ryškios spalvos (#FF0000 tipo)
- Angliškas tekstas kai reikia lietuviško (ir atvirkščiai)
- Deploy be klientės patvirtinimo
