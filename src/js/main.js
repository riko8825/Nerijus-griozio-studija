/* ─────────────────────────────────────────
   AKVA STUDIO — main.js
   ───────────────────────────────────────── */

// ── TRANSLATIONS ──────────────────────────
const translations = {
  lt: {
    nav_services:      'Paslaugos',
    nav_products:      'Produktai',
    nav_about:         'Apie mus',
    nav_portfolio:     'Darbai',
    nav_reviews:       'Atsiliepimai',
    nav_book:          'Rezervuoti',
    hero_badge:        'Profesionali grožio studija',
    hero_title_1:      'Tavo',
    hero_title_2:      'grožis —',
    hero_title_3:      'mūsų rūpestis',
    hero_sub:          'Blakstienų priauginimas, laminavimas ir viso kūno depiliacija. Profesionaliai. Švelnus pojūtis. Aukštas rezultatas.',
    hero_cta1:         'Registruotis procedūrai',
    hero_cta2:         'Peržiūrėti darbus',
    stat_clients:      'Patenkintų klientių',
    stat_years:        'Metų patirtis',
    stat_procedures:   'Procedūrų per metus',
    services_label:    'Mūsų paslaugos',
    services_title:    'Procedūros ir kainoraštis',
    services_sub:      'Visi laikai ir kainos. Pasirink paslaugą ir registruokis iš karto.',
    cat_depil_name:    'Depiliacija',
    cat_depil_sub:     'Cukrumi arba vašku · vienintelė mieste cukraus pasta',
    cat_lash_name:     'Blakstienos',
    cat_lash_sub:      'Priauginimas, papildymai ir laminavimas',
    sub_face:          'Veidas',
    sub_legs:          'Kojos',
    sub_arms:          'Rankos',
    sub_bikini:        'Bikini',
    sub_underarms:     'Pažastys',
    sub_lash_new:      'Priauginimas',
    sub_lash_refill:   'Papildymai',
    sub_lash_lam:      'Laminavimas',
    srv_face_lip:      'Viršutinė lūpa',
    srv_face_brow:     'Antakiai',
    srv_face_chin:     'Smakras',
    srv_face_cheek:    'Skruostai',
    srv_face_full:     'Visas veidas',
    srv_legs_full:     'Kojos pilnai',
    srv_legs_half:     'Kojos iki kelių (pusė)',
    srv_legs_upper:    'Kojos virš kelių',
    srv_arms_full:     'Rankos pilnai',
    srv_arms_half:     'Rankos iki alkūnių',
    srv_bikini_line:   'Bikini linija',
    srv_bikini_brazil: 'Braziliškas bikini',
    srv_underarms:     'Pažastys',
    srv_lash_classic:  'Klasikinis priauginimas',
    srv_lash_volume:   'Volume priauginimas',
    srv_lash_2_3:      'Po 2–3 savaičių',
    srv_lash_3_4:      'Po 3–4 savaičių',
    srv_lash_4_5:      'Po 4–5 savaičių',
    srv_lash_lamination: 'Blakstienų laminavimas',
    opt_g_face:        'Depiliacija — Veidas',
    opt_g_legs:        'Depiliacija — Kojos',
    opt_g_arms:        'Depiliacija — Rankos',
    opt_g_bikini:      'Depiliacija — Bikini',
    opt_g_underarms:   'Depiliacija — Pažastys',
    opt_g_lash_new:    'Blakstienos — Priauginimas',
    opt_g_lash_refill: 'Blakstienos — Papildymai',
    opt_g_lash_lam:    'Blakstienos — Laminavimas',
    book_btn:          'Rezervuoti',
    products_label:    'Produktai',
    products_title:    'Profesionali priežiūra namuose',
    products_sub:      'Kruopščiai atrinkti produktai, kurie pratęsia procedūros efektą. Pilnas asortimentas — netrukus.',
    products_tag:      'Netrukus',
    prod1_title:       'Blakstienų priežiūrai',
    prod1_desc:        'Šepetėliai, valikliai ir serumai blakstienų priauginimui prižiūrėti.',
    prod2_title:       'Po depiliacijos',
    prod2_desc:        'Drėkinantys aliejai ir kremai jautriai odai po procedūros.',
    prod3_title:       'Veido priežiūrai',
    prod3_desc:        'Profesionalios serijos kremai, serumai ir kaukės kasdienei priežiūrai.',
    products_cta_text: 'Domina konkretus produktas? Parašyk — pakonsultuosiu ir pasakysiu turimas atsargas.',
    products_cta_btn:  'Susisiekti dėl produktų',
    about_label:       'Apie mane',
    about_title:       'Labas, mieloji ✨',
    about_p1:          'Jei jau esi čia, vadinasi skiri laiko sau ir savo grožiui. Labai džiaugiuosi, kad užsukai. Esu Akvilė — profesionali grožio specialistė, dirbanti su viso kūno depiliacijomis cukrumi (vienintelė mieste), vašku, blakstienų priauginimu bei laminavimu.',
    about_p2:          'Mano tikslas — ne tik gražus rezultatas, bet ir tai, kad jaustumeisi pasitikinti savimi. Kiekviena procedūra ir kiekvienas produktas mano studijoje yra kruopščiai atrinktas, kad suteiktų matomus rezultatus ir malonią patirtį. Tu tikrai esi gerose rankose.',
    about_li1:         '10 metų patirtis nuo 2016 m.',
    about_li2:         'Vienintelė mieste cukraus depiliacija',
    about_li3:         'Kruopščiai atrinkti produktai',
    about_li4:         'Asmeninis dėmesys kiekvienai klientei',
    about_cta:         'Rezervuoti vizitą',
    whyus_label:       'Kodėl mes',
    whyus_title:       'Jūsų pasirinkimas — teisingas',
    whyus_sub:         'Akva Studio — tai kokybė, profesionalumas ir jūsų grožis mūsų rankose.',
    why1_t:            'Profesionalumas',
    why1_d:            'Nuolat mokomės ir tobulėjame. Tik sertifikuotos technikės.',
    why2_t:            'Kokybė',
    why2_d:            'Naudojame tik patikrintas, aukštos kokybės medžiagas.',
    why3_t:            'Komfortas',
    why3_d:            'Šilta, jauki aplinka. Jautiesi kaip namuose.',
    why4_t:            'Unikalumas',
    why4_d:            'Vienintelė cukraus pasta depiliacija jūsų mieste.',
    portfolio_label:   'Mūsų darbai',
    portfolio_title:   'Rezultatai kalba patys',
    portfolio_sub:     'Tikri darbai. Tikri rezultatai. Tikros klientės.',
    reviews_label:     'Atsiliepimai',
    reviews_title:     'Ką sako klientės',
    rev1_text:         'Labai profesionali studija! Blakstienų priauginimas liko 4 savaites. Tikrai grįšiu.',
    rev1_name:         'Laura K.',
    rev1_sub:          'Blakstienų priauginimas',
    rev2_text:         'Cukraus pasta depiliacija — pirmą kartą gyvenime taip neskaudėjo. Rekomenduoju visoms!',
    rev2_name:         'Monika P.',
    rev2_sub:          'Depiliacija',
    rev3_text:         'Akvilė labai kruopšti ir maloni. Studija jauki. Grįžtu kiekvieną mėnesį.',
    rev3_name:         'Gintarė S.',
    rev3_sub:          'Nuolatinė klientė',
    rev4_text:         'Geriausias blakstienų laminavimas iš visų patirtų! Akvilė labai kruopšti ir rami. Rekomenduoju iš visos širdies.',
    rev4_name:         'Janne H.',
    rev4_sub:          'Blakstienų laminavimas',
    rev5_text:         'Cukraus depiliacija buvo daug mažiau skausminga nei vašku. Oda po procedūros lygi ir rami. Tikrai grįšiu!',
    rev5_name:         'Marie L.',
    rev5_sub:          'Cukraus depiliacija',
    rev6_text:         'Mano blakstienos atrodo natūraliai ir tankiai. Studija jauki, o Akvilė — tikra profesionalė.',
    rev6_name:         'Anita B.',
    rev6_sub:          'Blakstienų priauginimas',
    booking_label:     'Registracija',
    booking_title:     'Rezervuokite savo vizitą',
    booking_sub:       'Užpildykite formą ir susisieksime per 24 val.',
    book_f1:           'Greita registracija internetu',
    book_f2:           'Atsakome per 24 val.',
    book_f3:           'Galima atšaukti ar perkelti vizitą',
    form_name:         'Vardas',
    form_phone:        'Telefono numeris',
    form_service:      'Paslauga',
    form_service_def:  'Pasirinkite paslaugą',
    form_msg:          'Pageidavimai (neprivaloma)',
    form_submit:       'Siųsti užklausą',
    form_note:         'Susisieksime per 24 val. · akvastudio75@gmail.com',
    form_success:      '✓ Ačiū! Jūsų užklausa gauta. Susisieksime per 24 val.',
    footer_about:      'Profesionali grožio studija. Blakstienų priauginimas, laminavimas, depiliacija.',
    footer_nav_t:      'Navigacija',
    footer_contact_t:  'Kontaktai',
    footer_copy:       '© 2025 Akva Studio. Visos teisės saugomos.',
  },
  en: {
    nav_services:      'Services',
    nav_products:      'Products',
    nav_about:         'About',
    nav_portfolio:     'Portfolio',
    nav_reviews:       'Reviews',
    nav_book:          'Book Now',
    hero_badge:        'Professional beauty studio',
    hero_title_1:      'Your',
    hero_title_2:      'beauty —',
    hero_title_3:      'our care',
    hero_sub:          'Lash extensions, lash lamination and full-body hair removal. Professional. Gentle. High results.',
    hero_cta1:         'Book a procedure',
    hero_cta2:         'View our work',
    stat_clients:      'Happy clients',
    stat_years:        'Years experience',
    stat_procedures:   'Procedures / year',
    services_label:    'Our services',
    services_title:    'Services & price list',
    services_sub:      'All durations and prices. Pick a service and book directly.',
    cat_depil_name:    'Hair Removal',
    cat_depil_sub:     'Sugar paste or wax · the only sugar paste in town',
    cat_lash_name:     'Lashes',
    cat_lash_sub:      'Extensions, refills and lamination',
    sub_face:          'Face',
    sub_legs:          'Legs',
    sub_arms:          'Arms',
    sub_bikini:        'Bikini',
    sub_underarms:     'Underarms',
    sub_lash_new:      'Extensions',
    sub_lash_refill:   'Refills',
    sub_lash_lam:      'Lamination',
    srv_face_lip:      'Upper lip',
    srv_face_brow:     'Eyebrows',
    srv_face_chin:     'Chin',
    srv_face_cheek:    'Cheeks',
    srv_face_full:     'Full face',
    srv_legs_full:     'Full legs',
    srv_legs_half:     'Lower legs (half)',
    srv_legs_upper:    'Upper legs',
    srv_arms_full:     'Full arms',
    srv_arms_half:     'Forearms',
    srv_bikini_line:   'Bikini line',
    srv_bikini_brazil: 'Brazilian bikini',
    srv_underarms:     'Underarms',
    srv_lash_classic:  'Classic extensions',
    srv_lash_volume:   'Volume extensions',
    srv_lash_2_3:      'After 2–3 weeks',
    srv_lash_3_4:      'After 3–4 weeks',
    srv_lash_4_5:      'After 4–5 weeks',
    srv_lash_lamination: 'Lash lamination',
    opt_g_face:        'Hair Removal — Face',
    opt_g_legs:        'Hair Removal — Legs',
    opt_g_arms:        'Hair Removal — Arms',
    opt_g_bikini:      'Hair Removal — Bikini',
    opt_g_underarms:   'Hair Removal — Underarms',
    opt_g_lash_new:    'Lashes — Extensions',
    opt_g_lash_refill: 'Lashes — Refills',
    opt_g_lash_lam:    'Lashes — Lamination',
    book_btn:          'Book',
    products_label:    'Products',
    products_title:    'Professional care at home',
    products_sub:      'Carefully selected products that extend the effect of your treatment. Full range — coming soon.',
    products_tag:      'Coming soon',
    prod1_title:       'Lash care',
    prod1_desc:        'Brushes, cleansers and serums to care for lash extensions.',
    prod2_title:       'After depilation',
    prod2_desc:        'Moisturising oils and creams for sensitive skin after treatment.',
    prod3_title:       'Facial care',
    prod3_desc:        'Professional-grade creams, serums and masks for daily care.',
    products_cta_text: 'Interested in a specific product? Write to me — I will advise and tell you what is in stock.',
    products_cta_btn:  'Contact about products',
    about_label:       'About me',
    about_title:       'Hello, lovely ✨',
    about_p1:          'If you are here, it means you take time for yourself and your beauty. I am so glad you stopped by. I am Akvilė — a professional beauty specialist working with full-body sugar depilation (the only one in town), waxing, lash extensions and lamination.',
    about_p2:          'My goal is not only a beautiful result, but also that you feel confident in yourself. Every procedure and every product in my studio is carefully selected to deliver visible results and a pleasant experience. You are truly in good hands.',
    about_li1:         '10 years of experience since 2016',
    about_li2:         'The only sugar depilation in town',
    about_li3:         'Carefully selected products',
    about_li4:         'Personal attention to every client',
    about_cta:         'Book a visit',
    whyus_label:       'Why us',
    whyus_title:       'Your choice is right',
    whyus_sub:         'Akva Studio — quality, professionalism and your beauty in our hands.',
    why1_t:            'Professionalism',
    why1_d:            'We constantly learn and improve. Only certified technicians.',
    why2_t:            'Quality',
    why2_d:            'We use only proven, premium quality materials.',
    why3_t:            'Comfort',
    why3_d:            'Warm, cozy environment. Feel at home.',
    why4_t:            'Uniqueness',
    why4_d:            'The only sugar paste depilation in your city.',
    portfolio_label:   'Our work',
    portfolio_title:   'Results speak for themselves',
    portfolio_sub:     'Real work. Real results. Real clients.',
    reviews_label:     'Reviews',
    reviews_title:     'What clients say',
    rev1_text:         'Very professional studio! Lash extensions lasted 4 weeks. Will definitely come back.',
    rev1_name:         'Laura K.',
    rev1_sub:          'Lash Extensions',
    rev2_text:         'Sugar paste depilation — for the first time in my life it did not hurt like that. Recommend to everyone!',
    rev2_name:         'Monika P.',
    rev2_sub:          'Depilation',
    rev3_text:         'Akvilė is very thorough and pleasant. Studio is cozy. I come back every month.',
    rev3_name:         'Gintarė S.',
    rev3_sub:          'Regular client',
    rev4_text:         'Best lash lamination I have ever had! Akvilė is so precise and calm. Highly recommend.',
    rev4_name:         'Janne H.',
    rev4_sub:          'Lash Lamination',
    rev5_text:         'Sugar depilation hurt much less than wax. My skin felt smooth and calm afterwards. I will be back!',
    rev5_name:         'Marie L.',
    rev5_sub:          'Sugar Depilation',
    rev6_text:         'My lashes look so natural and full. The studio is cozy and Akvilė is a true professional.',
    rev6_name:         'Anita B.',
    rev6_sub:          'Lash Extensions',
    booking_label:     'Booking',
    booking_title:     'Book your visit',
    booking_sub:       'Fill in the form and we will contact you within 24 hours.',
    book_f1:           'Quick online booking',
    book_f2:           'We reply within 24h',
    book_f3:           'Easy to cancel or reschedule',
    form_name:         'Name',
    form_phone:        'Phone number',
    form_service:      'Service',
    form_service_def:  'Select a service',
    form_msg:          'Preferences (optional)',
    form_submit:       'Send request',
    form_note:         'We will contact you within 24h · akvastudio75@gmail.com',
    form_success:      '✓ Thank you! Your request has been received. We will contact you within 24h.',
    footer_about:      'Professional beauty studio. Lash extensions, lamination, depilation.',
    footer_nav_t:      'Navigation',
    footer_contact_t:  'Contact',
    footer_copy:       '© 2025 Akva Studio. All rights reserved.',
  },
  no: {
    nav_services:      'Tjenester',
    nav_products:      'Produkter',
    nav_about:         'Om oss',
    nav_portfolio:     'Portefølje',
    nav_reviews:       'Anmeldelser',
    nav_book:          'Bestill',
    hero_badge:        'Profesjonell skjønnhetsstudio',
    hero_title_1:      'Din',
    hero_title_2:      'skjønnhet —',
    hero_title_3:      'vår omsorg',
    hero_sub:          'Vipper, vippe-laminering og hårtjerning for hele kroppen. Profesjonelt. Skånsomt. Høye resultater.',
    hero_cta1:         'Bestill en behandling',
    hero_cta2:         'Se våre arbeider',
    stat_clients:      'Fornøyde kunder',
    stat_years:        'Års erfaring',
    stat_procedures:   'Behandlinger / år',
    services_label:    'Våre tjenester',
    services_title:    'Behandlinger og prisliste',
    services_sub:      'Alle varigheter og priser. Velg behandling og bestill direkte.',
    cat_depil_name:    'Hårfjerning',
    cat_depil_sub:     'Sukkerpasta eller voks · den eneste sukkerpastaen i byen',
    cat_lash_name:     'Vipper',
    cat_lash_sub:      'Extensions, påfyll og laminering',
    sub_face:          'Ansikt',
    sub_legs:          'Bein',
    sub_arms:          'Armer',
    sub_bikini:        'Bikini',
    sub_underarms:     'Armhuler',
    sub_lash_new:      'Extensions',
    sub_lash_refill:   'Påfyll',
    sub_lash_lam:      'Laminering',
    srv_face_lip:      'Overleppe',
    srv_face_brow:     'Øyenbryn',
    srv_face_chin:     'Hake',
    srv_face_cheek:    'Kinn',
    srv_face_full:     'Hele ansiktet',
    srv_legs_full:     'Hele bein',
    srv_legs_half:     'Legger (halve bein)',
    srv_legs_upper:    'Lår',
    srv_arms_full:     'Hele armer',
    srv_arms_half:     'Underarmer',
    srv_bikini_line:   'Bikinilinje',
    srv_bikini_brazil: 'Brasiliansk bikini',
    srv_underarms:     'Armhuler',
    srv_lash_classic:  'Klassiske extensions',
    srv_lash_volume:   'Volume extensions',
    srv_lash_2_3:      'Etter 2–3 uker',
    srv_lash_3_4:      'Etter 3–4 uker',
    srv_lash_4_5:      'Etter 4–5 uker',
    srv_lash_lamination: 'Vippe-laminering',
    opt_g_face:        'Hårfjerning — Ansikt',
    opt_g_legs:        'Hårfjerning — Bein',
    opt_g_arms:        'Hårfjerning — Armer',
    opt_g_bikini:      'Hårfjerning — Bikini',
    opt_g_underarms:   'Hårfjerning — Armhuler',
    opt_g_lash_new:    'Vipper — Extensions',
    opt_g_lash_refill: 'Vipper — Påfyll',
    opt_g_lash_lam:    'Vipper — Laminering',
    book_btn:          'Bestill',
    products_label:    'Produkter',
    products_title:    'Profesjonell pleie hjemme',
    products_sub:      'Nøye utvalgte produkter som forlenger effekten av behandlingen. Hele utvalget — kommer snart.',
    products_tag:      'Kommer snart',
    prod1_title:       'Vippepleie',
    prod1_desc:        'Børster, rensemidler og serumer for å pleie vippe-extensions.',
    prod2_title:       'Etter hårfjerning',
    prod2_desc:        'Fuktighetsgivende oljer og kremer for sensitiv hud etter behandling.',
    prod3_title:       'Ansiktspleie',
    prod3_desc:        'Profesjonelle kremer, serumer og masker til daglig pleie.',
    products_cta_text: 'Interessert i et bestemt produkt? Skriv til meg — jeg gir råd og forteller hva som er på lager.',
    products_cta_btn:  'Kontakt om produkter',
    about_label:       'Om meg',
    about_title:       'Hei, kjære ✨',
    about_p1:          'Hvis du er her, betyr det at du tar deg tid til deg selv og din skjønnhet. Så glad for at du stakk innom. Jeg er Akvilė — en profesjonell skjønnhetsspesialist som jobber med sukkerhårfjerning for hele kroppen (den eneste i byen), voksing, vippe-extensions og laminering.',
    about_p2:          'Målet mitt er ikke bare et vakkert resultat, men også at du skal føle deg trygg på deg selv. Hver behandling og hvert produkt i studioet mitt er nøye utvalgt for å gi synlige resultater og en god opplevelse. Du er virkelig i gode hender.',
    about_li1:         '10 års erfaring siden 2016',
    about_li2:         'Den eneste sukkerhårfjerningen i byen',
    about_li3:         'Nøye utvalgte produkter',
    about_li4:         'Personlig oppmerksomhet til hver kunde',
    about_cta:         'Bestill et besøk',
    whyus_label:       'Hvorfor oss',
    whyus_title:       'Ditt valg er riktig',
    whyus_sub:         'Akva Studio — kvalitet, profesjonalisme og din skjønnhet i våre hender.',
    why1_t:            'Profesjonalisme',
    why1_d:            'Vi lærer og forbedrer oss konstant. Kun sertifiserte teknikere.',
    why2_t:            'Kvalitet',
    why2_d:            'Vi bruker kun prøvde, premium kvalitetsmaterialer.',
    why3_t:            'Komfort',
    why3_d:            'Varmt, koselig miljø. Føl deg hjemme.',
    why4_t:            'Unikhet',
    why4_d:            'Den eneste sukkerpasta hårfjerningen i din by.',
    portfolio_label:   'Våre arbeider',
    portfolio_title:   'Resultater taler for seg selv',
    portfolio_sub:     'Ekte arbeid. Ekte resultater. Ekte kunder.',
    reviews_label:     'Anmeldelser',
    reviews_title:     'Hva kundene sier',
    rev1_text:         'Veldig profesjonelt studio! Vippe-extensions varte 4 uker. Vil definitivt komme tilbake.',
    rev1_name:         'Laura K.',
    rev1_sub:          'Vippe-extensions',
    rev2_text:         'Sukkerpasta hårfjerning — for første gang i livet gjorde det ikke så vondt. Anbefaler til alle!',
    rev2_name:         'Monika P.',
    rev2_sub:          'Hårfjerning',
    rev3_text:         'Akvilė er veldig grundig og hyggelig. Studioet er koselig. Jeg kommer tilbake hver måned.',
    rev3_name:         'Gintarė S.',
    rev3_sub:          'Fast kunde',
    rev4_text:         'Beste vippe-laminering jeg har fått! Akvilė er så nøyaktig og rolig. Anbefaler på det sterkeste.',
    rev4_name:         'Janne H.',
    rev4_sub:          'Vippe-laminering',
    rev5_text:         'Sukkerhårfjerning var mye mindre vondt enn voks. Huden føltes glatt og rolig etterpå. Kommer tilbake!',
    rev5_name:         'Marie L.',
    rev5_sub:          'Sukkerhårfjerning',
    rev6_text:         'Vippene mine ser så naturlige og fyldige ut. Studioet er koselig og Akvilė er en ekte profesjonell.',
    rev6_name:         'Anita B.',
    rev6_sub:          'Vippe-extensions',
    booking_label:     'Bestilling',
    booking_title:     'Bestill ditt besøk',
    booking_sub:       'Fyll ut skjemaet og vi kontakter deg innen 24 timer.',
    book_f1:           'Rask online bestilling',
    book_f2:           'Vi svarer innen 24 timer',
    book_f3:           'Enkel avbestilling eller ombooking',
    form_name:         'Navn',
    form_phone:        'Telefonnummer',
    form_service:      'Tjeneste',
    form_service_def:  'Velg en tjeneste',
    form_msg:          'Preferanser (valgfritt)',
    form_submit:       'Send forespørsel',
    form_note:         'Vi kontakter deg innen 24 timer · akvastudio75@gmail.com',
    form_success:      '✓ Takk! Din forespørsel er mottatt. Vi kontakter deg innen 24 timer.',
    footer_about:      'Profesjonelt skjønnhetsstudio. Vipper, laminering, hårfjerning.',
    footer_nav_t:      'Navigasjon',
    footer_contact_t:  'Kontakt',
    footer_copy:       '© 2025 Akva Studio. Alle rettigheter reservert.',
  }
};

// ── STATE ──────────────────────────────────
let currentLang = localStorage.getItem('akva_lang') || 'lt';

// ── APPLY LANGUAGE ─────────────────────────
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('akva_lang', lang);

  const t = translations[lang];
  if (!t) return;

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Update all [data-i18n-placeholder] elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Update all [data-i18n-label] elements (e.g. <optgroup label="">)
  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-label');
    if (t[key] !== undefined) el.label = t[key];
  });

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update html lang attr
  document.documentElement.lang = lang;
}

// ── HEADER SCROLL ──────────────────────────
function initScrollHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── MOBILE NAV ─────────────────────────────
function initMobileNav() {
  const burger = document.querySelector('.nav-burger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav-close');

  if (!burger || !mobileNav) return;

  burger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeMobileNav = () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeMobileNav);

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
}

// ── LANG SWITCHER ──────────────────────────
function initLangSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang && translations[lang]) applyLang(lang);
    });
  });
}

// ── CONTACT FORM ───────────────────────────
function initForm() {
  const form = document.querySelector('#booking-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit');
    const successMsg = form.querySelector('.form-success');

    submitBtn.disabled = true;
    submitBtn.textContent = '...';

    const data = {
      name:    form.querySelector('[name="name"]').value.trim(),
      phone:   form.querySelector('[name="phone"]').value.trim(),
      service: form.querySelector('[name="service"]').value,
      message: form.querySelector('[name="message"]').value.trim(),
    };

    try {
      // Formspree endpoint — replace ACTION_URL with real Formspree URL
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.reset();
        if (successMsg) {
          successMsg.textContent = translations[currentLang].form_success;
          successMsg.classList.add('visible');
        }
      } else {
        throw new Error('Form error');
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.setAttribute('data-i18n', 'form_submit');
      submitBtn.textContent = translations[currentLang].form_submit;
      alert('Klaida. Bandykite vėliau arba rašykite: akvastudio75@gmail.com');
    }
  });
}

// ── SMOOTH SCROLL ──────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── INIT ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initScrollHeader();
  initMobileNav();
  initLangSwitcher();
  initSmoothScroll();
  initForm();
  applyLang(currentLang);
});
