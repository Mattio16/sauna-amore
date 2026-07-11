import Link from 'next/link';
import { OrderStatus } from '@prisma/client';
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

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status = searchParams.status as OrderStatus | undefined;
  const orders = await prisma.order.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });

  const tabs = ['ALL', 'NEW', 'CONTACTED', 'QUOTED', 'CONFIRMED', 'DELIVERED', 'CANCELLED'];

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-2xl font-semibold text-stone-900">Orders</h1>

      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <Link
            key={t}
            href={t === 'ALL' ? '/admin/orders' : `/admin/orders?status=${t}`}
            className={`rounded-full px-4 py-1.5 text-sm ${
              status === t || (!status && t === 'ALL')
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-200'
            }`}
          >
            {t.charAt(0) + t.slice(1).toLowerCase()}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <p className="px-5 py-10 text-sm text-stone-500 text-center">No orders here yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-stone-500 border-b border-stone-100">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-3 py-3 font-medium">Customer</th>
                <th className="px-3 py-3 font-medium">Products</th>
                <th className="px-3 py-3 font-medium">Estimate</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Received</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50">
                  <td className="px-5 py-3 font-medium">
                    <Link href={`/admin/orders/${o.id}`}>{o.orderNumber}</Link>
                  </td>
                  <td className="px-3 py-3">
                    <p>{o.customerName}</p>
                    <p className="text-xs text-stone-400">{o.email}</p>
                  </td>
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
      </div>
    </div>
  );
}
