'use client';

import { useState, ReactNode } from 'react';
import { LangContext, Lang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('it');

  const toggleLang = () => {
    setLang((prev) => (prev === 'it' ? 'en' : 'it'));
  };

  return (
    <LangContext.Provider value={lang}>
      <Navbar onToggleLang={toggleLang} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </LangContext.Provider>
  );
}
