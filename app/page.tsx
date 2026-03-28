'use client';

import { useLang } from '@/lib/i18n';
import { saunas, hottubs, icebaths } from '@/lib/products';
import ScrollReveal from '@/components/ScrollReveal';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowRight, Thermometer, Droplets, Snowflake, Shield, Truck, HeartHandshake, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const lang = useLang();

  const pick = <T,>(obj: Record<string, T>): T => obj[lang] || obj.en;

  const heroTexts: Record<string, { title: string; subtitle: string; cta: string }> = {
    it: { title: 'Il Benessere Nordico a Casa Tua', subtitle: 'Scopri la tradizione baltica con saune in legno massiccio, vasche idromassaggio e vasche ghiacciatte premium nelle Marche', cta: 'Scopri i Nostri Prodotti' },
    en: { title: 'Nordic Wellness at Your Home', subtitle: 'Experience authentic Baltic tradition with premium solid wood saunas, luxury hot tubs, and ice baths in Le Marche', cta: 'Discover Our Products' },
    de: { title: 'Nordisches Wellness bei Ihnen Zuhause', subtitle: 'Erleben Sie authentische baltische Tradition mit hochwertigen Massivholz-Saunen, Luxus-Whirlpools und Eisbädern in den Marken', cta: 'Unsere Produkte Entdecken' },
    fr: { title: 'Le Bien-être Nordique Chez Vous', subtitle: 'Découvrez la tradition balte avec des saunas en bois massif, bains à remous de luxe et bains de glace dans les Marches', cta: 'Découvrir Nos Produits' },
    es: { title: 'Bienestar Nórdico en Tu Hogar', subtitle: 'Descubre la tradición báltica con saunas de madera maciza, jacuzzis de lujo y baños de hielo en Le Marche', cta: 'Descubrir Nuestros Productos' },
    pt: { title: 'Bem-estar Nórdico na Sua Casa', subtitle: 'Descubra a tradição báltica com saunas de madeira maciça, banheiras de luxo e banhos de gelo em Le Marche', cta: 'Descobrir os Nossos Produtos' },
  };

  const productsTexts: Record<string, { title: string; saunas: string; hotTubs: string; iceBaths: string; discover: string; models: string }> = {
    it: { title: 'I Nostri Prodotti', saunas: 'Saune in Legno', hotTubs: 'Vasche Idromassaggio', iceBaths: 'Vasche Ghiacciatte', discover: 'Scopri', models: 'Modelli' },
    en: { title: 'Our Products', saunas: 'Solid Wood Saunas', hotTubs: 'Hot Tubs', iceBaths: 'Ice Baths', discover: 'Discover', models: 'Models' },
    de: { title: 'Unsere Produkte', saunas: 'Massivholz-Saunen', hotTubs: 'Whirlpools', iceBaths: 'Eisbäder', discover: 'Entdecken', models: 'Modelle' },
    fr: { title: 'Nos Produits', saunas: 'Saunas en Bois Massif', hotTubs: 'Bains à Remous', iceBaths: 'Bains de Glace', discover: 'Découvrir', models: 'Modèles' },
    es: { title: 'Nuestros Productos', saunas: 'Saunas de Madera', hotTubs: 'Jacuzzis', iceBaths: 'Baños de Hielo', discover: 'Descubrir', models: 'Modelos' },
    pt: { title: 'Os Nossos Produtos', saunas: 'Saunas de Madeira', hotTubs: 'Banheiras', iceBaths: 'Banhos de Gelo', discover: 'Descobrir', models: 'Modelos' },
  };

  const whyTexts: Record<string, { title: string; quality: string; qualityDesc: string; delivery: string; deliveryDesc: string; service: string; serviceDesc: string }> = {
    it: { title: 'Perché Scegliere Sauna Amore', quality: 'Qualità Premium', qualityDesc: 'Artigianato baltico autentico con materiali superiori e costruzione duratura', delivery: 'Consegna in Tutta Italia', deliveryDesc: 'Spedizione rapida e affidabile dei nostri prodotti in tutta Italia', service: 'Servizio Personalizzato', serviceDesc: 'Supporto dedicato per trovare la soluzione di benessere perfetta per te' },
    en: { title: 'Why Choose Sauna Amore', quality: 'Premium Quality', qualityDesc: 'Authentic Baltic craftsmanship with superior materials and lasting build quality', delivery: 'Delivery Across Italy', deliveryDesc: 'Fast and reliable shipping of our products throughout Italy', service: 'Personalised Service', serviceDesc: 'Dedicated support to find the perfect wellness solution for you' },
    de: { title: 'Warum Sauna Amore', quality: 'Premium-Qualität', qualityDesc: 'Authentische baltische Handwerkskunst mit überlegenen Materialien und langlebiger Bauqualität', delivery: 'Lieferung in ganz Italien', deliveryDesc: 'Schneller und zuverlässiger Versand unserer Produkte in ganz Italien', service: 'Persönlicher Service', serviceDesc: 'Engagierter Support für die perfekte Wellness-Lösung für Sie' },
    fr: { title: 'Pourquoi Sauna Amore', quality: 'Qualité Premium', qualityDesc: 'Artisanat balte authentique avec des matériaux supérieurs et une qualité de construction durable', delivery: 'Livraison dans toute l\'Italie', deliveryDesc: 'Expédition rapide et fiable de nos produits dans toute l\'Italie', service: 'Service Personnalisé', serviceDesc: 'Support dédié pour trouver la solution bien-être parfaite pour vous' },
    es: { title: 'Por Qué Sauna Amore', quality: 'Calidad Premium', qualityDesc: 'Artesanía báltica auténtica con materiales superiores y calidad de construcción duradera', delivery: 'Entrega en Toda Italia', deliveryDesc: 'Envío rápido y fiable de nuestros productos en toda Italia', service: 'Servicio Personalizado', serviceDesc: 'Soporte dedicado para encontrar la solución de bienestar perfecta para ti' },
    pt: { title: 'Porquê Sauna Amore', quality: 'Qualidade Premium', qualityDesc: 'Artesanato báltico autêntico com materiais superiores e qualidade de construção duradoura', delivery: 'Entrega em Toda a Itália', deliveryDesc: 'Envio rápido e fiável dos nossos produtos em toda a Itália', service: 'Serviço Personalizado', serviceDesc: 'Suporte dedicado para encontrar a solução de bem-estar perfeita para si' },
  };

  const featuredTexts: Record<string, { title: string; viewAll: string }> = {
    it: { title: 'Saune in Primo Piano', viewAll: 'Vedi tutti i Prodotti' },
    en: { title: 'Featured Saunas', viewAll: 'View All Products' },
    de: { title: 'Ausgewählte Saunen', viewAll: 'Alle Produkte Anzeigen' },
    fr: { title: 'Saunas en Vedette', viewAll: 'Voir Tous les Produits' },
    es: { title: 'Saunas Destacadas', viewAll: 'Ver Todos los Productos' },
    pt: { title: 'Saunas em Destaque', viewAll: 'Ver Todos os Produtos' },
  };

  const ctaTexts: Record<string, { title: string; quote: string; browse: string }> = {
    it: { title: 'Pronto a trasformare il tuo giardino?', quote: 'Richiedi Preventivo', browse: 'Scopri i Prodotti' },
    en: { title: 'Ready to Transform Your Garden?', quote: 'Request Quote', browse: 'Browse Products' },
    de: { title: 'Bereit, Ihren Garten zu verwandeln?', quote: 'Angebot Anfordern', browse: 'Produkte Entdecken' },
    fr: { title: 'Prêt à transformer votre jardin ?', quote: 'Demander un Devis', browse: 'Parcourir les Produits' },
    es: { title: '¿Listo para transformar tu jardín?', quote: 'Solicitar Presupuesto', browse: 'Ver Productos' },
    pt: { title: 'Pronto para transformar o seu jardim?', quote: 'Pedir Orçamento', browse: 'Explorar Produtos' },
  };

  const content = pick(heroTexts);
  const productsContent = pick(productsTexts);
  const whyContent = pick(whyTexts);
  const featuredContent = pick(featuredTexts);
  const ctaContent = pick(ctaTexts);

  const firstSaunaImage = saunas[0]?.image || '';
  const saunasCount = saunas.length;
  const hotTubsCount = hottubs.length;
  const iceBathsCount = icebaths.length;

  return (
    <main className="bg-cream">
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(45, 106, 79, 0.75) 0%, rgba(59, 130, 246, 0.65) 100%), url('${firstSaunaImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Animated background overlay */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/10 to-transparent"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-cream mb-6 leading-tight">
              {content.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lg sm:text-xl text-cream/90 mb-8 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/saunas"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal hover:bg-teal-dark text-cream rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {content.cta}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-cream/60" />
        </motion.div>
      </section>

      {/* PRODUCT CATEGORIES SECTION */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {productsContent.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal to-sage-300 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Saunas Card */}
            <ScrollReveal delay={0} className="h-full">
              <Link href="/saunas" className="group block h-full">
                <div
                  className="relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(45, 106, 79, 0.7) 0%, rgba(27, 67, 50, 0.8) 100%), url('${saunas[0]?.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    <div>
                      <Thermometer size={40} className="text-cream mb-4" />
                      <h3 className="font-display text-3xl font-bold text-cream mb-2">
                        {productsContent.saunas}
                      </h3>
                    </div>
                    <div>
                      <p className="text-cream/80 text-lg font-semibold mb-4">
                        {saunasCount} {productsContent.models}
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/20 backdrop-blur-sm rounded-full group-hover:bg-cream group-hover:text-teal transition-all duration-300">
                        <span className="text-cream group-hover:text-teal font-semibold">
                          {productsContent.discover}
                        </span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </ScrollReveal>

            {/* Hot Tubs Card */}
            <ScrollReveal delay={0.1} className="h-full">
              <Link href="/hot-tubs" className="group block h-full">
                <div
                  className="relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(29, 78, 112, 0.7) 0%, rgba(27, 67, 50, 0.8) 100%), url('${hottubs[0]?.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    <div>
                      <Droplets size={40} className="text-cream mb-4" />
                      <h3 className="font-display text-3xl font-bold text-cream mb-2">
                        {productsContent.hotTubs}
                      </h3>
                    </div>
                    <div>
                      <p className="text-cream/80 text-lg font-semibold mb-4">
                        {hotTubsCount} {productsContent.models}
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/20 backdrop-blur-sm rounded-full group-hover:bg-cream group-hover:text-teal transition-all duration-300">
                        <span className="text-cream group-hover:text-teal font-semibold">
                          {productsContent.discover}
                        </span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </ScrollReveal>

            {/* Ice Baths Card */}
            <ScrollReveal delay={0.2} className="h-full">
              <Link href="/ice-baths" className="group block h-full">
                <div
                  className="relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(70, 130, 180, 0.7) 0%, rgba(27, 67, 50, 0.8) 100%), url('${icebaths[0]?.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    <div>
                      <Snowflake size={40} className="text-cream mb-4" />
                      <h3 className="font-display text-3xl font-bold text-cream mb-2">
                        {productsContent.iceBaths}
                      </h3>
                    </div>
                    <div>
                      <p className="text-cream/80 text-lg font-semibold mb-4">
                        {iceBathsCount} {productsContent.models}
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/20 backdrop-blur-sm rounded-full group-hover:bg-cream group-hover:text-teal transition-all duration-300">
                        <span className="text-cream group-hover:text-teal font-semibold">
                          {productsContent.discover}
                        </span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-sage-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {whyContent.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal to-sage-300 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality */}
            <ScrollReveal delay={0} direction="up">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center mb-6">
                  <Shield size={28} className="text-cream" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">
                  {whyContent.quality}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {whyContent.qualityDesc}
                </p>
              </div>
            </ScrollReveal>

            {/* Delivery */}
            <ScrollReveal delay={0.1} direction="up">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center mb-6">
                  <Truck size={28} className="text-cream" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">
                  {whyContent.delivery}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {whyContent.deliveryDesc}
                </p>
              </div>
            </ScrollReveal>

            {/* Service */}
            <ScrollReveal delay={0.2} direction="up">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center mb-6">
                  <HeartHandshake size={28} className="text-cream" />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">
                  {whyContent.service}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {whyContent.serviceDesc}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {featuredContent.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal to-sage-300 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {saunas.slice(0, 3).map((sauna, index) => (
              <ProductCard
                key={sauna.id}
                product={sauna}
                type="sauna"
                index={index}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/saunas"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal hover:bg-teal-dark text-cream rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {featuredContent.viewAll}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal to-teal-dark overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-cream/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-cream/10 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-cream mb-8">
              {ctaContent.title}
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cream text-teal rounded-full font-semibold hover:bg-cream/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {ctaContent.quote}
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/saunas"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-cream text-cream rounded-full font-semibold hover:bg-cream/10 transition-all duration-300 transform hover:scale-105"
              >
                {ctaContent.browse}
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
