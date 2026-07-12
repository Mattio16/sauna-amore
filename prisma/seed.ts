/**
 * Sauna Amore — seed for Product Lineup 2026/27 (curated 12-product range).
 *
 * Source of truth: "Product Lineup 2026/27" (July 2026):
 *  - 6 saunas (good-better-best), 3 hot tubs, 2 ice baths, 1 garden shower
 *  - Wood is an option (spruce standard / thermowood premium), not a product
 *  - Heater menu on every sauna: standard electric (included) / smart HUUM (+990) /
 *    wood-fired (+690 small, +990 large). S16 is electric-only.
 *  - Base price = suggested retail incl. IVA, spruce flat-pack, standard heater.
 *  - Assembly/ground prep quoted separately (not a configurator option).
 *  - Cut models are deleted from the site (available to order, invisible).
 *
 * Accessories (secchielli, pietre, oli…) still seed from lib/products.ts.
 * Idempotent: upserts by SKU, replaces images/options, deletes non-lineup products.
 * Run: npx prisma db seed
 */
import { PrismaClient, Category, DisplayType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { saunaAccessories, hottubAccessories, icebathAccessories, type Accessory } from '../lib/products';

const prisma = new PrismaClient();

// ---------------- option groups ----------------

const GROUPS = [
  { code: 'wood', nameIt: 'Legno', nameEn: 'Wood', sortOrder: 0 },
  { code: 'sauna-heater', nameIt: 'Stufa', nameEn: 'Heater', sortOrder: 1 },
  { code: 'tub-filter', nameIt: 'Filtrazione', nameEn: 'Filtration', sortOrder: 2 },
  { code: 'tub-cover', nameIt: 'Copertura', nameEn: 'Cover', sortOrder: 3 },
  { code: 'chiller', nameIt: 'Raffreddamento', nameEn: 'Chilling', sortOrder: 4 },
  { code: 'diameter', nameIt: 'Diametro', nameEn: 'Diameter', sortOrder: 5 },
  { code: 'roof', nameIt: 'Tetto', nameEn: 'Roof', sortOrder: 6 },
  { code: 'front-windows', nameIt: 'Finestre frontali', nameEn: 'Front windows', sortOrder: 7 },
  { code: 'back-windows', nameIt: 'Finestre posteriori', nameEn: 'Back windows', sortOrder: 8 },
  { code: 'stairs', nameIt: 'Scaletta', nameEn: 'Stairs', sortOrder: 9 },
  { code: 'liner-color', nameIt: 'Colore interno', nameEn: 'Liner colour', sortOrder: 10 },
  { code: 'jacuzzi', nameIt: 'Jacuzzi', nameEn: 'Jacuzzi', sortOrder: 11 },
  { code: 'led', nameIt: 'Illuminazione LED', nameEn: 'LED lighting', sortOrder: 12 },
];

const OPTIONS = [
  { group: 'wood', code: 'spruce', description: 'Light Nordic spruce with 40 mm solid walls — the classic sauna look. Benefits from a protective wood treatment every few years.', nameIt: 'Abete classico', nameEn: 'Classic spruce', sortOrder: 0 },
  { group: 'wood', code: 'thermowood', description: 'Heat-treated timber: darker tone, higher durability and much lower maintenance. Resists moisture and insects without treatment.', nameIt: 'Thermowood premium', nameEn: 'Premium thermowood', sortOrder: 1 },
  { group: 'sauna-heater', code: 'electric-standard', description: 'Harvia electric stove sized to the sauna (6–9 kW), sauna stones included. Set the temperature and it is ready in about an hour.', nameIt: 'Elettrica standard (Harvia)', nameEn: 'Standard electric (Harvia)', sortOrder: 0 },
  { group: 'sauna-heater', code: 'electric-smart', description: 'HUUM Drop 9 kW with UKU WiFi control: start the sauna from your phone and arrive to 80°. 55 kg of stones for soft, even steam.', nameIt: 'Elettrica smart (HUUM + WiFi)', nameEn: 'Smart electric (HUUM + WiFi)', sortOrder: 1 },
  { group: 'sauna-heater', code: 'wood-fired', description: 'The authentic ritual: crackling fire, no electricity needed. Complete set with chimney kit and sauna stones.', nameIt: 'A legna (set con canna fumaria)', nameEn: 'Wood-fired (incl. chimney set)', sortOrder: 2 },
  { group: 'tub-filter', code: 'no-filter', description: 'Drain-and-refill use: empty the tub after a few sessions and refill with fresh water.', nameIt: 'Senza filtrazione', nameEn: 'No filtration', sortOrder: 0 },
  { group: 'tub-filter', code: 'filter-set', description: 'Circulation filter set keeps the water clean and clear for weeks between changes.', nameIt: 'Set filtrazione', nameEn: 'Filter set', sortOrder: 1 },
  { group: 'tub-cover', code: 'no-cover', description: 'Open tub — cover can be added later at any time.', nameIt: 'Senza copertura', nameEn: 'No cover', sortOrder: 0 },
  { group: 'tub-cover', code: 'insulated-cover', description: 'Insulated lid keeps the heat overnight (less firewood to reheat) and keeps leaves and rain out.', nameIt: 'Copertura isolata', nameEn: 'Insulated cover', sortOrder: 1 },
  { group: 'chiller', code: 'no-chiller', description: 'Fill with cold tap water — in winter, nature does the chilling for free.', nameIt: 'Acqua naturale', nameEn: 'Natural water', sortOrder: 0 },
  { group: 'chiller', code: 'chiller-pro', description: '7 kW chiller with filtration keeps the water at 4–6° all year round, always ready to plunge. The gym and hospitality spec.', nameIt: 'Chiller Pro 7kW + filtro (sempre freddo)', nameEn: 'Pro chiller 7kW + filter (always cold)', sortOrder: 1 },
  { group: 'diameter', code: 'd2', description: 'Standard Ø2 m barrel: 210 cm interior height, fits most gardens and doorways.', nameIt: 'Ø2 m', nameEn: 'Ø2 m', sortOrder: 0 },
  { group: 'diameter', code: 'd22', description: 'Ø2.2 m barrel: 20 cm more headroom (230 cm) and noticeably wider benches. Worth it for taller users.', nameIt: 'Ø2,2 m (più alta e spaziosa)', nameEn: 'Ø2.2 m (taller and roomier)', sortOrder: 1 },
  { group: 'roof', code: 'roof-brown', description: 'Brown bitumen shingles — the warm classic that suits spruce especially well. Included in the price.', nameIt: 'Marrone', nameEn: 'Brown', sortOrder: 0 },
  { group: 'roof', code: 'roof-black', description: 'Black bitumen shingles — a sharp, modern look that pairs beautifully with thermowood. Included in the price.', nameIt: 'Nero', nameEn: 'Black', sortOrder: 1 },
  { group: 'roof', code: 'roof-green', description: 'Green bitumen shingles — blends the sauna into hedges and garden greenery. Included in the price.', nameIt: 'Verde', nameEn: 'Green', sortOrder: 2 },
  { group: 'stairs', code: 'no-stairs', description: 'No steps — fine when the tub sits against a deck or terrace edge.', nameIt: 'Senza scaletta', nameEn: 'No stairs', sortOrder: 0 },
  { group: 'stairs', code: 'stairs-classic', description: 'Solid wooden three-step ladder — the safe, easy way in and out.', nameIt: 'Scaletta classica', nameEn: 'Classic stairs', sortOrder: 1 },
  { group: 'stairs', code: 'stairs-lux', description: 'Curved two-tier LUX platform that hugs the tub — doubles as a seat and looks built-in.', nameIt: 'Scaletta LUX', nameEn: 'Stairs LUX', sortOrder: 2 },
  { group: 'tub-cover', code: 'wooden-lid', description: 'Solid spruce lid — keeps leaves, rain and curious animals out of the water. Please note it is not insulated, so the tub will cool down overnight.', nameIt: 'Coperchio in legno (non isolato)', nameEn: 'Wooden lid (uninsulated)', sortOrder: 2 },
  { group: 'liner-color', code: 'liner-blue', description: 'Classic Mediterranean blue (RAL 5010).', nameIt: 'Blu', nameEn: 'Blue', sortOrder: 0 },
  { group: 'liner-color', code: 'liner-grey', description: 'Anthracite grey (RAL 7016) — the discreet, modern choice.', nameIt: 'Grigio', nameEn: 'Grey', sortOrder: 1 },
  { group: 'liner-color', code: 'liner-turquoise', description: 'Soft turquoise (RAL 6034) — bright, spa-like water colour.', nameIt: 'Turchese', nameEn: 'Turquoise', sortOrder: 2 },
  { group: 'liner-color', code: 'liner-beige', description: 'Warm beige (RAL 1013) — natural against wood cladding.', nameIt: 'Beige', nameEn: 'Beige', sortOrder: 3 },
  { group: 'liner-color', code: 'liner-black', description: 'Deep black (RAL 9005) — dramatic, holds the heat look of dark water.', nameIt: 'Nero', nameEn: 'Black', sortOrder: 4 },
  { group: 'jacuzzi', code: 'no-jacuzzi', description: 'Pure wood-fired soaking, no pumps and no power needed.', nameIt: 'Senza jacuzzi', nameEn: 'No jacuzzi', sortOrder: 0 },
  { group: 'jacuzzi', code: 'bubble-system', description: 'Air bubble system: thousands of soft bubbles from the seats — gentle, playful massage.', nameIt: 'Sistema bolle', nameEn: 'Bubble system', sortOrder: 1 },
  { group: 'jacuzzi', code: 'hydromassage', description: 'Hydromassage jets: directed water streams for a real massage on back and shoulders.', nameIt: 'Idromassaggio', nameEn: 'Hydromassage', sortOrder: 2 },
  { group: 'jacuzzi', code: 'bubble-hydro', description: 'The full set: bubbles plus hydromassage jets — the complete spa experience.', nameIt: 'Bolle + idromassaggio', nameEn: 'Bubble + hydromassage set', sortOrder: 3 },
  { group: 'led', code: 'no-led', description: 'No underwater lighting.', nameIt: 'Senza LED', nameEn: 'No LED light', sortOrder: 0 },
  { group: 'led', code: 'led-1', description: 'One underwater LED — a warm glow for evening soaks.', nameIt: '1 luce LED', nameEn: '1 LED light', sortOrder: 1 },
  { group: 'led', code: 'led-2', description: 'Two underwater LEDs for even lighting across the tub.', nameIt: '2 luci LED', nameEn: '2 LED lights', sortOrder: 2 },
  { group: 'led', code: 'led-8', description: 'Eight LEDs around the rim — the tub becomes a glowing centrepiece at night.', nameIt: '8 luci LED', nameEn: '8 LED lights', sortOrder: 3 },
  { group: 'front-windows', code: 'fw-none', description: 'Solid wood front — maximum heat retention and privacy.', nameIt: 'Senza finestre', nameEn: 'No windows', sortOrder: 0 },
  { group: 'front-windows', code: 'fw-2-fixed', description: 'Two fixed windows either side of the door bring daylight into the cabin.', nameIt: '2 finestre fisse', nameEn: '2 non-openable windows', sortOrder: 1 },
  { group: 'front-windows', code: 'fw-2-open', description: 'Two opening windows for daylight plus quick airing between sessions.', nameIt: '2 finestre apribili', nameEn: '2 openable windows', sortOrder: 2 },
  { group: 'front-windows', code: 'fw-glass-wall', description: 'Full tempered-glass front wall with glass door — the panoramic experience, safe next to the stove.', nameIt: 'Parete vetrata con porta in vetro', nameEn: 'Glass wall with glass door', sortOrder: 3 },
  { group: 'back-windows', code: 'bw-none', description: 'Solid wood back wall — the warmest, most traditional configuration.', nameIt: 'Senza finestre', nameEn: 'No windows', sortOrder: 0 },
  { group: 'back-windows', code: 'bw-2-fixed', description: 'Two fixed windows on the back wall for light from both sides.', nameIt: '2 finestre fisse', nameEn: '2 non-openable windows', sortOrder: 1 },
  { group: 'back-windows', code: 'bw-2-open', description: 'Two opening back windows — cross-ventilation dries the cabin quickly.', nameIt: '2 finestre apribili', nameEn: '2 openable windows', sortOrder: 2 },
  { group: 'back-windows', code: 'bw-panoramic', description: 'Half-moon panoramic window behind the benches: your garden becomes the view from the top bench.', nameIt: 'Finestra panoramica', nameEn: 'Panoramic window', sortOrder: 3 },
  { group: 'back-windows', code: 'bw-round-panoramic', description: 'The full round glass back wall — the most spectacular option, best facing a view.', nameIt: 'Finestra panoramica rotonda', nameEn: 'Round panoramic window', sortOrder: 4 },
];

// ---------------- lineup ----------------

type LineupProduct = {
  sku: string;
  slug: string;
  category: Category;
  subcategory: string | null;
  nameIt: string;
  nameEn: string;
  descriptionIt: string;
  descriptionEn: string;
  specsIt?: string;
  specsEn?: string;
  basePrice: number;
  capacity: number | null;
  dimensions: string | null;
  sortOrder: number;
  images: string[];
  videoUrl?: string;
  supplierItems?: { label: string; cost: number }[];
  options: { group: string; code: string; delta: number; isDefault?: boolean; supplier?: number }[];
};

const heaterMenu = (woodFiredDelta: number, stdCost: number, wfCost: number) => [
  { group: 'sauna-heater', code: 'electric-standard', delta: 0, isDefault: true, supplier: stdCost },
  { group: 'sauna-heater', code: 'electric-smart', delta: 990, supplier: 1210 },
  { group: 'sauna-heater', code: 'wood-fired', delta: woodFiredDelta, supplier: wfCost },
];
const woodToggle = (thermoDelta: number) => [
  { group: 'wood', code: 'spruce', delta: 0, isDefault: true },
  { group: 'wood', code: 'thermowood', delta: thermoDelta },
];
// Window & diameter menus. Deltas = Baltresto public option price + ~30% margin, rounded.
const frontWindows = () => [
  { group: 'front-windows', code: 'fw-none', delta: 0, isDefault: true },
  { group: 'front-windows', code: 'fw-2-fixed', delta: 190 },
  { group: 'front-windows', code: 'fw-2-open', delta: 300 },
  { group: 'front-windows', code: 'fw-glass-wall', delta: 1190 },
];
const backWindows = () => [
  { group: 'back-windows', code: 'bw-none', delta: 0, isDefault: true },
  { group: 'back-windows', code: 'bw-2-fixed', delta: 190 },
  { group: 'back-windows', code: 'bw-2-open', delta: 300 },
  { group: 'back-windows', code: 'bw-panoramic', delta: 460 },
  { group: 'back-windows', code: 'bw-round-panoramic', delta: 870 },
];
const diameterChoice = () => [
  { group: 'diameter', code: 'd2', delta: 0, isDefault: true },
  { group: 'diameter', code: 'd22', delta: 390 },
];
const roofChoice = () => [
  { group: 'roof', code: 'roof-brown', delta: 0, isDefault: true },
  { group: 'roof', code: 'roof-black', delta: 0 },
  { group: 'roof', code: 'roof-green', delta: 0 },
];
const linerColors = () => [
  { group: 'liner-color', code: 'liner-blue', delta: 0, isDefault: true },
  { group: 'liner-color', code: 'liner-grey', delta: 0 },
  { group: 'liner-color', code: 'liner-turquoise', delta: 0 },
  { group: 'liner-color', code: 'liner-beige', delta: 0 },
  { group: 'liner-color', code: 'liner-black', delta: 0 },
];
// Jacuzzi & LED deltas = Baltresto public price + ~30% margin, rounded.
const jacuzziChoice = () => [
  { group: 'jacuzzi', code: 'no-jacuzzi', delta: 0, isDefault: true },
  { group: 'jacuzzi', code: 'bubble-system', delta: 510 },
  { group: 'jacuzzi', code: 'hydromassage', delta: 750 },
  { group: 'jacuzzi', code: 'bubble-hydro', delta: 1120 },
];
const ledChoice = () => [
  { group: 'led', code: 'no-led', delta: 0, isDefault: true },
  { group: 'led', code: 'led-1', delta: 250 },
  { group: 'led', code: 'led-2', delta: 340 },
  { group: 'led', code: 'led-8', delta: 440 },
];
const stairsChoice = () => [
  { group: 'stairs', code: 'no-stairs', delta: 0, isDefault: true },
  { group: 'stairs', code: 'stairs-classic', delta: 80 },
  { group: 'stairs', code: 'stairs-lux', delta: 300 },
];
const img = (sku: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/images/products/${sku}/${i + 1}.jpg`);

const LINEUP: LineupProduct[] = [
  // ---------- Saunas (6) ----------
  {
    sku: 'S16', slug: 's16-mini', category: 'SAUNA', subcategory: '1.6m',
    nameIt: 'S16 · Mini', nameEn: 'S16 · Mini',
    descriptionIt: "La porta d'ingresso alla vera sauna finlandese. Compatta, si monta in poche ore e vive bene anche nei giardini piccoli. Elettrica: si accende, si aspettano 40 minuti, si entra.",
    descriptionEn: 'The entry to true Finnish sauna. Compact, assembled in a few hours, at home even in small gardens. Electric: switch on, wait 40 minutes, step in.',
    supplierItems: [{ label: 'Sauna S16 spruce flat-pack', cost: 1290 }, { label: 'Harvia M60 6kW electric', cost: 240 }],
    basePrice: 2590, capacity: 3, dimensions: '160×200×210 cm', sortOrder: 0,
    specsIt: 'Diametro: Ø2 m | Montata (LxPxA): 160×200×210 cm | Kit (LxPxA): 200×120×150 cm | Volume cabina: 4,2 m³ | Lunghezza cabina: 145 cm | Peso: ~500 kg | Capienza cabina: 2–3 persone | Spessore legno: 40 mm | Larghezza panche: 49 cm | Riscaldamento: ~1 h',
    specsEn: 'Diameter: Ø2 m | Assembled (LxWxH): 160×200×210 cm | Flat-pack (LxWxH): 200×120×150 cm | Steam room volume: 4.2 m³ | Steam room length: 145 cm | Weight: ~500 kg | Steam room capacity: 2–3 persons | Wood thickness: 40 mm | Bench width: 49 cm | Heating time: ~1 h',
    images: img('s16', 5),
    options: [
      ...woodToggle(400),
      { group: 'sauna-heater', code: 'electric-standard', delta: 0, isDefault: true, supplier: 240 },
      { group: 'sauna-heater', code: 'electric-smart', delta: 990, supplier: 1210 },
      ...roofChoice(), ...frontWindows(), ...backWindows(),
    ],
  },
  {
    sku: 'S2V', slug: 's2v-2-4m', category: 'SAUNA', subcategory: '2.4m',
    nameIt: 'S2V · 2.4m', nameEn: 'S2V · 2.4m',
    descriptionIt: "La nostra raccomandazione. Appena più lunga della 2 metri ma sensibilmente più comoda: quattro persone sedute bene, tre cerchi d'acciaio, proporzioni perfette. Se non sai quale scegliere, è questa.",
    descriptionEn: "Our recommendation. Barely longer than the 2-metre but noticeably roomier: four people seated well, three steel hoops, perfect proportions. If you don't know which to choose, it's this one.",
    supplierItems: [{ label: 'Sauna S2V spruce flat-pack', cost: 1470 }, { label: 'Harvia M80 8kW electric', cost: 270 }],
    basePrice: 2990, capacity: 4, dimensions: '240×200×210 cm', sortOrder: 1,
    specsIt: 'Diametro: Ø2 m | Montata (LxPxA): 240×200×210 cm | Kit (LxPxA): 240×120×150 cm | Volume cabina: 5,3 m³ | Lunghezza cabina: 185 cm | Peso: ~670 kg | Capienza cabina: ~4 persone | Spessore legno: 40 mm | Larghezza panche: 49 cm | Riscaldamento: ~1 h',
    specsEn: 'Diameter: Ø2 m | Assembled (LxWxH): 240×200×210 cm | Flat-pack (LxWxH): 240×120×150 cm | Steam room volume: 5.3 m³ | Steam room length: 185 cm | Weight: ~670 kg | Steam room capacity: ~4 persons | Wood thickness: 40 mm | Bench width: 49 cm | Heating time: ~1 h',
    images: img('s2v', 6),
    options: [...woodToggle(450), ...heaterMenu(690, 270, 730), ...diameterChoice(), ...roofChoice(), ...frontWindows(), ...backWindows()],
  },
  {
    sku: 'S3', slug: 's3-3m', category: 'SAUNA', subcategory: '3m',
    nameIt: 'S3 · 3m', nameEn: 'S3 · 3m',
    descriptionIt: 'Per famiglie e gruppi: sei persone, panche comode, il classico dei classici. Il passo su misura per chi chiede "e quella più grande?".',
    descriptionEn: 'For families and groups: six people, comfortable benches, the classic of classics. The right step up for anyone asking "and the bigger one?".',
    supplierItems: [{ label: 'Sauna S3 spruce flat-pack', cost: 1740 }, { label: 'Harvia PC90 9kW electric', cost: 420 }],
    basePrice: 3590, capacity: 6, dimensions: '300×200×210 cm', sortOrder: 2,
    specsIt: 'Diametro: Ø2 m | Montata (LxPxA): 300×200×210 cm | Kit (LxPxA): 300×80×150 cm | Volume cabina: 6,0 m³ | Lunghezza cabina: 280 cm | Peso: ~650 kg | Capienza cabina: ~6 persone | Spessore legno: 40 mm | Larghezza panche: 49 cm | Riscaldamento: ~1 h',
    specsEn: 'Diameter: Ø2 m | Assembled (LxWxH): 300×200×210 cm | Flat-pack (LxWxH): 300×80×150 cm | Steam room volume: 6.0 m³ | Steam room length: 280 cm | Weight: ~650 kg | Steam room capacity: ~6 persons | Wood thickness: 40 mm | Bench width: 49 cm | Heating time: ~1 h',
    images: img('s3', 4),
    options: [...woodToggle(500), ...heaterMenu(990, 420, 1120), ...diameterChoice(), ...roofChoice(), ...frontWindows(), ...backWindows()],
  },
  {
    sku: 'S4P', slug: 's4p-4m-spogliatoio', category: 'SAUNA', subcategory: '4m',
    nameIt: 'S4P · 4m con spogliatoio', nameEn: 'S4P · 4m with changing room',
    descriptionIt: "La macchina da ospitalità. Spogliatoio interno con porta richiudibile: gli ospiti si cambiano dentro, la struttura si chiude tra un noleggio e l'altro. Il cuore del Wellness Corner per agriturismi e B&B.",
    descriptionEn: 'The hospitality machine. Interior changing room with lockable door: guests change inside, and it locks between rentals. The heart of the Wellness Corner for agriturismi and B&Bs.',
    supplierItems: [{ label: 'Sauna S4P spruce flat-pack', cost: 2230 }, { label: 'Harvia PC90 9kW electric', cost: 420 }],
    basePrice: 4490, capacity: 8, dimensions: '400×200×210 cm', sortOrder: 3,
    specsIt: 'Diametro: Ø2 m | Montata (LxPxA): 400×200×210 cm | Kit (LxPxA): 400×80×150 cm | Volume cabina: 8 m³ | Cabina sauna: 280 cm + spogliatoio | Peso: ~720 kg | Capienza: ~4 in cabina, 8 totale | Spessore legno: 40 mm | Larghezza panche: 49 cm | Riscaldamento: ~1 h',
    specsEn: 'Diameter: Ø2 m | Assembled (LxWxH): 400×200×210 cm | Flat-pack (LxWxH): 400×80×150 cm | Steam room volume: 8 m³ | Steam room: 280 cm + changing room | Weight: ~720 kg | Capacity: ~4 in steam room, 8 total | Wood thickness: 40 mm | Bench width: 49 cm | Heating time: ~1 h',
    images: img('s4p', 5),
    options: [...woodToggle(550), ...heaterMenu(990, 420, 1120), ...diameterChoice(), ...roofChoice(), ...frontWindows(), ...backWindows()],
  },
  {
    sku: 'SQR2V', slug: 'cube-vetro-panoramico', category: 'SAUNA', subcategory: '2m',
    nameIt: 'Cube · Vetro panoramico 2m', nameEn: 'Cube · Panoramic glass 2m',
    descriptionIt: "Il design che si dissolve nel paesaggio: cube nero con pareti in vetro panoramico davanti e dietro. Dentro, il legno caldo e la stufa a colonna; fuori, il tuo giardino che diventa parte della sauna. Per ville e giardini contemporanei.",
    descriptionEn: 'Design that dissolves into the landscape: a black cube with panoramic glass walls front and back. Warm wood and a column heater inside; outside, your garden becomes part of the sauna. For contemporary villas and gardens.',
    basePrice: 4990, capacity: 4, dimensions: '200×220×230 cm', sortOrder: 4,
    specsIt: 'Montata (LxPxA): 200×220×230 cm | Kit (LxPxA): 200×120×150 cm | Volume cabina: 6,7 m³ | Lunghezza cabina: 185 cm | Peso: ~640 kg | Capienza cabina: ~4 persone | Larghezza panche: 49 cm | Riscaldamento: ~1 h',
    specsEn: 'Assembled (LxWxH): 200×220×230 cm | Flat-pack (LxWxH): 200×120×150 cm | Steam room volume: 6.7 m³ | Steam room length: 185 cm | Weight: ~640 kg | Steam room capacity: ~4 persons | Bench width: 49 cm | Heating time: ~1 h',
    images: img('sqr2v', 5),
    options: [...woodToggle(500), ...heaterMenu(690, 270, 730), ...roofChoice()],
  },
  {
    sku: 'S5P', slug: 's5p-panorama', category: 'SAUNA', subcategory: '5m',
    nameIt: 'S5P · 5m Panorama', nameEn: 'S5P · 5m Panorama',
    descriptionIt: "L'ammiraglia. Cinque metri con salotto interno e finestra panoramica: la sauna che si guarda il tramonto. Prodotta su ordinazione.",
    descriptionEn: 'The flagship. Five metres with interior sitting room and panoramic window: the sauna that watches the sunset. Built to order.',
    supplierItems: [{ label: 'Sauna S5P spruce flat-pack', cost: 3790 }, { label: 'Harvia PC90 9kW electric', cost: 420 }],
    basePrice: 6490, capacity: 6, dimensions: '500×220×230 cm', sortOrder: 5,
    specsIt: 'Diametro: Ø2,2 m | Montata (LxPxA): 500×220×230 cm | Kit (LxPxA): 500×120×150 cm | Volume cabina: 8,2 m³ | Cabina sauna: 200 cm + salotto (letto 210×180 cm) | Peso: ~1500 kg | Capienza cabina: ~6 persone | Spessore legno: 40 mm | Larghezza panche: 49 cm | Riscaldamento: ~1 h',
    specsEn: 'Diameter: Ø2.2 m | Assembled (LxWxH): 500×220×230 cm | Flat-pack (LxWxH): 500×120×150 cm | Steam room volume: 8.2 m³ | Steam room: 200 cm + lounge (bed 210×180 cm) | Weight: ~1500 kg | Steam room capacity: ~6 persons | Wood thickness: 40 mm | Bench width: 49 cm | Heating time: ~1 h',
    images: img('s5p', 4),
    options: [...woodToggle(600), ...heaterMenu(990, 420, 1120), ...roofChoice(), ...frontWindows(), ...backWindows()],
  },

  // ---------- Hot tubs (3) ----------
  {
    sku: 'LT18', slug: 'lt18-thermowood', category: 'HOT_TUB', subcategory: 'legno',
    nameIt: 'LT18 · Thermowood Ø1.8m', nameEn: 'LT18 · Thermowood Ø1.8m',
    descriptionIt: 'La tinozza romantica in thermowood scuro, riscaldata dalla stufa a legna esterna da 27kW. Acqua a 38° in poche ore, anche a gennaio.',
    descriptionEn: 'The romantic tub in dark thermowood, heated by the 27kW external wood stove. Water at 38° in a few hours, even in January.',
    supplierItems: [{ label: 'Wooden tub Ø1.8 thermowood', cost: 950 }, { label: 'NA27 wood stove 27kW', cost: 530 }],
    basePrice: 2390, capacity: 7, dimensions: 'Ø180 cm', sortOrder: 0,
    specsIt: 'Diametro: Ø1,8 m | Capienza: 7–8 persone | Volume: 1.900 l | Peso: 250 kg | Altezza: 112 cm | Profondità: 98 cm | Sedute: 32 × 35 cm | Spessore legno: 41 mm | Stufa: esterna a legna 27 kW',
    specsEn: 'Diameter: Ø1.8 m | Capacity: 7–8 persons | Volume: 1,900 l | Weight: 250 kg | Height: 112 cm | Depth: 98 cm | Seats: 32 × 35 cm | Wood thickness: 41 mm | Stove: external wood-fired 27 kW',
    images: img('lt18', 3),
    options: [
      { group: 'tub-filter', code: 'no-filter', delta: 0, isDefault: true },
      { group: 'tub-filter', code: 'filter-set', delta: 390, supplier: 280 },
      { group: 'tub-cover', code: 'no-cover', delta: 0, isDefault: true },
      { group: 'tub-cover', code: 'wooden-lid', delta: 270 },
      ...stairsChoice(),
    ],
  },
  {
    sku: 'TP8', slug: 'tp8-ottagonale', category: 'HOT_TUB', subcategory: 'vetroresina',
    nameIt: 'TP8 · Ottagonale 1.8×1.8m', nameEn: 'TP8 · Octagonal 1.8×1.8m',
    descriptionIt: "La scelta giusta per agriturismi e famiglie: interno in vetroresina facile da pulire, sedute stampate, quattro poggiatesta. Stufa a legna esterna in acciaio inox da 30 kW inclusa nel prezzo. Pronta per l'inverno.",
    descriptionEn: 'The right answer for agriturismi and families: easy-clean fiberglass interior, moulded seats, four headrests. 30 kW stainless steel wood-fired external stove included in the price. Winter-proof.',
    supplierItems: [{ label: 'TP8 octagonal fiberglass', cost: 950 }, { label: 'NN inox external stove', cost: 650 }],
    basePrice: 2790, capacity: 6, dimensions: '180×180 cm', sortOrder: 1,
    videoUrl: '/videos/products/tp8.mp4',
    specsIt: 'Dimensioni: 180×180 cm | Capienza: 6 persone | Volume: 1.200 l | Peso: 180 kg | Altezza: 110 cm | Profondità: 96 cm | Interno: vetroresina 5 mm | Esterno: thermowood 18 mm | Stufa: esterna inox',
    specsEn: 'Size: 180×180 cm | Capacity: 6 persons | Volume: 1,200 l | Weight: 180 kg | Height: 110 cm | Depth: 96 cm | Interior: 5 mm fiberglass | Exterior: 18 mm thermowood | Stove: external stainless',
    images: img('tp8', 3),
    options: [
      { group: 'tub-filter', code: 'no-filter', delta: 0, isDefault: true },
      { group: 'tub-filter', code: 'filter-set', delta: 390, supplier: 280 },
      { group: 'tub-cover', code: 'no-cover', delta: 0, isDefault: true },
      { group: 'tub-cover', code: 'insulated-cover', delta: 340, supplier: 240 },
      ...linerColors(), ...jacuzziChoice(), ...ledChoice(), ...stairsChoice(),
    ],
  },
  {
    sku: 'TP2V', slug: 'tp2v-rotonda', category: 'HOT_TUB', subcategory: 'vetroresina',
    nameIt: 'TP2V · Rotonda Ø2m stufa integrata', nameEn: 'TP2V · Round Ø2m integrated stove',
    descriptionIt: 'Un prezzo, niente da aggiungere: stufa inox integrata e canna fumaria incluse. La risposta per chi dice "dammi quella completa".',
    descriptionEn: 'One price, nothing to add: built-in stainless stove and chimney included. For those who say "just give me the complete one".',
    supplierItems: [{ label: 'TP2V integrated stove, all-in', cost: 1490 }],
    basePrice: 2490, capacity: 6, dimensions: 'Ø200 cm', sortOrder: 2,
    specsIt: 'Diametro: Ø2 m | Capienza: 4–6 persone | Volume: 1.100 l | Peso: 265 kg | Altezza: 110 cm | Profondità: 83 cm | Stufa: integrata inox AISI304 30 kW | Interno: vetroresina 5 mm | Esterno: thermowood 18 mm | Canna fumaria: inclusa',
    specsEn: 'Diameter: Ø2 m | Capacity: 4–6 persons | Volume: 1,100 l | Weight: 265 kg | Height: 110 cm | Depth: 83 cm | Stove: integrated stainless AISI304 30 kW | Interior: 5 mm fiberglass | Exterior: 18 mm thermowood | Chimney: included',
    images: img('tp2v', 2),
    options: [...linerColors(), ...jacuzziChoice(), ...ledChoice(), ...stairsChoice()],
  },

  // ---------- Ice baths (2) ----------
  {
    sku: 'TP10', slug: 'tp10-fiberglass', category: 'ICE_BATH', subcategory: null,
    nameIt: 'TP10 · Fiberglass Ø1m', nameEn: 'TP10 · Fiberglass Ø1m',
    descriptionIt: "Il tuffo che rigenera, con copertura isolata inclusa. D'estate all'ombra, d'inverno sotto le stelle. Aggiungi il chiller e l'acqua resta sempre a 4°.",
    descriptionEn: 'The regenerating plunge, insulated cover included. In summer shade or under winter stars. Add the chiller and the water stays at 4° all year.',
    supplierItems: [{ label: 'TP10 fiberglass tub', cost: 590 }, { label: 'Insulated cover', cost: 130 }],
    basePrice: 1190, capacity: 1, dimensions: 'Ø106 cm', sortOrder: 0,
    specsIt: 'Diametro: Ø106 cm | Capienza: 1 persona | Volume: 400 l | Peso: 65 kg | Altezza: 103 cm | Profondità: 93,5 cm | Esterno: thermowood | Copertura isolata: inclusa',
    specsEn: 'Diameter: Ø106 cm | Capacity: 1 person | Volume: 400 l | Weight: 65 kg | Height: 103 cm | Depth: 93.5 cm | Exterior: thermowood | Insulated cover: included',
    images: img('tp10', 4),
    options: [
      ...linerColors(),
      { group: 'chiller', code: 'no-chiller', delta: 0, isDefault: true },
      { group: 'chiller', code: 'chiller-pro', delta: 2490, supplier: 1600 },
      { group: 'stairs', code: 'no-stairs', delta: 0, isDefault: true },
      { group: 'stairs', code: 'stairs-classic', delta: 90 },
    ],
  },
  {
    sku: 'CP2', slug: 'cp2-vasca-ghiaccio-ovale', category: 'ICE_BATH', subcategory: null,
    nameIt: 'CP2 · Vasca ghiaccio ovale 2 posti', nameEn: 'CP2 · Oval cold plunge for 2',
    descriptionIt: "Il bagno di ghiaccio da condividere: vasca ovale in vetroresina da 800 litri per due persone, rivestita in thermowood 18 mm, con due poggiatesta e scarico. Con il chiller opzionale l'acqua resta a 3° tutto l'anno — o si scalda fino a 42°.",
    descriptionEn: 'The cold plunge to share: 800-litre oval fiberglass tub for two, clad in 18 mm thermowood, with two headrests and a drain. Add the optional chiller and the water stays at 3° all year round — or warms up to 42°.',
    supplierItems: [],
    basePrice: 1740, capacity: 2, dimensions: '185×95 cm', sortOrder: 1,
    specsIt: 'Dimensioni: 185×95 cm | Capienza: 2 persone | Altezza: 110 cm | Profondità: 96 cm | Volume: 800 l | Peso: 120 kg | Vasca: vetroresina | Esterno: thermowood 18 mm | Fondo: compensato marino 9 mm | Set base: 2 poggiatesta, scarico | Produzione: 5–6 settimane',
    specsEn: 'Size: 185×95 cm | Capacity: 2 persons | Height: 110 cm | Depth: 96 cm | Volume: 800 l | Weight: 120 kg | Tub: fiberglass | Exterior: 18 mm thermowood | Flooring: 9 mm waterproof plywood | Basic set: 2 headrests, drain | Production time: 5–6 weeks',
    images: img('cp2', 4),
    options: [
      ...linerColors(),
      { group: 'chiller', code: 'no-chiller', delta: 0, isDefault: true },
      { group: 'chiller', code: 'chiller-pro', delta: 2490, supplier: 1600 },
      { group: 'tub-cover', code: 'no-cover', delta: 0, isDefault: true },
      { group: 'tub-cover', code: 'insulated-cover', delta: 360 },
      { group: 'stairs', code: 'no-stairs', delta: 0, isDefault: true },
      { group: 'stairs', code: 'stairs-classic', delta: 90 },
      { group: 'stairs', code: 'stairs-lux', delta: 410 },
    ],
  },

  // ---------- Garden shower (universal upsell) ----------
  {
    sku: 'SHOWER', slug: 'doccia-giardino', category: 'ACCESSORY', subcategory: 'garden',
    nameIt: 'Doccia da giardino', nameEn: 'Garden shower',
    descriptionIt: 'Il risciacquo freddo che completa il rituale caldo-freddo. In abete o thermowood, si collega al tubo da giardino.',
    descriptionEn: 'The cold rinse that completes the hot-cold ritual. In spruce or thermowood, connects to a garden hose.',
    supplierItems: [{ label: 'Garden shower spruce', cost: 900 }],
    basePrice: 1390, capacity: null, dimensions: null, sortOrder: 0,
    images: img('shower', 3),
    options: [{ group: 'wood', code: 'spruce', delta: 0, isDefault: true }, { group: 'wood', code: 'thermowood', delta: 430, supplier: 310 }],
  },
];

const LINEUP_SKUS = LINEUP.map((p) => p.sku);

// ---------------- seeding ----------------

async function seedOptions() {
  await prisma.optionGroup.deleteMany({});
  const groupIds = new Map<string, string>();
  for (const g of GROUPS) {
    const rec = await prisma.optionGroup.create({ data: { ...g, displayType: DisplayType.RADIO } });
    groupIds.set(g.code, rec.id);
  }
  const optionIds = new Map<string, string>();
  for (const o of OPTIONS) {
    const rec = await prisma.option.create({
      data: {
        groupId: groupIds.get(o.group)!, code: o.code, nameIt: o.nameIt, nameEn: o.nameEn,
        description: (o as { description?: string }).description ?? null, sortOrder: o.sortOrder,
      } as never,
    });
    optionIds.set(`${o.group}:${o.code}`, rec.id);
  }
  return optionIds;
}

async function seedLineup(optionIds: Map<string, string>) {
  for (const p of LINEUP) {
    const data = {
      slug: p.slug, category: p.category, subcategory: p.subcategory,
      nameIt: p.nameIt, nameEn: p.nameEn,
      descriptionIt: p.descriptionIt, descriptionEn: p.descriptionEn,
      specsIt: p.specsIt ?? null, specsEn: p.specsEn ?? null,
      supplierItems: p.supplierItems ?? [],
      videoUrl: p.videoUrl ?? null,
      basePrice: p.basePrice, capacity: p.capacity, dimensions: p.dimensions,
      sortOrder: p.sortOrder, isPublished: true,
    };
    const product = await prisma.product.upsert({
      where: { sku: p.sku },
      update: data,
      create: { sku: p.sku, ...data },
    });
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    await prisma.productImage.createMany({
      data: p.images.map((url, i) => ({ productId: product.id, url, sortOrder: i })),
    });
    await prisma.productOption.createMany({
      data: p.options.map((o) => ({
        productId: product.id,
        optionId: optionIds.get(`${o.group}:${o.code}`)!,
        priceDelta: o.delta,
        supplierCost: o.supplier ?? null,
        isDefault: o.isDefault ?? false,
      })),
    });
    console.log(`✔ ${p.sku} — ${p.nameIt}`);
  }

  const removed = await prisma.product.deleteMany({
    where: { sku: { notIn: LINEUP_SKUS }, NOT: { sku: { startsWith: 'ACC-' } } },
  });
  if (removed.count) console.log(`✔ Removed ${removed.count} products not in the 2026/27 lineup`);
}

async function seedAccessories(items: Accessory[], subcategory: string, startSort: number) {
  let sort = startSort;
  for (const a of items) {
    const sku = `ACC-${a.id}`;
    const slug = `${a.id} ${a.nameIt}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const product = await prisma.product.upsert({
      where: { sku },
      update: {
        nameIt: a.nameIt, nameEn: a.nameEn, basePrice: a.price,
        descriptionIt: a.descIt, descriptionEn: a.descEn,
        specsIt: a.specsIt, specsEn: a.specsEn, sortOrder: sort, subcategory,
      },
      create: {
        sku, slug, category: Category.ACCESSORY, subcategory,
        nameIt: a.nameIt, nameEn: a.nameEn, basePrice: a.price,
        descriptionIt: a.descIt, descriptionEn: a.descEn,
        specsIt: a.specsIt, specsEn: a.specsEn, sortOrder: sort,
      },
    });
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    if (a.image) {
      await prisma.productImage.create({ data: { productId: product.id, url: a.image, alt: a.nameEn, sortOrder: 0 } });
    }
    sort++;
  }
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn('⚠ ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user.');
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({ where: { email }, update: { passwordHash }, create: { email, passwordHash, name: 'Admin' } });
  console.log(`✔ Admin user: ${email}`);
}

async function main() {
  const optionIds = await seedOptions();
  console.log('✔ Option groups (wood, heater menu, tub & ice options)');
  await seedLineup(optionIds);
  await seedAccessories(saunaAccessories, 'sauna', 10);
  await seedAccessories(hottubAccessories, 'hottub', 100);
  await seedAccessories(icebathAccessories, 'icebath', 200);
  console.log(`✔ Accessories: ${saunaAccessories.length + hottubAccessories.length + icebathAccessories.length}`);
  await seedAdmin();
  console.log('✔ Lineup 2026/27: 6 saunas · 3 hot tubs · 2 ice baths · 1 garden shower');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
