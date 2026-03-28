'use client';

import { useState, ReactNode } from 'react';
import { LangContext, Lang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('it');

  return (
    <LangContext.Provider value={lang}>
      <Navbar onSetLang={setLang} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </LangContext.Provider>
  );
}
