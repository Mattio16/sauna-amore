'use client';

import { useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { LangContext, Lang, isLang } from '@/lib/i18n';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('it');
  const pathname = usePathname();

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
    if (isLang(saved)) setLangState(saved);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem('lang', l);
  }

  if (pathname?.startsWith('/admin')) {
    return <>{children}</>;
  }

  // Pages with a full-bleed photo header get a transparent nav at the top.
  const overlay = ['/', '/saunas', '/hot-tubs', '/ice-baths', '/rental', '/about'].includes(pathname ?? '/');

  return (
    <LangContext.Provider value={lang}>
      <SiteNav lang={lang} onSetLang={setLang} overlay={overlay} />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </LangContext.Provider>
  );
}
