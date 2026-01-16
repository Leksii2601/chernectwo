'use client';

import React from 'react';
import { Header } from '@/components/landing/Header';

export function PageHeader({ title }: { title: string }) {
  return (
    <div className="bg-black/90 pt-48 pb-10 shadow-lg">
      <Header />
       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-end gap-6 text-white">
          <h1 className="font-molodo text-4xl uppercase tracking-wider">{title}</h1>
       </div>
    </div>
  );
}
