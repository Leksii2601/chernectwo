import React from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import '../styles.css'; 
import { SocialProjectsFeed } from '@/components/social/SocialProjectsFeed';
import { projectsData } from '@/data/projectsData';

export const metadata = {
  title: 'Місіонерські Проєкти - Жидичинський Монастир',
  description: 'Соціальні та місіонерські проєкти Жидичинського монастиря: волонтерство, освіта, культура, допомога громаді.',
}

export default function SocialProjectsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Parallax */}
      <section 
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: 'url(/media/social-iniviatives.jpeg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 font-molodo text-5xl md:text-7xl text-white text-center tracking-wider px-4">
          МІСІОНЕРСЬКІ ПРОЄКТИ
        </h1>
      </section>

      <SocialProjectsFeed initiatives={projectsData} />

      <Footer />
      <FloatingButton />
    </main>
  );
}
