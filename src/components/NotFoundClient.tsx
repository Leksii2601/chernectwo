'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFoundClient() {
    const [mounted, setMounted] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        setMounted(true);
    }, []);

    const fadeIn = "transition-all duration-1000 ease-in-out";

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-stone-200 flex flex-col items-center justify-center relative overflow-hidden font-montserrat selection:bg-amber-900 selection:text-white">

            {/* Background Texture/Gradient - More subtle */}
            <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/40 via-black to-black"></div>

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl">
                <div className={`mb-12 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${fadeIn} delay-300`}>
                    <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter text-white/5 leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">
                        404
                    </h1>
                    <h2 className="text-7xl md:text-9xl font-black tracking-[0.2em] text-amber-600 uppercase">
                        {t('404.title')}
                    </h2>
                    <p className="text-stone-500 text-xs md:text-sm uppercase tracking-[0.6em] mt-4 font-medium">
                        {t('404.subtitle')}
                    </p>
                </div>

                <div className={`space-y-8 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${fadeIn} delay-700`}>
                    <p
                        className="text-xl md:text-2xl font-medium leading-relaxed text-stone-300"
                        dangerouslySetInnerHTML={{ __html: t('404.description') }}
                    />

                    <p className="text-stone-500 font-normal text-sm max-w-sm mx-auto uppercase tracking-widest leading-loose">
                        {t('404.hint')}
                    </p>
                </div>

                <div className={`mt-16 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${fadeIn} delay-1000`}>
                    <Link
                        href="/"
                        className="group relative inline-flex items-center gap-4 px-10 py-4 bg-white text-black rounded-full overflow-hidden transition-all hover:bg-amber-600 hover:text-white active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.05)] hover:shadow-[0_0_50px_rgba(210,174,109,0.3)]"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span className="font-bold tracking-[0.2em] uppercase text-xs">
                            {t('404.button')}
                        </span>
                    </Link>
                </div>
            </div>

            {/* Footer minimal */}
            <div className="absolute bottom-12 text-stone-700 text-[10px] sm:text-xs tracking-[0.4em] font-medium uppercase transition-opacity duration-1000 delay-[1500ms]">
                {t('404.footer')}
            </div>
        </div>
    );
}
