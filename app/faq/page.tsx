'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n';
import Reveal from '@/components/site/Reveal';

export default function FaqPage() {
  const t = useT();
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <Reveal>
        <h1 className="font-display text-5xl md:text-6xl text-pine-deep mb-3">{t.faq.title}</h1>
        <p className="text-inksoft mb-14">{t.faq.sub}</p>
      </Reveal>

      {t.faq.groups.map((g, gi) => (
        <Reveal key={gi} delay={gi * 60}>
          <section className="mb-12">
            <h2 className="text-xs font-semibold tracking-[0.24em] uppercase text-moss mb-4">{g.h}</h2>
            <div className="space-y-3">
              {g.items.map(([q, a], i) => (
                <details key={i} className="group rounded-2xl border border-line bg-mist-card overflow-hidden">
                  <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 text-pine-deep font-medium text-[15px] hover:bg-line/30 transition-colors">
                    {q}
                    <span className="text-moss text-xl leading-none shrink-0 transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-5 pb-5 pt-1 text-sm text-inksoft leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </Reveal>
      ))}

      <Reveal>
        <div className="text-center pt-6">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-pine text-mist px-11 py-4 text-sm font-semibold tracking-wide hover:bg-pine-dark transition-all"
          >
            {t.faq.contactCta}
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
