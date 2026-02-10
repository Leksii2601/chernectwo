import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { clsx } from 'clsx';
import { PressItem } from './types';
import { copyToClipboard } from './utils';

interface PressModalContentProps {
    item: PressItem;
    copiedIndex: number | null;
    onCopy: (text: string, index: number) => void;
    setFullscreenImage: (key: string | null) => void;
}

export const PressModalContent: React.FC<PressModalContentProps> = ({
    item,
    copiedIndex,
    onCopy,
    setFullscreenImage
}) => {
    const { language } = useLanguage();
    const [copiedColorId, setCopiedColorId] = useState<string | null>(null);

    const mainHeaders = [
        'ВАРІАНТИ НАЗВИ:', 'ФОРМИ ЗВЕРНЕННЯ:',
        'FORMS OF ADDRESS:', 'NAME VARIANTS:'
    ];

    const headerTerms = [
        'Звернення', 'Назва', 'Скорочена назва:', 'Юридична назва:', ...mainHeaders
    ];

    return (
        <div className="space-y-12">
            <div className="space-y-6">
                <h4 className="text-xs font-bold text-amber-600 uppercase tracking-[0.3em] leading-none">
                    {language === 'UA' ? 'Настанова' : 'Guideline'}
                </h4>
                <p className="text-gray-600 leading-relaxed text-lg md:text-xl font-medium">
                    {language === 'UA' ? item.description_ua : item.description_en}
                </p>
            </div>

            {item.id !== 'brandbook' && (language === 'UA' ? item.details_ua : item.details_en).length > 0 && (
                <div className="space-y-8">
                    <h4 className="text-xs font-bold text-amber-600 uppercase tracking-[0.3em] leading-none">
                        {language === 'UA' ? 'ДЕТАЛІ ТА ВИМОГИ:' : 'DETAILS & REQUIREMENTS:'}
                    </h4>
                    <div className="space-y-4">
                        {(language === 'UA' ? item.details_ua : item.details_en).map((detail, idx) => {
                            if (!detail) return <div key={idx} className="h-2" />;

                            const isHeader = headerTerms.some(term => detail.startsWith(term) && detail.length < 30);

                            return (
                                <div key={idx} className="group flex flex-col gap-2">
                                    {isHeader ? (
                                        <span className={clsx(
                                            "font-bold uppercase tracking-widest mt-4 first:mt-0",
                                            mainHeaders.includes(detail)
                                                ? "text-xs md:text-sm text-black font-bold"
                                                : "text-[10px] text-gray-400 font-bold"
                                        )}>
                                            {detail}
                                        </span>
                                    ) : (
                                        <div className="flex items-center justify-between gap-4 p-3 md:p-4 bg-gray-50 rounded-2xl hover:bg-amber-50 transition-all duration-300">
                                            <span className="text-gray-900 font-bold text-sm md:text-base leading-snug">
                                                {detail}
                                            </span>
                                            <button
                                                onClick={() => onCopy(detail, idx)}
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
            )}

            {item.id === 'brandbook' && (
                <div className="space-y-16">
                    {/* Logos Section */}
                    <div className="space-y-8 mt-12 border-t border-gray-100 pt-8">
                        <h4 className="text-xs font-bold text-amber-600 uppercase tracking-[0.3em] leading-none mb-6">
                            {language === 'UA' ? 'Логотипи' : 'Logos'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name_ua: 'Чорний', name_en: 'Black', key: 'black_logo', bg: 'bg-white', border: 'border-gray-100' },
                                { name_ua: 'Золотий', name_en: 'Gold', key: 'golden_logo', bg: 'bg-white', border: 'border-gray-100' },
                                { name_ua: 'Білий', name_en: 'White', key: 'white_logo', bg: 'bg-neutral-900', border: 'border-neutral-800' },
                                { name_ua: 'Золотий з білим', name_en: 'Gold & White', key: 'gold_and_white_logo', bg: 'bg-neutral-900', border: 'border-neutral-800' }
                            ].map((logo) => (
                                <div key={logo.key} className={`rounded-xl overflow-hidden border ${logo.border} group transition-all duration-300 hover:shadow-lg`}>
                                    <div
                                        className={`${logo.bg} h-48 flex items-center justify-center p-8 relative cursor-zoom-in group/logo`}
                                        onClick={() => setFullscreenImage(logo.key)}
                                    >
                                        <Image
                                            src={`/media/logos/${logo.key}.avif`}
                                            alt={logo.name_en}
                                            width={200}
                                            height={200}
                                            className="w-auto h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="bg-gray-50 p-4 border-t border-gray-100">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                                {language === 'UA' ? logo.name_ua : logo.name_en}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            {['svg', 'png', 'jpg'].map((ext) => (
                                                <a
                                                    key={ext}
                                                    href={`/media/logos/${logo.key}.${ext}`}
                                                    download
                                                    className="flex-1 text-center py-2 text-[10px] font-bold uppercase tracking-wider border border-gray-200 bg-white rounded-lg hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300"
                                                >
                                                    {ext}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Typography Section */}
                    <div className="mt-16 border-t border-gray-100 pt-8">
                        <h4 className="text-xs font-bold text-amber-600 uppercase tracking-[0.3em] leading-none mb-6">
                            {language === 'UA' ? 'Шрифти' : 'Typography'}
                        </h4>
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-all duration-300">
                            <div>
                                <h5 className="text-2xl md:text-3xl font-serif text-gray-900 mb-2">
                                    Narbut Classic
                                </h5>
                                <p className="text-sm text-gray-500 font-medium">
                                    {language === 'UA' ? 'Основний акцентний шрифт' : 'Primary Display Font'}
                                </p>
                            </div>
                            <a
                                href="/fonts/Narbut_Classic.ttf"
                                download
                                className="px-8 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-amber-600 transition-colors shrink-0"
                            >
                                {language === 'UA' ? 'Завантажити шрифт' : 'Download Font'}
                            </a>
                        </div>
                    </div>

                    {/* Colors Section */}
                    <div className="mt-16 border-t border-gray-100 pt-8">
                        <h4 className="text-xs font-bold text-amber-600 uppercase tracking-[0.3em] leading-none mb-6">
                            {language === 'UA' ? 'Кольори' : 'Colors'}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                {
                                    name_ua: 'Золотий', name_en: 'Gold', hex: '#d2ae6d',
                                    rgb: '210, 174, 109', cmyk: '0, 17, 48, 18',
                                    text: 'text-white'
                                },
                                {
                                    name_ua: 'Білий', name_en: 'White', hex: '#ffffff',
                                    rgb: '255, 255, 255', cmyk: '0, 0, 0, 0',
                                    text: 'text-gray-900', border: 'border border-gray-200'
                                },
                                {
                                    name_ua: 'Чорний', name_en: 'Black', hex: '#000000',
                                    rgb: '0, 0, 0', cmyk: '0, 0, 0, 100',
                                    text: 'text-white'
                                }
                            ].map((color) => (
                                <div
                                    key={color.hex}
                                    className={`group relative rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:shadow-2xl ${color.border || ''}`}
                                    style={{ backgroundColor: color.hex }}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className={`font-black text-2xl uppercase tracking-widest ${color.text}`}>
                                            {language === 'UA' ? color.name_ua : color.name_en}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            { label: 'HEX', value: color.hex },
                                            { label: 'RGB', value: color.rgb },
                                            { label: 'CMYK', value: color.cmyk }
                                        ].map((format) => {
                                            const colorId = `${color.hex}-${format.label}`;
                                            const isCopied = copiedColorId === colorId;

                                            return (
                                                <button
                                                    key={format.label}
                                                    onClick={async () => {
                                                        const success = await copyToClipboard(format.value);
                                                        if (success) {
                                                            setCopiedColorId(colorId);
                                                            setTimeout(() => setCopiedColorId(null), 2000);
                                                        }
                                                    }}
                                                    className={`w-full flex items-center justify-between p-3 rounded-xl border border-current/10 hover:border-current/30 hover:bg-white/10 transition-all ${color.text}`}
                                                >
                                                    <span className="text-[10px] font-bold opacity-60">{format.label}</span>
                                                    <span className="text-xs font-mono font-medium">{format.value}</span>
                                                    {isCopied ? (
                                                        <Check className="w-3 h-3 text-green-400 animate-in zoom-in duration-300" />
                                                    ) : (
                                                        <Copy className="w-3 h-3 opacity-40" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
