'use client';

import Link from 'next/link';
import { useLang, useTranslation } from '@/lib/i18n';
import { Product } from '@/lib/products';
import { Users, Maximize2, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ProductCardProps {
  product: Product;
  type: 'sauna' | 'hottub' | 'icebath';
  index?: number;
}

export default function ProductCard({ product, type, index = 0 }: ProductCardProps) {
  const lang = useLang();
  const t = useTranslation();
  const name = lang === 'it' ? product.nameIt : product.nameEn;
  const basePrice = product.flatpack || product.price || 0;
  const configPath = `/configurator?product=${product.id}&type=${type}`;

  return (
    <ScrollReveal delay={index * 0.1} className="h-full">
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm card-hover h-full flex flex-col">
        {/* Image */}
        <div className="img-zoom aspect-[4/3] relative">
          <img
            src={product.image}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <Link
              href={configPath}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-teal hover:bg-teal hover:text-white transition-colors"
            >
              {t('products.configure')}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal transition-colors">
            {name}
          </h3>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            {product.persons && (
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-sage-400" />
                {product.persons} {t('products.persons').toLowerCase()}
              </span>
            )}
            {product.dims && (
              <span className="flex items-center gap-1.5">
                <Maximize2 size={14} className="text-sage-400" />
                {product.dims}
              </span>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                {t('products.fromPrice')}
              </span>
              <p className="text-xl font-bold text-teal">
                &euro; {basePrice.toLocaleString('it-IT')}
              </p>
            </div>
            <Link
              href={configPath}
              className="text-sm font-semibold text-teal hover:text-teal-dark flex items-center gap-1 transition-colors"
            >
              {t('common.learnMore')}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
