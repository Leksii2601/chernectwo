'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, ChevronDown, Globe, MessageSquareDiff } from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { Footer } from '@/components/landing/Footer';

interface NavItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
    highlight?: 'amber' | 'white' | 'none';
    children?: { label: string; href: string }[];
}

export default function HeaderVariationsPage() {
    const { t, language, setLanguage } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isForcedVisible, setIsForcedVisible] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // If user manually opened the menu (isForcedVisible) and starts scrolling,
            // immediately hide it (return to default behavior)
            if (isForcedVisible && Math.abs(currentScrollY - lastScrollY.current) > 2) {
                setIsForcedVisible(false);
            }

            if (currentScrollY === 0) {
                setIsForcedVisible(false);
            }

            setScrolled(currentScrollY > 100);
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isForcedVisible]);

    const mainNavItems: NavItem[] = [
        {
            label: t('nav.about'),
            href: '#',
            children: [
                { label: t('nav.history'), href: '#' },
                { label: t('nav.schedule'), href: '#' },
                { label: t('nav.complex'), href: '#' },
                { label: t('nav.sketes'), href: '#' },
                { label: t('nav.media'), href: '#' },
                { label: language === 'UA' ? 'Комора' : 'Store', href: '#' },
            ]
        },
        {
            label: t('nav.news'),
            href: '#',
            children: [
                { label: t('nav.publications'), href: '#' },
                { label: t('nav.announcements'), href: '#' },
                { label: t('nav.official'), href: '#' },
            ]
        },
        { label: t('nav.social'), href: '#' },
        { label: t('nav.pilgrims'), href: '#' },
        { label: t('nav.contacts'), href: '#' },
    ];

    const showMenu = !scrolled || isForcedVisible;
    const showBall = scrolled && !isForcedVisible;

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-amber-500 selection:text-black font-montserrat overflow-x-hidden">

            {/* Unified Super Top Bar */}
            <div className={clsx(
                "fixed left-1/2 -translate-x-1/2 z-[510] transition-all duration-[2000ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
                !showMenu ? "top-[-150px] opacity-0" : "top-10 opacity-100"
            )}>
                <div className="flex items-center bg-black border border-white/5 rounded-full p-1.5 pr-2.5 shadow-2xl backdrop-blur-md">
                    {/* Language Section */}
                    <div className="flex items-center gap-3 px-5 py-2.5 border-r border-white/10">
                        <Globe size={13} className="text-white/30" />
                        <div className="flex gap-4">
                            <button onClick={() => setLanguage('UA')} className={clsx("text-[10px] font-light tracking-widest transition-all", language === 'UA' ? "text-amber-500" : "text-white/20 hover:text-white")}>UA</button>
                            <button onClick={() => setLanguage('EN')} className={clsx("text-[10px] font-light tracking-widest transition-all", language === 'EN' ? "text-amber-500" : "text-white/20 hover:text-white")}>EN</button>
                        </div>
                    </div>

                    {/* Search Field */}
                    <button className="flex items-center justify-center w-12 h-10 text-white/30 hover:text-white transition-colors border-r border-white/10">
                        <Search size={14} strokeWidth={1.5} />
                    </button>

                    {/* Key Actions Integrated */}
                    <div className="flex items-center gap-1.5 ml-1.5">
                        <Link
                            href="#"
                            className="flex items-center gap-2.5 rounded-full text-[10px] font-light uppercase tracking-[0.2em] px-5 py-3 transition-all duration-500 hover:bg-white hover:text-black text-white/60"
                        >
                            <MessageSquareDiff size={14} strokeWidth={1} />
                            <span>{t('nav.write_note')}</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2.5 rounded-full text-[11px] font-normal uppercase tracking-[0.2em] px-5 py-3 transition-all duration-500 bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500 hover:text-black"
                        >
                            <Heart size={14} strokeWidth={1} />
                            <span>{t('nav.donate')}</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Grand Dock Header */}
            <header
                className={clsx(
                    "fixed left-1/2 -translate-x-1/2 z-[500] transition-all duration-[2400ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
                    "bg-black border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.9)] w-max max-w-[95vw] rounded-full py-2.5 px-3 flex items-center overflow-visible",
                    !showMenu
                        ? "bottom-[-200px] opacity-0 translate-y-40 scale-90"
                        : "bottom-12 opacity-100 translate-y-0 scale-100"
                )}
            >
                <div className="flex items-center gap-1">
                    {/* Logo */}
                    <Link href="#" className="w-12 h-12 relative mr-8 ml-3 hover:scale-110 transition-transform duration-1000 cursor-pointer">
                        <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
                    </Link>

                    {mainNavItems.map((item) => (
                        <div
                            key={item.label}
                            className="relative"
                            onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-3 px-7 py-5 rounded-full text-[12.5px] font-light uppercase tracking-[0.3em] text-white/50 hover:text-white hover:bg-white/5 transition-all duration-700 whitespace-nowrap active:scale-95"
                                )}
                            >
                                <span>{item.label}</span>
                                {item.children && <ChevronDown size={15} strokeWidth={1} className={clsx("transition-transform duration-500 ml-1 opacity-50", activeDropdown === item.label && "rotate-180 opacity-100")} />}
                            </Link>

                            {item.children && (
                                <div className={clsx(
                                    "absolute bottom-full left-1/2 -translate-x-1/2 pb-8 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]",
                                    activeDropdown === item.label ? "opacity-100 translate-y-0 visible scale-100" : "opacity-0 translate-y-6 invisible pointer-events-none scale-95"
                                )}>
                                    <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-3 shadow-[0_20px_40px_rgba(0,0,0,0.8)] min-w-[240px] flex flex-col gap-1">
                                        {item.children.map((child, idx) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className="px-6 py-3.5 rounded-2xl text-[10px] font-light uppercase tracking-[0.3em] text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between group/item"
                                            >
                                                {child.label}
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60 scale-0 group-hover/item:scale-100 transition-all duration-500" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </header>

            {/* Interactive Sentinel (Ball) */}
            <button
                onClick={() => setIsForcedVisible(true)}
                className={clsx(
                    "fixed left-1/2 -translate-x-1/2 z-[520] transition-all duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)] group outline-none",
                    showBall
                        ? "bottom-12 opacity-100 translate-y-0 scale-100 blur-0"
                        : "bottom-[-100px] opacity-0 translate-y-20 scale-50 blur-xl pointer-events-none"
                )}
            >
                <div className="relative w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(245,158,11,0.5)] transition-all duration-700 hover:scale-125 hover:rotate-12 active:scale-95">
                    <div className="relative w-full h-full flex items-center justify-center rotate-nav">
                        <div className="w-3.5 h-3.5 bg-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]" />
                        <div className="absolute inset-0 border-2 border-black/10 rounded-full animate-ping opacity-20" />
                    </div>
                </div>
            </button>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src="/media/hero-bg.jpg" alt="Background" fill className="object-cover opacity-60 scale-105 animate-slow-pulse" priority />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                    <div className="absolute inset-0 bg-radial-glow opacity-30" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-6xl">
                    <div className="inline-block px-8 py-3 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-[11px] font-light uppercase tracking-[0.6em] mb-14 animate-reveal">
                        Architectural Harmony
                    </div>
                    <h1 className="text-7xl md:text-[9vw] font-serif italic leading-[0.8] tracking-tighter mb-16 drop-shadow-2xl opacity-0 animate-reveal">
                        Unified <span className="text-amber-500">Grace</span>
                    </h1>
                </div>
            </section>

            <Footer />

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;700&display=swap');
                
                body {
                    font-family: 'Montserrat', sans-serif;
                }

                .bg-radial-glow {
                    background: radial-gradient(circle at center, #f59e0b 0%, transparent 70%);
                }

                @keyframes reveal {
                    from { transform: translateY(60px) rotateX(-20deg); opacity: 0; }
                    to { transform: translateY(0) rotateX(0); opacity: 1; }
                }
                .animate-reveal {
                    animation: reveal 2.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                }
                
                .animate-fade-up-delayed {
                    animation: reveal 2.5s cubic-bezier(0.19, 1, 0.22, 1) 0.8s forwards;
                }

                .animate-slow-pulse {
                    animation: slow-pulse 15s ease-in-out infinite alternate;
                }
                @keyframes slow-pulse {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }

                .rotate-nav {
                    animation: rotate-nav 25s linear infinite;
                }
                @keyframes rotate-nav {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </main>
    );
}
