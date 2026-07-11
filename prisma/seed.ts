/**
 * Sauna Amore — seed script.
 * Builds the database from the existing hard-coded catalog in lib/products.ts:
 *  - Merges Spruce (…E) / Thermowood (…T) variant pairs into ONE product
 *    with a "wood" option (per-product price delta).
 *  - Adds an "assembly" option (flat-pack default / assembled) where prices exist.
 *  - Attaches heater option groups to saunas and hot tubs.
 *  - Seeds accessories as simple products.
 *  - Creates the admin user from ADMIN_EMAIL / ADMIN_PASSWORD env vars.
 *
 * Idempotent: safe to re-run (upserts + replaces images/options per product).
 * Run: npx prisma db seed
 */
import { PrismaClient, Category, DisplayType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  saunas,
  hottubs,
  icebaths,
  saunaHeaters,
  hottubHeaters,
  saunaAccessories,
  hottubAccessories,
  icebathAccessories,
  type Product as CatalogProduct,
  type Heater,
  type Accessory,
} from '../lib/products';

const prisma = new PrismaClient();

// ---------- helpers ----------

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[×ø]/g, (c) => (c === '×' ? 'x' : 'o'))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** "S16E 1.6m Spruce" -> "S16 1.6m" (drop variant id + wood word) */
function mergedName(name: string, variantId: string, baseSku: string): string {
  return name
    .replace(variantId, baseSku)
    .replace(/\b(Spruce|Thermowood|Thermo|flat-pack)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

type MergedProduct = {
  sku: string;
  category: Category;
  subcategory?: string;
  nameIt: string;
  nameEn: string;
  basePrice: number;
  capacity?: number;
  dimensions?: string;
  images: string[];
  woodDelta?: number; // thermowood surcharge; undefined = no wood option
  assemblyDelta?: number; // assembled surcharge; undefined = no assembly option
  sortOrder: number;
};

/**
 * Merge …E/…T variant pairs. Products without a matching pair (fiberglass
 * tubs, ice baths) pass through as single products.
 */
function mergeVariants(items: CatalogProduct[], category: Category): MergedProduct[] {
  const byBase = new Map<string, CatalogProduct[]>();
  for (const p of items) {
    const base = /[ET]$/.test(p.id) ? p.id.slice(0, -1) : p.id;
    byBase.set(base, [...(byBase.get(base) ?? []), p]);
  }

  const out: MergedProduct[] = [];
  let sort = 0;
  for (const [baseSku, group] of Array.from(byBase.entries())) {
    const spruce = group.find((p) => p.id.endsWith('E')) ?? group[0];
    const thermo = group.length > 1 ? group.find((p) => p.id.endsWith('T')) : undefined;

    const base = spruce.flatpack ?? spruce.price ?? 0;
    const images = Array.from(
      new Set(group.flatMap((p) => p.images ?? (p.image ? [p.image] : []))),
    );

    out.push({
      sku: baseSku,
      category,
      subcategory: spruce.category,
      nameIt: thermo ? mergedName(spruce.nameIt, spruce.id, baseSku) : spruce.nameIt,
      nameEn: thermo ? mergedName(spruce.nameEn, spruce.id, baseSku) : spruce.nameEn,
      basePrice: base,
      capacity: spruce.persons,
      dimensions: spruce.dims,
      images,
      woodDelta: thermo ? (thermo.flatpack ?? thermo.price ?? 0) - base : undefined,
      assemblyDelta:
        spruce.assembled && spruce.flatpack ? spruce.assembled - spruce.flatpack : undefined,
      sortOrder: sort++,
    });
  }
  return out;
}

// ---------- option groups ----------

async function seedOptionGroups() {
  const groups = [
    { code: 'wood', nameIt: 'Tipo di Legno', nameEn: 'Wood Type', sortOrder: 0 },
    { code: 'assembly', nameIt: 'Montaggio', nameEn: 'Assembly', sortOrder: 1 },
    { code: 'sauna-heater', nameIt: 'Stufa', nameEn: 'Heater', sortOrder: 2 },
    { code: 'hottub-heater', nameIt: 'Stufa', nameEn: 'Heater', sortOrder: 2 },
  ];
  for (const g of groups) {
    await prisma.optionGroup.upsert({
      where: { code: g.code },
      update: { nameIt: g.nameIt, nameEn: g.nameEn, sortOrder: g.sortOrder },
      create: { ...g, displayType: DisplayType.RADIO },
    });
  }

  const options: { group: string; code: string; nameIt: string; nameEn: string; sortOrder: number }[] = [
    { group: 'wood', code: 'spruce', nameIt: 'Abete (Spruce)', nameEn: 'Spruce', sortOrder: 0 },
    { group: 'wood', code: 'thermowood', nameIt: 'Thermowood', nameEn: 'Thermowood', sortOrder: 1 },
    { group: 'assembly', code: 'flatpack', nameIt: 'Kit da montare (Flat-pack)', nameEn: 'Flat-pack kit', sortOrder: 0 },
    { group: 'assembly', code: 'assembled', nameIt: 'Montata', nameEn: 'Assembled', sortOrder: 1 },
    { group: 'sauna-heater', code: 'none', nameIt: 'Senza stufa (predisposizione)', nameEn: 'No heater (prepared)', sortOrder: 0 },
    { group: 'hottub-heater', code: 'none', nameIt: 'Senza stufa (predisposizione)', nameEn: 'No heater (prepared)', sortOrder: 0 },
    ...saunaHeaters.map((h: Heater, i: number) => ({
      group: 'sauna-heater', code: h.id.toLowerCase(), nameIt: h.nameIt, nameEn: h.nameEn, sortOrder: i + 1,
    })),
    ...hottubHeaters.map((h: Heater, i: number) => ({
      group: 'hottub-heater', code: h.id.toLowerCase(), nameIt: h.nameIt, nameEn: h.nameEn, sortOrder: i + 1,
    })),
  ];

  const groupIds = new Map<string, string>();
  for (const g of await prisma.optionGroup.findMany()) groupIds.set(g.code, g.id);

  const optionIds = new Map<string, string>(); // "group:code" -> id
  for (const o of options) {
    const groupId = groupIds.get(o.group)!;
    const rec = await prisma.option.upsert({
      where: { groupId_code: { groupId, code: o.code } },
      update: { nameIt: o.nameIt, nameEn: o.nameEn, sortOrder: o.sortOrder },
      create: { groupId, code: o.code, nameIt: o.nameIt, nameEn: o.nameEn, sortOrder: o.sortOrder },
    });
    optionIds.set(`${o.group}:${o.code}`, rec.id);
  }
  return optionIds;
}

// ---------- products ----------

async function upsertProduct(
  p: MergedProduct,
  optionIds: Map<string, string>,
  heaterGroup: 'sauna-heater' | 'hottub-heater' | null,
  heaters: Heater[],
) {
  const slug = slugify(`${p.sku} ${p.nameIt}`);
  const product = await prisma.product.upsert({
    where: { sku: p.sku },
    update: {
      nameIt: p.nameIt, nameEn: p.nameEn, basePrice: p.basePrice,
      capacity: p.capacity, dimensions: p.dimensions,
      category: p.category, subcategory: p.subcategory, sortOrder: p.sortOrder,
    },
    create: {
      sku: p.sku, slug, category: p.category, subcategory: p.subcategory,
      nameIt: p.nameIt, nameEn: p.nameEn, basePrice: p.basePrice,
      capacity: p.capacity, dimensions: p.dimensions, sortOrder: p.sortOrder,
    },
  });

  // replace images
  await prisma.productImage.deleteMany({ where: { productId: product.id } });
  await prisma.productImage.createMany({
    data: p.images.map((url, i) => ({ productId: product.id, url, sortOrder: i })),
  });

  // replace options
  await prisma.productOption.deleteMany({ where: { productId: product.id } });
  const rows: { productId: string; optionId: string; priceDelta: number; isDefault: boolean }[] = [];

  if (p.woodDelta !== undefined) {
    rows.push(
      { productId: product.id, optionId: optionIds.get('wood:spruce')!, priceDelta: 0, isDefault: true },
      { productId: product.id, optionId: optionIds.get('wood:thermowood')!, priceDelta: p.woodDelta, isDefault: false },
    );
  }
  if (p.assemblyDelta !== undefined) {
    rows.push(
      { productId: product.id, optionId: optionIds.get('assembly:flatpack')!, priceDelta: 0, isDefault: true },
      { productId: product.id, optionId: optionIds.get('assembly:assembled')!, priceDelta: p.assemblyDelta, isDefault: false },
    );
  }
  if (heaterGroup) {
    rows.push({
      productId: product.id, optionId: optionIds.get(`${heaterGroup}:none`)!, priceDelta: 0, isDefault: true,
    });
    for (const h of heaters) {
      rows.push({
        productId: product.id, optionId: optionIds.get(`${heaterGroup}:${h.id.toLowerCase()}`)!,
        priceDelta: h.price, isDefault: false,
      });
    }
  }
  if (rows.length) await prisma.productOption.createMany({ data: rows });
}

async function seedAccessories(items: Accessory[], subcategory: string, startSort: number) {
  let sort = startSort;
  for (const a of items) {
    const sku = `ACC-${a.id}`;
    const slug = slugify(`${a.id} ${a.nameIt}`);
    const product = await prisma.product.upsert({
      where: { sku },
      update: {
        nameIt: a.nameIt, nameEn: a.nameEn, basePrice: a.price,
        descriptionIt: a.descIt, descriptionEn: a.descEn,
        specsIt: a.specsIt, specsEn: a.specsEn, sortOrder: sort,
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
      await prisma.productImage.create({
        data: { productId: product.id, url: a.image, alt: a.nameEn, sortOrder: 0 },
      });
    }
    sort++;
  }
}

// ---------- admin user ----------

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn('⚠ ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user.');
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: 'Admin' },
  });
  console.log(`✔ Admin user: ${email}`);
}

// ---------- main ----------

async function main() {
  const optionIds = await seedOptionGroups();
  console.log('✔ Option groups & options');

  const mergedSaunas = mergeVariants(saunas, Category.SAUNA);
  for (const p of mergedSaunas) await upsertProduct(p, optionIds, 'sauna-heater', saunaHeaters);
  console.log(`✔ Saunas: ${saunas.length} variants → ${mergedSaunas.length} products`);

  const mergedTubs = mergeVariants(hottubs, Category.HOT_TUB);
  for (const p of mergedTubs) await upsertProduct(p, optionIds, 'hottub-heater', hottubHeaters);
  console.log(`✔ Hot tubs: ${hottubs.length} variants → ${mergedTubs.length} products`);

  const mergedIce = mergeVariants(icebaths, Category.ICE_BATH);
  for (const p of mergedIce) await upsertProduct(p, optionIds, null, []);
  console.log(`✔ Ice baths: ${mergedIce.length} products`);

  await seedAccessories(saunaAccessories, 'sauna', 0);
  await seedAccessories(hottubAccessories, 'hottub', 100);
  await seedAccessories(icebathAccessories, 'icebath', 200);
  console.log(`✔ Accessories: ${saunaAccessories.length + hottubAccessories.length + icebathAccessories.length}`);

  await seedAdmin();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
