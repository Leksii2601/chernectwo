'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';

import { X, Plus, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type ServiceType = {
    id: string;
    nameKey: string;
    price: number;
};

const SERVICES: ServiceType[] = [
    { id: 'simple', nameKey: 'prayer.simple', price: 10 },
    { id: 'sorokoust', nameKey: 'prayer.sorokoust', price: 200 },
    { id: 'year', nameKey: 'prayer.year', price: 2000 },
];

export default function PrayerNotePage() {
    const { t } = useLanguage();
    const [noteType, setNoteType] = useState<'health' | 'repose'>('health');
    const [names, setNames] = useState<string[]>([]);
    const [currentName, setCurrentName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceType>(SERVICES[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Maximum 10 names per note
    const MAX_NAMES = 10;

    const addName = () => {
        if (currentName.trim() && names.length < MAX_NAMES) {
            setNames([...names, currentName.trim()]);
            setCurrentName('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addName();
        }
    };

    const removeName = (index: number) => {
        setNames(names.filter((_, i) => i !== index));
    };

    const calculateTotal = () => {
        return names.length * selectedService.price;
    };

    const handleSubmit = async () => {
        if (names.length === 0) {
            alert(t('prayer.error_no_names'));
            return;
        }
        if (!userEmail || !userEmail.includes('@')) {
            alert(t('prayer.error_invalid_email'));
            return;
        }

        setIsSubmitting(true);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

            const res = await fetch('/api/submit-prayer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    names,
                    type: noteType,
                    service: selectedService,
                    amount: calculateTotal(),
                    email: userEmail
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (res.ok) {
                alert(t('prayer.success'));
                setNames([]);
                setUserEmail('');
            } else {
                alert('Error processing request.');
            }
        } catch (error: unknown) {
            console.error(error);
            if (typeof error === 'object' && error !== null && 'name' in error && (error as { name: string }).name === 'AbortError') {
                alert('Request timed out. Please check your connection.');
            } else {
                alert('Connection error.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const getServiceName = (service: ServiceType) => {
        return t(service.nameKey);
    };

    return (
        <main className="min-h-screen bg-gray-50 font-sans">
            <PageHeader title={t('prayer.title')} subtitle={t('page.prayer_subtitle')} backgroundImage="/media/prayer-requests.jpg" />

            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px] py-12 lg:py-24">

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start justify-center">

                    {/* LEFT COLUMN: The Note Visual */}
                    <div className="w-full lg:w-[450px] flex-shrink-0 flex justify-center perspective-1000 order-2 lg:order-1">
                        <div className={`
                relative w-full max-w-[300px] min-h-[480px] shadow-2xl transition-all duration-500 transform
                bg-white border border-gray-200
            `}
                        >
                            {/* Note Content */}
                            <div className="p-0"> {/* Remove padding to let images fit fully if needed */}

                                {/* Header Image/Ornament */}
                                <div className="w-full h-auto mb-2 flex justify-center pt-6 px-5 relative h-[60px]">
                                    <Image
                                        src="/media/header.png"
                                        alt="Ornament"
                                        width={260}
                                        height={60}
                                        className={`w-full h-auto object-contain ${noteType === 'repose' ? 'grayscale opacity-80' : ''}`}
                                    />
                                </div>

                                {/* Title */}
                                <div className="text-center mb-4">
                                    <h2 className={`font-serif text-2xl font-bold uppercase tracking-widest ${noteType === 'health' ? 'text-[#D22626]' : 'text-black'}`}>
                                        {noteType === 'health' ? t('prayer.health') : t('prayer.repose')}
                                    </h2>
                                    {/* Service Type Subtitle */}
                                    {selectedService.id !== 'simple' && (
                                        <p className={`font-serif text-[10px] font-bold uppercase tracking-wider mt-1 ${noteType === 'health' ? 'text-[#D22626]' : 'text-black'}`}>
                                            ({getServiceName(selectedService)})
                                        </p>
                                    )}
                                </div>


                                {/* Names List */}
                                <div className="px-5 space-y-[0.4rem] mb-8">
                                    {Array.from({ length: MAX_NAMES }).map((_, index) => (
                                        <div key={index} className={`h-7 flex items-end relative group border-b ${noteType === 'health' ? 'border-[#D22626]' : 'border-black'}`}>
                                            {names[index] ? (
                                                <div className="w-full flex justify-center items-center text-lg relative">
                                                    <span className="text-black font-serif italic text-base">{names[index]}</span>
                                                    <button
                                                        onClick={() => removeName(index)}
                                                        className="absolute right-0 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-full h-5" />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Footer Image */}
                                <div className="w-full flex justify-center px-4 pb-6">
                                    <div className="text-center w-full flex flex-col items-center">
                                        <Image
                                            src="/media/footer.png"
                                            alt="Monastery"
                                            width={260}
                                            height={80}
                                            className={`w-full h-auto object-contain mb-2 ${noteType === 'repose' ? 'grayscale opacity-80' : ''}`}
                                        />
                                        <p className={`text-[10px] font-serif font-bold uppercase ${noteType === 'health' ? 'text-[#D22626]' : 'text-black'}`}>
                                            Sacred St. Nicholas<br />Zhydychyn Monastery
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    {/* RIGHT COLUMN: Controls Form */}
                    <div className="w-full lg:max-w-xl space-y-8 order-1 lg:order-2">

                        {/* 1. Toggle Type */}
                        <div className="bg-white p-2 rounded-lg shadow-sm w-full lg:w-fit flex gap-2 border border-gray-100">
                            <button
                                onClick={() => setNoteType('health')}
                                className={`flex-1 lg:flex-none px-8 py-3 rounded-md font-medium transition-all duration-300 ${noteType === 'health'
                                    ? 'bg-red-50 text-red-700 shadow-sm ring-1 ring-red-100'
                                    : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {t('prayer.health')}
                            </button>
                            <button
                                onClick={() => setNoteType('repose')}
                                className={`flex-1 lg:flex-none px-8 py-3 rounded-md font-medium transition-all duration-300 ${noteType === 'repose'
                                    ? 'bg-gray-800 text-white shadow-md'
                                    : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {t('prayer.repose')}
                            </button>
                        </div>

                        {/* 2. Service Dropdown */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">{t('prayer.service_type')}</label>
                            <div
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full bg-white border border-gray-300 rounded-xl p-4 cursor-pointer flex justify-between items-center hover:border-amber-500 transition-colors shadow-sm"
                            >
                                <div>
                                    <span className="block font-bold text-gray-900 text-lg">{getServiceName(selectedService)}</span>
                                    <span className="text-amber-600 font-medium">{selectedService.price} {t('prayer.uah_per_name')}</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>

                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden animate-fadeIn">
                                    {SERVICES.map((service) => (
                                        <div
                                            key={service.id}
                                            onClick={() => {
                                                setSelectedService(service);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="p-4 hover:bg-amber-50 cursor-pointer flex justify-between items-center border-b border-gray-50 last:border-0"
                                        >
                                            <span className="text-gray-800 font-medium">{getServiceName(service)}</span>
                                            {selectedService.id === service.id && <Check className="w-4 h-4 text-amber-600" />}
                                            <span className="text-gray-500 text-sm ml-auto mr-2">{service.price} грн</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 3. Input Section */}
                        <div className={`transition-all duration-300 ${names.length >= MAX_NAMES ? 'opacity-50 pointer-events-none' : ''}`}>
                            <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">
                                {t('prayer.names_label')} ({names.length}/{MAX_NAMES})
                            </label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={currentName}
                                    onChange={(e) => setCurrentName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={t('prayer.names_placeholder')}
                                    className="flex-1 bg-white border border-gray-300 p-4 rounded-xl text-lg outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm placeholder:text-gray-300"
                                    autoFocus
                                />
                                <button
                                    onClick={addName}
                                    disabled={!currentName.trim() || names.length >= MAX_NAMES}
                                    className="bg-black text-white p-4 rounded-xl hover:bg-amber-600 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors shadow-lg active:scale-95"
                                >
                                    <Plus className="w-6 h-6" />
                                </button>
                            </div>
                            {names.length >= MAX_NAMES && (
                                <p className="text-red-500 text-sm mt-2">
                                    {t('prayer.note_full')}
                                </p>
                            )}
                        </div>

                        {/* Email Section */}
                        <div className="mt-8 transition-all duration-300">
                            <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">
                                {t('prayer.email_label')}
                            </label>
                            <input
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="email@example.com"
                                className="w-full bg-white border border-gray-300 p-4 rounded-xl text-lg outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm"
                            />
                        </div>

                        {/* Total Block */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-8">
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
                                <div>
                                    <p className="text-gray-500 font-medium">{t('prayer.total_names')}</p>
                                    <p className="text-2xl font-bold">{names.length}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 font-medium">{t('prayer.total_amount')}</p>
                                    <p className="text-3xl font-bold text-amber-600">{calculateTotal()} грн</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-center">
                                <button
                                    onClick={() => setNames([])}
                                    disabled={names.length === 0}
                                    className="text-gray-400 hover:text-red-500 px-4 py-2 font-medium transition-colors disabled:opacity-0"
                                >
                                    {t('prayer.clear')}
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={names.length === 0 || isSubmitting}
                                    className="flex-1 bg-amber-600 text-white py-4 rounded-xl font-bold text-lg uppercase tracking-wider hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    {isSubmitting ? t('prayer.processing') : t('prayer.submit')}
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
