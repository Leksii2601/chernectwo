'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LegalPageContent } from '@/components/legal/LegalPageContent';

export default function PrivacyPolicyPage() {
    const { t } = useLanguage();

    const sections = [
        { title: t('privacy.s1_title'), content: t('privacy.s1_text') },
        {
            title: t('privacy.s2_title'), content: [
                t('privacy.s2_item1'),
                t('privacy.s2_item2'),
                t('privacy.s2_item3'),
                t('privacy.s2_item4'),
                t('privacy.s2_item5'),
            ]
        },
        {
            title: t('privacy.s3_title'), content: [
                t('privacy.s3_item1'),
                t('privacy.s3_item2'),
                t('privacy.s3_item3'),
                t('privacy.s3_item4'),
            ]
        },
        { title: t('privacy.s4_title'), content: t('privacy.s4_text') },
        { title: t('privacy.s5_title'), content: t('privacy.s5_text') },
        {
            title: t('privacy.s6_title'), content: [
                t('privacy.s6_item1'),
                t('privacy.s6_item2'),
                t('privacy.s6_item3'),
            ]
        },
        { title: t('privacy.s7_title'), content: t('privacy.s7_text') },
        { title: t('privacy.s8_title'), content: t('privacy.s8_text') },
    ];

    return (
        <LegalPageContent
            pageSlug="privacy"
            defaultTitleKey="privacy.title"
            defaultSubtitleKey="privacy.subtitle"
            defaultLastUpdatedKey="privacy.last_updated"
            defaultSections={sections}
        />
    );
}
