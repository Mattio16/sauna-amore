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
  optionGroups: { wood: 'Legno', 'sauna-heater': 'Stufa', 'tub-filter': 'Filtrazione', 'tub-cover': 'Copertura', chiller: 'Raffreddamento', roof: 'Tetto', diameter: 'Diametro', 'front-windows': 'Finestre frontali', 'back-windows': 'Finestre posteriori', stairs: 'Scaletta', 'liner-color': 'Colore interno', jacuzzi: 'Jacuzzi', led: 'Illuminazione LED' } as Record<string, string>,
  cat: {
    saunasTitle: 'Saune', saunasSub: 'Legno massiccio baltico, abete o thermowood. Da 2 a 6 persone.',
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
  faq: {
    title: "Domande frequenti", sub: "Tutto quello che c’è da sapere, prima e dopo l’ordine.", linkLabel: "FAQ", contactCta: "Non hai trovato la risposta? Scrivici",
    groups: [
      { h: "Ordine e pagamento", items: [
        ["Come si ordina?", "Configura il prodotto, scegli le opzioni e invia la richiesta di preventivo — online non si paga nulla. Ti rispondiamo entro 24 ore con un preventivo completo di consegna e confermiamo l’ordine insieme."],
        ["Quali sono le condizioni di pagamento?", "Accettiamo pagamenti con carta. Si versa il 50% di acconto prima dell’inizio della produzione e il restante 50% alla consegna."],
        ["Che garanzia ho?", "Ogni prodotto ha 2 anni di garanzia su materiali e lavorazione. Sono esclusi i materiali di consumo come guarnizioni e filtri."],
      ] },
      { h: "Spedizione e consegna", items: [
        ["Quali sono i tempi di consegna?", "Se la configurazione è disponibile a magazzino, circa 2 settimane. Se va prodotta su misura, circa 8 settimane. La data esatta viene confermata con il preventivo."],
        ["Quanto costa la consegna?", "A seconda del modello, la spedizione va da €300 a €500. Il costo esatto è sempre indicato nel preventivo. Consegniamo in tutta Italia."],
        ["Come mi preparo alla consegna?", "La sauna o la vasca arriva su un camion di medie dimensioni con sponda idraulica: serve quindi un accesso adeguato. Se l’accesso è difficile — vicoli stretti, cancelli, salite ripide — avvisaci in anticipo e organizziamo la soluzione."],
      ] },
      { h: "Montaggio e installazione", items: [
        ["Le saune arrivano montate?", "Di serie le saune vengono consegnate in kit (flat-pack). Puoi montarla da solo con le nostre istruzioni — due persone e un weekend — oppure scegliere il nostro servizio chiavi in mano di preparazione del terreno e montaggio."],
        ["Quanto costa il servizio di montaggio?", "La nostra squadra può montare e collaudare la sauna per te. Un’installazione semplice parte da €250; se servono preparazione del terreno o lavori più complessi, prepariamo un preventivo dedicato."],
        ["Che base serve?", "Una superficie piana e portante: platea in cemento, autobloccanti o pedana rinforzata. Ricorda che una vasca piena pesa 2–3 tonnellate: la base è la decisione più importante di tutte."],
      ] },
      { h: "Permessi e requisiti tecnici", items: [
        ["Serve un permesso edilizio?", "Nella maggior parte dei comuni italiani una sauna o vasca da giardino autoportante e amovibile rientra nell’edilizia libera: nessun permesso. La chiave è mantenerla amovibile: appoggiata su traversine, senza fondazioni in muratura né allacci permanenti. Le regole variano da comune a comune e possono esserci vincoli paesaggistici: verifica con il tuo comune o un geometra — noi ti supportiamo con disegni e schede tecniche."],
        ["Cosa serve per una sauna elettrica?", "Una stufa da 6–9 kW richiede in genere una linea dedicata trifase 400 V con protezione differenziale, installata da un elettricista qualificato. Prima della consegna confermiamo le specifiche elettriche esatte del tuo modello."],
        ["Cosa serve per una sauna o vasca a legna?", "Nessun allaccio elettrico. Il kit canna fumaria è incluso; mantieni la canna lontana da materiali infiammabili e rispetta le regole del comune sui fumi. Regola d’oro per le vasche a legna: mai accendere la stufa prima che la vasca sia piena d’acqua."],
      ] },
      { h: "Uso e cura", items: [
        ["Come si usa la sauna?", "Scalda per circa un’ora fino a 70–90°. Resta dentro 10–15 minuti, rinfrescati all’aperto o in acqua fredda, riposa e ripeti due o tre volte. Bevi molta acqua e versa acqua sulle pietre per il classico vapore morbido."],
        ["Come si usa la vasca riscaldata?", "Riempi completamente la vasca, poi accendi la stufa. L’acqua raggiunge circa 38° in 2–3 ore a seconda di volume e stagione: mescola ogni tanto per distribuire il calore. Un fuoco moderato mantiene la temperatura."],
        ["Come si usa il bagno di ghiaccio?", "Riempi con acqua fredda e inizia con immersioni di 1–3 minuti respirando lentamente. Con il chiller opzionale l’acqua resta a 3–6° tutto l’anno; senza, d’inverno ci pensa la natura."],
        ["Come si pulisce e si cura l’acqua?", "Cambia l’acqua regolarmente e pulisci la vetroresina con un detergente delicato non abrasivo. Il set di filtrazione mantiene l’acqua fresca per settimane. Usa sempre la copertura quando la vasca non è in uso e, col gelo, svuotala o tienila in funzione: il ghiaccio può danneggiare vasca e stufa."],
        ["Come si cura il legno?", "Il thermowood non richiede quasi manutenzione. L’abete beneficia di un trattamento protettivo ogni uno o due anni. A entrambi serve un punto ventilato: aria attorno alla base e niente ristagni d’acqua."],
        ["Posso provare prima di comprare?", "Sì: noleggiamo saune e bagni di ghiaccio per eventi e retreat, e puoi concordare una visita. Scrivici e organizziamo."],
      ] },
    ] as { h: string; items: [string, string][] }[],
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
  optionGroups: { wood: 'Wood', 'sauna-heater': 'Heater', 'tub-filter': 'Filtration', 'tub-cover': 'Cover', chiller: 'Chilling', roof: 'Roof', diameter: 'Diameter', 'front-windows': 'Front windows', 'back-windows': 'Back windows', stairs: 'Stairs', 'liner-color': 'Liner colour', jacuzzi: 'Jacuzzi', led: 'LED lighting' } as Record<string, string>,
  cat: {
    saunasTitle: 'Saunas', saunasSub: 'Solid Baltic timber, spruce or thermowood. For 2 to 6 people.',
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
  faq: {
    title: "Frequently asked questions", sub: "Everything you need to know, before and after ordering.", linkLabel: "FAQ", contactCta: "Didn’t find your answer? Write to us",
    groups: [
      { h: "Ordering & payment", items: [
        ["How do I order?", "Configure your product, choose your options and send a quote request — nothing is paid online. We reply within 24 hours with a complete quote including delivery, and confirm the order together with you."],
        ["What are the payment terms?", "We accept card payments. You pay a 50% deposit before production starts and the remaining 50% at delivery."],
        ["What warranty do I get?", "Every product comes with a 2-year warranty on materials and workmanship. Wear items such as gaskets and filters are excluded."],
      ] },
      { h: "Shipping & delivery", items: [
        ["What is the lead time?", "If your configuration is in stock, about 2 weeks. If it needs to be custom made, about 8 weeks. We confirm the exact date with your quote."],
        ["How much does delivery cost?", "Depending on the model, shipping ranges from €300 to €500. The exact cost is always included in your quote. We deliver throughout Italy."],
        ["What do I need to prepare for delivery?", "The sauna or tub arrives on a medium-sized lorry with a tail lift, so the address needs lorry access. If access is tight — narrow lanes, gates, steep drives — tell us in advance and we will plan around it."],
      ] },
      { h: "Assembly & installation", items: [
        ["Do the saunas arrive assembled?", "As standard the saunas are delivered flat-pack. You can assemble it yourself with our instructions — two people and a weekend — or choose our turnkey ground preparation and assembly service."],
        ["What does the assembly service cost?", "Our team can build and commission your sauna for you. A simple installation starts from €250; where ground preparation or more complex work is involved, we provide an individual quote."],
        ["What base does it need?", "A level, load-bearing surface: a concrete slab, pavers or a reinforced deck. Remember that a filled hot tub weighs 2–3 tonnes — the base is the most important decision of all."],
      ] },
      { h: "Permits & technical", items: [
        ["Do I need planning permission?", "In most Italian comuni a freestanding, movable garden sauna or tub falls under “edilizia libera” — no permit needed. The key is keeping it movable: resting on bearers rather than masonry foundations, with no permanent connections. Rules vary by comune and landscape restrictions may apply, so check with your comune or a geometra — we support you with drawings and specifications."],
        ["What does an electric sauna need?", "A 6–9 kW heater generally requires a dedicated 400 V three-phase line with RCD protection, installed by a qualified electrician. We confirm the exact electrical spec for your model before delivery."],
        ["What does a wood-fired sauna or tub need?", "No electricity at all. The chimney kit is included; keep the flue clear of combustible materials and respect your comune’s rules on smoke. One golden rule for wood-fired tubs: never light the stove before the tub is full of water."],
      ] },
      { h: "Use & care", items: [
        ["How do I use the sauna?", "Heat for about an hour to 70–90°. Stay in for 10–15 minutes, cool off outside or in cold water, rest, and repeat two or three times. Drink plenty of water, and ladle water over the stones for the classic soft steam."],
        ["How do I use the hot tub?", "Fill the tub completely, then light the stove. The water reaches about 38° in 2–3 hours depending on size and season — stir occasionally so the heat spreads evenly. A modest fire holds the temperature."],
        ["How do I use the ice bath?", "Fill with cold water and start with 1–3 minute dips, breathing slowly. With the optional chiller the water stays at 3–6° all year round; without it, winter does the work for free."],
        ["How do I clean it and care for the water?", "Change the water regularly and wipe fiberglass surfaces with a mild, non-abrasive soap. A filter set keeps hot tub water fresh for weeks. Always use the cover when the tub is not in use, and in freezing weather either drain it or keep it running — ice can damage the tub and stove."],
        ["How do I care for the wood?", "Thermowood needs almost no maintenance. Spruce benefits from a protective treatment every year or two. Both like a ventilated spot: air around the base and no standing water."],
        ["Can I try before I buy?", "Yes — we rent saunas and ice baths for events and retreats, and a visit can always be arranged. Write to us and we will organise it."],
      ] },
    ] as { h: string; items: [string, string][] }[],
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
  optionGroups: { wood: 'Hout', 'sauna-heater': 'Kachel', 'tub-filter': 'Filtratie', 'tub-cover': 'Afdekking', chiller: 'Koeling', roof: 'Dak', diameter: 'Diameter', 'front-windows': 'Ramen voorzijde', 'back-windows': 'Ramen achterzijde', stairs: 'Trap', 'liner-color': 'Kleur kuip', jacuzzi: 'Jacuzzi', led: 'LED-verlichting' } as Record<string, string>,
  cat: {
    saunasTitle: "Sauna's", saunasSub: 'Massief Baltisch hout, vuren of thermowood. Voor 2 tot 6 personen.',
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
  faq: {
    title: "Veelgestelde vragen", sub: "Alles wat je moet weten, vóór en na je bestelling.", linkLabel: "FAQ", contactCta: "Antwoord niet gevonden? Schrijf ons",
    groups: [
      { h: "Bestellen & betalen", items: [
        ["Hoe bestel ik?", "Stel je product samen, kies je opties en stuur een offerteaanvraag — online betaal je niets. Binnen 24 uur ontvang je een complete offerte inclusief levering en bevestigen we de bestelling samen."],
        ["Wat zijn de betalingsvoorwaarden?", "We accepteren kaartbetalingen. Je betaalt 50% aan vóór de start van de productie en de resterende 50% bij levering."],
        ["Welke garantie krijg ik?", "Elk product heeft 2 jaar garantie op materiaal en vakmanschap. Slijtageonderdelen zoals pakkingen en filters vallen erbuiten."],
      ] },
      { h: "Verzending & levering", items: [
        ["Wat is de levertijd?", "Op voorraad: circa 2 weken. Maatwerk: circa 8 weken. De exacte datum bevestigen we bij de offerte."],
        ["Wat kost de levering?", "Afhankelijk van het model kost verzending €300 tot €500. De exacte kosten staan altijd in je offerte. We leveren in heel Italië."],
        ["Hoe bereid ik me voor op de levering?", "De sauna of tub komt met een middelgrote vrachtwagen met laadklep; het adres moet daarvoor bereikbaar zijn. Is de toegang lastig — smalle straatjes, poorten, steile opritten — laat het vooraf weten, dan plannen we eromheen."],
      ] },
      { h: "Montage & installatie", items: [
        ["Komen de sauna’s gemonteerd aan?", "Standaard leveren we de sauna’s als bouwpakket (flat-pack). Je monteert zelf met onze instructies — twee personen en een weekend — of kiest onze turnkey-service voor grondvoorbereiding en montage."],
        ["Wat kost de montageservice?", "Ons team bouwt en test je sauna voor je. Een eenvoudige installatie begint bij €250; bij grondwerk of complexere klussen maken we een individuele offerte."],
        ["Welke ondergrond is nodig?", "Een vlakke, draagkrachtige ondergrond: betonplaat, klinkers of een verstevigd terras. Bedenk dat een gevulde hottub 2–3 ton weegt — de fundering is de belangrijkste keuze van allemaal."],
      ] },
      { h: "Vergunningen & techniek", items: [
        ["Heb ik een vergunning nodig?", "In de meeste Italiaanse gemeenten valt een vrijstaande, verplaatsbare tuinsauna of tub onder “edilizia libera” — geen vergunning nodig. De sleutel is verplaatsbaar houden: op balken in plaats van een gemetselde fundering, zonder vaste aansluitingen. Regels verschillen per gemeente en er kunnen landschapsbeperkingen gelden; check bij je gemeente of een geometra — wij ondersteunen met tekeningen en specificaties."],
        ["Wat heeft een elektrische sauna nodig?", "Een kachel van 6–9 kW vraagt doorgaans een aparte 400V-krachtstroomlijn met aardlekbeveiliging, aangelegd door een erkend elektricien. Vóór levering bevestigen we de exacte elektrische specificaties van je model."],
        ["Wat heeft een houtgestookte sauna of tub nodig?", "Helemaal geen stroom. De schoorsteenset is inbegrepen; houd het rookkanaal vrij van brandbaar materiaal en volg de lokale regels voor rook. Gouden regel voor houtgestookte tubs: nooit de kachel aansteken voordat de tub vol water zit."],
      ] },
      { h: "Gebruik & onderhoud", items: [
        ["Hoe gebruik ik de sauna?", "Stook ongeveer een uur op tot 70–90°. Blijf 10–15 minuten binnen, koel af buiten of in koud water, rust en herhaal twee of drie keer. Drink veel water en schep water op de stenen voor de klassieke zachte stoom."],
        ["Hoe gebruik ik de hottub?", "Vul de tub helemaal en steek dan pas de kachel aan. Het water is in 2–3 uur zo’n 38°, afhankelijk van volume en seizoen — roer af en toe zodat de warmte zich verdeelt. Een bescheiden vuur houdt de temperatuur vast."],
        ["Hoe gebruik ik het ijsbad?", "Vul met koud water en begin met dips van 1–3 minuten, rustig ademend. Met de optionele chiller blijft het water het hele jaar 3–6°; zonder doet de winter het werk gratis."],
        ["Hoe maak ik schoon en verzorg ik het water?", "Ververs het water regelmatig en neem glasvezel af met een mild, niet-schurend middel. Een filterset houdt hottubwater weken fris. Gebruik altijd de cover als de tub niet in gebruik is en bij vorst: leegmaken of laten draaien — ijs kan tub en kachel beschadigen."],
        ["Hoe onderhoud ik het hout?", "Thermowood vraagt vrijwel geen onderhoud. Vurenhout is gebaat bij een beschermende behandeling elke één à twee jaar. Beide houden van een luchtige plek: ventilatie rond de basis en geen staand water."],
        ["Kan ik eerst proberen?", "Ja — we verhuren sauna’s en ijsbaden voor evenementen en retreats, en een bezoek is altijd te regelen. Schrijf ons en we organiseren het."],
      ] },
    ] as { h: string; items: [string, string][] }[],
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
  optionGroups: { wood: 'Holz', 'sauna-heater': 'Ofen', 'tub-filter': 'Filtration', 'tub-cover': 'Abdeckung', chiller: 'Kühlung', roof: 'Dach', diameter: 'Durchmesser', 'front-windows': 'Fenster vorne', 'back-windows': 'Fenster hinten', stairs: 'Treppe', 'liner-color': 'Wannenfarbe', jacuzzi: 'Jacuzzi', led: 'LED-Beleuchtung' } as Record<string, string>,
  cat: {
    saunasTitle: 'Saunen', saunasSub: 'Baltisches Massivholz, Fichte oder Thermoholz. Für 2 bis 6 Personen.',
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
  faq: {
    title: "Häufige Fragen", sub: "Alles Wichtige — vor und nach der Bestellung.", linkLabel: "FAQ", contactCta: "Antwort nicht gefunden? Schreiben Sie uns",
    groups: [
      { h: "Bestellung & Zahlung", items: [
        ["Wie bestelle ich?", "Konfigurieren Sie Ihr Produkt, wählen Sie die Optionen und senden Sie eine Angebotsanfrage — online wird nichts bezahlt. Innerhalb von 24 Stunden erhalten Sie ein komplettes Angebot inklusive Lieferung, und wir bestätigen die Bestellung gemeinsam."],
        ["Wie sind die Zahlungsbedingungen?", "Wir akzeptieren Kartenzahlung. 50% Anzahlung vor Produktionsbeginn, die restlichen 50% bei Lieferung."],
        ["Welche Garantie erhalte ich?", "Jedes Produkt hat 2 Jahre Garantie auf Material und Verarbeitung. Verschleißteile wie Dichtungen und Filter sind ausgenommen."],
      ] },
      { h: "Versand & Lieferung", items: [
        ["Wie lang ist die Lieferzeit?", "Ab Lager: etwa 2 Wochen. Maßanfertigung: etwa 8 Wochen. Den genauen Termin bestätigen wir mit dem Angebot."],
        ["Was kostet die Lieferung?", "Je nach Modell liegt der Versand zwischen €300 und €500. Die genauen Kosten stehen immer im Angebot. Wir liefern in ganz Italien."],
        ["Wie bereite ich mich auf die Lieferung vor?", "Sauna oder Tub kommen mit einem mittelgroßen LKW mit Hebebühne — die Adresse muss dafür erreichbar sein. Bei schwieriger Zufahrt — enge Gassen, Tore, steile Auffahrten — sagen Sie uns vorher Bescheid, wir planen entsprechend."],
      ] },
      { h: "Montage & Installation", items: [
        ["Kommen die Saunen montiert an?", "Standardmäßig liefern wir die Saunen als Bausatz (Flat-Pack). Sie montieren selbst mit unserer Anleitung — zwei Personen, ein Wochenende — oder wählen unseren schlüsselfertigen Service für Bodenvorbereitung und Montage."],
        ["Was kostet der Montageservice?", "Unser Team baut Ihre Sauna auf und nimmt sie in Betrieb. Eine einfache Installation beginnt bei €250; bei Bodenarbeiten oder komplexeren Projekten erstellen wir ein individuelles Angebot."],
        ["Welcher Untergrund wird benötigt?", "Eine ebene, tragfähige Fläche: Betonplatte, Pflaster oder ein verstärktes Deck. Bedenken Sie: Ein gefüllter Hot Tub wiegt 2–3 Tonnen — das Fundament ist die wichtigste Entscheidung überhaupt."],
      ] },
      { h: "Genehmigungen & Technik", items: [
        ["Brauche ich eine Baugenehmigung?", "In den meisten italienischen Gemeinden fällt eine freistehende, versetzbare Gartensauna oder Tub unter die „edilizia libera“ — keine Genehmigung nötig. Entscheidend ist die Versetzbarkeit: auf Trägern statt gemauertem Fundament, ohne feste Anschlüsse. Die Regeln variieren je nach Gemeinde, und Landschaftsschutz kann greifen; klären Sie es mit Ihrer Gemeinde oder einem Geometra — wir unterstützen mit Zeichnungen und Datenblättern."],
        ["Was braucht eine Elektrosauna?", "Ein 6–9-kW-Ofen benötigt in der Regel eine eigene 400-V-Drehstromleitung mit FI-Schutz, installiert von einem qualifizierten Elektriker. Vor der Lieferung bestätigen wir die genauen elektrischen Anforderungen Ihres Modells."],
        ["Was braucht eine holzbefeuerte Sauna oder Tub?", "Gar keinen Strom. Das Schornstein-Set ist inklusive; halten Sie das Rauchrohr von brennbaren Materialien fern und beachten Sie die lokalen Regeln. Goldene Regel bei Holz-Tubs: Den Ofen nie anfeuern, bevor die Tub voll Wasser ist."],
      ] },
      { h: "Nutzung & Pflege", items: [
        ["Wie benutze ich die Sauna?", "Etwa eine Stunde auf 70–90° aufheizen. 10–15 Minuten bleiben, draußen oder im kalten Wasser abkühlen, ruhen, zwei- bis dreimal wiederholen. Viel trinken — und Wasser über die Steine gießen für den klassischen weichen Aufguss."],
        ["Wie benutze ich den Hot Tub?", "Die Tub erst vollständig füllen, dann den Ofen anzünden. Das Wasser erreicht je nach Volumen und Jahreszeit in 2–3 Stunden etwa 38° — gelegentlich umrühren, damit sich die Wärme verteilt. Ein moderates Feuer hält die Temperatur."],
        ["Wie benutze ich das Eisbad?", "Mit kaltem Wasser füllen und mit 1–3-minütigen Tauchgängen beginnen, ruhig atmen. Mit dem optionalen Chiller bleibt das Wasser ganzjährig bei 3–6°; ohne erledigt der Winter die Arbeit gratis."],
        ["Wie reinige und pflege ich das Wasser?", "Wasser regelmäßig wechseln und Glasfaserflächen mit mildem, nicht scheuerndem Reiniger abwischen. Ein Filterset hält das Wasser wochenlang frisch. Nutzen Sie immer die Abdeckung, und bei Frost: entleeren oder in Betrieb halten — Eis kann Tub und Ofen beschädigen."],
        ["Wie pflege ich das Holz?", "Thermoholz braucht kaum Pflege. Fichte profitiert von einer Schutzbehandlung alle ein bis zwei Jahre. Beide mögen einen luftigen Standort: Luft um die Basis, kein stehendes Wasser."],
        ["Kann ich vorher testen?", "Ja — wir vermieten Saunen und Eisbäder für Events und Retreats, und ein Besuch lässt sich immer einrichten. Schreiben Sie uns, wir organisieren es."],
      ] },
    ] as { h: string; items: [string, string][] }[],
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
  optionGroups: { wood: 'Дерево', 'sauna-heater': 'Печь', 'tub-filter': 'Фильтрация', 'tub-cover': 'Крышка', chiller: 'Охлаждение', roof: 'Крыша', diameter: 'Диаметр', 'front-windows': 'Окна спереди', 'back-windows': 'Окна сзади', stairs: 'Лестница', 'liner-color': 'Цвет чаши', jacuzzi: 'Джакузи', led: 'LED-подсветка' } as Record<string, string>,
  cat: {
    saunasTitle: 'Сауны', saunasSub: 'Массив балтийской древесины, ель или термоясень. На 2–6 человек.',
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
  faq: {
    title: "Частые вопросы", sub: "Всё, что нужно знать до и после заказа.", linkLabel: "FAQ", contactCta: "Не нашли ответ? Напишите нам",
    groups: [
      { h: "Заказ и оплата", items: [
        ["Как оформить заказ?", "Соберите конфигурацию, выберите опции и отправьте запрос — онлайн ничего платить не нужно. В течение 24 часов мы пришлём полное предложение с доставкой и вместе подтвердим заказ."],
        ["Каковы условия оплаты?", "Принимаем оплату картой. 50% предоплата до начала производства, оставшиеся 50% — при доставке."],
        ["Какая гарантия?", "На каждое изделие — гарантия 2 года на материалы и качество изготовления. Расходные детали (уплотнители, фильтры) не входят."],
      ] },
      { h: "Доставка", items: [
        ["Каковы сроки поставки?", "Если конфигурация есть на складе — около 2 недель. Если изготавливается на заказ — около 8 недель. Точную дату подтверждаем вместе с предложением."],
        ["Сколько стоит доставка?", "В зависимости от модели — от €300 до €500. Точная стоимость всегда указана в предложении. Доставляем по всей Италии."],
        ["Как подготовиться к доставке?", "Сауна или купель приезжает на грузовике среднего размера с гидробортом — нужен подъезд для него. Если доступ сложный (узкие улицы, ворота, крутые подъёмы), предупредите заранее — мы всё спланируем."],
      ] },
      { h: "Монтаж и установка", items: [
        ["Сауны приходят в собранном виде?", "Стандартно сауны поставляются в разобранном виде (flat-pack). Можно собрать самостоятельно по нашей инструкции — два человека и выходные — или заказать наш сервис «под ключ»: подготовка площадки и монтаж."],
        ["Сколько стоит монтаж?", "Наша команда соберёт и запустит сауну за вас. Простая установка — от €250; если нужны земляные работы или сложный монтаж, подготовим индивидуальное предложение."],
        ["Какое основание нужно?", "Ровная несущая площадка: бетонная плита, брусчатка или усиленный настил. Помните: заполненная купель весит 2–3 тонны — основание важнее всего."],
      ] },
      { h: "Разрешения и техника", items: [
        ["Нужно ли разрешение на строительство?", "В большинстве итальянских коммун отдельно стоящая переставная садовая сауна или купель относится к «edilizia libera» — разрешение не требуется. Главное — сохранить переставной характер: опоры вместо каменного фундамента, без постоянных подключений. Правила зависят от коммуны, возможны ландшафтные ограничения; уточните в коммуне или у geometra — мы поможем чертежами и спецификациями."],
        ["Что нужно для электрической сауны?", "Печи 6–9 кВт обычно требуют отдельной трёхфазной линии 400 В с УЗО, установленной квалифицированным электриком. Точные требования для вашей модели подтверждаем до доставки."],
        ["Что нужно для дровяной сауны или купели?", "Электричество не нужно вовсе. Дымоход в комплекте; держите трубу вдали от горючих материалов и соблюдайте местные правила. Золотое правило дровяных купелей: не разжигайте печь, пока купель не заполнена водой."],
      ] },
      { h: "Использование и уход", items: [
        ["Как пользоваться сауной?", "Прогрейте около часа до 70–90°. 10–15 минут внутри, охлаждение на воздухе или в холодной воде, отдых — и так два-три круга. Пейте больше воды и поддавайте на камни для мягкого пара."],
        ["Как пользоваться купелью?", "Сначала полностью наполните купель, затем растопите печь. Вода нагреется до ~38° за 2–3 часа в зависимости от объёма и сезона — иногда перемешивайте. Умеренный огонь держит температуру."],
        ["Как пользоваться ледяной купелью?", "Наполните холодной водой и начинайте с погружений на 1–3 минуты, дыша спокойно. С опциональным чиллером вода круглый год 3–6°; без него зимой всё сделает природа."],
        ["Как чистить и ухаживать за водой?", "Регулярно меняйте воду, стеклопластик протирайте мягким неабразивным средством. Фильтр-комплект сохраняет воду свежей неделями. Всегда закрывайте крышкой, а в мороз сливайте воду или не останавливайте работу: лёд может повредить купель и печь."],
        ["Как ухаживать за деревом?", "Термодерево почти не требует ухода. Ель стоит обрабатывать защитным составом раз в один-два года. Обоим нужно проветриваемое место: воздух вокруг основания и никакой стоячей воды."],
        ["Можно ли попробовать до покупки?", "Да — мы сдаём сауны и ледяные купели в аренду для мероприятий и ретритов, можно и договориться о визите. Напишите нам — организуем."],
      ] },
    ] as { h: string; items: [string, string][] }[],
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
