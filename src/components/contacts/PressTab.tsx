import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { PressItem } from './types';

interface PressTabProps {
    pressItems: PressItem[];
    onSelectItem: (item: PressItem) => void;
}

export const PressTab: React.FC<PressTabProps> = ({ pressItems, onSelectItem }) => {
    const { language } = useLanguage();

    return (
        <div className="animate-in fade-in duration-500 space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                {pressItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onSelectItem(item)}
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
    );
};
