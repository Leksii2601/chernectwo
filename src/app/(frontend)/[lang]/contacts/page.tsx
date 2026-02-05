'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Facebook, Youtube, Download, X, Send, Instagram, Copy, Check } from 'lucide-react';

import { clsx } from 'clsx';
import Image from 'next/image';
import { TextModal } from '@/components/ui/TextModal';

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
        description_ua: 'Правила та норми звернення до намісника та братії монастиря під час офіційного листування чи особистого спілкування, а також офіційне найменування монашої інституції.',
        description_en: 'Rules and norms of addressing the Abbot and the brethren of the monastery during official correspondence or personal communication, as well as the official naming of the monastic institution.',
        details_ua: [
            'ФОРМИ ЗВЕРНЕННЯ:',
            'Посада: Намісник Свято-Миколаївського Жидичинського монастиря',
            'Для офіційної кореспонденції: Наміснику Свято-Миколаївського Жидичинського монастиря архімандриту Константину (Марченко)',
            'Офіційне звернення: Високопреподобний архімандрит Константин',
            'Особисте звернення: «Отче Наміснику» або «Отець Константин»',
            'Звернення до братії: Всечесні отці та браття',
            '',
            'ЮРИДИЧНА НАЗВА: РО «Свято-Миколаївський чоловічий монастир Волинської єпархії УПЦ (ПЦУ)», код ЄДРПОУ 26278106',
            '',
            'ВАРІАНТИ НАЗВИ:',
            'Свято-Миколаївський Жидичинський монастир',
            'Монастир Святителя Миколая Чудотворця села Жидичин',
            'Жидичинський Свято-Миколаївський монастир'
        ],
        details_en: [
            'FORMS OF ADDRESS:',
            'Position: Abbot of the Saint Nicholas Zhydychyn Monastery',
            'Official Correspondence: To the Abbot of the Saint Nicholas Zhydychyn Monastery, Archimandrite Konstantin (Marchenko)',
            'Official Address: Very Reverend Archimandrite Konstantin',
            'Personal Address: "Father Abbot" or "Father Konstantin"',
            'Addressing the Brethren: Reverend Fathers and Brethren',
            '',
            'LEGAL NAME: RO "Holy Nicholas Monastery of the Volyn Eparchy of the OCU", EDRPOU code 26278106',
            '',
            'NAME VARIANTS:',
            'Saint Nicholas Zhydychyn Monastery',
            'Monastery of Saint Nicholas the Wonderworker of Zhydychyn',
            'Zhydychyn Saint Nicholas Monastery'
        ]
    },
];

export default function ContactsPage() {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState<TabType>('contacts');
    const [selectedPressItem, setSelectedPressItem] = useState<PressItem | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formError, setFormError] = useState('');

    const handleSelectPressItem = (item: PressItem) => {
        setSelectedPressItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPressItem(null);
        setCopiedIndex(null);
    };

    // Custom Icons not available in Lucide
    const ViberIcon = ({ className }: { className?: string }) => (
        <img src="/media/viber-logo.svg" alt="Viber" className={className} />
    );

    const WhatsappIcon = ({ className }: { className?: string }) => (
        <svg viewBox="0 0 448 512" fill="currentColor" className={className}>
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.5 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
    );

    const socialLinks = [
        {
            icon: <Facebook className="w-5 h-5" />,
            href: "https://www.facebook.com/chernectvo.volyni",
            name: "Facebook"
        },
        {
            icon: <Instagram className="w-5 h-5" />,
            href: "https://www.instagram.com/chernetstvovolyni",
            name: "Instagram"
        },
        {
            icon: <Youtube className="w-5 h-5" />,
            href: "https://www.youtube.com/@chernectvo_volyni",
            name: "YouTube"
        },
        {
            icon: <WhatsappIcon className="w-5 h-5" />,
            href: "https://whatsapp.com/channel/0029VbCZlG3GpLHWYKNea425",
            name: "WhatsApp"
        },
        {
            icon: <Send className="w-5 h-5" />,
            href: "https://t.me/chernetstvo_volyni",
            name: "Telegram"
        },
        {
            icon: <ViberIcon className="w-6 h-6 transition-all duration-300 group-hover:brightness-0 group-hover:invert" />,
            href: "https://invite.viber.com/?g2=AQAB6djHxEo4k1YHgvbWNapcX0pRA%2B2o8tUn5LLB5Jv%2BX1BCZhctg2bkqIY%2BTmoM",
            name: "Viber"
        }
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
                    <div className="flex gap-10 md:gap-16">
                        {(['contacts', 'map', 'press'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={clsx(
                                    "py-5 md:py-7 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.15em] md:tracking-[0.3em] transition-all relative",
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
                "mx-auto px-6 py-10 lg:py-24 transition-all duration-500 max-w-[1100px]"
            )}>
                {activeTab === 'contacts' && (
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 animate-in fade-in duration-500">
                        <div className="space-y-8">
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
                                            className="group w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-900 hover:bg-black hover:text-white hover:border-black transition-all rounded-full"
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

                            {submitStatus === 'success' ? (
                                <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100 animate-in fade-in zoom-in duration-500">
                                    <h4 className="text-amber-900 font-bold mb-2">
                                        {language === 'UA' ? 'Дякуємо!' : 'Thank you!'}
                                    </h4>
                                    <p className="text-amber-800 text-sm">
                                        {language === 'UA'
                                            ? 'Ваше повідомлення успішно надіслано. Ми відповімо вам найближчим часом.'
                                            : 'Your message has been sent successfully. We will get back to you soon.'}
                                    </p>
                                    <button
                                        onClick={() => setSubmitStatus('idle')}
                                        className="mt-6 text-[10px] font-bold uppercase tracking-widest text-amber-900 underline underline-offset-4"
                                    >
                                        {language === 'UA' ? 'Написати ще' : 'Send another'}
                                    </button>
                                </div>
                            ) : (
                                <form
                                    className="space-y-8"
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        setIsSubmitting(true);
                                        setFormError('');

                                        try {
                                            const res = await fetch('/api/submit-question', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                    name: formData.name,
                                                    email: formData.email,
                                                    question: formData.message
                                                })
                                            });

                                            const data = await res.json();
                                            if (res.ok) {
                                                setSubmitStatus('success');
                                                setFormData({ name: '', email: '', message: '' });
                                            } else {
                                                setFormError(data.error || 'Something went wrong');
                                            }
                                        } catch (err) {
                                            setFormError('Failed to send message');
                                        } finally {
                                            setIsSubmitting(false);
                                        }
                                    }}
                                >
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                                {language === 'UA' ? "Ваше ім'я" : "Your Name"}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all bg-transparent"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all bg-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                            {language === 'UA' ? 'Повідомлення' : 'Message'}
                                        </label>
                                        <textarea
                                            rows={3}
                                            required
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full border-b border-gray-200 py-2 focus:border-amber-600 outline-none transition-all resize-none bg-transparent"
                                        />
                                    </div>

                                    {formError && (
                                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{formError}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={clsx(
                                            "bg-black text-white px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                            isSubmitting && "animate-pulse"
                                        )}
                                    >
                                        {isSubmitting
                                            ? (language === 'UA' ? 'Надсилається...' : 'Sending...')
                                            : (language === 'UA' ? 'Надіслати' : 'Send')}
                                    </button>
                                </form>
                            )}
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
                                    <p className="text-gray-900 font-bold text-lg leading-tight tracking-tight">
                                        45240 Волинська область,<br />
                                        Луцький р-н, с. Жидичин,<br />
                                        вул. Ковельська, 1
                                    </p>
                                </div>
                                <div className="pt-8 border-t border-gray-100">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        GPS {language === 'UA' ? 'Координати' : 'Coordinates'}
                                    </h4>
                                    <div className="flex items-center gap-4">
                                        <p className="text-sm text-gray-600 font-mono tracking-widest">
                                            50.809369, 25.302041
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText("50.809369, 25.302041");
                                                    alert(language === 'UA' ? 'Координати скопійовано' : 'Coordinates copied');
                                                }}
                                                className="p-2 bg-gray-50 hover:bg-amber-50 rounded-lg text-gray-400 hover:text-amber-600 transition-colors"
                                                title={language === 'UA' ? 'Копіювати' : 'Copy'}
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                            </button>
                                            <a
                                                href="https://www.google.com/maps/search/?api=1&query=50.809369,25.302041"
                                                target="_blank"
                                                className="p-2 bg-gray-50 hover:bg-amber-50 rounded-lg text-gray-400 hover:text-amber-600 transition-colors"
                                                title={language === 'UA' ? 'Маршрут' : 'Directions'}
                                            >
                                                <Send className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'press' && (
                    <div className="animate-in fade-in duration-500 space-y-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
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
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                        <div className="border border-white/80 p-6 md:p-8 backdrop-blur-[2px] group-hover:bg-white/10 transition-all duration-300 w-[85%] h-[140px] md:h-[200px] flex flex-col justify-center items-center">
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


                    </div>
                )}
            </div>

            {/* Modal Layer */}
            <TextModal
                isOpen={showModal && !!selectedPressItem}
                onClose={handleCloseModal}
                title={selectedPressItem ? (language === 'UA' ? selectedPressItem.title_ua : selectedPressItem.title_en) : ''}
            >
                {selectedPressItem && (
                    <div className="space-y-12">
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
                            <div className="space-y-4">
                                {(language === 'UA' ? selectedPressItem.details_ua : selectedPressItem.details_en).map((detail, idx) => {
                                    if (!detail) return <div key={idx} className="h-2" />;

                                    const headerTerms = [
                                        'Звернення', 'Назва', 'Скорочена назва:', 'Юридична назва:',
                                        'Addressing', 'Name', 'Shortened Name:', 'Legal Name:'
                                    ];
                                    const isHeader = headerTerms.some(term => detail.startsWith(term) && detail.length < 30);

                                    return (
                                        <div key={idx} className="group flex flex-col gap-2">
                                            {isHeader ? (
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4 first:mt-0">
                                                    {detail}
                                                </span>
                                            ) : (
                                                <div className="flex items-center justify-between gap-4 p-3 md:p-4 bg-gray-50 rounded-2xl hover:bg-amber-50 transition-all duration-300">
                                                    <span className="text-gray-900 font-bold text-sm md:text-base leading-snug">
                                                        {detail}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(detail);
                                                            setCopiedIndex(idx);
                                                            setTimeout(() => setCopiedIndex(null), 2000);
                                                        }}
                                                        className="p-2 rounded-xl text-gray-400 hover:text-amber-600 hover:bg-white transition-all shrink-0 shadow-sm md:shadow-none hover:shadow-md"
                                                        title={language === 'UA' ? "Копіювати" : "Copy"}
                                                    >
                                                        {copiedIndex === idx ? (
                                                            <Check className="w-5 h-5 text-green-600" />
                                                        ) : (
                                                            <Copy className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {selectedPressItem.id === 'brandbook' && (
                            <button className="mt-8 flex items-center gap-4 bg-black text-white px-10 py-6 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-amber-800 transition-all shadow-2xl hover:scale-105 active:scale-95 duration-300">
                                <Download className="w-5 h-5" />
                                {language === 'UA' ? 'ЗАВАНТАЖИТИ АРХІВ' : 'DOWNLOAD ARCHIVE'}
                            </button>
                        )}
                    </div>
                )}
            </TextModal>

            <Footer />
        </main>
    );
}
