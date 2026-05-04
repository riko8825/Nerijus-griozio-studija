# /sync — Sync HTML į root su path konvertavimu

Paleisk po kiekvieno HTML keitimo `src/pages/index.html`:

```bash
cp src/pages/index.html index.html && \
  sed -i 's|"\.\./css/|"src/css/|g; s|"\.\./js/|"src/js/|g; s|"\.\./assets/|"src/assets/|g' index.html
```

**Kodėl reikia sed:**
- `src/pages/index.html` naudoja `../css/`, `../js/`, `../assets/` (relative iš `src/pages/`)
- Root `index.html` turi naudoti `src/css/`, `src/js/`, `src/assets/` (relative iš root)
- Be konvertimo CSS/JS/SVG nesikrauna naršyklėje paleidus root failą per Live Server

**Patikrinimas po sync:**
```bash
grep -n "\.\./\|src/" index.html | head -10
```

Turi rodyti tik `src/css/`, `src/js/`, `src/assets/` — jokio `../`.
