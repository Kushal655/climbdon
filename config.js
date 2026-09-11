/* ==================================================================
   PUBLIC SITE SETTINGS
   Paste the SAME Firebase settings here and in the admin's admin-config.js.
   To change the page text (headline, story) in each language,
   edit translations.js.
   ================================================================== */

window.SITE = {
  firebase: {
    apiKey: "PASTE_YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "000000000000",
    appId: "PASTE_YOUR_APP_ID"
  },

  yourName: "Your Name",
  contactEmail: "you@example.com",

  // Language shown first. Visitors can switch with the menu at the top.
  // Options: en, ne, hi, zh, ja, ko, es, fr, de, it
  defaultLanguage: "en",

  currency: "Rs.",
  locale: "en-IN",   // number format for amounts, e.g. Rs. 1,00,000
  minAmount: 10,     // keep this the same as "amount >= 10" in firestore.rules
  quickAmounts: [500, 1000, 2500, 5000]
};
