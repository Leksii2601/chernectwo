'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle?: string; // For duration like "1.5 год"
  image: string;
  fullTitle: string;
  description: string; // Rich text or long string
  gallery?: string[];
  details?: string[]; // Bullet points
}

const transportServices: ServiceItem[] = [
  {
    id: 'public-transport',
    title: 'Громадський транспорт',
    subtitle: 'Маршрутне таксі',
    image: '/media/contacts.jpg',
    fullTitle: 'Доїзд громадським транспортом',
    description: 'З міста Луцька курсує зручне маршрутне таксі. Відправлення здійснюється регулярно з центру міста та автостанцій.',
    details: [
      'Маршрут №149 (Луцьк - Жидичин - Кульчин)',
      'Відправлення: АС-2 та зупинка ЦУМ',
      'Інтервал руху: кожні 15-20 хвилин',
      'Час в дорозі: ~20-30 хвилин'
    ],
    gallery: ['/media/contacts.jpg']
  },
  {
    id: 'car',
    title: 'Власним авто',
    subtitle: 'GPS навігація',
    image: '/media/piligrims.jpg',
    fullTitle: 'Доїзд власним автомобілем',
    description: 'Монастир знаходиться всього за 5 км від міста Луцька. Дорога асфальтована та у гарному стані. На території є парковка.',
    details: [
      'Координати GPS: 50.7856° N, 25.3214° E',
      'Траса: Луцьк - Ковель (поворот на Жидичин)',
      'Безкоштовна парковка біля головного входу',
      'Є можливість заїзд для автобусів'
    ],
    gallery: ['/media/piligrims.jpg']
  },
  {
    id: 'social-bus',
    title: 'Соціальний автобус',
    subtitle: 'Недільні рейси',
    image: '/media/socialInitiatives/charity_dinner_2.jpg',
    fullTitle: 'Монастирський автобус',
    description: 'Для зручності паломників у недільні та святкові дні курсує спеціальний безкоштовний автобус на богослужіння.',
    details: [
      'Щонеділі о 8:40 з с. Прилуцьке',
      'Зупинки: 40-й квартал, Троянда, Промінь',
      'Прибуття в монастир о 9:30',
      'Зворотній рейс після Літургії'
    ],
    gallery: ['/media/socialInitiatives/charity_dinner_2.jpg']
  }
];

const excursionServices: ServiceItem[] = [
  {
    id: 'excursion-overview',
    title: 'ОГЛЯДОВА',
    subtitle: '1-1.5 год',
    image: '/media/history.jpg',
    fullTitle: 'Оглядова екскурсія',
    description: 'Коротка подорож історією обителі. Ви відвідаєте головний Свято-Миколаївський храм, дізнаєтесь про чудотворну ікону та основні віхи історії монастиря.',
    details: [
      'Історія заснування монастиря',
      'Свято-Миколаївський храм',
      'Чудотворна ікона "Жидичинська"',
      'Дзвіниця'
    ],
    gallery: ['/media/history.jpg', '/media/gallery.jpg']
  },
  {
    id: 'excursion-basic',
    title: 'БАЗОВА',
    subtitle: '2.5 год',
    image: '/media/church-complex.jpg',
    fullTitle: 'Базова екскурсія',
    description: 'Розширена програма, що включає відвідування підземель та Домового храму. Ідеально підходить для паломницьких груп, які хочуть глибше зануритися в атмосферу.',
    details: [
      'Все, що в оглядовій екскурсії',
      'Відвідування монастирських печер',
      'Домовий храм прп. Миколи Святоші',
      'Монастирський сад'
    ],
    gallery: ['/media/church-complex.jpg', '/media/sketes.jpg']
  },
  {
    id: 'excursion-full',
    title: 'ПОВНА',
    subtitle: '3.5-4 год',
    image: '/media/life.jpg',
    fullTitle: 'Повна екскурсія з трапезою',
    description: 'Найповніша програма перебування. Включає відвідування скитів монастиря, спілкування з братією та монастирську трапезу.',
    details: [
      'Повна екскурсія територією та храмами',
      'Відвідування скита Святого Духа',
      'Монастирська трапеза',
      'Бесіда з духівником (за бажанням)'
    ],
    gallery: ['/media/life.jpg', '/media/socialInitiatives/subbotnik.jpg']
  }
];

export function PilgrimServices() {
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const openModal = (item: ServiceItem) => {
    setSelectedItem(item);
    setIsClosing(false);
    setCurrentGalleryIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedItem(null);
      setIsClosing(false);
      document.body.style.overflow = 'unset';
    }, 200);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItem?.gallery) {
      setCurrentGalleryIndex((prev) => (prev + 1) % selectedItem.gallery!.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItem?.gallery) {
      setCurrentGalleryIndex((prev) => (prev - 1 + selectedItem.gallery!.length) % selectedItem.gallery!.length);
    }
  };


  const ParallaxHeader = ({ title, image }: { title: string, image: string }) => (
    <div
      className="w-full h-[250px] md:h-[350px] bg-fixed bg-center bg-cover flex items-center justify-center relative shadow-inner"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <h2 className="relative z-10 text-white font-montserrat font-bold text-2xl md:text-5xl uppercase tracking-widest text-center px-4 drop-shadow-lg">
        {title}
      </h2>
    </div>
  );

  const ServiceCard = ({ item }: { item: ServiceItem }) => (
    <div
      onClick={() => openModal(item)}
      className="group relative h-[250px] md:h-[300px] w-full overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div className="border border-white/80 p-6 md:p-8 backdrop-blur-[2px] group-hover:bg-white/10 transition-all duration-300 max-w-[90%]">
          <h3 className="text-white font-montserrat font-bold text-xl md:text-2xl uppercase tracking-wider mb-2 drop-shadow-md">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-white/90 font-sans text-sm md:text-lg font-medium tracking-wide uppercase">
              {item.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-white pb-24">

      {/* Transport Section */}
      <ParallaxHeader title="Як дістатися до монастиря" image="/media/piligrims.jpg" />

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px] my-16 md:my-24">
        <div className="text-center mb-10 md:mb-16">
          <span className="font-montserrat text-gray-500 uppercase tracking-[0.2em] text-sm md:text-base">Варіанти доїзду</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {transportServices.map(item => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Excursion Section */}
      <ParallaxHeader title="Замовлення екскурсій" image="/media/history.jpg" />

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px] my-16 md:my-24">
        <div className="text-center mb-10 md:mb-16">
          <span className="font-montserrat text-gray-500 uppercase tracking-[0.2em] text-sm md:text-base">Варіанти екскурсій</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {excursionServices.map(item => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>


      {/* Modal */}
      {selectedItem && (
        <div
          className={`fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-md ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
          onClick={closeModal}
        >
          <div className="min-h-full w-full flex justify-center p-4 py-8">
            <div
              className={`bg-white w-full max-w-4xl rounded-3xl shadow-2xl relative my-auto ${isClosing ? 'animate-modalOut' : 'animate-modalIn'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/90 shadow-lg text-black hover:bg-white hover:scale-110 flex items-center justify-center transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Hero Image */}
              <div className="relative h-[300px] w-full bg-gray-100 rounded-t-3xl overflow-hidden group">
                {selectedItem.gallery && selectedItem.gallery.length > 0 && (
                  <Image
                    src={selectedItem.gallery[currentGalleryIndex]}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="font-montserrat text-3xl md:text-4xl text-white tracking-wide">
                    {selectedItem.fullTitle}
                  </h2>
                </div>

                {/* Gallery Arrows inside header if multiple images */}
                {selectedItem.gallery && selectedItem.gallery.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={prevImage}
                      className="bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-8 md:p-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-montserrat text-2xl mb-4 font-bold border-b pb-2 inline-block border-amber-500">
                      Опис
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-sans text-lg whitespace-pre-line">
                      {selectedItem.description}
                    </p>
                  </div>

                  {selectedItem.details && selectedItem.details.length > 0 && (
                    <div>
                      <h3 className="font-montserrat text-xl mb-4 font-bold">
                        Деталі:
                      </h3>
                      <ul className="space-y-3">
                        {selectedItem.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700 text-lg">
                            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Optional: Add "Book Now" or "Contact" button if it's an excursion */}
                  {selectedItem.id.startsWith('excursion') && (
                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                      <Link
                        href="/contacts"
                        className="bg-black text-white px-8 py-3 rounded-full hover:bg-amber-600 transition-colors font-bold tracking-wider uppercase"
                      >
                        Замовити
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
