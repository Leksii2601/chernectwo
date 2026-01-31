'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Data moved inside component

export const SketesGrid = () => {
    const { t } = useLanguage();

    const sketes = [
        {
            id: 1,
            title: t('sketes.holy_spirit'),
            description: t('sketes.holy_spirit_short_desc'),
            image: '/media/sketes/image.png',
            link: '#holy-spirit'
        },
        {
            id: 2,
            title: t('sketes.life_source'),
            description: t('sketes.life_source_short_desc'),
            image: '/media/hero-2.png',
            link: '#life-bearing'
        },
        {
            id: 3,
            title: t('sketes.petro_pavlo'),
            description: t('sketes.petro_pavlo_short_desc'),
            image: '/media/hero-3.jpg',
            link: '#petro-pavlivsky'
        }
    ];

    return (
        <div className="w-full relative lg:h-[250vh] h-auto">
            <div className="lg:sticky lg:top-0 w-full h-auto lg:h-screen">
                <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full">
                    {sketes.map((skete) => (
                        <div
                            key={skete.id}
                            className="relative h-screen w-full overflow-hidden group border-r border-white/10 last:border-r-0"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                                style={{ backgroundImage: `url(${skete.image})` }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/60" />

                            {/* Content Container */}
                            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white z-20 items-center text-center">
                                {/* Title Wrapper - Moves Up */}
                                <div className="transform transition-transform duration-500 ease-in-out group-hover:-translate-y-16">
                                    <h3 className="text-3xl uppercase tracking-[0.2em] font-montserrat mb-2 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-white/60 after:mx-auto after:mt-4 after:transition-all after:duration-500 group-hover:after:w-24 group-hover:after:bg-amber-500">
                                        {skete.title}
                                    </h3>
                                </div>

                                {/* Description & Button - Fades in and slides up just below title */}
                                <div className="absolute top-1/2 left-0 w-full p-8 pt-20 opacity-0 translate-y-8 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 flex flex-col gap-6 items-center">

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
                    ))}
                </div>
            </div>
        </div>
    );
};
