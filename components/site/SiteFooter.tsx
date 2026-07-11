'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useT } from '@/lib/i18n';

export default function SiteFooter() {
  const t = useT();
  return (
    <footer className="bg-pine-dark text-mist">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Image src="/images/site/logo-mark-light.png" alt="" width={46} height={40} className="h-10 w-auto" />
            <span className="font-display text-2xl tracking-[0.08em]">Sauna Amore</span>
          </div>
          <p className="text-moss-light/80 text-sm leading-relaxed max-w-xs">{t.footer.tagline}</p>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-[0.24em] uppercase text-moss-light mb-5">{t.footer.products}</h4>
          <ul className="space-y-2.5 text-sm text-mist/80">
            <li><Link href="/saunas" className="hover:text-white">{t.nav.saunas}</Link></li>
            <li><Link href="/hot-tubs" className="hover:text-white">{t.nav.tubs}</Link></li>
            <li><Link href="/ice-baths" className="hover:text-white">{t.nav.ice}</Link></li>
            <li><Link href="/accessories" className="hover:text-white">{t.nav.accessories}</Link></li>
            <li><Link href="/rental" className="hover:text-white">{t.nav.rental}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-[0.24em] uppercase text-moss-light mb-5">{t.footer.company}</h4>
          <ul className="space-y-2.5 text-sm text-mist/80">
            <li><Link href="/about" className="hover:text-white">{t.nav.about}</Link></li>
            <li><Link href="/contact" className="hover:text-white">{t.nav.contact}</Link></li>
            <li><Link href="/privacy" className="hover:text-white">{t.footer.privacy}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-[0.24em] uppercase text-moss-light mb-5">{t.footer.contacts}</h4>
          <ul className="space-y-2.5 text-sm text-mist/80">
            <li><a href="mailto:info@saunaamore.it" className="hover:text-white">info@saunaamore.it</a></li>
            <li>Le Marche, Italia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 text-xs text-moss-light/60 flex flex-wrap gap-2 justify-between">
          <span>© {new Date().getFullYear()} Sauna Amore. {t.footer.rights}</span>
          <span>P.IVA — Le Marche, Italia</span>
        </div>
      </div>
    </footer>
  );
}
