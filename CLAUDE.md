# Sauna Amore — working notes for Claude

## Critical routine

- **Every `npm run db:seed` must be followed by `npm run db:translate`.** The seed
  writes English directly to the DB and (since July 2026) clears stale translations
  when English text changed — the translate run is what refills them. When telling
  Matt to reseed, ALWAYS give both commands together:
  `npm run db:seed && npm run db:translate`
- Admin edits need no translate run — server actions auto-translate on save via DeepL.
- After schema changes, `npm run db:push` comes first.
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
