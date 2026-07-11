'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Lang, LANGUAGES, useT } from '@/lib/i18n';

export default function SiteNav({
  lang,
  onSetLang,
  overlay,
}: {
  lang: Lang;
  onSetLang: (l: Lang) => void;
  overlay: boolean;
}) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || !overlay || open;

  const links = [
    { href: '/saunas', label: t.nav.saunas },
    { href: '/hot-tubs', label: t.nav.tubs },
    { href: '/ice-baths', label: t.nav.ice },
    { href: '/accessories', label: t.nav.accessories },
    { href: '/rental', label: t.nav.rental },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const linkCls = solid
    ? 'text-inksoft hover:text-pine'
    : 'text-mist/85 hover:text-white';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid ? 'bg-mist/90 backdrop-blur-md shadow-[0_1px_0_rgba(46,70,54,0.12)]' : 'bg-transparent'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between transition-all duration-500 ${solid ? 'py-3' : 'py-5'}`}>
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src={solid ? '/images/site/logo-mark.png' : '/images/site/logo-mark-light.png'}
            alt="Sauna Amore"
            width={46}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className={`font-display text-2xl tracking-[0.08em] transition-colors ${solid ? 'text-pine' : 'text-mist'}`}>
            Sauna Amore
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`text-[13px] font-medium tracking-[0.14em] uppercase transition-colors ${linkCls}`}>
              {l.label}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1 text-[13px] font-medium tracking-[0.14em] uppercase transition-colors ${linkCls}`}
              aria-label="Language"
            >
              {LANGUAGES.find((l) => l.code === lang)?.flag} {lang.toUpperCase()}
              <ChevronDown size={14} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-3 bg-mist-card rounded-xl shadow-xl border border-line py-2 min-w-40">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { onSetLang(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-mist ${l.code === lang ? 'text-pine font-medium' : 'text-inksoft'}`}
                  >
                    {l.flag} {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className={`lg:hidden ${solid ? 'text-pine' : 'text-mist'}`} onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-mist border-t border-line px-6 py-6 space-y-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-pine text-lg font-display">
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-4 border-t border-line flex-wrap">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { onSetLang(l.code); setOpen(false); }}
                className={`text-sm px-3 py-1.5 rounded-full border ${l.code === lang ? 'border-pine text-pine font-medium' : 'border-line text-inksoft'}`}
              >
                {l.flag} {l.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
