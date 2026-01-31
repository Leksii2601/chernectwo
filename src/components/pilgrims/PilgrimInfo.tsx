'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronRight, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface PilgrimItem {
  title: string;
  description: string;
  fullTitle?: string;
  fullDescription?: string; // String or rich content
  icon?: string; // Optional icon if we want to use one, though screenshot doesn't show big icons
  gallery?: string[];
  rules?: string[]; // Specific for pilgrims?
  contact?: string;
}

// Reusing CTA Animation from SocialProjects (simplified or duplicated if needed)
// For now, I'll simplify or omit the complex animation if not strictly requested, 
// but user said "modal window like in social projects", which implies the content structure too. 
// I'll keep the gallery and basic info structure.

const pilgrimData: PilgrimItem[] = [
  {
    title: "Правила монастиря",
    description: "Ознайомтесь з правилами поведінки, одягу та перебування на території святині.",
    fullTitle: "Правила поведінки на території монастиря",
    fullDescription: "Відвідування монастиря – це особлива подія, яка вимагає поваги до святині та насельників обителі. Просимо вас дотримуватися тиші, вимикати мобільні телефони під час богослужінь та бути скромно одягненими. Жінкам бажано бути з покритою головою та у спідницях нижче колін, чоловікам – не у шортах.",
    gallery: ['/media/piligrims.jpg'],
    rules: [
      "Одяг має бути скромним та охайним.",
      "Заборонено палити та вживати алкоголь на території.",
      "Дотримуйтесь тиші та порядку.",
      "Фото та відеозйомка в храмах – лише з благословення."
    ]
  },
  {
    title: "Розклад богослужінь",
    description: "Дізнайтесь, коли відбуваються літургії, вечірні та молебні.",
    fullTitle: "Графік богослужінь",
    fullDescription: "Монастир живе за богослужбовим колом. Щоденна молитва – це серце обителі. Ви завжди можете долучитися до ранкових та вечірніх служб.",
    gallery: ['/media/life.jpg'],
    rules: [
      "Будні: Літургія о 8:00, Вечірня о 18:00",
      "Субота: Літургія о 9:00, Вечірня о 18:00",
      "Неділя: Літургія о 10:00, Акафіст о 18:00"
    ]
  },
  {
    title: "Проживання та трапеза",
    description: "Інформація про можливість ночівлі та харчування для паломників.",
    fullTitle: "Гостинність обителі",
    fullDescription: "Для паломників, що прибувають здалеку, є можливість зупинитися у монастирському готелі. Також ми пропонуємо розділити з нами трапезу.",
    gallery: ['/media/donate.jpg'],
    rules: [
      "Попередня реєстрація на поселення обов'язкова.",
      "Трапезна відкрита для паломників у визначені години.",
      "Проживання для груп узгоджується заздалегідь."
    ],
    contact: "+380671042288"
  },
  {
    title: "Екскурсії",
    description: "Замовте екскурсію, щоб дізнатися історію та таємниці нашої обителі.",
    fullTitle: "Екскурсії монастирем",
    fullDescription: "Центр туристичної інформації та паломництва проводить цікаві екскурсії територією монастиря, підземеллями та храмами. Ви почуєте історії про чудеса, дізнаєтесь про архітектуру та побут ченців.",
    gallery: ['/media/history.jpg'],
    rules: [
      "Індивідуальні та групові екскурсії.",
      "Можливість замовити екскурсію іноземною мовою.",
      "Відвідування оглядового майданчика."
    ],
    contact: "zhydychyn.center"
  },
  {
    title: "Як доїхати",
    description: "Схема доїзду громадським транспортом та автомобілем.",
    fullTitle: "Транспортна доступність",
    fullDescription: "Монастир знаходиться у с. Жидичин, всього за декілька кілометрів від Луцька. До нас зручно дістатися як власним авто, так і маршрутним таксі.",
    gallery: ['/media/contacts.jpg'],
    rules: [
      "Маршрутне таксі з Луцька курсує регулярно.",
      "Є зручна парковка для автомобілів та автобусів.",
      "У неділю та свята курсує монастирський автобус."
    ]
  },
  {
    title: "Допомога монастирю",
    description: "Дізнайтесь, як можна підтримати обитель та долучитися до добрих справ.",
    fullTitle: "Підтримка та волонтерство",
    fullDescription: "Монастир – це живий організм, який потребує постійної турботи. Ми вдячні за будь-яку допомогу: молитовну, фінансову чи фізичну працю во славу Божу.",
    gallery: ['/media/socialInitiatives/charity_dinner_2.jpg'],
    rules: [
      "Можливість потрудитися на кухні чи в саду.",
      "Фінансова підтримка будівництва.",
      "Допомога у соціальних проектах."
    ]
  }
];


export function PilgrimInfo() {
  const [selectedItem, setSelectedItem] = useState<PilgrimItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = (item: PilgrimItem) => {
    setSelectedItem(item);
    setIsClosing(false);
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

  const { t } = useLanguage();

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px]">

        {/* Title */}
        <h2 className="font-montserrat font-bold text-3xl md:text-5xl uppercase tracking-widest text-left mb-12 text-gray-900">
          {t('pilgrims.title')}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pilgrimData.map((item, index) => (
            <div
              key={index}
              onClick={() => openModal(item)}
              className="group bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold font-montserrat text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Arrow Circle */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:scale-110 transition-all duration-300">
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Backdrop */}
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
              <div className="relative h-[300px] w-full bg-gray-100 rounded-t-3xl overflow-hidden">
                {selectedItem.gallery && (
                  <Image
                    src={selectedItem.gallery[0]}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="font-montserrat text-3xl md:text-4xl text-white tracking-wide">
                    {selectedItem.fullTitle || selectedItem.title}
                  </h2>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-montserrat text-2xl mb-4 font-bold border-b pb-2 inline-block border-amber-500">
                      Деталі
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-sans text-lg whitespace-pre-line">
                      {selectedItem.fullDescription}
                    </p>
                  </div>

                  {(selectedItem.rules && selectedItem.rules.length > 0) || selectedItem.contact ? (
                    <div>
                      <h3 className="font-montserrat text-2xl mb-4 font-bold border-b pb-2 inline-block border-amber-500">
                        {t('pilgrims.details')}
                      </h3>
                      <div className="space-y-6">
                        {selectedItem.rules && selectedItem.rules.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-bold text-gray-900 flex items-center gap-2">
                              <Info className="w-5 h-5 text-amber-500" />
                              {t('pilgrims.important')}
                            </h4>
                            <ul className="space-y-2">
                              {selectedItem.rules.map((rule, idx) => (
                                <li key={idx} className="flex gap-2 text-gray-600">
                                  <span className="text-amber-500">•</span>
                                  {rule}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedItem.contact && (
                          <div className="pt-4 border-t border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">{t('pilgrims.contact_info')}</h4>
                            <p className="text-gray-600">{selectedItem.contact}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
