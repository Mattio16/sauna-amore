# Phase 1 Setup — Database, Seed & Auth

## What's in this folder

Copy everything into your `sauna-amore` repo root (VS Code → paste, keeping the folder structure):

```
package.json                          ← REPLACES yours (adds prisma, next-auth, bcryptjs, tsx + db scripts)
prisma/schema.prisma                  ← the database schema
prisma/seed.ts                        ← builds DB from your existing lib/products.ts
lib/db.ts                             ← shared Prisma client
lib/auth.ts                           ← admin login config (NextAuth credentials)
app/api/auth/[...nextauth]/route.ts   ← auth API route
middleware.ts                         ← protects /admin/* (repo root, next to package.json)
.env.example                          ← template for your .env file
```

Nothing existing is touched except `package.json`. The current site keeps working as-is.

## One-time setup (~10 min)

**1. Create the database** — [neon.tech](https://neon.tech) → sign up free → New Project (region: Frankfurt) → copy the **pooled** connection string.

**2. Create `.env`** in the repo root — copy `.env.example` to `.env`, paste the Neon URL as `DATABASE_URL`, set a real `ADMIN_PASSWORD`, and set `NEXTAUTH_SECRET` (run `openssl rand -base64 32` in the terminal, or use any long random string).

`.env` must be in `.gitignore` — check it's there before committing.

**3. Install & create tables:**

```bash
npm install
npm run db:push     # creates the tables in Neon
npm run db:seed     # loads your catalog: 25 products, options, heaters, 25 accessories, admin user
```

**4. Check it worked:**

```bash
npm run db:studio   # opens a browser UI showing your database tables
```

You should see 12 saunas, 11 hot tubs, 2 ice baths (Spruce/Thermowood merged into options), plus accessories.

**5. Vercel** — in the Vercel project → Settings → Environment Variables, add `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` (= your production URL, e.g. `https://sauna-amore.vercel.app`).

## What the seed does

- Merges each Spruce/Thermowood pair into ONE product with a wood-type option (e.g. S16: base €2,619, Thermowood +€610)
- Adds flat-pack/assembled as an option where both prices exist
- Attaches all sauna heaters (Harvia, HUUM, wood sets) and hot-tub stoves as options with their prices
- Seeds accessories with full IT/EN descriptions
- Creates your admin login from `ADMIN_EMAIL`/`ADMIN_PASSWORD`

Re-running `npm run db:seed` is safe — it updates rather than duplicates. Note: it resets catalog prices/images to the values in `lib/products.ts`, so once you start editing products in the admin (phase 2), don't re-seed.

## Next: Phase 2

Admin interface at `/admin` — product editor (price, images, options), order inbox. The auth in this phase already protects those routes.
