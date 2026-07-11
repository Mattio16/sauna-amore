'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n';
import Reveal from '@/components/site/Reveal';

export default function RentalPage() {
  const t = useT();
  return (
    <>
      <section className="relative h-[56vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/site/rental.jpg" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-pine-night/50 via-pine-night/30 to-mist" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pb-12">
          <Reveal>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-2">{t.rental.title}</h1>
            <p className="text-mist/90">{t.rental.sub}</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <Reveal>
          <p className="font-display text-2xl md:text-[28px] font-light leading-relaxed text-pine mb-12">{t.rental.body}</p>
          <Link href="/contact" className="inline-block rounded-full bg-pine text-mist px-11 py-4 text-sm font-semibold tracking-wide hover:bg-pine-dark transition-all">
            {t.rental.cta}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
