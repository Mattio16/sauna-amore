'use client';

import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

const content: Record<string, {
  title: string; subtitle: string; formTitle: string;
  nameLabel: string; namePlaceholder: string;
  emailLabel: string; emailPlaceholder: string;
  phoneLabel: string; phonePlaceholder: string;
  messageLabel: string; messagePlaceholder: string;
  submitBtn: string; infoTitle: string;
  emailHeading: string; phoneHeading: string;
  whatsappHeading: string; locationHeading: string;
  hoursHeading: string; email: string; phone: string;
  whatsapp: string; location: string; hours: string;
  mapPlaceholder: string; successMessage: string;
}> = {
  it: {
    title: 'Contatti',
    subtitle: 'Mettiti in contatto con Sauna Amore',
    formTitle: 'Inviaci un Messaggio',
    nameLabel: 'Nome', namePlaceholder: 'Il tuo nome completo',
    emailLabel: 'Email', emailPlaceholder: 'tuaemail@example.com',
    phoneLabel: 'Telefono', phonePlaceholder: '+39 XXX XXX XXXX',
    messageLabel: 'Messaggio', messagePlaceholder: 'Raccontaci delle tue esigenze di sauna...',
    submitBtn: 'Invia Messaggio',
    infoTitle: 'Informazioni di Contatto',
    emailHeading: 'Email', phoneHeading: 'Telefono',
    whatsappHeading: 'WhatsApp', locationHeading: 'Posizione',
    hoursHeading: 'Orari di Apertura',
    email: 'info@saunaamore.it', phone: '+39 0733 123456',
    whatsapp: '+39 0733 123456', location: 'Le Marche, Italia',
    hours: 'Lun-Sab 9:00 - 18:00', mapPlaceholder: 'Le Marche, Italia',
    successMessage: 'Grazie! Ti contatteremo presto.',
  },
  en: {
    title: 'Contact',
    subtitle: 'Get in touch with Sauna Amore',
    formTitle: 'Send us a Message',
    nameLabel: 'Name', namePlaceholder: 'Your full name',
    emailLabel: 'Email', emailPlaceholder: 'your@email.com',
    phoneLabel: 'Phone', phonePlaceholder: '+39 XXX XXX XXXX',
    messageLabel: 'Message', messagePlaceholder: 'Tell us about your sauna needs...',
    submitBtn: 'Send Message',
    infoTitle: 'Contact Information',
    emailHeading: 'Email', phoneHeading: 'Phone',
    whatsappHeading: 'WhatsApp', locationHeading: 'Location',
    hoursHeading: 'Business Hours',
    email: 'info@saunaamore.it', phone: '+39 0733 123456',
    whatsapp: '+39 0733 123456', location: 'Le Marche, Italia',
    hours: 'Mon-Sat 9:00 AM - 6:00 PM', mapPlaceholder: 'Le Marche, Italia',
    successMessage: "Thank you! We'll be in touch soon.",
  },
  de: {
    title: 'Kontakt',
    subtitle: 'Nehmen Sie Kontakt mit Sauna Amore auf',
    formTitle: 'Senden Sie uns eine Nachricht',
    nameLabel: 'Name', namePlaceholder: 'Ihr vollständiger Name',
    emailLabel: 'E-Mail', emailPlaceholder: 'ihre@email.com',
    phoneLabel: 'Telefon', phonePlaceholder: '+39 XXX XXX XXXX',
    messageLabel: 'Nachricht', messagePlaceholder: 'Erzählen Sie uns von Ihren Sauna-Wünschen...',
    submitBtn: 'Nachricht Senden',
    infoTitle: 'Kontaktinformationen',
    emailHeading: 'E-Mail', phoneHeading: 'Telefon',
    whatsappHeading: 'WhatsApp', locationHeading: 'Standort',
    hoursHeading: 'Öffnungszeiten',
    email: 'info@saunaamore.it', phone: '+39 0733 123456',
    whatsapp: '+39 0733 123456', location: 'Le Marche, Italien',
    hours: 'Mo-Sa 9:00 - 18:00', mapPlaceholder: 'Le Marche, Italien',
    successMessage: 'Vielen Dank! Wir melden uns bald bei Ihnen.',
  },
  fr: {
    title: 'Contact',
    subtitle: 'Prenez contact avec Sauna Amore',
    formTitle: 'Envoyez-nous un Message',
    nameLabel: 'Nom', namePlaceholder: 'Votre nom complet',
    emailLabel: 'E-mail', emailPlaceholder: 'votre@email.com',
    phoneLabel: 'Téléphone', phonePlaceholder: '+39 XXX XXX XXXX',
    messageLabel: 'Message', messagePlaceholder: 'Parlez-nous de vos besoins en sauna...',
    submitBtn: 'Envoyer le Message',
    infoTitle: 'Coordonnées',
    emailHeading: 'E-mail', phoneHeading: 'Téléphone',
    whatsappHeading: 'WhatsApp', locationHeading: 'Emplacement',
    hoursHeading: "Horaires d'Ouverture",
    email: 'info@saunaamore.it', phone: '+39 0733 123456',
    whatsapp: '+39 0733 123456', location: 'Les Marches, Italie',
    hours: 'Lun-Sam 9h00 - 18h00', mapPlaceholder: 'Les Marches, Italie',
    successMessage: 'Merci ! Nous vous contacterons bientôt.',
  },
  es: {
    title: 'Contacto',
    subtitle: 'Ponte en contacto con Sauna Amore',
    formTitle: 'Envíanos un Mensaje',
    nameLabel: 'Nombre', namePlaceholder: 'Tu nombre completo',
    emailLabel: 'Correo', emailPlaceholder: 'tu@email.com',
    phoneLabel: 'Teléfono', phonePlaceholder: '+39 XXX XXX XXXX',
    messageLabel: 'Mensaje', messagePlaceholder: 'Cuéntanos sobre tus necesidades de sauna...',
    submitBtn: 'Enviar Mensaje',
    infoTitle: 'Información de Contacto',
    emailHeading: 'Correo', phoneHeading: 'Teléfono',
    whatsappHeading: 'WhatsApp', locationHeading: 'Ubicación',
    hoursHeading: 'Horario de Atención',
    email: 'info@saunaamore.it', phone: '+39 0733 123456',
    whatsapp: '+39 0733 123456', location: 'Le Marche, Italia',
    hours: 'Lun-Sáb 9:00 - 18:00', mapPlaceholder: 'Le Marche, Italia',
    successMessage: '¡Gracias! Nos pondremos en contacto pronto.',
  },
  pt: {
    title: 'Contacto',
    subtitle: 'Entre em contacto com a Sauna Amore',
    formTitle: 'Envie-nos uma Mensagem',
    nameLabel: 'Nome', namePlaceholder: 'O seu nome completo',
    emailLabel: 'E-mail', emailPlaceholder: 'seu@email.com',
    phoneLabel: 'Telefone', phonePlaceholder: '+39 XXX XXX XXXX',
    messageLabel: 'Mensagem', messagePlaceholder: 'Fale-nos sobre as suas necessidades de sauna...',
    submitBtn: 'Enviar Mensagem',
    infoTitle: 'Informação de Contacto',
    emailHeading: 'E-mail', phoneHeading: 'Telefone',
    whatsappHeading: 'WhatsApp', locationHeading: 'Localização',
    hoursHeading: 'Horário de Funcionamento',
    email: 'info@saunaamore.it', phone: '+39 0733 123456',
    whatsapp: '+39 0733 123456', location: 'Le Marche, Itália',
    hours: 'Seg-Sáb 9:00 - 18:00', mapPlaceholder: 'Le Marche, Itália',
    successMessage: 'Obrigado! Entraremos em contacto em breve.',
  },
};

export default function ContactPage() {
  const lang = useLang();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const t = content[lang] || content.en;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-white">
      <section className="relative h-96 bg-gradient-to-r from-sage-500 via-sage-400 to-teal-400 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-96 h-96 bg-cream rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-teal-300 rounded-full filter blur-3xl"></div>
        </div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{t.title}</h1>
          <p className="text-lg md:text-xl opacity-90">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-sage-100">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">{t.formTitle}</h2>
            {submitted && (
              <div className="mb-6 p-4 bg-teal-50 border border-teal-300 rounded-lg">
                <p className="text-teal-700 font-medium">{t.successMessage}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">{t.nameLabel}</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder={t.namePlaceholder} required className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">{t.emailLabel}</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t.emailPlaceholder} required className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">{t.phoneLabel}</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t.phonePlaceholder} className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">{t.messageLabel}</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder={t.messagePlaceholder} rows={5} required className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300">
                <Send className="w-5 h-5" />
                {t.submitBtn}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-8 border border-sage-100">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">{t.infoTitle}</h3>
              <div className="mb-6 pb-6 border-b border-sage-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-sage-100 rounded-lg flex items-center justify-center flex-shrink-0"><Mail className="w-6 h-6 text-teal-600" /></div>
                  <div><h4 className="text-lg font-semibold text-gray-900 mb-1">{t.emailHeading}</h4><a href={`mailto:${t.email}`} className="text-teal-600 hover:text-teal-700 font-medium transition-colors">{t.email}</a></div>
                </div>
              </div>
              <div className="mb-6 pb-6 border-b border-sage-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-sage-100 rounded-lg flex items-center justify-center flex-shrink-0"><Phone className="w-6 h-6 text-teal-600" /></div>
                  <div><h4 className="text-lg font-semibold text-gray-900 mb-1">{t.phoneHeading}</h4><a href={`tel:${t.phone}`} className="text-teal-600 hover:text-teal-700 font-medium transition-colors">{t.phone}</a></div>
                </div>
              </div>
              <div className="mb-6 pb-6 border-b border-sage-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-sage-100 rounded-lg flex items-center justify-center flex-shrink-0"><MessageCircle className="w-6 h-6 text-teal-600" /></div>
                  <div><h4 className="text-lg font-semibold text-gray-900 mb-1">{t.whatsappHeading}</h4><a href={`https://wa.me/${t.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">{t.whatsapp}</a></div>
                </div>
              </div>
              <div className="mb-6 pb-6 border-b border-sage-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-sage-100 rounded-lg flex items-center justify-center flex-shrink-0"><MapPin className="w-6 h-6 text-teal-600" /></div>
                  <div><h4 className="text-lg font-semibold text-gray-900 mb-1">{t.locationHeading}</h4><p className="text-gray-600 font-medium">{t.location}</p></div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-sage-100 rounded-lg flex items-center justify-center flex-shrink-0"><Clock className="w-6 h-6 text-teal-600" /></div>
                  <div><h4 className="text-lg font-semibold text-gray-900 mb-1">{t.hoursHeading}</h4><p className="text-gray-600 font-medium">{t.hours}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="h-96 bg-gradient-to-br from-sage-100 to-teal-100 rounded-2xl overflow-hidden shadow-lg border border-sage-200">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📍</div>
                <p className="text-sage-700 font-semibold text-xl">{t.mapPlaceholder}</p>
                <p className="text-sage-600 text-sm mt-2">Google Maps embed coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
