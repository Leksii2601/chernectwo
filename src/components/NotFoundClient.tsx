'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFoundClient() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const fadeIn = "transition-opacity duration-1000 ease-in-out";

    return (
        <div className="min-h-screen bg-[#0c0c0c] text-stone-200 flex flex-col items-center justify-center relative overflow-hidden font-serif selection:bg-amber-900 selection:text-white">

            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/40 via-black to-black"></div>

            {/* Huge Background Text - AMEN */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 whitespace-nowrap opacity-5 select-none ${mounted ? 'opacity-10 scale-100' : 'opacity-0 scale-95'} transition-all duration-[2000ms]`}>
                <span className="text-[25vw] font-black tracking-widest text-[#2a2a2a] mix-blend-overlay font-cuprum">
                    AMEN
                </span>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl">
                <div className={`mb-8 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${fadeIn} delay-300`}>
                    <h1 className="text-6xl md:text-9xl font-bold tracking-[0.2em] text-amber-500/90 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] font-cuprum">
                        АМІНЬ
                    </h1>
                    <p className="text-xs uppercase tracking-[0.8em] text-stone-500 mt-2 ml-4 font-montserrat">
                        AMEN &bull; 404
                    </p>
                </div>

                <div className={`space-y-6 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${fadeIn} delay-700`}>
                    <p className="text-xl md:text-2xl font-light leading-relaxed text-stone-300 font-montserrat">
                        Тут слова замовкають, а шлях закінчується.
                        <br />
                        <span className="text-stone-500 text-base italic">
                            Here, words fall silent, and the path ends.
                        </span>
                    </p>

                    <div className="w-16 h-[1px] bg-amber-700/50 mx-auto my-6"></div>

                    <p className="text-stone-400 font-light text-sm max-w-md mx-auto font-montserrat">
                        Можливо, ви шукали те, чого тут немає, або цей шлях був прихований. Повертайтеся до світла.
                    </p>
                </div>

                <div className={`mt-12 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${fadeIn} delay-1000`}>
                    <Link
                        href="/"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-amber-800/50 rounded-full overflow-hidden transition-all hover:border-amber-600 hover:bg-amber-900/10 active:scale-95"
                    >
                        <div className="absolute inset-0 w-0 bg-amber-800/20 transition-all duration-[250ms] ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>

                        <ArrowLeft className="w-5 h-5 text-amber-500 transition-transform group-hover:-translate-x-1" />
                        <span className="relative font-bold text-amber-100 tracking-widest uppercase text-sm font-montserrat">
                            Повернутися / Return
                        </span>
                    </Link>
                </div>
            </div>

            {/* Footer minimal */}
            <div className="absolute bottom-8 text-stone-800 text-xs tracking-widest opacity-50 font-montserrat">
                ZHYDYCHYN MONASTERY
            </div>
        </div>
    );
}
