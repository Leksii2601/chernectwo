'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { CircleArrowButton } from '@/components/ui/CircleArrowButton';

import { SocialInitiativesSkeleton } from './LandingSkeleton';

interface SocialInitiativesProps {
  isLoading?: boolean;
}

export function SocialInitiatives({ isLoading }: SocialInitiativesProps) {
  const { t, language } = useLanguage();

  if (isLoading) return <SocialInitiativesSkeleton />;

  return (
    <section
      id="social-initiatives"
      className="relative w-full min-h-[70vh] md:min-h-[600px] flex items-center justify-center bg-fixed bg-center bg-cover overflow-hidden"
      style={{
        backgroundImage: 'url(/media/social-initiatives.avif)',
        backgroundAttachment: 'fixed', // Parallax effect
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
      aria-labelledby="social-initiatives-title"
    >
      {/* Dark Overlay with Gradient for better text readability */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-[1] hidden md:block"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[1920px] w-full mx-auto px-6 sm:px-12 md:px-20 lg:px-40 py-20 text-left md:text-left">
        <div className="max-w-4xl">
          <h2
            id="social-initiatives-title"
            className="font-montserrat text-2xl sm:text-3xl md:text-5xl lg:text-7xl mb-6 md:mb-10 tracking-tight uppercase text-white leading-[1.1]"
          >
            {t('social.title')}
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 mb-16 md:mb-14 max-w-3xl opacity-90">
            {t('social.description')}
          </p>

          <div className="flex justify-start">
            <CircleArrowButton
              text={t('skete.details')}
              href={`/${language.toLowerCase()}/social-projects`}
              variant="light"
            />
          </div>
        </div>
      </div>

      {/* Parallax fix for mobile (disables fixed background which is buggy on iOS) */}
      <style jsx>{`
        @media (max-width: 1024px) {
          section {
            background-attachment: scroll !important;
          }
        }
      `}</style>
    </section>
  );
}
