'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';

import { HistoryTimeline } from '@/components/history/HistoryTimeline';
import { useLanguage } from '@/context/LanguageContext';

export default function HistoryPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      {/* Intro Header */}
      <PageHeader
        title={t('explore.history')}
        subtitle={t('history.subtitle')}
        backgroundImage="/media/history.jpg"
      />

      {/* Intro Text Section */}
      <section className="py-16 md:py-24 max-w-[1000px] mx-auto px-4 text-center">
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-serif max-w-4xl mx-auto">
          {t('history.intro')}
        </p>
      </section>

      {/* Timeline Component */}
      <HistoryTimeline />

      <Footer />

    </main>
  );
}
