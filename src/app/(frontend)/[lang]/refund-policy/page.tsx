'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LegalPageContent } from '@/components/legal/LegalPageContent';

export default function RefundPolicyPage() {
    const { t } = useLanguage();

    const sections = [
        { title: t('refund.s1_title'), content: t('refund.s1_text') },
        {
            title: t('refund.s2_title'), content: [
                t('refund.s2_item1'),
                t('refund.s2_item2'),
            ]
        },
        { title: t('refund.s3_title'), content: t('refund.s3_text') },
        {
            title: t('refund.s4_title'), content: [
                t('refund.s4_item1'),
                t('refund.s4_item2'),
                t('refund.s4_item3'),
            ]
        },
        { title: t('refund.s5_title'), content: t('refund.s5_text') },
    ];

    return (
        <LegalPageContent
            pageSlug="refundPolicy"
            defaultTitleKey="refund.title"
            defaultSubtitleKey="refund.subtitle"
            defaultLastUpdatedKey="refund.last_updated"
            defaultSections={sections}
        />
    );
}
