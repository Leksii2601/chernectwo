'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Send, Globe, Heart, Shield, Users } from 'lucide-react';
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
    { name: 'Zhydychyn Center', icon: <Globe className="w-5 h-5" />, url: '#' },
    { name: 'Volunteer Movement', icon: <Heart className="w-5 h-5" />, url: '#' },
    { name: 'Fire Brigade', icon: <Shield className="w-5 h-5" />, url: '#' },
    { name: 'Junior Community', icon: <Users className="w-5 h-5" />, url: '#' },
];

export function TestFooter() {
    const { t, language } = useLanguage();
    const langPrefix = language.toLowerCase() === 'ua' ? '/ua' : '/en';

    return (
        <footer className="bg-[#050505] text-white pt-20 pb-10 px-4 sm:px-6 lg:px-8 border-t border-white/5 font-sans">
            <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">

                    <div className="lg:col-span-2 space-y-8">
                        <Link href={langPrefix} className="inline-block relative w-64 md:w-80 aspect-[3/1] hover:opacity-80 transition-all duration-500">
                            <Image
                                src="/media/text-logo.avif"
                                alt="Zhydychyn Monastery"
                                fill
                                className="object-contain object-left filter brightness-110"
                            />
                        </Link>
                        <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                            {language === 'UA'
                                ? 'Простір молитви, тисячолітньої історії та сучасного служіння громаді на берегах древнього Жидичина.'
                                : 'A space of prayer, thousand-year history, and modern service to the community on the banks of ancient Zhydychyn.'}
                        </p>
                        <div className="pt-4">
                            <Link
                                href={`${langPrefix}/donate`}
                                className="inline-flex items-center justify-center px-8 py-4 bg-amber-600/10 border border-amber-600/30 text-amber-500 rounded-full hover:bg-amber-600 hover:text-white transition-all duration-300 text-sm font-semibold tracking-widest uppercase"
                            >
                                {t('nav.donate')}
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-amber-600">
                            {t('footer.info')}
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { key: 'nav.about', path: '/about' },
                                { key: 'nav.news', path: '/news' },
                                { key: 'nav.social', path: '/social-projects' },
                                { key: 'nav.pilgrims', path: '/pilgrims' },
                                { key: 'nav.history', path: '/history' }
                            ].map((item) => (
                                <li key={item.key}>
                                    <Link href={`${langPrefix}${item.path}`} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 block text-[17px]">
                                        {t(item.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-amber-600">
                            {t('footer.contacts')}
                        </h4>
                        <div className="space-y-8 text-gray-400">
                            <div>
                                <span className="block text-[11px] font-bold uppercase tracking-widest text-amber-600/60 mb-2">{t('footer.phone')}</span>
                                <a href="tel:+380671042288" className="text-lg text-white hover:text-amber-500 transition-colors tracking-tight">
                                    +38 (067) 104 22 88
                                </a>
                            </div>
                            <div>
                                <span className="block text-[11px] font-bold uppercase tracking-widest text-amber-600/60 mb-2">{t('footer.address_label')}</span>
                                <a
                                    href="https://maps.app.goo.gl/iVE1sepfWAnbwx6E8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[17px] leading-relaxed hover:text-white transition-colors block whitespace-pre-line"
                                >
                                    {t('footer.address')}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-8 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-amber-600">
                            {t('footer.socials')}
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                            <SocialButton icon={<Facebook className="w-5 h-5" />} href="https://www.facebook.com/chernectvo.volyni" label="FB" />
                            <SocialButton icon={<Instagram className="w-5 h-5" />} href="https://www.instagram.com/chernetstvovolyni" label="IG" />
                            <SocialButton icon={<Youtube className="w-5 h-5" />} href="https://www.youtube.com/@chernectvo_volyni" label="YT" />
                            <SocialButton icon={<WhatsappIcon className="w-5 h-5" />} href="https://whatsapp.com/channel/0029VbCZlG3GpLHWYKNea425" label="WA" />
                            <SocialButton icon={<Send className="w-5 h-5" />} href="https://t.me/chernetstvo_volyni" label="TG" />
                            <SocialButton icon={<ViberIcon className="w-5 h-5" />} href="https://invite.viber.com/?g2=AQAB6djHxEo4k1YHgvbWNapcX0pRA%2B2o8tUn5LLB5Jv%2BX1BCZhctg2bkqIY%2BTmoM" label="VB" />
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/5 py-12 mb-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 whitespace-nowrap">
                            {language === 'UA' ? 'ПАРТНЕРИ ТА ПРОЄКТИ' : 'PARTNERS & PROJECTS'}
                        </span>
                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40 hover:opacity-80 transition-opacity duration-700">
                            {partners.map((partner) => (
                                <a key={partner.name} href={partner.url} className="flex items-center gap-2 group transition-all">
                                    <div className="p-2 border border-white/10 rounded-lg group-hover:border-amber-600/50 group-hover:bg-amber-600/5 transition-all">
                                        {partner.icon}
                                    </div>
                                    <span className="text-xs font-medium tracking-wider group-hover:text-white transition-colors">{partner.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
                    <p className="text-[12px] text-gray-600 tracking-widest uppercase">
                        © {new Date().getFullYear()} {t('footer.copyright')}
                    </p>
                    <div className="flex gap-8">
                        <Link href="#" className="text-[10px] text-gray-600 hover:text-amber-600 transition-colors uppercase tracking-widest">{language === 'UA' ? 'Політика приватності' : 'Privacy Policy'}</Link>
                        <Link href="#" className="text-[10px] text-gray-600 hover:text-amber-600 transition-colors uppercase tracking-widest">{language === 'UA' ? 'Терміни користування' : 'Terms of Use'}</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

function SocialButton({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 border border-white/10 rounded-xl hover:border-amber-600/50 hover:bg-amber-600/5 hover:-translate-y-1 transition-all duration-300 group"
        >
            <div className="text-gray-400 group-hover:text-amber-500 transition-colors mb-1">
                {icon}
            </div>
            <span className="text-[9px] font-bold text-gray-600 group-hover:text-gray-400 uppercase tracking-tighter">{label}</span>
        </a>
    );
}
