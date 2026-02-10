'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Send, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const partners = [
    { name: 'Zhydychyn Center', url: 'https://zhydychyn.center' },
    { name: 'Volunteer Movement', url: '#' },
    { name: 'Fire Brigade', url: '#' },
    { name: 'Junior Community', url: '#' },
];

/**
 * Варіант 4: "Modern Glass" (Скляний дизайн)
 * Напівпрозорі елементи, розмиття, сучасні відступи.
 */
export function FooterVariant4() {
    const { t, language } = useLanguage();
    const langPrefix = language.toLowerCase() === 'ua' ? '/ua' : '/en';

    return (
        <footer className="relative bg-[#050505] text-white pt-20 pb-10 px-6 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-16 mb-16 shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">

                        <div className="lg:col-span-1 space-y-8">
                            <div className="relative w-24 h-24">
                                <Image src="/media/logo.avif" alt="Logo" fill className="object-contain" />
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold tracking-tight">Жидичинський Монастир</h4>
                                <p className="text-sm text-gray-400 leading-relaxed font-light italic">
                                    {language === 'UA' ? 'Місце, де небо торкається землі.' : 'Where heaven touches the earth.'}
                                </p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                {[Facebook, Instagram, Youtube, Send].map((Icon, idx) => (
                                    <a key={idx} href="#" className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-amber-600 hover:border-amber-600 transition-all duration-300">
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/80">Путівник</h5>
                                    <ul className="grid grid-cols-1 gap-3 text-sm text-gray-400">
                                        {['nav.about', 'nav.news', 'nav.social', 'nav.media', 'nav.pilgrims'].map(key => (
                                            <li key={key}>
                                                <Link href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                                    <div className="w-1 h-1 bg-amber-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    {t(key)}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-6">
                                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/80">Обитель</h5>
                                    <ul className="grid grid-cols-1 gap-3 text-sm text-gray-400">
                                        {['nav.history', 'nav.complex', 'nav.sketes', 'nav.donate'].map(key => (
                                            <li key={key}>
                                                <Link href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                                    <div className="w-1 h-1 bg-amber-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    {t(key)}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 space-y-10">
                            <div>
                                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/80 mb-6">Контакти</h5>
                                <div className="space-y-4">
                                    <p className="text-xl font-bold hover:text-amber-500 transition-colors cursor-pointer">+38 067 104 22 88</p>
                                    <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">{t('footer.address')}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <Link href={`${langPrefix}/donate`} className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-amber-600 hover:text-white transition-colors">
                                    Підтримати <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
                    <div className="flex gap-10 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                        <span>© {new Date().getFullYear()} ZH-MONASTERY</span>
                        <span>All rights reserved</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
                        {partners.map(p => (
                            <a key={p.name} href={p.url} className="text-[9px] font-black text-gray-500 hover:text-white uppercase tracking-[0.3em] transition-colors">
                                {p.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

/**
 * Варіант 5: "Typography Focus" (Типографічний акцент)
 * Великий текст, асиметрія, висока контрастність.
 */
export function FooterVariant5() {
    const { t, language } = useLanguage();
    return (
        <footer className="bg-black text-white pt-24 pb-12 px-6 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    <div className="lg:col-span-5 space-y-10">
                        <h2 className="text-7xl md:text-8xl font-black leading-[0.85] tracking-tighter">
                            ЖИДИ<br />ЧИН.
                        </h2>
                        <div className="h-2 w-32 bg-amber-600"></div>
                        <p className="text-3xl font-light leading-snug tracking-tight max-w-sm text-gray-300">
                            {language === 'UA' ? 'Древня обитель у сучасному ритмі.' : 'Ancient monastery in a modern rhythm.'}
                        </p>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-16 lg:pt-12">
                        <div className="space-y-10">
                            <h5 className="text-xs font-black uppercase tracking-[0.3em] border-b-4 border-white inline-block">Меню сайту</h5>
                            <ul className="space-y-4">
                                {['about', 'history', 'news', 'complex', 'social-projects', 'pilgrims', 'donate'].map(path => (
                                    <li key={path}>
                                        <Link href={`/${language.toLowerCase()}/${path}`} className="text-4xl font-black uppercase tracking-tighter hover:text-amber-600 transition-colors block">
                                            {path.replace('-', ' ')}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h5 className="text-xs font-black uppercase tracking-[0.3em] border-b-4 border-white inline-block">Контакти</h5>
                                <div className="space-y-4">
                                    <a href="tel:+380671042288" className="text-2xl font-black block hover:text-amber-600 transition-colors tracking-tight">067 104 22 88</a>
                                    <p className="text-lg font-medium text-gray-500 leading-relaxed">{t('footer.address')}</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h5 className="text-xs font-black uppercase tracking-[0.3em] border-b-4 border-white inline-block">Проєкти</h5>
                                <div className="grid grid-cols-1 gap-2">
                                    {partners.map(p => (
                                        <a key={p.name} href={p.url} className="text-lg font-bold flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                            {p.name} <ExternalLink className="w-4 h-4" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-end border-t border-white/5 pt-8">
                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-600">© {new Date().getFullYear()} ZH-MONASTERY</p>
                    <div className="flex gap-4">
                        {[Facebook, Instagram, Youtube, Send].map((Icon, idx) => (
                            <Icon key={idx} className="w-6 h-6 text-gray-600 hover:text-amber-600 cursor-pointer transition-colors" />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
