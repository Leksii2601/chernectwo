import React from 'react';
import type { Metadata } from 'next';
import { AboutClient } from '@/components/about/AboutClient';
import { JsonLd } from '@/components/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isUa = lang === 'ua' || lang === 'UA';

  return {
    title: isUa ? 'Про нас | Свято-Миколаївський Жидичинський монастир' : 'About Us | St. Nicholas Zhydychyn Monastery',
    description: isUa
      ? 'Дізнайтеся більше про тисячолітню історію, архітектурний ансамбль, скити та соціальну діяльність Свято-Миколаївського Жидичинського монастиря.'
      : 'Learn more about the thousand-year history, architectural ensemble, sketes, and social activities of the St. Nicholas Zhydychyn Monastery.',
    openGraph: {
      title: isUa ? 'Про нас | Свято-Миколаївський Жидичинський монастир' : 'About Us | St. Nicholas Zhydychyn Monastery',
      description: isUa
        ? 'Історія, архітектура та сучасне життя обителі.'
        : 'History, architecture, and modern life of the monastery.',
      images: ['/media/about-us.avif'],
    },
  };
}

export default async function AboutPage() {
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
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <AboutClient />
    </>
  );
}
