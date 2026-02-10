'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface PrayerNoteProps {
    noteType: 'health' | 'repose';
    selectedService: { id: string; nameKey: string };
    names: string[];
    namesPerNote: number;
    onUpdateName: (index: number, name: string) => void;
    onRemoveName: (index: number) => void;
}

export const PrayerNote: React.FC<PrayerNoteProps> = ({
    noteType,
    selectedService,
    names,
    namesPerNote,
    onUpdateName,
    onRemoveName
}) => {
    const { t } = useLanguage();
    const HEALTH_RED = "#E31B1B";
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleFocus = (idx: number) => {
        // If clicking a line beyond the next available empty one, redirect focus
        if (idx > names.length) {
            inputRefs.current[names.length]?.focus();
        } else {
            setFocusedIndex(idx);
        }
    };

    return (
        <div className="relative w-full max-w-[92vw] sm:max-w-[340px] min-h-[520px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700 transform hover:rotate-y-2 bg-white border border-gray-100 rounded-sm overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />
            <div className="p-0 relative z-10">
                <div className="w-full h-auto mb-4 flex justify-center pt-8 px-6 relative">
                    <Image
                        src="/media/header.avif"
                        alt="Ornament"
                        width={280}
                        height={60}
                        className={`w-full h-auto object-contain transition-all duration-500 ${noteType === 'repose' ? 'grayscale opacity-60' : ''}`}
                    />
                </div>

                <div className="text-center mb-6">
                    <h2 className="font-['Triod'] text-3xl transition-colors duration-500" style={{ color: noteType === 'health' ? HEALTH_RED : '#111827' }}>
                        {noteType === 'health' ? t('prayer.health') : t('prayer.repose')}
                    </h2>
                    {selectedService.id !== 'simple' && (
                        <p className="font-montserrat text-[10px] font-bold uppercase tracking-widest mt-2 px-4 transition-colors duration-500" style={{ color: noteType === 'health' ? `${HEALTH_RED}B3` : '#6B7280' }}>
                            — {t(selectedService.nameKey)} —
                        </p>
                    )}
                </div>

                <div className="px-8 space-y-1 mb-10 min-h-[320px]">
                    {Array.from({ length: namesPerNote }).map((_, idx) => {
                        const name = names[idx] || '';
                        return (
                            <div
                                key={idx}
                                className="h-8 flex items-end relative group border-b transition-colors duration-500"
                                style={{
                                    borderColor: focusedIndex === idx
                                        ? (noteType === 'health' ? HEALTH_RED : '#111827')
                                        : (noteType === 'health' ? `${HEALTH_RED}33` : '#E5E7EB')
                                }}
                            >
                                <div className="w-full flex justify-between items-center relative">
                                    <input
                                        ref={(el) => { inputRefs.current[idx] = el; }}
                                        type="text"
                                        value={name}
                                        onChange={(e) => onUpdateName(idx, e.target.value)}
                                        onFocus={() => handleFocus(idx)}
                                        onBlur={() => setFocusedIndex(null)}
                                        placeholder={idx === 0 && names.length === 0 ? t('prayer.names_placeholder') : ""}
                                        className="w-full bg-transparent text-gray-900 font-montserrat italic text-lg leading-none pb-1 text-center outline-none placeholder:text-gray-200"
                                    />
                                    {name && focusedIndex === idx && (
                                        <button
                                            onMouseDown={(e) => {
                                                e.preventDefault(); // Prevent input blur
                                                onRemoveName(idx);
                                            }}
                                            className="absolute right-0 text-red-500/30 hover:text-red-600 transition-all focus:outline-none bg-white rounded-full p-0.5"
                                        >
                                            <X className="w-3.5 h-3.5" strokeWidth={2} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="w-full flex justify-center px-8 pb-10">
                    <div className="text-center w-full flex flex-col items-center">
                        <Image
                            src="/media/footer.avif"
                            alt="Monastery"
                            width={280}
                            height={80}
                            className={`w-full h-auto object-contain mb-4 transition-all duration-500 ${noteType === 'repose' ? 'grayscale opacity-60' : ''}`}
                        />
                        <p className="text-sm font-['Triod'] leading-tight transition-colors duration-500" style={{ color: noteType === 'health' ? `${HEALTH_RED}CC` : '#9CA3AF' }}>
                            {t('prayer.note_footer_1')}<br />{t('prayer.note_footer_2')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
