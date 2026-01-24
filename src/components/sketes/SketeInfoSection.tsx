'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Info, X, MapPin, ChevronLeft, ChevronRight, Phone, Facebook } from 'lucide-react';

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

const sketes: SketeData[] = [
    {
        id: 'holy-spirit',
        label: 'Свято-Духівський скит',
        description: 'Розташований серед густого лісу, цей скит є місцем, де час зупиняється. Тут ченці шукають найглибшого єднання з Богом через безперестанну молитву.',
        image: '/media/hero-1.jpg',
        galleryImages: ['/media/hero-1.jpg', '/media/hero-2.png', '/media/hero-3.jpg', '/media/hero-4.jpg'],
        overviewContent: (
            <div className="space-y-4 font-sans leading-relaxed text-gray-700">
                <p>
                    Скит Святого Духа був заснований з метою відродження давньої традиції пустельництва. 
                    Це місце, де братія монастиря може відійти від повсякденних послухів і повністю присвятити себе молитві.
                </p>
                <p>
                    Архітектура скита проста і сувора, нагадуючи про аскетичний спосіб життя його насельників. 
                    Дерев&apos;яний храм Святого Духа гармонійно вписується в лісовий ландшафт.
                </p>
                <h4 className="text-lg font-bold text-black mt-4">Особливості:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Суворий устав мовчання.</li>
                    <li>Відсутність електрики та сучасних зручностей.</li>
                    <li>Щоденне звершення повного чернечого правила.</li>
                </ul>
            </div>
        ),
        contactInfo: {
            address: 'вул. Селищна, Жидичин, Волинська область, 45240',
            mapEmbedUrl: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d630.3251863809803!2d25.302455253864625!3d50.807066354319794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47259726b2205fb1%3A0x46ea483680fb9da5!2z0KHQstGP0YLQvi3QlNGD0YXRltCy0YHRjNC60LjQuSDRgdC60LjRgg!5e0!3m2!1suk!2sua!4v1740839783911!5m2!1suk!2sua" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        }
    },
    {
        id: 'life-bearing',
        label: 'Скит Живоносне джерело',
        description: 'Присвячений святителю-хірургу, цей скит має особливу місію — служіння хворим та нужденним, поєднуючи молитву з ділами милосердя.',
        image: '/media/hero-2.png',
        galleryImages: ['/media/hero-2.png', '/media/hero-3.jpg', '/media/hero-1.jpg'],
        overviewContent: (
            <div className="space-y-4 font-sans leading-relaxed text-gray-700">
                <p>
                    Скит на честь святителя Луки Кримського став центром медичного та соціального служіння монастиря. 
                    Тут діє невелика амбулаторія, де надається перша допомога, а також проводиться духовна опіка хворих.
                </p>
                <p>
                    Храм скита завжди відчинений для тих, хто просить зцілення для себе та своїх близьких. У храмі зберігається частка мощей святителя Луки.
                </p>
            </div>
        ),
        contactInfo: {
            address: 'с. Жидичин',
            mapEmbedUrl: '<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2521.860856011235!2d25.309044393436352!3d50.7966872226544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTDCsDQ3JzQ4LjQiTiAyNcKwMTgnMzIuNCJF!5e0!3m2!1suk!2sua!4v1741781413138!5m2!1suk!2sua" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> ',
        }
    },
    {
        id: 'petro-pavlivsky',
        label: 'Петро-Павлівський скит', 
        description: 'Тут, під покровом апостолів, братія несе свій послух у смиренні та праці, прикрашаючи свої душі чеснотами.',
        image: '/media/hero-3.jpg',
        facebook: 'https://www.facebook.com/profile.php?id=100075686154395',
        galleryImages: ['/media/hero-3.jpg', '/media/hero-4.jpg', '/media/hero-1.jpg'],
        overviewContent: (
            <div className="space-y-4 font-sans leading-relaxed text-gray-700">
                <p>
                    Скит святих апостолів Петра і Павла є місцем особливої молитви за Церкву та її єдність.
                    Братія займається сільським господарством та пасікою.
                </p>
                 <p>
                    Особливістю скита є його мальовниче розташування на березі річки та давній сад.
                </p>
            </div>
        ),
        contactInfo: {
            address: 'Липляни, Волинська область, 45240',
            mapEmbedUrl: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1261.1379766194657!2d25.29667976652643!3d50.78899427078083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472597bd80d601b7%3A0xde0f9b72812828b9!2z0KHQutC40YIg0J_QtdGC0YDQsCDRliDQn9Cw0LLQu9Cw!5e0!3m2!1suk!2sua!4v1740836628193!5m2!1suk!2sua" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> ',
        }
    }
];

const TABS = [
    { id: 'overview', label: 'ОГЛЯД' },
    { id: 'gallery', label: 'ФОТОГАЛЕРЕЯ' },
    { id: 'contact', label: 'КОНТАКТИ' }
] as const;

type TabId = typeof TABS[number]['id'];

/* -------------------------------------------------------------------------- */
/*                                SUB COMPONENT                               */
/* -------------------------------------------------------------------------- */

const SketeSectionBlock = ({ skete, index }: { skete: SketeData, index: number }) => {
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
    const [isClosingModal, setIsClosingModal] = useState(false);
    
    // Gallery
    const [galleryIndex, setGalleryIndex] = useState(0);

    // Parallax & Visibility
    const { ref: entryRef, inView: isVisible } = useInView({ 
        threshold: 0.15, 
        triggerOnce: true,
        rootMargin: "-50px 0px" 
    });
    
    const imageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax Effect
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !imageRef.current || activeTab !== 'overview') return;
            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (rect.top < viewportHeight && rect.bottom > 0) {
                const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
                // Smoother, subtler parallax
                const shift = (scrollProgress - 0.5) * 50; 
                imageRef.current.style.transform = `scale(1.1) translateY(${shift}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeTab]);

    // Gallery Controls
    const nextImage = useCallback(() => {
        setGalleryIndex((prev) => (prev + 1) % skete.galleryImages.length);
    }, [skete]);

    const prevImage = useCallback(() => {
        setGalleryIndex((prev) => (prev - 1 + skete.galleryImages.length) % skete.galleryImages.length);
    }, [skete]);

    // Modal Control
    const closeModal = () => {
        setIsClosingModal(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosingModal(false);
        }, 300);
    };

    // Body Scroll Lock
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
            window.addEventListener('keydown', handleEsc);
            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleEsc);
            };
        }
    }, [isModalOpen]);

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
                "flex flex-col lg:flex-row min-h-[90vh] bg-white text-black mb-12 last:mb-0 pt-24 transition-all duration-1000 ease-in-out",
                // Animated Entrance: Fade In + Slide Up
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            
            {/* -------------------------------------------------------------------------- */
            /*                             CONTENT COLUMN (LEFT)                          */
            /* -------------------------------------------------------------------------- */
            }
            <div className={clsx(
                "px-8 md:px-16 lg:px-20 py-8 flex flex-col justify-center relative transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] order-2 lg:order-1",
                activeTab === 'overview' ? "w-full lg:w-1/2" : "w-full lg:w-full"
            )}>
                
                {/* Fixed Container for Tabs - Ensures stability */}
                <div className={clsx(
                    "w-full max-w-xl mx-auto transition-all duration-500",
                    activeTab === 'overview' ? "lg:mx-0" : "lg:mx-auto" 
                )}>
                    <div className={clsx(
                        "flex gap-8 mb-8 border-b border-gray-100 pb-4 transition-all duration-500",
                        "relative"
                    )}>
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
                                        : "text-gray-400 hover:text-gray-600 border-b-2 border-transparent"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>


                {/* CONTENT CONTAINER */}
                <div className="w-full relative min-h-[400px]">
                    
                    {/* --- OVERVIEW TAB (Includes Title) --- */}
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
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-amber-700 transition-colors w-fit"
                        >
                            <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-300 group-hover:border-amber-700 group-hover:bg-amber-700 group-hover:text-white">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                            Детальніше
                        </button>
                    </div>

                    {/* --- GALLERY TAB (Expanded) --- */}
                    <div className={clsx(
                         "transition-all duration-700 ease-in-out w-full border-t border-transparent", // Added border to prevent collapse issues
                         activeTab === 'gallery' 
                            ? "opacity-100 translate-y-0 relative z-10 delay-100" 
                            : "opacity-0 translate-y-20 absolute top-0 left-0 pointer-events-none z-0 scale-95"
                    )}>
                         {/* Back Button Removed for mobile/UX */}

                        <div className="w-full h-[40vh] md:h-[70vh] relative bg-gray-50 rounded-lg overflow-hidden group shadow-inner">
                             <Image 
                                src={skete.galleryImages[galleryIndex]} 
                                alt="Gallery" 
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain animate-in fade-in duration-500"
                                priority={false}
                                key={galleryIndex} // Re-animate on change
                            />
                            
                            {/* Dark Arrows */}
                            <button 
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-black shadow-lg rounded-full transition-all hover:scale-110 z-20"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button 
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-black shadow-lg rounded-full transition-all hover:scale-110 z-20"
                            >
                                <ChevronRight size={24} />
                            </button>

                             {/* Minimal Counter */}
                             
                        </div>
                    </div>

                    {/* --- CONTACTS TAB (Expanded) --- */}
                    <div className={clsx(
                         "transition-all duration-700 ease-in-out w-full",
                         activeTab === 'contact' 
                            ? "opacity-100 translate-y-0 relative z-10 delay-100" 
                            : "opacity-0 translate-y-20 absolute top-0 left-0 pointer-events-none z-0 scale-95"
                    )}>
                         {/* Back button removed */}

                         <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left bg-gray-50 p-8 md:p-12 rounded-xl border border-gray-100 shadow-sm">
                             <div className="space-y-8">
                                <h3 className="text-3xl font-montserrat font-bold mb-8 text-black">Контактні дані</h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-amber-600 shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Адреса</p>
                                            <p className="text-xl text-gray-800 leading-snug">{skete.contactInfo.address}</p>
                                        </div>
                                    </div>

                                    {skete.contactInfo.phone && (
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-amber-600 shrink-0">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Телефон</p>
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
                                                <span className="text-xs font-bold uppercase tracking-widest">Ми у Facebook</span>
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

            {/* -------------------------------------------------------------------------- */
            /*                             IMAGE COLUMN (RIGHT)                           */
            /* -------------------------------------------------------------------------- */
            }
            <div className={clsx(
                "transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] order-1 lg:order-2 relative bg-white overflow-hidden",
                activeTab === 'overview' 
                    ? "h-[50vh] lg:h-auto w-full lg:w-1/2 opacity-100 mb-8 lg:mb-0 lg:translate-x-0" 
                    : "h-0 lg:h-auto w-full lg:w-0 opacity-0 pointer-events-none mb-0 lg:mb-0 lg:translate-x-20"
            )}>
                 <div className="h-full min-h-[500px] w-full p-4 lg:p-12 relative">  
                     <div className="w-full h-full relative overflow-hidden shadow-2xl rounded-sm"> 
                        <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%] transition-transform duration-75 ease-out will-change-transform">
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
            </div>

            {/* -------------------------------------------------------------------------- */
            /*                                   MODAL                                    */
            /* -------------------------------------------------------------------------- */
            }
            {isModalOpen && mounted && createPortal(
                <div 
                    className={clsx(
                        "fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-all duration-500", 
                        isClosingModal ? "opacity-0" : "opacity-100 animate-in fade-in"
                    )}
                    style={{ 
                        margin: 0, 
                        top: 0, 
                        left: 0, 
                        width: '100vw', 
                        height: '100vh' 
                    }} 
                >
                    <div 
                        className="absolute inset-0 w-full h-full" 
                        onClick={closeModal} 
                    />
                    <div 
                        className={clsx(
                            "bg-white w-full max-w-lg relative shadow-2xl rounded max-h-[90vh] flex flex-col transition-all duration-500 transform z-50",
                            isClosingModal ? "scale-90 opacity-0 translate-y-8" : "scale-100 opacity-100 translate-y-0 animate-in slide-in-from-bottom-8 zoom-in-95"
                        )}
                    >
                        <button onClick={closeModal} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-20">
                            <X size={20} className="text-gray-500" />
                        </button>
                        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
                            <div className="flex items-center gap-2 mb-8 text-amber-600">
                                <Info className="w-5 h-5" />
                                <span className="text-xs font-bold uppercase tracking-widest">Історична довідка</span>
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8">{skete.label}</h3>
                            <div className="prose prose-sm text-gray-600 mb-10 font-serif leading-relaxed">
                                {skete.overviewContent}
                            </div>
                            <button onClick={closeModal} className="w-full py-3 bg-[#1a1c23] text-white text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors rounded-sm">
                                Закрити
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

        </div>
    );
};

export const SketeInfoSection = () => {
    return (
        <section className="relative w-full bg-white pb-24">
            <div className="flex flex-col gap-0"> 
                {sketes.map((skete, index) => (
                    <SketeSectionBlock key={skete.id} skete={skete} index={index} />
                ))}
            </div>
        </section>
    );
};
