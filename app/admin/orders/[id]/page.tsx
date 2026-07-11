import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { euro, formatDate } from '@/lib/format';
import { updateOrder } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

type OptionSnapshot = { group: string; option: string; priceDelta: number };

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true },
  });
  if (!order) notFound();

  const statuses = ['NEW', 'CONTACTED', 'QUOTED', 'CONFIRMED', 'DELIVERED', 'CANCELLED'];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link href="/admin/orders" className="text-sm text-stone-500 hover:text-stone-900">
          ← Orders
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-stone-900">{order.orderNumber}</h1>
          <p className="text-sm text-stone-400">{formatDate(order.createdAt)}</p>
        </div>
      </div>

      {/* Customer */}
      <section className="bg-white rounded-xl shadow-sm p-6 grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <h2 className="font-medium text-stone-900 mb-2">Customer</h2>
          <p>{order.customerName}</p>
          <p>
            <a href={`mailto:${order.email}`} className="text-blue-600 hover:underline">{order.email}</a>
          </p>
          {order.phone && (
            <p>
              <a href={`tel:${order.phone}`} className="text-blue-600 hover:underline">{order.phone}</a>
            </p>
          )}
        </div>
        <div>
          <h2 className="font-medium text-stone-900 mb-2">Delivery address</h2>
          <p>{order.address ?? '—'}</p>
          <p>{[order.postalCode, order.city].filter(Boolean).join(' ')}</p>
        </div>
        {order.message && (
          <div className="md:col-span-2">
            <h2 className="font-medium text-stone-900 mb-2">Customer message</h2>
            <p className="whitespace-pre-wrap text-stone-600">{order.message}</p>
          </div>
        )}
      </section>

      {/* Items */}
      <section className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="font-medium text-stone-900">Requested configuration</h2>
        {order.items.map((item) => {
          const opts = (item.optionsSnapshot as OptionSnapshot[] | null) ?? [];
          return (
            <div key={item.id} className="border border-stone-100 rounded-lg p-4 text-sm">
              <div className="flex items-center justify-between font-medium text-stone-900">
                <span>
                  {item.productName}
                  {item.quantity > 1 && ` × ${item.quantity}`}
                </span>
                <span>{euro(item.unitPrice * item.quantity)}</span>
              </div>
              {opts.length > 0 && (
                <ul className="mt-2 space-y-1 text-stone-500">
                  {opts.map((o, i) => (
                    <li key={i} className="flex justify-between">
                      <span>
                        {o.group}: {o.option}
                      </span>
                      <span>{o.priceDelta > 0 ? `+${euro(o.priceDelta)}` : 'included'}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
        <p className="flex justify-between font-semibold text-stone-900 pt-2 border-t border-stone-100">
          <span>Total estimate</span>
          <span>{euro(order.totalEstimate)}</span>
        </p>
      </section>

      {/* Status + notes */}
      <form action={updateOrder} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <input type="hidden" name="id" value={order.id} />
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1">Status</label>
          <select
            name="status"
            defaultValue={order.status}
            className="rounded border border-stone-300 px-3 py-2 text-sm"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 mb-1">Internal notes</label>
          <textarea
            name="adminNotes"
            rows={4}
            defaultValue={order.adminNotes ?? ''}
            placeholder="Quote sent on…, delivery scheduled…, etc."
            className="w-full rounded border border-stone-300 px-3 py-2 text-sm"
          />
        </div>
        <button className="rounded bg-stone-900 text-white px-6 py-2 text-sm font-medium hover:bg-stone-700">
          Update order
        </button>
      </form>
    </div>
  );
}
