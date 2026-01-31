import React from 'react';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';

import { SocialProjectsFeed } from '@/components/social/SocialProjectsFeed';
import { getProjectsData } from '@/data/projectsData';
import { PageHeader } from '@/components/PageHeader';
import { translations } from '@/data/translations';

export const metadata = {
  title: 'Місіонерські Проєкти - Жидичинський Монастир',
  description: 'Соціальні та місіонерські проєкти Жидичинського монастиря: волонтерство, освіта, культура, допомога громаді.',
}

export default async function SocialProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const projectsData = getProjectsData(lang);

  const langKey = (lang.toUpperCase() === 'EN' ? 'EN' : 'UA') as 'UA' | 'EN';
  const t = (key: string) => translations[langKey][key] || key;

  return (
    <main className="min-h-screen bg-white">
      <PageHeader backgroundImage="/media/social-initiatives.jpg" title={t('social.page_title')} />

      <SocialProjectsFeed initiatives={projectsData} />

      <Footer />
      <FloatingButton />
    </main>
  );
}
