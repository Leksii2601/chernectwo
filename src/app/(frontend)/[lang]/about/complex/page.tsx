'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import { ComplexLayout } from '@/components/complex/ComplexLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function ComplexPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Header with Title */}
      <PageHeader
        title={t('explore.architecture')}
        backgroundImage="/media/church-complex.jpg"
      />

      {/* 2. Map Placeholder Section */}
      <section className="bg-orange-50/30 py-12 border-b border-orange-100">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif text-gray-800 mb-2">{t('complex.map_title')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t('complex.map_description')}
            </p>
          </div>

          {/* Map Placeholder Div */}
          <div className="w-full bg-slate-200 rounded-2xl overflow-hidden shadow-inner border border-slate-300 relative aspect-[16/6] min-h-[300px] flex items-center justify-center group">
            <div className="text-slate-400 font-medium text-lg flex flex-col items-center">
              <svg className="w-16 h-16 mb-4 text-slate-300 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7" />
              </svg>
              <span>{t('complex.map_placeholder')}</span>
            </div>
            {/* Visual decoration for "fake map" */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-500 rounded-full animate-ping opacity-75"></div>
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>

            <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>

            <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
        </div>
      </section>

      {/* 3. Main Content: Sidebar + List */}
      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-16">
        <ComplexLayout />
      </div>

      <Footer />
      <FloatingButton />
    </main>
  );
}
