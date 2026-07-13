'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { Category, OrderStatus } from '@prisma/client';
import { prisma } from './db';
import { buildTranslations } from './translate';
import { authOptions } from './auth';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');
}

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? '').trim();
}
function num(fd: FormData, key: string): number {
  const n = Number(fd.get(key));
  return Number.isFinite(n) ? Math.round(n) : 0;
}

// ---------- products ----------

export async function saveProduct(fd: FormData) {
  await requireAdmin();
  const id = str(fd, 'id');
  // Single-language backend: English is the source of truth; the same value is
  // written to both columns (frontend translation layer comes later).
  const name = str(fd, 'name');
  const description = str(fd, 'description') || null;
  const specs = str(fd, 'specs') || null;
  // Supplier breakdown: one item per line, "Label: cost".
  const supplierItems = str(fd, 'supplierItems')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.lastIndexOf(':');
      const label = (i === -1 ? l : l.slice(0, i)).trim();
      const cost = i === -1 ? 0 : Number(l.slice(i + 1).replace(/[^\d]/g, '')) || 0;
      return { label, cost };
    });
  // Manual total override: stored only when it differs from the breakdown sum.
  const lineSum = supplierItems.reduce((s, i) => s + (Number(i.cost) || 0), 0);
  const supplierTotalRaw = num(fd, 'supplierTotal');
  const data = {
    supplierItems,
    supplierTotal: supplierTotalRaw && supplierTotalRaw !== lineSum ? supplierTotalRaw : null,
    videoUrl: str(fd, 'videoUrl') || null,
    sku: str(fd, 'sku').toUpperCase(),
    nameIt: name,
    nameEn: name,
    category: str(fd, 'category') as Category,
    subcategory: str(fd, 'subcategory') || null,
    basePrice: num(fd, 'basePrice'),
    capacity: num(fd, 'capacity') || null,
    dimensions: str(fd, 'dimensions') || null,
    descriptionIt: description,
    descriptionEn: description,
    specsIt: specs,
    specsEn: specs,
    sortOrder: num(fd, 'sortOrder'),
    isPublished: fd.get('isPublished') === 'on',
  };
  if (!data.sku || !data.nameIt || !data.basePrice) throw new Error('SKU, name and price are required');

  let productId = id;
  if (id) {
    await prisma.product.update({ where: { id }, data: data as never });
  } else {
    const slug = `${data.sku} ${data.nameIt}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const created = await prisma.product.create({ data: { ...data, slug } as never });
    productId = created.id;
  }
  // Auto-translate product content (no-op without DEEPL_API_KEY).
  const translations = await buildTranslations({ name, description, specs });
  if (translations) {
    await prisma.product.update({ where: { id: productId }, data: { translations } as never });
  }

  revalidatePath('/admin/products');
  redirect(`/admin/products/${productId}?saved=1`);
}

export async function deleteProduct(fd: FormData) {
  await requireAdmin();
  await prisma.product.delete({ where: { id: str(fd, 'id') } });
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function togglePublish(fd: FormData) {
  await requireAdmin();
  const id = str(fd, 'id');
  const current = await prisma.product.findUniqueOrThrow({ where: { id }, select: { isPublished: true } });
  await prisma.product.update({ where: { id }, data: { isPublished: !current.isPublished } });
  revalidatePath('/admin/products');
}

// ---------- images ----------

export async function addImageUrl(fd: FormData) {
  await requireAdmin();
  const productId = str(fd, 'productId');
  const url = str(fd, 'url');
  if (!url.startsWith('http')) throw new Error('Invalid URL');
  const count = await prisma.productImage.count({ where: { productId } });
  await prisma.productImage.create({ data: { productId, url, sortOrder: count } });
  revalidatePath(`/admin/products/${productId}`);
}

export async function deleteImage(fd: FormData) {
  await requireAdmin();
  const image = await prisma.productImage.delete({ where: { id: str(fd, 'id') } });
  revalidatePath(`/admin/products/${image.productId}`);
}

export async function moveImage(fd: FormData) {
  await requireAdmin();
  const id = str(fd, 'id');
  const dir = str(fd, 'dir') === 'up' ? -1 : 1;
  const img = await prisma.productImage.findUniqueOrThrow({ where: { id } });
  const siblings = await prisma.productImage.findMany({
    where: { productId: img.productId },
    orderBy: { sortOrder: 'asc' },
  });
  const idx = siblings.findIndex((s) => s.id === id);
  const swapWith = siblings[idx + dir];
  if (swapWith) {
    await prisma.$transaction([
      prisma.productImage.update({ where: { id }, data: { sortOrder: swapWith.sortOrder } }),
      prisma.productImage.update({ where: { id: swapWith.id }, data: { sortOrder: img.sortOrder } }),
    ]);
  }
  revalidatePath(`/admin/products/${img.productId}`);
}

// ---------- product options ----------

export async function setProductOption(fd: FormData) {
  await requireAdmin();
  const productId = str(fd, 'productId');
  const optionId = str(fd, 'optionId');
  const enabled = fd.get('enabled') === 'on';
  const priceDelta = num(fd, 'priceDelta');
  const isDefault = fd.get('isDefault') === 'on';

  // Inline rename + description (applies to this option everywhere it is used).
  const name = str(fd, 'name');
  if (name) {
    const description = str(fd, 'description') || null;
    const translations = await buildTranslations({ name, description });
    // imageUrl is managed by the upload/remove control, not by this form.
    await prisma.option.update({
      where: { id: optionId },
      data: { nameIt: name, nameEn: name, description, ...(translations ? { translations } : {}) } as never,
    });
  }

  const existing = await prisma.productOption.findUnique({
    where: { productId_optionId: { productId, optionId } },
  });

  if (!enabled) {
    if (existing) await prisma.productOption.delete({ where: { id: existing.id } });
  } else {
    if (isDefault) {
      // only one default per group for this product
      const option = await prisma.option.findUniqueOrThrow({ where: { id: optionId } });
      const groupOptionIds = (
        await prisma.option.findMany({ where: { groupId: option.groupId }, select: { id: true } })
      ).map((o) => o.id);
      await prisma.productOption.updateMany({
        where: { productId, optionId: { in: groupOptionIds } },
        data: { isDefault: false },
      });
    }
    const supplierCostRaw = str(fd, 'supplierCost');
    const supplierCost = supplierCostRaw === '' ? null : num(fd, 'supplierCost');
    await prisma.productOption.upsert({
      where: { productId_optionId: { productId, optionId } },
      update: { priceDelta, isDefault, supplierCost },
      create: { productId, optionId, priceDelta, isDefault, supplierCost },
    } as never);
  }
  revalidatePath(`/admin/products/${productId}`);
}

/** Create a new option inside a group and enable it for the given product. */
export async function createOptionForProduct(fd: FormData) {
  await requireAdmin();
  const productId = str(fd, 'productId');
  const groupId = str(fd, 'groupId');
  const name = str(fd, 'name');
  const priceDelta = num(fd, 'priceDelta');
  if (!name) throw new Error('Name required');

  let code = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'option';
  const clash = await prisma.option.findUnique({ where: { groupId_code: { groupId, code } } });
  if (clash) code = `${code}-${Date.now().toString(36)}`;

  const count = await prisma.option.count({ where: { groupId } });
  const description = str(fd, 'description') || null;
  const translations = await buildTranslations({ name, description });
  const option = await prisma.option.create({
    data: { groupId, code, nameIt: name, nameEn: name, description, sortOrder: count, ...(translations ? { translations } : {}) } as never,
  });
  const supplierCostRaw = str(fd, 'supplierCost');
  const supplierCost = supplierCostRaw === '' ? null : num(fd, 'supplierCost');
  await prisma.productOption.create({
    data: { productId, optionId: option.id, priceDelta, supplierCost, isDefault: false } as never,
  });
  revalidatePath(`/admin/products/${productId}`);
}

/** Move an option up/down within its group (affects display order everywhere). */
export async function moveOption(fd: FormData) {
  await requireAdmin();
  const productId = str(fd, 'productId');
  const optionId = str(fd, 'optionId');
  const dir = str(fd, 'dir') === 'up' ? -1 : 1;

  const option = await prisma.option.findUniqueOrThrow({ where: { id: optionId } });
  const siblings = await prisma.option.findMany({
    where: { groupId: option.groupId },
    orderBy: { sortOrder: 'asc' },
  });
  const idx = siblings.findIndex((o) => o.id === optionId);
  const target = idx + dir;
  if (target >= 0 && target < siblings.length) {
    [siblings[idx], siblings[target]] = [siblings[target], siblings[idx]];
    // Rewrite sequential sortOrders — also normalizes any duplicates.
    await prisma.$transaction(
      siblings.map((o, i) => prisma.option.update({ where: { id: o.id }, data: { sortOrder: i } })),
    );
  }
  revalidatePath(`/admin/products/${productId}`);
}

/** Delete an option globally (removes it from every product that offers it). */
export async function deleteOptionFromProduct(fd: FormData) {
  await requireAdmin();
  const productId = str(fd, 'productId');
  await prisma.option.delete({ where: { id: str(fd, 'optionId') } });
  revalidatePath(`/admin/products/${productId}`);
  revalidatePath('/admin/options');
}

// ---------- option groups ----------

export async function createOptionGroup(fd: FormData) {
  await requireAdmin();
  const productId = str(fd, 'productId');
  const name = str(fd, 'name');
  if (!name) throw new Error('Name required');
  let code = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'group';
  const clash = await prisma.optionGroup.findUnique({ where: { code } });
  if (clash) code = `${code}-${Date.now().toString(36)}`;
  const count = await prisma.optionGroup.count();
  const translations = await buildTranslations({ name });
  await prisma.optionGroup.create({
    data: { code, nameIt: name, nameEn: name, sortOrder: count, ...(translations ? { translations } : {}) } as never,
  });
  revalidatePath(`/admin/products/${productId}`);
}

/** Renames a group everywhere it appears (all products; translated via DeepL). */
export async function renameOptionGroup(fd: FormData) {
  await requireAdmin();
  const productId = str(fd, 'productId');
  const name = str(fd, 'name');
  if (!name) throw new Error('Name required');
  const translations = await buildTranslations({ name });
  await prisma.optionGroup.update({
    where: { id: str(fd, 'groupId') },
    data: { nameIt: name, nameEn: name, ...(translations ? { translations } : {}) } as never,
  });
  revalidatePath(`/admin/products/${productId}`);
}

/** Move a whole option group up/down (display order everywhere). */
export async function moveOptionGroup(fd: FormData) {
  await requireAdmin();
  const productId = str(fd, 'productId');
  const groupId = str(fd, 'groupId');
  const dir = str(fd, 'dir') === 'up' ? -1 : 1;

  const groups = await prisma.optionGroup.findMany({ orderBy: { sortOrder: 'asc' } });
  const idx = groups.findIndex((g) => g.id === groupId);
  const target = idx + dir;
  if (idx !== -1 && target >= 0 && target < groups.length) {
    [groups[idx], groups[target]] = [groups[target], groups[idx]];
    await prisma.$transaction(
      groups.map((g, i) => prisma.optionGroup.update({ where: { id: g.id }, data: { sortOrder: i } })),
    );
  }
  revalidatePath(`/admin/products/${productId}`);
}

/** Deletes a group AND all its options, from every product that uses them. */
export async function deleteOptionGroup(fd: FormData) {
  await requireAdmin();
  const productId = str(fd, 'productId');
  await prisma.optionGroup.delete({ where: { id: str(fd, 'groupId') } });
  revalidatePath(`/admin/products/${productId}`);
  revalidatePath('/admin/options');
}

// ---------- global options ----------

export async function saveOption(fd: FormData) {
  await requireAdmin();
  const id = str(fd, 'id');
  const name = str(fd, 'name');
  await prisma.option.update({
    where: { id },
    data: { nameIt: name, nameEn: name, sortOrder: num(fd, 'sortOrder') },
  });
  revalidatePath('/admin/options');
}

export async function createOption(fd: FormData) {
  await requireAdmin();
  const groupId = str(fd, 'groupId');
  const name = str(fd, 'name');
  const code = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (!code) throw new Error('Name required');
  const count = await prisma.option.count({ where: { groupId } });
  await prisma.option.create({
    data: { groupId, code, nameEn: name, nameIt: name, sortOrder: count },
  });
  revalidatePath('/admin/options');
}

export async function deleteOption(fd: FormData) {
  await requireAdmin();
  await prisma.option.delete({ where: { id: str(fd, 'id') } });
  revalidatePath('/admin/options');
}

// ---------- orders ----------

function timestamp(): string {
  return new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date());
}

/**
 * Updates status and appends the new note (if any) to the permanent,
 * timestamped note log. Committed notes are never edited or removed.
 */
export async function updateOrder(fd: FormData) {
  await requireAdmin();
  const id = str(fd, 'id');
  const newNote = str(fd, 'newNote');
  const current = await prisma.order.findUniqueOrThrow({ where: { id }, select: { adminNotes: true } });
  const adminNotes = newNote
    ? `${current.adminNotes ? current.adminNotes + '\n' : ''}[${timestamp()}] ${newNote}`
    : current.adminNotes;
  await prisma.order.update({
    where: { id },
    data: { status: str(fd, 'status') as OrderStatus, adminNotes },
  });
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${id}`);
}

export async function updateOrderCustomer(fd: FormData) {
  await requireAdmin();
  const id = str(fd, 'id');
  const email = str(fd, 'email');
  if (!str(fd, 'customerName') || !email.includes('@')) throw new Error('Name and valid email required');
  await prisma.order.update({
    where: { id },
    data: {
      customerName: str(fd, 'customerName'),
      email,
      phone: str(fd, 'phone') || null,
      address: str(fd, 'address') || null,
      city: str(fd, 'city') || null,
      postalCode: str(fd, 'postalCode') || null,
    },
  });
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${id}`);
}
