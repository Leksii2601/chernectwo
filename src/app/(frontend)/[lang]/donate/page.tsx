'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Footer } from '@/components/landing/Footer';
import { PageHeader } from '@/components/PageHeader';
import { useLanguage } from '@/context/LanguageContext';
import { DonationTabs } from '@/components/landing/DonationTabs';
import { Check } from 'lucide-react'; // Needed if we keep the toast logic in page, but tabs handle their own copying. 
// Actually Tabs has internal copied state. If we want global toast, we need to lift state. 
// For now, DonationTabs handles simple feedback.

export default function DonatePage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader
        title={t('donate.title')}
        subtitle={t('page.donate_subtitle')}
        backgroundImage="/media/donate.jpg"
        titleClassName="normal-case md:text-[5rem]"
      />

      {/* Hero Section */}
      <section className="pt-12 pb-12 px-4 bg-white text-center shadow-sm relative z-10">
        <p className="text-gray-900 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed font-sans font-medium">
          {t('donate.hero_text')}
        </p>
      </section>

      {/* Donation Tabs Section */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full flex-grow">
        <DonationTabs />
      </section>

      <Footer />
    </main>
  );
}