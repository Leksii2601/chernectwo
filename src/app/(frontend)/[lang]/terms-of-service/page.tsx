'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LegalPageContent } from '@/components/legal/LegalPageContent';

export default function TermsOfServicePage() {
    const { t } = useLanguage();

    const sections = [
        { title: t('terms.s1_title'), content: t('terms.s1_text') },
        {
            title: t('terms.s2_title'), content: [
                t('terms.s2_item1'),
                t('terms.s2_item2'),
                t('terms.s2_item3'),
            ]
        },
        {
            title: t('terms.s3_title'), content: [
                t('terms.s3_item1'),
                t('terms.s3_item2'),
                t('terms.s3_item3'),
                t('terms.s3_item4'),
            ]
        },
        { title: t('terms.s4_title'), content: t('terms.s4_text') },
        { title: t('terms.s5_title'), content: t('terms.s5_text') },
        {
            title: t('terms.s6_title'), content: [
                t('terms.s6_item1'),
                t('terms.s6_item2'),
                t('terms.s6_item3'),
            ]
        },
        { title: t('terms.s7_title'), content: t('terms.s7_text') },
        { title: t('terms.s8_title'), content: t('terms.s8_text') },
    ];

    return (
        <LegalPageContent
            pageSlug="terms"
            defaultTitleKey="terms.title"
            defaultSubtitleKey="terms.subtitle"
            defaultLastUpdatedKey="terms.last_updated"
            defaultSections={sections}
        />
    );
}
