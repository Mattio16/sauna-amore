'use client';

import { useLang } from '@/lib/i18n';
import { icebaths } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { motion } from 'framer-motion';

export default function IceBathsPage() {
  const { t } = useLang();

  const heroImage = icebaths[0]?.image || '/images/icebath-hero.jpg';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-50">
              Bagni di Ghiaccio
            </h1>
            <p className="text-lg md:text-xl text-slate-100 mb-4">
              Cold therapy and recovery for athletes and wellness enthusiasts
            </p>
            <div className="inline-block bg-teal-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              {icebaths.length} {icebaths.length === 1 ? 'Prodotto' : 'Prodotti'}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {icebaths.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  type="icebath"
                  index={index}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

        {icebaths.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nessun prodotto disponibile in questa categoria
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Hai trovato quello che cercavi?
          </h2>
          <p className="text-teal-100 mb-6 text-lg">
            Contattaci per un preventivo personalizzato
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-teal-600 font-bold px-8 py-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 shadow-lg"
          >
            Richiedi un Preventivo
          </a>
        </div>
      </div>
    </div>
  );
}
