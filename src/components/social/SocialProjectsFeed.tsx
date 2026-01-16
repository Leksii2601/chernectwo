'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowLeft, ArrowRight, Facebook, Instagram, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export interface Initiative {
  title: string;
  description: string;
  icon: string;
  fullTitle?: string;
  status?: string;
  grantAmount?: string;
  term?: string;
  author?: string;
  goal?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fullDescription?: any; // Changed to any to handle RichText or string
  directions?: string[];
  gallery?: string[];
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    phone?: string;
    whatsapp?: string;
  };
}

// CTA Animation Component
const CTAAnimation = ({ socialLinks }: { socialLinks?: Initiative['socialLinks'] }) => {
    const [animationState, setAnimationState] = useState<'hidden' | 'big' | 'shrink' | 'final'>('hidden');
    const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: false
    });
  
    useEffect(() => {
        let timer1: NodeJS.Timeout;
        let timer2: NodeJS.Timeout;

        if (inView) {
            if (animationState === 'hidden') {
                setAnimationState('big');
                
                timer1 = setTimeout(() => {
                    setAnimationState('shrink');
                    
                    timer2 = setTimeout(() => {
                        setAnimationState('final');
                    }, 400); 
                }, 400); 
            }
        } else {
            setAnimationState('hidden');
        }

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]); 
  
    return (
      <div
        ref={ref}
        className="h-[440px] flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Фонове світіння */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[360px] h-[360px]
                          bg-amber-400/20 blur-[120px]" />
        </div>
        
        <Link 
            href="/join"
            className={`group relative flex items-center transition-all duration-[1000ms] ease-out
                ${/* Mobile Button Styling */ ''}
                md:bg-transparent md:p-0
            `}
        >
             <div className={`
                overflow-hidden whitespace-nowrap transition-all duration-1000 ease-out
                ${animationState === 'final' ? 'max-w-[500px] opacity-100 mr-4' : 'max-w-0 opacity-0'}
                bg-amber-500 md:bg-transparent px-6 py-3 md:px-0 md:py-0
              `}>
                <span className="font-molodo text-lg sm:text-2xl md:text-3xl uppercase text-white md:text-black block text-center md:text-right leading-tight md:group-hover:text-amber-600 transition-colors">
                  Зацікавлені долучитися? <br className="hidden md:block"/> Напишіть нам.
                </span>
             </div>
             
             <div
                className={`
                    flex items-center justify-center rounded-full bg-amber-500 shadow-xl transition-all 
                    z-10 md:group-hover:bg-amber-600 md:group-hover:shadow-2xl md:group-hover:animate-pulseScale
                    /* Mobile Pulsation */
                    animate-pulse md:animate-none
                    ${animationState === 'big' ? 'w-[120px] h-[120px] scale-100 duration-[800ms] ease-out' : ''}
                    ${animationState === 'shrink' ? 'w-16 h-16 scale-90 duration-[700ms] ease-out' : ''}
                    ${animationState === 'final' ? 'w-12 h-12 md:w-16 md:h-16 scale-100 duration-[500ms] ease-out' : ''}
                    ${animationState === 'hidden' ? 'w-0 h-0 scale-0 opacity-0 duration-0' : 'opacity-100'}
                `}
             >
                <div className={`bg-white rounded-full transition-all duration-500
                    ${animationState === 'final' ? 'w-2 h-2 opacity-100' : 'w-0 h-0 opacity-0'}
                `} />
             </div>
        </Link>

        {/* Social Networks */}
        <div className={`flex items-center gap-4 mt-8 transition-all duration-1000 delay-500
            ${animationState === 'final' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
            {socialLinks?.facebook && (
                <a 
                    href={socialLinks.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
                    title="Facebook"
                >
                    <Facebook className="w-5 h-5" />
                </a>
            )}
            
            {socialLinks?.instagram && (
                <a 
                    href={socialLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-600 hover:text-white transition-all transform hover:scale-110"
                    title="Instagram"
                >
                    <Instagram className="w-5 h-5" />
                </a>
            )}

            {socialLinks?.whatsapp && (
                <a 
                    href={socialLinks.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-all transform hover:scale-110"
                    title="WhatsApp"
                >
                    <MessageCircle className="w-5 h-5" />
                </a>
            )}

            {socialLinks?.phone && (
                <a 
                    href={`tel:${socialLinks.phone}`}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-600 hover:text-white transition-all transform hover:scale-110"
                    title="Телефон"
                >
                    <Phone className="w-5 h-5" />
                </a>
            )}
        </div>
      </div>
    );
};

function SocialProjectCard({ item, onClick }: { item: Initiative; onClick: (item: Initiative) => void }) {
  const [isMobile, setIsMobile] = useState(false);
  // Modified to trigger only when the element is in the absolute center of the viewport
  const { ref, inView } = useInView({
    threshold: 0, 
    rootMargin: '-40% 0px -40% 0px', // Adjusted trigger zone
    triggerOnce: false
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = isMobile && inView;

  return (
    <div 
      ref={ref}
      onClick={() => onClick(item)}
      className={`
        group relative h-[420px] bg-white border cursor-pointer overflow-hidden transition-all duration-500
        flex flex-col items-center text-center p-8
        /* Dynamic Styles based on state */
        ${isActive 
            ? 'border-amber-500 shadow-xl' 
            : 'border-gray-100 hover:border-amber-500 hover:shadow-xl'
        }
      `}
    >
        {/* Icon Container */}
        <div className={`
            relative w-32 h-32 mb-6 flex items-center justify-center transition-transform duration-500 ease-out
            ${isActive ? 'scale-110 -translate-y-2' : 'group-hover:scale-110 group-hover:-translate-y-2'}
        `}>
           <Image 
             src={item.icon} 
             alt={item.title}
             fill
             className="object-contain"
           />
        </div>
        
        {/* Title */}
        <h3 className={`
            font-molodo text-2xl mb-4 uppercase leading-tight transition-colors duration-300
            ${isActive ? 'text-amber-600' : 'text-gray-900 group-hover:text-amber-600'}
        `}>
          {item.title}
        </h3>
        
        {/* Description */}
        <p className={`
            font-sans text-sm leading-relaxed text-gray-600 line-clamp-4 transition-all duration-500
            ${isActive ? 'opacity-40' : 'group-hover:opacity-40'}
        `}>
          {item.description}
        </p>

        {/* 'Read More' Button / Indicator */}
        <div className={`
             absolute bottom-10 left-0 right-0 flex justify-center transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
             ${isActive 
                ? 'opacity-100 translate-y-0 delay-100' 
                : 'opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-100'}
        `}>
             <span className="
                inline-flex items-center gap-2 
                text-amber-600 font-bold uppercase tracking-widest text-sm 
                border-b-2 border-amber-600 pb-1
                hover:text-amber-700 hover:border-amber-700 transition-colors
             ">
                Детальніше
                <ArrowRight className="w-4 h-4 ml-1" />
             </span>
        </div>
    </div>
  );
}

export function SocialProjectsFeed({ initiatives }: { initiatives: Initiative[] }) {
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);

  // Gallery auto-play
  useEffect(() => {
    if (!selectedInitiative || !selectedInitiative.gallery) return;

    const timer = setInterval(() => {
      if (!isGalleryLoading) {
        setCurrentGalleryIndex((prev) => 
          selectedInitiative.gallery && prev === selectedInitiative.gallery.length - 1 ? 0 : prev + 1
        );
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [selectedInitiative, isGalleryLoading]);

  const openModal = (item: Initiative) => {
    setSelectedInitiative(item);
    setIsClosing(false);
    setCurrentGalleryIndex(0);
    setIsGalleryLoading(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
        setSelectedInitiative(null);
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
        // Ensure scrolling is restored when leaving the page (e.g. via navigation)
        document.body.style.overflow = 'unset';
    };
  }, []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedInitiative?.gallery) {
      setIsGalleryLoading(true);
      setCurrentGalleryIndex((prev) => (prev + 1) % selectedInitiative.gallery!.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedInitiative?.gallery) {
      setIsGalleryLoading(true);
      setCurrentGalleryIndex((prev) => (prev - 1 + selectedInitiative.gallery!.length) % selectedInitiative.gallery!.length);
    }
  };

  return (
    <>
      {/* Grid Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {initiatives.map((item, index) => (
            <SocialProjectCard key={index} item={item} onClick={openModal} />
          ))}
        </div>
      </section>

      {/* Modal Backdrop */}
      {selectedInitiative && (
        <div 
          className={`fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-md ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
          onClick={closeModal}
        >
          {/* Scroll Container Position */}
          <div className="min-h-full w-full flex justify-center p-4 py-8">
            {/* Modal Content */}
            <div 
              className={`bg-white w-full max-w-4xl rounded-t-none rounded-b-3xl
 shadow-2xl relative my-auto ${isClosing ? 'animate-modalOut' : 'animate-modalIn'}`}
              onClick={(e) => e.stopPropagation()}
            >
            {/* Close Button - more visible */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/90 shadow-lg text-black hover:bg-white hover:scale-110 flex items-center justify-center transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header Image Area (Using Gallery or Default) */}
            <div className="relative h-[300px] w-full bg-gray-100">
              {selectedInitiative.gallery && selectedInitiative.gallery.length > 0 ? (
                <Image 
                  src={selectedInitiative.gallery[0]}
                  alt={selectedInitiative.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200">
                  <span className="font-molodo text-4xl text-gray-400">{selectedInitiative.title[0]}</span>
                </div>
              )}
               <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="font-molodo text-4xl text-white tracking-wide">{selectedInitiative.fullTitle || selectedInitiative.title}</h2>
               </div>
            </div>

            {/* Body Content */}
            <div className="p-8 md:p-12 ">
              
              {/* Meta Info Grid */}
         

              {/* Main Text Content: About Us & Directions */}
              <div className="space-y-8 mb-12">
                <div>
                  <h3 className="font-molodo text-2xl mb-4">Про нас</h3>
                  {/* Handle potentially complex content */}
                  <div className="text-gray-700 leading-relaxed font-sans text-lg whitespace-pre-line">
                    {typeof selectedInitiative.fullDescription === 'string' 
                        ? selectedInitiative.fullDescription 
                        : JSON.stringify(selectedInitiative.fullDescription) // Fallback for RichText
                    }
                  </div>
                </div>
                
                {selectedInitiative.directions && selectedInitiative.directions.length > 0 ? (
                   <div>
                      <h3 className="font-molodo text-2xl mb-4">Напрямки роботи</h3>
                      <ul className="space-y-2">
                        {selectedInitiative.directions.map((dir, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700 text-lg">
                             <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                             <span>{dir}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                ) : (
                  selectedInitiative.goal && (
                    <div>
                      <h3 className="font-molodo text-2xl mb-4">Мета</h3>
                      <p className="text-gray-700 leading-relaxed font-sans text-lg">
                        {selectedInitiative.goal || "Мета проєкту уточнюється..."}
                      </p>
                    </div>
                  )
                )}
              </div>
              
               {/* Photo Gallery Title */}

              {/* Photo Gallery */}
              {selectedInitiative.gallery && selectedInitiative.gallery.length > 0 && (
                <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden group">
                   <Image 
                      src={selectedInitiative.gallery[currentGalleryIndex]}
                      alt="Gallery"
                      fill
                      onLoad={() => setIsGalleryLoading(false)}
                      className={`object-cover transition-all duration-700 hover:scale-105 ${isGalleryLoading ? 'blur-sm scale-110' : 'blur-0 scale-100'}`}
                   />
                   
                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

                   {/* Controls - Arrows always visible on mobile/default, invisible on md: unless hover */}
                   <div className="absolute inset-0 flex items-center justify-between p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                         onClick={prevImage}
                         disabled={isGalleryLoading}
                         className="bg-black/30 hover:bg-black/60 shadow-lg hover:shadow-xl text-white p-4 rounded-full transition-all flex items-center justify-center transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                         <ArrowLeft className="w-6 h-6" />
                      </button>
                      <button 
                         onClick={nextImage}
                         disabled={isGalleryLoading}
                         className="bg-black/30 hover:bg-black/60 shadow-lg hover:shadow-xl text-white p-4 rounded-full transition-all flex items-center justify-center transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                         <ArrowRight className="w-6 h-6" />
                      </button>
                   </div>

                 
                  
                </div>
              )}

              {/* Call to Action Animation Section */}
              <div className="mt-16 border-t border-gray-100">
                 <CTAAnimation socialLinks={selectedInitiative.socialLinks} />
              </div>

            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
