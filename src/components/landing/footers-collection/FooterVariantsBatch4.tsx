'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Send, MapPin, Phone, Mail, Clock, ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Варіант 6: "Classic Monastery Grid"
 * Класична сітка, добре збалансовані відступи, фокус на розкладі.
 */
export function FooterVariant6() {
    const { t, language } = useLanguage();
    return (
        <footer className="bg-[#080808] text-white pt-20 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-8">
                        <div className="relative w-20 h-20">
                            <Image src="/media/logo.png" alt="Logo" fill className="object-contain grayscale" />
                        </div>
                        <h4 className="text-xl font-bold font-montserrat tracking-wide">Жидичинський Свято-Миколаївський монастир</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {language === 'UA' ? 'Древня святиня Волині, місце духовної сили та щоденної молитви.' : 'Ancient shrine of Volyn, a place of spiritual strength and daily prayer.'}
                        </p>
                    </div>
                    <div className="space-y-8">
                        <h5 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500">Розділи</h5>
                        <div className="grid grid-cols-1 gap-4">
                            {['nav.about', 'nav.history', 'nav.news', 'nav.complex', 'nav.sketes'].map(key => (
                                <Link key={key} href="#" className="text-[15px] text-gray-400 hover:text-amber-500 transition-colors">{t(key)}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h5 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500">Інформація</h5>
                        <div className="grid grid-cols-1 gap-4">
                            {['nav.pilgrims', 'nav.donate', 'nav.media', 'nav.social'].map(key => (
                                <Link key={key} href="#" className="text-[15px] text-gray-400 hover:text-amber-500 transition-colors">{t(key)}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h5 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500">Допомога</h5>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <span className="text-[10px] text-gray-600 font-bold uppercase block tracking-widest">Контакт</span>
                                    <a href="tel:+380671042288" className="text-sm font-bold hover:text-white transition-colors tracking-tighter">+38 (067) 104 22 88</a>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <span className="text-[10px] text-gray-600 font-bold uppercase block tracking-widest">Богослужіння</span>
                                    <span className="text-sm font-bold">Щоденно з 08:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
                    <span>© {new Date().getFullYear()} ZH-MONASTERY</span>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-white transition-colors">Facebook</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">YouTube</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/**
 * Варіант 7: "The Gold Monastery"
 * Використання градієнтів та золотих акцентів для преміум-вигляду.
 */
export function FooterVariant7() {
    const { t, language } = useLanguage();
    return (
        <footer className="bg-black text-white relative py-24 overflow-hidden border-t border-amber-600/10">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"></div>
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-24 items-center">
                <div className="hidden lg:flex flex-col items-end gap-6">
                    {['nav.about', 'nav.history', 'nav.news', 'nav.complex'].map(key => (
                        <Link key={key} href="#" className="text-xs font-bold uppercase tracking-[0.4em] text-gray-500 hover:text-amber-500 transition-all">{t(key)}</Link>
                    ))}
                </div>
                <div className="flex flex-col items-center space-y-10">
                    <div className="relative w-40 h-40 group">
                        <div className="absolute inset-0 bg-amber-600/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <Image src="/media/logo.png" alt="Logo" fill className="object-contain relative z-10 p-4" />
                    </div>
                    <div className="text-center space-y-4">
                        <h3 className="text-2xl font-black uppercase tracking-[0.4em] bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">ЖИДИЧИН</h3>
                        <div className="flex justify-center gap-6">
                            <Facebook className="w-5 h-5 text-amber-600/40 hover:text-amber-500 cursor-pointer transition-colors" />
                            <Instagram className="w-5 h-5 text-amber-600/40 hover:text-amber-500 cursor-pointer transition-colors" />
                            <Youtube className="w-5 h-5 text-amber-600/40 hover:text-amber-500 cursor-pointer transition-colors" />
                            <Send className="w-5 h-5 text-amber-600/40 hover:text-amber-500 cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-6">
                    {['nav.sketes', 'nav.social', 'nav.pilgrims', 'nav.donate'].map(key => (
                        <Link key={key} href="#" className="text-xs font-bold uppercase tracking-[0.4em] text-gray-500 hover:text-amber-500 transition-all">{t(key)}</Link>
                    ))}
                </div>
            </div>
            <div className="mt-24 text-center">
                <p className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.8em]">СВЯТО-МИКОЛАЇВСЬКА ОБИТЕЛЬ • {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}

/**
 * Варіант 8: "Graphic Watermark"
 */
export function FooterVariant8() {
    const { t, language } = useLanguage();
    return (
        <footer className="bg-black text-white pt-32 pb-12 relative overflow-hidden border-t border-white/5">
            <div className="absolute top-2 left-0 w-full text-[25vw] font-black leading-none text-white/[0.02] select-none pointer-events-none whitespace-nowrap">
                ZH-MONASTERY
            </div>
            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-20">
                    <div className="lg:w-1/2 space-y-12">
                        <Link href="#" className="inline-block relative w-32 h-32">
                            <Image src="/media/logo.png" alt="Logo" fill className="object-contain" />
                        </Link>
                        <h3 className="text-5xl md:text-6xl font-black tracking-tight leading-none uppercase">
                            {language === 'UA' ? 'Древній Жидичин чекає на вас' : 'Ancient Zhydychyn awaits you'}
                        </h3>
                        <p className="text-xl text-gray-500 max-w-lg leading-relaxed">{t('social.description')}</p>
                    </div>
                    <div className="lg:w-1/3 grid grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Навігація</h5>
                            <ul className="space-y-4 text-lg">
                                {['about', 'history', 'news', 'complex'].map(p => (
                                    <li key={p}><Link href="#" className="hover:text-amber-500 transition-colors uppercase font-bold tracking-tighter">{p}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Зв'язок</h5>
                            <ul className="space-y-4 text-lg">
                                <li><a href="tel:+380671042288" className="hover:text-amber-500 transition-colors font-bold">+38 067 104 22 88</a></li>
                                <li><span className="text-gray-500">Facebook</span></li>
                                <li><span className="text-gray-500">Instagram</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-600 uppercase tracking-widest gap-4">
                    <span>© {new Date().getFullYear()} Жидичинський Монастир</span>
                    <div className="flex gap-8 items-center">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/**
 * Варіант 9: "Vertical Column Style"
 */
export function FooterVariant9() {
    const { t } = useLanguage();
    return (
        <footer className="bg-[#050505] text-white py-20 px-6 border-t border-amber-600/20">
            <div className="max-w-md mx-auto text-center space-y-16">
                <Link href="#" className="inline-block relative w-20 h-20 mx-auto">
                    <Image src="/media/logo.png" alt="Logo" fill className="object-contain" />
                </Link>
                <div className="space-y-10">
                    <nav className="flex flex-col gap-6 text-xl font-bold uppercase tracking-widest">
                        {['nav.about', 'nav.news', 'nav.social', 'nav.donate'].map(key => (
                            <Link key={key} href="#" className="hover:text-amber-600 transition-colors">{t(key)}</Link>
                        ))}
                    </nav>
                    <div className="h-px w-20 bg-amber-600/30 mx-auto"></div>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-400">{t('footer.address')}</p>
                        <a href="tel:+380671042288" className="text-2xl font-black block">+38 067 104 22 88</a>
                    </div>
                </div>
                <div className="flex justify-center gap-8">
                    <Facebook className="w-6 h-6 text-gray-600 hover:text-white transition-colors" />
                    <Instagram className="w-6 h-6 text-gray-600 hover:text-white transition-colors" />
                    <Youtube className="w-6 h-6 text-gray-600 hover:text-white transition-colors" />
                </div>
                <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.5em]">
                    Faith • Hope • Love
                </p>
            </div>
        </footer>
    );
}

/**
 * Варіант 10: "The Monastery Dashboard"
 */
export function FooterVariant10() {
    const { t } = useLanguage();
    return (
        <footer className="bg-black text-white p-4">
            <div className="bg-[#111] rounded-[30px] p-8 md:p-16">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-16">
                    <div className="space-y-6">
                        <span className="px-4 py-1 rounded-full border border-amber-600/30 text-[10px] font-bold text-amber-500 uppercase tracking-widest">Офіційний сайт</span>
                        <h2 className="text-5xl font-black tracking-tighter">СВЯТИНЯ ПОРУЧ.</h2>
                    </div>
                    <Link href="#" className="flex items-center gap-6 bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-tighter hover:bg-amber-600 hover:text-white transition-all transform hover:-rotate-2">
                        {t('nav.donate')} <Heart className="w-6 h-6" fill="currentColor" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-500 pt-16 border-t border-white/5">
                    <div className="space-y-4">
                        <h6 className="text-white">РОЗДІЛИ</h6>
                        <div className="flex flex-col gap-2">
                            <Link href="#" className="hover:text-white underline decoration-amber-600/50 underline-offset-4">ПРО НАС</Link>
                            <Link href="#" className="hover:text-white">ІСТОРІЯ</Link>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h6 className="text-white">ІНФОРМАЦІЯ</h6>
                        <div className="flex flex-col gap-2">
                            <Link href="#" className="hover:text-white underline decoration-amber-600/50 underline-offset-4">НОВИНИ</Link>
                            <Link href="#" className="hover:text-white">ПУБЛІКАЦІЇ</Link>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h6 className="text-white">КОМПЛЕКС</h6>
                        <div className="flex flex-col gap-2">
                            <Link href="#" className="hover:text-white underline decoration-amber-600/50 underline-offset-4">ХРАМИ</Link>
                            <Link href="#" className="hover:text-white">СКИТИ</Link>
                        </div>
                    </div>
                    <div className="col-span-2 space-y-4">
                        <h6 className="text-white">КОНТАКТИ</h6>
                        <div className="space-y-1">
                            <p className="text-white">с. Жидичин, вул. Ковельська, 1</p>
                            <p className="text-amber-600">+38 067 104 22 88</p>
                        </div>
                    </div>
                    <div className="flex justify-end items-start gap-4 pt-10 lg:pt-0">
                        <Facebook className="w-5 h-5 hover:text-white" />
                        <Instagram className="w-5 h-5 hover:text-white" />
                    </div>
                </div>
                <div className="mt-16 text-[9px] text-gray-700 font-bold uppercase tracking-[1em] text-center lg:text-left transition-all hover:text-gray-400 cursor-default">
                    © {new Date().getFullYear()} ZH-MONASTERY-ADMINISTRATION
                </div>
            </div>
        </footer>
    );
}
