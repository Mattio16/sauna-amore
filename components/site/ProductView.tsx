'use client';

import { useState, useMemo, FormEvent } from 'react';
import { useT, useLang, pickName, pickField, euro } from '@/lib/i18n';
import Reveal from './Reveal';
import ProductCard, { ProductCardData } from './ProductCard';

export type OptionGroupData = {
  id: string;
  code: string;
  nameIt: string;
  nameEn: string;
  translations?: unknown;
  displayType?: string;
  sortOrder: number;
  options: {
    optionId: string;
    code: string;
    nameIt: string;
    nameEn: string;
    description: string | null;
    imageUrl?: string | null;
    translations?: unknown;
    priceDelta: number;
    isDefault: boolean;
    sortOrder: number;
  }[];
};

export type ProductData = {
  id: string;
  slug: string;
  nameIt: string;
  nameEn: string;
  translations?: unknown;
  descriptionIt: string | null;
  descriptionEn: string | null;
  specsIt: string | null;
  specsEn: string | null;
  basePrice: number;
  capacity: number | null;
  dimensions: string | null;
  category: string;
  images: string[];
  videoUrl?: string | null;
  optionGroups: OptionGroupData[];
};

const SWATCHES: Record<string, string> = {
  'roof-brown': '#4d3b33',
  'roof-black': '#33383b',
  'roof-green': '#55604d',
  'liner-blue': '#1c4fa1',
  'liner-grey': '#383e42',
  'liner-turquoise': '#7fb0b2',
  'liner-beige': '#eae6ca',
  'liner-black': '#0a0a0d',
};

export default function ProductView({ product, related }: { product: ProductData; related: ProductCardData[] }) {
  const t = useT();
  const lang = useLang();
  const [imgIdx, setImgIdx] = useState(0);
  // Each group holds an array of selected option ids (radio groups: exactly one;
  // multi groups: zero or more).
  const [selected, setSelected] = useState<Record<string, string[]>>(() => {
    const init: Record<string, string[]> = {};
    for (const g of product.optionGroups) {
      if (g.displayType === 'MULTI') {
        init[g.id] = g.options.filter((o) => o.isDefault).map((o) => o.optionId);
      } else {
        const def = g.options.find((o) => o.isDefault) ?? g.options[0];
        init[g.id] = def ? [def.optionId] : [];
      }
    }
    return init;
  });

  const toggleOption = (g: OptionGroupData, optionId: string) => {
    setSelected((prev) => {
      const cur = prev[g.id] ?? [];
      if (g.displayType === 'MULTI') {
        return {
          ...prev,
          [g.id]: cur.includes(optionId) ? cur.filter((x) => x !== optionId) : [...cur, optionId],
        };
      }
      return { ...prev, [g.id]: [optionId] };
    });
  };
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ customerName: '', email: '', phone: '', address: '', city: '', postalCode: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [orderRef, setOrderRef] = useState('');

  const unitPrice = useMemo(() => {
    let p = product.basePrice;
    for (const g of product.optionGroups) {
      for (const opt of g.options) {
        if (selected[g.id]?.includes(opt.optionId)) p += opt.priceDelta;
      }
    }
    return p;
  }, [product, selected]);

  const description = pickField(product, lang, 'description', product.descriptionEn ?? product.descriptionIt);
  const specs = pickField(product, lang, 'specs', product.specsEn ?? product.specsIt);
  const specRows = useMemo(() => {
    if (!specs) return [] as [string, string][];
    return specs
      .split('|')
      .map((row) => {
        const i = row.indexOf(':');
        return (i === -1 ? [row.trim(), ''] : [row.slice(0, i).trim(), row.slice(i + 1).trim()]) as [string, string];
      })
      .filter(([l]) => l);
  }, [specs]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          optionIds: Object.values(selected).flat(),
          quantity: qty,
          locale: lang === 'it' ? 'it' : 'en',
          ...form,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setOrderRef(json.orderNumber);
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  }

  const input = 'w-full rounded-xl border border-line bg-mist-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-moss';

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* ---- Gallery ---- */}
          <div>
            <Reveal>
              <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-line/40 mb-4">
                {product.images[imgIdx] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.images[imgIdx]} alt={pickName(product, lang)} className="w-full h-full object-cover" />
                )}
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {product.images.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`rounded-xl overflow-hidden aspect-[4/3] border-2 transition-colors ${i === imgIdx ? 'border-pine' : 'border-transparent hover:border-moss-light'}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              {product.videoUrl && (
                <div className="mt-6 rounded-3xl overflow-hidden bg-line/40">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-auto block"
                  >
                    <source src={product.videoUrl} type="video/mp4" />
                  </video>
                </div>
              )}
            </Reveal>
          </div>

          {/* ---- Info + configurator ---- */}
          <div>
            <Reveal>
              <h1 className="font-display text-4xl md:text-5xl text-pine-deep mb-2">{pickName(product, lang)}</h1>
              <p className="text-xs tracking-[0.2em] uppercase text-moss mb-6">
                {product.capacity ? `${product.capacity} ${t.common.persons} · ` : ''}
                {product.dimensions ?? ''}
              </p>
              {description && <p className="text-inksoft leading-relaxed mb-8 whitespace-pre-line">{description}</p>}
            </Reveal>

            {specRows.length > 0 && (
              <Reveal delay={80}>
                <div className="rounded-3xl border border-line overflow-hidden mb-8">
                  <div className="bg-pine text-mist px-5 py-3 text-xs font-semibold tracking-[0.2em] uppercase">
                    {t.product.params}
                  </div>
                  <table className="w-full text-sm">
                    <tbody>
                      {specRows.map(([label, value], i) => (
                        <tr key={i} className={i % 2 ? 'bg-mist-card' : 'bg-transparent'}>
                          <td className="px-5 py-2.5 text-inksoft w-1/2">{label}</td>
                          <td className="px-5 py-2.5 text-pine-deep font-medium">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            )}

            {product.optionGroups.length > 0 && (
              <Reveal delay={120}>
                <div className="space-y-7 mb-8">
                  {product.optionGroups.map((g) => {
                    const selectedIds = selected[g.id] ?? [];
                    const selectedOpt = g.options.filter((o) => selectedIds.includes(o.optionId)).pop();
                    return (
                      <div key={g.id}>
                        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-pine mb-3">{t.optionGroups[g.code] ?? pickName(g, lang)}</h3>
                        <div className="flex flex-wrap gap-2.5">
                          {g.options.map((o) => {
                            const active = selectedIds.includes(o.optionId);
                            return (
                              <button
                                key={o.optionId}
                                onClick={() => toggleOption(g, o.optionId)}
                                className={`rounded-2xl border px-3.5 py-2.5 text-left text-sm transition-all flex items-center gap-3 ${
                                  active ? 'border-pine bg-pine text-mist' : 'border-line bg-mist-card text-pine hover:border-moss'
                                }`}
                              >
                                {o.imageUrl && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={o.imageUrl}
                                    alt=""
                                    loading="lazy"
                                    className="h-12 w-12 rounded-xl object-cover shrink-0 bg-white"
                                  />
                                )}
                                <span>
                                  <span className="block font-medium">
                                    {SWATCHES[o.code] && (
                                      <span
                                        className="inline-block w-3.5 h-3.5 rounded-full mr-2 align-[-2px] border border-white/40"
                                        style={{ backgroundColor: SWATCHES[o.code] }}
                                      />
                                    )}
                                    {pickName(o, lang)}
                                  </span>
                                  <span className={`block text-xs mt-0.5 ${active ? 'text-moss-light' : 'text-moss'}`}>
                                    {o.priceDelta > 0 ? `+ ${euro(o.priceDelta)}` : '—'}
                                  </span>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        {selectedOpt && (pickField(selectedOpt, lang, 'description', selectedOpt.description)) && (
                          <p key={selectedOpt.optionId} className="mt-3 text-sm text-inksoft leading-relaxed border-l-2 border-moss-light pl-3">
                            {pickField(selectedOpt, lang, 'description', selectedOpt.description)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            )}

            <Reveal delay={200}>
              <div className="rounded-3xl bg-mist-card border border-line p-6 mb-8">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs tracking-[0.2em] uppercase text-moss">{t.product.priceEstimate}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-full border border-line hover:border-moss">−</button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button onClick={() => setQty(Math.min(10, qty + 1))} className="w-8 h-8 rounded-full border border-line hover:border-moss">+</button>
                  </div>
                </div>
                <p className="font-display text-4xl text-pine-deep">{euro(unitPrice * qty)}</p>
              </div>
            </Reveal>

            {/* ---- Quote form ---- */}
            <Reveal delay={260}>
              {status === 'ok' ? (
                <div className="rounded-3xl bg-pine text-mist p-8 text-center">
                  <p className="font-display text-2xl mb-2">{t.product.success}</p>
                  <p className="text-moss-light text-sm mb-1">
                    {t.product.successRef}: <strong>{orderRef}</strong>
                  </p>
                  <p className="text-mist/80 text-sm">{t.product.successBody}</p>
                </div>
              ) : (
                <form onSubmit={submit} className="rounded-3xl border border-line p-6 space-y-4">
                  <div>
                    <h3 className="font-display text-2xl text-pine-deep">{t.product.quoteTitle}</h3>
                    <p className="text-sm text-inksoft">{t.product.quoteSub}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input required placeholder={t.product.name} value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className={input} />
                    <input required type="email" placeholder={t.product.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
                    <input placeholder={t.product.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} />
                    <input placeholder={t.product.city} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={input} />
                    <input placeholder={t.product.address} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={`${input} sm:col-span-2`} />
                  </div>
                  <textarea rows={3} placeholder={t.product.message} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={input} />
                  {status === 'error' && <p className="text-sm text-red-600">{t.product.error}</p>}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full rounded-full bg-pine text-mist py-4 text-sm font-semibold tracking-wide hover:bg-pine-dark disabled:opacity-60 transition-all"
                  >
                    {status === 'sending' ? t.product.sending : t.product.submit}
                  </button>
                </form>
              )}
            </Reveal>

          </div>
        </div>

        {/* ---- Related ---- */}
        {related.length > 0 && (
          <section className="pt-24">
            <Reveal>
              <h2 className="font-display text-3xl text-pine-deep mb-8">{t.product.related}</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 120}>
                  <ProductCard product={p} index={i} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
