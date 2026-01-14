'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
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
}

// CTA Animation Component
const CTAAnimation = () => {
    const [animationState, setAnimationState] = useState<'hidden' | 'big' | 'shrink' | 'final'>('hidden');
    const { ref, inView } = useInView({
      threshold: 0.5,
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
                    }, 700); 
                }, 800); 
            }
        } else {
            setAnimationState('hidden');
        }

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [inView, animationState]); 
  
    return (
      <div
  ref={ref}
  className="h-[340px] flex items-center justify-center relative overflow-hidden"
>
  {/* Фонове світіння */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-[360px] h-[360px] rounded-full 
                    bg-amber-400/20 blur-[120px]" />
  </div>
        <Link 
            href="/join"
            className={`group relative flex items-center transition-all duration-[1000ms] ease-out`}
        >
             <div className={`
                overflow-hidden whitespace-nowrap transition-all duration-1000 ease-out
                ${animationState === 'final' ? 'max-w-[500px] opacity-100 mr-6' : 'max-w-0 opacity-0'}
              `}>
                <span className="font-molodo text-3xl uppercase text-black block text-right leading-tight group-hover:text-amber-600 transition-colors">
                  Зацікавлені долучитися? <br/> Напишіть нам.
                </span>
             </div>
             <div
                className={`
                    flex items-center justify-center rounded-full bg-amber-500 shadow-xl transition-all 
                    z-10 group-hover:bg-amber-600 group-hover:shadow-2xl group-hover:animate-pulseScale
                    ${animationState === 'big' ? 'w-[120px] h-[120px] scale-100 duration-[800ms] ease-out' : ''}
                    ${animationState === 'shrink' ? 'w-16 h-16 scale-90 duration-[700ms] ease-out' : ''}
                    ${animationState === 'final' ? 'w-16 h-16 scale-100 duration-[500ms] ease-out' : ''}
                    ${animationState === 'hidden' ? 'w-0 h-0 scale-0 opacity-0 duration-0' : 'opacity-100'}
                `}
             >
                <div className={`bg-white rounded-full transition-all duration-500
                    ${animationState === 'final' ? 'w-2 h-2 opacity-100' : 'w-0 h-0 opacity-0'}
                `} />
             </div>
        </Link>
      </div>
    );
  };

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
            <div 
              key={index}
              onClick={() => openModal(item)}
              className="group relative h-[400px] border border-gray-100 bg-white overflow-hidden cursor-pointer"
            >
              {/* Content Container */}
              <div className="absolute inset-0 p-8 flex flex-col items-center text-center transition-all duration-500 group-hover:opacity-10">
                <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                   <Image 
                     src={item.icon} 
                     alt={item.title}
                     fill
                     className="object-contain"
                   />
                </div>
                
                <h3 className="font-molodo text-2xl mb-6 uppercase leading-tight">
                  {item.title}
                </h3>
                
                <p className="font-sans text-sm leading-relaxed text-gray-600 line-clamp-6">
                  {item.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col items-center justify-center p-8 text-white z-10">
                <h3 className="font-molodo text-2xl mb-6 uppercase text-center translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                  {item.title}
                </h3>
                
                <button 
                  className="border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black px-8 py-3 uppercase tracking-widest text-sm font-semibold transition-all duration-300 translate-y-4 group-hover:translate-y-0 delay-200"
                >
                  Детальніше
                </button>
              </div>
            </div>
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
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-8 h-8 text-white" />
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

                   {/* Controls */}
                   <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                 <CTAAnimation />
              </div>

            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
