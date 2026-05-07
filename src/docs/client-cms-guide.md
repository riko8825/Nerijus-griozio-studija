# Sanity Studio — vartotojo gidas (LT)

**Skirta:** Akvilei · Akva Studio savininkei

Šis vadovas paaiškina, kaip valdyti produktus internetinėje parduotuvėje per Sanity Studio.

## Kaip prisijungti

1. Atidaryk: **https://akva-studio.sanity.studio**
2. Spausk **„Sign in with Google"**
3. Įvesk `akvastudio75@gmail.com` ir slaptažodį

> Pirmą kartą jungiantis tave kvies admin (Empirra) — patvirtink kvietimą iš email'o.

## Studio struktūra

Pasirinkimai kairėje pusėje:

| Skiltis | Ką darai |
|---|---|
| **Produkter** | Pridedi/redaguoji/trini produktus |
| **Kategorier** | Tvarkai kategorijas (Veido priežiūra, Kūnas, ir t.t.) |
| **Innstillinger** | Bendros parduotuvės nuostatos (kontaktai, frakto info) |

## Naujo produkto kūrimas

1. **Produkter** → spausk **„Create"** (apačioje dešinėje, žalias mygtukas)
2. Užpildyk laukus:

### Privalomi laukai

- **Produktnavn** (Pavadinimas) — norvegiškai, pvz., „Aromatic89 Hyaluron Serum"
- **Slug** — automatiškai generuojasi iš pavadinimo, palik
- **SKU** — unikalus kodas, formatas `AKV-013`, `AKV-014` (didink iš eilės)
- **Kategori** — pasirink iš sąrašo
- **Pris (NOK)** — kaina kronomis, pvz., `449`
- **Bilder** — minimum 1 nuotrauka, geriau 3-5

### Foto įkėlimas

- **Drag & drop** failą į **Bilder** lauką arba spausk **Upload**
- **Min dydis:** 1000×1000 px
- **Max dydis:** 5MB per nuotrauką
- **Formatas:** JPG, PNG, WEBP
- **Alt-tekst** — paprastas aprašymas norvegų kalba (pvz., „Aromatic89 serumas su pipete")

### Rekomenduojami laukai

- **Førpris** (Senoji kaina) — jei akcija (pvz., dabar 449, buvo 549 → atrodys kaip nuolaida)
- **Kort beskrivelse** — 1-2 sakiniai katalogui (max 200 simbolių)
- **Full beskrivelse** — detalesnis aprašymas su pastraipomis
- **Ingredienser** — sudėtis (kosmetikai privaloma)
- **Bruksanvisning** — kaip naudoti
- **Volum** — pvz., „30ml", „50g"

### Lager (Sandėlis)

- **Lager** — kiek vienetų turi (skaičius)
- **Synlig i butikk** — toggle'as „rodyti" / „slėpti" (jei produktas laikinai neprieinamas)
- **Fremhevet** — ar rodyti homepage'e (`isFeatured`)

3. **Publish** (apačioje dešinėje, žalias mygtukas)

> **Svarbu:** kol nespaudi „Publish", produktas yra **draft** — svetainėje nematomas.

## Produkto redagavimas

1. **Produkter** sąraše spausk produktą
2. Keisk laukus
3. **Publish** (perrašys ankstesnę versiją)

## Produkto laikinas slėpimas

Vietoj `Delete`, pakeisk **„Synlig i butikk"** → **OFF**. Produktas dings iš svetainės, bet duomenys liks.

## Produkto ištrynimas

**Tik kai tikrai nereikia** — `Delete` mygtukas (apačioje dešinėje, raudonas).

> ⚠️ Jei produktas buvo bet kieno krepšelyje (localStorage) — pirkėjas matys klaidą. Geriau naudok „Synlig i butikk: OFF".

## Kategorijų valdymas

1. **Kategorier** → **Create**
2. Užpildyk:
   - **Tittel** — kategorijos pavadinimas
   - **Slug** — auto
   - **Beskrivelse** — trumpas aprašymas
   - **Bilde** — kategorijos nuotrauka (neprivaloma)
   - **Rekkefølge** — eiliškumas (mažesnis = pirmas; pvz., 10, 20, 30)
3. **Publish**

## Kainų formatavimas

- Įvesk **TIK skaičių** (pvz., `449`, ne `449 kr`)
- Sistema automatiškai prideda valiutą
- Decimaliniai skaičiai: naudok tašką (`449.50`), ne kablelį

## Kaip atsinaujina svetainė

| Kada | Atnaujinimas |
|---|---|
| Spausi „Publish" | ~30s — atsiranda Sanity CDN'e |
| Frontend pakeitimai | Iki 60s — naršyklės cache |

> Jei nori greičiau pamatyti pakeitimus svetainėje — paspausk **Ctrl+Shift+R** (hard reload).

## Foto patarimai

- **Šviesus, neutralus fonas** (geriausia balta arba šviesi tekstūra)
- **Vienas produktas viename foto** (be kitų objektų)
- **Bent 3 nuotraukos:** front, side, in-use
- **Square (1:1)** proporcijos — geriausia katalogui

Įrankiai foto editavimui:
- **Canva** — nemokamas, easy
- **Remove.bg** — fonų pašalinimas (nemokamas iki 50/mėn)

## Pagalbos

- Empirra tech support: pinigine1@gmail.com
- Sanity dokumentacija: https://www.sanity.io/docs (anglų k.)

## FAQ

**Q: Pamiršau slaptažodį.**
A: Login screen → „Forgot password" → check email.

**Q: Ar galiu redaguoti produktą iš telefono?**
A: Taip — Sanity Studio veikia mobilioje naršyklėje, bet desktop'e patogiau.

**Q: Ką daryti jei foto neleidžia įkelti?**
A: Patikrink dydį (max 5MB) ir formatą (JPG/PNG/WEBP). Jei vis dar neveikia — kreipkis į support.

**Q: Ar galiu paruošti produktą iš anksto?**
A: Taip — užpildyk laukus, bet nespausk „Publish". Produktas liks **draft**. Vėliau paspausi „Publish" → atsiras svetainėje.
