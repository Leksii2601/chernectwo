'use client';

import React, { useEffect } from 'react';
import {
    Type,
    MoveVertical,
    MoveHorizontal,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Droplet,
    Palette,
    Link as LinkIcon,
    MousePointer2,
    X,
    Contrast,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibility, MAX_STATES } from './useAccessibility';
import { AccessibilityGlobalStyles } from './AccessibilityStyles';

interface AccessibilityMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AccessibilityMenu({ isOpen, onClose }: AccessibilityMenuProps) {
    const { language } = useLanguage();
    const { states, screen, toggleOption, resetOptions } = useAccessibility();

    // Scroll Lock
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
        };
    }, [isOpen]);

    // Alignment icon changes based on state
    const alignIcons = [
        <AlignLeft key="l" size={22} strokeWidth={1.5} />,
        <AlignCenter key="c" size={22} strokeWidth={1.5} />,
        <AlignRight key="r" size={22} strokeWidth={1.5} />,
        <AlignJustify key="j" size={22} strokeWidth={1.5} />,
    ];

    // Monochrome icon (half circle SVG)
    const monoIcon = (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a10 10 0 0 0 0 20z" fill="currentColor" />
        </svg>
    );

    const options: { icon: React.ReactNode; label: string; idx: number; mobileHidden?: boolean }[] = [
        { icon: <Type size={22} />, label: language === 'UA' ? 'Великий текст' : 'Large Text', idx: 0 },
        { icon: <MoveVertical size={22} />, label: language === 'UA' ? 'Міжрядковий інтервал' : 'Line Spacing', idx: 1 },
        { icon: <MoveHorizontal size={22} />, label: language === 'UA' ? 'Текстовий інтервал' : 'Text Spacing', idx: 2 },
        { icon: alignIcons[states[3]] || alignIcons[0], label: language === 'UA' ? 'Вирівнювання' : 'Alignment', idx: 3 },
        { icon: <Droplet size={22} />, label: language === 'UA' ? 'Інверсія' : 'Inversion', idx: 4 },
        { icon: monoIcon, label: language === 'UA' ? 'Чорно-біле' : 'Monochrome', idx: 5 },
        { icon: <Palette size={22} />, label: language === 'UA' ? 'Насиченість' : 'Saturation', idx: 6 },
        { icon: <Contrast size={22} />, label: language === 'UA' ? 'Контраст' : 'Contrast', idx: 7 },
        { icon: <LinkIcon size={22} />, label: language === 'UA' ? 'Підсвітка посилань' : 'Highlight Links', idx: 8 },
        { icon: <MousePointer2 size={22} />, label: language === 'UA' ? 'Великий курсор' : 'Big Cursor', idx: 9, mobileHidden: true },
    ];

    const visibleOptions = options.filter(opt => !(opt.mobileHidden && screen === 'mobile'));

    return (
        <>
            {/* Global styles — always mounted */}
            <AccessibilityGlobalStyles screen={screen} />

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" style={{ fontSize: '16px' }}>
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />

                    <div className="relative bg-white border border-gray-100 w-full max-w-[680px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] animate-scale-in" style={{ padding: '24px', borderRadius: '40px' }}>

                        {/* Header */}
                        <div className="flex items-center" style={{ gap: '16px', marginBottom: '24px' }}>
                            <div className="flex-1 bg-black rounded-full flex items-center justify-center text-center overflow-hidden" style={{ height: '48px', paddingLeft: '32px', paddingRight: '32px' }}>
                                <span className="text-white font-bold text-[10px] md:text-[14px] lg:text-[16px] tracking-[0.05em] uppercase whitespace-nowrap">
                                    {language === 'UA' ? 'Доступність сайту' : 'Website Accessibility'}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex-shrink-0 bg-black rounded-full flex items-center justify-center text-white hover:bg-amber-600 transition-all duration-300 shadow-xl active:scale-90 group"
                                style={{ width: '48px', height: '48px' }}
                            >
                                <X size={24} strokeWidth={2.5} className="transition-transform duration-500 group-hover:rotate-90" />
                            </button>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-3" style={{ gap: '8px', marginBottom: '24px' }}>
                            {visibleOptions.map((opt) => {
                                const level = states[opt.idx];
                                const max = MAX_STATES[opt.idx] ?? 1;
                                const isActive = level > 0;
                                return (
                                    <button
                                        key={opt.idx}
                                        onClick={() => toggleOption(opt.idx)}
                                        className={clsx(
                                            "flex flex-col items-center justify-between border transition-all duration-400 h-full group active:scale-95",
                                            "p-[8px] py-[16px] md:p-[16px] md:py-[24px] rounded-[24px] md:rounded-[32px] gap-[12px]",
                                            isActive
                                                ? "bg-black border-black text-white"
                                                : "bg-white border-black/80 text-black hover:border-amber-600 hover:text-amber-600"
                                        )}
                                    >
                                        <div className="flex flex-col items-center" style={{ gap: '8px' }}>
                                            <div className={clsx(
                                                "transition-all duration-300",
                                                isActive ? "text-amber-500" : "text-black group-hover:text-amber-600"
                                            )}>
                                                {opt.icon}
                                            </div>

                                            {/* Indicator dots */}
                                            <div className="flex h-[3px]" style={{ gap: '4px', marginTop: '6px' }}>
                                                {Array.from({ length: max }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={clsx(
                                                            "h-full rounded-full transition-all duration-500 w-[8px] md:w-[14px]",
                                                            i < level
                                                                ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                                                                : "bg-gray-100 dark:bg-zinc-800"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <span className={clsx(
                                            "text-[8px] md:text-[10px] font-bold text-center leading-tight uppercase tracking-tighter",
                                            isActive ? "text-white" : "text-black group-hover:text-amber-600"
                                        )}>
                                            {opt.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Reset */}
                        <button
                            onClick={resetOptions}
                            className="w-full bg-black rounded-full flex items-center justify-center text-white font-black text-[10px] md:text-[13px] tracking-[0.2em] uppercase hover:bg-amber-600 transition-all duration-300 active:scale-[0.98] shadow-md"
                            style={{ height: '48px', paddingLeft: '16px', paddingRight: '16px' }}
                        >
                            {language === 'UA' ? 'Скинути всі налаштування' : 'Reset All Settings'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
