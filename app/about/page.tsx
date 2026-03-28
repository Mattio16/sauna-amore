'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { Heart, Shield, Star } from 'lucide-react';

export default function AboutPage() {
  const lang = useLang();

  const content = {
    en: {
      title: 'About Us',
      subtitle: 'Discover the story of Sauna Amore',
      storyTitle: 'Our Journey',
      storyText:
        'Matt and Arita discovered their passion for Nordic wellness during travels through Scandinavia, where they experienced the transformative power of authentic Baltic sauna culture. This ignited a vision to bring this centuries-old tradition to Italy, blending Nordic heritage with Mediterranean warmth.\n\nFounded in the heart of Le Marche, Sauna Amore is dedicated to providing premium sauna products at competitive prices. We work directly with trusted manufacturers, applying a fair dealer price × 2.03 markup to ensure exceptional value without compromising quality. Every sauna we offer reflects our commitment to authenticity, craftsmanship, and wellness.\n\nIn our beautiful region, surrounded by rolling hills and historic charm, we believe everyone deserves access to the restorative power of a true sauna experience.',
      valuesTitle: 'Our Values',
      quality: 'Quality',
      qualityDesc: 'Premium products sourced from trusted manufacturers with rigorous standards.',
      authenticity: 'Authenticity',
      authenticityDesc: 'Genuine Baltic sauna tradition brought with integrity to Le Marche.',
      service: 'Service',
      serviceDesc: 'Dedicated support and fair pricing that puts your wellness first.',
      ctaText: 'Get in Touch',
    },
    it: {
      title: 'Chi Siamo',
      subtitle: 'Scopri la storia di Sauna Amore',
      storyTitle: 'Il Nostro Viaggio',
      storyText:
        'Matt e Arita hanno scoperto la loro passione per il benessere nordico durante i viaggi attraverso la Scandinavia, dove hanno sperimentato il potere trasformativo della vera cultura della sauna baltica. Questa esperienza ha acceso una visione: portare questa tradizione millenaria in Italia, fondendo l\'eredità nordica con il calore mediterraneo.\n\nFondata nel cuore delle Marche, Sauna Amore è dedicata a fornire prodotti sauna premium a prezzi competitivi. Lavoriamo direttamente con produttori di fiducia, applicando un ricarico equo di prezzo rivenditore × 2,03 per garantire un valore eccezionale senza compromessi sulla qualità. Ogni sauna che offriamo riflette il nostro impegno verso l\'autenticità, l\'artigianalità e il benessere.\n\nNella nostra bellissima regione, circondata da dolci colline e fascino storico, crediamo che tutti meritino di accedere al potere rigenerante di una vera esperienza sauna.',
      valuesTitle: 'I Nostri Valori',
      quality: 'Qualità',
      qualityDesc: 'Prodotti premium da produttori affidabili con standard rigorosi.',
      authenticity: 'Autenticità',
      authenticityDesc: 'Vera tradizione sauna baltica portata con integrità alle Marche.',
      service: 'Servizio',
      serviceDesc: 'Supporto dedicato e prezzi equi che mettono il tuo benessere al primo posto.',
      ctaText: 'Contattaci',
    },
  };

  const t = content[lang as keyof typeof content] || content.en;

  const values = [
    {
      icon: Star,
      title: t.quality,
      description: t.qualityDesc,
    },
    {
      icon: Heart,
      title: t.authenticity,
      description: t.authenticityDesc,
    },
    {
      icon: Shield,
      title: t.service,
      description: t.serviceDesc,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
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

      {/* Story Section */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-12 text-center">{t.storyTitle}</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Placeholder */}
          <div className="relative h-96 bg-gradient-to-br from-sage-100 to-teal-100 rounded-2xl overflow-hidden shadow-lg group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🧖</div>
                <p className="text-sage-700 font-medium">Sauna Amore Experience</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-teal-400/10 to-transparent group-hover:from-teal-400/20 transition-all duration-300"></div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">{t.storyText}</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-cream/50 to-sage-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-16 text-center">{t.valuesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-sage-100 hover:border-teal-300"
                >
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

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg mb-8">Ready to bring Nordic wellness to your life?</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
          >
            {t.ctaText}
          </Link>
        </div>
      </section>
    </main>
  );
}
