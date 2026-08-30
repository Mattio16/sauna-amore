import Link from 'next/link';
import { prisma } from '@/lib/db';
import { euro, formatDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

const statusColors: Record<string, string> = {
  NEW: 'bg-amber-100 text-amber-800',
  CONTACTED: 'bg-blue-100 text-blue-800',
  QUOTED: 'bg-purple-100 text-purple-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  DELIVERED: 'bg-stone-200 text-stone-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default async function AdminDashboard() {
  const [newOrders, totalOrders, products, unpublished, qrScans, recent] = await Promise.all([
    prisma.order.count({ where: { status: 'NEW' } }),
    prisma.order.count(),
    prisma.product.count(),
    prisma.product.count({ where: { isPublished: false } }),
    prisma.qrScan.count({ where: { isBot: false } }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
      include: { items: true },
    }),
  ]);

  const stats = [
    { label: 'New orders', value: newOrders, href: '/admin/orders?status=NEW' },
    { label: 'Total orders', value: totalOrders, href: '/admin/orders' },
    { label: 'Products', value: products, href: '/admin/products' },
    { label: 'Unpublished', value: unpublished, href: '/admin/products' },
    { label: 'QR scans', value: qrScans, href: '/admin/qr' },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <h1 className="text-2xl font-semibold text-stone-900">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl shadow-sm p-5 hover:shadow transition-shadow">
            <p className="text-3xl font-semibold text-stone-900">{s.value}</p>
            <p className="text-sm text-stone-500">{s.label}</p>
          </Link>
        ))}
      </div>

      <section className="bg-white rounded-xl shadow-sm">
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-medium text-stone-900">Recent orders</h2>
          <Link href="/admin/orders" className="text-sm text-stone-500 hover:text-stone-900">
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-8 text-sm text-stone-500">
            No orders yet. They'll appear here when customers submit quote requests.
          </p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {recent.map((o) => (
                <tr key={o.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50">
                  <td className="px-5 py-3 font-medium">
                    <Link href={`/admin/orders/${o.id}`}>{o.orderNumber}</Link>
                  </td>
                  <td className="px-3 py-3">{o.customerName}</td>
                  <td className="px-3 py-3 text-stone-500">
                    {o.items.map((i) => i.productName).join(', ')}
                  </td>
                  <td className="px-3 py-3">{euro(o.totalEstimate)}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${statusColors[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-stone-400">{formatDate(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
