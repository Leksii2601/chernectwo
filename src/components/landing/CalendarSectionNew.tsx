
'use client'

import React, { useState, useMemo } from 'react'
import { generateCalendar } from '@/utils/calendarGenerator_test'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext';

export function CalendarSectionNew() {
    const { t, language } = useLanguage();
    const MONTHS = t('calendar.months').split(',');
    const MONTHS_GENITIVE = t('calendar.months_genitive').split(',');
    const WEEKDAYS = t('calendar.weekdays').split(',');

    const [currentDate, setCurrentDate] = useState(new Date());
    const currentYear = currentDate.getFullYear();

    const fullCalendarData = useMemo(() => {
        return [...generateCalendar(currentYear, language), ...generateCalendar(currentYear + 1, language)];
    }, [currentYear, language]);

    const selectedIndex = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const isoDate = `${year}-${month}-${day}`;
        const idx = fullCalendarData.findIndex(d => d.date === isoDate);
        return idx !== -1 ? idx : 0;
    }, [currentDate, fullCalendarData]);

    const selectedDayData = fullCalendarData[selectedIndex];
    const upcomingDays = fullCalendarData.slice(selectedIndex + 1, selectedIndex + 3);

    const handleSelectDate = (dateIso: string) => {
        const [y, m, d] = dateIso.split('-').map(Number);
        const newDate = new Date(y, m - 1, d, 12, 0, 0);
        setCurrentDate(newDate);
    }

    const handleMonthChange = (offset: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setCurrentDate(newDate);
    }

    const widgetMonthDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const monthStr = String(month + 1).padStart(2, '0');
        const yearStr = String(year);
        const days = fullCalendarData.filter(d => d.date.startsWith(`${yearStr}-${monthStr}-`));
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=Sun
        const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        return [...Array(offset).fill(null), ...days];
    }, [currentDate, fullCalendarData]);

    return (
        <section id="calendar" className="py-20 px-2 lg:px-4 bg-gray-50 text-gray-800 font-sans min-h-screen">
            <div className="container mx-auto max-w-7xl">
                <h2 className="font-montserrat font-bold text-3xl md:text-5xl uppercase tracking-widest text-center mb-16 text-gray-800">
                    {t('calendar.title')} (NEW ENGINE)
                </h2>

                <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

                    {/* Widget */}
                    <div className="w-full lg:w-[320px] shrink-0 relative lg:sticky lg:top-4 self-start order-1 lg:order-2">
                        <div className="bg-white rounded-none shadow-2xl overflow-hidden p-6" style={{ paddingBottom: '0.7rem' }}>
                            <div className="relative text-white -mx-6 -mt-6 p-6 mb-4 text-center overflow-hidden">
                                <div className="absolute inset-0 z-0 bg-black">
                                    <div className="absolute top-0 right-0 w-3/4 h-full bg-teal-900/50 blur-xl rounded-full translate-x-1/4"></div>
                                    <div className="absolute top-1/2 left-1/4 w-1/2 h-full bg-amber-600/30 blur-2xl rounded-full -translate-y-1/2"></div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-2 px-2 absolute w-full top-1/2 -translate-y-1/2">
                                        <button onClick={() => handleMonthChange(-1)} className="text-gray-400 hover:text-white transition-colors " style={{ padding: '-0.7rem' }}>
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleMonthChange(1)} className="text-gray-400 hover:text-white transition-colors " style={{ padding: '-0.7rem' }}>
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="flex items-baseline justify-center gap-2 mb-4">
                                        <span className="text-4xl font-bold font-sans tracking-wide">
                                            {selectedDayData ? parseInt(selectedDayData.dayNumber) : currentDate.getDate()}
                                        </span>
                                        <span className="text-2xl font-bold font-sans mr-2">
                                            {selectedDayData
                                                ? MONTHS_GENITIVE[parseInt(selectedDayData.date.split('-')[1]) - 1]?.toLowerCase()
                                                : MONTHS[currentDate.getMonth()]?.toLowerCase()
                                            }
                                        </span>
                                        <span className="text-gray-400 font-normal">
                                            {currentDate.getFullYear()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold text-gray-300 uppercase px-2">
                                        {WEEKDAYS.map(d => <span key={d} className={clsx(d === 'Сб' || d === 'Нд' ? "text-white" : "")}>{d}</span>)}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-y-3 gap-x-1 mt-6">
                                {widgetMonthDays.map((day, i) => {
                                    if (!day) return <span key={`empty-${i}`}></span>
                                    const isSelected = selectedDayData && day.date === selectedDayData.date;
                                    const now = new Date();
                                    const todayIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
                                    const isToday = day.date === todayIso;
                                    return (
                                        <button
                                            key={day.date}
                                            onClick={() => handleSelectDate(day.date)}
                                            className={clsx(
                                                "w-8 h-8 flex items-center justify-center text-sm font-medium transition-all mx-auto rounded-full",
                                                isSelected ? "bg-amber-500 text-white shadow-lg shadow-amber-500/50 ring-2 ring-amber-300 scale-110 font-bold z-10" : "text-gray-600 hover:text-amber-600",
                                                isToday && !isSelected && "text-amber-500 font-bold border border-amber-500",
                                                day.isHoliday && !isSelected && "text-red-500"
                                            )}
                                        >
                                            {parseInt(day.dayNumber)}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full max-w-4xl order-2 lg:order-1">
                        {selectedDayData && (
                            <div className="bg-white shadow-md p-6 mb-4">
                                <div className="flex items-start gap-6 mb-4">
                                    <div className="flex flex-col items-center bg-gray-100 p-4 min-w-[100px]">
                                        <div className="text-5xl font-bold text-gray-700">{selectedDayData.dayNumber}</div>
                                        <div className="text-sm text-gray-600 uppercase font-bold mt-1">{MONTHS[parseInt(selectedDayData.date.split('-')[1]) - 1]}</div>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className={clsx(
                                            "text-lg font-bold mb-2",
                                            selectedDayData.isHoliday ? "text-red-700" : "text-gray-800"
                                        )}>
                                            {selectedDayData.title}
                                        </h2>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            {selectedDayData.saints.join(", ")}
                                        </p>

                                        <div className="mt-4 p-3 bg-amber-50 rounded text-sm text-gray-800 border-l-4 border-amber-400">
                                            <h4 className="font-bold mb-1">Богослужбові читання:</h4>

                                            {selectedDayData.readingsStructured ? (
                                                <div className="space-y-4 mt-2">

                                                    {selectedDayData.readingsStructured.metadata && (
                                                        <div className="text-xs text-gray-500 italic mb-2">
                                                            {selectedDayData.readingsStructured.metadata.description}
                                                        </div>
                                                    )}

                                                    {/* Vespers */}
                                                    {selectedDayData.readingsStructured.vespers && selectedDayData.readingsStructured.vespers.readings.length > 0 && (
                                                        <div className="mb-3">
                                                            <div className="font-bold text-amber-800 border-b border-amber-200 mb-1">Вечірня:</div>
                                                            <ul className="ml-2 list-disc list-inside text-xs text-gray-700">
                                                                {selectedDayData.readingsStructured.vespers.readings.map((r: any, i: number) => (
                                                                    <li key={i}>{r.reading}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Matins Gospel */}
                                                    {selectedDayData.readingsStructured.matinsGospel && (
                                                        <div>
                                                            <div className="font-bold text-amber-700">Раннє Євангеліє:</div>
                                                            <div className="ml-2 font-mono text-sm">{selectedDayData.readingsStructured.matinsGospel.reading}</div>
                                                        </div>
                                                    )}

                                                    {/* Liturgy */}
                                                    {(selectedDayData.readingsStructured.liturgy.apostle.length > 0 || selectedDayData.readingsStructured.liturgy.gospel.length > 0) && (
                                                        <div>
                                                            <div className="font-bold text-amber-700">Літургія:</div>
                                                            <div className="ml-2">
                                                                {Array.from({ length: Math.max(selectedDayData.readingsStructured.liturgy.apostle.length, selectedDayData.readingsStructured.liturgy.gospel.length) }).map((_, i) => {
                                                                    const ap = selectedDayData.readingsStructured!.liturgy.apostle[i];
                                                                    const gs = selectedDayData.readingsStructured!.liturgy.gospel[i];
                                                                    const label = ap?.label || gs?.label;
                                                                    return (
                                                                        <div key={i} className="mb-2 border-b border-amber-100 pb-1 last:border-0">
                                                                            {label && <span className="font-bold text-amber-800 block">{label}</span>}
                                                                            <div className="flex flex-col ml-1">
                                                                                {ap && <div className="flex gap-2"><span className="font-semibold min-w-8 text-xs text-gray-500">АП:</span> <span>{ap.reading}</span></div>}
                                                                                {gs && <div className="flex gap-2"><span className="font-semibold min-w-8 text-xs text-gray-500">ЄВ:</span> <span>{gs.reading}</span></div>}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Hours */}
                                                    {selectedDayData.readingsStructured.hours && Object.keys(selectedDayData.readingsStructured.hours).length > 0 && (
                                                        <div>
                                                            <div className="font-bold text-amber-700 border-t border-amber-200 mt-2 pt-1">Часи:</div>
                                                            <div className="ml-2 text-xs grid grid-cols-2 gap-2 mt-1">
                                                                {Object.entries(selectedDayData.readingsStructured.hours).map(([hName, readings]) => (
                                                                    <div key={hName} className="">
                                                                        <span className="capitalize font-semibold text-gray-600">{hName}:</span>
                                                                        <div className="">
                                                                            {Array.isArray(readings) ? readings.map(r => r.reading).join(", ") : ""}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>
                                            ) : (
                                                <pre className="whitespace-pre-wrap font-sans">{selectedDayData.readings}</pre>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 mt-6">
                                    {selectedDayData.events.map((event, idx) => (
                                        <div key={idx} className="flex justify-between items-center py-0 px-2 hover:bg-gray-50 transition-colors rounded">
                                            <div className="flex items-center gap-4">
                                                <span className="text-base font-semibold text-gray-700 w-16">{event.time}</span>
                                                <span className="text-sm text-gray-800 font-semibold">{event.name}</span>
                                            </div>
                                            <span className="text-sm text-gray-600 font-bold hidden sm:block">{event.location}</span>
                                        </div>
                                    ))}
                                    {selectedDayData.events.length === 0 && (
                                        <p className="text-gray-400 italic text-center py-4">Богослужінь немає</p>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="hidden lg:flex flex-col flex-1 h-full">
                            {upcomingDays.map((day, index) => {
                                const mIndex = parseInt(day.date.split('-')[1]) - 1;
                                return (
                                    <div
                                        key={day.date}
                                        onClick={() => handleSelectDate(day.date)}
                                        className={`flex items-start gap-6 bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${index !== upcomingDays.length - 1 ? 'mb-4' : 'flex-1'
                                            }`}
                                    >
                                        <div className="flex flex-col items-center bg-gray-100 p-4 min-w-[100px]">
                                            <div className="text-4xl font-bold text-gray-700">{day.dayNumber}</div>
                                            <div className="text-sm text-gray-600 uppercase font-bold mt-1">{MONTHS[mIndex]}</div>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className={clsx(
                                                "text-base font-bold mb-4",
                                                day.isHoliday ? "text-red-700" : "text-gray-800"
                                            )}>
                                                {day.title}
                                            </h2>
                                            <div className="space-y-2">
                                                {day.events.slice(0, 5).map((evt, i) => (
                                                    <div key={i} className="flex items-center gap-4 text-xs sm:text-sm">
                                                        <span className="font-semibold text-gray-700 w-16">{evt.time}</span>
                                                        <span className="text-gray-800 truncate">{evt.name}</span>
                                                        <span className="text-gray-500 ml-auto hidden sm:block">{evt.location}</span>
                                                    </div>
                                                ))}
                                                {day.events.length > 5 && (
                                                    <div className="text-xs text-gray-400 pl-20">... ще {day.events.length - 5}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
