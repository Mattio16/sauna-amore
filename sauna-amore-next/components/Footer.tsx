'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { Instagram, Facebook, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useLang();

  return (
    <footer className="bg-[#1B4332] text-[#F5F1E8]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#F5F1E8] mb-2">
                Sauna Amore
              </h2>
              <p className="text-sm text-[#D4C5B9] leading-relaxed">
                {t.footer?.tagline || 'Benessere nordico nel cuore delle Marche. Saune finlandesi premium, bagni di ghiaccio e esperienze wellness autentiche.'}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="p-2 rounded-full bg-[#2D5A3D] text-[#F5F1E8] hover:bg-[#3D6A4D] transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="p-2 rounded-full bg-[#2D5A3D] text-[#F5F1E8] hover:bg-[#3D6A4D] transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://wa.me/39"
                aria-label="WhatsApp"
                className="p-2 rounded-full bg-[#2D5A3D] text-[#F5F1E8] hover:bg-[#3D6A4D] transition-colors duration-300"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="text-lg font-semibold text-[#F5F1E8] mb-6 uppercase tracking-wide">
              {t.footer?.products || 'Prodotti'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/prodotti/saune"
                  className="text-[#D4C5B9] hover:text-[#F5F1E8] transition-colors duration-300"
                >
                  {t.footer?.saunas || 'Saune'}
                </Link>
              </li>
              <li>
                <Link
                  href="/prodotti/vasche"
                  className="text-[#D4C5B9] hover:text-[#F5F1E8] transition-colors duration-300"
                >
                  {t.footer?.baths || 'Vasche'}
                </Link>
              </li>
              <li>
                <Link
                  href="/prodotti/bagni-ghiaccio"
                  className="text-[#D4C5B9] hover:text-[#F5F1E8] transition-colors duration-300"
                >
                  {t.footer?.iceBaths || 'Bagni di Ghiaccio'}
                </Link>
              </li>
              <li>
                <Link
                  href="/prodotti/noleggio"
                  className="text-[#D4C5B9] hover:text-[#F5F1E8] transition-colors duration-300"
                >
                  {t.footer?.rental || 'Noleggio Eventi'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-semibold text-[#F5F1E8] mb-6 uppercase tracking-wide">
              {t.footer?.company || 'Azienda'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-[#D4C5B9] hover:text-[#F5F1E8] transition-colors duration-300"
                >
                  {t.footer?.about || 'Chi Siamo'}
                </Link>
              </li>
              <li>
                <Link
                  href="/contatti"
                  className="text-[#D4C5B9] hover:text-[#F5F1E8] transition-colors duration-300"
                >
                  {t.footer?.contact || 'Contatti'}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[#D4C5B9] hover:text-[#F5F1E8] transition-colors duration-300"
                >
                  {t.footer?.privacy || 'Privacy Policy'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#F5F1E8] mb-6 uppercase tracking-wide">
              {t.footer?.contactInfo || 'Contatti'}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-[#D4C5B9] flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@saunaamore.it"
                  className="text-[#D4C5B9] hover:text-[#F5F1E8] transition-colors duration-300"
                >
                  info@saunaamore.it
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-[#D4C5B9] flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+39XXXXXXXXXX"
                  className="text-[#D4C5B9] hover:text-[#F5F1E8] transition-colors duration-300"
                >
                  +39 XXX XXX XXXX
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-[#D4C5B9] flex-shrink-0 mt-0.5" />
                <span className="text-[#D4C5B9]">Le Marche, Italia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright */}
      <div className="border-t border-[#2D5A3D]">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-[#B8ADAA]">
            © 2026 Sauna Amore. {t.footer?.allRightsReserved || 'Tutti i diritti riservati.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
