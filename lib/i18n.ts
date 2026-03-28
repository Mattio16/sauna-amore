'use client';

import { createContext, useContext } from 'react';

export type Lang = 'it' | 'en';

export const translations = {
  it: {
    nav: {
      home: 'Home',
      saunas: 'Saune',
      hotTubs: 'Vasche Idromassaggio',
      iceBaths: 'Vasche Ghiacciatte',
      about: 'Chi Siamo',
      contact: 'Contatti',
      rental: 'Noleggio',
      languageToggle: 'English',
    },
    hero: {
      title: 'Il Benessere Nordico a Casa Tua',
      subtitle: 'Scopri la tradizione baltica con saune in legno massiccio, vasche idromassaggio e vasche ghiacciatte premium nelle Marche',
      cta: 'Scopri i Nostri Prodotti',
    },
    products: {
      saunasTitle: 'Saune in Legno',
      hotTubsTitle: 'Vasche Idromassaggio',
      iceBathsTitle: 'Vasche Ghiacciatte',
      persons: 'Persone',
      dimensions: 'Dimensioni',
      fromPrice: 'A partire da',
      configure: 'Personalizza',
      flatpack: 'A Domicilio',
      assembled: 'Installazione Inclusa',
    },
    configurator: {
      customise: 'Personalizza il Tuo Prodotto',
      deliveryMode: 'Modalità di Consegna',
      heater: 'Riscaldatore',
      accessories: 'Accessori',
      electricHeaters: 'Riscaldatori Elettrici',
      woodHeaters: 'Riscaldatori a Legna',
      totalPrice: 'Prezzo Totale',
      requestQuote: 'Richiedi un Preventivo',
      goBack: 'Indietro',
    },
    about: {
      title: 'Chi Siamo',
      description: 'Sauna Amore è il partner ideale per il tuo benessere nelle Marche. Fondato da Matt e Arita, offriamo saune baltiche autentiche, vasche idromassaggio di lusso e vasche ghiacciatte per il recupero sportivo. Ogni prodotto incarna la tradizione nordica, la qualità costruttiva superiore e la competitività di prezzo che contraddistingue il nostro marchio. Scopri come portare il rilassamento premium a casa tua.',
    },
    contact: {
      title: 'Contattaci',
      subtitle: 'Siamo qui per aiutarti a trovare la soluzione di benessere perfetta',
      name: 'Nome',
      email: 'Email',
      phone: 'Telefono',
      message: 'Messaggio',
      send: 'Invia',
      whatsapp: 'Contattaci su WhatsApp',
    },
    footer: {
      copyright: '© 2026 Sauna Amore. Tutti i diritti riservati.',
      privacy: 'Privacy Policy',
      terms: 'Termini e Condizioni',
    },
    common: {
      learnMore: 'Scopri di Più',
      viewAll: 'Visualizza Tutto',
      loading: 'Caricamento...',
    },
  },
  en: {
    nav: {
      home: 'Home',
      saunas: 'Saunas',
      hotTubs: 'Hot Tubs',
      iceBaths: 'Ice Baths',
      about: 'About',
      contact: 'Contact',
      rental: 'Rental',
      languageToggle: 'Italiano',
    },
    hero: {
      title: 'Nordic Wellness at Your Home',
      subtitle: 'Experience authentic Baltic tradition with premium solid wood saunas, luxury hot tubs, and ice baths in Le Marche',
      cta: 'Discover Our Products',
    },
    products: {
      saunasTitle: 'Solid Wood Saunas',
      hotTubsTitle: 'Hot Tubs',
      iceBathsTitle: 'Ice Baths',
      persons: 'Capacity',
      dimensions: 'Dimensions',
      fromPrice: 'From',
      configure: 'Customize',
      flatpack: 'Delivery Only',
      assembled: 'Installation Included',
    },
    configurator: {
      customise: 'Customize Your Product',
      deliveryMode: 'Delivery Mode',
      heater: 'Heater',
      accessories: 'Accessories',
      electricHeaters: 'Electric Heaters',
      woodHeaters: 'Wood Heaters',
      totalPrice: 'Total Price',
      requestQuote: 'Request a Quote',
      goBack: 'Back',
    },
    about: {
      title: 'About Us',
      description: 'Sauna Amore is your gateway to premium wellness in Le Marche, Italy. Founded by Matt and Arita, we deliver authentic Baltic saunas, luxury hot tubs, and recovery ice baths. Every product embodies Nordic craftsmanship, superior build quality, and competitive pricing that defines our brand. Discover how to bring premium relaxation home.',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: "We're here to help you find the perfect wellness solution",
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      send: 'Send',
      whatsapp: 'Contact us on WhatsApp',
    },
    footer: {
      copyright: '© 2026 Sauna Amore. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms and Conditions',
    },
    common: {
      learnMore: 'Learn More',
      viewAll: 'View All',
      loading: 'Loading...',
    },
  },
} as const;

/**
 * Helper function for safe translation lookup with dot-notation support
 * @param lang - Language code ('it' or 'en')
 * @param key - Translation key in dot-notation format (e.g., 'nav.home')
 * @returns Translated string, or the key itself if not found
 */
export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return the key if translation not found
    }
  }

  return typeof value === 'string' ? value : key;
}

/**
 * Language context for provider-based language state management
 */
export const LangContext = createContext<Lang>('it');

/**
 * Hook to access current language from context
 * Must be used within a LangContext.Provider
 */
export const useLang = () => useContext(LangContext);

/**
 * Hook to access translation function bound to current language
 * Must be used within a LangContext.Provider
 */
export const useTranslation = () => {
  const lang = useLang();
  return (key: string) => t(lang, key);
};
