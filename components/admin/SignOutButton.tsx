'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="w-full rounded px-3 py-2 text-left text-sm text-stone-300 hover:bg-stone-700 transition-colors"
    >
      Sign out
    </button>
  );
}
