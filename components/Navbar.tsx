'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/i18n';

interface NavbarProps {
  onToggleLang?: () => void;
}

const Navbar = ({ onToggleLang }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang } = useLang();

  const navItems = [
    { href: '/saunas', labelIt: 'Saune', labelEn: 'Saunas' },
    { href: '/hot-tubs', labelIt: 'Vasche', labelEn: 'Hot Tubs' },
    { href: '/ice-baths', labelIt: 'Bagni di Ghiaccio', labelEn: 'Ice Baths' },
    { href: '/about', labelIt: 'Chi Siamo', labelEn: 'About' },
    { href: '/contact', labelIt: 'Contatti', labelEn: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  const label = lang === 'it' ? 'labelIt' : 'labelEn';

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
                {item[label as keyof typeof item]}
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

          {/* Right side: Language toggle & Mobile menu button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleLang}
              className="p-2 rounded-lg text-sage-900 hover:bg-cream/50 hover:text-teal-700 transition-all duration-200"
              aria-label="Toggle language"
            >
              <Globe size={20} />
              <span className="ml-1 text-xs font-semibold">
                {lang.toUpperCase()}
              </span>
            </button>

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
                      {item[label as keyof typeof item]}
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
