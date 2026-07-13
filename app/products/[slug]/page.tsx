import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import ProductView, { ProductData, OptionGroupData } from '@/components/site/ProductView';

export const revalidate = 300;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      options: { include: { option: { include: { group: true } } } },
    },
  });
  if (!product || !product.isPublished) notFound();

  // Group product options by option group, keeping group + option sort order.
  const groupsMap = new Map<string, OptionGroupData>();
  for (const po of product.options) {
    const g = po.option.group;
    if (!groupsMap.has(g.id)) {
      groupsMap.set(g.id, {
        id: g.id,
        code: g.code,
        nameIt: g.nameIt,
        nameEn: g.nameEn,
        translations: (g as unknown as { translations?: unknown }).translations ?? null,
        displayType: String(g.displayType),
        sortOrder: g.sortOrder,
        options: [],
      });
    }
    groupsMap.get(g.id)!.options.push({
      optionId: po.optionId,
      code: po.option.code,
      nameIt: po.option.nameIt,
      nameEn: po.option.nameEn,
      description: (po.option as unknown as { description?: string | null }).description ?? null,
      imageUrl: (po.option as unknown as { imageUrl?: string | null }).imageUrl ?? null,
      translations: (po.option as unknown as { translations?: unknown }).translations ?? null,
      priceDelta: po.priceDelta,
      isDefault: po.isDefault,
      sortOrder: po.option.sortOrder,
    });
  }
  const optionGroups = Array.from(groupsMap.values())
    .map((g) => ({ ...g, options: g.options.sort((a, b) => a.sortOrder - b.sortOrder) }))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const related = await prisma.product.findMany({
    where: { category: product.category, isPublished: true, id: { not: product.id } },
    orderBy: { sortOrder: 'asc' },
    take: 3,
    include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } },
  });

  const data: ProductData = {
    id: product.id,
    slug: product.slug,
    nameIt: product.nameIt,
    nameEn: product.nameEn,
    translations: (product as unknown as { translations?: unknown }).translations ?? null,
    descriptionIt: product.descriptionIt,
    descriptionEn: product.descriptionEn,
    specsIt: product.specsIt,
    specsEn: product.specsEn,
    basePrice: product.basePrice,
    capacity: product.capacity,
    dimensions: product.dimensions,
    category: product.category,
    images: product.images.map((i) => i.url),
    videoUrl: (product as unknown as { videoUrl?: string | null }).videoUrl ?? null,
    optionGroups,
  };

  return (
    <ProductView
      product={data}
      related={related.map((p) => ({
        id: p.id,
        slug: p.slug,
        nameIt: p.nameIt,
        nameEn: p.nameEn,
        translations: (p as unknown as { translations?: unknown }).translations ?? null,
        basePrice: p.basePrice,
        capacity: p.capacity,
        dimensions: p.dimensions,
        imageUrl: p.images[0]?.url ?? null,
      }))}
    />
  );
}
