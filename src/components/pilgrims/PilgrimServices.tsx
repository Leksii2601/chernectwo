'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TextModal } from '../ui/TextModal';
import { ChevronRight, Info } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle?: string; // For duration like "1.5 год"
  image: string;
  fullTitle: string;
  description: string; // Rich text or long string
  details?: string[]; // Bullet points
}

const transportServices: ServiceItem[] = [
  {
    id: 'public-transport',
    title: 'Громадський транспорт',
    subtitle: 'Маршрутне таксі',
    image: '/media/public_transport.jpg',
    fullTitle: 'Доїзд громадським транспортом',
    description: 'З міста Луцька курсує зручне маршрутне таксі. Відправлення здійснюється регулярно з центру міста та автостанцій.',
    details: [
      'Маршрут №149 (Луцьк - Жидичин - Кульчин)',
      'Відправлення: АС-2 та зупинка ЦУМ',
      'Інтервал руху: кожні 15-20 хвилин',
      'Час в дорозі: ~20-30 хвилин'
    ]
  },
  {
    id: 'car',
    title: 'Власним авто',
    subtitle: 'GPS навігація',
    image: '/media/by_your_transport.jpg',
    fullTitle: 'Доїзд власним автомобілем',
    description: 'Монастир знаходиться всього за 5 км від міста Луцька. Дорога асфальтована та у гарному стані. На території є парковка.',
    details: [
      'Координати GPS: 50.7856° N, 25.3214° E',
      'Траса: Луцьк - Ковель (поворот на Жидичин)',
      'Безкоштовна парковка біля головного входу',
      'Є можливість заїзд для автобусів'
    ]
  },
  {
    id: 'social-bus',
    title: 'Соціальний автобус',
    subtitle: 'Недільні рейси',
    image: '/media/social_transport.jpg',
    fullTitle: 'Монастирський автобус',
    description: 'Для зручності паломників у недільні та святкові дні курсує спеціальний безкоштовний автобус на богослужіння.',
    details: [
      'Щонеділі о 8:40 з с. Прилуцьке',
      'Зупинки: 40-й квартал, Троянда, Промінь',
      'Прибуття в монастир о 9:30',
      'Зворотній рейс після Літургії'
    ]
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
    ]
  },
  {
    id: 'excursion-basic',
    title: 'БАЗОВА',
    subtitle: '2.5 год',
    image: '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_10.jpg',
    fullTitle: 'Базова екскурсія',
    description: 'Розширена програма, що включає відвідування підземель та Домового храму. Ідеально підходить для паломницьких груп, які хочуть глибше зануритися в атмосферу.',
    details: [
      'Все, що в оглядовій екскурсії',
      'Відвідування монастирських печер',
      'Домовий храм прп. Миколи Святоші',
      'Монастирський сад'
    ]
  },
  {
    id: 'excursion-full',
    title: 'ПОВНА',
    subtitle: '3.5-4 год',
    image: '/media/excurison_full.jpg',
    fullTitle: 'Повна екскурсія з трапезою',
    description: 'Найповніша програма перебування. Включає відвідування скитів монастиря, спілкування з братією та монастирську трапезу.',
    details: [
      'Повна екскурсія територією та храмами',
      'Відвідування скита Святого Духа',
      'Монастирська трапеза',
      'Бесіда з духівником (за бажанням)'
    ]
  }
];

export function PilgrimServices() {
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);

  const openModal = (item: ServiceItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const ParallaxHeader = ({ title, image }: { title: string, image: string }) => (
    <div
      className="w-full h-[250px] md:h-[350px] bg-fixed bg-center bg-cover flex items-center justify-center relative shadow-inner"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <h2 className="relative z-10 text-white font-montserrat text-2xl md:text-5xl uppercase tracking-widest text-center px-4 drop-shadow-lg">
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
      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors duration-300" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 gap-4">
        {/* Title Box - Fixed Size & Minimal Blur */}
        <div className="border border-white/15 backdrop-blur-[1px] bg-black/5 group-hover:bg-white/5 transition-all duration-500 w-[220px] h-[70px] md:w-[280px] md:h-[90px] flex items-center justify-center p-4">
          <h3 className="text-white font-montserrat font-bold text-base md:text-xl uppercase tracking-[0.15em] text-center leading-tight drop-shadow-md">
            {item.title}
          </h3>
        </div>

        {/* Subtitle - Outside the box */}
        {item.subtitle && (
          <p className="text-white/90 font-sans text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase drop-shadow-lg">
            {item.subtitle}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section className="bg-white pb-24">

      {/* Transport Section */}
      <ParallaxHeader title={t('pilgrims.transport_title')} image="/media/pilgrim_info.jpg" />

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px] my-16 md:my-24">
        <div className="flex justify-center mb-10 md:mb-16">
          <div className="border border-gray-200 px-10 py-4 flex items-center justify-center min-w-[280px]">
            <span className="font-montserrat text-gray-400 uppercase tracking-[0.3em] text-sm md:text-base font-bold leading-none">
              {t('pilgrims.transport_options')}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {transportServices.map(item => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Excursion Section */}
      <ParallaxHeader title={t('pilgrims.excursions_title')} image="/media/piligrim_excursion.jpg" />

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px] my-16 md:my-24">
        <div className="flex justify-center mb-10 md:mb-16">
          <div className="border border-gray-200 px-10 py-4 flex items-center justify-center min-w-[280px]">
            <span className="font-montserrat text-gray-400 uppercase tracking-[0.3em] text-sm md:text-base font-bold leading-none">
              {t('pilgrims.excursion_options')}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {excursionServices.map(item => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>


      {/* Localized TextModal */}
      <TextModal
        isOpen={!!selectedItem}
        onClose={closeModal}
        title={selectedItem?.fullTitle || ''}
      >
        {selectedItem && (
          <div className="space-y-12 py-8">
            {/* Intro Description */}
            <div className="mb-12">
              <p className="text-gray-700 leading-relaxed font-sans text-lg md:text-xl whitespace-pre-line border-l-4 border-amber-500 pl-6 italic">
                {selectedItem.description}
              </p>
            </div>

            {/* Details Box */}
            {selectedItem.details && selectedItem.details.length > 0 && (
              <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 space-y-6">
                <h3 className="font-montserrat font-bold text-2xl text-amber-900 border-b border-amber-200 pb-4 flex items-center gap-3">
                  <Info className="w-6 h-6" />
                  {t('pilgrims.details')}
                </h3>
                <div className="space-y-4">
                  {selectedItem.details.map((detail, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white hidden md:flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                      <p className="text-amber-800 text-lg leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optional: Add "Book Now" or "Contact" button if it's an excursion */}
            {selectedItem.id.startsWith('excursion') && (
              <div className="pt-8 border-t border-gray-100 flex justify-end">
                <Link
                  href="/ua/contacts"
                  className="group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-600/20"
                >
                  <span className="font-montserrat font-bold tracking-widest uppercase text-sm">
                    {t('pilgrims.book_button')}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}
      </TextModal>
    </section>
  );
}
