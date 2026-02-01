'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function TestDesignPage() {
    const [mounted, setMounted] = useState(false);
    const [revealStage, setRevealStage] = useState(0);
    const { t } = useLanguage();

    useEffect(() => {
        setMounted(true);
        // Stage 1: Reveal starts immediately
        const stage1 = setTimeout(() => setRevealStage(1), 50);
        // Stage 2: Small photo starts
        const stage2 = setTimeout(() => setRevealStage(2), 600);
        // Stage 3: Text reveal
        const stage3 = setTimeout(() => setRevealStage(3), 1500);
        // Stage 4: Header reveal + Unlock Scroll
        const stage4 = setTimeout(() => setRevealStage(4), 2800);

        return () => {
            clearTimeout(stage1);
            clearTimeout(stage2);
            clearTimeout(stage3);
            clearTimeout(stage4);
        };
    }, []);

    const curtainDuration = 1400;
    const easeRef = "cubic-bezier(0.77, 0, 0.175, 1)";
    const easeExpo = "cubic-bezier(0.19, 1, 0.22, 1)";

    return (
        <div className={`Outer-sc-17f28ux-0 min-h-screen bg-black text-white selection:bg-amber-500 selection:text-white font-sans relative overflow-x-hidden ${revealStage < 4 ? 'intro-mode' : ''}`}>

            {/* 1. THE HEADER - Connected to its native logic */}
            <Header />

            {/* 2. THE MAIN WIPE (CURTAIN) */}
            <aside
                className="Wipe-sc-17f28ux-14 fixed inset-0 z-[1000] bg-white pointer-events-none"
                style={{
                    transition: `transform ${curtainDuration}ms ${easeRef}`,
                    transform: (mounted && revealStage >= 1) ? 'translate3d(100%, 0, 0)' : 'translate3d(0, 0, 0)',
                    willChange: 'transform'
                }}
            />

            {mounted && (
                <main className="relative w-full flex flex-col items-stretch">

                    {/* HERO SECTION */}
                    <section className="relative w-full h-screen overflow-hidden flex-shrink-0 z-10">
                        {/* BACKGROUND (Slit-Reveal) */}
                        <div
                            className="ImageBackContainer-sc-17f28ux-6 absolute inset-0 z-0 overflow-hidden"
                            style={{
                                transition: `transform ${curtainDuration}ms ${easeRef}`,
                                transform: revealStage >= 1 ? 'translate3d(0%, 0, 0)' : 'translate3d(-100%, 0, 0)',
                                willChange: 'transform'
                            }}
                        >
                            <div
                                className="absolute inset-0 w-full h-full"
                                style={{
                                    transition: `transform ${curtainDuration}ms ${easeRef}`,
                                    transform: revealStage >= 1 ? 'translate3d(0%, 0, 0)' : 'translate3d(100%, 0, 0)',
                                    willChange: 'transform'
                                }}
                            >
                                <div className="ImageBack-sc-17f28ux-7 relative w-full h-full scale-[1.02]">
                                    <img
                                        src="/media/church-complex.jpg"
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover"
                                        style={{ display: 'block', backfaceVisibility: 'hidden' }}
                                    />
                                    <div className="absolute inset-0 bg-black/60" />
                                </div>
                            </div>
                        </div>

                        {/* FRONT PHOTO (Small Reveal) */}
                        <div className="ImageFrontContainer-sc-17f28ux-9 absolute right-[10%] top-[20%] bottom-[20%] w-[35%] z-20 overflow-hidden pointer-events-none">
                            <div
                                className="ImageFrontOuter-sc-17f28ux-10 absolute inset-0 overflow-hidden"
                                style={{
                                    transition: `transform 1600ms ${easeRef}`,
                                    transform: revealStage >= 2 ? 'translate3d(0%, 0, 0)' : 'translate3d(101%, 0, 0)',
                                    willChange: 'transform'
                                }}
                            >
                                <div
                                    className="ImageFrontInner-sc-17f28ux-11 absolute inset-0 overflow-hidden"
                                    style={{
                                        transition: `transform 1600ms ${easeRef}`,
                                        transform: revealStage >= 2 ? 'translate3d(0%, 0, 0)' : 'translate3d(-101%, 0, 0)',
                                        willChange: 'transform'
                                    }}
                                >
                                    <div
                                        className="ImageFront-sc-17f28ux-12 relative w-full h-full transform-gpu"
                                        style={{
                                            transition: `transform 2200ms ${easeExpo}`,
                                            transform: revealStage >= 2 ? 'scale(1)' : 'scale(1.2)',
                                            willChange: 'transform'
                                        }}
                                    >
                                        <img
                                            src="/media/history.jpg"
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TEXT CONTENT */}
                        <div className="relative z-50 h-full flex items-center px-10 md:px-20 lg:px-32">
                            <div className="max-w-4xl w-full">
                                <div
                                    className="Heading-sc-17f28ux-3"
                                    style={{
                                        transition: `transform 1800ms ${easeExpo}, opacity 1800ms ${easeExpo}`,
                                        transform: revealStage >= 3 ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100px, 0)',
                                        opacity: revealStage >= 3 ? 1 : 0,
                                        willChange: 'transform, opacity'
                                    }}
                                >
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-[0.95] text-white">
                                        {t('hero.title')}
                                    </h1>
                                    <div
                                        className="Line-sc-17f28ux-4 mt-8 h-[2px] bg-amber-500 origin-left"
                                        style={{
                                            width: revealStage >= 3 ? '128px' : '0',
                                            transition: `width 2000ms ${easeExpo}`,
                                            transitionDelay: '500ms'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SCROLL INDICATOR */}
                        <div
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-1000"
                            style={{ opacity: revealStage >= 4 ? 1 : 0 }}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
                                <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent animate-bounce" />
                            </div>
                        </div>
                    </section>

                    {/* SCROLLABLE CONTENT */}
                    <div className="relative z-10 w-full bg-black">

                        {/* SECTION 1: ABOUT PREVIEW */}
                        <section className="py-32 px-10 md:px-20 lg:px-32 bg-zinc-950">
                            <div className="grid md:grid-cols-2 gap-20 items-center">
                                <div className="space-y-8">
                                    <h2 className="text-4xl font-bold uppercase tracking-tight">Духовна скарбниця Волині</h2>
                                    <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
                                        Жидичинський монастир — це місце з тисячолітньою історією, де кожен камінь дихає вічністю. Сьогодні монастир є одним із найважливіших духовних центрів України, поєднуючи давні традиції та сучасне молитовне життя.
                                    </p>
                                    <button className="px-8 py-4 border border-zinc-800 hover:bg-white hover:text-black transition-all uppercase text-sm tracking-widest font-bold">
                                        Дізнатися більше
                                    </button>
                                </div>
                                <div className="relative aspect-[4/3] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src="/media/monastery-church.jpg"
                                        alt="Alt"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* SECTION 2: THE CARDS */}
                        <section className="py-32 px-10 md:px-20 lg:px-32 bg-black border-y border-zinc-900">
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    { title: 'Богослужіння', desc: 'Приєднуйтесь до щоденної спільної молитви та літургії.', img: '/media/history.jpg' },
                                    { title: 'Паломництво', desc: 'Відчуйте благодать святого місця под час духовних поїздок.', img: '/media/church-complex.jpg' },
                                    { title: 'Допомога', desc: 'Ваша підтримка допомагає відновлювати святиню.', img: '/media/monastery-church.jpg' },
                                ].map((item, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="relative aspect-square overflow-hidden mb-6">
                                            <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                                        </div>
                                        <h3 className="text-xl font-bold uppercase mb-2 group-hover:text-amber-500 transition-colors">{item.title}</h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <Footer />
                    </div>
                </main>
            )}

            <style jsx global>{`
                /* 
                   DYNAMIC HEADER LOGIC:
                   Ми використовуємо клас 'intro-mode' ТІЛЬКИ під час початкової анімації.
                   Ми ПРИБРАЛИ 'transition: none !important', щоб дозволити хедзеру 
                   використовувати свої власні анімації при вході в робочий стан.
                */

                .intro-mode div.z-\[510\],
                .intro-mode header.z-\[500\],
                .intro-mode button.z-\[520\] {
                    opacity: 0 !important;
                    pointer-events: none !important;
                    /* Дозволяємо транзиціям працювати, коли клас буде видалено */
                }

                /* Початкові позиції для "вльоту" */
                .intro-mode div.z-\[510\] { transform: translate(-50%, -150%) !important; }
                .intro-mode header.z-\[500\] { transform: translate(-50%, 400px) !important; }
                .intro-mode button.z-\[520\] { transform: translate(-50%, 400px) !important; }

                /* Common settings */
                html {
                    overflow-y: scroll !important;
                    scrollbar-gutter: stable !important;
                    background-color: black;
                }

                body {
                    margin: 0;
                    padding: 0;
                    background-color: black;
                }

                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #000; }
                ::-webkit-scrollbar-thumb { background: #222; border-radius: 4px; }
            `}</style>
        </div>
    );
}
