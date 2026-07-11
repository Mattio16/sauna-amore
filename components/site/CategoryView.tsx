'use client';

import { useState, useMemo } from 'react';
import { useT } from '@/lib/i18n';
import Reveal from './Reveal';
import ProductCard, { ProductCardData } from './ProductCard';

export type CategoryProduct = ProductCardData & { subcategory: string | null };

export default function CategoryView({
  headerImage,
  titleKey,
  subKey,
  products,
  showFilters = false,
}: {
  headerImage: string;
  titleKey: 'saunasTitle' | 'tubsTitle' | 'iceTitle' | 'accTitle';
  subKey: 'saunasSub' | 'tubsSub' | 'iceSub' | 'accSub';
  products: CategoryProduct[];
  showFilters?: boolean;
}) {
  const t = useT();
  const [filter, setFilter] = useState<string | null>(null);

  const subcats = useMemo(() => {
    if (!showFilters) return [];
    return Array.from(new Set(products.map((p) => p.subcategory).filter(Boolean))) as string[];
  }, [products, showFilters]);

  const visible = filter ? products.filter((p) => p.subcategory === filter) : products;

  return (
    <>
      {/* Photo header */}
      <section className="relative h-[46vh] min-h-[380px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={headerImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-pine-night/50 via-pine-night/25 to-mist" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pb-12">
          <Reveal>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-2">{t.cat[titleKey]}</h1>
            <p className="text-mist/90 max-w-lg">{t.cat[subKey]}</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        {subcats.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setFilter(null)}
              className={`rounded-full px-5 py-2 text-sm transition-colors ${!filter ? 'bg-pine text-mist' : 'bg-mist-card text-inksoft hover:bg-line/50'}`}
            >
              {t.common.viewAll}
            </button>
            {subcats.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s === filter ? null : s)}
                className={`rounded-full px-5 py-2 text-sm transition-colors ${filter === s ? 'bg-pine text-mist' : 'bg-mist-card text-inksoft hover:bg-line/50'}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {visible.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 110}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
