import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';

import { PilgrimInfo } from '@/components/pilgrims/PilgrimInfo';
import { PilgrimServices } from '@/components/pilgrims/PilgrimServices';
import { translations } from '@/data/translations';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUa = lang === 'ua' || lang === 'UA';

  return {
    title: isUa ? 'Паломнику | Свято-Миколаївський Жидичинський монастир' : 'Pilgrims | St. Nicholas Zhydychyn Monastery',
    description: isUa
      ? 'Інформація для паломників Свято-Миколаївського Жидичинського монастиря.'
      : 'Information for pilgrims of the St. Nicholas Zhydychyn Monastery.',
    openGraph: {
      title: isUa ? 'Паломнику | Свято-Миколаївський Жидичинський монастир' : 'Pilgrims | St. Nicholas Zhydychyn Monastery',
      description: isUa
        ? 'Все, що потрібно знати для відвідування нашої обителі.'
        : 'Everything you need to know for visiting our monastery.',
      images: ['/media/piligrims.avif'],
    },
  };
}

import { JsonLd } from '@/components/JsonLd';

export default async function PilgrimsPage({ params }: { params: Promise<{ lang: string }> }) {
  const langParam = (await params).lang.toUpperCase();
  const currentLang = (langParam === 'EN' || langParam === 'UA' ? langParam : 'UA') as 'UA' | 'EN';
  const t = (key: string) => (translations[currentLang] && translations[currentLang][key]) || key;

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Головна",
        "item": "https://www.chernectvo.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Паломникам",
        "item": "https://www.chernectvo.com/pilgrims"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden animate-fade-in-fast">
      <JsonLd data={breadcrumbs} />
      <PageHeader title={t('nav.pilgrims')} subtitle={t('page.pilgrims_subtitle')} backgroundImage="/media/piligrims.avif" />

      <PilgrimInfo />
      <PilgrimServices />

      <Footer />

    </main>
  );
}
