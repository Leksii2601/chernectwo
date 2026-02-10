import React from 'react';
import { Footer } from '@/components/landing/Footer';


import { SocialProjectsFeed } from '@/components/social/SocialProjectsFeed';
import { getProjectsData } from '@/data/projectsData';
import { PageHeader } from '@/components/PageHeader';
import { translations } from '@/data/translations';

export const metadata = {
  title: 'Соціальні ініціативи | Свято-Миколаївський Жидичинський монастир',
  description: 'Соціальні та місіонерські проєкти Свято-Миколаївського Жидичинського монастиря: волонтерство, освіта, культура, допомога громаді.',
  openGraph: {
    title: 'Соціальні ініціативи | Свято-Миколаївський Жидичинський монастир',
    description: 'Соціальні проєкти Свято-Миколаївського Жидичинського монастиря.',
    images: ['/media/social-initiatives.avif'],
  },
}

import { JsonLd } from '@/components/JsonLd';

export default async function SocialProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const projectsData = getProjectsData();

  const langKey = (lang.toUpperCase() === 'EN' ? 'EN' : 'UA') as 'UA' | 'EN';
  const t = (key: string) => translations[langKey][key] || key;

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
        "name": "Соціальні ініціативи",
        "item": "https://www.chernectvo.com/social-projects"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white animate-fade-in-fast">
      <JsonLd data={breadcrumbs} />
      <PageHeader backgroundImage="/media/social-initiatives.avif" title={t('social.page_title')} subtitle={t('page.social_subtitle')} />

      <SocialProjectsFeed initiatives={projectsData} />

      <Footer />

    </main>
  );
}
