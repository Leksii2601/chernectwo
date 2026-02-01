'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X, Info } from 'lucide-react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageContext';

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
  previewImage?: string;
  galleryImages: string[];
  contacts: string;
}

// CATEGORIES moved inside ComplexLayout for translation

// MOCK_OBJECTS removed from global scope

type TabId = 'overview' | 'gallery';

// TABS moved inside ComplexObjectCard for translation

export const ComplexLayout = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('temples');

  const CATEGORIES: Category[] = [
    { id: 'temples', label: t('complex.cat_temples') },
    { id: 'monuments', label: t('complex.cat_monuments') },
    { id: 'parks', label: t('complex.cat_parks') },
    { id: 'economy', label: t('complex.cat_economy') },
    { id: 'service', label: t('complex.cat_service') },
  ];

  const MOCK_OBJECTS: ComplexObject[] = [
    // CATEGORY: TEMPLES
    {
      id: 't1',
      categoryId: 'temples',
      title: t('complex.t1_title'),
      description: t('complex.t1_desc'),
      previewImage: '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_1.jpg',
      galleryImages: [
        '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_1.jpg',
        '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_2.jpg',
        '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_3.jpg',
        '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_4.jpg',
        '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_5.jpg',
        '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_6.jpg',
        '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_7.jpg'
      ],
      contacts: t('complex.t1_contacts')
    },
    {
      id: 't2',
      categoryId: 'temples',
      title: t('complex.t4_title'),
      description: t('complex.t4_desc'),
      previewImage: '/media/church-complex/temples/sviatoshynskyi/sviatoshynskyi_5.jpg',
      galleryImages: [
        '/media/church-complex/temples/sviatoshynskyi/sviatoshynskyi_1.jpg',
        '/media/church-complex/temples/sviatoshynskyi/sviatoshynskyi_2.jpg',
        '/media/church-complex/temples/sviatoshynskyi/sviatoshynskyi_3.jpg',
        '/media/church-complex/temples/sviatoshynskyi/sviatoshynskyi_4.jpg',
        '/media/church-complex/temples/sviatoshynskyi/sviatoshynskyi_5.jpg'
      ],
      contacts: t('complex.t4_contacts')
    },
    {
      id: 't3',
      categoryId: 'temples',
      title: t('complex.t3_title'),
      description: t('complex.t3_desc'),
      previewImage: '/media/church-complex/temples/uspenskyi/uspenskyi_2.jpg',
      galleryImages: [
        '/media/church-complex/temples/uspenskyi/uspenskyi_1.jpg',
        '/media/church-complex/temples/uspenskyi/uspenskyi_2.jpg',
        '/media/church-complex/temples/uspenskyi/uspenskyi_3.jpg',
        '/media/church-complex/temples/uspenskyi/uspenskyi_4.jpg',
        '/media/church-complex/temples/uspenskyi/uspenskyi_5.jpg',
        '/media/church-complex/temples/uspenskyi/uspenskyi_6.jpg',
        '/media/church-complex/temples/uspenskyi/uspenskyi_7.jpg',
        '/media/church-complex/temples/uspenskyi/uspenskyi_8.jpg',
        '/media/church-complex/temples/uspenskyi/uspenskyi_9.jpg'
      ],
      contacts: t('complex.t3_contacts')
    },
    {
      id: 't4',
      categoryId: 'temples',
      title: t('complex.t5_title'),
      description: t('complex.t5_desc'),
      previewImage: '/media/church-complex/temples/voskresenskyi/hero.jpg',
      galleryImages: [
        '/media/church-complex/temples/voskresenskyi/voskresenskyi_1.jpg',
        '/media/church-complex/temples/voskresenskyi/voskresenskyi_2.jpg',
        '/media/church-complex/temples/voskresenskyi/voskresenskyi_3.jpg',
        '/media/church-complex/temples/voskresenskyi/voskresenskyi_4.jpg',
        '/media/church-complex/temples/voskresenskyi/voskresenskyi_5.jpg',
        '/media/church-complex/temples/voskresenskyi/voskresenskyi_6.jpg',
        '/media/church-complex/temples/voskresenskyi/voskresenskyi_7.jpg'
      ],
      contacts: t('complex.t5_contacts')
    },

    // CATEGORY: MONUMENTS
    {
      id: 'm1',
      categoryId: 'monuments',
      title: t('complex.m1_title'),
      description: t('complex.m1_desc'),
      previewImage: '/media/church-complex/monuments/metropolitan-palace/metropolitan-palace_1.jpg',
      galleryImages: [
        '/media/church-complex/monuments/metropolitan-palace/metropolitan-palace_1.jpg',
        '/media/church-complex/monuments/metropolitan-palace/metropolitan-palace_2.jpg',
        '/media/church-complex/monuments/metropolitan-palace/metropolitan-palace_3.jpg',
        '/media/church-complex/monuments/metropolitan-palace/metropolitan-palace_4.jpg',
        '/media/church-complex/monuments/metropolitan-palace/metropolitan-palace_5.jpg',
        '/media/church-complex/monuments/metropolitan-palace/metropolitan-palace_6.jpg',
        '/media/church-complex/monuments/metropolitan-palace/metropolitan-palace_7.jpg'
      ],
      contacts: t('complex.m1_contacts')
    },
    {
      id: 'm2',
      categoryId: 'monuments',
      title: t('complex.m2_title'),
      description: t('complex.m2_desc'),
      galleryImages: [
        '/media/church-complex/monuments/great-bell-tower/great-bell-tower_1.jpg',
        '/media/church-complex/monuments/great-bell-tower/great-bell-tower_2.jpg',
        '/media/church-complex/monuments/great-bell-tower/great-bell-tower_3.jpg',
        '/media/church-complex/monuments/great-bell-tower/great-bell-tower_4.jpg',
        '/media/church-complex/monuments/great-bell-tower/great-bell-tower_5.jpg',
        '/media/church-complex/monuments/great-bell-tower/great-bell-tower_6.jpg',
        '/media/church-complex/monuments/great-bell-tower/great-bell-tower_7.jpg'
      ],
      contacts: t('complex.m2_contacts')
    },
    {
      id: 'm4',
      categoryId: 'monuments',
      title: t('complex.m4_title'),
      description: t('complex.m4_desc'),
      galleryImages: [
        '/media/church-complex/monuments/small-bell-tower/small-bell-tower_1.jpg',
        '/media/church-complex/monuments/small-bell-tower/small-bell-tower_2.jpg',
        '/media/church-complex/monuments/small-bell-tower/small-bell-tower_3.jpg',
        '/media/church-complex/monuments/small-bell-tower/small-bell-tower_4.jpg'
      ],
      contacts: t('complex.m4_contacts')
    },
    // CATEGORY: PARKS
    {
      id: 'p1',
      categoryId: 'parks',
      title: t('complex.p1_title'),
      description: t('complex.p1_desc'),
      galleryImages: [
        '/media/church-complex/parks/free-people-square/free-people-square_1.jpg',
        '/media/church-complex/parks/free-people-square/free-people-square_2.jpg',
        '/media/church-complex/parks/free-people-square/free-people-square_3.jpg',
        '/media/church-complex/parks/free-people-square/free-people-square_4.jpg',
        '/media/church-complex/parks/free-people-square/free-people-square_5.jpg'
      ],
      contacts: t('complex.p1_contacts')
    },
    {
      id: 'p2',
      categoryId: 'parks',
      title: t('complex.p2_title'),
      description: t('complex.p2_desc'),
      galleryImages: ['/media/church-complex.jpg'],
      contacts: t('complex.p2_contacts')
    },
    {
      id: 'p4',
      categoryId: 'parks',
      title: t('complex.p4_title'),
      description: t('complex.p4_desc'),
      galleryImages: ['/media/church-complex.jpg'],
      contacts: t('complex.p4_contacts')
    },
    {
      id: 'p5',
      categoryId: 'parks',
      title: t('complex.p5_title'),
      description: t('complex.p5_desc'),
      galleryImages: ['/media/church-complex.jpg'],
      contacts: t('complex.p5_contacts')
    },
    {
      id: 'p3',
      categoryId: 'parks',
      title: t('complex.p3_title'),
      description: t('complex.p3_desc'),
      galleryImages: ['/media/church-complex.jpg'],
      contacts: t('complex.p3_contacts')
    },

    // CATEGORY: SERVICE
    {
      id: 'e2',
      categoryId: 'service',
      title: t('complex.e2_title'),
      description: t('complex.e2_desc'),
      galleryImages: ['/media/church-complex.jpg'],
      contacts: t('complex.e2_contacts')
    },
    {
      id: 'e5',
      categoryId: 'service',
      title: t('complex.e5_title'),
      description: t('complex.e5_desc'),
      galleryImages: ['/media/church-complex.jpg'],
      contacts: t('complex.e5_contacts')
    },
    {
      id: 'e4',
      categoryId: 'service',
      title: t('complex.e4_title'),
      description: t('complex.e4_desc'),
      galleryImages: ['/media/church-complex.jpg'],
      contacts: t('complex.e4_contacts')
    },
    {
      id: 'e6',
      categoryId: 'service',
      title: t('complex.e6_title'),
      description: t('complex.e6_desc'),
      galleryImages: ['/media/church-complex.jpg'],
      contacts: t('complex.e6_contacts')
    },
    {
      id: 'e3',
      categoryId: 'service',
      title: t('complex.e3_title'),
      description: t('complex.e3_desc'),
      galleryImages: ['/media/church-complex.jpg'],
      contacts: t('complex.e3_contacts')
    },
    {
      id: 'e1',
      categoryId: 'service',
      title: t('complex.e1_title'),
      description: t('complex.e1_desc'),
      galleryImages: ['/media/church-complex.jpg'],
      contacts: t('complex.e1_contacts')
    },
  ];

  const economyObject: ComplexObject = {
    id: 'economy-main',
    categoryId: 'economy',
    title: t('complex.economy_title'),
    description: t('complex.economy_desc'),
    previewImage: '/media/church-complex/economy/economy_1.jpg',
    galleryImages: [
      '/media/church-complex/economy/economy_1.jpg',
      '/media/church-complex/economy/economy_2.jpg'
    ],
    contacts: ''
  };

  const filteredObjects = activeCategory === 'economy'
    ? [economyObject]
    : MOCK_OBJECTS.filter(obj => obj.categoryId === activeCategory);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 font-montserrat">
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
          <h2 className="text-4xl font-montserrat text-gray-900 mb-4 uppercase">
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
              {t('complex.empty')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ComplexObjectCard = ({ object }: { object: ComplexObject }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const TABS: { id: TabId; label: string }[] = [
    { id: 'overview', label: t('complex.tab_overview') },
    { id: 'gallery', label: t('complex.tab_gallery') },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Use the previewImage if provided, otherwise the first gallery image or placeholder
  const coverImage = object.previewImage || (object.galleryImages.length > 0 ? object.galleryImages[0] : '/media/church-complex.jpg');

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
          <div className={clsx(
            "flex flex-col transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
            activeTab === 'overview' ? "w-full lg:w-[60%] p-6 lg:p-10" : "w-full p-4 lg:p-10"
          )}>
            <div className={`mb-2 w-full ${activeTab === 'overview' ? 'lg:max-w-2xl' : ''}`}>
              {/* Tabs - Centering when in gallery mode */}
              <div className={clsx(
                "flex gap-8 border-b border-gray-100 mb-6 transition-all duration-500",
                activeTab !== 'overview' && "justify-center"
              )}>
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      "py-4 text-xs font-bold uppercase tracking-widest transition-all relative",
                      activeTab === tab.id ? "text-orange-600" : "text-gray-400 hover:text-gray-600"
                    )}
                  >
                    {tab.label}
                    <span className={clsx(
                      "absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transform transition-transform duration-300",
                      activeTab === tab.id ? "scale-x-100" : "scale-x-0"
                    )}></span>
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
                  <h3 className="text-3xl font-montserrat text-gray-900 mb-4 uppercase">
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
                    <span className="group-hover:pl-2 transition-all duration-300">{t('complex.details')}</span>
                  </button>
                </div>

                {/* GALLERY CONTENT */}
                <div
                  className={clsx(
                    "col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full",
                    activeTab === 'gallery'
                      ? "opacity-100 translate-y-0 relative z-10 delay-100"
                      : "opacity-0 translate-y-20 absolute inset-x-0 top-0 pointer-events-none z-0 scale-95"
                  )}
                >
                  {/* Gallery Slider - Adjusted aspect ratio and width for mobile */}
                  <div className="w-full lg:w-[65%] aspect-[4/3] md:aspect-[3/2] relative bg-black overflow-hidden group/gallery mx-auto shadow-md">
                    {object.galleryImages.length > 0 ? (
                      <>
                        <Image
                          src={object.galleryImages[currentImageIndex]}
                          alt="Gallery"
                          fill
                          sizes="(max-width: 768px) 100vw, 80vw"
                          className="object-cover animate-in fade-in duration-500"
                          priority={false}
                          key={currentImageIndex} // Re-animate on change
                        />

                        {/* Navigation Arrows */}
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-black shadow-lg rounded-full transition-all hover:scale-110 z-20"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-black shadow-lg rounded-full transition-all hover:scale-110 z-20"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">{t('complex.no_photos')}</div>
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
                <span className="text-sm font-bold uppercase tracking-widest text-gray-500">{t('complex.detailed_info')}</span>
              </div>

              <h3 className="text-3xl font-bold font-montserrat text-gray-900 mb-6 uppercase">{object.title}</h3>

              <div className="prose prose-orange text-gray-600 leading-relaxed mb-8">
                <p className="text-lg">{object.description}</p>
                <p>
                  {t('complex.modal_extended_desc')}
                </p>
              </div>

              {object.contacts && (
                <div className="bg-orange-50 p-6 rounded-lg mb-8 border border-orange-100">
                  <h4 className="font-bold text-orange-900 mb-2 uppercase text-xs tracking-wider">{t('complex.contacts_info')}</h4>
                  <p className="text-orange-800 font-medium">{object.contacts}</p>
                </div>
              )}

              <button
                onClick={closeModal}
                className="w-full py-4 bg-gray-900 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-bold uppercase tracking-wider"
              >
                {t('generic.close')}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
