import { prisma } from '@/lib/db';
import { createAdminUser, resetAdminPassword, deleteAdminUser } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

const input = 'rounded border border-stone-300 px-3 py-2 text-sm';

export default async function AdminUsersPage() {
  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: 'asc' } });

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Users</h1>
        <p className="text-sm text-stone-500">
          Everyone here has full access to the back office. Passwords are stored encrypted —
          to change one, set a new password on the row.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm divide-y divide-stone-100">
        {users.map((u) => (
          <div key={u.id} className="px-5 py-4 flex flex-wrap items-center gap-3">
            <div className="min-w-48 flex-1">
              <p className="font-medium text-stone-900">{u.name ?? '—'}</p>
              <p className="text-xs text-stone-500">{u.email}</p>
            </div>
            <form action={resetAdminPassword} className="flex items-center gap-2">
              <input type="hidden" name="id" value={u.id} />
              <input
                name="password"
                type="password"
                placeholder="New password (min 8)"
                minLength={8}
                required
                className={input}
              />
              <button className="rounded border border-stone-300 px-3 py-2 text-sm hover:bg-stone-50">
                Set password
              </button>
            </form>
            {users.length > 1 && (
              <form action={deleteAdminUser}>
                <input type="hidden" name="id" value={u.id} />
                <button
                  className="text-red-400 hover:text-red-600 px-1 text-sm"
                  title="Remove this user's admin access"
                >
                  ✕
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

      <form action={createAdminUser} className="bg-white rounded-xl shadow-sm p-5 space-y-3">
        <p className="text-sm font-medium text-stone-900">Add a user</p>
        <div className="flex flex-wrap gap-3">
          <input name="name" placeholder="Name" className={input} />
          <input name="email" type="email" placeholder="Email" required className={input + ' min-w-64'} />
          <input
            name="password"
            type="password"
            placeholder="Password (min 8)"
            minLength={8}
            required
            className={input}
          />
          <button className="rounded bg-stone-900 text-white px-4 py-2 text-sm hover:bg-stone-700">
            + Add user
          </button>
        </div>
        <p className="text-xs text-stone-400">
          Share the password privately; they can change it here after logging in.
        </p>
      </form>
    </div>
  );
}
