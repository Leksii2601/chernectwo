'use client';

import React from 'react';
import Link from 'next/link';

import { useLanguage } from '@/context/LanguageContext';

export function SocialInitiatives() {
  const { t } = useLanguage();

  return (
    <section
      id="social-initiatives"
      className="relative w-full min-h-[600px] flex items-center justify-center bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: 'url(/media/social-initiatives.jpg)',
        backgroundAttachment: 'fixed', // Parallax effect
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-left text-white">
        <h2 className="font-montserrat text-4xl md:text-6xl mb-8 tracking-wide">
          {t('social.title')}
        </h2>

        <p className="font-sans text-lg md:text-xl leading-relaxed text-gray-200">
          {t('social.description')}
        </p>

        <div className="mt-12">
          <Link href="/social-projects">
            <button className="border border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-full transition duration-300 font-sans font-semibold uppercase text-sm tracking-wider">
              {t('social.button')}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
