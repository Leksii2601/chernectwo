'use client';

import React from 'react';
import { X, Info } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/context/LanguageContext';

interface StandardModalProps {
    isOpen: boolean;
    isClosing: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const StandardModal = ({
    isOpen,
    isClosing,
    onClose,
    title,
    children
}: StandardModalProps) => {
    const { t } = useLanguage();

    if (!isOpen && !isClosing) return null;

    return createPortal(
        <div className={`
            fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-opacity duration-300
            ${isClosing ? 'opacity-0' : 'opacity-100 animate-in fade-in'}
        `}>
            <div className="absolute inset-0" onClick={onClose} /> {/* Click outside to close */}

            <div className={`
                bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col transition-all duration-300
                ${isClosing ? 'scale-95 opacity-0 translate-y-4' : 'scale-100 opacity-100 translate-y-0 animate-in zoom-in-95 slide-in-from-bottom-4'}
            `}>

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-20"
                >
                    <X className="w-6 h-6 text-gray-800" />
                </button>

                <div className="w-full p-8 md:p-12 bg-white overflow-y-auto custom-scrollbar font-montserrat">
                    <div className="flex items-center gap-2 mb-6">
                        <Info className="w-5 h-5 text-orange-600" />
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-500">{t('complex.detailed_info')}</span>
                    </div>

                    <h3 className="text-3xl font-bold font-montserrat text-gray-900 mb-6 uppercase">{title}</h3>

                    <div className="prose prose-orange text-gray-600 leading-relaxed mb-8 whitespace-pre-wrap">
                        {children}
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-gray-900 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-bold uppercase tracking-wider"
                    >
                        {t('generic.close')}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};
