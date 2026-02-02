'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Facebook, Youtube, Mail, Phone, Download, X, Send, Instagram } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';

type TabType = 'contacts' | 'map' | 'press';

interface PressItem {
    id: string;
    title_ua: string;
    title_en: string;
    subtitle_ua: string;
    subtitle_en: string;
    image: string;
    description_ua: string;
    description_en: string;
    details_ua: string[];
    details_en: string[];
}

const pressItems: PressItem[] = [
    {
        id: 'brandbook',
        title_ua: 'БРЕНДБУК',
        title_en: 'BRANDBOOK',
        subtitle_ua: 'ВІЗУАЛЬНИЙ СТИЛЬ',
        subtitle_en: 'VISUAL IDENTITY',
        image: '/media/history.jpg',
        description_ua: 'Офіційні матеріали, логотипи та правила візуального стилю Жидичинської обителі для коректного використання у медіа.',
        description_en: 'Official materials, logos, and visual style rules of the Zhydychyn Monastery for correct media usage.',
        details_ua: ['Логотипи у векторі (SVG, AI)', 'Колірна палітра (CMYK, RGB)', 'Шрифти та типографіка'],
        details_en: ['Vector logos (SVG, AI)', 'Color palette (CMYK, RGB)', 'Fonts and typography']
    },
    {
        id: 'naming',
        title_ua: 'ТИТУЛУВАННЯ',
        title_en: 'TITLES',
        subtitle_ua: 'ЕПІСТОЛЯРНИЙ ЕТИКЕТ',
        subtitle_en: 'FORMS OF ADDRESS',
        image: '/media/hero-1.jpg',
        description_ua: 'Правила та норми звернення до Намісника та братії монастиря під час офіційного листування чи особистого спілкування.',
        description_en: 'Rules and norms of addressing the Abbot and the brethren of the monastery during official correspondence or personal communication.',
        details_ua: [
            'Намісник: Високопреподобний архімандрит Костянтин',
            'Звернення: "Отче наміснику" або "Отець Костянтин"',
            'Братія: Всечесні отці та братія'
        ],
        details_en: [
            'Abbot: Very Reverend Archimandrite Konstantin',
            'Address: "Father Abbot" or "Father Konstantin"',
            'Brethren: Reverend Fathers and Brethren'
        ]
    },
    {
        id: 'commemoration',
        title_ua: 'ПОМИНАННЯ',
        title_en: 'COMMEMORATION',
        subtitle_ua: 'МОЛИТОВНА ПІДТРИМКА',
        subtitle_en: 'PRAYER SUPPORT',
        image: '/media/gallery.jpg',
        description_ua: 'Інформація про те, як правильно подавати записки для молитовного поминання та про види богослужінь.',
        description_en: 'Information on how to correctly submit notes for prayer commemoration and about the types of services.',
        details_ua: ['Записки за здоров’я', 'Записки за упокій', 'Сорокоуст та річне поминання'],
        details_en: ['Notes for health', 'Notes for repose', 'Sorokoust and annual commemoration']
    }
];

export default function ContactsPage() {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState<TabType>('contacts');

    // Fixed Modal State for Reliable Animation
    const [selectedPressItem, setSelectedPressItem] = useState<PressItem | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [animatingIn, setAnimatingIn] = useState(false);

    const handleSelectPressItem = (item: PressItem) => {
        setSelectedPressItem(item);
        setShowModal(true);
        // Start animation after a short delay to ensure the modal is in the DOM
        setTimeout(() => {
            setAnimatingIn(true);
        }, 50);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPressItem(null);
        setAnimatingIn(false);
        setIsClosing(false);
    };

    useEffect(() => {
        if (showModal) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
            document.body.classList.add('lock-scroll');
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.documentElement.style.setProperty('--scrollbar-width', '0px');
            document.body.classList.remove('lock-scroll');
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.body.classList.remove('lock-scroll');
        };
    }, [showModal]);

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/chernectvo.volyni", name: "Facebook" },
        { icon: <Youtube className="w-5 h-5" />, href: "https://www.youtube.com/@chernectvo_volyni", name: "YouTube" },
        { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com", name: "Instagram" },
        { icon: <Send className="w-5 h-5" />, href: "https://t.me/+380671042288", name: "Telegram" }
    ];

    return (
        <main className="min-h-screen bg-white font-montserrat tracking-tight overflow-x-hidden">
            <PageHeader
                title={t('contacts.title')}
                subtitle={t('page.contacts_subtitle')}
                backgroundImage="/media/contacts.jpg"
            />

            {/* Tab Navigation */}
            <div className="border-b border-gray-100 bg-white sticky top-0 z-30 mt-10">
                <div className="max-w-[1400px] mx-auto px-6 flex justify-center">
                    <div className="flex gap-8 md:gap-16">
                        {(['contacts', 'map', 'press'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={clsx(
                                    "py-6 text-[11px] font-bold uppercase tracking-[0.3em] transition-all relative",
                                    activeTab === tab ? "text-amber-600" : "text-gray-400 hover:text-gray-900"
                                )}
                            >
                                {tab === 'contacts' && (language === 'UA' ? 'Контакти' : 'Contacts')}
                                {tab === 'map' && (language === 'UA' ? 'Карта' : 'Map')}
                                {tab === 'press' && (language === 'UA' ? 'Для ЗМІ' : 'For Press')}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-[-4px] right-[-4px] h-[3px] bg-amber-600 rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={clsx(
                "mx-auto px-6 py-16 lg:py-24 transition-all duration-500",
                activeTab === 'press' ? "max-w-[1600px]" : "max-w-[1100px]"
            )}>
                {activeTab === 'contacts' && (
                    <div className="grid lg:grid-cols-2 gap-20 animate-in fade-in duration-500">
                        <div className="space-y-12">
                            <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                                    {language === 'UA' ? 'Телефон' : 'Phone'}
                                </h4>
                                <a href="tel:+380671042288" className="text-xl md:text-2xl font-bold text-gray-900 hover:text-amber-600 transition-colors tracking-tight">
                                    +38 (067) 104 22 88
                                </a>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                                    {language === 'UA' ? 'Електронна пошта' : 'Email'}
                                </h4>
                                <a href="mailto:chernectwo@gmail.com" className="text-xl md:text-2xl font-bold text-gray-900 hover:text-amber-600 transition-colors break-all tracking-tight">
                                    chernectwo@gmail.com
                                </a>
                            </div>

                            <div className="pt-8 border-t border-gray-100">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                                    {language === 'UA' ? 'Ми у соцмережах' : 'Social Media'}
                                </h4>
                                <div className="flex gap-4">
                                    {socialLinks.map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-900 hover:bg-black hover:text-white hover:border-black transition-all rounded-full"
                                            title={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest leading-none">
                                {language === 'UA' ? 'Форма звернення' : 'Message Form'}
                            </h3>
                            <form className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                            {language === 'UA' ? "Ваше ім'я" : "Your Name"}
                                        </label>
                                        <input type="text" className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all bg-transparent" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                            Email
                                        </label>
                                        <input type="email" className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all bg-transparent" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                        {language === 'UA' ? 'Повідомлення' : 'Message'}
                                    </label>
                                    <textarea rows={3} className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all resize-none bg-transparent" />
                                </div>
                                <button className="bg-black text-white px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-800 transition-all">
                                    {language === 'UA' ? 'Надіслати' : 'Send'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === 'map' && (
                    <div className="animate-in fade-in duration-500">
                        <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
                            <div className="h-[550px] bg-gray-50 overflow-hidden shadow-lg border border-gray-100 rounded-none">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2396.430767626645!2d25.3020407765785!3d50.80936887166296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472597c7c782c3dd%3A0x38994f41752c77fb!2z0JbQuNC00LjRh9C40L3RgdGM0LrQuNC5INCh0LLRj9GC0L4t0JzQuNC60L7Qu9Cw0ZfQstGB0YzQutC40Lkg0LzQvtC90LDRgdGC0LjRgCAo0J_QptCjKQ!5e1!3m2!1suk!2sua!4v1768489923329!5m2!1suk!2sua"
                                    className="w-full h-full border-0"
                                    allowFullScreen={true}
                                    loading="lazy"
                                />
                            </div>
                            <div className="space-y-12">
                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                                        {language === 'UA' ? 'Адреса' : 'Address'}
                                    </h4>
                                    <p className="text-gray-900 font-bold text-lg leading-tight uppercase tracking-tight">
                                        45240 Волинська область,<br />
                                        Луцький р-н, с. Жидичин,<br />
                                        вул. Ковельська, 1
                                    </p>
                                </div>
                                <div className="pt-8 border-t border-gray-100">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        GPS {language === 'UA' ? 'Координати' : 'Coordinates'}
                                    </h4>
                                    <p className="text-sm text-gray-600 font-mono tracking-widest">
                                        50.809369, 25.302041
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'press' && (
                    <div className="animate-in fade-in duration-500 space-y-16">
                        <div className="text-center mb-10 md:mb-16">
                            <span className="font-montserrat text-gray-500 uppercase tracking-[0.2em] text-sm md:text-base">
                                {language === 'UA' ? 'Медіа-матеріали' : 'Media Materials'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                            {pressItems.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleSelectPressItem(item)}
                                    className="group relative h-[250px] md:h-[350px] w-full overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title_ua}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                        <div className="border border-white/80 p-6 md:p-8 backdrop-blur-[2px] group-hover:bg-white/10 transition-all duration-300 max-w-[90%]">
                                            <h3 className="text-white font-montserrat font-bold text-xl md:text-2xl uppercase tracking-wider mb-2 drop-shadow-md">
                                                {language === 'UA' ? item.title_ua : item.title_en}
                                            </h3>
                                            <p className="text-white/90 font-sans text-sm md:text-lg font-medium tracking-wide uppercase">
                                                {language === 'UA' ? item.subtitle_ua : item.subtitle_en}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <div className="pt-16 border-t border-gray-100 text-center space-y-8">
                            <p className="text-gray-500 text-sm font-medium tracking-wide">
                                {language === 'UA'
                                    ? 'Якщо у вас виникли будь-які питання або вам потрібна додаткова інформація, ми завжди раді вам допомогти.'
                                    : 'If you have any questions or need additional information, we are always happy to help.'}
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                                <a href="tel:+380671042288" className="flex items-center gap-3 text-gray-900 hover:text-amber-600 transition-colors group">
                                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-amber-50 group-hover:border-amber-200">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span className="font-bold tracking-tight">+38 (067) 104 22 88</span>
                                </a>
                                <a href="mailto:chernectwo@gmail.com" className="flex items-center gap-3 text-gray-900 hover:text-amber-600 transition-colors group">
                                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-amber-50 group-hover:border-amber-200">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="font-bold tracking-tight">chernectwo@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Layer */}
            {showModal && selectedPressItem && (
                <div
                    className={clsx(
                        "fixed inset-0 z-[1000] p-4 md:p-10 transition-all duration-700 overflow-y-auto block",
                        !animatingIn ? "opacity-0 invisible" : "opacity-100 visible"
                    )}
                    onClick={handleCloseModal}
                >
                    <div className={clsx(
                        "fixed inset-0 bg-black/95 backdrop-blur-3xl transition-opacity duration-700",
                        !animatingIn ? "opacity-0" : "opacity-100"
                    )} />

                    <div
                        className={clsx(
                            "relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 mx-auto",
                            !animatingIn ? "scale-90 opacity-0 translate-y-12 blur-lg" : "scale-100 opacity-100 translate-y-0 blur-0"
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative h-[300px] md:h-[500px]">
                            <Image
                                src={selectedPressItem.image}
                                alt={selectedPressItem.title_ua}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10 md:bottom-16 md:left-16">
                                <h3 className={clsx(
                                    "text-3xl md:text-6xl font-black text-white uppercase tracking-tighter transition-all duration-1000 delay-300",
                                    !animatingIn ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
                                )}>
                                    {language === 'UA' ? selectedPressItem.title_ua : selectedPressItem.title_en}
                                </h3>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-amber-600 hover:text-white transition-all shadow-xl z-20 group"
                            >
                                <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
                            </button>
                        </div>

                        <div className="p-10 md:p-20 space-y-12">
                            <div className="space-y-6">
                                <h4 className="text-xs font-bold text-amber-600 uppercase tracking-[0.3em] leading-none">
                                    {language === 'UA' ? 'Настанова' : 'Guideline'}
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-lg md:text-xl font-medium">
                                    {language === 'UA' ? selectedPressItem.description_ua : selectedPressItem.description_en}
                                </p>
                            </div>

                            <div className="space-y-8">
                                <h4 className="text-xs font-bold text-amber-600 uppercase tracking-[0.3em] leading-none">
                                    {language === 'UA' ? 'ДЕТАЛІ ТА ВИМОГИ:' : 'DETAILS & REQUIREMENTS:'}
                                </h4>
                                <ul className="space-y-5">
                                    {(language === 'UA' ? selectedPressItem.details_ua : selectedPressItem.details_en).map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-5 text-gray-800 font-bold text-base md:text-lg border-l-4 border-amber-600/20 pl-6 py-1 hover:border-amber-600 transition-colors">
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {selectedPressItem.id === 'brandbook' && (
                                <button className="mt-8 flex items-center gap-4 bg-black text-white px-10 py-6 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-amber-800 transition-all shadow-2xl hover:scale-105 active:scale-95 duration-300">
                                    <Download className="w-5 h-5" />
                                    {language === 'UA' ? 'ЗАВАНТАЖИТИ АРХІВ' : 'DOWNLOAD ARCHIVE'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
