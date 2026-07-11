'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n';
import Reveal from '@/components/site/Reveal';

export default function AboutPage() {
  const t = useT();
  return (
    <>
      <section className="relative h-[46vh] min-h-[380px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/site/about.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-pine-night/50 via-pine-night/25 to-mist" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pb-12">
          <Reveal>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-2">{t.about.title}</h1>
            <p className="text-mist/90">{t.about.sub}</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <Reveal>
          <p className="font-display text-2xl md:text-[28px] font-light leading-relaxed text-pine mb-8">{t.about.p1}</p>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-inksoft leading-relaxed mb-6">{t.about.p2}</p>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-inksoft leading-relaxed">{t.about.p3}</p>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-7">
          {t.about.values.map(([title, body], i) => (
            <Reveal key={title} delay={i * 130}>
              <div className="rounded-3xl bg-mist-card border border-line p-8 text-center h-full">
                <p className="font-display text-xl text-moss mb-3">0{i + 1}</p>
                <h3 className="font-display text-2xl text-pine-deep mb-3">{title}</h3>
                <p className="text-sm text-inksoft leading-relaxed">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="text-center mt-16">
          <Link href="/contact" className="inline-block rounded-full bg-pine text-mist px-11 py-4 text-sm font-semibold tracking-wide hover:bg-pine-dark transition-all">
            {t.common.requestQuote}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
