'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { clsx } from 'clsx';
import { TextModal } from '../ui/TextModal';
import { CircleArrowButton } from '../ui/CircleArrowButton';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Info, X, MapPin, ChevronLeft, ChevronRight, Phone, Facebook, Maximize2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/* -------------------------------------------------------------------------- */
/*                                DATA & TYPES                                */
/* -------------------------------------------------------------------------- */

type SketeData = {
    id: string;
    label: string;
    description: string;
    image: string;
    facebook?: string;
    overviewContent: React.ReactNode;
    galleryImages: string[];
    contactInfo: {
        address: string;
        mapEmbedUrl: string;
        phone?: string;
    };
};

/* -------------------------------------------------------------------------- */
/*                                SUB COMPONENT                               */
/* -------------------------------------------------------------------------- */

const SketeSectionBlock = ({ skete, index }: { skete: SketeData, index: number }) => {
    const { t } = useLanguage();
    type TabId = 'overview' | 'gallery' | 'contact';

    const TABS = [
        { id: 'overview' as const, label: t('skete.tab_overview') },
        { id: 'gallery' as const, label: t('skete.tab_gallery') },
        { id: 'contact' as const, label: t('skete.tab_contact') }
    ];

    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Custom tab handler for mobile UX
    const handleTabChange = (tabId: TabId) => {
        setActiveTab(tabId);
        // On mobile, if switching to overview, scroll to top of section to prevent getting lost
        if (tabId === 'overview' && window.innerWidth < 1024 && containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // UI State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Gallery
    const [galleryIndex, setGalleryIndex] = useState(0);

    // Parallax & Visibility
    const { ref: entryRef, inView: isVisible } = useInView({
        threshold: 0.15,
        triggerOnce: true,
        rootMargin: "-50px 0px"
    });

    const containerRef = useRef<HTMLDivElement>(null);

    // Gallery Controls
    const nextImage = useCallback(() => {
        setGalleryIndex((prev) => (prev + 1) % skete.galleryImages.length);
    }, [skete]);

    const prevImage = useCallback(() => {
        setGalleryIndex((prev) => (prev - 1 + skete.galleryImages.length) % skete.galleryImages.length);
    }, [skete]);

    // Block ID for Anchor Links
    const sectionId = skete.id;

    return (
        <div
            id={sectionId}
            ref={(node) => {
                entryRef(node);
                containerRef.current = node;
            }}
            className={clsx(
                "flex flex-col lg:flex-row min-h-[70vh] bg-white text-black mb-0 last:mb-0 pt-8 lg:pt-24",
                // Animated Entrance: Only on Desktop
                isVisible ? "opacity-100 translate-y-0" : "lg:opacity-0 lg:translate-y-24 opacity-100 translate-y-0",
                "lg:transition-all lg:duration-1000 lg:ease-in-out"
            )}
            style={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { transitionDelay: `${index * 100}ms` } : {}}
        >

            {/* CONTENT COLUMN (LEFT) */}
            <div className={clsx(
                "px-8 md:px-16 lg:px-20 py-4 lg:py-8 flex flex-col justify-center relative order-2 lg:order-1",
                activeTab === 'overview' ? "w-full lg:w-1/2" : "w-full lg:w-full",
                // Staggered reveal for desktop text
                isVisible ? "lg:opacity-100 lg:translate-x-0" : "lg:opacity-0 lg:-translate-x-12",
                "lg:transition-all lg:duration-1000 lg:ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            )}>

                {/* Fixed Container for Tabs */}
                <div className={clsx(
                    "w-full max-w-xl mx-auto transition-all duration-500",
                    activeTab === 'overview' ? "lg:mx-0" : "lg:mx-auto"
                )}>
                    <div className="flex gap-8 mb-4 md:mb-8 border-b border-gray-100 pb-4 relative">
                        <div className={clsx(
                            "flex gap-8 transition-all duration-500 ease-in-out w-fit",
                            activeTab !== 'overview' ? "pl-0 ml-[50%] -translate-x-1/2" : "ml-0 translate-x-0"
                        )}>
                            {TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={clsx(
                                        "text-xs font-bold uppercase tracking-widest pb-4 -mb-[17px] transition-all duration-300",
                                        activeTab === tab.id
                                            ? "text-black border-b-2 border-black"
                                            : "text-gray-300 hover:text-gray-600 border-b-2 border-transparent"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CONTENT CONTAINER */}
                <div className={clsx(
                    "w-full relative transition-all duration-500",
                    activeTab === 'gallery' ? "min-h-0 lg:min-h-[400px]" : "min-h-[300px] lg:min-h-[400px]"
                )}>

                    {/* --- OVERVIEW TAB --- */}
                    <div className={clsx(
                        "transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) w-full max-w-xl mx-auto lg:mx-0 mb-8",
                        activeTab === 'overview'
                            ? "opacity-100 translate-x-0 relative delay-100"
                            : "opacity-0 -translate-x-12 absolute top-0 pointer-events-none"
                    )}>
                        <h2 className="text-4xl md:text-5xl font-montserrat mb-8 text-black leading-tight uppercase">
                            {skete.label}
                        </h2>
                        <p className="text-gray-600 font-sans text-lg leading-relaxed mb-10">
                            {skete.description}
                        </p>
                        <CircleArrowButton
                            text={t('skete.details')}
                            onClick={() => setIsModalOpen(true)}
                            variant="dark"
                        />
                    </div>

                    {/* --- GALLERY TAB --- */}
                    <div className={clsx(
                        "transition-all duration-700 ease-in-out w-full border-t border-transparent",
                        activeTab === 'gallery'
                            ? "opacity-100 translate-y-0 relative z-10 delay-100"
                            : "opacity-0 translate-y-20 absolute top-0 left-0 pointer-events-none z-0 scale-95"
                    )}>
                        <div className="w-full lg:w-[65vw] max-w-full aspect-square md:aspect-[3/2] relative bg-black overflow-hidden group mx-auto cursor-zoom-in shadow-sm" onClick={() => setIsLightboxOpen(true)}>
                            <Image
                                src={skete.galleryImages[galleryIndex]}
                                alt="Gallery"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover animate-in fade-in duration-500"
                                priority={false}
                                key={galleryIndex}
                            />

                            {/* View Icon Overlay (Mobile) */}
                            <div className="absolute top-4 right-4 md:hidden bg-black/40 p-2 rounded-full backdrop-blur-sm">
                                <Maximize2 className="w-4 h-4 text-white" />
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-black shadow-lg rounded-full transition-all hover:scale-110 z-20"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-black shadow-lg rounded-full transition-all hover:scale-110 z-20"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    {/* --- CONTACTS TAB --- */}
                    <div className={clsx(
                        "transition-all duration-700 ease-in-out w-full",
                        activeTab === 'contact'
                            ? "opacity-100 translate-y-0 relative z-10 delay-100"
                            : "opacity-0 translate-y-20 absolute top-0 left-0 pointer-events-none z-0 scale-95"
                    )}>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left bg-gray-50 p-8 md:p-12 rounded-xl border border-gray-100 shadow-sm">
                            <div className="space-y-8">
                                <h3 className="text-3xl font-montserrat font-bold mb-8 text-black">{t('skete.contacts_title')}</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-amber-600 shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t('skete.address')}</p>
                                            <p className="text-xl text-gray-800 leading-snug">{skete.contactInfo.address}</p>
                                        </div>
                                    </div>

                                    {skete.contactInfo.phone && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-amber-600 shrink-0">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t('skete.phone')}</p>
                                                <p className="text-xl text-gray-800">{skete.contactInfo.phone}</p>
                                            </div>
                                        </div>
                                    )}

                                    {skete.facebook && (
                                        <div className="pt-4">
                                            <a
                                                href={skete.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group inline-flex items-center gap-4 text-gray-600 hover:text-black transition-colors"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:bg-black group-hover:border-black transition-all">
                                                    <Facebook size={20} className="text-black group-hover:text-white transition-colors" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-widest">{t('skete.facebook')}</span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="w-full h-[300px] md:h-full min-h-[300px] bg-gray-200 rounded-lg overflow-hidden shadow-inner relative">
                                <iframe
                                    src={skete.contactInfo.mapEmbedUrl}
                                    className="absolute inset-0 w-full h-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* IMAGE COLUMN (RIGHT) */}
            <div className={clsx(
                "order-1 lg:order-2 relative bg-white overflow-hidden flex items-center justify-center",
                activeTab === 'overview'
                    ? "h-auto w-full lg:w-1/2 opacity-100 mb-4 lg:mb-0 lg:translate-x-0"
                    : "h-0 lg:h-auto w-full lg:w-0 opacity-0 pointer-events-none mb-0 lg:mb-0 lg:translate-x-20",
                // Staggered reveal for desktop image
                isVisible ? "lg:opacity-100 lg:translate-x-0" : "lg:opacity-0 lg:translate-x-12",
                "lg:transition-all lg:duration-1000 lg:ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            )}>
                <div className="w-full p-4 lg:p-12 relative flex items-center justify-center">
                    <div className="w-full relative shadow-md lg:shadow-2xl rounded-sm overflow-hidden aspect-[3/2]">
                        <Image
                            src={skete.image}
                            alt={skete.label}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* MODALS */}
            <TextModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={skete.label}
            >
                <div className="space-y-8">
                    <div className="flex items-center gap-2 mb-2 text-amber-600">
                        <span className="text-xs font-bold uppercase tracking-widest">{t('skete.historical_note')}</span>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-600 mb-10 font-montserrat leading-relaxed text-lg">
                        {skete.overviewContent}
                    </div>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-all rounded-3xl"
                    >
                        {t('generic.close')}
                    </button>
                </div>
            </TextModal>

            {/* FULLSCREEN LIGHTBOX */}
            {isLightboxOpen && mounted && createPortal(
                <div
                    className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-in fade-in duration-300"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors p-3 bg-white/5 rounded-full"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 md:left-12 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all active:scale-90"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 md:right-12 z-50 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all active:scale-90"
                    >
                        <ChevronRight size={32} />
                    </button>

                    <div className="relative w-full h-full max-w-6xl max-h-[85vh] p-4 flex items-center justify-center" onClick={e => e.stopPropagation()}>
                        <Image
                            src={skete.galleryImages[galleryIndex]}
                            alt="Lightbox"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="absolute bottom-8 left-0 right-0 text-center text-white/50 font-bold uppercase tracking-widest text-[10px]">
                        {galleryIndex + 1} / {skete.galleryImages.length}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export const SketeInfoSection = () => {
    const { t } = useLanguage();

    const sketes: SketeData[] = [
        {
            id: 'holy-spirit',
            label: t('sketes.holy_spirit'),
            description: t('sketes.holy_spirit_long_desc'),
            image: '/media/sketes/sviatodukhivskyiskut/sviatodukhivskyi_3.avif',
            galleryImages: [
                '/media/sketes/sviatodukhivskyiskut/sviatodukhivskyi_1.avif',
                '/media/sketes/sviatodukhivskyiskut/sviatodukhivskyi_2.avif',
                '/media/sketes/sviatodukhivskyiskut/sviatodukhivskyi_3.avif',
                '/media/sketes/sviatodukhivskyiskut/sviatodukhivskyi_4.avif',
                '/media/sketes/sviatodukhivskyiskut/sviatodukhivskyi_5.jpg',
                '/media/sketes/sviatodukhivskyiskut/sviatodukhivskyi_6.png'
            ],
            overviewContent: (
                <div className="space-y-4 font-sans leading-relaxed text-gray-700">
                    <p>{t('sketes.holy_spirit_overview_1')}</p>
                    <p>{t('sketes.holy_spirit_overview_2')}</p>
                </div>
            ),
            contactInfo: {
                address: 'вул. Селищна, Жидичин, Волинська область, 45240',
                mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1260.6493299263846!2d25.302466!3d50.807105!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47259726b2205fb1%3A0x46ea483680fb9da5!2z0KHQstGP0YLQvi3QlNGD0YXRltCy0YHRjNC60LjQuSDRgdC60LjRgg!5e0!3m2!1suk!2sua!4v1769424800690!5m2!1suk!2sua',
            }
        },
        {
            id: 'petro-pavlivsky',
            label: t('sketes.petro_pavlo'),
            description: t('sketes.petro_pavlo_long_desc'),
            image: '/media/sketes/petropavlivskyiskut/petropavlivskyi_1.avif',
            facebook: 'https://www.facebook.com/profile.php?id=100075686154395',
            galleryImages: [
                '/media/sketes/petropavlivskyiskut/petropavlivskyi_2.avif',
                '/media/sketes/petropavlivskyiskut/petropavlivskyi_3.avif',
                '/media/sketes/petropavlivskyiskut/petropavlivskyi_4.avif',
                '/media/sketes/petropavlivskyiskut/petropavlivskyi_5.jpg',
                '/media/sketes/petropavlivskyiskut/petropavlivskyi_6.jpg',
                '/media/sketes/petropavlivskyiskut/petropavlivskyi_7.jpg',
                '/media/sketes/petropavlivskyiskut/petropavlivskyi_8.jpg',
                '/media/sketes/petropavlivskyiskut/petropavlivskyi_9.jpg'
            ],
            overviewContent: (
                <div className="space-y-4 font-sans leading-relaxed text-gray-700">
                    <p>{t('sketes.petro_pavlo_overview_1')}</p>
                    <p>{t('sketes.petro_pavlo_overview_2')}</p>
                </div>
            ),
            contactInfo: {
                address: 'Липляни, Волинська область, 45240',
                mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2522.267335012639!2d25.296588!3d50.789154!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472597bd80d601b7%3A0xde0f9b72812828b9!2z0KHQutC40YIg0J_QtdGC0YDQsCDRliDQn9Cw0LLQu9Cw!5e0!3m2!1suk!2sua!4v1769424998899!5m2!1suk!2sua',
            }
        },
        {
            id: 'life-bearing',
            label: t('sketes.life_source'),
            description: t('sketes.life_source_long_desc'),
            image: '/media/sketes/skytzhyvonosnedzherelo/zhyvonosne_2.avif',
            galleryImages: [
                '/media/sketes/skytzhyvonosnedzherelo/zhyvonosne_1.avif',
                '/media/sketes/skytzhyvonosnedzherelo/zhyvonosne_2.avif',
                '/media/sketes/skytzhyvonosnedzherelo/zhyvonosne_3.avif',
                '/media/sketes/skytzhyvonosnedzherelo/zhyvonosne_4.avif',
                '/media/sketes/skytzhyvonosnedzherelo/zhyvonosne_5.avif'
            ],
            overviewContent: (
                <div className="space-y-4 font-sans leading-relaxed text-gray-700">
                    <p>{t('sketes.life_source_overview_1')}</p>
                    <p>{t('sketes.life_source_overview_2')}</p>
                </div>
            ),
            contactInfo: {
                address: 'с. Жидичин',
                mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2521.860856011235!2d25.309044393436352!3d50.7966872226544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDQ3JzQ4LjQiTiAyNcKwMTgnMzIuNCJF!5e0!3m2!1suk!2sua!4v1741781413138!5m2!1suk!2sua',
            }
        }
    ];

    return (
        <section className="relative w-full bg-white pb-12 overflow-hidden">
            <div className="flex flex-col gap-0">
                {sketes.map((skete, index) => (
                    <SketeSectionBlock key={skete.id} skete={skete} index={index} />
                ))}
            </div>
        </section>
    );
};
