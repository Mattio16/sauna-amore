'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang, Lang, LANGUAGES } from '@/lib/i18n';

interface NavbarProps {
  onSetLang?: (lang: Lang) => void;
}

const Navbar = ({ onSetLang }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lang = useLang();

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  const navLabels: Record<Lang, { saunas: string; hotTubs: string; iceBaths: string; about: string; contact: string }> = {
    it: { saunas: 'Saune', hotTubs: 'Vasche', iceBaths: 'Bagni di Ghiaccio', about: 'Chi Siamo', contact: 'Contatti' },
    en: { saunas: 'Saunas', hotTubs: 'Hot Tubs', iceBaths: 'Ice Baths', about: 'About', contact: 'Contact' },
    de: { saunas: 'Saunen', hotTubs: 'Whirlpools', iceBaths: 'Eisbäder', about: 'Über Uns', contact: 'Kontakt' },
    fr: { saunas: 'Saunas', hotTubs: 'Bains', iceBaths: 'Bains de Glace', about: 'À Propos', contact: 'Contact' },
    es: { saunas: 'Saunas', hotTubs: 'Jacuzzis', iceBaths: 'Baños de Hielo', about: 'Nosotros', contact: 'Contacto' },
    pt: { saunas: 'Saunas', hotTubs: 'Banheiras', iceBaths: 'Banhos de Gelo', about: 'Sobre Nós', contact: 'Contacto' },
  };

  const labels = navLabels[lang];

  const navItems = [
    { href: '/saunas', label: labels.saunas },
    { href: '/hot-tubs', label: labels.hotTubs },
    { href: '/ice-baths', label: labels.iceBaths },
    { href: '/about', label: labels.about },
    { href: '/contact', label: labels.contact },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/90 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-display text-3xl font-bold text-teal-900 hover:text-teal-700 transition-colors duration-200">
              Sauna Amore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-teal-700'
                    : 'text-sage-900 hover:text-teal-700'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side: Language dropdown & Mobile menu button */}
          <div className="flex items-center gap-4">
            {/* Language Dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sage-900 hover:bg-cream/50 hover:text-teal-700 transition-all duration-200"
                aria-label="Select language"
              >
                <Globe size={18} />
                <span className="text-sm font-semibold">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E8DDD4] overflow-hidden z-50"
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          onSetLang?.(l.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 ${
                          lang === l.code
                            ? 'bg-[#A8D5CC]/20 text-teal-800 font-semibold'
                            : 'text-[#2D2D2D] hover:bg-[#F5F1ED]'
                        }`}
                      >
                        <span className="text-lg">{l.flag}</span>
                        <span>{l.name}</span>
                        {lang === l.code && (
                          <span className="ml-auto text-teal-600 text-xs">&#10003;</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-sage-900 hover:bg-cream/50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-sage-200"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 bg-cream/95 backdrop-blur-lg">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-teal-700/10 text-teal-700'
                          : 'text-sage-900 hover:bg-sage-100/50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
