'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Plus, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ServiceType {
    id: string;
    nameKey: string;
}

export type CurrencyType = 'UAH' | 'EUR' | 'USD';

interface PrayerFormProps {
    noteType: 'health' | 'repose';
    setNoteType: (type: 'health' | 'repose') => void;
    services: ServiceType[];
    selectedService: ServiceType;
    setSelectedService: (service: ServiceType) => void;
    currentName: string;
    setCurrentName: (name: string) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onAddName: () => void;
    namesLength: number;
    maxNames: number;
    showError: boolean;
    showNoNamesError: boolean;
    userEmail: string;
    setUserEmail: (email: string) => void;
    showEmailError: boolean;
    setShowEmailError: (show: boolean) => void;
    donationAmount: string;
    setDonationAmount: (val: string) => void;
    selectedCurrency: CurrencyType;
    setSelectedCurrency: (currency: CurrencyType) => void;
    showMinAmountError?: boolean;
    agreedToTerms: boolean;
    setAgreedToTerms: (val: boolean) => void;
    children?: React.ReactNode; // For mobile note insertion
    onSubmit: () => void;
    isSubmitting: boolean;
}

export const PrayerForm: React.FC<PrayerFormProps> = ({
    noteType,
    setNoteType,
    services,
    selectedService,
    setSelectedService,
    currentName,
    onInputChange,
    onKeyDown,
    onAddName,
    namesLength,
    maxNames,
    showError,
    showNoNamesError,
    userEmail,
    setUserEmail,
    showEmailError,
    setShowEmailError,
    donationAmount,
    setDonationAmount,
    selectedCurrency,
    setSelectedCurrency,
    showMinAmountError,
    agreedToTerms,
    setAgreedToTerms,
    children,
    onSubmit,
    isSubmitting
}) => {
    const { t, language } = useLanguage();
    const HEALTH_RED = "#E31B1B";
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const minAmount = selectedCurrency === 'UAH' ? 100 : 5;
    const currencySymbol = selectedCurrency === 'UAH' ? '₴' : selectedCurrency === 'EUR' ? '€' : '$';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currencies: { id: CurrencyType; label: string }[] = [
        { id: 'UAH', label: 'UAH' },
        { id: 'EUR', label: 'EUR' },
        { id: 'USD', label: 'USD' },
    ];

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDonationAmount(val);
    };

    const handleAmountBlur = () => {
        if (donationAmount && Number(donationAmount) < minAmount) {
            setDonationAmount(minAmount.toString());
        }
    };

    return (
        <div className="space-y-8">
            <style jsx global>{`
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
            `}</style>
            <div className="space-y-6">
                <p className="text-gray-500 font-light italic leading-relaxed text-sm md:text-base border-l-2 pl-4 py-1 hidden sm:block" style={{ borderColor: '#d2ae6d' }}>
                    {t('prayer.visit_message')}
                </p>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-900 uppercase tracking-widest">
                        {t('prayer.service_type')}
                        <div className="h-[1px] flex-1 bg-gray-100 hidden sm:block"></div>
                    </div>
                    <div className="bg-gray-50/50 p-1 rounded-xl flex gap-1 border border-gray-100">
                        <button
                            onClick={() => setNoteType('health')}
                            className="flex-1 py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all duration-500"
                            style={{
                                backgroundColor: noteType === 'health' ? HEALTH_RED : 'transparent',
                                color: noteType === 'health' ? 'white' : '#9CA3AF',
                                boxShadow: noteType === 'health' ? '0 4px 12px rgba(227, 27, 27, 0.2)' : 'none'
                            }}
                        >
                            {t('prayer.health')}
                        </button>
                        <button
                            onClick={() => setNoteType('repose')}
                            className="flex-1 py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all duration-500"
                            style={{
                                backgroundColor: noteType === 'repose' ? 'black' : 'transparent',
                                color: noteType === 'repose' ? 'white' : '#9CA3AF',
                                boxShadow: noteType === 'repose' ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none'
                            }}
                        >
                            {t('prayer.repose')}
                        </button>
                    </div>

                    <div className="space-y-4 mt-8">
                        <div className="flex items-center gap-3 text-sm font-bold text-gray-900 uppercase tracking-widest">
                            {t('prayer.term_label')}
                            <div className="h-[1px] flex-1 bg-gray-100 hidden sm:block"></div>
                        </div>
                        <div className="bg-gray-50/50 p-1 rounded-xl flex gap-1 border border-gray-100">
                            {services.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setSelectedService(s)}
                                    className="flex-1 py-3 px-2 sm:px-4 rounded-lg font-bold uppercase text-[9px] sm:text-[10px] tracking-widest transition-all duration-500 flex items-center justify-center text-center"
                                    style={{
                                        backgroundColor: selectedService.id === s.id ? '#d2ae6d' : 'transparent', // Amber-600
                                        color: selectedService.id === s.id ? 'white' : '#9CA3AF',
                                        boxShadow: selectedService.id === s.id ? '0 4px 12px rgba(217, 119, 6, 0.2)' : 'none'
                                    }}
                                >
                                    {t(s.nameKey)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Note Insert */}
                <div className="block lg:hidden mt-8">
                    {children}
                </div>

                <div className="space-y-3 pt-2 hidden sm:block">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">{t('prayer.names_label')}</span>
                        <span className={`text-[10px] font-bold tracking-widest ${namesLength >= maxNames ? 'text-red-500' : 'text-amber-600'}`}>
                            {namesLength} / {maxNames}
                        </span>
                    </div>
                    <div className="relative group flex items-stretch">
                        <input
                            type="text"
                            value={currentName}
                            onChange={onInputChange}
                            onKeyDown={onKeyDown}
                            disabled={namesLength >= maxNames}
                            placeholder={t('prayer.names_placeholder')}
                            className={`w-full bg-white border ${showError || showNoNamesError ? 'border-red-400' : 'border-gray-100'} p-4 rounded-xl text-base font-medium outline-none focus:border-amber-600/30 transition-all shadow-sm placeholder:text-gray-300 disabled:bg-gray-50 pr-16`}
                        />
                        <button
                            onClick={onAddName}
                            disabled={!currentName.trim() || namesLength >= maxNames}
                            className="absolute right-0 top-0 bottom-0 bg-black text-white px-5 rounded-r-xl hover:bg-amber-600 disabled:bg-gray-100 disabled:text-gray-300 transition-all active:scale-95 z-10"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    {showError && <p className="text-[10px] font-bold text-red-500 animate-pulse">{t('prayer.error_invalid_char')}</p>}
                    {showNoNamesError && <p className="text-[10px] font-bold text-red-500 animate-pulse">{t('prayer.error_no_names')}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-3">
                        <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">{t('prayer.email_label')}</span>
                        <input
                            id="user-email"
                            type="email"
                            value={userEmail}
                            onChange={(e) => {
                                setUserEmail(e.target.value);
                                if (e.target.value.includes('@')) setShowEmailError(false);
                            }}
                            placeholder="email@example.com"
                            className={`w-full bg-white border ${showEmailError ? 'border-red-400' : 'border-gray-100'} p-4 rounded-xl text-base font-medium outline-none focus:border-amber-600/30 transition-all shadow-sm`}
                        />
                        {showEmailError && <p className="text-[10px] font-bold text-red-500 animate-pulse">{t('prayer.error_invalid_email')}</p>}
                    </div>

                    <div className="space-y-3">
                        <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">{t('prayer.donation_amount')}</span>

                        {/* Unified Input and Dropdown */}
                        <div className={`
                            flex items-center bg-white border rounded-xl shadow-sm transition-all duration-300 group
                            ${showMinAmountError ? 'border-red-400' : 'border-gray-100 focus-within:border-amber-600/30'}
                        `}>
                            <div className="flex-1 relative pl-10">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm pointer-events-none transition-colors group-focus-within:text-amber-600">
                                    {currencySymbol}
                                </span>
                                <input
                                    type="number"
                                    min={minAmount}
                                    value={donationAmount}
                                    onChange={handleAmountChange}
                                    onBlur={handleAmountBlur}
                                    placeholder={minAmount.toString()}
                                    className="w-full py-4 bg-transparent text-base font-medium outline-none placeholder:text-gray-300"
                                />
                            </div>

                            <div className="h-8 w-[1px] bg-gray-100" />

                            <div className="relative min-w-[90px]" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full px-4 py-4 text-[10px] font-bold uppercase tracking-widest outline-none transition-all flex items-center justify-between hover:text-amber-600 text-gray-500"
                                >
                                    {selectedCurrency}
                                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-[200] py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        {currencies.map((curr) => (
                                            <button
                                                key={curr.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCurrency(curr.id);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-between
                                                    ${selectedCurrency === curr.id ? 'bg-amber-50 text-amber-600' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`}
                                            >
                                                {curr.label}
                                                {selectedCurrency === curr.id && <Check className="w-3 h-3" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {showMinAmountError && (
                            <p className="text-[10px] font-bold text-red-500 animate-pulse">
                                {t('prayer.error_min_amount')} {minAmount} {selectedCurrency === 'UAH' ? '₴' : selectedCurrency}
                            </p>
                        )}
                    </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 pt-4 group">
                    <div
                        onClick={() => setAgreedToTerms(!agreedToTerms)}
                        className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all cursor-pointer ${agreedToTerms ? 'bg-amber-600 border-amber-600' : 'bg-white border-gray-300 group-hover:border-amber-500'}`}
                    >
                        {agreedToTerms && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-relaxed select-none">
                        {language === 'UA' ? (
                            <>
                                Я погоджуюсь із{' '}
                                <Link href={`/${language.toLowerCase()}/legal`} className="text-amber-600 hover:text-amber-700 underline">
                                    правилами та умовами надання послуг
                                </Link>
                                {' '}і даю згоду на обробку{' '}
                                <Link href={`/${language.toLowerCase()}/legal`} className="text-amber-600 hover:text-amber-700 underline">
                                    персональних даних
                                </Link>
                            </>
                        ) : (
                            <>
                                I agree to the{' '}
                                <Link href={`/${language.toLowerCase()}/legal`} className="text-amber-600 hover:text-amber-700 underline">
                                    terms and conditions
                                </Link>
                                {' '}and consent to the processing of{' '}
                                <Link href={`/${language.toLowerCase()}/legal`} className="text-amber-600 hover:text-amber-700 underline">
                                    personal data
                                </Link>
                            </>
                        )}
                    </p>
                </div>

                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 flex flex-col items-center gap-2 text-center mt-4">
                    <span className="text-amber-700 text-[10px] font-bold uppercase tracking-wider opacity-60">{t('prayer.total_amount')}</span>
                    <p className="text-amber-900 text-[11px] font-bold uppercase tracking-widest px-4">
                        {t('prayer.donation_message')}
                    </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        onClick={onSubmit}
                        disabled={namesLength === 0 || isSubmitting || !agreedToTerms}
                        className="w-full bg-black text-white h-12 lg:h-14 rounded-xl font-bold text-[10px] lg:text-xs uppercase tracking-[0.4em] hover:bg-amber-600 disabled:bg-gray-100 disabled:text-gray-300 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                {t('prayer.processing')}
                            </>
                        ) : (t('prayer.submit'))}
                    </button>
                </div>
            </div>
        </div>
    );
};
