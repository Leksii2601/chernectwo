'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X, Info } from 'lucide-react';
import { createPortal } from 'react-dom';

type CategoryId = 'temples' | 'monuments' | 'parks' | 'economy' | 'service';

interface Category {
  id: CategoryId;
  label: string;
}

interface ComplexObject {
  id: string;
  categoryId: CategoryId;
  title: string;
  description: string;
  galleryImages: string[];
  contacts: string;
}

const CATEGORIES: Category[] = [
  { id: 'temples', label: 'Храми' },
  { id: 'monuments', label: "Пам'ятки" },
  { id: 'parks', label: 'Сквери' },
  { id: 'economy', label: 'Економія' },
  { id: 'service', label: 'Сервіс' },
];

const MOCK_OBJECTS: ComplexObject[] = [
  // CATEGORY: TEMPLES
  {
    id: 't1',
    categoryId: 'temples',
    title: 'Миколаївський храм',
    description: 'Один з найдавніших храмів обителі, присвячений Святителю Миколаю Чудотворцю. Місце особливої молитви та духовного затишку для вірян.',
    galleryImages: ['/media/church-complex.jpg', '/media/church-complex.jpg'],
    contacts: 'Богослужіння: щодня 08:00 - 18:00'
  },
  {
    id: 't2',
    categoryId: 'temples',
    title: 'Свято-Духівський храм',
    description: 'Храм, збудований на честь Святого Духа, вражає своєю архітектурною довершеністю та внутрішнім розписом. Символ відродження духовності.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Відкрито для відвідування.'
  },
  {
    id: 't3',
    categoryId: 'temples',
    title: 'Успенський храм',
    description: 'Величний храм на честь Успіння Пресвятої Богородиці. Тут відбуваються урочисті святкові літургії та хресні ходи.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Розклад богослужінь на сайті.'
  },
  {
    id: 't4',
    categoryId: 'temples',
    title: 'Святошинський храм',
    description: 'Невеликий, але затишний храм, де часто проводяться вінчання та хрещення. Улюблене місце молодих родин.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Запис на треби за телефоном.'
  },
  {
    id: 't5',
    categoryId: 'temples',
    title: 'Воскресенський собор',
    description: 'Головна свядиня комплексу – Собор Воскресіння Христового. Монументальна споруда, що є серцем монастирського життя.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Центральний вхід.'
  },

  // CATEGORY: MONUMENTS
  {
    id: 'm1',
    categoryId: 'monuments',
    title: 'Палац Митрополита',
    description: 'Історична резиденція митрополитів, пам\'ятка архітектури національного значення. Зберігає дух минулих епох та велич церковної влади.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Екскурсії за попереднім записом.'
  },
  {
    id: 'm2',
    categoryId: 'monuments',
    title: 'Велика дзвіниця',
    description: 'Найвища споруда комплексу, з якої відкривається панорама на мальовничі околиці. Її дзвони скликають вірян на молитву вже століттями.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Вхід на оглядовий майданчик.'
  },
  {
    id: 'm3',
    categoryId: 'monuments',
    title: 'Городище скудельничі',
    description: 'Археологічна пам\'ятка, залишки давнього укріплення. Свідок багатовікової історії захисту рідної землі.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Вільний доступ.'
  },
  {
    id: 'm4',
    categoryId: 'monuments',
    title: 'Мала дзвіниця',
    description: 'Старовинна дзвіниця, що зберегла свій автентичний вигляд. Вирізняється унікальною дерев\'яною архітектурою.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Розташована біля старого цвинтаря.'
  },
  {
    id: 'm5',
    categoryId: 'monuments',
    title: 'Меморіал "Спалене сумління"',
    description: 'Меморіальний комплекс пам\'яті жертв трагічних подій. Місце скорботи та нагадування про цінність людського життя.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Місце тиші.'
  },

  // CATEGORY: PARKS
  {
    id: 'p1',
    categoryId: 'parks',
    title: 'Сквер вільних людей',
    description: 'Сучасний громадський простір для відпочинку та спілкування. Символ свободи та незламності духу громади.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Працює цілодобово.'
  },
  {
    id: 'p2',
    categoryId: 'parks',
    title: 'Сквер Полікарпа Сікорського',
    description: 'Затишна зелена зона, названа на честь видатного діяча. Ідеальне місце для прогулянок з дітьми.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Є дитячий майданчик.'
  },
  {
    id: 'p3',
    categoryId: 'parks',
    title: 'Сквер Романи Скири',
    description: 'Мальовничий куточок природи серед міської забудови. Тут можна насолодитися тишею та свіжим повітрям.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Лавочки та алеї.'
  },
  {
    id: 'p4',
    categoryId: 'parks',
    title: 'Монастирські сади',
    description: 'Розкішні фруктові сади, вирощені працею ченців. Навесні вражають цвітінням, а восени – щедрим врожаєм.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Відвідування в години роботи монастиря.'
  },

  // CATEGORY: SERVICE
  {
    id: 'e1',
    categoryId: 'service',
    title: 'Парковка',
    description: 'Зручний та просторий паркінг для автомобілів паломників та гостей комплексу. Охоронювана територія.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Безкоштовно.'
  },
  {
    id: 'e2',
    categoryId: 'service',
    title: 'ZhydychynCenter',
    description: 'Сучасний паломницький центр. Інформаційна стійка, сувенірна крамниця та місце для зустрічей груп.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Інформація: +380...'
  },
  {
    id: 'e3',
    categoryId: 'service',
    title: 'Туалет',
    description: 'Громадська вбиральня, обладнана всім необхідним для комфорту відвідувачів, включаючи зручності для людей з обмеженими можливостями.',
    galleryImages: ['/media/church-complex.jpg'],
    contacts: 'Розташовано за собором.'
  },
];

type TabId = 'overview' | 'gallery';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Огляд' },
  { id: 'gallery', label: 'Галерея' },
];

export const ComplexLayout = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('temples');

  const filteredObjects = MOCK_OBJECTS.filter(obj => obj.categoryId === activeCategory);

  return (
    <div className="flex flex-col lg:flex-row gap-12 font-montserrat">
      {/* Sidebar - Minimal Left Edge */}
      <div className="w-full lg:w-72 flex-shrink-0">
        <div className="sticky top-24">
           {/* Mobile Horizontal Scroll */}
           <div className="lg:hidden mb-6 overflow-x-auto pb-2 -mx-4 px-4 flex gap-3 hide-scrollbar [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-bold uppercase tracking-wide transition-all shadow-sm
                    ${activeCategory === category.id 
                      ? 'bg-orange-600 text-white shadow-md transform scale-105' 
                      : 'bg-transparent text-gray-500 border border-gray-200 hover:border-gray-400'}
                  `}
                >
                  {category.label}
                </button>
              ))}
           </div>

           {/* Desktop Vertical List */}
           <div className="hidden lg:flex flex-col gap-1 border-l-2 border-gray-100 ml-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    text-left px-6 py-4 text-base uppercase tracking-wider transition-all duration-300 -ml-[2px] border-l-2
                    ${activeCategory === category.id 
                      ? 'border-orange-600 text-orange-700 font-bold pl-8' 
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:pl-8'}
                  `}
                >
                  {category.label}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow min-h-[600px] w-full">
         <div className="mb-10 lg:pl-10">
            <h2 className="text-4xl font-serif text-gray-900 mb-4 uppercase">
                {CATEGORIES.find(c => c.id === activeCategory)?.label}
            </h2>
            <div className="h-1 w-16 bg-orange-600"></div>
         </div>

         <div className="space-y-12 animate-fade-in w-full">
            {filteredObjects.length > 0 ? (
                filteredObjects.map(obj => (
                    <ComplexObjectCard key={obj.id} object={obj} />
                ))
            ) : (
                <div className="p-12 text-center text-gray-400 bg-gray-50 rounded-lg border border-gray-100 uppercase tracking-widest text-sm">
                    Об&apos;єкти відсутні
                </div>
            )}
         </div>
      </div>
    </div>
  );
};

const ComplexObjectCard = ({ object }: { object: ComplexObject }) => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Use the first image as the cover, or a placeholder if none exists
  const coverImage = object.galleryImages.length > 0 ? object.galleryImages[0] : '/media/church-complex.jpg';

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % object.galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + object.galleryImages.length) % object.galleryImages.length);
  };

  // Parallax Effect
  

  // Modal Handling
  const closeModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
        setIsModalOpen(false);
        setIsClosingModal(false);
    }, 300);
  };

  useEffect(() => {
    if (isModalOpen) {
        document.body.style.overflow = 'hidden';
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
        window.addEventListener('keydown', handleEsc);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEsc);
        };
    }
  }, [isModalOpen]);

  return (
    <>
    <div className="bg-white group rounded-none border border-gray-100 hover:border-orange-100 transition-colors duration-300 overflow-hidden shadow-sm min-h-[400px]">
      <div className="flex flex-col lg:flex-row h-full relative">
        
        {/* Left Content Section */}
        <div className={`
            p-6 lg:p-10 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
            ${activeTab === 'overview' ? 'w-full lg:w-[60%]' : 'w-full'}
        `}>
            <div className={`mb-2 w-full ${activeTab === 'overview' ? 'lg:max-w-2xl' : ''}`}> 
                 {/* Tabs - Swapped position, now Top */}
                 <div className={`flex gap-8 border-b border-gray-100 mb-6 transition-all duration-500 ${activeTab === 'gallery' ? 'justify-center' : ''}`}>
                    {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            py-4 text-xs font-bold uppercase tracking-widest transition-all relative
                            ${activeTab === tab.id ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}
                        `}
                    >
                        {tab.label}
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transform transition-transform duration-300 ${activeTab === tab.id ? 'scale-x-100' : 'scale-x-0'}`}></span>
                    </button>
                    ))}
                </div>
            </div>

            <div className={`flex-grow relative w-full ${activeTab === 'overview' ? 'lg:max-w-2xl' : ''}`}>
                 {/* Content Switching - Used Grid Area to stack content for smoother transition */}
                 <div className="grid grid-cols-1 grid-rows-1">
                    
                    {/* OVERVIEW CONTENT */}
                    <div 
                        className={`
                            col-start-1 row-start-1 transition-all duration-700 ease-in-out flex flex-col
                            ${activeTab === 'overview' 
                                ? 'opacity-100 translate-x-0 relative z-10 delay-100' 
                                : 'opacity-0 -translate-x-8 pointer-events-none absolute inset-x-0 top-0'}
                        `}
                    >
                        {/* Title - Moved here for smoother transition */}
                        <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4 uppercase">
                            {object.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed font-light text-xl mb-8">
                            {object.description}
                        </p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-800 hover:text-orange-600 transition-colors w-fit"
                        >
                            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-orange-600 transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                            <span className="group-hover:pl-2 transition-all duration-300">Детальніше</span>
                        </button>
                    </div>

                    {/* GALLERY CONTENT */}
                    <div 
                        className={`
                            col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full
                            ${activeTab === 'gallery' 
                                ? 'opacity-100 translate-y-0 relative z-10 delay-100' 
                                : 'opacity-0 translate-y-12 pointer-events-none absolute inset-x-0 top-0'}
                        `}
                    >
                        {/* Gallery Slider */}
                        <div className="relative w-full h-[400px] bg-gray-100 group/gallery">
                            {object.galleryImages.length > 0 ? (
                                <>
                                <div 
                                    className="w-full h-full bg-cover bg-center transition-all duration-500"
                                    style={{ backgroundImage: `url(${object.galleryImages[currentImageIndex]})` }}
                                />
                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-white transition-all transform hover:scale-110 z-10"
                                >
                                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-white transition-all transform hover:scale-110 z-10"
                                >
                                    <ChevronRight className="w-6 h-6 text-gray-800" />
                                </button>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">Фотографії відсутні</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        {/* Right Image Section - Only for Overview */}
        <div className={`
             bg-gray-200 relative order-first lg:order-last transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] overflow-hidden
             ${activeTab === 'overview' 
                ? 'w-full lg:w-[40%] opacity-100 h-64 lg:h-auto min-h-[400px]' 
                : 'w-full lg:w-0 opacity-0 h-0 lg:h-auto min-h-0 pointer-events-none'}
        `}>
             {/* 
                Fixed Width Container for Image:
                Use a container that maintains a stable width (e.g. 40vw) even when parent is 0 width.
                This prevents the image 'jerking' or resizing during the parent's width transition.
             */}
             <div className="absolute inset-y-0 right-0 w-full lg:w-[40vw] h-full overflow-hidden">
                <div 
                    ref={parallaxRef}
                    className="absolute inset-0 bg-cover bg-center h-[120%]" 
                    style={{ backgroundImage: `url(${coverImage})`, transformOrigin: 'center center' }}
                />
                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500"></div>
             </div>
        </div>
      </div>
    </div>
    
    {/* MODAL via Portal */}
    {isModalOpen && createPortal(
        <div className={`
            fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-opacity duration-300
            ${isClosingModal ? 'opacity-0' : 'opacity-100 animate-in fade-in'}
        `}>
             <div className="absolute inset-0" onClick={closeModal} /> {/* Click outside to close */}
             
            <div className={`
                bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col transition-all duration-300
                ${isClosingModal ? 'scale-95 opacity-0 translate-y-4' : 'scale-100 opacity-100 translate-y-0 animate-in zoom-in-95 slide-in-from-bottom-4'}
            `}>
                
                <button 
                    onClick={closeModal}
                    className="absolute right-4 top-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-20"
                >
                    <X className="w-6 h-6 text-gray-800" />
                </button>

                <div className="w-full p-8 md:p-12 bg-white overflow-y-auto custom-scrollbar font-montserrat">
                        <div className="flex items-center gap-2 mb-6">
                            <Info className="w-5 h-5 text-orange-600" />
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Детальна інформація</span>
                        </div>
                        
                        <h3 className="text-3xl font-bold font-serif text-gray-900 mb-6 uppercase">{object.title}</h3>
                        
                        <div className="prose prose-orange text-gray-600 leading-relaxed mb-8">
                            <p className="text-lg">{object.description}</p>
                            <p>
                                Тут розміщується розширений опис об&apos;єкту. Цей текст може містити історичні факти, архітектурні особливості, 
                                розклад богослужінь або іншу корисну інформацію для відвідувачів. 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                        {object.contacts && (
                             <div className="bg-orange-50 p-6 rounded-lg mb-8 border border-orange-100">
                                <h4 className="font-bold text-orange-900 mb-2 uppercase text-xs tracking-wider">Контакти та Інформація</h4>
                                <p className="text-orange-800 font-medium">{object.contacts}</p>
                            </div>
                        )}

                        <button 
                            onClick={closeModal}
                            className="w-full py-4 bg-gray-900 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-bold uppercase tracking-wider"
                        >
                            Закрити
                        </button>
                </div>
            </div>
        </div>,
        document.body
    )}
    </>
  );
};
