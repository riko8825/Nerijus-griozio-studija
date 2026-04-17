// consent-init.js — Akva Studio cookie consent
// Silktide Consent Manager konfigūracija

window.silktideConsentManager.init({
  consentTypes: [
    {
      id: "necessary",
      label: "Būtinieji",
      description: "<p>Reikalingi svetainės veikimui. Negali būti išjungti.</p>",
      required: true
    },
    {
      id: "analytics",
      label: "Analizė",
      description: "<p>Padeda suprasti, kaip lankytojai naudojasi svetaine, kad galėtume ją tobulinti.</p>",
      defaultValue: false,
      onAccept: function() {},
      onReject: function() {}
    }
  ]
});
