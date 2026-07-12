'use client';

import { createContext, useContext } from 'react';

export type Lang = 'it' | 'en' | 'nl' | 'de' | 'ru';

export const LANGUAGES: { code: Lang; flag: string; name: string }[] = [
  { code: 'it', flag: '🇮🇹', name: 'Italiano' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'nl', flag: '🇳🇱', name: 'Nederlands' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
];

const it = {
  nav: { saunas: 'Saune', tubs: 'Vasche', ice: 'Bagni di Ghiaccio', accessories: 'Accessori', rental: 'Noleggio', about: 'Chi Siamo', contact: 'Contatti' },
  common: {
    from: 'a partire da', discover: 'Scopri', requestQuote: 'Richiedi preventivo', configure: 'Componi la tua',
    persons: 'persone', viewAll: 'Vedi tutti', back: 'Indietro', models: 'modelli', loading: 'Caricamento…',
  },
  home: {
    kicker: 'Benessere nordico · Le Marche',
    h1a: 'Il lusso quieto', h1b: 'della natura',
    heroP: 'Saune a botte in legno massiccio, vasche riscaldate a legna e bagni di ghiaccio. Artigianato baltico, costruito su misura per il tuo giardino.',
    ctaCollections: 'Le collezioni', ctaQuote: 'Richiedi preventivo',
    stats: [['12', 'modelli selezionati'], ['100%', 'artigianato baltico'], ['2 anni', 'di garanzia'], ['24 ore', 'per il tuo preventivo']] as [string, string][],
    collKicker: 'Le collezioni', collH2a: 'Fuoco, acqua', collH2b: 'e ghiaccio',
    collSub: 'Il ciclo nordico completo — ogni pezzo costruito su ordinazione, con la tua scelta di legno e stufa.',
    edKicker: 'Su misura', edH2a: 'Composta', edH2b: 'per te',
    edLead: 'Abete nordico o thermowood scuro. Fiamma viva o calore elettrico.',
    edBody: "Ogni sauna è configurata attorno al tuo spazio e alle tue abitudini: l'essenza del legno, la stufa — Harvia a legna o HUUM con controllo remoto — il montaggio in opera o il kit. Il preventivo arriva entro ventiquattro ore, senza impegno.",
    edCta: 'Componi la tua sauna',
    ritKicker: 'Il rituale', ritH2: 'Caldo, freddo, quiete',
    ritSteps: [['Scalda', '15 minuti a 80° tra profumo di abete e vapore sulle pietre.'], ['Immergiti', 'Il tuffo nel ghiaccio: due minuti che resettano corpo e mente.'], ['Riposa', 'Aria fresca, una tisana calda, e di nuovo dentro. Ripeti tre volte.']] as [string, string][],
    quoteText: '"La sauna profuma d\'abete anche a dicembre. Il tuffo nel ghiaccio, dopo, è una rinascita."',
    quoteAuthor: 'Un cliente · Ancona',
    finalKicker: 'Ti aspettiamo', finalH2a: 'Il tuo giardino', finalH2b: 'merita quiete',
    finalSub: 'Raccontaci il tuo spazio. Disegneremo il resto.',
  },
  optionGroups: { wood: 'Legno', 'sauna-heater': 'Stufa', 'tub-filter': 'Filtrazione', 'tub-cover': 'Copertura', chiller: 'Raffreddamento', diameter: 'Diametro', 'front-windows': 'Finestre frontali', 'back-windows': 'Finestre posteriori' } as Record<string, string>,
  cat: {
    saunasTitle: 'Saune a botte', saunasSub: 'Legno massiccio baltico, abete o thermowood. Da 2 a 6 persone.',
    tubsTitle: 'Vasche idromassaggio', tubsSub: 'Riscaldate a legna, in legno o vetroresina.',
    iceTitle: 'Bagni di ghiaccio', iceSub: "Il freddo che rigenera, tutto l'anno.",
    accTitle: 'Accessori', accSub: 'Tutto per completare il tuo rituale: secchielli, pietre, oli essenziali e cura del legno.',
  },
  product: {
    params: 'Parametri e dimensioni', configure: 'Configura', priceEstimate: 'Stima configurazione', quantity: 'Quantità',
    quoteTitle: 'Richiedi un preventivo', quoteSub: 'Senza impegno. Ti rispondiamo entro 24 ore.',
    name: 'Nome e cognome', email: 'Email', phone: 'Telefono (opzionale)', address: 'Indirizzo di consegna',
    city: 'Città', postal: 'CAP', message: 'Messaggio (opzionale)',
    submit: 'Invia richiesta', sending: 'Invio…',
    success: 'Grazie! La tua richiesta è stata inviata.', successRef: 'Riferimento', successBody: 'Ti risponderemo entro 24 ore con un preventivo dettagliato.',
    error: 'Qualcosa è andato storto. Riprova o scrivici a info@saunaamore.it.',
    related: 'Potrebbe interessarti',
  },
  rental: {
    title: 'Noleggio per eventi', sub: 'Sauna e ghiaccio, ovunque serva la quiete.',
    body: "Portiamo l'esperienza nordica al tuo evento: matrimoni, retreat, festival ed eventi aziendali nelle Marche e oltre. Sauna a botte mobile, bagni di ghiaccio e tutto il necessario, con installazione e assistenza incluse.",
    cta: 'Parliamone',
  },
  about: {
    title: 'Chi Siamo', sub: 'La storia di Sauna Amore',
    p1: "Matt e Arita hanno scoperto la loro passione per il benessere nordico viaggiando per la Scandinavia, dove hanno vissuto il potere trasformativo della vera cultura della sauna baltica. Da quell'esperienza è nata una visione: portare questa tradizione millenaria in Italia, fondendo l'eredità nordica con il calore mediterraneo.",
    p2: 'Fondata nel cuore delle Marche, Sauna Amore offre prodotti sauna premium a prezzi equi. Lavoriamo direttamente con produttori di fiducia, senza ricarichi ingiustificati: valore eccezionale, qualità senza compromessi.',
    p3: 'Nella nostra regione, tra dolci colline e borghi storici, crediamo che tutti meritino il potere rigenerante di una vera esperienza sauna.',
    values: [['Qualità', 'Prodotti premium da produttori affidabili con standard rigorosi.'], ['Autenticità', 'Vera tradizione sauna baltica portata con integrità alle Marche.'], ['Servizio', 'Supporto dedicato e prezzi equi che mettono il tuo benessere al primo posto.']] as [string, string][],
  },
  contact: {
    title: 'Contatti', sub: 'Raccontaci il tuo progetto: ti rispondiamo entro 24 ore.',
    emailLabel: 'Scrivici', whereLabel: 'Dove siamo', where: 'Le Marche, Italia',
  },
  footer: {
    tagline: 'Benessere nordico nel cuore delle Marche. Saune finlandesi premium, bagni di ghiaccio ed esperienze wellness autentiche.',
    products: 'Prodotti', company: 'Azienda', contacts: 'Contatti', privacy: 'Privacy Policy',
    rights: 'Tutti i diritti riservati.',
  },
};

export type Dict = typeof it;

const en: Dict = {
  nav: { saunas: 'Saunas', tubs: 'Hot Tubs', ice: 'Ice Baths', accessories: 'Accessories', rental: 'Rental', about: 'About', contact: 'Contact' },
  common: { from: 'from', discover: 'Discover', requestQuote: 'Request a quote', configure: 'Compose yours', persons: 'persons', viewAll: 'View all', back: 'Back', models: 'models', loading: 'Loading…' },
  home: {
    kicker: 'Nordic wellness · Le Marche',
    h1a: 'The quiet luxury', h1b: 'of nature',
    heroP: 'Solid-wood barrel saunas, wood-fired hot tubs and ice baths. Baltic craftsmanship, built to measure for your garden.',
    ctaCollections: 'The collections', ctaQuote: 'Request a quote',
    stats: [['12', 'curated models'], ['100%', 'Baltic craftsmanship'], ['2 years', 'of warranty'], ['24 hours', 'for your quote']],
    collKicker: 'The collections', collH2a: 'Fire, water', collH2b: 'and ice',
    collSub: 'The complete Nordic cycle — every piece built to order, with your choice of wood and heater.',
    edKicker: 'Tailor-made', edH2a: 'Composed', edH2b: 'for you',
    edLead: 'Nordic spruce or dark thermowood. Open flame or electric heat.',
    edBody: 'Each sauna is configured around your space and habits: the type of wood, the stove — Harvia wood-burning or HUUM with remote control — and the assembly or kit. A no-obligation quote is available within twenty-four hours.',
    edCta: 'Composing your sauna',
    ritKicker: 'The ritual', ritH2: 'Heat, cold, stillness',
    ritSteps: [['Warm up', '15 minutes at 80° among spruce scent and steam on the stones.'], ['Plunge', 'The ice dip: two minutes that reset body and mind.'], ['Rest', 'Fresh air, a warm tea, then back in. Repeat three times.']],
    quoteText: '"The sauna smells of spruce even in December. The ice plunge afterwards? A rebirth."',
    quoteAuthor: 'A client · Ancona',
    finalKicker: 'We await you', finalH2a: 'Your garden', finalH2b: 'deserves stillness',
    finalSub: "Tell us about your space. We'll design the rest.",
  },
  optionGroups: { wood: 'Wood', 'sauna-heater': 'Heater', 'tub-filter': 'Filtration', 'tub-cover': 'Cover', chiller: 'Chilling', diameter: 'Diameter', 'front-windows': 'Front windows', 'back-windows': 'Back windows' } as Record<string, string>,
  cat: {
    saunasTitle: 'Barrel saunas', saunasSub: 'Solid Baltic timber, spruce or thermowood. For 2 to 6 people.',
    tubsTitle: 'Hot tubs', tubsSub: 'Wood-fired, in timber or fiberglass.',
    iceTitle: 'Ice baths', iceSub: 'The cold that regenerates, all year round.',
    accTitle: 'Accessories', accSub: 'Everything to complete your ritual: buckets, stones, essential oils and wood care.',
  },
  product: {
    params: 'Parameters and dimensions', configure: 'Configure', priceEstimate: 'Configuration estimate', quantity: 'Quantity',
    quoteTitle: 'Request a quote', quoteSub: 'No obligation. We reply within 24 hours.',
    name: 'Full name', email: 'Email', phone: 'Phone (optional)', address: 'Delivery address',
    city: 'City', postal: 'Postal code', message: 'Message (optional)',
    submit: 'Send request', sending: 'Sending…',
    success: 'Thank you! Your request has been sent.', successRef: 'Reference', successBody: "We'll get back to you within 24 hours with a detailed quote.",
    error: 'Something went wrong. Try again or write to info@saunaamore.it.',
    related: 'You may also like',
  },
  rental: {
    title: 'Event rental', sub: 'Sauna and ice, wherever stillness is needed.',
    body: 'We bring the Nordic experience to your event: weddings, retreats, festivals and corporate events in the Marche and beyond. Mobile barrel sauna, ice baths and everything needed, with installation and assistance included.',
    cta: "Let's talk",
  },
  about: {
    title: 'About us', sub: 'The story of Sauna Amore',
    p1: 'Matt and Arita discovered their passion for Nordic wellness travelling through Scandinavia, where they experienced the transformative power of true Baltic sauna culture. From that experience came a vision: bringing this ancient tradition to Italy, blending Nordic heritage with Mediterranean warmth.',
    p2: 'Founded in the heart of the Marche, Sauna Amore offers premium sauna products at fair prices. We work directly with trusted manufacturers, applying a fair margin: exceptional value with no compromise on quality.',
    p3: 'In our region of rolling hills and historic villages, we believe everyone deserves the regenerating power of a true sauna experience.',
    values: [['Quality', 'Premium products from reliable manufacturers with rigorous standards.'], ['Authenticity', 'True Baltic sauna tradition brought with integrity to the Marche.'], ['Service', 'Dedicated support and fair prices that put your wellbeing first.']],
  },
  contact: {
    title: 'Contact', sub: 'Tell us about your project — we reply within 24 hours.',
    emailLabel: 'Write to us', whereLabel: 'Where we are', where: 'Le Marche, Italy',
  },
  footer: {
    tagline: 'Nordic wellness in the heart of the Marche. Premium Finnish saunas, ice baths and authentic wellness experiences.',
    products: 'Products', company: 'Company', contacts: 'Contacts', privacy: 'Privacy Policy',
    rights: 'All rights reserved.',
  },
};

const nl: Dict = {
  nav: { saunas: "Sauna's", tubs: 'Hottubs', ice: 'IJsbaden', accessories: 'Accessoires', rental: 'Verhuur', about: 'Over ons', contact: 'Contact' },
  common: { from: 'vanaf', discover: 'Ontdek', requestQuote: 'Offerte aanvragen', configure: 'Stel de jouwe samen', persons: 'personen', viewAll: 'Bekijk alles', back: 'Terug', models: 'modellen', loading: 'Laden…' },
  home: {
    kicker: 'Noords welzijn · Le Marche',
    h1a: 'De stille luxe', h1b: 'van de natuur',
    heroP: "Barrelsauna's van massief hout, houtgestookte hottubs en ijsbaden. Baltisch vakmanschap, op maat gebouwd voor uw tuin.",
    ctaCollections: 'De collecties', ctaQuote: 'Offerte aanvragen',
    stats: [['12', 'geselecteerde modellen'], ['100%', 'Baltisch vakmanschap'], ['2 jaar', 'garantie'], ['24 uur', 'voor uw offerte']],
    collKicker: 'De collecties', collH2a: 'Vuur, water', collH2b: 'en ijs',
    collSub: 'De complete Noordse cyclus — elk stuk op bestelling gebouwd, met uw keuze van hout en kachel.',
    edKicker: 'Op maat', edH2a: 'Samengesteld', edH2b: 'voor u',
    edLead: 'Noords vurenhout of donker thermowood. Open vuur of elektrische warmte.',
    edBody: 'Elke sauna wordt geconfigureerd rond uw ruimte en gewoonten: de houtsoort, de kachel — Harvia houtgestookt of HUUM met afstandsbediening — en montage of bouwpakket. Een vrijblijvende offerte binnen vierentwintig uur.',
    edCta: 'Uw sauna samenstellen',
    ritKicker: 'Het ritueel', ritH2: 'Warmte, kou, stilte',
    ritSteps: [['Opwarmen', '15 minuten op 80° tussen vurengeur en stoom op de stenen.'], ['Onderdompelen', 'De ijsduik: twee minuten die lichaam en geest resetten.'], ['Rusten', 'Frisse lucht, warme thee, en weer naar binnen. Herhaal drie keer.']],
    quoteText: '"De sauna ruikt zelfs in december naar vurenhout. De ijsduik erna? Een wedergeboorte."',
    quoteAuthor: 'Een klant · Ancona',
    finalKicker: 'Wij verwachten u', finalH2a: 'Uw tuin', finalH2b: 'verdient stilte',
    finalSub: 'Vertel ons over uw ruimte. Wij ontwerpen de rest.',
  },
  optionGroups: { wood: 'Hout', 'sauna-heater': 'Kachel', 'tub-filter': 'Filtratie', 'tub-cover': 'Afdekking', chiller: 'Koeling', diameter: 'Diameter', 'front-windows': 'Ramen voorzijde', 'back-windows': 'Ramen achterzijde' } as Record<string, string>,
  cat: {
    saunasTitle: "Barrelsauna's", saunasSub: 'Massief Baltisch hout, vuren of thermowood. Voor 2 tot 6 personen.',
    tubsTitle: 'Hottubs', tubsSub: 'Houtgestookt, in hout of glasvezel.',
    iceTitle: 'IJsbaden', iceSub: 'De kou die regenereert, het hele jaar door.',
    accTitle: 'Accessoires', accSub: 'Alles om uw ritueel compleet te maken: emmers, stenen, etherische oliën en houtverzorging.',
  },
  product: {
    params: 'Parameters en afmetingen', configure: 'Configureren', priceEstimate: 'Geschatte configuratie', quantity: 'Aantal',
    quoteTitle: 'Offerte aanvragen', quoteSub: 'Vrijblijvend. Wij antwoorden binnen 24 uur.',
    name: 'Volledige naam', email: 'E-mail', phone: 'Telefoon (optioneel)', address: 'Bezorgadres',
    city: 'Plaats', postal: 'Postcode', message: 'Bericht (optioneel)',
    submit: 'Verstuur aanvraag', sending: 'Versturen…',
    success: 'Dank u! Uw aanvraag is verzonden.', successRef: 'Referentie', successBody: 'Wij nemen binnen 24 uur contact op met een gedetailleerde offerte.',
    error: 'Er ging iets mis. Probeer opnieuw of mail naar info@saunaamore.it.',
    related: 'Misschien ook interessant',
  },
  rental: {
    title: 'Evenementverhuur', sub: 'Sauna en ijs, overal waar stilte nodig is.',
    body: 'Wij brengen de Noordse ervaring naar uw evenement: bruiloften, retraites, festivals en bedrijfsevenementen in de Marche en daarbuiten. Mobiele barrelsauna, ijsbaden en alles wat nodig is, inclusief installatie en begeleiding.',
    cta: 'Neem contact op',
  },
  about: {
    title: 'Over ons', sub: 'Het verhaal van Sauna Amore',
    p1: 'Matt en Arita ontdekten hun passie voor Noords welzijn tijdens reizen door Scandinavië, waar ze de transformerende kracht van de echte Baltische saunacultuur ervoeren. Daaruit ontstond een visie: deze eeuwenoude traditie naar Italië brengen, Noords erfgoed versmolten met mediterrane warmte.',
    p2: 'Sauna Amore, opgericht in het hart van de Marche, biedt premium saunaproducten tegen eerlijke prijzen. We werken rechtstreeks met betrouwbare fabrikanten: uitzonderlijke waarde zonder compromissen op kwaliteit.',
    p3: 'In onze streek van glooiende heuvels en historische dorpjes geloven wij dat iedereen de regenererende kracht van een echte sauna-ervaring verdient.',
    values: [['Kwaliteit', 'Premium producten van betrouwbare fabrikanten met strenge normen.'], ['Authenticiteit', 'Echte Baltische saunatraditie met integriteit naar de Marche gebracht.'], ['Service', 'Toegewijde ondersteuning en eerlijke prijzen die uw welzijn vooropstellen.']],
  },
  contact: {
    title: 'Contact', sub: 'Vertel ons over uw project — wij antwoorden binnen 24 uur.',
    emailLabel: 'Schrijf ons', whereLabel: 'Waar we zijn', where: 'Le Marche, Italië',
  },
  footer: {
    tagline: "Noords welzijn in het hart van de Marche. Premium Finse sauna's, ijsbaden en authentieke wellnesservaringen.",
    products: 'Producten', company: 'Bedrijf', contacts: 'Contact', privacy: 'Privacybeleid',
    rights: 'Alle rechten voorbehouden.',
  },
};

const de: Dict = {
  nav: { saunas: 'Saunen', tubs: 'Badefässer', ice: 'Eisbäder', accessories: 'Zubehör', rental: 'Vermietung', about: 'Über uns', contact: 'Kontakt' },
  common: { from: 'ab', discover: 'Entdecken', requestQuote: 'Angebot anfordern', configure: 'Ihre zusammenstellen', persons: 'Personen', viewAll: 'Alle ansehen', back: 'Zurück', models: 'Modelle', loading: 'Laden…' },
  home: {
    kicker: 'Nordisches Wohlbefinden · Le Marche',
    h1a: 'Der stille Luxus', h1b: 'der Natur',
    heroP: 'Fasssaunen aus Massivholz, holzbefeuerte Badefässer und Eisbäder. Baltische Handwerkskunst, maßgefertigt für Ihren Garten.',
    ctaCollections: 'Die Kollektionen', ctaQuote: 'Angebot anfordern',
    stats: [['12', 'ausgewählte Modelle'], ['100%', 'baltische Handwerkskunst'], ['2 Jahre', 'Garantie'], ['24 Std.', 'bis zu Ihrem Angebot']],
    collKicker: 'Die Kollektionen', collH2a: 'Feuer, Wasser', collH2b: 'und Eis',
    collSub: 'Der komplette nordische Zyklus — jedes Stück auf Bestellung gefertigt, mit Ihrer Wahl von Holz und Ofen.',
    edKicker: 'Maßgefertigt', edH2a: 'Komponiert', edH2b: 'für Sie',
    edLead: 'Nordische Fichte oder dunkles Thermoholz. Offene Flamme oder elektrische Wärme.',
    edBody: 'Jede Sauna wird um Ihren Raum und Ihre Gewohnheiten konfiguriert: die Holzart, der Ofen — Harvia holzbefeuert oder HUUM mit Fernsteuerung — sowie Montage oder Bausatz. Ein unverbindliches Angebot erhalten Sie innerhalb von vierundzwanzig Stunden.',
    edCta: 'Ihre Sauna komponieren',
    ritKicker: 'Das Ritual', ritH2: 'Hitze, Kälte, Stille',
    ritSteps: [['Aufwärmen', '15 Minuten bei 80° zwischen Fichtenduft und Dampf auf den Steinen.'], ['Eintauchen', 'Das Eisbad: zwei Minuten, die Körper und Geist zurücksetzen.'], ['Ruhen', 'Frische Luft, ein warmer Tee, dann wieder hinein. Dreimal wiederholen.']],
    quoteText: '"Die Sauna duftet selbst im Dezember nach Fichte. Das Eisbad danach? Eine Wiedergeburt."',
    quoteAuthor: 'Ein Kunde · Ancona',
    finalKicker: 'Wir erwarten Sie', finalH2a: 'Ihr Garten', finalH2b: 'verdient Stille',
    finalSub: 'Erzählen Sie uns von Ihrem Raum. Wir gestalten den Rest.',
  },
  optionGroups: { wood: 'Holz', 'sauna-heater': 'Ofen', 'tub-filter': 'Filtration', 'tub-cover': 'Abdeckung', chiller: 'Kühlung', diameter: 'Durchmesser', 'front-windows': 'Fenster vorne', 'back-windows': 'Fenster hinten' } as Record<string, string>,
  cat: {
    saunasTitle: 'Fasssaunen', saunasSub: 'Baltisches Massivholz, Fichte oder Thermoholz. Für 2 bis 6 Personen.',
    tubsTitle: 'Badefässer', tubsSub: 'Holzbefeuert, aus Holz oder Fiberglas.',
    iceTitle: 'Eisbäder', iceSub: 'Die Kälte, die regeneriert — das ganze Jahr.',
    accTitle: 'Zubehör', accSub: 'Alles für Ihr Ritual: Kübel, Steine, ätherische Öle und Holzpflege.',
  },
  product: {
    params: 'Parameter und Abmessungen', configure: 'Konfigurieren', priceEstimate: 'Konfigurationsschätzung', quantity: 'Menge',
    quoteTitle: 'Angebot anfordern', quoteSub: 'Unverbindlich. Antwort innerhalb von 24 Stunden.',
    name: 'Vor- und Nachname', email: 'E-Mail', phone: 'Telefon (optional)', address: 'Lieferadresse',
    city: 'Stadt', postal: 'PLZ', message: 'Nachricht (optional)',
    submit: 'Anfrage senden', sending: 'Senden…',
    success: 'Danke! Ihre Anfrage wurde gesendet.', successRef: 'Referenz', successBody: 'Wir melden uns innerhalb von 24 Stunden mit einem detaillierten Angebot.',
    error: 'Etwas ist schiefgelaufen. Versuchen Sie es erneut oder schreiben Sie an info@saunaamore.it.',
    related: 'Das könnte Ihnen auch gefallen',
  },
  rental: {
    title: 'Event-Vermietung', sub: 'Sauna und Eis, wo immer Stille gebraucht wird.',
    body: 'Wir bringen das nordische Erlebnis zu Ihrem Event: Hochzeiten, Retreats, Festivals und Firmenevents in den Marken und darüber hinaus. Mobile Fasssauna, Eisbäder und alles Nötige, inklusive Aufbau und Betreuung.',
    cta: 'Sprechen wir',
  },
  about: {
    title: 'Über uns', sub: 'Die Geschichte von Sauna Amore',
    p1: 'Matt und Arita entdeckten ihre Leidenschaft für nordisches Wohlbefinden auf Reisen durch Skandinavien, wo sie die transformierende Kraft echter baltischer Saunakultur erlebten. Daraus entstand eine Vision: diese jahrtausendealte Tradition nach Italien zu bringen — nordisches Erbe verschmolzen mit mediterraner Wärme.',
    p2: 'Sauna Amore, gegründet im Herzen der Marken, bietet Premium-Saunaprodukte zu fairen Preisen. Wir arbeiten direkt mit vertrauenswürdigen Herstellern: außergewöhnlicher Wert ohne Kompromisse bei der Qualität.',
    p3: 'In unserer Region sanfter Hügel und historischer Dörfer glauben wir, dass jeder die regenerierende Kraft eines echten Saunaerlebnisses verdient.',
    values: [['Qualität', 'Premium-Produkte von zuverlässigen Herstellern mit strengen Standards.'], ['Authentizität', 'Echte baltische Saunatradition, mit Integrität in die Marken gebracht.'], ['Service', 'Engagierte Betreuung und faire Preise, die Ihr Wohlbefinden an erste Stelle setzen.']],
  },
  contact: {
    title: 'Kontakt', sub: 'Erzählen Sie uns von Ihrem Projekt — Antwort innerhalb von 24 Stunden.',
    emailLabel: 'Schreiben Sie uns', whereLabel: 'Wo wir sind', where: 'Le Marche, Italien',
  },
  footer: {
    tagline: 'Nordisches Wohlbefinden im Herzen der Marken. Premium-Saunen aus Finnland, Eisbäder und authentische Wellness-Erlebnisse.',
    products: 'Produkte', company: 'Unternehmen', contacts: 'Kontakt', privacy: 'Datenschutz',
    rights: 'Alle Rechte vorbehalten.',
  },
};

const ru: Dict = {
  nav: { saunas: 'Сауны', tubs: 'Купели', ice: 'Ледяные ванны', accessories: 'Аксессуары', rental: 'Аренда', about: 'О нас', contact: 'Контакты' },
  common: { from: 'от', discover: 'Подробнее', requestQuote: 'Запросить расчёт', configure: 'Собрать свою', persons: 'человек', viewAll: 'Смотреть все', back: 'Назад', models: 'моделей', loading: 'Загрузка…' },
  home: {
    kicker: 'Северное благополучие · Ле Марке',
    h1a: 'Тихая роскошь', h1b: 'природы',
    heroP: 'Бочковые сауны из массива дерева, купели на дровах и ледяные ванны. Балтийское мастерство, созданное по вашим меркам.',
    ctaCollections: 'Коллекции', ctaQuote: 'Запросить расчёт',
    stats: [['12', 'отобранных моделей'], ['100%', 'балтийское мастерство'], ['2 года', 'гарантии'], ['24 часа', 'до вашего расчёта']],
    collKicker: 'Коллекции', collH2a: 'Огонь, вода', collH2b: 'и лёд',
    collSub: 'Полный северный цикл — каждое изделие создаётся на заказ, с вашим выбором дерева и печи.',
    edKicker: 'По вашим меркам', edH2a: 'Создано', edH2b: 'для вас',
    edLead: 'Северная ель или тёмный термоясень. Живой огонь или электрическое тепло.',
    edBody: 'Каждая сауна настраивается под ваше пространство и привычки: порода дерева, печь — дровяная Harvia или HUUM с дистанционным управлением — сборка под ключ или комплект. Расчёт без обязательств — в течение двадцати четырёх часов.',
    edCta: 'Собрать свою сауну',
    ritKicker: 'Ритуал', ritH2: 'Жар, холод, тишина',
    ritSteps: [['Прогрейтесь', '15 минут при 80° среди аромата ели и пара на камнях.'], ['Окунитесь', 'Ледяное погружение: две минуты, перезагружающие тело и разум.'], ['Отдохните', 'Свежий воздух, тёплый чай — и снова внутрь. Повторите трижды.']],
    quoteText: '«Сауна пахнет елью даже в декабре. А ледяная купель после — второе рождение».',
    quoteAuthor: 'Клиент · Анкона',
    finalKicker: 'Мы вас ждём', finalH2a: 'Ваш сад', finalH2b: 'заслуживает тишины',
    finalSub: 'Расскажите о вашем пространстве. Остальное мы придумаем.',
  },
  optionGroups: { wood: 'Дерево', 'sauna-heater': 'Печь', 'tub-filter': 'Фильтрация', 'tub-cover': 'Крышка', chiller: 'Охлаждение', diameter: 'Диаметр', 'front-windows': 'Окна спереди', 'back-windows': 'Окна сзади' } as Record<string, string>,
  cat: {
    saunasTitle: 'Бочковые сауны', saunasSub: 'Массив балтийской древесины, ель или термоясень. На 2–6 человек.',
    tubsTitle: 'Купели', tubsSub: 'На дровах, из дерева или стеклопластика.',
    iceTitle: 'Ледяные ванны', iceSub: 'Холод, который восстанавливает — круглый год.',
    accTitle: 'Аксессуары', accSub: 'Всё для вашего ритуала: ковши, камни, эфирные масла и уход за деревом.',
  },
  product: {
    params: 'Параметры и размеры', configure: 'Конфигурация', priceEstimate: 'Расчёт конфигурации', quantity: 'Количество',
    quoteTitle: 'Запросить расчёт', quoteSub: 'Без обязательств. Ответим в течение 24 часов.',
    name: 'Имя и фамилия', email: 'Email', phone: 'Телефон (необязательно)', address: 'Адрес доставки',
    city: 'Город', postal: 'Индекс', message: 'Сообщение (необязательно)',
    submit: 'Отправить запрос', sending: 'Отправка…',
    success: 'Спасибо! Ваш запрос отправлен.', successRef: 'Номер', successBody: 'Мы ответим в течение 24 часов с подробным расчётом.',
    error: 'Что-то пошло не так. Попробуйте ещё раз или напишите на info@saunaamore.it.',
    related: 'Вам может понравиться',
  },
  rental: {
    title: 'Аренда для мероприятий', sub: 'Сауна и лёд — везде, где нужна тишина.',
    body: 'Мы привозим северный опыт на ваше мероприятие: свадьбы, ретриты, фестивали и корпоративы в Ле Марке и за его пределами. Мобильная бочковая сауна, ледяные ванны и всё необходимое — с установкой и сопровождением.',
    cta: 'Обсудить',
  },
  about: {
    title: 'О нас', sub: 'История Sauna Amore',
    p1: 'Мэтт и Арита открыли для себя страсть к северному благополучию, путешествуя по Скандинавии, где ощутили преобразующую силу настоящей балтийской банной культуры. Так родилась идея: привезти эту тысячелетнюю традицию в Италию, соединив северное наследие со средиземноморским теплом.',
    p2: 'Компания Sauna Amore, основанная в сердце Ле Марке, предлагает премиальные сауны по честным ценам. Мы работаем напрямую с проверенными производителями: исключительная ценность без компромиссов в качестве.',
    p3: 'В нашем регионе пологих холмов и исторических городков мы верим: каждый заслуживает восстанавливающей силы настоящей сауны.',
    values: [['Качество', 'Премиальные изделия от надёжных производителей со строгими стандартами.'], ['Подлинность', 'Настоящая балтийская банная традиция, с уважением привезённая в Ле Марке.'], ['Сервис', 'Внимательная поддержка и честные цены — ваше благополучие прежде всего.']],
  },
  contact: {
    title: 'Контакты', sub: 'Расскажите о вашем проекте — ответим в течение 24 часов.',
    emailLabel: 'Напишите нам', whereLabel: 'Где мы', where: 'Ле Марке, Италия',
  },
  footer: {
    tagline: 'Северное благополучие в сердце Ле Марке. Премиальные финские сауны, ледяные ванны и подлинный wellness-опыт.',
    products: 'Продукция', company: 'Компания', contacts: 'Контакты', privacy: 'Конфиденциальность',
    rights: 'Все права защищены.',
  },
};

export const translations: Record<Lang, Dict> = { it, en, nl, de, ru };

export function isLang(v: unknown): v is Lang {
  return v === 'it' || v === 'en' || v === 'nl' || v === 'de' || v === 'ru';
}

/**
 * Product content: English is the source of truth (managed in the admin).
 * DeepL translations are stored per record in a `translations` Json column
 * ({ it|nl|de|ru: { name, description, specs } }) and used when available;
 * anything missing falls back to English.
 */
export type TransMap = Partial<Record<Exclude<Lang, 'en'>, { name?: string; description?: string; specs?: string }>>;

function trans(item: { translations?: unknown }, lang: Lang): { name?: string; description?: string; specs?: string } | undefined {
  if (lang === 'en') return undefined;
  const t = item.translations as TransMap | null | undefined;
  return t?.[lang];
}

export function pickName(item: { nameIt: string; nameEn: string; translations?: unknown }, lang: Lang): string {
  return trans(item, lang)?.name || item.nameEn;
}
export function pickField(
  item: { translations?: unknown },
  lang: Lang,
  key: 'description' | 'specs',
  fallback: string | null,
): string | null {
  return trans(item, lang)?.[key] || fallback;
}
export function pickText(itText: string | null, enText: string | null, _lang: Lang): string | null {
  return enText ?? itText;
}

export function euro(n: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

export const LangContext = createContext<Lang>('it');
export function useLang(): Lang {
  return useContext(LangContext);
}
export function useT(): Dict {
  return translations[useLang()];
}
