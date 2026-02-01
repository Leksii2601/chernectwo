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
        "relative min-h-screen shadow-lg bg-cover bg-center bg-no-repeat bg-fixed flex flex-col justify-center pb-10 md:pb-0",
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

      <div className="relative z-10 w-full animate-fade-up-delayed">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center gap-4 text-white">
          <h1 className="font-montserrat text-5xl md:text-[4rem] uppercase tracking-widest text-center leading-tight drop-shadow-2xl">{title}</h1>
          {subtitle && (
            <p className="font-montserrat font-thin text-lg md:text-2xl text-white tracking-[0.2em] uppercase text-center max-w-4xl mt-4">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
