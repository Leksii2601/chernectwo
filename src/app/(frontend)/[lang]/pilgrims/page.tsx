import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import { PilgrimInfo } from '@/components/pilgrims/PilgrimInfo';
import { PilgrimServices } from '@/components/pilgrims/PilgrimServices';

export default function PilgrimsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader title="ПАЛОМНИКУ" backgroundImage="/media/piligrims.jpg" />
      
      <PilgrimInfo />
      <PilgrimServices />

      <Footer />
      <FloatingButton />
    </main>
  );
}
