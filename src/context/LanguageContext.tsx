'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { translations, Language } from '@/data/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export { translations };

export function LanguageProvider({ children, initialLocale }: { children: React.ReactNode, initialLocale?: string }) {
    const [language, setLanguageState] = useState<Language>((initialLocale?.toUpperCase() as Language) || 'UA');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (initialLocale) {
            setLanguageState(initialLocale.toUpperCase() as Language);
        }
    }, [initialLocale]);

    const setLanguage = (newLang: Language) => {
        setLanguageState(newLang);

        if (!pathname) return;
        const segments = pathname.split('/');
        segments[1] = newLang.toLowerCase();
        router.push(segments.join('/'));
    };

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
