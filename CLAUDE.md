# Sauna Amore — working notes for Claude

## Critical routine

- **THE ADMIN (/admin) IS THE SOURCE OF TRUTH for the live catalog.** The seed is
  bootstrap/disaster-recovery only: it refuses to run against a non-empty database
  (override: `npm run db:seed -- --force`, which RESETS seed-managed content and
  resurrects admin deletions — never suggest it casually).
- Catalog changes (prices, options, products, texts) are made through the admin UI,
  not by editing seed.ts + reseeding. If Claude needs to change catalog data in bulk,
  write a one-off script against the DB (or walk Matt through the admin), and update
  seed.ts too only so fresh environments match.
- **If a forced/bootstrap seed ever runs, follow it with `npm run db:translate`**
  (`npm run db:seed -- --force && npm run db:translate`).
- Admin edits need no translate run — server actions auto-translate on save via DeepL.
- After schema changes, `npm run db:push` comes first (before or immediately after
  `git push`, never forgotten — new code + old DB = site-wide 500s).
- Env var changes in Vercel require a redeploy to take effect.

## Conventions

- Git identity: everything under GitHub user **Mattio16 / mkirk1066@gmail.com** —
  never matthew@tesseract.fi or TessieBois.
- Pricing: lineup PDF prices verbatim where present; otherwise Baltresto public
  price +~30%, rounded to tens. Margin display in admin is ex-VAT (÷1.22).
- Backend is single-language English (same value written to both nameIt/nameEn
  columns); frontend languages come from the stored `translations` Json + the
  hand-written dictionaries in `lib/i18n.ts` (5 languages: it/en/nl/de/ru).
- Seed (`prisma/seed.ts`) is the catalog source of truth; it upserts (admin-created
  groups/options survive), but lineup products' texts/prices/option assignments
  reset to the seed on every run.
- Verification loop (Prisma engines are blocked in the sandbox): rsync repo to
  /tmp/sauna-amore, then `npx tsc --noEmit` and `npx next build` there.
