'use client';

import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Footer } from '@/components/landing/Footer';
import { PageHeader } from '@/components/PageHeader';
import { useLanguage } from '@/context/LanguageContext';

interface LegalSettings {
    organization: {
        legalEntityName: string;
        edrpouCode: string;
        legalAddress: string;
    };
    contacts: {
        contactEmail: string;
        dpoContact: string;
    };
    providers: {
        paymentProvider: string;
        hostingProvider: string;
        analyticsServices: string;
    };
    refund: {
        maxRefundDays: number;
        refundProcessingDays: number;
    };
    privacy?: any;
    terms?: any;
    refundPolicy?: any;
    lastUpdatedDate: string;
    lastUpdatedDateEN: string;
}

interface LegalSection {
    title: string;
    content: string | string[];
}

interface LegalPageContentProps {
    pageSlug: 'privacy' | 'terms' | 'refundPolicy';
    defaultTitleKey: string;
    defaultSubtitleKey: string;
    defaultLastUpdatedKey: string;
    defaultSections: LegalSection[];
    hideHeaderFooter?: boolean;
}

function replacePlaceholders(text: string, settings: LegalSettings, language: string, specificDate?: string): string {
    if (!text) return '';

    // Use specific document date if provided, otherwise global setting
    let dateStr = language === 'UA' ? settings.lastUpdatedDate : settings.lastUpdatedDateEN;
    
    if (specificDate) {
        // Format specific date
        // Note: The specificDate comes in ISO format from updatedAt 
        dateStr = new Date(specificDate).toLocaleDateString(language === 'UA' ? 'uk-UA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    return text
        .replace(/\{\{LEGAL_ENTITY_NAME\}\}/g, settings.organization.legalEntityName)
        .replace(/\{\{EDRPOU_CODE\}\}/g, settings.organization.edrpouCode)
        .replace(/\{\{LEGAL_ADDRESS\}\}/g, settings.organization.legalAddress)
        .replace(/\{\{CONTACT_EMAIL\}\}/g, settings.contacts.contactEmail)
        .replace(/\{\{DPO_CONTACT\}\}/g, settings.contacts.dpoContact)
        .replace(/\{\{PAYMENT_PROVIDER\}\}/g, settings.providers.paymentProvider)
        .replace(/\{\{HOSTING_PROVIDER\}\}/g, settings.providers.hostingProvider)
        .replace(/\{\{ANALYTICS_SERVICES\}\}/g, settings.providers.analyticsServices)
        .replace(/\{\{MAX_REFUND_DAYS\}\}/g, String(settings.refund.maxRefundDays))
        .replace(/\{\{REFUND_PROCESSING_DAYS\}\}/g, String(settings.refund.refundProcessingDays))
        .replace(/\{\{DATE\}\}/g, dateStr);
}

export function LegalPageContent({
    pageSlug,
    defaultTitleKey,
    defaultSubtitleKey,
    defaultLastUpdatedKey,
    defaultSections,
    hideHeaderFooter = false
}: LegalPageContentProps) {
    const { t, language } = useLanguage();
    const [settings, setSettings] = useState<LegalSettings | null>(null);

    useEffect(() => {
        fetch('/api/legal-settings')
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error('Failed to load legal settings:', err));
    }, []);

    // Determine which content to use: Payload CMS or Default (Translations)
    const cmsPageData = settings ? settings[pageSlug] : null;

    const processText = (text: string): string => {
        if (!settings) return text;
        const specificDate = cmsPageData?.updatedAt;
        return replacePlaceholders(text, settings, language, specificDate);
    };

    // Helper to get sections from any of the possible names
    const getCmsSections = (data: any) => {
        if (!data) return null;
        return data.sectionsUA || data.sectionsEN || data.privacySections || data.termsSections || data.refundSections || data.sections;
    };

    const cmsSections = getCmsSections(cmsPageData);
    const useCms = cmsSections && cmsSections.length > 0;

    const displayTitle = useCms
        ? (language === 'UA' ? cmsPageData.titleUA : cmsPageData.titleEN) || t(defaultTitleKey)
        : t(defaultTitleKey);

    const displaySubtitle = useCms
        ? (language === 'UA' ? cmsPageData.subtitleUA : cmsPageData.subtitleEN) || t(defaultSubtitleKey)
        : t(defaultSubtitleKey);

    const displaySections = useCms
        ? (language === 'UA'
            ? (cmsPageData.sectionsUA || cmsPageData.privacySections || cmsPageData.termsSections || cmsPageData.refundSections || cmsPageData.sections)
            : (cmsPageData.sectionsEN || cmsPageData.privacySections || cmsPageData.termsSections || cmsPageData.refundSections || cmsPageData.sections)
        ).map((s: any) => ({
            title: language === 'UA' ? (s.titleUA || s.title) : (s.titleEN || s.title),
            content: language === 'UA' ? (s.textUA || s.content) : (s.textEN || s.content),
        }))
        : defaultSections;

    const processedSections = displaySections.map((section: any) => ({
        title: processText(section.title),
        content: Array.isArray(section.content)
            ? section.content.map((item: string) => processText(item))
            : processText(section.content),
    }));

    const content = (
        <section className={clsx(
            "max-w-4xl mx-auto w-full flex-grow",
            hideHeaderFooter ? "py-4" : "py-12 md:py-16 px-4"
        )}>
            <p className="text-sm text-gray-500 mb-8 border-b border-gray-200 pb-4">
                {processText(t(defaultLastUpdatedKey))}
            </p>

            <div className="space-y-10">
                {processedSections.map((section: any, index: number) => (
                    <div key={index}>
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                            {section.title}
                        </h2>
                        {Array.isArray(section.content) ? (
                            <ul className="space-y-3">
                                {section.content.map((item: any, i: number) => (
                                    <li key={i} className="text-gray-700 leading-relaxed pl-4 border-l-2 border-amber-600/30">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {section.content}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );

    if (hideHeaderFooter) {
        return content;
    }

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <PageHeader
                title={displayTitle}
                subtitle={displaySubtitle}
                backgroundImage="/media/pic_1.avif"
                titleClassName="normal-case md:text-[4rem]"
            />

            {content}

            <Footer />
        </main>
    );
}
