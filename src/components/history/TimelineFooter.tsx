
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const TimelineFooter = () => {
    const { t } = useLanguage();

    return (
        <div className="relative w-full flex flex-col items-center justify-end pt-12 pb-[4rem] lg:pb-4 min-h-[50vh] z-20 overflow-visible">

            {/* Creative Animation Node - Absolute at the end of the line */}
            {/* Matches TimelineTrack bottom-[10rem] / bottom-[10rem] */}
            <div className="absolute left-4 lg:left-1/2 bottom-[10rem] lg:bottom-[10rem] -translate-x-[120%] lg:-translate-x-1/2 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute w-[16vw] h-[16vw] lg:w-[8vw] lg:h-[8vw] rounded-full border border-amber-600/30 animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute w-[16vw] h-[16vw] lg:w-[8vw] lg:h-[8vw] rounded-full border-t border-b border-amber-600/60 animate-[spin_5s_linear_infinite_reverse]"></div>

                {/* Pulse Waves - Transitions from center, slower than markers */}
                <div className="absolute w-[8vw] h-[8vw] lg:w-[4vw] lg:h-[4vw] bg-amber-600/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <div className="absolute w-[8vw] h-[8vw] lg:w-[4vw] lg:h-[4vw] bg-amber-500/30 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] [animation-delay:2.5s]"></div>

                {/* Core */}
                <div className="relative w-[6vw] h-[6vw] lg:w-[3vw] lg:h-[3vw] bg-amber-600 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.8)] flex items-center justify-center z-10">
                    <div className="w-[3vw] h-[3vw] lg:w-[1.5vw] lg:h-[1.5vw] bg-white rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Text - Moved Below the Circle */}
            <div className="relative z-10 text-center">
                <span className="block text-[6vw] lg:text-[2.5vw] font-church font-bold text-amber-800 tracking-[0.2em] uppercase animate-pulse drop-shadow-md">
                    {t('footer.rebirth')}
                </span>
                <span className="block text-[3vw] lg:text-[1vw] text-amber-600/80 uppercase tracking-[0.5em] mt-[1vw]">
                    {t('footer.join')}
                </span>
            </div>
        </div>
    );
};
