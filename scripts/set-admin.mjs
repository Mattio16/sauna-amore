/**
 * Updates the admin login from ADMIN_EMAIL / ADMIN_PASSWORD in .env —
 * touches nothing else (no catalog changes).
 *
 *   npm run admin:password
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.');
  process.exit(1);
}
if (password.length < 8) {
  console.error('Choose a password of at least 8 characters.');
  process.exit(1);
}

const prisma = new PrismaClient();
const passwordHash = await bcrypt.hash(password, 12);

// Replace whatever admin user(s) exist with this one.
await prisma.adminUser.deleteMany({ where: { email: { not: email } } });
await prisma.adminUser.upsert({
  where: { email },
  update: { passwordHash },
  create: { email, passwordHash, name: 'Admin' },
});

console.log(`✔ Admin login updated: ${email}`);
await prisma.$disconnect();
