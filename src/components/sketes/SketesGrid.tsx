'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/context/LanguageContext';

// Data moved inside component

export const SketesGrid = () => {
    const { t } = useLanguage();

    const sketes = [

        {
            id: 3,
            title: t('sketes.petro_pavlo'),
            description: t('sketes.petro_pavlo_short_desc'),
            image: '/media/sketes/petropavlivskyiskut/hero.avif',
            link: '#petro-pavlivsky'
        },
        {
            id: 2,
            title: t('sketes.holy_spirit'),
            description: t('sketes.holy_spirit_short_desc'),
            image: '/media/sketes/sviatodukhivskyiskut/hero.avif',
            link: '#holy-spirit'
        },
        {
            id: 1,
            title: t('sketes.life_source'),
            description: t('sketes.life_source_short_desc'),
            image: '/media/sketes/skytzhyvonosnedzherelo/zhyvonosne_2.avif',
            link: '#life-bearing'
        },
    ];

    return (
        <div className="w-full relative">
            {/* Desktop Version (Stays as is) */}
            <div className="hidden lg:block lg:h-[250vh] relative">
                <div className="lg:sticky lg:top-0 w-full lg:h-screen">
                    <div className="grid grid-cols-3 w-full h-full">
                        {sketes.map((skete) => (
                            <SketeItem key={skete.id} skete={skete} isMobile={false} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet Version (Sticky Stack) */}
            <div className="block lg:hidden">
                {sketes.map((skete, idx) => (
                    <div
                        key={skete.id}
                        className="sticky top-0 h-screen w-full overflow-hidden"
                        style={{ zIndex: idx + 1 }}
                    >
                        <SketeItem skete={skete} isMobile={true} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const SketeItem = ({ skete, isMobile }: { skete: any, isMobile: boolean }) => {
    const { t } = useLanguage();
    const { ref, inView } = useInView({
        threshold: 0.6,
        triggerOnce: false
    });

    return (
        <div
            ref={ref}
            className={clsx(
                "relative h-screen w-full overflow-hidden group",
                !isMobile && "border-r border-white/10 last:border-r-0"
            )}
        >
            {/* Background Image */}
            <div
                className={clsx(
                    "absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110",
                    isMobile && inView && "scale-110"
                )}
                style={{ backgroundImage: `url(${skete.image})` }}
            />

            {/* Overlay */}
            <div className={clsx(
                "absolute inset-0 transition-colors duration-500",
                isMobile
                    ? (inView ? "bg-black/60" : "bg-black/30")
                    : "bg-black/30 group-hover:bg-black/60"
            )} />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white z-20 items-center text-center">
                {/* Title Wrapper - Moves Up */}
                <div className={clsx(
                    "transform transition-all duration-700 ease-in-out",
                    isMobile
                        ? (inView ? "-translate-y-16" : "translate-y-0")
                        : "group-hover:-translate-y-16"
                )}>
                    <h3 className={clsx(
                        "text-3xl lg:text-3xl uppercase tracking-[0.2em] font-montserrat mb-2 relative after:content-[''] after:block after:h-0.5 after:mx-auto after:mt-4 after:transition-all after:duration-500",
                        isMobile
                            ? (inView ? "after:w-24 after:bg-amber-500" : "after:w-10 after:bg-white/60")
                            : "after:w-10 after:bg-white/60 group-hover:after:w-24 group-hover:after:bg-amber-500"
                    )}>
                        {skete.title}
                    </h3>
                </div>

                {/* Description & Button - Fades in and slides up just below title */}
                <div className={clsx(
                    "absolute top-1/2 left-0 w-full p-8 pt-20 transition-all duration-700 ease-in-out flex flex-col gap-6 items-center",
                    isMobile
                        ? (inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")
                        : "opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0"
                )}>
                    <p className="text-gray-100 text-sm leading-relaxed font-sans max-w-sm">
                        {skete.description}
                    </p>

                    <Link href={skete.link} className="inline-flex items-center gap-4 group/btn w-fit">
                        {/* Button Circle */}
                        <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center transition-all duration-300 group-hover/btn:bg-white group-hover/btn:border-transparent">
                            <ArrowRight className="w-5 h-5 text-white transition-colors duration-300 group-hover/btn:text-black" />
                        </div>
                        {/* Button Text */}
                        <span className="uppercase tracking-widest text-sm font-bold transition-transform duration-300 group-hover/btn:translate-x-2">
                            {t('skete.details')}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
