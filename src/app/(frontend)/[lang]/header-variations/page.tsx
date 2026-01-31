'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronDown, Menu, X, MessageSquarePlus, Palette, ShoppingBag, Send, MapPin, MousePointer2, Grid3X3, Maximize } from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { Footer } from '@/components/landing/Footer';

type HeaderStyle = 'classic' | 'glass' | 'minimal' | 'sidebar' | 'centered' | 'dock' | 'split' | 'bento' | 'fullscreen' | 'neon';

export default function HeaderVariationsPage() {
    const { t, language, setLanguage } = useLanguage();
    const [activeStyle, setActiveStyle] = useState<HeaderStyle>('classic');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: t('nav.about'), href: '#' },
        { label: t('nav.news'), href: '#' },
        { label: t('nav.shop'), href: '#', icon: <ShoppingBag size={18} /> },
        { label: t('nav.write_note'), href: '#', icon: <Send size={18} />, highlight: true },
        { label: t('nav.pilgrims'), href: '#' },
        { label: t('nav.contacts'), href: '#' },
    ];

    const renderHeader = () => {
        switch (activeStyle) {
            case 'glass':
                return (
                    <header className={clsx(
                        "fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 w-[95%] max-w-7xl",
                        "bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-8 py-4 flex items-center justify-between",
                        scrolled ? "bg-black/60 top-4 scale-[0.98]" : "top-6"
                    )}>
                        <div className="flex items-center gap-10">
                            <div className="relative w-12 h-12 hover:rotate-12 transition-transform cursor-pointer">
                                <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
                            </div>
                            <nav className="hidden lg:flex items-center gap-6">
                                {navItems.map(item => (
                                    <Link key={item.label} href={item.href} className={clsx(
                                        "px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all",
                                        item.highlight ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20" : "text-white/80 hover:text-white hover:bg-white/10"
                                    )}>
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-white/60 hover:text-white p-2 transition-colors"><Search size={20} /></button>
                            <div className="h-4 w-px bg-white/20 mx-2" />
                            <div className="flex gap-2">
                                <button onClick={() => setLanguage('UA')} className={clsx("text-xs font-black", language === 'UA' ? "text-amber-500" : "text-white/30")}>UA</button>
                                <button onClick={() => setLanguage('EN')} className={clsx("text-xs font-black", language === 'EN' ? "text-amber-500" : "text-white/30")}>EN</button>
                            </div>
                        </div>
                    </header>
                );

            case 'minimal':
                return (
                    <header className={clsx(
                        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-12 py-8 flex items-center justify-between",
                        scrolled ? "bg-white/95 py-4 backdrop-blur-md" : "bg-transparent"
                    )}>
                        <div className={clsx("font-serif text-3xl tracking-tighter transition-colors", scrolled ? "text-black" : "text-white")}>
                            Zhydychyn<span className="text-amber-500 font-black">.</span>
                        </div>
                        <nav className={clsx("hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em]", scrolled ? "text-gray-900" : "text-white/60")}>
                            {navItems.map(item => (
                                <Link key={item.label} href={item.href} className={clsx(
                                    "transition-all relative group",
                                    item.highlight ? "text-amber-500" : "hover:text-amber-500"
                                )}>
                                    {item.label}
                                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full" />
                                </Link>
                            ))}
                        </nav>
                        <button className={clsx("w-12 h-12 rounded-full flex items-center justify-center transition-all", scrolled ? "bg-gray-100 text-black hover:bg-black hover:text-white" : "bg-white/10 text-white hover:bg-white/20")}>
                            <Menu size={20} />
                        </button>
                    </header>
                );

            case 'sidebar':
                return (
                    <>
                        <header className="fixed top-8 left-8 z-[110]">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:scale-110 rotate-nav transition-all active:scale-95"
                            >
                                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </header>
                        <div className={clsx(
                            "fixed inset-y-0 left-0 z-[105] w-[400px] bg-[#050505] shadow-[50px_0_100px_rgba(0,0,0,0.5)] transition-all duration-700 ease-[cubic-bezier(0.8,0,0.1,1)]",
                            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                        )}>
                            <div className="h-full flex flex-col p-20">
                                <div className="mb-20">
                                    <h2 className="text-amber-500 font-black text-xs uppercase tracking-[0.5em] mb-4">The Monastery</h2>
                                    <div className="relative w-20 h-20 grayscale brightness-150">
                                        <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
                                    </div>
                                </div>
                                <nav className="flex flex-col gap-10">
                                    {navItems.map((item, idx) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className={clsx(
                                                "text-4xl font-serif italic tracking-tight transition-all hover:translate-x-4",
                                                item.highlight ? "text-amber-500" : "text-white/40 hover:text-white"
                                            )}
                                            style={{ transitionDelay: `${idx * 50}ms` }}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                                <div className="mt-auto space-y-8">
                                    <p className="text-white/20 text-xs leading-loose uppercase tracking-widest">
                                        Holy Nicholas Monastery<br />Zhydychyn, Volyn
                                    </p>
                                    <div className="flex gap-6 uppercase text-[10px] font-black">
                                        <button onClick={() => setLanguage('UA')} className={clsx(language === 'UA' ? "text-amber-500" : "text-white/20")}>Ukrainian</button>
                                        <button onClick={() => setLanguage('EN')} className={clsx(language === 'EN' ? "text-amber-500" : "text-white/20")}>English</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );

            case 'dock':
                return (
                    <header className={clsx(
                        "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700",
                        "bg-black/80 backdrop-blur-3xl border border-white/10 rounded-full py-3 px-4 shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex items-center gap-2",
                        scrolled ? "bottom-6" : "bottom-10 scale-110"
                    )}>
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                                    item.highlight ? "bg-amber-500 text-black" : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {item.icon}
                                <span className="hidden md:block">{item.label}</span>
                            </Link>
                        ))}
                    </header>
                );

            case 'centered':
                return (
                    <header className={clsx(
                        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
                        scrolled ? "bg-white/95 py-4 border-b border-gray-100" : "bg-transparent py-12"
                    )}>
                        <div className="max-w-[1800px] mx-auto px-10 flex flex-col items-center gap-8">
                            <div className={clsx("relative transition-all duration-700", scrolled ? "w-16 h-16" : "w-40 h-40")}>
                                <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
                            </div>
                            <nav className={clsx("flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em]", scrolled ? "text-gray-900" : "text-white")}>
                                {navItems.slice(0, 3).map(item => <Link key={item.label} href={item.href} className="hover:text-amber-600 transition-colors">{item.label}</Link>)}
                                <div className="w-2 h-2 rounded-full bg-amber-500 mx-4" />
                                {navItems.slice(3).map(item => <Link key={item.label} href={item.href} className={clsx("hover:text-amber-600 transition-colors", item.highlight && "text-amber-500")}>{item.label}</Link>)}
                            </nav>
                        </div>
                    </header>
                );

            case 'split':
                return (
                    <header className={clsx(
                        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
                        scrolled ? "bg-black py-4" : "bg-transparent py-8"
                    )}>
                        <div className="px-12 flex items-center">
                            <nav className="flex-1 flex justify-end gap-12 text-xs font-bold uppercase tracking-widest text-white/50">
                                {navItems.slice(0, 3).map(item => <Link key={item.label} href={item.href} className="hover:text-white transition-colors">{item.label}</Link>)}
                            </nav>
                            <div className="mx-16 flex flex-col items-center">
                                <div className="relative w-20 h-20">
                                    <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
                                </div>
                                <span className="text-[8px] font-black text-amber-500 uppercase tracking-[1em] mt-2 translate-x-1">Est. 975</span>
                            </div>
                            <nav className="flex-1 flex justify-start gap-12 text-xs font-bold uppercase tracking-widest text-white/50">
                                {navItems.slice(3).map(item => <Link key={item.label} href={item.href} className={clsx("hover:text-white transition-colors", item.highlight && "text-amber-500")}>{item.label}</Link>)}
                            </nav>
                        </div>
                    </header>
                );

            case 'bento':
                return (
                    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex gap-3">
                        <div className="grid grid-cols-4 gap-2 bg-white/5 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl">
                            <div className="col-span-2 row-span-2 bg-amber-500 rounded-xl p-4 flex flex-col justify-between group cursor-pointer overflow-hidden">
                                <div className="relative w-full h-full opacity-10 group-hover:scale-150 transition-transform">
                                    <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
                                </div>
                                <h3 className="text-black font-black text-xl leading-none uppercase">Write<br />Note</h3>
                                <Send className="text-black" />
                            </div>
                            {navItems.filter(i => !i.highlight).map((item, idx) => (
                                <Link key={item.label} href={item.href} className="w-24 h-24 bg-white/10 hover:bg-white/20 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group">
                                    <div className="text-white/40 group-hover:text-amber-500 transition-colors uppercase text-[9px] font-black text-center px-2">{item.label}</div>
                                    <Grid3X3 size={16} className="text-white/20" />
                                </Link>
                            ))}
                            <div className="bg-white rounded-xl p-4 flex items-center justify-center text-black font-black uppercase text-[10px] cursor-pointer hover:bg-amber-400">
                                Menu
                            </div>
                        </div>
                    </header>
                );

            case 'fullscreen':
                return (
                    <>
                        <header className="fixed top-0 left-0 right-0 z-[100] px-12 py-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                            <div className="relative w-12 h-12">
                                <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
                            </div>
                            <button
                                onClick={() => setIsFullscreenOpen(true)}
                                className="text-white flex items-center gap-4 hover:gap-8 transition-all group"
                            >
                                <span className="font-black uppercase tracking-[0.3em] text-xs">Explore Navigation</span>
                                <div className="w-12 h-px bg-white/50 group-hover:bg-amber-500" />
                            </button>
                        </header>
                        <div className={clsx(
                            "fixed inset-0 z-[200] bg-white transition-all duration-700 flex flex-col",
                            isFullscreenOpen ? "clip-circle-open" : "clip-circle-closed pointer-events-none"
                        )}>
                            <button onClick={() => setIsFullscreenOpen(false)} className="absolute top-12 right-12 text-black hover:rotate-90 transition-transform">
                                <X size={48} strokeWidth={1} />
                            </button>
                            <div className="flex-1 grid lg:grid-cols-2">
                                <div className="bg-amber-500 p-20 flex flex-col justify-end">
                                    <h2 className="text-[15vw] font-serif italic text-black leading-[0.8] tracking-tighter mb-10">Menu</h2>
                                    <p className="text-black text-2xl font-light max-w-sm">
                                        Navigate through the thousand-year history of the monastery.
                                    </p>
                                </div>
                                <div className="p-20 flex flex-col justify-center gap-1">
                                    {navItems.map((item, idx) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="text-6xl font-black uppercase tracking-tighter text-black hover:text-amber-500 transition-all hover:scale-105 origin-left"
                                            onClick={() => setIsFullscreenOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                );

            case 'neon':
                return (
                    <header className={clsx(
                        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
                        scrolled ? "bg-black py-4 shadow-[0_10px_30px_-15px_rgba(245,158,11,0.5)]" : "bg-transparent py-10"
                    )}>
                        <div className="max-w-7xl mx-auto px-12 flex items-center justify-between">
                            <div className="relative w-12 h-12 shadow-[0_0_20px_rgba(245,158,11,0.4)] rounded-full overflow-hidden">
                                <Image src="/media/logo.webp" alt="Logo" fill className="object-cover" />
                                <div className="absolute inset-0 bg-amber-500/20 mix-blend-overlay" />
                            </div>
                            <nav className="flex items-center gap-2 bg-white/5 rounded-full p-1.5 border border-white/10">
                                {navItems.map(item => (
                                    <Link key={item.label} href={item.href} className={clsx(
                                        "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                                        item.highlight ? "bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.5)]" : "text-white/40 hover:text-white"
                                    )}>
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                            <button className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-all">
                                <Search size={16} />
                            </button>
                        </div>
                    </header>
                );

            case 'classic':
            default:
                return (
                    <header className={clsx(
                        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
                        scrolled ? "bg-[#0a0a0a] py-4 border-b border-white/5" : "bg-transparent py-10"
                    )}>
                        <div className="max-w-[1800px] mx-auto px-12 flex items-center justify-between">
                            <div className="flex items-center gap-16">
                                <div className={clsx("relative transition-all duration-500", scrolled ? "w-16 h-16" : "w-32 h-32")}>
                                    <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
                                </div>
                                <nav className="hidden 2xl:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.25em] text-white/40">
                                    {navItems.map(item => (
                                        <Link key={item.label} href={item.href} className={clsx(
                                            "hover:text-amber-500 transition-all hover:-translate-y-0.5",
                                            item.highlight && "text-amber-500"
                                        )}>
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                            <div className="flex items-center gap-10">
                                <div className="flex items-center gap-6">
                                    <button className="text-white/20 hover:text-amber-500 transition-colors"><Search size={22} /></button>
                                    <div className="flex gap-4">
                                        <button onClick={() => setLanguage('UA')} className={clsx("text-xs font-black", language === 'UA' ? "text-amber-500" : "text-white/20")}>UA</button>
                                        <button onClick={() => setLanguage('EN')} className={clsx("text-xs font-black", language === 'EN' ? "text-amber-500" : "text-white/20")}>EN</button>
                                    </div>
                                </div>
                                <Link href="#" className="bg-amber-500 text-black px-12 py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all transform hover:scale-105 rounded-sm">
                                    {t('nav.write_note')}
                                </Link>
                            </div>
                        </div>
                    </header>
                );
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-amber-500 selection:text-black font-montserrat">
            {renderHeader()}

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/media/hero-bg.jpg"
                        alt="Background"
                        fill
                        className="object-cover opacity-30 scale-110 animate-slow-pulse"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                    <div className="absolute inset-0 bg-radial-glow opacity-20" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-6xl">
                    <div className="inline-block px-6 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-10 animate-fade-down">
                        Interactive Showcase
                    </div>
                    <h1 className="text-7xl md:text-[10vw] font-serif italic leading-[0.85] tracking-tighter mb-12 drop-shadow-2xl opacity-0 animate-reveal">
                        Design <span className="text-amber-500">Language</span> <br />of Faith
                    </h1>
                    <p className="text-lg md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed tracking-wide opacity-0 animate-fade-up-delayed">
                        A curated collection of 10 premium header variations exploring different UX philosophies for the Zhydychyn Monastery.
                    </p>
                </div>

                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
                    <div className="w-px h-24 bg-gradient-to-b from-amber-500 to-transparent" />
                </div>
            </section>

            {/* Variation Switcher */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000] p-2 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center gap-1 group">
                <div className="hidden group-hover:flex absolute bottom-[120%] left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap animate-fade-up">
                    Select Your Interface
                </div>
                {(['classic', 'glass', 'minimal', 'sidebar', 'centered', 'dock', 'split', 'bento', 'fullscreen', 'neon'] as HeaderStyle[]).map((style, idx) => (
                    <button
                        key={style}
                        onClick={() => {
                            setActiveStyle(style);
                            setMobileMenuOpen(false);
                            setIsFullscreenOpen(false);
                        }}
                        className={clsx(
                            "w-12 h-12 flex items-center justify-center rounded-2xl transition-all relative overflow-hidden",
                            activeStyle === style ? "bg-amber-500 text-black scale-110 shadow-[0_0_20px_rgba(245,158,11,0.5)]" : "text-white/40 hover:text-white hover:bg-white/5"
                        )}
                        title={style.toUpperCase()}
                    >
                        <span className="text-[10px] font-black">{idx + 1}</span>
                        {activeStyle === style && <div className="absolute inset-0 bg-white/20 animate-ping rounded-full pointer-events-none" />}
                    </button>
                ))}
            </div>

            {/* Content Showcase */}
            <section className="py-40 bg-white text-black relative z-10">
                <div className="max-w-[1400px] mx-auto px-10">
                    <div className="grid lg:grid-cols-2 gap-32 items-center mb-40">
                        <div>
                            <span className="text-amber-600 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Legacy & Innovation</span>
                            <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tighter mb-12">
                                Where Time <br /><span className="text-gray-300 italic">Becomes</span> Digital
                            </h2>
                            <p className="text-xl font-light text-gray-500 leading-relaxed mb-10 max-w-lg">
                                We've reimagined the traditional monastic digital presence, focusing on extreme micro-interactions, premium typography, and seamless transitions.
                            </p>
                            <div className="flex gap-12 border-t border-gray-100 pt-12">
                                <div>
                                    <div className="text-5xl font-serif italic mb-2">975</div>
                                    <div className="text-[10px] uppercase font-black tracking-widest text-gray-400">Foundation Year</div>
                                </div>
                                <div>
                                    <div className="text-5xl font-serif italic mb-2">∞</div>
                                    <div className="text-[10px] uppercase font-black tracking-widest text-gray-400">Spiritual Reach</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="aspect-[4/5] bg-gray-100 rounded-[4rem] overflow-hidden shadow-2xl scale-95 group-hover:scale-100 transition-all duration-1000">
                                <Image src="/media/complex.jpg" alt="Complex" fill className="object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 bg-amber-500 w-40 h-40 rounded-full flex items-center justify-center p-8 shadow-2xl animate-spin-slow cursor-pointer">
                                <MousePointer2 className="text-black w-10 h-10" />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'The Sacred Hall', cat: 'Architecture', img: '/media/church-complex.jpg' },
                            { title: 'Divine Liturgy', cat: 'Spiritual', img: '/media/monastery-life.jpg' },
                            { title: 'Path of Pilgrim', cat: 'Tourism', img: '/media/piligrims.jpg' }
                        ].map((card, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden mb-8 relative">
                                    <Image src={card.img} alt={card.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <button className="bg-white text-black px-8 py-4 font-black uppercase tracking-widest text-[10px] rounded-full">Explore View</button>
                                    </div>
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">{card.cat}</div>
                                <h4 className="text-3xl font-serif italic tracking-tight">{card.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;700;900&display=swap');
                
                body {
                    font-family: 'Montserrat', sans-serif;
                }

                .bg-radial-glow {
                    background: radial-gradient(circle at center, #f59e0b 0%, transparent 70%);
                }

                .clip-circle-closed {
                    clip-path: circle(0% at 50% 50%);
                }
                .clip-circle-open {
                    clip-path: circle(150% at 50% 50%);
                }

                @keyframes reveal {
                    from { transform: translateY(50px) rotateX(-20deg); opacity: 0; }
                    to { transform: translateY(0) rotateX(0); opacity: 1; }
                }
                .animate-reveal {
                    animation: reveal 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
                
                .animate-fade-up-delayed {
                    animation: reveal 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s forwards;
                }

                .animate-fade-down {
                    animation: reveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) reverse;
                    animation-direction: reverse;
                }

                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .animate-slow-pulse {
                    animation: slow-pulse 10s ease-in-out infinite alternate;
                }
                @keyframes slow-pulse {
                    from { transform: scale(1.1); filter: blur(0px); }
                    to { transform: scale(1.15); filter: blur(2px); }
                }
            `}</style>
        </main>
    );
}
