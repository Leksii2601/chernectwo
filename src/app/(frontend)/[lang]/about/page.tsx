'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title={language === 'UA' ? 'Про монастир' : 'About Monastery'}
        subtitle={language === 'UA' ? 'Розділ у розробці' : 'Section under development'}
        backgroundImage="/media/history.jpg"
      />

      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <div className="inline-block w-20 h-1 bg-amber-600 mb-12"></div>
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-gray-900 mb-8 font-montserrat">
          {language === 'UA' ? 'Оновлення розділу' : 'Section Update'}
        </h2>
        <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
          {language === 'UA'
            ? 'Ця сторінка наразі оновлюється. Будь ласка, використовуйте меню, щоб переглянути конкретні розділи: історію, святині або розклад богослужінь.'
            : 'This page is currently being updated. Please use the menu to view specific sections: history, shrines, or the service schedule.'}
        </p>

        <div className="mt-16 flex justify-center gap-8 opacity-20">
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <div className="w-2 h-2 rounded-full bg-black"></div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
