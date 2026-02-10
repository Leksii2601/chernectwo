import React from 'react';
import type { Metadata } from 'next';
import { HistoryClient } from '@/components/history/HistoryClient';
import { JsonLd } from '@/components/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUa = lang === 'ua' || lang === 'UA';

  return {
    title: isUa ? 'Історія | Свято-Миколаївський Жидичинський монастир' : 'History | St. Nicholas Zhydychyn Monastery',
    description: isUa
      ? 'Відкрийте для себе тисячолітню історію Свято-Миколаївської Жидичинської обителі.'
      : 'Discover the thousand-year history of the St. Nicholas Zhydychyn Monastery.',
    openGraph: {
      title: isUa ? 'Історія | Свято-Миколаївський Жидичинський монастир' : 'History | St. Nicholas Zhydychyn Monastery',
      description: isUa
        ? 'Хронологія подій, що формували духовне серце Волині.'
        : 'Chronology of events that shaped the spiritual heart of Volyn.',
      images: ['/media/history.avif'],
    },
  };
}

export default async function HistoryPage() {
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
        "name": "Про нас",
        "item": "https://www.chernectvo.com/about"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Історія",
        "item": "https://www.chernectvo.com/about/history"
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <HistoryClient />
    </>
  );
}
