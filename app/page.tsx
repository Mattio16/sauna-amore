import { prisma } from '@/lib/db';
import HomeView from '@/components/site/HomeView';

export const revalidate = 300;

export default async function HomePage() {
  const [saunaAgg, tubAgg, iceAgg, featured] = await Promise.all([
    prisma.product.aggregate({ where: { category: 'SAUNA', isPublished: true }, _count: true, _min: { basePrice: true } }),
    prisma.product.aggregate({ where: { category: 'HOT_TUB', isPublished: true }, _count: true, _min: { basePrice: true } }),
    prisma.product.aggregate({ where: { category: 'ICE_BATH', isPublished: true }, _count: true, _min: { basePrice: true } }),
    prisma.product.findMany({
      where: { category: 'SAUNA', isPublished: true },
      orderBy: { sortOrder: 'asc' },
      take: 3,
      include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } },
    }),
  ]);

  return (
    <HomeView
      collections={{
        saunas: { count: saunaAgg._count, min: saunaAgg._min.basePrice ?? 0 },
        tubs: { count: tubAgg._count, min: tubAgg._min.basePrice ?? 0 },
        ice: { count: iceAgg._count, min: iceAgg._min.basePrice ?? 0 },
      }}
      featured={featured.map((p) => ({
        id: p.id,
        slug: p.slug,
        nameIt: p.nameIt,
        nameEn: p.nameEn,
        basePrice: p.basePrice,
        capacity: p.capacity,
        dimensions: p.dimensions,
        imageUrl: p.images[0]?.url ?? null,
      }))}
    />
  );
}
