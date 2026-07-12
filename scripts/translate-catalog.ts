/**
 * Backfills DeepL translations for the whole catalog (products + options).
 * Batches all texts into a few large API calls per language to stay well
 * clear of DeepL free-tier rate limits, and re-processes any record that is
 * missing one or more target languages.
 *
 * Run:  npm run db:translate          (fills whatever is missing)
 *       npm run db:translate --force  (re-translates everything)
 */
import { PrismaClient } from '@prisma/client';
import { TARGET_LANGS, type TransMap } from '../lib/translate';

const prisma = new PrismaClient();
const force = process.argv.includes('--force');
const KEY = process.env.DEEPL_API_KEY;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function deeplBatch(texts: string[], targetLang: string): Promise<string[]> {
  const host = KEY!.endsWith(':fx') ? 'https://api-free.deepl.com' : 'https://api.deepl.com';
  const out: string[] = [];
  const CHUNK = 40; // DeepL max 50 texts/request
  for (let i = 0; i < texts.length; i += CHUNK) {
    const chunk = texts.slice(i, i + CHUNK);
    for (let attempt = 1; ; attempt++) {
      const res = await fetch(`${host}/v2/translate`, {
        method: 'POST',
        headers: { Authorization: `DeepL-Auth-Key ${KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: chunk, source_lang: 'EN', target_lang: targetLang }),
      });
      if (res.status === 429 || res.status === 529) {
        if (attempt > 5) throw new Error(`DeepL rate limit persisted (${targetLang})`);
        const wait = attempt * 3000;
        console.log(`  … rate limited, waiting ${wait / 1000}s`);
        await sleep(wait);
        continue;
      }
      if (!res.ok) throw new Error(`DeepL ${targetLang} failed: ${res.status} ${await res.text()}`);
      const json = (await res.json()) as { translations: { text: string }[] };
      out.push(...json.translations.map((t) => t.text));
      break;
    }
    await sleep(600); // gentle pacing between chunks
  }
  return out;
}

type Job = {
  kind: 'product' | 'option';
  id: string;
  label: string;
  fields: { name?: string; description?: string; specs?: string };
  existing: TransMap;
};

function missingLangs(existing: TransMap, fieldKeys: string[]): string[] {
  return TARGET_LANGS.filter(({ code }) => {
    const e = existing?.[code];
    if (!e) return true;
    return fieldKeys.some((k) => !(e as Record<string, string | undefined>)[k]);
  }).map((l) => l.code);
}

async function main() {
  if (!KEY) {
    console.error('✗ DEEPL_API_KEY is not set in .env — nothing to do.');
    process.exit(1);
  }

  const jobs: Job[] = [];
  for (const p of await prisma.product.findMany()) {
    const fields: Job['fields'] = {};
    if (p.nameEn?.trim()) fields.name = p.nameEn;
    if (p.descriptionEn?.trim()) fields.description = p.descriptionEn!;
    if (p.specsEn?.trim()) fields.specs = p.specsEn!;
    if (Object.keys(fields).length === 0) continue;
    const existing = ((p as unknown as { translations?: TransMap }).translations ?? {}) as TransMap;
    jobs.push({ kind: 'product', id: p.id, label: p.sku, fields, existing: force ? {} : existing });
  }
  for (const o of await prisma.option.findMany()) {
    const rec = o as unknown as { translations?: TransMap; description?: string | null };
    const fields: Job['fields'] = {};
    if (o.nameEn?.trim()) fields.name = o.nameEn;
    if (rec.description?.trim()) fields.description = rec.description;
    if (Object.keys(fields).length === 0) continue;
    jobs.push({ kind: 'option', id: o.id, label: o.code, fields, existing: force ? {} : (rec.translations ?? {}) });
  }

  // Work out what actually needs translating.
  const pending = jobs.filter((j) => missingLangs(j.existing, Object.keys(j.fields)).length > 0);
  if (pending.length === 0) {
    console.log('✔ Everything already translated. Use --force to re-translate.');
    return;
  }
  console.log(`Translating ${pending.length} records into ${TARGET_LANGS.length} languages…`);

  // Flatten: one big text list, translated per language in large batches.
  const flat: { job: Job; key: 'name' | 'description' | 'specs'; text: string }[] = [];
  for (const job of pending) {
    for (const key of ['name', 'description', 'specs'] as const) {
      if (job.fields[key]) flat.push({ job, key, text: job.fields[key]! });
    }
  }

  const results = new Map<Job, TransMap>();
  for (const { code, deepl } of TARGET_LANGS) {
    console.log(`→ ${code.toUpperCase()} (${flat.length} texts)`);
    const translated = await deeplBatch(flat.map((f) => f.text), deepl);
    flat.forEach((f, i) => {
      const m = results.get(f.job) ?? {};
      const entry = (m[code] = m[code] ?? {});
      (entry as Record<string, string>)[f.key] = translated[i];
      results.set(f.job, m);
    });
  }

  let products = 0;
  let options = 0;
  for (const [job, fresh] of Array.from(results.entries())) {
    const merged: TransMap = { ...job.existing };
    for (const { code } of TARGET_LANGS) {
      merged[code] = { ...(job.existing[code] ?? {}), ...(fresh[code] ?? {}) };
    }
    if (job.kind === 'product') {
      await prisma.product.update({ where: { id: job.id }, data: { translations: merged } as never });
      products++;
    } else {
      await prisma.option.update({ where: { id: job.id }, data: { translations: merged } as never });
      options++;
    }
    console.log(`✔ ${job.kind} ${job.label}`);
  }
  console.log(`\nDone: ${products} products, ${options} options → IT/NL/DE/RU.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
