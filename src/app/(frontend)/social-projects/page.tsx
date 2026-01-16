import React from 'react';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import '../styles.css'; 
import { SocialProjectsFeed } from '@/components/social/SocialProjectsFeed';
import { projectsData } from '@/data/projectsData';
import { PageHeader } from '@/components/PageHeader';

export const metadata = {
  title: 'Місіонерські Проєкти - Жидичинський Монастир',
  description: 'Соціальні та місіонерські проєкти Жидичинського монастиря: волонтерство, освіта, культура, допомога громаді.',
}

export default function SocialProjectsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader title="СОЦІАЛЬНІ ПРОЄКТИ" />

      <SocialProjectsFeed initiatives={projectsData} />

      <Footer />
      <FloatingButton />
    </main>
  );
}
