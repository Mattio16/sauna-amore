'use client';

import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { saunas } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { motion } from 'framer-motion';

const pageContent: Record<string, { title: string; subtitle: string; products: string; product: string; noProducts: string; ctaTitle: string; ctaSubtitle: string; ctaBtn: string; all: string }> = {
  it: { title: 'Saune a Botte', subtitle: 'Saune a botte nordiche in abete e thermowood', products: 'Prodotti', product: 'Prodotto', noProducts: 'Nessun prodotto disponibile in questa categoria', ctaTitle: 'Hai trovato quello che cercavi?', ctaSubtitle: 'Contattaci per un preventivo personalizzato', ctaBtn: 'Richiedi un Preventivo', all: 'Tutti' },
  en: { title: 'Barrel Saunas', subtitle: 'Nordic barrel saunas in spruce and thermowood', products: 'Products', product: 'Product', noProducts: 'No products available in this category', ctaTitle: 'Found what you were looking for?', ctaSubtitle: 'Contact us for a personalised quote', ctaBtn: 'Request a Quote', all: 'All' },
  de: { title: 'Fasssaunen', subtitle: 'Nordische Fasssaunen aus Fichte und Thermowood', products: 'Produkte', product: 'Produkt', noProducts: 'Keine Produkte in dieser Kategorie verfügbar', ctaTitle: 'Gefunden, wonach Sie gesucht haben?', ctaSubtitle: 'Kontaktieren Sie uns für ein individuelles Angebot', ctaBtn: 'Angebot Anfordern', all: 'Alle' },
  fr: { title: 'Saunas Tonneau', subtitle: 'Saunas tonneaux nordiques en épicéa et thermowood', products: 'Produits', product: 'Produit', noProducts: 'Aucun produit disponible dans cette catégorie', ctaTitle: 'Trouvé ce que vous cherchiez ?', ctaSubtitle: 'Contactez-nous pour un devis personnalisé', ctaBtn: 'Demander un Devis', all: 'Tous' },
  es: { title: 'Saunas Barril', subtitle: 'Saunas barril nórdicas en abeto y thermowood', products: 'Productos', product: 'Producto', noProducts: 'No hay productos disponibles en esta categoría', ctaTitle: '¿Encontraste lo que buscabas?', ctaSubtitle: 'Contáctanos para un presupuesto personalizado', ctaBtn: 'Solicitar Presupuesto', all: 'Todos' },
  pt: { title: 'Saunas Barril', subtitle: 'Saunas barril nórdicas em abeto e thermowood', products: 'Produtos', product: 'Produto', noProducts: 'Nenhum produto disponível nesta categoria', ctaTitle: 'Encontrou o que procurava?', ctaSubtitle: 'Contacte-nos para um orçamento personalizado', ctaBtn: 'Pedir Orçamento', all: 'Todos' },
};

export default function SaunasPage() {
  const lang = useLang();
  const t = pageContent[lang] || pageContent.en;
  const [activeFilter, setActiveFilter] = useState('all');

  const sizeFilters = ['all', '2m', '2.4m', '3m', '4m', '5m+'];

  const filteredProducts = activeFilter === 'all'
    ? saunas
    : saunas.filter(product => product.category === activeFilter);

  const heroImage = saunas[0]?.image || '/images/sauna-hero.jpg';

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Banner */}
      <div
        className="relative h-[40vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-amber-50">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-amber-100 mb-4">
              {t.subtitle}
            </p>
            <div className="inline-block bg-teal-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              {filteredProducts.length} {filteredProducts.length === 1 ? t.product : t.products}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
            {sizeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-teal-500 text-white shadow-lg'
                    : 'bg-amber-50 text-gray-700 hover:bg-amber-100'
                }`}
              >
                {filter === 'all' ? t.all : filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  type="sauna"
                  index={index}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t.noProducts}
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-teal-100 mb-6 text-lg">
            {t.ctaSubtitle}
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-teal-600 font-bold px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors duration-200 shadow-lg"
          >
            {t.ctaBtn}
          </a>
        </div>
      </div>
    </div>
  );
}
