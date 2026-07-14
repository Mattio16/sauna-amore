'use client';

import { deleteOrder } from '@/lib/admin-actions';

/** Permanently deletes an order after a native confirm dialog. */
export default function DeleteOrderButton({
  orderId,
  orderNumber,
}: {
  orderId: string;
  orderNumber: string;
}) {
  return (
    <form
      action={deleteOrder}
      onSubmit={(e) => {
        if (!window.confirm(`Permanently delete order ${orderNumber}? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={orderId} />
      <button
        type="submit"
        className="text-red-400 hover:text-red-600 px-1 text-sm"
        title="Permanently delete this order"
      >
        ✕
      </button>
    </form>
  );
}
