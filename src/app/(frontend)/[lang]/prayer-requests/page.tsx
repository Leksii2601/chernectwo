'use client';

import React, { useState, useRef } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { useLanguage } from '@/context/LanguageContext';

import { PrayerNote } from './components/PrayerNote';
import { PrayerForm, CurrencyType } from './components/PrayerForm';

type ServiceType = {
    id: string;
    nameKey: string;
};

const SERVICES: ServiceType[] = [
    { id: 'simple', nameKey: 'prayer.simple' },
    { id: 'sorokoust', nameKey: 'prayer.sorokoust' },
];

export default function PrayerNotePage() {
    const { t } = useLanguage();
    const [noteType, setNoteType] = useState<'health' | 'repose'>('health');
    const [names, setNames] = useState<string[]>([]);
    const [currentName, setCurrentName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceType>(SERVICES[0]);
    const [showError, setShowError] = useState(false);
    const [showNoNamesError, setShowNoNamesError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [donationAmount, setDonationAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>('UAH');
    const [showMinAmountError, setShowMinAmountError] = useState(false);

    const handleDonationChange = (val: string) => {
        setDonationAmount(val);
        setShowMinAmountError(false);
    };

    const handleCurrencyChange = (curr: CurrencyType) => {
        setSelectedCurrency(curr);
        setShowMinAmountError(false);
    };

    const noteRef = useRef<HTMLDivElement>(null);

    const NAMES_PER_NOTE = 10;
    const MAX_TOTAL_NAMES = 10;

    const formatName = (name: string) => {
        const trimmed = name.trim();
        if (!trimmed) return '';
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const isValid = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s'-]*$/.test(val);

        if (isValid) {
            setCurrentName(val);
            setShowError(false);
        } else {
            setShowError(true);
        }
    };

    const addName = () => {
        const formatted = formatName(currentName);

        if (formatted && names.length < MAX_TOTAL_NAMES) {
            setNames([...names, formatted]);
            setCurrentName('');
            setShowError(false);
            setShowNoNamesError(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addName();
        }
    };

    const removeName = (index: number) => {
        const newNames = names.filter((_, i) => i !== index);
        setNames(newNames);
    };

    const updateName = (index: number, newName: string) => {
        // 1. Character filtering (allow letters, spaces, hyphens, apostrophes)
        // Using regex to remove invalid characters
        const filtered = newName.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s'-]/g, '');

        // 2. Auto-capitalization (First letter uppercase, rest as typed)
        const formatted = filtered.length > 0 ? filtered.charAt(0).toUpperCase() + filtered.slice(1) : '';

        const updatedNames = [...names];

        // If index is beyond current names, we'll append
        if (index >= updatedNames.length) {
            updatedNames.push(formatted);
        } else {
            updatedNames[index] = formatted;
        }

        // 3. Compacting (Rise to top): Remove empty strings from the middle
        // This ensures names always occupy continuous lines from the top
        const compacted = updatedNames.filter(n => n.trim() !== '');

        setNames(compacted);
        setShowNoNamesError(false);
    };

    const handleSubmit = async () => {
        if (names.length === 0) {
            setShowNoNamesError(true);
            return;
        }

        if (!userEmail || !userEmail.includes('@')) {
            setShowEmailError(true);
            const emailInput = document.getElementById('user-email');
            if (emailInput) {
                emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Min amount validation
        const amount = Number(donationAmount) || 0;
        const minAmount = selectedCurrency === 'UAH' ? 100 : 5;
        if (amount < minAmount) {
            setShowMinAmountError(true);
            return;
        }
        setShowMinAmountError(false);

        setShowEmailError(false);
        setIsSubmitting(true);

        const finalNote = {
            id: 'note-' + Date.now(),
            names,
            type: noteType,
            service: selectedService,
            amount: amount,
            currency: selectedCurrency
        };

        try {
            const res = await fetch('/api/submit-prayer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    notes: [finalNote],
                    email: userEmail,
                    total: finalNote.amount,
                    currency: finalNote.currency
                }),
            });

            if (res.ok) {
                alert(t('prayer.success'));
                setNames([]);
                setUserEmail('');
                setDonationAmount('');
                setShowNoNamesError(false);
                setShowEmailError(false);
                setShowMinAmountError(false);
            } else {
                alert('Error processing request.');
            }
        } catch (error) {
            console.error(error);
            alert('Connection error.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <main className="min-h-screen bg-white font-montserrat overflow-x-hidden pb-32 lg:pb-0">
            <PageHeader
                title={t('prayer.title')}
                subtitle={t('page.prayer_subtitle')}
                backgroundImage="/media/prayer-requests.jpg"
            />

            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[120px] py-12 lg:py-32">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 items-start justify-center">

                    {/* LEFT COLUMN: The Note Visual */}
                    <div ref={noteRef} className="w-full lg:w-[480px] flex-shrink-0 flex flex-col items-center gap-6 order-2 lg:order-1 animate-fade-in">

                        <PrayerNote
                            noteType={noteType}
                            selectedService={selectedService}
                            names={names}
                            namesPerNote={NAMES_PER_NOTE}
                            onUpdateName={updateName}
                            onRemoveName={removeName}
                        />
                    </div>

                    {/* RIGHT COLUMN: Controls Form */}
                    <div className="w-full lg:flex-1 max-w-xl space-y-8 order-1 lg:order-2">
                        <PrayerForm
                            noteType={noteType}
                            setNoteType={setNoteType}
                            services={SERVICES}
                            selectedService={selectedService}
                            setSelectedService={setSelectedService}
                            currentName={currentName}
                            setCurrentName={setCurrentName}
                            onInputChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onAddName={addName}
                            namesLength={names.length}
                            maxNames={MAX_TOTAL_NAMES}
                            showError={showError}
                            showNoNamesError={showNoNamesError}
                            userEmail={userEmail}
                            setUserEmail={setUserEmail}
                            showEmailError={showEmailError}
                            setShowEmailError={setShowEmailError}
                            donationAmount={donationAmount}
                            setDonationAmount={handleDonationChange}
                            selectedCurrency={selectedCurrency}
                            setSelectedCurrency={handleCurrencyChange}
                            showMinAmountError={showMinAmountError}
                        />

                        {/* Submit Button Block */}
                        <div className="lg:static fixed bottom-0 left-0 right-0 bg-white border-t lg:border-none p-4 lg:p-0 z-[100] transition-all">
                            <div className="max-w-xl mx-auto lg:mx-0">
                                <button
                                    onClick={handleSubmit}
                                    disabled={names.length === 0 || isSubmitting}
                                    className="w-full bg-black text-white h-12 lg:h-14 rounded-xl font-bold text-[10px] lg:text-xs uppercase tracking-[0.4em] hover:bg-amber-600 disabled:bg-gray-100 disabled:text-gray-300 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {t('prayer.processing')}
                                        </>
                                    ) : (t('prayer.submit'))}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
