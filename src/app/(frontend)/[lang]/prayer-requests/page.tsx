'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';

import { X, Plus, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type ServiceType = {
    id: string;
    nameKey: string;
    price: number;
};

const SERVICES: ServiceType[] = [
    { id: 'simple', nameKey: 'prayer.simple', price: 10 },
    { id: 'sorokoust', nameKey: 'prayer.sorokoust', price: 200 },
    { id: 'year', nameKey: 'prayer.year', price: 2000 },
];

export default function PrayerNotePage() {
    const { t } = useLanguage();
    const [noteType, setNoteType] = useState<'health' | 'repose'>('health');
    const [names, setNames] = useState<string[]>([]);
    const [currentName, setCurrentName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceType>(SERVICES[0]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showError, setShowError] = useState(false);
    const [showNoNamesError, setShowNoNamesError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const noteRef = useRef<HTMLDivElement>(null);

    // Basket for multiple notes
    const [basket, setBasket] = useState<{
        id: string;
        names: string[];
        type: 'health' | 'repose';
        service: ServiceType;
        amount: number;
    }[]>([]);

    const NAMES_PER_NOTE = 10;
    const MAX_TOTAL_NAMES = 100;

    const formatName = (name: string) => {
        const trimmed = name.trim();
        if (!trimmed) return '';
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const isValid = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s'-]*$/.test(val);

        if (isValid) {
            setCurrentName(val);
            setShowError(false);
        } else {
            setShowError(true);
        }
    };

    const addName = () => {
        const formatted = formatName(currentName);

        if (formatted && names.length < MAX_TOTAL_NAMES) {
            setNames([...names, formatted]);
            setCurrentName('');
            setShowError(false);
            setShowNoNamesError(false);
            const newTotal = names.length + 1;
            const newTotalPages = Math.ceil(newTotal / NAMES_PER_NOTE);
            setCurrentPage(newTotalPages - 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addName();
        }
    };

    const removeName = (index: number) => {
        const newNames = names.filter((_, i) => i !== index);
        setNames(newNames);
        const newTotalPages = Math.ceil(newNames.length / NAMES_PER_NOTE);
        if (currentPage >= newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages - 1);
        } else if (newTotalPages === 0) {
            setCurrentPage(0);
        }
    };

    const addNoteToBasket = () => {
        if (names.length === 0) {
            setShowNoNamesError(true);
            return;
        }

        const newNote = {
            id: editingNoteId || Math.random().toString(36).substr(2, 9),
            names: [...names],
            type: noteType,
            service: selectedService,
            amount: names.length * selectedService.price
        };

        if (editingNoteId) {
            setBasket(basket.map(n => n.id === editingNoteId ? newNote : n));
        } else {
            setBasket([...basket, newNote]);
        }

        // Reset form for next note
        setNames([]);
        setEditingNoteId(null);
        setCurrentPage(0);
        setShowNoNamesError(false);
    };

    const editNoteFromBasket = (note: typeof basket[0]) => {
        // If there's unsaved work, save it to basket first or swap
        if (names.length > 0 && !editingNoteId) {
            const unsaved = {
                id: Math.random().toString(36).substr(2, 9),
                names: [...names],
                type: noteType,
                service: selectedService,
                amount: names.length * selectedService.price
            };
            setBasket([...basket, unsaved]);
        }

        setNames(note.names);
        setNoteType(note.type);
        setSelectedService(note.service);
        setEditingNoteId(note.id);
        setCurrentPage(0);
        setShowNoNamesError(false);
        setShowEmailError(false);

        // Scroll to form/note visual
        if (noteRef.current) {
            const yOffset = -20;
            const y = noteRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const removeNoteFromBasket = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setBasket(basket.filter(n => n.id !== id));
        if (editingNoteId === id) {
            setNames([]);
            setEditingNoteId(null);
        }
    };

    const calculateCurrentTotal = () => names.length * selectedService.price;
    const calculateBasketTotal = () => basket.reduce((acc, n) => acc + (n.id === editingNoteId ? 0 : n.amount), 0);
    const calculateGrandTotal = () => calculateBasketTotal() + calculateCurrentTotal();

    const currentNotesCount = Math.ceil(names.length / NAMES_PER_NOTE) || (names.length > 0 ? 1 : 0);
    const basketNotesCount = basket.reduce((acc, n) => acc + (n.id === editingNoteId ? 0 : Math.ceil(n.names.length / NAMES_PER_NOTE)), 0);
    const totalNotesCount = (basket.length > 0 ? basket.length : 0) + (!editingNoteId && names.length > 0 ? 1 : editingNoteId ? 1 : 0);
    const actualBasketItems = basket.filter(n => n.id !== editingNoteId);

    const handleSubmit = async () => {
        // Build final list of notes to submit
        const finalNotes = basket.map(n => n.id === editingNoteId ? {
            ...n,
            names,
            type: noteType,
            service: selectedService,
            amount: calculateCurrentTotal()
        } : n);

        if (!editingNoteId && names.length > 0) {
            finalNotes.push({
                id: 'current',
                names,
                type: noteType,
                service: selectedService,
                amount: calculateCurrentTotal()
            });
        }

        if (finalNotes.length === 0) {
            setShowNoNamesError(true);
            return;
        }

        if (!userEmail || !userEmail.includes('@')) {
            setShowEmailError(true);
            const emailInput = document.getElementById('user-email');
            if (emailInput) {
                emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setShowEmailError(false);

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/submit-prayer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    notes: finalNotes,
                    email: userEmail,
                    total: calculateGrandTotal()
                }),
            });

            if (res.ok) {
                alert(t('prayer.success'));
                setNames([]);
                setBasket([]);
                setUserEmail('');
                setEditingNoteId(null);
                setCurrentPage(0);
                setShowNoNamesError(false);
                setShowEmailError(false);
            } else {
                alert('Error processing request.');
            }
        } catch (error) {
            console.error(error);
            alert('Connection error.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getServiceName = (service: ServiceType) => t(service.nameKey);
    const HEALTH_RED = "#E31B1B";

    const BasketItems = ({ minimal = false }) => (
        <div className={`space-y-3 ${minimal ? 'max-h-[25vh] overflow-y-auto pr-1' : ''}`}>
            {basket.map((note) => (
                <button
                    key={note.id}
                    onClick={() => editNoteFromBasket(note)}
                    className="w-full text-left transition-all duration-300 relative"
                >
                    <div className={`
                        bg-white p-3 lg:p-4 rounded-xl border transition-all duration-300
                        ${editingNoteId === note.id
                            ? 'border-amber-500 shadow-md'
                            : 'border-gray-100 shadow-sm'}
                    `}>
                        <div className="flex justify-between items-center">
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${note.type === 'health' ? 'bg-[#E31B1B]' : 'bg-black'}`} />
                                    <p className="text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-gray-900">
                                        {note.type === 'health' ? t('prayer.health') : t('prayer.repose')}
                                    </p>
                                </div>
                                <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium">
                                    {getServiceName(note.service)} • {note.names.length} {t('prayer.total_names')}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 lg:gap-4">
                                <span className="text-xs font-bold text-amber-600">{note.amount} грн</span>
                                <div
                                    onClick={(e) => removeNoteFromBasket(e, note.id)}
                                    className="p-2 -mr-1 text-gray-300 hover:text-red-500 transition-colors"
                                >
                                    <X size={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );

    return (
        <main className="min-h-screen bg-white font-montserrat overflow-x-hidden pb-32 lg:pb-0">
            <PageHeader
                title={t('prayer.title')}
                subtitle={t('page.prayer_subtitle')}
                backgroundImage="/media/prayer-requests.jpg"
            />

            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[120px] py-12 lg:py-32">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 items-start justify-center">

                    {/* LEFT COLUMN: The Note Visual */}
                    <div ref={noteRef} className="w-full lg:w-[480px] flex-shrink-0 flex flex-col items-center gap-6 order-2 lg:order-1 animate-fade-in">

                        <div className="flex gap-2">
                            {editingNoteId && (
                                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-amber-200 animate-pulse">
                                    Редагування записки
                                </span>
                            )}
                        </div>

                        <div className="relative w-full max-w-[92vw] sm:max-w-[340px] min-h-[520px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700 transform hover:rotate-y-2 bg-white border border-gray-100 rounded-sm">
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />
                            <div className="p-0 relative z-10">
                                <div className="w-full h-auto mb-4 flex justify-center pt-8 px-6 relative">
                                    <Image src="/media/header.png" alt="Ornament" width={280} height={60} className={`w-full h-auto object-contain transition-all duration-500 ${noteType === 'repose' ? 'grayscale opacity-60' : ''}`} />
                                </div>

                                <div className="text-center mb-6">
                                    <h2 className="font-['Triod'] text-3xl transition-colors duration-500" style={{ color: noteType === 'health' ? HEALTH_RED : '#111827' }}>
                                        {noteType === 'health' ? t('prayer.health') : t('prayer.repose')}
                                    </h2>
                                    {selectedService.id !== 'simple' && (
                                        <p className="font-montserrat text-[10px] font-bold uppercase tracking-widest mt-2 px-4 transition-colors duration-500" style={{ color: noteType === 'health' ? `${HEALTH_RED}B3` : '#6B7280' }}>
                                            — {getServiceName(selectedService)} —
                                        </p>
                                    )}
                                </div>

                                <div className="px-8 space-y-1 mb-10 min-h-[320px]">
                                    {Array.from({ length: NAMES_PER_NOTE }).map((_, idx) => {
                                        const actualIndex = currentPage * NAMES_PER_NOTE + idx;
                                        const name = names[actualIndex];
                                        return (
                                            <div key={idx} className="h-8 flex items-end relative group border-b transition-colors duration-500" style={{ borderColor: noteType === 'health' ? `${HEALTH_RED}33` : '#E5E7EB' }}>
                                                {name ? (
                                                    <div className="w-full flex justify-between items-center text-lg relative animate-fade-in-up">
                                                        <span className="text-gray-900 font-montserrat italic text-lg leading-none pb-1 w-full text-center">{name}</span>
                                                        <button onClick={() => removeName(actualIndex)} className="absolute right-0 text-red-500/30 hover:text-red-600 transition-all focus:outline-none">
                                                            <X className="w-3.5 h-3.5" strokeWidth={2} />
                                                        </button>
                                                    </div>
                                                ) : <div className="w-full h-6" />}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="w-full flex justify-center px-8 pb-10">
                                    <div className="text-center w-full flex flex-col items-center">
                                        <Image src="/media/footer.png" alt="Monastery" width={280} height={80} className={`w-full h-auto object-contain mb-4 transition-all duration-500 ${noteType === 'repose' ? 'grayscale opacity-60' : ''}`} />
                                        <p className="text-sm font-['Triod'] leading-tight transition-colors duration-500" style={{ color: noteType === 'health' ? `${HEALTH_RED}CC` : '#9CA3AF' }}>
                                            {t('prayer.note_footer_1')}<br />{t('prayer.note_footer_2')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Numeric Pagination */}
                        {currentNotesCount > 1 && (
                            <div className="flex items-center gap-2 animate-fade-in">
                                {Array.from({ length: currentNotesCount }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i)}
                                        className={`w-8 h-8 rounded-full font-bold text-xs transition-all duration-300 flex items-center justify-center ${currentPage === i ? 'bg-amber-600 text-white shadow-md scale-110' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Basket Summary - Visible only on Desktop (Hidden on Mobile as it's in sticky) */}
                        <div className="hidden lg:block w-full max-w-[340px] space-y-4 animate-fade-in mt-2">
                            {basket.length > 0 && (
                                <>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{t('prayer.basket_title')}</span>
                                        <div className="h-[1px] flex-1 bg-gray-100"></div>
                                    </div>
                                    <BasketItems />
                                </>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Controls Form */}
                    <div className="w-full lg:flex-1 max-w-xl space-y-8 order-1 lg:order-2">
                        <div className="space-y-6">
                            <p className="text-gray-500 font-light italic leading-relaxed text-sm md:text-base border-l-2 pl-4 py-1" style={{ borderColor: '#d2ae6d' }}>{t('prayer.visit_message')}</p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 flex-1 text-sm font-bold text-gray-900 uppercase tracking-widest whitespace-nowrap">
                                        {t('prayer.service_type')}
                                        <div className="h-[1px] flex-1 bg-gray-100 hidden sm:block"></div>
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest italic flex-shrink-0">
                                        * Ціна вказана за кожне ім’я
                                    </span>
                                </div>
                                <div className="bg-gray-50/50 p-1 rounded-xl flex gap-1 border border-gray-100">
                                    <button onClick={() => setNoteType('health')} className="flex-1 py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all duration-500" style={{ backgroundColor: noteType === 'health' ? HEALTH_RED : 'transparent', color: noteType === 'health' ? 'white' : '#9CA3AF', boxShadow: noteType === 'health' ? '0 4px 12px rgba(227, 27, 27, 0.2)' : 'none' }}>{t('prayer.health')}</button>
                                    <button onClick={() => setNoteType('repose')} className="flex-1 py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all duration-500" style={{ backgroundColor: noteType === 'repose' ? 'black' : 'transparent', color: noteType === 'repose' ? 'white' : '#9CA3AF', boxShadow: noteType === 'repose' ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none' }}>{t('prayer.repose')}</button>
                                </div>
                                <div className="bg-gray-50/50 p-1 rounded-xl flex flex-col sm:flex-row gap-1 border border-gray-100">
                                    {SERVICES.map((s) => (
                                        <button key={s.id} onClick={() => setSelectedService(s)} className={`flex-1 py-3 px-3 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all duration-300 flex flex-col items-center justify-center gap-0.5 ${selectedService.id === s.id ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-100' : 'text-gray-400 hover:text-gray-600'}`}>
                                            <span>{getServiceName(s)}</span><span className="text-[9px] opacity-60 font-bold italic">{s.price} грн</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">{t('prayer.names_label')}</span>
                                    <span className={`text-[10px] font-bold tracking-widest ${names.length >= MAX_TOTAL_NAMES ? 'text-red-500' : 'text-amber-600'}`}>{names.length} / {MAX_TOTAL_NAMES}</span>
                                </div>
                                <div className="relative group flex items-stretch">
                                    <input
                                        type="text" value={currentName} onChange={handleInputChange} onKeyDown={handleKeyDown} disabled={names.length >= MAX_TOTAL_NAMES}
                                        placeholder={t('prayer.names_placeholder')}
                                        className={`w-full bg-white border ${showError || showNoNamesError ? 'border-red-400' : 'border-gray-100'} p-4 rounded-xl text-base font-medium outline-none focus:border-amber-600/30 transition-all shadow-sm placeholder:text-gray-300 disabled:bg-gray-50 pr-16`}
                                    />
                                    <button onClick={addName} disabled={!currentName.trim() || names.length >= MAX_TOTAL_NAMES} className="absolute right-0 top-0 bottom-0 bg-black text-white px-5 rounded-r-xl hover:bg-amber-600 disabled:bg-gray-100 disabled:text-gray-300 transition-all active:scale-95 z-10"><Plus className="w-5 h-5" /></button>
                                </div>
                                {showError && <p className="text-[10px] font-bold text-red-500 animate-pulse">{t('prayer.error_invalid_char')}</p>}
                                {showNoNamesError && <p className="text-[10px] font-bold text-red-500 animate-pulse">{t('prayer.error_no_names')}</p>}

                                <button
                                    onClick={addNoteToBasket}
                                    className={`w-full h-12 border-2 border-dashed rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${editingNoteId ? 'border-amber-600 text-amber-600 bg-amber-50/30' : 'border-gray-200 text-gray-400 hover:border-amber-600 hover:text-amber-600'}`}
                                >
                                    {editingNoteId ? <Check size={16} /> : <Plus size={16} />}
                                    {editingNoteId ? t('prayer.save_changes') : t('prayer.add_another')}
                                </button>
                            </div>

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
                        </div>

                        {/* Total Block - Enhanced for Mobile Visibility (Sticky on mobile) */}
                        <div className="lg:static fixed bottom-0 left-0 right-0 bg-white border-t lg:border border-gray-100 p-4 lg:p-6 lg:rounded-[20px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] lg:shadow-lg z-[100] transition-all transform animate-slide-up">
                            <div className="max-w-xl mx-auto lg:mx-0 space-y-4">

                                {/* Mobile Basket items inside sticky footer */}
                                {basket.length > 0 && (
                                    <div className="lg:hidden animate-fade-in-up">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em]">{t('prayer.basket_title')}</span>
                                            <div className="h-[1px] flex-1 bg-gray-100"></div>
                                        </div>
                                        <BasketItems minimal />
                                    </div>
                                )}

                                <div className="flex justify-between items-start pt-2 border-t border-gray-50 mt-2">
                                    <div className="flex gap-4 lg:gap-8">
                                        <div className="space-y-0.5">
                                            <p className="text-gray-400 text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.2em]">{t('prayer.total_names')}</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl lg:text-2xl font-bold tracking-tighter">{names.length + calculateBasketTotal()}</span>
                                            </div>
                                        </div>
                                        {totalNotesCount > 1 && (
                                            <div className="space-y-0.5 animate-fade-in">
                                                <p className="text-gray-400 text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.2em]">{t('prayer.total_notes')}</p>
                                                <div className="flex items-baseline gap-1"><span className="text-xl lg:text-2xl font-bold tracking-tighter" style={{ color: HEALTH_RED }}>{totalNotesCount}</span></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right space-y-0.5">
                                        <p className="text-gray-400 text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.2em]">{t('prayer.total_amount')}</p>
                                        <p className="text-xl lg:text-2xl font-bold tracking-tighter text-gray-900">{calculateGrandTotal()} <span className="text-sm">грн</span></p>
                                    </div>
                                </div>
                                <button onClick={handleSubmit} disabled={(names.length === 0 && basket.length === 0) || isSubmitting} className="w-full bg-black text-white h-12 lg:h-14 rounded-xl font-bold text-[10px] lg:text-xs uppercase tracking-[0.4em] hover:bg-amber-600 disabled:bg-gray-100 disabled:text-gray-300 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {t('prayer.processing')}
                                        </>
                                    ) : (totalNotesCount > 1 ? t('prayer.submit_plural') : t('prayer.submit'))}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}


