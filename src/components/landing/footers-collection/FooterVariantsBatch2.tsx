'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Send, Globe, Heart, Shield, Users, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Варіант 2: "Мінімалістичний Дзен"
 * Максимальна чистота, відцентрований логотип, тонкі лінії.
 */
export function FooterVariant2() {
    const { t, language } = useLanguage();
    const langPrefix = language.toLowerCase() === 'ua' ? '/ua' : '/en';

    return (
        <footer className="bg-[#0a0a0a] text-white py-20 px-4 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* Top Logo */}
                <Link href={langPrefix} className="mb-16 hover:opacity-70 transition-opacity">
                    <div className="relative w-24 h-24 mb-6 mx-auto">
                        <Image src="/media/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <div className="text-center font-montserrat text-lg tracking-[0.5em] uppercase font-light">
                        Жидичин
                    </div>
                </Link>

                {/* Links Row */}
                <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16">
                    {['nav.about', 'nav.history', 'nav.news', 'nav.social', 'nav.pilgrims', 'nav.donate'].map(key => (
                        <Link key={key} href="#" className="text-sm uppercase tracking-widest text-gray-500 hover:text-white transition-all duration-300 relative group">
                            {t(key)}
                            <span className="absolute -bottom-2 left-0 w-0 h-px bg-amber-600 transition-all duration-500 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* Partners Strip */}
                <div className="flex flex-wrap justify-center gap-8 mb-20 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                    {['Zhydychyn Center', 'Volunteer Movement', 'Resurrection Choir', 'IP Zavtra'].map(name => (
                        <span key={name} className="text-[10px] font-bold uppercase tracking-[0.3em]">{name}</span>
                    ))}
                </div>

                {/* Bottom Socials & Copyright */}
                <div className="w-full pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex gap-6">
                        <Facebook className="w-5 h-5 text-gray-600 hover:text-white cursor-pointer transition-colors" />
                        <Instagram className="w-5 h-5 text-gray-600 hover:text-white cursor-pointer transition-colors" />
                        <Youtube className="w-5 h-5 text-gray-600 hover:text-white cursor-pointer transition-colors" />
                        <Send className="w-5 h-5 text-gray-600 hover:text-white cursor-pointer transition-colors" />
                    </div>

                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                        © {new Date().getFullYear()} {t('footer.copyright')}
                    </p>

                    <Link href="#" className="flex items-center gap-2 text-xs text-amber-600/60 hover:text-amber-500 transition-colors">
                        {language === 'UA' ? 'Написати нам' : 'Write to us'} <ArrowUpRight className="w-3 h-3" />
                    </Link>
                </div>

            </div>
        </footer>
    );
}

/**
 * Варіант 3: "Соціальний Хаб"
 * Акцент на великих кнопках соцмереж та контактах. Велике візуальне розбиття.
 */
export function FooterVariant3() {
    const { t, language } = useLanguage();
    const langPrefix = language.toLowerCase() === 'ua' ? '/ua' : '/en';

    return (
        <footer className="bg-black text-white border-t border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">

                {/* Left Section: Branding & Socials */}
                <div className="p-10 lg:p-20 space-y-16">
                    <Link href={langPrefix} className="inline-block relative w-32 h-32">
                        <Image src="/media/logo.png" alt="Logo" fill className="object-contain" />
                    </Link>
                    <div className="space-y-6">
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                            БУДЬТЕ <br /> НА ЗВ'ЯЗКУ
                        </h3>
                        <p className="text-gray-500 text-lg max-w-sm">
                            Стежте за життям обителі у ваших улюблених медіа. Ми публікуємо новини, фото та трансляції щодня.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                        {[
                            { icon: <Facebook />, label: 'Facebook', color: 'hover:bg-blue-600' },
                            { icon: <Instagram />, label: 'Instagram', color: 'hover:bg-pink-600' },
                            { icon: <Youtube />, label: 'YouTube', color: 'hover:bg-red-600' },
                            { icon: <Send />, label: 'Telegram', color: 'hover:bg-sky-500' },
                            { icon: <Globe />, label: 'Website', color: 'hover:bg-amber-600' },
                            { icon: <Heart />, label: 'Donate', color: 'hover:bg-rose-600' },
                        ].map((item, idx) => (
                            <a
                                key={idx}
                                href="#"
                                className={`flex flex-col items-center justify-center p-8 border border-white/5 transition-all duration-300 group ${item.color}`}
                            >
                                <div className="w-8 h-8 mb-4 group-hover:scale-125 transition-transform">{item.icon}</div>
                                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Section: Contacts & Links */}
                <div className="p-10 lg:p-20 flex flex-col justify-between">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-12">
                            <div>
                                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-l-2 border-amber-600 pl-4">{t('footer.contacts')}</h5>
                                <div className="space-y-8">
                                    <div>
                                        <p className="text-3xl font-bold tracking-tight mb-2 hover:text-amber-500 cursor-pointer transition-colors">+38 067 104 22 88</p>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Основний контакт</p>
                                    </div>
                                    <div>
                                        <p className="text-xl leading-relaxed text-gray-400 font-light italic">{t('footer.address')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10">
                                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-l-2 border-amber-600 pl-4">ПАРТНЕРИ</h5>
                                <div className="flex flex-col gap-4 text-sm text-gray-500 font-bold uppercase tracking-widest">
                                    <a href="#" className="hover:text-white transition-colors">Zhydychyn Center</a>
                                    <a href="#" className="hover:text-white transition-colors">Volunteer Movement</a>
                                    <a href="#" className="hover:text-white transition-colors">Fire Brigade</a>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-l-2 border-amber-600 pl-4">НАВІГАЦІЯ</h5>
                            <ul className="space-y-4">
                                {['nav.about', 'nav.history', 'nav.news', 'nav.complex', 'nav.sketes', 'nav.media', 'nav.social', 'nav.pilgrims', 'nav.donate'].map(key => (
                                    <li key={key}>
                                        <Link href="#" className="text-xl font-bold hover:text-amber-500 transition-all flex items-center gap-3 group">
                                            <span className="w-0 group-hover:w-4 h-1 bg-amber-600 transition-all"></span>
                                            {t(key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
                        <span>© {new Date().getFullYear()} ZH-MONASTERY</span>
                        <Link href="#" className="hover:text-amber-600 transition-colors">Privacy Policy</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
