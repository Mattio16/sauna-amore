/**
 * Backfills DeepL translations for the whole catalog (products + options).
 * Run after seeding or after a bulk edit:  npm run db:translate
 * Add --force to re-translate records that already have translations.
 * Requires DEEPL_API_KEY in .env.
 */
import { PrismaClient } from '@prisma/client';
import { buildTranslations, hasDeeplKey } from '../lib/translate';

const prisma = new PrismaClient();
const force = process.argv.includes('--force');

async function main() {
  if (!hasDeeplKey()) {
    console.error('✗ DEEPL_API_KEY is not set in .env — nothing to do.');
    process.exit(1);
  }

  const products = await prisma.product.findMany();
  let done = 0;
  for (const p of products) {
    const existing = (p as unknown as { translations?: unknown }).translations;
    if (existing && !force) continue;
    const translations = await buildTranslations({
      name: p.nameEn,
      description: p.descriptionEn,
      specs: p.specsEn,
    });
    if (translations) {
      await prisma.product.update({ where: { id: p.id }, data: { translations } as never });
      done++;
      console.log(`✔ product ${p.sku}`);
    }
  }

  const options = await prisma.option.findMany();
  let doneOpts = 0;
  for (const o of options) {
    const rec = o as unknown as { translations?: unknown; description?: string | null };
    if (rec.translations && !force) continue;
    const translations = await buildTranslations({ name: o.nameEn, description: rec.description });
    if (translations) {
      await prisma.option.update({ where: { id: o.id }, data: { translations } as never });
      doneOpts++;
      console.log(`✔ option ${o.code}`);
    }
  }

  console.log(`\nTranslated ${done} products and ${doneOpts} options into IT/NL/DE/RU.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
