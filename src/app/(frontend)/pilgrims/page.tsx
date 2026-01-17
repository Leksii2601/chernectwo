import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';

export default function PilgrimsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader title="ПАЛОМНИКУ" backgroundImage="/media/piligrims.jpg" />
      <div className="max-w-[1200px] mx-auto px-4 py-12">
         <p className="text-xl text-center text-gray-500">Сторінка знаходиться в розробці</p>
      </div>
      <Footer />
      <FloatingButton />
    </main>
  );
}
