import React from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { copyToClipboard } from './utils';

export const MapTab: React.FC = () => {
    const { language } = useLanguage();

    return (
        <div className="animate-in fade-in duration-500">
            <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
                <div className="h-[550px] bg-gray-50 overflow-hidden shadow-lg border border-gray-100 rounded-none">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2396.430767626645!2d25.3020407765785!3d50.80936887166296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472597c7c782c3dd%3A0x38994f41752c77fb!2z0JbQuNC00LjRh9C40L3RgdGM0LrQuNC5INCh0LLRj9GC0L4t0JzQuNC60L7Qu9Cw0ZfQstGB0YzQutC40Lkg0LzQvtC90LDRgdGC0LjRgCAo0J_QptCjKQ!5e1!3m2!1suk!2sua!4v1768489923329!5m2!1suk!2sua"
                        className="w-full h-full border-0"
                        allowFullScreen={true}
                        loading="lazy"
                    />
                </div>
                <div className="space-y-12">
                    <div>
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                            {language === 'UA' ? 'Адреса' : 'Address'}
                        </h4>
                        <p className="text-gray-900 font-bold text-lg leading-tight tracking-tight">
                            45240 Волинська область,<br />
                            Луцький р-н, с. Жидичин,<br />
                            вул. Ковельська, 1
                        </p>
                    </div>
                    <div className="pt-8 border-t border-gray-100">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                            GPS {language === 'UA' ? 'Координати' : 'Coordinates'}
                        </h4>
                        <div className="flex items-center gap-4">
                            <p className="text-sm text-gray-600 font-mono tracking-widest">
                                50.809369, 25.302041
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={async () => {
                                        const success = await copyToClipboard("50.809369, 25.302041");
                                        if (success) {
                                            alert(language === 'UA' ? 'Координати скопійовано' : 'Coordinates copied');
                                        }
                                    }}
                                    className="p-2 bg-gray-50 hover:bg-amber-50 rounded-lg text-gray-400 hover:text-amber-600 transition-colors"
                                    title={language === 'UA' ? 'Копіювати' : 'Copy'}
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                    </svg>
                                </button>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=50.809369,25.302041"
                                    target="_blank"
                                    className="p-2 bg-gray-50 hover:bg-amber-50 rounded-lg text-gray-400 hover:text-amber-600 transition-colors"
                                    title={language === 'UA' ? 'Маршрут' : 'Directions'}
                                >
                                    <Send className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
