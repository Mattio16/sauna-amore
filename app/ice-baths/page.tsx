'use client';

import { useLang } from '@/lib/i18n';
import { icebaths } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import { motion } from 'framer-motion';

const pageContent: Record<string, { title: string; subtitle: string; products: string; product: string; noProducts: string; ctaTitle: string; ctaSubtitle: string; ctaBtn: string }> = {
  it: { title: 'Bagni di Ghiaccio', subtitle: 'Terapia del freddo e recupero per atleti e appassionati di wellness', products: 'Prodotti', product: 'Prodotto', noProducts: 'Nessun prodotto disponibile in questa categoria', ctaTitle: 'Hai trovato quello che cercavi?', ctaSubtitle: 'Contattaci per un preventivo personalizzato', ctaBtn: 'Richiedi un Preventivo' },
  en: { title: 'Ice Baths', subtitle: 'Cold therapy and recovery for athletes and wellness enthusiasts', products: 'Products', product: 'Product', noProducts: 'No products available in this category', ctaTitle: 'Found what you were looking for?', ctaSubtitle: 'Contact us for a personalised quote', ctaBtn: 'Request a Quote' },
  de: { title: 'Eisbäder', subtitle: 'Kältetherapie und Erholung für Sportler und Wellness-Enthusiasten', products: 'Produkte', product: 'Produkt', noProducts: 'Keine Produkte in dieser Kategorie verfügbar', ctaTitle: 'Gefunden, wonach Sie gesucht haben?', ctaSubtitle: 'Kontaktieren Sie uns für ein individuelles Angebot', ctaBtn: 'Angebot Anfordern' },
  fr: { title: 'Bains de Glace', subtitle: 'Thérapie par le froid et récupération pour les athlètes et les amateurs de bien-être', products: 'Produits', product: 'Produit', noProducts: 'Aucun produit disponible dans cette catégorie', ctaTitle: 'Trouvé ce que vous cherchiez ?', ctaSubtitle: 'Contactez-nous pour un devis personnalisé', ctaBtn: 'Demander un Devis' },
  es: { title: 'Baños de Hielo', subtitle: 'Terapia de frío y recuperación para atletas y entusiastas del bienestar', products: 'Productos', product: 'Producto', noProducts: 'No hay productos disponibles en esta categoría', ctaTitle: '¿Encontraste lo que buscabas?', ctaSubtitle: 'Contáctanos para un presupuesto personalizado', ctaBtn: 'Solicitar Presupuesto' },
  pt: { title: 'Banhos de Gelo', subtitle: 'Terapia de frio e recuperação para atletas e entusiastas do bem-estar', products: 'Produtos', product: 'Produto', noProducts: 'Nenhum produto disponível nesta categoria', ctaTitle: 'Encontrou o que procurava?', ctaSubtitle: 'Contacte-nos para um orçamento personalizado', ctaBtn: 'Pedir Orçamento' },
};

export default function IceBathsPage() {
  const lang = useLang();
  const t = pageContent[lang] || pageContent.en;

  const heroImage = icebaths[0]?.image || '/images/icebath-hero.jpg';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url('${heroImage}')` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-50">{t.title}</h1>
            <p className="text-lg md:text-xl text-slate-100 mb-4">{t.subtitle}</p>
            <div className="inline-block bg-teal-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              {icebaths.length} {icebaths.length === 1 ? t.product : t.products}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {icebaths.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.1}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <ProductCard product={product} type="icebath" index={index} />
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>
        {icebaths.length === 0 && (
          <div className="text-center py-12"><p className="text-gray-500 text-lg">{t.noProducts}</p></div>
        )}
      </div>

      <div className="bg-gradient-to-r from-teal-500 to-teal-600 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-teal-100 mb-6 text-lg">{t.ctaSubtitle}</p>
          <a href="/contact" className="inline-block bg-white text-teal-600 font-bold px-8 py-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 shadow-lg">{t.ctaBtn}</a>
        </div>
      </div>
    </div>
  );
}
