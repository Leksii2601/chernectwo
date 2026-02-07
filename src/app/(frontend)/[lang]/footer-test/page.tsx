'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { useLanguage } from '@/context/LanguageContext';

// Import all variants
import { FooterVariant1 } from '@/components/landing/footers-collection/FooterVariant1';
import { FooterVariant2, FooterVariant3 } from '@/components/landing/footers-collection/FooterVariantsBatch2';
import { FooterVariant4, FooterVariant5 } from '@/components/landing/footers-collection/FooterVariantsBatch3';
import { FooterVariant6, FooterVariant7, FooterVariant8, FooterVariant9, FooterVariant10 } from '@/components/landing/footers-collection/FooterVariantsBatch4';

export default function FooterDemoPage() {
    const { t } = useLanguage();

    const variants = [
        { name: 'Variant 1: Elegante Black', component: <FooterVariant1 /> },
        { name: 'Variant 2: Minimalist Zen', component: <FooterVariant2 /> },
        { name: 'Variant 3: Social Hub', component: <FooterVariant3 /> },
        { name: 'Variant 4: Modern Glass', component: <FooterVariant4 /> },
        { name: 'Variant 5: Typography Focus', component: <FooterVariant5 /> },
        { name: 'Variant 6: Classic Monastery Grid', component: <FooterVariant6 /> },
        { name: 'Variant 7: The Gold Monastery', component: <FooterVariant7 /> },
        { name: 'Variant 8: Graphic Watermark', component: <FooterVariant8 /> },
        { name: 'Variant 9: Vertical Column Style', component: <FooterVariant9 /> },
        { name: 'Variant 10: The Monastery Dashboard', component: <FooterVariant10 /> },
    ];

    return (
        <main className="min-h-screen bg-gray-100">
            <PageHeader
                title="FOOTER LAB"
                subtitle="Огляд 10 концепцій футера для Жидичинського монастиря"
                backgroundImage="/media/history.jpg"
            />

            <div className="py-20 space-y-32">
                {variants.map((v, i) => (
                    <div key={i} className="space-y-8">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-12 h-12 bg-amber-600 text-white font-black rounded-full text-xl shadow-lg">
                                    {i + 1}
                                </span>
                                <h2 className="text-3xl font-black tracking-tighter text-gray-900 uppercase">
                                    {v.name}
                                </h2>
                            </div>
                            <div className="h-1 w-20 bg-amber-600 mt-2"></div>
                        </div>

                        <div className="border-y border-gray-200 bg-white">
                            {v.component}
                        </div>
                    </div>
                ))}
            </div>

            {/* Admin Note */}
            <div className="max-w-4xl mx-auto py-20 px-6 text-center space-y-6">
                <h3 className="text-2xl font-bold">Як застосувати варіант?</h3>
                <p className="text-gray-600">
                    Щоб встановити обраний футер як основний, відкрийте файл <code className="bg-gray-200 px-2 py-1 rounded">src/app/(frontend)/[lang]/layout.tsx</code> та замініть стандартний <code className="bg-gray-200 px-2 py-1 rounded">Footer</code> на обраний компонент.
                </p>
            </div>
        </main>
    );
}
