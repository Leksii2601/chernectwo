import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { SketesGrid } from '@/components/sketes/SketesGrid';
import { Footer } from '@/components/landing/Footer';
import { ScrollRevealSection } from '@/components/animations/ScrollRevealSection';
import { SketeInfoSection } from '@/components/sketes/SketeInfoSection';

export const metadata = {
    title: 'Скити та Подвір\'я | Жидичинський Монастир',
    description: 'Дізнайтеся про скити та подвір\'я Свято-Миколаївського Жидичинського монастиря.'
};

export default function SketesPage() {
    return (
        <main className="min-h-screen bg-black">
            <PageHeader 
                title="Скити" 
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
