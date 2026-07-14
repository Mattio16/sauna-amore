import { ReactNode } from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import SignOutButton from '@/components/admin/SignOutButton';

export const metadata = { title: 'Admin | Sauna Amore', robots: { index: false } };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  // Login page renders without the chrome (middleware allows it through).
  if (!session) return <div className="min-h-screen bg-stone-100">{children}</div>;

  const nav = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/options', label: 'Options' },
    { href: '/admin/users', label: 'Users' },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex">
      <aside className="w-56 shrink-0 bg-stone-900 text-stone-100 flex flex-col">
        <div className="px-5 py-6 border-b border-stone-700">
          <p className="font-semibold tracking-wide">Sauna Amore</p>
          <p className="text-xs text-stone-400">Back office</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded px-3 py-2 text-sm hover:bg-stone-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-stone-700 space-y-2">
          <Link href="/" className="block px-3 text-xs text-stone-400 hover:text-white">
            ← View site
          </Link>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-x-auto">{children}</main>
    </div>
  );
}
