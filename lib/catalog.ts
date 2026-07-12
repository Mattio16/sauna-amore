import { Category } from '@prisma/client';
import { prisma } from './db';
import type { CategoryProduct } from '@/components/site/CategoryView';

export async function getCategoryProducts(category: Category): Promise<CategoryProduct[]> {
  const products = await prisma.product.findMany({
    where: { category, isPublished: true },
    orderBy: { sortOrder: 'asc' },
    include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } },
  });
  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    nameIt: p.nameIt,
    nameEn: p.nameEn,
    basePrice: p.basePrice,
    capacity: p.capacity,
    dimensions: p.dimensions,
    subcategory: p.subcategory,
    translations: (p as unknown as { translations?: unknown }).translations ?? null,
    imageUrl: p.images[0]?.url ?? null,
  }));
}
