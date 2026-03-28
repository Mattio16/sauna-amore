'use client';

import Link from 'next/link';
import { useLang, Lang } from '@/lib/i18n';
import { Heart, Shield, Star } from 'lucide-react';

const content: Record<string, {
  title: string; subtitle: string; storyTitle: string; storyText: string;
  valuesTitle: string; quality: string; qualityDesc: string;
  authenticity: string; authenticityDesc: string;
  service: string; serviceDesc: string; ctaText: string; ctaSubtitle: string;
}> = {
  it: {
    title: 'Chi Siamo',
    subtitle: 'Scopri la storia di Sauna Amore',
    storyTitle: 'Il Nostro Viaggio',
    storyText: 'Matt e Arita hanno scoperto la loro passione per il benessere nordico durante i viaggi attraverso la Scandinavia, dove hanno sperimentato il potere trasformativo della vera cultura della sauna baltica. Questa esperienza ha acceso una visione: portare questa tradizione millenaria in Italia, fondendo l\'eredità nordica con il calore mediterraneo.\n\nFondata nel cuore delle Marche, Sauna Amore è dedicata a fornire prodotti sauna premium a prezzi competitivi. Lavoriamo direttamente con produttori di fiducia, applicando un ricarico equo per garantire un valore eccezionale senza compromessi sulla qualità. Ogni sauna che offriamo riflette il nostro impegno verso l\'autenticità, l\'artigianalità e il benessere.\n\nNella nostra bellissima regione, circondata da dolci colline e fascino storico, crediamo che tutti meritino di accedere al potere rigenerante di una vera esperienza sauna.',
    valuesTitle: 'I Nostri Valori',
    quality: 'Qualità',
    qualityDesc: 'Prodotti premium da produttori affidabili con standard rigorosi.',
    authenticity: 'Autenticità',
    authenticityDesc: 'Vera tradizione sauna baltica portata con integrità alle Marche.',
    service: 'Servizio',
    serviceDesc: 'Supporto dedicato e prezzi equi che mettono il tuo benessere al primo posto.',
    ctaText: 'Contattaci',
    ctaSubtitle: 'Pronto a portare il benessere nordico nella tua vita?',
  },
  en: {
    title: 'About Us',
    subtitle: 'Discover the story of Sauna Amore',
    storyTitle: 'Our Journey',
    storyText: 'Matt and Arita discovered their passion for Nordic wellness during travels through Scandinavia, where they experienced the transformative power of authentic Baltic sauna culture. This ignited a vision to bring this centuries-old tradition to Italy, blending Nordic heritage with Mediterranean warmth.\n\nFounded in the heart of Le Marche, Sauna Amore is dedicated to providing premium sauna products at competitive prices. We work directly with trusted manufacturers to ensure exceptional value without compromising quality. Every sauna we offer reflects our commitment to authenticity, craftsmanship, and wellness.\n\nIn our beautiful region, surrounded by rolling hills and historic charm, we believe everyone deserves access to the restorative power of a true sauna experience.',
    valuesTitle: 'Our Values',
    quality: 'Quality',
    qualityDesc: 'Premium products sourced from trusted manufacturers with rigorous standards.',
    authenticity: 'Authenticity',
    authenticityDesc: 'Genuine Baltic sauna tradition brought with integrity to Le Marche.',
    service: 'Service',
    serviceDesc: 'Dedicated support and fair pricing that puts your wellness first.',
    ctaText: 'Get in Touch',
    ctaSubtitle: 'Ready to bring Nordic wellness to your life?',
  },
  de: {
    title: 'Über Uns',
    subtitle: 'Entdecken Sie die Geschichte von Sauna Amore',
    storyTitle: 'Unsere Reise',
    storyText: 'Matt und Arita entdeckten ihre Leidenschaft für nordisches Wellness auf Reisen durch Skandinavien, wo sie die transformative Kraft der authentischen baltischen Saunakultur erlebten. Dies entfachte die Vision, diese jahrhundertealte Tradition nach Italien zu bringen und nordisches Erbe mit mediterraner Wärme zu verbinden.\n\nGegründet im Herzen der Marken, widmet sich Sauna Amore der Bereitstellung hochwertiger Saunaprodukte zu wettbewerbsfähigen Preisen. Wir arbeiten direkt mit vertrauenswürdigen Herstellern zusammen, um außergewöhnlichen Wert ohne Qualitätskompromisse zu gewährleisten.\n\nIn unserer wunderschönen Region, umgeben von sanften Hügeln und historischem Charme, glauben wir, dass jeder Zugang zur regenerativen Kraft eines authentischen Saunaerlebnisses verdient.',
    valuesTitle: 'Unsere Werte',
    quality: 'Qualität',
    qualityDesc: 'Premium-Produkte von vertrauenswürdigen Herstellern mit strengen Standards.',
    authenticity: 'Authentizität',
    authenticityDesc: 'Echte baltische Saunatradition mit Integrität in die Marken gebracht.',
    service: 'Service',
    serviceDesc: 'Engagierter Support und faire Preise, die Ihr Wohlbefinden in den Vordergrund stellen.',
    ctaText: 'Kontakt Aufnehmen',
    ctaSubtitle: 'Bereit, nordisches Wellness in Ihr Leben zu bringen?',
  },
  fr: {
    title: 'À Propos',
    subtitle: "Découvrez l'histoire de Sauna Amore",
    storyTitle: 'Notre Parcours',
    storyText: "Matt et Arita ont découvert leur passion pour le bien-être nordique lors de voyages en Scandinavie, où ils ont expérimenté le pouvoir transformateur de la culture authentique du sauna balte. Cela a allumé une vision : apporter cette tradition séculaire en Italie, en mêlant l'héritage nordique à la chaleur méditerranéenne.\n\nFondée au cœur des Marches, Sauna Amore se consacre à fournir des produits de sauna premium à des prix compétitifs. Nous travaillons directement avec des fabricants de confiance pour garantir une valeur exceptionnelle sans compromis sur la qualité.\n\nDans notre belle région, entourée de collines et de charme historique, nous croyons que chacun mérite d'accéder au pouvoir régénérateur d'une véritable expérience de sauna.",
    valuesTitle: 'Nos Valeurs',
    quality: 'Qualité',
    qualityDesc: 'Produits premium provenant de fabricants de confiance avec des normes rigoureuses.',
    authenticity: 'Authenticité',
    authenticityDesc: 'Véritable tradition du sauna balte apportée avec intégrité aux Marches.',
    service: 'Service',
    serviceDesc: 'Support dédié et prix équitables qui placent votre bien-être en premier.',
    ctaText: 'Contactez-Nous',
    ctaSubtitle: 'Prêt à apporter le bien-être nordique dans votre vie ?',
  },
  es: {
    title: 'Sobre Nosotros',
    subtitle: 'Descubre la historia de Sauna Amore',
    storyTitle: 'Nuestro Viaje',
    storyText: 'Matt y Arita descubrieron su pasión por el bienestar nórdico durante sus viajes por Escandinavia, donde experimentaron el poder transformador de la auténtica cultura de la sauna báltica. Esto encendió una visión: llevar esta tradición centenaria a Italia, fusionando la herencia nórdica con la calidez mediterránea.\n\nFundada en el corazón de Le Marche, Sauna Amore se dedica a proporcionar productos de sauna premium a precios competitivos. Trabajamos directamente con fabricantes de confianza para garantizar un valor excepcional sin comprometer la calidad.\n\nEn nuestra hermosa región, rodeada de colinas y encanto histórico, creemos que todos merecen acceder al poder restaurador de una verdadera experiencia de sauna.',
    valuesTitle: 'Nuestros Valores',
    quality: 'Calidad',
    qualityDesc: 'Productos premium de fabricantes de confianza con estándares rigurosos.',
    authenticity: 'Autenticidad',
    authenticityDesc: 'Auténtica tradición de sauna báltica llevada con integridad a Le Marche.',
    service: 'Servicio',
    serviceDesc: 'Soporte dedicado y precios justos que priorizan tu bienestar.',
    ctaText: 'Contáctanos',
    ctaSubtitle: '¿Listo para traer el bienestar nórdico a tu vida?',
  },
  pt: {
    title: 'Sobre Nós',
    subtitle: 'Descubra a história da Sauna Amore',
    storyTitle: 'A Nossa Jornada',
    storyText: 'Matt e Arita descobriram a sua paixão pelo bem-estar nórdico durante viagens pela Escandinávia, onde experimentaram o poder transformador da autêntica cultura de sauna báltica. Isto acendeu uma visão: trazer esta tradição secular para Itália, fundindo a herança nórdica com o calor mediterrânico.\n\nFundada no coração de Le Marche, a Sauna Amore dedica-se a fornecer produtos de sauna premium a preços competitivos. Trabalhamos diretamente com fabricantes de confiança para garantir valor excecional sem comprometer a qualidade.\n\nNa nossa bela região, rodeada de colinas e charme histórico, acreditamos que todos merecem acesso ao poder regenerativo de uma verdadeira experiência de sauna.',
    valuesTitle: 'Os Nossos Valores',
    quality: 'Qualidade',
    qualityDesc: 'Produtos premium de fabricantes de confiança com padrões rigorosos.',
    authenticity: 'Autenticidade',
    authenticityDesc: 'Verdadeira tradição de sauna báltica trazida com integridade para Le Marche.',
    service: 'Serviço',
    serviceDesc: 'Suporte dedicado e preços justos que colocam o seu bem-estar em primeiro lugar.',
    ctaText: 'Contacte-Nos',
    ctaSubtitle: 'Pronto para trazer o bem-estar nórdico para a sua vida?',
  },
};

export default function AboutPage() {
  const lang = useLang();
  const t = content[lang] || content.en;

  const values = [
    { icon: Star, title: t.quality, description: t.qualityDesc },
    { icon: Heart, title: t.authenticity, description: t.authenticityDesc },
    { icon: Shield, title: t.service, description: t.serviceDesc },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-white">
      <section className="relative h-96 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-96 h-96 bg-cream rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-sage rounded-full filter blur-3xl"></div>
        </div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{t.title}</h1>
          <p className="text-lg md:text-xl opacity-90">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-12 text-center">{t.storyTitle}</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 bg-gradient-to-br from-sage-100 to-teal-100 rounded-2xl overflow-hidden shadow-lg group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🧖</div>
                <p className="text-sage-700 font-medium">Sauna Amore Experience</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-teal-400/10 to-transparent group-hover:from-teal-400/20 transition-all duration-300"></div>
          </div>
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">{t.storyText}</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-cream/50 to-sage-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-16 text-center">{t.valuesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-sage-100 hover:border-teal-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-sage-100 rounded-lg flex items-center justify-center mb-6 group-hover:from-teal-200 group-hover:to-sage-200 transition-colors">
                    <Icon className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg mb-8">{t.ctaSubtitle}</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300">
            {t.ctaText}
          </Link>
        </div>
      </section>
    </main>
  );
}
