'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';

import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title={t('nav.about')}
        subtitle={t('page.about_subtitle')}
        backgroundImage="/media/about_bg.jpg" // Assuming image exists or fallback
      />
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <p className="text-xl text-center text-gray-500">{t('generic.under_construction')}</p>
      </div>
      <Footer />

    </main>
  );
}
