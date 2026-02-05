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
    description: 'Завдяки близькості до Луцька (всього 7 км), дістатися до обителі громадським транспортом можна швидко та за доступною ціною.\n\nЗвідки вирушати?\nНайзручніше починати подорож від РЦ «Промінь» (зупинка «Центральна бібліотека для дітей» по вул. Стрілецькій).\n\nОсновні маршрути:\nДо монастиря курсують три регулярні приміські автобуси:\n№ 51 (Луцьк – Кульчин)\n№ 117 (Луцьк – Клепачів)\n№ 149 (Луцьк – Озерце)',
    details: []
  },
  {
    id: 'car',
    title: 'Власним авто',
    subtitle: 'GPS навігація',
    image: '/media/by_your_transport.jpg',
    fullTitle: 'Доїзд власним автомобілем',
    description: 'Доїзд до монастиря на власному транспорті є максимально комфортним. Необхідна інформація:',
    details: [
      'Зручна логістика: Обитель розташована поблизу міжнародної траси М19 (Ковель – Чернівці).',
      'Комфортний доїзд: До самої брами монастиря веде якісна асфальтована дорога.',
      'Паркування: На території облаштована власна безкоштовна стоянка, де ви можете безпечно залишити свій автомобіль.',
      'Як побудувати маршрут: Щоб отримати детальний план поїздки, просто натисніть на кнопку нижче або введіть назву монастиря у Google Maps:',
      'Жидичинський Свято-Миколаївський монастир (ПЦУ) вул. Ковельська, 1, с. Жидичин, Волинська область.'
    ]
  },
  {
    id: 'social-bus',
    title: 'Соціальний автобус',
    subtitle: 'Недільні рейси',
    image: '/media/social_transport.jpg',
    fullTitle: 'Монастирський автобус',
    description: 'Жидичинський Свято-Миколаївський монастир організовує безкоштовний доїзд вірян на богослужіння у недільні та святкові дні. Наш соціальний автобус курсує за визначеним графіком, щоб забезпечити комфортну подорож до обителі та назад.\n\nВажливо: У будні дні довезення не здійснюється – просимо користуватися громадським транспортом (деталі у вкладці «Автобусом»).\n\nДля груп: Ми пропонуємо можливість трансферу з Луцька для організованих паломницьких груп за попереднім замовленням.\n\nКонтакти: +38 (067) 104 22 88',
    details: []
  }
];

const excursionServices: ServiceItem[] = [
  {
    id: 'excursion-overview',
    title: 'ОГЛЯДОВА',
    subtitle: '1-1.5 год',
    image: '/media/history.jpg',
    fullTitle: 'Оглядова екскурсія',
    description: 'Коротка подорож історією тисячолітньої обителі. Ви дізнаєтесь про основні віхи становлення монастиря, відвідаєте головні храми та відчуєте спокій монастирської природи.',
    details: [
      'Свято-Миколаївський храм, чудотворна ікона Миколая',
      'Монастирська усипальниця',
      'Святошинський храм, чудотворна ікона Агапіта',
      'Палац Митрополита',
      'Успенський храм',
      'Велика дзвіниця',
      'Монастирські сади та сквери'
    ]
  },
  {
    id: 'excursion-basic',
    title: 'БАЗОВА',
    subtitle: '2.5 год',
    image: '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_10.jpg',
    fullTitle: 'Базова екскурсія',
    description: 'Під час базової екскурсії ми розкриваємо існуючий та історичний контекст території обителі, відтворюючи картину життя давнього монастиря. Маршрут охоплює діючі храми, віддалені скити, територію стародавнього городища та парк короля Данила.',
    details: [
      'Свято-Миколаївський храм, чудотворна ікона Миколая',
      'Монастирська усипальниця',
      'Святошинський храм, чудотворна ікона Агапіта',
      'Палац Митрополита',
      'Мала дзвіниця',
      'Успенський храм',
      'Велика дзвіниця',
      'Монастирські сади та сквери',
      'Парк короля Данила',
      'Свято-Духівський чоловічий скит',
      'Древньоруське городище “Скудельничі”',
      'Свято-Духівський храм'
    ]
  },
  {
    id: 'excursion-full',
    title: 'ПОВНА',
    subtitle: '3.5-4 год',
    image: '/media/excurison_full.jpg',
    fullTitle: 'Повна екскурсія',
    description: 'Цей маршрут пропонує цілісний погляд на духовне життя Древнього Жидичина, поєднуючи історію центрального монастирського комплексу з тишею віддалених молитовних місць. Особливістю подорожі є візит до Петро-Павлівського жіночого скита, що дозволяє глибше відчути сучасний ритм монастирського життя.',
    details: [
      'Свято-Миколаївський храм, чудотворна ікона Миколая',
      'Монастирська усипальниця',
      'Святошинський храм, чудотворна ікона Агапіта',
      'Палац Митрополита',
      'Мала дзвіниця',
      'Успенський храм',
      'Велика дзвіниця',
      'Монастирські сади та сквери',
      'Парк короля Данила',
      'Свято-Духівський чоловічий скит',
      'Древньоруське городище “Скудельничі”',
      'Свято-Духівський храм',
      'Петро-Павлівський скит',
      'Дзвіниця-меморіал',
      'Петро-Павлівський храм'
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

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

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
      className="group relative h-[180px] md:h-[220px] w-full overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        {/* Uniform Rectangle Box */}
        <div className="border border-white/80 backdrop-blur-[2px] group-hover:bg-white/10 transition-all duration-300 w-[220px] h-[100px] md:w-[280px] md:h-[120px] flex flex-col items-center justify-center p-4">
          <h3 className="text-white font-montserrat font-bold text-base md:text-lg uppercase tracking-wider leading-tight drop-shadow-md">
            {item.id === 'car' ? <>Власним <br /> авто</> : item.title}
          </h3>
          {item.subtitle && (
            <p className="text-white/90 font-sans text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase mt-2 drop-shadow-lg">
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
      <ParallaxHeader title={t('pilgrims.transport_title')} image="/media/pilgrim_info.jpg" />

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px] my-16 md:my-24">
        <div className="text-center mb-10 md:mb-16">
          <span className="font-montserrat text-gray-500 uppercase tracking-[0.2em] text-lg md:text-2xl font-normal">{t('pilgrims.transport_options')}</span>
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
        <div className="text-center mb-10 md:mb-16">
          <span className="font-montserrat text-gray-500 uppercase tracking-[0.2em] text-lg md:text-2xl font-normal">{t('pilgrims.excursion_options')}</span>
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
          <div className="space-y-8 md:space-y-12 py-4 md:py-8">
            {/* Intro Description */}
            <div className="mb-6 md:mb-12">
              <p className="text-gray-700 leading-relaxed font-sans text-base md:text-xl whitespace-pre-line border-l-4 border-amber-500 pl-4 md:pl-6">
                {selectedItem.description.split(/(\+38\s\(0\d{2}\)\s\d{3}\s\d{2}\s\d{2})/).map((part, i) =>
                  part.match(/\+38\s\(0\d{2}\)\s\d{3}\s\d{2}\s\d{2}/) ? (
                    <a
                      key={i}
                      href={`tel:${part.replace(/[\s()]/g, '')}`}
                      className="text-amber-600 font-bold hover:underline decoration-amber-600/30 transition-all font-mono"
                    >
                      {part}
                    </a>
                  ) : (
                    part
                  )
                )}
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
                    <div key={idx} className="flex items-center gap-4">
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

            {/* Special Schedule Table for Social Bus */}
            {selectedItem.id === 'social-bus' && (
              <div className="bg-white border-none md:border border-gray-100 rounded-none md:rounded-3xl overflow-hidden shadow-none md:shadow-sm">
                <div className="bg-amber-50/50 p-4 md:p-6 border-b border-gray-100">
                  <h3 className="font-montserrat font-bold text-lg md:text-xl text-amber-900 flex items-center gap-3">
                    <Info className="w-6 h-6 hidden md:block" />
                    Графік та маршрут руху соціального автобуса (неділя та свята)
                  </h3>
                </div>
                <div className="overflow-x-auto p-2 md:p-6">
                  <table className="w-full text-left border-collapse border border-amber-200 shadow-none md:shadow-sm rounded-none md:rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-amber-100/50">
                        <th className="p-2 md:p-4 font-montserrat text-xs md:text-sm uppercase tracking-wider text-amber-900 border border-amber-200 font-bold">Місце відправки</th>
                        <th className="p-2 md:p-4 font-montserrat text-xs md:text-sm uppercase tracking-wider text-amber-900 border border-amber-200 font-bold text-center">Час</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { place: 'с. Прилуцьке', time: '08:40' },
                        { place: '40-й квартал', time: '09:00' },
                        { place: 'пр. Соборності (магазин «Троянда»)', time: '09:07' },
                        { place: 'РЦ «Промінь» (зупинка «Дитяча бібліотека»)', time: '09:20' },
                        { place: 'Вишків', time: 'за графіком' },
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/30 transition-colors text-sm md:text-base">
                          <td className="p-2 md:p-4 text-gray-700 border border-amber-200 font-medium">{row.place}</td>
                          <td className="p-2 md:p-4 font-bold text-amber-700 border border-amber-200 text-center bg-amber-50/20">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Public Transport Tables & Buttons */}
            {selectedItem.id === 'public-transport' && (
              <div className="space-y-8 md:space-y-12">
                {[
                  {
                    title: 'Відправлення від РЦ «Промінь»',
                    icon: <ArrowRight className="w-6 h-6" />,
                    accentColor: 'amber',
                    data: [
                      {
                        route: '№ 51',
                        times: '06:30, 07:20, 08:35, 09:20, 10:50, 12:10, 15:05, 16:35, 17:40',
                        note: 'Субота/Неділя: 11:30, 15:05'
                      },
                      { route: '№ 117', times: '06:10, 07:25, 10:30, 12:00, 14:15, 15:40, 18:15, 20:40' },
                      { route: '№ 149', times: '07:00, 09:40, 13:00, 17:10, 19:20' },
                    ]
                  },
                  {
                    title: 'З Жидичина (в бік Луцька)',
                    icon: <ArrowLeft className="w-6 h-6" />,
                    accentColor: 'amber',
                    data: [
                      {
                        route: '№ 51',
                        times: '06:55, 08:15, 09:05, 10:10, 11:35, 15:50, 17:05, 18:30',
                        note: 'Субота/Неділя: 12:15, 15:50'
                      },
                      { route: '№ 117', times: '06:55, 08:20, 11:25, 12:55, 15:10, 16:40, 19:05, 21:35' },
                      { route: '№ 149', times: '07:55, 10:20, 13:40, 17:55, 20:00' },
                    ]
                  }
                ].map((section, idx) => (
                  <div key={idx} className="bg-white border border-amber-100 rounded-none md:rounded-3xl overflow-hidden shadow-sm">
                    <div className="bg-amber-600 p-4 md:p-6">
                      <h3 className="font-montserrat font-bold text-lg md:text-xl text-white flex items-center gap-3">
                        {section.icon}
                        {section.title}
                      </h3>
                    </div>
                    <div className="overflow-x-auto p-2 md:p-6">
                      <table className="w-full text-left border-collapse border border-amber-200">
                        <thead>
                          <tr className="bg-amber-50/50">
                            <th className="p-2 md:p-4 font-montserrat text-xs md:text-sm uppercase tracking-wider text-amber-900 border border-amber-200 font-bold w-[100px]">Маршрут</th>
                            <th className="p-2 md:p-4 font-montserrat text-xs md:text-sm uppercase tracking-wider text-amber-900 border border-amber-200 font-bold">Рейси</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.data.map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-amber-50/30 transition-colors text-sm md:text-base">
                              <td className="p-2 md:p-4 font-bold text-amber-900 border border-amber-200 bg-amber-50/5">{row.route}</td>
                              <td className="p-2 md:p-4 text-gray-700 border border-amber-200 leading-relaxed">
                                <div>{row.times}</div>
                                {row.note && (
                                  <div className="mt-1 text-xs md:text-sm font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded inline-block">
                                    {row.note}
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                {/* Tracking Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-0">
                  {[
                    { number: '51', url: 'https://www.eway.in.ua/ua/cities/lutsk/routes/1092' },
                    { number: '117', url: 'https://www.eway.in.ua/ua/cities/lutsk/routes/1094' },
                    { number: '149', url: 'https://www.eway.in.ua/ua/cities/lutsk/routes/1097' },
                  ].map((btn) => (
                    <a
                      key={btn.number}
                      href={btn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-6 bg-white border-2 border-amber-100 rounded-3xl hover:border-amber-500 hover:shadow-lg transition-all group text-center"
                    >
                      <span className="text-amber-900 font-montserrat font-bold text-2xl mb-1 group-hover:scale-110 transition-transform">№ {btn.number}</span>
                      <span className="text-amber-600 text-xs uppercase tracking-widest font-bold">Стежити онлайн</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Optional: Add "Book Now" or "Contact" button if it's an excursion */}
            {selectedItem.id.startsWith('excursion') && (
              <div className="pt-8 border-t border-gray-100 flex justify-end">
                <Link
                  href="/ua/contacts"
                  className="group flex items-center justify-center gap-4 bg-black text-white px-8 py-4 rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-600/20 w-full md:w-auto"
                >
                  <span className="font-montserrat font-bold tracking-widest uppercase text-sm">
                    {t('pilgrims.book_button')}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            )}

            {/* Google Maps Button for Car */}
            {selectedItem.id === 'car' && (
              <div className="pt-8 border-t border-gray-100 flex justify-end">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Жидичинський+Свято-Миколаївський+монастир"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-4 bg-black hover:bg-amber-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-600/20 w-full md:w-auto"
                >
                  <span className="font-montserrat font-bold tracking-widest uppercase text-sm">
                    Побудувати маршрут
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </a>
              </div>
            )}
          </div>
        )}
      </TextModal>
    </section>
  );
}
