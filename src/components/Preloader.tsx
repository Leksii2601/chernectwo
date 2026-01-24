'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            // Start fade out
            setIsLoading(false);
            // Remove from DOM after transition
            setTimeout(() => setIsVisible(false), 700); 
        };

        if (document.readyState === 'complete') {
            setTimeout(handleLoad, 800);
        } else {
            window.addEventListener('load', () => setTimeout(handleLoad, 800));
            const timeout = setTimeout(handleLoad, 3000); 
            return () => {
                window.removeEventListener('load', handleLoad);
                clearTimeout(timeout);
            }
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div className={clsx(
            "fixed inset-0 z-[9999] flex items-center justify-center bg-stone-50 transition-all duration-700 ease-in-out",
            isLoading ? "opacity-100" : "opacity-0 pointer-events-none scale-105"
        )}>
            <div className="relative flex items-center justify-center">
                {/* Decorative Spinning Ring */}
                <div className="absolute w-32 h-32 md:w-40 md:h-40 border-[3px] border-stone-200 border-t-amber-600/80 rounded-full animate-spin"></div>
                
                {/* Inner Ring (Static or Counter-spin) */}
                <div className="absolute w-28 h-28 md:w-36 md:h-36 border border-stone-100 rounded-full"></div>

                {/* Logo */}
                <div className="w-16 h-16 md:w-20 md:h-20 relative animate-pulse">
                     <Image 
                        src="/media/logo.webp" 
                        alt="Loading..." 
                        fill
                        className="object-contain" 
                        priority
                     />
                </div>
            </div>
        </div>
    );
};
