'use client';

import React from 'react';
import { Header } from '@/components/landing/Header';
import { clsx } from 'clsx';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string; // Allow custom classes
}

export function PageHeader({ title, subtitle, backgroundImage, className }: PageHeaderProps) {
  return (
    <div 
      className={clsx(
          "relative h-[50vh] md:h-[60vh] min-h-[510px] shadow-lg bg-cover bg-center bg-no-repeat bg-fixed flex flex-col justify-end pb-10 md:pb-40",
          className
      )}
      style={{ 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundColor: backgroundImage ? undefined : 'rgba(0,0,0,0.9)'
      }}
    >
      {/* Dark overlay ensuring text readability */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <Header />
      
      <div className="relative z-10 w-full">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center gap-4 text-white">
            <h1 className="font-montserrat text-3xl md:text-5xl uppercase tracking-widest text-center">{title}</h1>
            {subtitle && (
              <p className="font-sans text-lg md:text-xl text-gray-200 text-center max-w-2xl">{subtitle}</p>
            )}
        </div>
      </div>
    </div>
  );
}
