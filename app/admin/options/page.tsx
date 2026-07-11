import { prisma } from '@/lib/db';
import { saveOption, createOption, deleteOption } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function OptionsPage() {
  const groups = await prisma.optionGroup.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      options: { orderBy: { sortOrder: 'asc' }, include: { _count: { select: { products: true } } } },
    },
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Options</h1>
        <p className="text-sm text-stone-500">
          Global option names (wood types, heaters…). Price differences are set per product on its edit page.
        </p>
      </div>

      {groups.map((group) => (
        <section key={group.id} className="bg-white rounded-xl shadow-sm p-6 space-y-3">
          <h2 className="font-medium text-stone-900">
            {group.nameEn} <span className="text-sm text-stone-400">({group.code})</span>
          </h2>
          <div className="space-y-1">
            {group.options.map((opt) => (
              <div key={opt.id} className="flex items-center gap-3">
                <form
                  action={saveOption}
                  className="grid grid-cols-[1fr_1fr_4rem_4.5rem] items-center gap-3 text-sm flex-1"
                >
                  <input type="hidden" name="id" value={opt.id} />
                  <input name="nameIt" defaultValue={opt.nameIt} className="rounded border border-stone-300 px-2 py-1.5" />
                  <input name="nameEn" defaultValue={opt.nameEn} className="rounded border border-stone-300 px-2 py-1.5" />
                  <input name="sortOrder" type="number" defaultValue={opt.sortOrder} className="rounded border border-stone-300 px-2 py-1.5 text-right" />
                  <button className="rounded border border-stone-300 px-2 py-1.5 text-xs hover:bg-stone-50">Save</button>
                </form>
                <form action={deleteOption}>
                  <input type="hidden" name="id" value={opt.id} />
                  <button
                    className="text-red-400 hover:text-red-600 text-sm px-1"
                    title={
                      opt._count.products > 0
                        ? `Used by ${opt._count.products} product(s) — deleting removes it from them`
                        : 'Delete option'
                    }
                  >
                    ✕
                  </button>
                </form>
              </div>
            ))}
          </div>
          <form action={createOption} className="flex items-center gap-3 pt-3 border-t border-stone-100 text-sm">
            <input type="hidden" name="groupId" value={group.id} />
            <input name="nameIt" placeholder="Name (Italian)" className="flex-1 rounded border border-stone-300 px-2 py-1.5" />
            <input name="nameEn" placeholder="Name (English)" required className="flex-1 rounded border border-stone-300 px-2 py-1.5" />
            <button className="rounded bg-stone-900 text-white px-4 py-1.5 text-xs hover:bg-stone-700">+ Add option</button>
          </form>
        </section>
      ))}
    </div>
  );
}
