'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Facebook, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/context/LanguageContext';
import { PhotoInfoModal } from '../ui/PhotoInfoModal';
import { CircleArrowButton } from '../ui/CircleArrowButton';
import { clsx } from 'clsx';

export interface Initiative {
  id: string;
  icon: string;
  previewImage?: string;
  gallery?: string[];
  socialLinks?: {
    facebook?: string;
    website?: string;
  };
}

// CTA Animation Component
const CTAAnimation = ({ socialLinks }: { socialLinks?: Initiative['socialLinks'] }) => {
  const { t } = useLanguage();
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
          }, 200); // Faster
        }, 200); // Faster
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
      className="h-[240px] flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Фонове світіння */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      </div>

      <Link
        href="/join"
        className={`group relative flex items-center transition-all duration-[600ms] ease-out
                md:bg-transparent md:p-0
            `}
      >
        <div className={`
                overflow-hidden whitespace-normal md:whitespace-nowrap transition-all duration-700 ease-out
                ${animationState === 'final' ? 'max-w-[300px] sm:max-w-[500px] opacity-100 mr-2 md:mr-4' : 'max-w-0 opacity-0'}
                bg-transparent p-0
              `}>
          <span className="font-montserrat text-base sm:text-2xl md:text-3xl uppercase text-black block text-right leading-tight md:group-hover:text-amber-600 transition-colors">
            {t('social.cta_write_us').split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}
          </span>
        </div>

        <div
          className={`
                    flex items-center justify-center rounded-full bg-amber-600 shadow-xl transition-all 
                    z-10 md:group-hover:bg-amber-600 md:group-hover:shadow-2xl md:group-hover:animate-pulseScale
                    /* Mobile Pulsation */
                    animate-pulse md:animate-none
                    ${animationState === 'big' ? 'w-[120px] h-[120px] scale-100 duration-300 ease-out' : ''}
                    ${animationState === 'shrink' ? 'w-16 h-16 scale-90 duration-300 ease-out' : ''}
                    ${animationState === 'final' ? 'w-12 h-12 md:w-16 md:h-16 scale-100 duration-200 ease-out' : ''}
                    ${animationState === 'hidden' ? 'w-0 h-0 scale-0 opacity-0 duration-0' : 'opacity-100'}
                `}
        >
          <div className={`bg-white rounded-full transition-all duration-500
                    ${animationState === 'final' ? 'w-2 h-2 opacity-100' : 'w-0 h-0 opacity-0'}
                `} />
        </div>
      </Link>

      {/* Social Networks - Increased size and stabilized animation */}
      <div className={`flex items-center gap-6 mt-10 transition-all duration-700 delay-300
            ${animationState === 'final' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
        {socialLinks?.facebook && (
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 text-black shadow-sm transition-all duration-300 transform-gpu hover:scale-110 hover:bg-black hover:text-white will-change-transform"
            title="Facebook"
          >
            <Facebook className="w-6 h-6" />
          </a>
        )}

        {socialLinks?.website && (
          <a
            href={socialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 text-black shadow-sm transition-all duration-300 transform-gpu hover:scale-110 hover:bg-black hover:text-white will-change-transform"
            title="Веб-сайт"
          >
            <Globe className="w-6 h-6" />
          </a>
        )}
      </div>
    </div>
  );
};

function SocialProjectCard({ item, onClick }: { item: Initiative; onClick: (item: Initiative) => void }) {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '-40% 0px -40% 0px',
    triggerOnce: false
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = isMobile && inView;
  const title = t(`social.project.${item.id}.title`);
  const description = t(`social.project.${item.id}.description`);

  return (
    <div
      ref={ref}
      onClick={() => onClick(item)}
      className={`
        group relative h-[420px] bg-white cursor-pointer overflow-hidden transition-all duration-500
        flex flex-col p-10 border border-gray-300
        ${isActive ? 'border-amber-600 shadow-xl' : 'hover:border-amber-600 hover:shadow-lg'}
      `}
    >
      {/* Header: Icon Left + Title Right */}
      <div className="flex items-start mb-6">
        <div className={`
                relative w-32 h-32 flex-shrink-0 flex items-center justify-center transition-transform duration-500 ease-out
                ${isActive ? 'scale-105' : 'group-hover:scale-105'}
            `}>
          <Image
            src={item.icon}
            alt={title}
            fill
            className="object-contain"
          />
        </div>

        <h3 className={`
                font-montserrat font-semibold text-base sm:text-lg uppercase leading-tight transition-colors duration-300 text-left
                ${isActive ? 'text-amber-600' : 'text-gray-900 group-hover:text-amber-600'}
            `}>
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className={`
            font-sans text-base leading-relaxed text-gray-600 line-clamp-6 transition-all duration-500 text-left
            ${isActive ? 'opacity-40' : 'group-hover:opacity-60'}
        `}>
        {description}
      </p>

      {/* Action Button */}
      <div className={`
             absolute bottom-6 left-0 right-0 flex justify-center transition-all duration-500
             ${isActive
          ? 'opacity-100 translate-y-0 delay-100'
          : 'opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-100'}
        `}>
        <CircleArrowButton
          text={t('skete.details')}
          variant="dark"
        />
      </div>
    </div>
  );
}

export function SocialProjectsFeed({ initiatives }: { initiatives: Initiative[] }) {
  const { t } = useLanguage();
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);



  const openModal = (item: Initiative) => {
    setSelectedInitiative(item);
    setIsClosing(false);
    setCurrentGalleryIndex(0);
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
    if (selectedInitiative?.gallery && selectedInitiative.gallery.length > 0) {
      setCurrentGalleryIndex((prev) => (prev + 1) % selectedInitiative.gallery!.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedInitiative?.gallery && selectedInitiative.gallery.length > 0) {
      setCurrentGalleryIndex((prev) => (prev - 1 + selectedInitiative.gallery!.length) % selectedInitiative.gallery!.length);
    }
  };

  const modalFullTitle = selectedInitiative ? t(`social.project.${selectedInitiative.id}.fullTitle`) || t(`social.project.${selectedInitiative.id}.title`) : '';
  const modalFullDescription = selectedInitiative ? t(`social.project.${selectedInitiative.id}.fullDescription`) : '';
  const modalDirections = selectedInitiative ? t(`social.project.${selectedInitiative.id}.directions`) : '';
  const modalGoal = selectedInitiative ? t(`social.project.${selectedInitiative.id}.goal`) : '';

  const directionsList = modalDirections ? modalDirections.split('|').filter(Boolean) : [];

  return (
    <>
      {/* Grid Section */}
      <section className="py-24 px-4 sm:px-6 md:px-20 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {initiatives.map((item, index) => (
            <SocialProjectCard key={index} item={item} onClick={openModal} />
          ))}
        </div>
      </section>

      <PhotoInfoModal
        isOpen={!!selectedInitiative}
        onClose={closeModal}
        title={modalFullTitle}
        image={selectedInitiative?.previewImage}
        gallery={selectedInitiative?.gallery}
        currentIndex={currentGalleryIndex}
        onIndexChange={setCurrentGalleryIndex}
        hideBottomGallery={false}
      >
        <div className="space-y-12">
          {/* Main Text Content: About Us & Directions */}
          <div className="space-y-8">
            <div>
              <h3 className="font-montserrat text-2xl mb-4 font-bold border-b pb-2 inline-block border-amber-600">
                {t('social.about_us')}
              </h3>
              <div className="text-gray-700 leading-relaxed font-sans text-lg whitespace-pre-line">
                {modalFullDescription}
              </div>
            </div>

            {directionsList.length > 0 ? (
              <div>
                <h3 className="font-montserrat text-2xl mb-4 font-bold">
                  {t('social.directions')}
                </h3>
                <ul className="space-y-3">
                  {directionsList.map((dir, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-700 text-lg">
                      <div className="mt-2.5 w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                      <span>{dir}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              modalGoal && (
                <div>
                  <h3 className="font-montserrat text-2xl mb-4 font-bold">
                    {t('social.goal')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-sans text-lg">
                    {modalGoal}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Gallery Section - Simplified as requested */}
          {selectedInitiative && selectedInitiative.gallery && selectedInitiative.gallery.length > 0 && (
            <div className="relative w-full h-[300px] md:h-[500px] bg-black overflow-hidden group">
              <Image
                src={selectedInitiative.gallery[currentGalleryIndex]}
                alt="Gallery"
                fill
                priority
                className="object-cover"
                key={currentGalleryIndex}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"></div>

              {/* Controls */}
              {selectedInitiative.gallery.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={prevImage}
                    className="bg-black/40 hover:bg-amber-600 shadow-2xl text-white p-5 rounded-full transition-all flex items-center justify-center transform hover:scale-110 active:scale-95"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="bg-black/40 hover:bg-amber-600 shadow-2xl text-white p-5 rounded-full transition-all flex items-center justify-center transform hover:scale-110 active:scale-95"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Call to Action Section */}
          <div className="pt-16 border-t border-gray-100">
            <CTAAnimation socialLinks={selectedInitiative?.socialLinks} />
          </div>
        </div>
      </PhotoInfoModal>
    </>
  );
}
