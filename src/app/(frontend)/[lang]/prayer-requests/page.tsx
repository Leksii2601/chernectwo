'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import { X, Plus, ChevronDown, Check, Info, Mail, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import clsx from 'clsx';

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
    const { t, language } = useLanguage();
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
            const timeoutId = setTimeout(() => controller.abort(), 15000);

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
        } catch (error: any) {
            console.error(error);
            if (error.name === 'AbortError') {
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
        <main className="min-h-screen bg-[#faf9f6] font-sans selection:bg-amber-200 selection:text-amber-900">
            <PageHeader title={t('prayer.title')} backgroundImage="/media/church-complex.jpg" />

            {/* Decorative background element */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-100/30 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-50/20 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px] py-12 lg:py-24 relative z-10">

                <div className="flex flex-col xl:flex-row gap-16 lg:gap-24 items-start justify-center">

                    {/* LEFT COLUMN: The Note Visual - Premium Paper Effect */}
                    <div className="w-full xl:w-[500px] flex-shrink-0 flex justify-center perspective-[2000px] group order-2 xl:order-1">
                        <div className={clsx(
                            "relative w-full max-w-[360px] min-h-[580px] transition-all duration-700 transform-gpu shadow-[0_20px_50px_rgba(0,0,0,0.1),0_5px_15px_rgba(0,0,0,0.05)]",
                            "bg-[#fdfcf8] border-[12px] p-1",
                            noteType === 'health' ? "border-red-50 border-double shadow-red-900/5 rotate-[-1deg] group-hover:rotate-0" : "border-gray-100 border-double shadow-gray-900/5 rotate-[1deg] group-hover:rotate-0"
                        )}>
                            {/* Paper Texture Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')]" />

                            {/* Inner Border Art */}
                            <div className={clsx(
                                "absolute inset-2 border pointer-events-none",
                                noteType === 'health' ? "border-red-100/50" : "border-gray-200/50"
                            )} />

                            {/* Note Content */}
                            <div className="relative z-10 p-6 flex flex-col h-full">

                                {/* Header Ornament */}
                                <div className="w-full flex justify-center py-4 mb-4">
                                    <div className={clsx(
                                        "w-24 h-1 rounded-full",
                                        noteType === 'health' ? "bg-red-200" : "bg-gray-300"
                                    )} />
                                </div>

                                {/* Title Section */}
                                <div className="text-center mb-8">
                                    <h2 className={clsx(
                                        "font-montserrat text-3xl font-black uppercase tracking-[0.2em] transition-colors duration-500",
                                        noteType === 'health' ? "text-[#b21e1e]" : "text-gray-900"
                                    )}>
                                        {noteType === 'health' ? t('prayer.health') : t('prayer.repose')}
                                    </h2>

                                    <div className="flex items-center justify-center gap-2 mt-3">
                                        <div className={clsx("h-[1px] w-8", noteType === 'health' ? "bg-red-100" : "bg-gray-200")} />
                                        <span className={clsx(
                                            "text-[10px] font-bold uppercase tracking-widest",
                                            noteType === 'health' ? "text-red-400" : "text-gray-400"
                                        )}>
                                            {getServiceName(selectedService)}
                                        </span>
                                        <div className={clsx("h-[1px] w-8", noteType === 'health' ? "bg-red-100" : "bg-gray-200")} />
                                    </div>
                                </div>


                                {/* Names Grid - More elegant spacing */}
                                <div className="flex-grow space-y-2 mb-8">
                                    {Array.from({ length: MAX_NAMES }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={clsx(
                                                "h-10 flex items-center px-4 relative group transition-all duration-300",
                                                "border-b border-dashed",
                                                noteType === 'health' ? "border-red-100 hover:bg-red-50/30" : "border-gray-200 hover:bg-gray-100/30",
                                                names[index] ? "opacity-100" : "opacity-30"
                                            )}
                                        >
                                            <span className={clsx(
                                                "text-xs font-serif italic mr-4",
                                                noteType === 'health' ? "text-red-300" : "text-gray-400"
                                            )}>
                                                {index + 1}.
                                            </span>
                                            {names[index] ? (
                                                <div className="w-full flex justify-between items-center">
                                                    <span className={clsx(
                                                        "font-serif italic text-lg tracking-wide",
                                                        noteType === 'health' ? "text-red-900" : "text-gray-800"
                                                    )}>
                                                        {names[index]}
                                                    </span>
                                                    <button
                                                        onClick={() => removeName(index)}
                                                        className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600 scale-90 hover:scale-110"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-full h-4" />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Footer - Elegant Signature */}
                                <div className="mt-auto border-t border-gray-100 pt-8 pb-4 text-center">
                                    <p className={clsx(
                                        "text-[9px] font-montserrat font-black uppercase tracking-[0.3em] mb-2",
                                        noteType === 'health' ? "text-red-200" : "text-gray-300"
                                    )}>
                                        Zhydychyn Monastery
                                    </p>
                                    <div className="flex justify-center">
                                        <Sparkles className={clsx("w-4 h-4", noteType === 'health' ? "text-red-100" : "text-gray-200")} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    {/* RIGHT COLUMN: Modern Form Controls */}
                    <div className="w-full xl:max-w-2xl space-y-8 order-1 xl:order-2">

                        {/* 1. Header & Toggle */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Heart className="w-6 h-6 text-amber-600" />
                                <h1 className="text-3xl font-montserrat font-black uppercase tracking-tight text-gray-900">
                                    {t('nav.write_note')}
                                </h1>
                            </div>

                            <div className="inline-flex p-1.5 bg-white rounded-2xl shadow-xl shadow-amber-900/5 border border-gray-100 w-full md:w-auto">
                                <button
                                    onClick={() => setNoteType('health')}
                                    className={clsx(
                                        "flex-1 md:px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-500",
                                        noteType === 'health'
                                            ? "bg-red-600 text-white shadow-lg shadow-red-200 translate-y-[-2px]"
                                            : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                                    )}
                                >
                                    {t('prayer.health')}
                                </button>
                                <button
                                    onClick={() => setNoteType('repose')}
                                    className={clsx(
                                        "flex-1 md:px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-500",
                                        noteType === 'repose'
                                            ? "bg-gray-900 text-white shadow-lg shadow-gray-300 translate-y-[-2px]"
                                            : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                                    )}
                                >
                                    {t('prayer.repose')}
                                </button>
                            </div>
                        </div>

                        {/* Glassmorphism Card Wrapper */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white/50 space-y-10">

                            {/* 2. Service Selection */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <Sparkles className="w-3 h-3" />
                                    {t('prayer.service_type')}
                                </label>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {SERVICES.map((service) => (
                                        <button
                                            key={service.id}
                                            onClick={() => setSelectedService(service)}
                                            className={clsx(
                                                "p-4 rounded-2xl text-left transition-all duration-300 border-2 active:scale-95 group",
                                                selectedService.id === service.id
                                                    ? "bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-200"
                                                    : "bg-white border-gray-100 text-gray-600 hover:border-amber-200"
                                            )}
                                        >
                                            <span className="block font-bold text-sm mb-1">{getServiceName(service)}</span>
                                            <span className={clsx(
                                                "text-[10px] font-bold uppercase opacity-60 group-hover:opacity-100",
                                                selectedService.id === service.id ? "text-amber-100" : "text-amber-600"
                                            )}>
                                                {service.price} {t('prayer.uah_per_name')}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Names Input */}
                            <div className="space-y-4">
                                <label className="flex justify-between items-end text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    <span className="flex items-center gap-2 transition-all">
                                        {t('prayer.names_label')}
                                        <span className={clsx(
                                            "px-2 py-0.5 rounded-full text-white",
                                            names.length >= MAX_NAMES ? "bg-red-500" : "bg-amber-500"
                                        )}>
                                            {names.length} / {MAX_NAMES}
                                        </span>
                                    </span>
                                </label>

                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={currentName}
                                        onChange={(e) => setCurrentName(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder={t('prayer.names_placeholder')}
                                        disabled={names.length >= MAX_NAMES}
                                        className={clsx(
                                            "w-full bg-gray-50/50 border-2 px-6 py-5 rounded-2xl text-xl outline-none transition-all duration-500",
                                            "focus:bg-white focus:ring-8 focus:ring-amber-500/5",
                                            names.length >= MAX_NAMES
                                                ? "border-red-100 cursor-not-allowed opacity-50"
                                                : "border-gray-100 focus:border-amber-600"
                                        )}
                                    />
                                    <button
                                        onClick={addName}
                                        disabled={!currentName.trim() || names.length >= MAX_NAMES}
                                        className="absolute right-3 top-3 bottom-3 aspect-square bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-amber-600 disabled:bg-gray-200 transition-all duration-500 shadow-lg active:scale-90"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </div>

                                {names.length >= MAX_NAMES && (
                                    <p className="inline-flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest pt-2 animate-pulse">
                                        <Info className="w-3 h-3" />
                                        {t('prayer.note_full')}
                                    </p>
                                )}
                            </div>

                            {/* 4. Email & Submit */}
                            <div className="pt-8 border-t border-gray-100/50 space-y-8">
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        <Mail className="w-3 h-3" />
                                        {t('prayer.email_label')}
                                    </label>
                                    <input
                                        type="email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full bg-gray-50/50 border-2 border-gray-100 px-6 py-5 rounded-2xl text-xl outline-none transition-all duration-500 focus:bg-white focus:border-amber-600 focus:ring-8 focus:ring-amber-500/5"
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 items-center pt-4">
                                    <div className="flex-grow text-center md:text-left">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{t('prayer.total_amount')}</p>
                                        <div className="flex items-center justify-center md:justify-start gap-2">
                                            <span className="text-4xl font-montserrat font-black text-gray-900">{calculateTotal()}</span>
                                            <span className="text-xl font-bold text-amber-600">грн</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 w-full md:w-auto">
                                        <button
                                            onClick={() => setNames([])}
                                            disabled={names.length === 0}
                                            className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-gray-400 hover:text-red-500 transition-colors disabled:opacity-0"
                                        >
                                            {t('prayer.clear')}
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={names.length === 0 || isSubmitting}
                                            className={clsx(
                                                "flex-1 md:flex-none md:min-w-[240px] px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl relative overflow-hidden group/btn",
                                                names.length === 0 || isSubmitting
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : "bg-gray-900 text-white hover:bg-amber-600 hover:shadow-amber-200 hover:translate-y-[-4px]"
                                            )}
                                        >
                                            <span className="relative z-10">{isSubmitting ? t('prayer.processing') : t('prayer.submit')}</span>
                                            {/* Subtle shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] transition-all" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <Footer />
            <FloatingButton />

            <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </main>
    );
}
