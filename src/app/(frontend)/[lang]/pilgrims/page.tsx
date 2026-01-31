import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import { PilgrimInfo } from '@/components/pilgrims/PilgrimInfo';
import { PilgrimServices } from '@/components/pilgrims/PilgrimServices';
import { translations } from '@/context/LanguageContext';

export default async function PilgrimsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const currentLang = (lang.toUpperCase() as 'UA' | 'EN') || 'UA';
  const t = (key: string) => translations[currentLang][key] || key;

  return (
    <main className="min-h-screen bg-white">
      <PageHeader title={t('nav.pilgrims')} backgroundImage="/media/piligrims.jpg" />

      <PilgrimInfo />
      <PilgrimServices />

      <Footer />
      <FloatingButton />
    </main>
  );
}
