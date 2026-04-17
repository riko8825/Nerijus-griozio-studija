/* ─────────────────────────────────────────
   AKVA STUDIO — main.js
   ───────────────────────────────────────── */

// ── TRANSLATIONS ──────────────────────────
const translations = {
  lt: {
    nav_services:      'Paslaugos',
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
    services_title:    'Ką mes siūlome',
    services_sub:      'Kiekviena procedūra – aukštos kokybės medžiagos ir profesionalus atlikimas.',
    svc1_name:         'Blakstienų priauginimas',
    svc1_desc:         'Klasikinis, rusiškas apimtis, hibridas. Ilgaamžiai ir natūralūs rezultatai.',
    svc1_price:        'nuo €40',
    svc2_name:         'Blakstienų laminavimas',
    svc2_desc:         'Gamtinių blakstienų sulenkimas ir stiprinimas. Efektas trunka 4–6 savaites.',
    svc2_price:        'nuo €35',
    svc3_name:         'Cukraus pasta depiliacija',
    svc3_desc:         'Švelnus ir ilgalaikis plaukų šalinimas viso kūno zonoms. Unikalus mieste.',
    svc3_price:        'nuo €20',
    svc4_name:         'Produktų pardavimas',
    svc4_desc:         'Profesionali priežiūros kosmetika namų naudojimui. Prailgink procedūros efektą.',
    svc4_price:        'nuo €10',
    book_btn:          'Rezervuoti',
    about_label:       'Apie studiją',
    about_title:       'Kas mes esame',
    about_p1:          'Akva Studio — tai profesionali grožio studija, įsikūrusi jūsų mieste. Teikiame blakstienų priauginimo, laminavimo ir depiliacijos paslaugas. Esame vienintelė studija mieste, siūlanti cukraus pasta depiliaciją.',
    about_p2:          'Mums svarbu ne tik rezultatas, bet ir kliento komfortas. Naudojame tik aukštos kokybės medžiagas ir nuolat tobuliname įgūdžius.',
    about_li1:         'Patirties turinčios specialistės',
    about_li2:         'Tik aukštos kokybės medžiagos',
    about_li3:         'Patogi ir šilta aplinka',
    about_li4:         'Individualus požiūris į kiekvieną klientę',
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
    form_note:         'Susisieksime per 24 val. · akvile.suziedelyte5@gmail.com',
    form_success:      '✓ Ačiū! Jūsų užklausa gauta. Susisieksime per 24 val.',
    footer_about:      'Profesionali grožio studija. Blakstienų priauginimas, laminavimas, depiliacija.',
    footer_nav_t:      'Navigacija',
    footer_contact_t:  'Kontaktai',
    footer_copy:       '© 2025 Akva Studio. Visos teisės saugomos.',
  },
  en: {
    nav_services:      'Services',
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
    services_title:    'What we offer',
    services_sub:      'Every procedure — premium materials and professional execution.',
    svc1_name:         'Lash Extensions',
    svc1_desc:         'Classic, Russian volume, hybrid. Long-lasting and natural results.',
    svc1_price:        'from €40',
    svc2_name:         'Lash Lamination',
    svc2_desc:         'Natural lash lift and strengthening. Effect lasts 4–6 weeks.',
    svc2_price:        'from €35',
    svc3_name:         'Sugar Paste Depilation',
    svc3_desc:         'Gentle and long-lasting hair removal for all body areas. Unique in the city.',
    svc3_price:        'from €20',
    svc4_name:         'Product Sales',
    svc4_desc:         'Professional care cosmetics for home use. Extend your procedure results.',
    svc4_price:        'from €10',
    book_btn:          'Book',
    about_label:       'About the studio',
    about_title:       'Who we are',
    about_p1:          'Akva Studio is a professional beauty studio. We offer lash extensions, lash lamination and hair removal services. We are the only studio in the city offering sugar paste depilation.',
    about_p2:          'We care not only about results but also about your comfort. We use only premium materials and constantly improve our skills.',
    about_li1:         'Experienced specialists',
    about_li2:         'Only premium quality materials',
    about_li3:         'Comfortable and warm environment',
    about_li4:         'Individual approach to every client',
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
    form_note:         'We will contact you within 24h · akvile.suziedelyte5@gmail.com',
    form_success:      '✓ Thank you! Your request has been received. We will contact you within 24h.',
    footer_about:      'Professional beauty studio. Lash extensions, lamination, depilation.',
    footer_nav_t:      'Navigation',
    footer_contact_t:  'Contact',
    footer_copy:       '© 2025 Akva Studio. All rights reserved.',
  },
  no: {
    nav_services:      'Tjenester',
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
    services_title:    'Hva vi tilbyr',
    services_sub:      'Hver behandling — premium materialer og profesjonell utførelse.',
    svc1_name:         'Vippe-extensions',
    svc1_desc:         'Klassisk, russisk volum, hybrid. Langvarige og naturlige resultater.',
    svc1_price:        'fra €40',
    svc2_name:         'Vippe-laminering',
    svc2_desc:         'Naturlig vippeleft og styrking. Effekten varer 4–6 uker.',
    svc2_price:        'fra €35',
    svc3_name:         'Sukkerpasta hårfjerning',
    svc3_desc:         'Skånsom og langvarig hårfjerning for alle kroppsområder. Unik i byen.',
    svc3_price:        'fra €20',
    svc4_name:         'Produktsalg',
    svc4_desc:         'Profesjonelle pleieprodukter for hjemmebruk. Forleng effekten av behandlingen.',
    svc4_price:        'fra €10',
    book_btn:          'Bestill',
    about_label:       'Om studioet',
    about_title:       'Hvem vi er',
    about_p1:          'Akva Studio er et profesjonelt skjønnhetsstudio. Vi tilbyr vippe-extensions, vippe-laminering og hårfjerning. Vi er det eneste studioet i byen som tilbyr sukkerpasta hårfjerning.',
    about_p2:          'Vi bryr oss ikke bare om resultater, men også om komforten din. Vi bruker kun premium materialer og forbedrer oss hele tiden.',
    about_li1:         'Erfarne spesialister',
    about_li2:         'Kun premium kvalitetsmaterialer',
    about_li3:         'Komfortabelt og varmt miljø',
    about_li4:         'Individuell tilnærming til hver kunde',
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
    form_note:         'Vi kontakter deg innen 24 timer · akvile.suziedelyte5@gmail.com',
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
      alert('Klaida. Bandykite vėliau arba rašykite: akvile.suziedelyte5@gmail.com');
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
