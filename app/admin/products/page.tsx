import Link from 'next/link';
import { prisma } from '@/lib/db';
import { euro } from '@/lib/format';
import { togglePublish } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  const products = await prisma.product.findMany({
    where: category ? { category: category as never } : undefined,
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } },
  });

  const tabs = [
    { label: 'All', value: undefined },
    { label: 'Saunas', value: 'SAUNA' },
    { label: 'Hot Tubs', value: 'HOT_TUB' },
    { label: 'Ice Baths', value: 'ICE_BATH' },
    { label: 'Accessories', value: 'ACCESSORY' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded bg-stone-900 text-white px-4 py-2 text-sm font-medium hover:bg-stone-700"
        >
          + New product
        </Link>
      </div>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <Link
            key={t.label}
            href={t.value ? `/admin/products?category=${t.value}` : '/admin/products'}
            className={`rounded-full px-4 py-1.5 text-sm ${
              category === t.value || (!category && !t.value)
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-200'
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-stone-500 border-b border-stone-100">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-3 py-3 font-medium">SKU</th>
              <th className="px-3 py-3 font-medium">Category</th>
              <th className="px-3 py-3 font-medium">Base price</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50">
                <td className="px-5 py-3">
                  <Link href={`/admin/products/${p.id}`} className="flex items-center gap-3 font-medium text-stone-900">
                    {p.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0].url} alt="" className="h-10 w-14 rounded object-cover bg-stone-100" />
                    ) : (
                      <span className="h-10 w-14 rounded bg-stone-100" />
                    )}
                    {p.nameIt}
                  </Link>
                </td>
                <td className="px-3 py-3 text-stone-500">{p.sku}</td>
                <td className="px-3 py-3 text-stone-500">{p.category}</td>
                <td className="px-3 py-3">{euro(p.basePrice)}</td>
                <td className="px-3 py-3">
                  <form action={togglePublish}>
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        p.isPublished ? 'bg-green-100 text-green-800' : 'bg-stone-200 text-stone-600'
                      }`}
                      title="Click to toggle"
                    >
                      {p.isPublished ? 'Published' : 'Hidden'}
                    </button>
                  </form>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/products/${p.id}`} className="text-stone-500 hover:text-stone-900">
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
