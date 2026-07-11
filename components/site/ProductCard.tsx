'use client';

import Link from 'next/link';
import { useT, useLang, pickName, euro } from '@/lib/i18n';

export type ProductCardData = {
  id: string;
  slug: string;
  nameIt: string;
  nameEn: string;
  basePrice: number;
  capacity: number | null;
  dimensions: string | null;
  imageUrl: string | null;
};

export default function ProductCard({ product, index = 0 }: { product: ProductCardData; index?: number }) {
  const t = useT();
  const lang = useLang();
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-mist-card rounded-3xl p-3 block transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_56px_rgba(38,56,43,0.14)]"
      style={{ transitionDelay: `${(index % 3) * 40}ms` }}
    >
      <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-line/40">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={pickName(product, lang)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        ) : null}
      </div>
      <div className="px-3 pt-5 pb-3 text-center">
        <h3 className="font-display text-2xl text-pine-deep">{pickName(product, lang)}</h3>
        <p className="text-xs tracking-[0.18em] uppercase text-moss mt-1 mb-3">
          {product.capacity ? `${product.capacity} ${t.common.persons} · ` : ''}
          {product.dimensions ?? ''}
        </p>
        <p className="text-pine font-medium">
          <span className="text-inksoft font-normal text-sm mr-1.5">{t.common.from}</span>
          {euro(product.basePrice)}
        </p>
      </div>
    </Link>
  );
}
