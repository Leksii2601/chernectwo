'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { CalendarSection } from '@/components/landing/CalendarSection';
import { NewsSection } from '@/components/landing/NewsSection';
import { SocialInitiatives } from '@/components/landing/SocialInitiatives';
import { ExploreMore } from '@/components/landing/ExploreMore';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';
import { newsData } from '@/data/newsData';

export function LandingClient() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-white overflow-x-hidden">
            <Header isLoading={isLoading} />
            <Hero isLoading={isLoading} />
            <CalendarSection isLoading={isLoading} />
            <NewsSection news={newsData} isLoading={isLoading} showTitle={true} />
            <SocialInitiatives isLoading={isLoading} />
            <ExploreMore isLoading={isLoading} />
            <FAQ isLoading={isLoading} />
            <Footer isLoading={isLoading} />
        </main>
    );
}
