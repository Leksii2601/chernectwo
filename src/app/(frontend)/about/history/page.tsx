'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import { HistoryTimeline } from '@/components/history/HistoryTimeline';

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Intro Header */}
      <PageHeader 
        title="ІСТОРІЯ" 
        subtitle="Шлях крізь століття" 
        backgroundImage="/media/history.jpg" 
      />

      {/* Intro Text Section */}
      <section className="py-16 md:py-24 max-w-[1000px] mx-auto px-4 text-center">
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-serif max-w-4xl mx-auto">
          Жидичинський монастир – це не просто будівлі, це тисячолітня історія святості, боротьби та відродження. 
          Кожен камінь тут дихає молитвою поколінь ченців, які творили духовну твердиню Волині. 
          Запрошуємо вас у подорож крізь час.
        </p>
      </section>

      {/* Timeline Component */}
      <HistoryTimeline />

      <Footer />
      <FloatingButton />
    </main>
  );
}
