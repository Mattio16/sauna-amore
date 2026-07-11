'use client';

import { Mail, MapPin } from 'lucide-react';
import { useT } from '@/lib/i18n';
import Reveal from '@/components/site/Reveal';

export default function ContactPage() {
  const t = useT();
  return (
    <section className="max-w-4xl mx-auto px-6 pt-36 pb-24">
      <Reveal>
        <h1 className="font-display text-5xl text-pine-deep mb-3">{t.contact.title}</h1>
        <p className="text-inksoft mb-14 max-w-lg">{t.contact.sub}</p>
      </Reveal>
      <div className="grid sm:grid-cols-2 gap-7">
        <Reveal delay={120}>
          <a href="mailto:info@saunaamore.it" className="block rounded-3xl bg-mist-card border border-line p-10 text-center hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(38,56,43,0.12)] transition-all">
            <Mail className="mx-auto mb-4 text-moss" size={28} />
            <p className="text-xs tracking-[0.24em] uppercase text-moss mb-2">{t.contact.emailLabel}</p>
            <p className="font-display text-2xl text-pine-deep">info@saunaamore.it</p>
          </a>
        </Reveal>
        <Reveal delay={220}>
          <div className="rounded-3xl bg-mist-card border border-line p-10 text-center">
            <MapPin className="mx-auto mb-4 text-moss" size={28} />
            <p className="text-xs tracking-[0.24em] uppercase text-moss mb-2">{t.contact.whereLabel}</p>
            <p className="font-display text-2xl text-pine-deep">{t.contact.where}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
