'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { SketesGrid } from '@/components/sketes/SketesGrid';
import { Footer } from '@/components/landing/Footer';
import { ScrollRevealSection } from '@/components/animations/ScrollRevealSection';
import { SketeInfoSection } from '@/components/sketes/SketeInfoSection';
import { useLanguage } from '@/context/LanguageContext';

export default function SketesPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-black">
            <PageHeader
                title={t('explore.sketes')}
                backgroundImage="/media/sketes.jpg"
                className="!h-[100vh] !min-h-screen !justify-center !pb-0"
            />

            <ScrollRevealSection className="relative z-10 bg-zinc-900 border-t border-black/80">
                <SketesGrid />
            </ScrollRevealSection>

            <SketeInfoSection />

            <Footer />
        </main>
    );
}
