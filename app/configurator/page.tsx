'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLang } from '@/lib/i18n';
import { saunas, hottubs, icebaths, saunaHeaters, hottubHeaters, saunaAccessories, hottubAccessories, icebathAccessories, Product, Heater, Accessory } from '@/lib/products';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { ArrowLeft, Info, X, Zap, Flame, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoModalContent {
  name: string;
  price: number;
  image?: string;
  desc?: string;
  specs?: string;
}

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const lang = useLang();

  const productId = searchParams.get('product') || 'S16E';
  const productType = (searchParams.get('type') || 'sauna') as 'sauna' | 'hottub' | 'icebath';

  // State management
  const [delivery, setDelivery] = useState('flatpack');
  const [selectedHeater, setSelectedHeater] = useState<string | null>(null);
  const [selectedStove, setSelectedStove] = useState<string | null>(null);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState('RAL5010');
  const [activeInfoModal, setActiveInfoModal] = useState<InfoModalContent | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Get product based on type
  const getProduct = () => {
    switch (productType) {
      case 'sauna':
        return saunas.find(p => p.id === productId);
      case 'hottub':
        return hottubs.find(p => p.id === productId);
      case 'icebath':
        return icebaths.find(p => p.id === productId);
      default:
        return saunas.find(p => p.id === productId);
    }
  };

  const product = getProduct();
  if (!product) return <div className="p-8 text-center">{lang === 'en' ? 'Product not found' : 'Prodotto non trovato'}</div>;

  // Carousel handlers
  const images = product.images || [];
  const nextImage = () => {
    if (images.length > 0) setCarouselIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    if (images.length > 0) setCarouselIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Get heater categories
  const getHeaters = () => {
    if (productType === 'sauna') {
      const heaters = saunaHeaters.filter(h => product.compatibleHeaters?.includes(h.id));
      return {
        electric: heaters.filter(h => h.type === 'electric'),
        wood: heaters.filter(h => h.type === 'wood'),
      };
    }
    return { electric: [], wood: [] };
  };

  // Get accessories
  const getAccessories = () => {
    switch (productType) {
      case 'sauna':
        return saunaAccessories.filter(a => product.compatibleAccessories?.includes(a.id));
      case 'hottub':
        return hottubAccessories.filter(a => product.compatibleAccessories?.includes(a.id));
      case 'icebath':
        return icebathAccessories.filter(a => product.compatibleAccessories?.includes(a.id));
      default:
        return [];
    }
  };

  // Calculate price
  const calculatePrice = () => {
    let total = product.price || 0;

    // Delivery mode
    if (productType === 'sauna' && delivery === 'assembled' && product.assembledPrice) {
      total = product.assembledPrice;
    }

    // Selected heater
    if (selectedHeater) {
      const heater = saunaHeaters.find(h => h.id === selectedHeater);
      if (heater) total += heater.price;
    }

    // Selected stove
    if (selectedStove) {
      const stove = hottubHeaters.find(s => s.id === selectedStove);
      if (stove) total += stove.price;
    }

    // Selected accessories
    selectedAccessories.forEach((accId) => {
      const acc = [...saunaAccessories, ...hottubAccessories, ...icebathAccessories].find(a => a.id === accId);
      if (acc) total += acc.price;
    });

    return total;
  };

  const heaters = getHeaters();
  const accessories = getAccessories();
  const totalPrice = calculatePrice();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFBF7] to-[#F5F1ED]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8DDD4]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-[#2D5A4A] hover:text-[#1A3A2A] transition-colors">
            <ArrowLeft size={20} />
            <span>{lang === 'en' ? 'Back' : 'Torna Indietro'}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Carousel */}
          <ScrollReveal>
            <div className="bg-white rounded-lg shadow-sm border border-[#E8DDD4] overflow-hidden mb-8">
              <div className="relative aspect-square bg-[#F5F1ED] flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={carouselIndex}
                    src={product.images?.[carouselIndex] || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {(product.images?.length || 0) > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronDown size={20} className="rotate-90 text-[#2D5A4A]" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronDown size={20} className="-rotate-90 text-[#2D5A4A]" />
                    </button>
                  </>
                )}

                {/* Image indicator */}
                {(product.images?.length || 0) > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.images?.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCarouselIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === carouselIndex ? 'bg-[#2D5A4A]' : 'bg-[#C9BFAC]'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Product Info */}
          <ScrollReveal>
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-[#2D5A4A] mb-2">{product.name}</h1>
              <p className="text-[#6B6B6B] text-lg mb-4">{product.description}</p>

              {product.dimensions && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-t border-b border-[#E8DDD4]">
                  {product.dimensions.width && (
                    <div>
                      <p className="text-sm text-[#999] uppercase tracking-wide">{lang === 'en' ? 'Width' : 'Larghezza'}</p>
                      <p className="text-lg font-semibold text-[#2D5A4A]">{product.dimensions.width} cm</p>
                    </div>
                  )}
                  {product.dimensions.depth && (
                    <div>
                      <p className="text-sm text-[#999] uppercase tracking-wide">{lang === 'en' ? 'Depth' : 'Profondità'}</p>
                      <p className="text-lg font-semibold text-[#2D5A4A]">{product.dimensions.depth} cm</p>
                    </div>
                  )}
                  {product.dimensions.height && (
                    <div>
                      <p className="text-sm text-[#999] uppercase tracking-wide">{lang === 'en' ? 'Height' : 'Altezza'}</p>
                      <p className="text-lg font-semibold text-[#2D5A4A]">{product.dimensions.height} cm</p>
                    </div>
                  )}
                  {product.capacity && (
                    <div>
                      <p className="text-sm text-[#999] uppercase tracking-wide">{lang === 'en' ? 'Capacity' : 'Capienza'}</p>
                      <p className="text-lg font-semibold text-[#2D5A4A]">{product.capacity} {lang === 'en' ? 'persons' : 'persone'}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Configuration Options */}
          <div className="space-y-8">
            {/* Delivery Mode (Sauna only) */}
            {productType === 'sauna' && (
              <ScrollReveal>
                <div className="bg-white rounded-lg shadow-sm border border-[#E8DDD4] p-6">
                  <h2 className="text-xl font-bold text-[#2D5A4A] mb-4">{lang === 'en' ? 'Delivery Mode' : 'Modalità di Consegna'}</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-4 p-3 rounded-lg border-2 border-transparent hover:border-[#A8D5CC] cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="delivery"
                        value="flatpack"
                        checked={delivery === 'flatpack'}
                        onChange={(e) => setDelivery(e.target.value)}
                        className="w-5 h-5"
                      />
                      <span className="font-medium text-[#2D5A4A]">{lang === 'en' ? 'Flat-pack' : 'Kit di Montaggio'}</span>
                    </label>
                    <label className="flex items-center gap-4 p-3 rounded-lg border-2 border-transparent hover:border-[#A8D5CC] cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="delivery"
                        value="assembled"
                        checked={delivery === 'assembled'}
                        onChange={(e) => setDelivery(e.target.value)}
                        className="w-5 h-5"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-[#2D5A4A]">{lang === 'en' ? 'Fully Assembled' : 'Completamente Montato'}</span>
                        {product.assembledPrice && (
                          <span className="ml-2 text-sm text-[#6B6B6B]">+€ {(product.assembledPrice - product.price).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Heater Selection (Sauna only) */}
            {productType === 'sauna' && (heaters.electric.length > 0 || heaters.wood.length > 0) && (
              <ScrollReveal>
                <div className="bg-white rounded-lg shadow-sm border border-[#E8DDD4] p-6">
                  <h2 className="text-xl font-bold text-[#2D5A4A] mb-6">{lang === 'en' ? 'Heater Selection' : 'Scelta della Stufa'}</h2>

                  {/* Electric Heaters */}
                  {heaters.electric.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8DDD4]">
                        <Zap size={20} className="text-[#D4AF37]" />
                        <h3 className="font-semibold text-[#2D5A4A]">{lang === 'en' ? 'Electric' : 'Elettriche'}</h3>
                      </div>
                      <div className="space-y-3">
                        {heaters.electric.map((heater) => (
                          <div key={heater.id} className="flex items-center gap-3 p-3 rounded-lg border-2 border-transparent hover:border-[#A8D5CC] transition-colors">
                            <input
                              type="radio"
                              name="heater"
                              value={heater.id}
                              checked={selectedHeater === heater.id}
                              onChange={(e) => setSelectedHeater(e.target.value)}
                              className="w-5 h-5"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-[#2D5A4A]">{heater.name}</p>
                              {heater.specs && <p className="text-sm text-[#999]">{heater.specs}</p>}
                            </div>
                            <span className="text-sm font-semibold text-[#2D5A4A]">+€ {heater.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            <button
                              onClick={() => setActiveInfoModal({
                                name: heater.name,
                                price: heater.price,
                                image: heater.image,
                                desc: heater.description,
                                specs: heater.specs,
                              })}
                              className="p-2 hover:bg-[#F5F1ED] rounded-full transition-colors"
                              aria-label="More info"
                            >
                              <Info size={18} className="text-[#999]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Wood-Fired Heaters */}
                  {heaters.wood.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8DDD4]">
                        <Flame size={20} className="text-[#C85A3A]" />
                        <h3 className="font-semibold text-[#2D5A4A]">{lang === 'en' ? 'Wood-Fired' : 'A Legna'}</h3>
                      </div>
                      <div className="space-y-3">
                        {heaters.wood.map((heater) => (
                          <div key={heater.id} className="flex items-center gap-3 p-3 rounded-lg border-2 border-transparent hover:border-[#A8D5CC] transition-colors">
                            <input
                              type="radio"
                              name="heater"
                              value={heater.id}
                              checked={selectedHeater === heater.id}
                              onChange={(e) => setSelectedHeater(e.target.value)}
                              className="w-5 h-5"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-[#2D5A4A]">{heater.name}</p>
                              {heater.specs && <p className="text-sm text-[#999]">{heater.specs}</p>}
                            </div>
                            <span className="text-sm font-semibold text-[#2D5A4A]">+€ {heater.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            <button
                              onClick={() => setActiveInfoModal({
                                name: heater.name,
                                price: heater.price,
                                image: heater.image,
                                desc: heater.description,
                                specs: heater.specs,
                              })}
                              className="p-2 hover:bg-[#F5F1ED] rounded-full transition-colors"
                              aria-label="More info"
                            >
                              <Info size={18} className="text-[#999]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* Stove Selection (Hot Tub only) */}
            {productType === 'hottub' && hottubHeaters.length > 0 && (
              <ScrollReveal>
                <div className="bg-white rounded-lg shadow-sm border border-[#E8DDD4] p-6">
                  <h2 className="text-xl font-bold text-[#2D5A4A] mb-6">{lang === 'en' ? 'Stove Selection' : 'Scelta della Stufa'}</h2>
                  <div className="space-y-3">
                    {hottubHeaters.map((stove) => (
                      <div key={stove.id} className="flex items-center gap-3 p-3 rounded-lg border-2 border-transparent hover:border-[#A8D5CC] transition-colors">
                        <input
                          type="radio"
                          name="stove"
                          value={stove.id}
                          checked={selectedStove === stove.id}
                          onChange={(e) => setSelectedStove(e.target.value)}
                          className="w-5 h-5"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#2D5A4A]">{stove.name}</p>
                          {stove.specs && <p className="text-sm text-[#999]">{stove.specs}</p>}
                        </div>
                        <span className="text-sm font-semibold text-[#2D5A4A]">+€ {stove.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <button
                          onClick={() => setActiveInfoModal({
                            name: stove.name,
                            price: stove.price,
                            image: stove.image,
                            desc: stove.description,
                            specs: stove.specs,
                          })}
                          className="p-2 hover:bg-[#F5F1ED] rounded-full transition-colors"
                          aria-label="More info"
                        >
                          <Info size={18} className="text-[#999]" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Accessories */}
            {accessories.length > 0 && (
              <ScrollReveal>
                <div className="bg-white rounded-lg shadow-sm border border-[#E8DDD4] p-6">
                  <h2 className="text-xl font-bold text-[#2D5A4A] mb-6">{lang === 'en' ? 'Accessories' : 'Accessori'}</h2>
                  <div className="space-y-3">
                    {accessories.map((accessory) => (
                      <div key={accessory.id} className="flex items-center gap-3 p-3 rounded-lg border-2 border-transparent hover:border-[#A8D5CC] transition-colors">
                        <input
                          type="checkbox"
                          id={`acc-${accessory.id}`}
                          checked={selectedAccessories.includes(accessory.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAccessories([...selectedAccessories, accessory.id]);
                            } else {
                              setSelectedAccessories(selectedAccessories.filter(a => a !== accessory.id));
                            }
                          }}
                          className="w-5 h-5"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#2D5A4A]">{accessory.name}</p>
                          {accessory.specs && <p className="text-sm text-[#999]">{accessory.specs}</p>}
                        </div>
                        <span className="text-sm font-semibold text-[#2D5A4A]">+€ {accessory.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <button
                          onClick={() => setActiveInfoModal({
                            name: accessory.name,
                            price: accessory.price,
                            image: accessory.image,
                            desc: accessory.description,
                            specs: accessory.specs,
                          })}
                          className="p-2 hover:bg-[#F5F1ED] rounded-full transition-colors"
                          aria-label="More info"
                        >
                          <Info size={18} className="text-[#999]" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>

        {/* Sticky Price Summary */}
        <ScrollReveal>
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-lg shadow-sm border border-[#E8DDD4] p-6">
              <h3 className="text-lg font-bold text-[#2D5A4A] mb-6">{lang === 'en' ? 'Price Summary' : 'Riepilogo Prezzo'}</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-[#E8DDD4]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">{lang === 'en' ? 'Base Price' : 'Prezzo Base'}</span>
                  <span className="font-semibold text-[#2D5A4A]">€ {product.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                {delivery === 'assembled' && product.assembledPrice && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">{lang === 'en' ? 'Assembled' : 'Montaggio'}</span>
                    <span className="font-semibold text-[#2D5A4A]">€ {(product.assembledPrice - product.price).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}

                {selectedHeater && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">{saunaHeaters.find(h => h.id === selectedHeater)?.name}</span>
                    <span className="font-semibold text-[#2D5A4A]">€ {saunaHeaters.find(h => h.id === selectedHeater)?.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}

                {selectedStove && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">{hottubHeaters.find(s => s.id === selectedStove)?.name}</span>
                    <span className="font-semibold text-[#2D5A4A]">€ {hottubHeaters.find(s => s.id === selectedStove)?.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}

                {selectedAccessories.map((accId) => {
                  const acc = [...saunaAccessories, ...hottubAccessories, ...icebathAccessories].find(a => a.id === accId);
                  return acc ? (
                    <div key={accId} className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">{acc.name}</span>
                      <span className="font-semibold text-[#2D5A4A]">€ {acc.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  ) : null;
                })}
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-[#2D5A4A] font-semibold">{lang === 'en' ? 'Total' : 'Totale'}</span>
                <span className="text-4xl font-bold text-[#2D5A4A]">€ {totalPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-[#2D5A4A] to-[#1A3A2A] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow mb-3">
                {lang === 'en' ? 'Request Quote' : 'Richiedi Preventivo'}
              </button>

              <Link href="/" className="block text-center text-[#2D5A4A] hover:text-[#1A3A2A] text-sm font-medium">
                {lang === 'en' ? 'Continue Shopping' : 'Continua lo Shopping'}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {activeInfoModal && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveInfoModal(null)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="max-w-2xl mx-auto p-6 sm:p-8">
                {/* Close button */}
                <button
                  onClick={() => setActiveInfoModal(null)}
                  className="absolute top-6 right-6 p-2 hover:bg-[#F5F1ED] rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} className="text-[#2D5A4A]" />
                </button>

                {/* Image */}
                {activeInfoModal.image && (
                  <div className="mb-6 aspect-video rounded-lg overflow-hidden bg-[#F5F1ED]">
                    <img src={activeInfoModal.image} alt={activeInfoModal.name} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Content */}
                <h2 className="text-3xl font-bold text-[#2D5A4A] mb-2">{activeInfoModal.name}</h2>
                <p className="text-2xl font-bold text-[#D4AF37] mb-6">€ {activeInfoModal.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

                {activeInfoModal.desc && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#2D5A4A] mb-2">{lang === 'en' ? 'Description' : 'Descrizione'}</h3>
                    <p className="text-[#6B6B6B] leading-relaxed">{activeInfoModal.desc}</p>
                  </div>
                )}

                {activeInfoModal.specs && (
                  <div>
                    <h3 className="font-semibold text-[#2D5A4A] mb-2">{lang === 'en' ? 'Specifications' : 'Specifiche'}</h3>
                    <p className="text-[#6B6B6B] leading-relaxed">{activeInfoModal.specs}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConfiguratorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center">{/* Loading spinner */}</div>}>
      <ConfiguratorContent />
    </Suspense>
  );
}
