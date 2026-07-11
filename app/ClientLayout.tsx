'use client';

import { useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { LangContext, Lang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('it');
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    // Admin area has its own layout — no public navbar/footer.
    return <>{children}</>;
  }

  return (
    <LangContext.Provider value={lang}>
      <Navbar onSetLang={setLang} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </LangContext.Provider>
  );
}
