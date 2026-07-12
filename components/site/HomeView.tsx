'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useT, euro } from '@/lib/i18n';
import Reveal from './Reveal';
import Parallax from './Parallax';

type Coll = { count: number; min: number };

/** Full-bleed autoplay video band. Loads lazily when scrolled near; the poster
 *  frame shows instantly. Respects prefers-reduced-motion (poster only). */
function VideoBand() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pause when off-screen to save battery.
  useEffect(() => {
    const el = ref.current;
    const video = videoRef.current;
    if (!el || !video || !load) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <section ref={ref} className="w-full my-6">
      {load ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/site/video-poster.jpg"
          className="w-full h-auto block"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/images/site/video-poster.jpg" alt="" loading="lazy" className="w-full h-auto block" />
      )}
    </section>
  );
}

export default function HomeView({
  collections,
}: {
  collections: { saunas: Coll; tubs: Coll; ice: Coll };
}) {
  const t = useT();
  const heroImg = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let tick = false;
    const run = () => {
      if (heroImg.current) {
        const y = scrollY;
        heroImg.current.style.transform = `translateY(${y * 0.28}px) scale(${Math.max(1, 1.1 - y * 0.00005)})`;
      }
      tick = false;
    };
    const onScroll = () => {
      if (!tick) { tick = true; requestAnimationFrame(run); }
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  const colls = [
    { href: '/saunas', img: '/images/site/cat-saune.jpg', title: t.cat.saunasTitle, ...collections.saunas },
    { href: '/hot-tubs', img: '/images/site/cat-vasche.jpg', title: t.cat.tubsTitle, ...collections.tubs },
    { href: '/ice-baths', img: '/images/site/cat-ghiaccio.jpg', title: t.cat.iceTitle, ...collections.ice },
  ];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative h-[92vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={heroImg} src="/images/site/hero.jpg" alt="" className="w-full h-[118%] object-cover will-change-transform" />
          <div className="absolute inset-0 bg-gradient-to-b from-pine-night/55 via-pine-night/30 to-mist" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.3em] uppercase text-mist/90 mb-6">
                <span className="w-11 h-px bg-moss-light/70" />
                {t.home.kicker}
              </span>
            </Reveal>
            <Reveal delay={140}>
              <h1 className="font-display text-5xl md:text-7xl font-normal leading-[1.06] text-white mb-6">
                {t.home.h1a} <em className="italic text-moss-light">{t.home.h1b}</em>
              </h1>
            </Reveal>
            <Reveal delay={280}>
              <p className="text-lg leading-relaxed text-mist/90 max-w-lg mb-10">{t.home.heroP}</p>
            </Reveal>
            <Reveal delay={420}>
              <div className="flex flex-wrap gap-4">
                <Link href="/saunas" className="rounded-full bg-mist text-pine px-9 py-4 text-sm font-semibold tracking-wide hover:bg-white hover:-translate-y-0.5 transition-all">
                  {t.home.ctaCollections}
                </Link>
                <Link href="/contact" className="rounded-full border border-mist/60 text-mist px-9 py-4 text-sm font-semibold tracking-wide hover:border-white hover:text-white transition-all">
                  {t.home.ctaQuote}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center py-14">
          {t.home.stats.map(([v, l], i) => (
            <Reveal key={l} delay={i * 100} className="text-center px-8 md:px-12 py-3 md:border-r border-line last:border-r-0">
              <p className="font-display text-4xl text-pine-deep">{v}</p>
              <p className="text-[13px] text-moss tracking-wide">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Collections ---------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <Reveal className="text-center max-w-xl mx-auto mb-14">
          <span className="block text-xs font-medium tracking-[0.28em] uppercase text-moss mb-4">{t.home.collKicker}</span>
          <h2 className="font-display text-4xl md:text-5xl text-pine-deep mb-3">
            {t.home.collH2a} <em className="italic text-moss">{t.home.collH2b}</em>
          </h2>
          <p className="text-inksoft leading-relaxed">{t.home.collSub}</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-7">
          {colls.map((c, i) => (
            <Reveal key={c.href} delay={i * 130}>
              <Link href={c.href} className="group block bg-mist-card rounded-3xl p-3 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_56px_rgba(38,56,43,0.14)]">
                <Parallax speed={0.05} zoom={1.12} className="rounded-2xl aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                </Parallax>
                <div className="text-center px-3 pt-6 pb-4">
                  <h3 className="font-display text-3xl text-pine-deep mb-1">{c.title}</h3>
                  <p className="text-xs tracking-[0.2em] uppercase text-moss mb-3">
                    {c.count} {t.common.models}
                  </p>
                  <p className="text-pine font-medium mb-4">
                    <span className="text-inksoft font-normal text-sm mr-1.5">{t.common.from}</span>
                    {euro(c.min)}
                  </p>
                  <span className="inline-block text-xs font-semibold tracking-[0.22em] uppercase text-pine border-b border-moss-light pb-1.5 group-hover:border-pine transition-colors">
                    {t.common.discover}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Full-bleed video band ---------- */}
      <VideoBand />

      {/* ---------- Full-bleed editorial (Composed for you) ---------- */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden bg-pine-dark my-10">
        <Parallax speed={0.07} zoom={1.1} className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/site/editorial.jpg" alt="" className="w-full h-full object-cover object-left opacity-80" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-l from-pine-night/90 via-pine-night/55 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full py-14">
          <div className="max-w-xl ml-auto">
            <Reveal>
              <span className="block text-xs font-medium tracking-[0.32em] uppercase text-moss-light mb-4">{t.home.edKicker}</span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-5">
                {t.home.edH2a} <em className="italic text-moss-light">{t.home.edH2b}</em>
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="font-display italic text-2xl text-moss-light/90 leading-snug mb-5">{t.home.edLead}</p>
            </Reveal>
            <Reveal delay={360}>
              <p className="text-mist/80 font-light leading-relaxed mb-10">{t.home.edBody}</p>
            </Reveal>
            <Reveal delay={480}>
              <Link href="/saunas" className="inline-block border border-mist/55 text-mist px-11 py-4 text-xs font-medium tracking-[0.26em] uppercase hover:bg-mist hover:text-pine transition-all">
                {t.home.edCta}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Ritual ---------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <Reveal className="text-center mb-14">
          <span className="block text-xs font-medium tracking-[0.28em] uppercase text-moss mb-4">{t.home.ritKicker}</span>
          <h2 className="font-display text-4xl md:text-5xl text-pine-deep">{t.home.ritH2}</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-7">
          {t.home.ritSteps.map(([title, body], i) => (
            <Reveal key={title} delay={i * 150}>
              <div className="rounded-3xl overflow-hidden aspect-[3/2] mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/site/ritual-${i + 1}.jpg`} alt={title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="text-center px-4">
                <p className="font-display text-xl text-moss mb-2">0{i + 1}</p>
                <h3 className="font-display text-2xl text-pine-deep mb-2">{title}</h3>
                <p className="text-inksoft text-sm leading-relaxed">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Quote ---------- */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <Reveal>
          <p className="font-display italic text-3xl md:text-4xl font-light text-pine leading-normal mb-5">{t.home.quoteText}</p>
          <span className="text-xs tracking-[0.28em] uppercase text-moss">{t.home.quoteAuthor}</span>
        </Reveal>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28 text-center">
        <Reveal>
          <span className="block text-xs font-medium tracking-[0.3em] uppercase text-moss mb-4">{t.home.finalKicker}</span>
          <h2 className="font-display text-4xl md:text-5xl text-pine-deep mb-4">
            {t.home.finalH2a} <em className="italic text-moss">{t.home.finalH2b}</em>
          </h2>
          <p className="text-inksoft mb-10">{t.home.finalSub}</p>
          <Link href="/contact" className="inline-block rounded-full bg-pine text-mist px-11 py-4 text-sm font-semibold tracking-wide hover:bg-pine-dark hover:-translate-y-0.5 transition-all">
            {t.common.requestQuote}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
