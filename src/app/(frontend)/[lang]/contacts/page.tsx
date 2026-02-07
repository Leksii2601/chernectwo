'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { X } from 'lucide-react';

import { clsx } from 'clsx';
import Image from 'next/image';
import { TextModal } from '@/components/ui/TextModal';

// Separate section components
import { TabType, PressItem } from '@/components/contacts/types';
import { pressItems, getSocialLinks, ViberIcon, WhatsappIcon } from '@/components/contacts/ContactsData';
import { ContactsTab } from '@/components/contacts/ContactsTab';
import { MapTab } from '@/components/contacts/MapTab';
import { PressTab } from '@/components/contacts/PressTab';
import { PressModalContent } from '@/components/contacts/PressModalContent';
import { copyToClipboard } from '@/components/contacts/utils';

export default function ContactsPage() {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState<TabType>('contacts');
    const [selectedPressItem, setSelectedPressItem] = useState<PressItem | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formError, setFormError] = useState('');

    const socialLinks = getSocialLinks(ViberIcon, WhatsappIcon);

    const handleSelectPressItem = (item: PressItem) => {
        setSelectedPressItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPressItem(null);
        setCopiedIndex(null);
    };

    const handleCopy = async (text: string, index: number) => {
        const success = await copyToClipboard(text);
        if (success) {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        }
    };

    return (
        <main className="min-h-screen bg-white font-montserrat tracking-tight overflow-x-hidden">
            <PageHeader
                title={t('contacts.title')}
                subtitle={t('page.contacts_subtitle')}
                backgroundImage="/media/contacts.jpg"
            />

            {/* Tab Navigation */}
            <div className="border-b border-gray-100 bg-white sticky top-0 z-30 mt-10">
                <div className="max-w-[1400px] mx-auto px-6 flex justify-center">
                    <div className="flex gap-10 md:gap-16">
                        {(['contacts', 'map', 'press'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={clsx(
                                    "py-5 md:py-7 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.15em] md:tracking-[0.3em] transition-all relative",
                                    activeTab === tab ? "text-amber-600" : "text-gray-400 hover:text-gray-900"
                                )}
                            >
                                {tab === 'contacts' && (language === 'UA' ? 'Контакти' : 'Contacts')}
                                {tab === 'map' && (language === 'UA' ? 'Карта' : 'Map')}
                                {tab === 'press' && (language === 'UA' ? 'Для ЗМІ' : 'For Press')}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-[-4px] right-[-4px] h-[3px] bg-amber-600 rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={clsx(
                "mx-auto px-6 py-10 lg:py-24 transition-all duration-500 max-w-[1100px]"
            )}>
                {activeTab === 'contacts' && (
                    <ContactsTab
                        socialLinks={socialLinks}
                        submitStatus={submitStatus}
                        setSubmitStatus={setSubmitStatus}
                        isSubmitting={isSubmitting}
                        setIsSubmitting={setIsSubmitting}
                        formData={formData}
                        setFormData={setFormData}
                        formError={formError}
                        setFormError={setFormError}
                    />
                )}

                {activeTab === 'map' && <MapTab />}

                {activeTab === 'press' && (
                    <PressTab
                        pressItems={pressItems}
                        onSelectItem={handleSelectPressItem}
                    />
                )}
            </div>

            {/* Modal Layer */}
            <TextModal
                isOpen={showModal && !!selectedPressItem}
                onClose={handleCloseModal}
                title={selectedPressItem ? (language === 'UA' ? selectedPressItem.title_ua : selectedPressItem.title_en) : ''}
            >
                {selectedPressItem && (
                    <PressModalContent
                        item={selectedPressItem}
                        copiedIndex={copiedIndex}
                        onCopy={handleCopy}
                        setFullscreenImage={setFullscreenImage}
                    />
                )}
            </TextModal>

            {/* Fullscreen Image Overlay */}
            {fullscreenImage && (
                <div
                    className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out animate-in fade-in duration-300"
                    onClick={() => setFullscreenImage(null)}
                >
                    <div className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center">
                        <button
                            onClick={() => setFullscreenImage(null)}
                            className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <Image
                            src={`/media/logos/${fullscreenImage}.jpg`}
                            alt="Fullscreen Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
