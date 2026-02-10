'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { clsx } from 'clsx';
import { useSearchParams } from 'next/navigation';
import { LegalPageContent } from '@/components/legal/LegalPageContent';

type LegalTabType = 'privacy' | 'terms' | 'refund';

function LegalContent() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<string>('privacy');
    const [settings, setSettings] = useState<any>(null);
    const [availableTabs, setAvailableTabs] = useState<{ id: string, label: string }[]>([]);

    useEffect(() => {
        fetch('/api/legal-settings')
            .then(res => res.json())
            .then(data => {
                setSettings(data);

                // Construct dynamic tabs from collection documents
                const docTabs = Object.keys(data.documents || {}).map(slug => ({
                    id: slug,
                    label: language === 'UA' ? data.documents[slug].titleUA : data.documents[slug].titleEN
                }));

                // If we have documents in CMS, use them. Otherwise fall back to defaults.
                if (docTabs.length > 0) {
                    setAvailableTabs(docTabs);

                    // Set active tab from URL or default to first
                    const tab = searchParams?.get('tab');
                    if (tab && data.documents[tab]) {
                        setActiveTab(tab);
                    } else {
                        setActiveTab(docTabs[0].id);
                    }
                } else {
                    // Fallback to defaults if CMS collection is empty
                    setAvailableTabs([
                        { id: 'privacy', label: language === 'UA' ? 'Конфіденційність' : 'Privacy' },
                        { id: 'terms', label: language === 'UA' ? 'Умови' : 'Terms' },
                        { id: 'refund', label: language === 'UA' ? 'Повернення' : 'Refunds' }
                    ]);

                    const tab = searchParams?.get('tab');
                    if (tab && ['privacy', 'terms', 'refund'].includes(tab)) {
                        setActiveTab(tab);
                    }
                }
            })
            .catch(err => console.error('Failed to fetch legal settings:', err));
    }, [language, searchParams]);

    // Default sections as fallbacks if CMS data is missing
    const privacySections = [
        { title: t('privacy.s1_title'), content: t('privacy.s1_text') },
        { title: t('privacy.s2_title'), content: [t('privacy.s2_text')] },
        { title: t('privacy.s3_title'), content: [t('privacy.s3_text')] },
        { title: t('privacy.s4_title'), content: [t('privacy.s4_text')] },
        { title: t('privacy.s5_title'), content: t('privacy.s5_text') },
        { title: t('privacy.s6_title'), content: [t('privacy.s6_text')] },
        { title: t('privacy.s7_title'), content: t('privacy.s7_text') },
        { title: t('privacy.s8_title'), content: t('privacy.s8_text') },
    ];

    const termsSections = [
        { title: t('terms.s1_title'), content: t('terms.s1_text') },
        { title: t('terms.s2_title'), content: [t('terms.s2_text')] },
        { title: t('terms.s3_title'), content: [t('terms.s3_text')] },
        { title: t('terms.s4_title'), content: [t('terms.s4_text')] },
        { title: t('terms.s5_title'), content: t('terms.s5_text') },
        { title: t('terms.s6_title'), content: t('terms.s6_text') },
        { title: t('terms.s7_title'), content: t('terms.s7_text') },
        { title: t('terms.s8_title'), content: t('terms.s8_text') },
    ];

    const refundSections = [
        { title: t('refund.s1_title'), content: t('refund.s1_text') },
        { title: t('refund.s2_title'), content: [t('refund.s2_item1'), t('refund.s2_item2')] },
        { title: t('refund.s3_title'), content: t('refund.s3_text') },
        { title: t('refund.s4_title'), content: [t('refund.s4_item1'), t('refund.s4_item2'), t('refund.s4_item3')] },
        { title: t('refund.s5_title'), content: t('refund.s5_text') },
    ];

    const getDefaultSections = (tabId: string) => {
        if (tabId === 'privacy') return privacySections;
        if (tabId === 'terms') return termsSections;
        if (tabId === 'refund') return refundSections;
        return [];
    };

    return (
        <main className="min-h-screen bg-white font-montserrat tracking-tight overflow-x-hidden animate-fade-in-fast">
            <PageHeader
                title={language === 'UA' ? 'Юридична інформація' : 'Legal Information'}
                subtitle={language === 'UA' ? 'Політики та умови використання' : 'Policies and Terms of Use'}
                backgroundImage="/media/gallery.avif"
            />

            {/* Tab Navigation */}
            <div className="border-b border-gray-100 bg-white sticky top-0 z-30 mt-10">
                <div className="max-w-[1400px] mx-auto px-6 flex justify-center overflow-x-auto no-scrollbar">
                    <div className="flex gap-10 md:gap-16 min-w-max">
                        {availableTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={clsx(
                                    "py-5 md:py-7 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.15em] md:tracking-[0.3em] transition-all relative",
                                    activeTab === tab.id ? "text-amber-600" : "text-gray-400 hover:text-gray-900"
                                )}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-[-4px] right-[-4px] h-[3px] bg-amber-600 rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mx-auto px-6 py-10 lg:py-24 transition-all duration-500 max-w-[1100px]">
                <div key={activeTab} className="animate-fade-in-fast">
                    <LegalPageContent
                        pageSlug={activeTab as any}
                        defaultTitleKey={`${activeTab}.title`}
                        defaultSubtitleKey={`${activeTab}.subtitle`}
                        defaultLastUpdatedKey={`${activeTab}.last_updated`}
                        defaultSections={getDefaultSections(activeTab)}
                        hideHeaderFooter={true}
                    />
                </div>
            </div>

            <Footer />
        </main>
    );
}


export default function LegalPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
        </div>}>
            <LegalContent />
        </Suspense>
    );
}
