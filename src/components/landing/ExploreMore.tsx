'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const exploreItems = [
  {
    label: 'Історія',
    href: '/about/history',
    image: '/media/history.jpg',
  },
  {
    label: 'Храмовий комплекс',
    href: '/about/complex',
    image: '/media/church-complex.jpg',
  },
  {
    label: 'Життя обителі',
    href: '/about/life',
    image: '/media/life.jpg',
  },
  {
    label: 'Галерея',
    href: '/about/gallery',
    image: '/media/gallery.jpg',
  },
  {
    label: 'Скити',
    href: '/about/sketes',
    image: '/media/sketes.jpg',
  },
  {
    label: 'Соціальні ініціативи',
    href: '/social-projects',
    image: '/media/social-initiatives.jpg',
  },
  {
    label: 'Паломнику',
    href: '/pilgrims',
    image: '/media/piligrims.jpg',
  },
  {
    label: 'Підтримати',
    href: '/donate',
    image: '/media/donate.jpg',
  },
  {
    label: 'Контакти',
    href: '/contacts',
    image: '/media/contacts.jpg',
  },
];

export function ExploreMore() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 20); // Small buffer
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
          const container = scrollRef.current;
          const scrollAmount = container.clientWidth / 2;
          const newScrollLeft = direction === 'left' 
            ? container.scrollLeft - scrollAmount 
            : container.scrollLeft + scrollAmount;
            
          container.scrollTo({
              left: newScrollLeft,
              behavior: 'smooth'
          });
      }
  };

  return (
    <section className="bg-white py-16 lg:py-24 group/section relative">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px] relative">
        <h2 className="font-montserrat font-bold text-3xl md:text-5xl uppercase tracking-widest text-left mb-8 md:mb-12 text-gray-900 animate-fade-in-up">
          Дізнайтесь більше
        </h2>

        {/* Navigation Arrows */}
        <div className="relative group/list">
            <button 
                onClick={() => scroll('left')}
                className={`
                    absolute left-4 z-20 top-1/2 -translate-y-1/2
                    bg-white p-3 lg:p-4 rounded-full shadow-xl 
                    text-gray-900 hover:text-amber-600 hover:scale-110
                    transition-all duration-300 ease-in-out
                    ${showLeftArrow ? 'opacity-0 group-hover/list:opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
                `}
                aria-label="Scroll left"
            >
                <ArrowLeft className="w-6 h-6 lg:w-8 lg:h-8" />
            </button>
            
            <button 
                onClick={() => scroll('right')}
                className={`
                    absolute right-4 z-20 top-1/2 -translate-y-1/2
                    bg-white p-3 lg:p-4 rounded-full shadow-xl 
                    text-gray-900 hover:text-amber-600 hover:scale-110
                    transition-all duration-300 ease-in-out
                    ${showRightArrow ? 'opacity-0 group-hover/list:opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
                `}
                aria-label="Scroll right"
            >
                <ArrowRight className="w-6 h-6 lg:w-8 lg:h-8" />
            </button>

            <div 
                ref={ref}
                className={`
                    relative
                    opacity-0 translate-y-8 transition-all duration-1000 ease-out
                    ${inView ? 'opacity-100 translate-y-0' : ''}
                `}
            >
                <div 
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-4 lg:gap-6 overflow-x-auto py-4 lg:py-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:-mx-0 md:px-0"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {exploreItems.map((item, index) => (
                        <Link 
                            key={item.label} 
                            href={item.href}
                            className="group relative flex-shrink-0 snap-start w-[75vw] sm:w-[50vw] md:w-[40vw] lg:w-[22%] aspect-[3/4] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
                        >
                            <Image
                                src={item.image}
                                alt={item.label}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 75vw, (max-width: 1200px) 40vw, 20vw"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                            {/* Text */}
                            <div className="absolute bottom-0 left-0 p-4 lg:p-8 w-full">
                                <span className="inline-block text-white font-montserrat font-bold text-xl lg:text-2xl tracking-wide transition-all duration-300">
                                    {item.label}
                                </span>
                            </div>
                        </Link>
                    ))}
                    {/* Spacer at the end to allow scrolling the last item fully into view if needed, though padding usually handles it */}
                    <div className="w-[1px] flex-shrink-0" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
