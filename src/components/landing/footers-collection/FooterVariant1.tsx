'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Send, Globe, Heart, Shield, Users, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ViberIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M7.96472 6.2019C7.77897 6.17476 7.58952 6.21205 7.42791 6.30756H7.41413C7.03892 6.52749 6.70092 6.80547 6.41269 7.13115C6.17316 7.40809 6.04322 7.68831 6.0091 7.95803C5.98875 8.11881 6.00253 8.27959 6.05044 8.43315L6.0675 8.44365C6.33722 9.2364 6.68963 9.99896 7.12013 10.7169C7.67467 11.7255 8.35713 12.6583 9.15057 13.4922L9.17419 13.5263L9.2116 13.5539L9.23522 13.5814L9.26278 13.6051C10.0997 14.4008 11.0347 15.0865 12.0453 15.6453C13.2003 16.274 13.9012 16.5713 14.3218 16.6947V16.7012C14.4452 16.7387 14.5574 16.7557 14.6703 16.7557C15.0288 16.7294 15.3682 16.5839 15.6343 16.3423C15.9585 16.054 16.2334 15.7146 16.4481 15.3376V15.331C16.6495 14.9517 16.5813 14.5927 16.2906 14.3499C15.7083 13.841 15.0788 13.389 14.4104 13C13.9628 12.7572 13.5081 12.9042 13.3237 13.1503L12.9306 13.6457C12.7291 13.8918 12.3629 13.8577 12.3629 13.8577L12.3524 13.8643C9.62175 13.1667 8.89332 10.4019 8.89332 10.4019C8.89332 10.4019 8.85919 10.0259 9.11185 9.83425L9.60403 9.43787C9.83963 9.24625 10.0037 8.79212 9.75103 8.3439C9.36477 7.67463 8.91373 7.04489 8.40441 6.46375C8.29306 6.32674 8.13685 6.23353 7.96341 6.20059L7.96472 6.2019Z" fill="currentColor" />
    </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 448 512" fill="currentColor" className={className}>
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.5 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
);

const partners = [
    { name: 'Zhydychyn Center', icon: <Globe className="w-4 h-4" />, url: 'https://zhydychyn.center' },
    { name: 'Volunteer Movement', icon: <Heart className="w-4 h-4" />, url: '#' },
    { name: 'Fire Brigade', icon: <Shield className="w-4 h-4" />, url: '#' },
    { name: 'IP Zavtra', icon: <Users className="w-4 h-4" />, url: '#' },
];

/**
 * Варіант 1: "Елегантний Чорний"
 * Акцент на типографіці та просторі.
 */
export function FooterVariant1() {
    const { t, language } = useLanguage();
    const langPrefix = language.toLowerCase() === 'ua' ? '/ua' : '/en';

    return (
        <footer className="bg-black text-white pt-24 pb-12 px-6 lg:px-12 overflow-hidden border-t border-white/5">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr_1fr] gap-20 mb-20">

                    <div className="space-y-10">
                        <Link href={langPrefix} className="inline-block relative w-48 aspect-square hover:scale-105 transition-transform duration-700">
                            <Image src="/media/text-logo.png" alt="Logo" fill className="object-contain object-left" />
                        </Link>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-xs font-light tracking-wide">
                            {language === 'UA'
                                ? 'Ми зберігаємо традиції, щоб творити майбутнє.'
                                : 'Preserving traditions to create the future.'}
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Youtube, Send].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 group">
                                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="space-y-6">
                            <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-600">{t('footer.info')}</h5>
                            <ul className="space-y-3">
                                {['nav.about', 'nav.news', 'nav.social', 'nav.history'].map(key => (
                                    <li key={key}>
                                        <Link href="#" className="text-gray-400 hover:text-white transition-colors text-[16px]">{t(key)}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-600">ПРОЄКТИ</h5>
                            <ul className="space-y-3">
                                {partners.map(p => (
                                    <li key={p.name}>
                                        <a href={p.url} className="text-gray-400 hover:text-white transition-colors text-[16px] flex items-center gap-2">
                                            {p.name} <ExternalLink className="w-3 h-3 opacity-30" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-2 lg:col-span-1 space-y-6">
                            <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-600">ЗВ'ЯЗОК</h5>
                            <div className="space-y-4">
                                <a href="tel:+380671042288" className="block group">
                                    <span className="text-[10px] text-gray-600 font-bold block uppercase mb-1">Телефон</span>
                                    <span className="text-xl font-light group-hover:text-amber-500 transition-colors">+38 (067) 104 22 88</span>
                                </a>
                                <div className="pt-2">
                                    <span className="text-[10px] text-gray-600 font-bold block uppercase mb-1">Адреса</span>
                                    <span className="text-md text-gray-400 leading-relaxed font-light">{t('footer.address')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-600">
                        <span>© {new Date().getFullYear()} {t('footer.copyright')}</span>
                    </div>
                    <div className="flex items-center gap-10">
                        <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest hidden lg:block">Зроблено з вірою</span>
                        <div className="h-px w-20 bg-white/10 hidden lg:block"></div>
                        <div className="flex gap-6">
                            <Link href="#" className="text-[11px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em]">UA</Link>
                            <Link href="#" className="text-[11px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em]">EN</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
