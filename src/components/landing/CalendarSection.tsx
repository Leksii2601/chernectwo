'use client'

import React, { useState, useMemo } from 'react'
import { generateCalendar } from '@/utils/calendarGenerator'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MONTHS = [
  "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
  "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
]

const MONTHS_GENITIVE = [
  "січня", "лютого", "березня", "квітня", "травня", "червня",
  "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
]

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

export function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();

  const fullCalendarData = useMemo(() => {
      return [...generateCalendar(currentYear), ...generateCalendar(currentYear + 1)];
  }, [currentYear]);

  const selectedIndex = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const isoDate = `${year}-${month}-${day}`;
    
    // Check if currentDate matches any in our expanded dataset
    const idx = fullCalendarData.findIndex(d => d.date === isoDate);
    return idx !== -1 ? idx : 0; 
  }, [currentDate, fullCalendarData]);

  const selectedDayData = fullCalendarData[selectedIndex];
  
  // Get upcoming 3 days
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

  // Widget Data
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
        <h2 className="font-sans text-4xl text-center mb-16 uppercase font-bold text-gray-800">
          РОЗКЛАД БОГОСЛУЖІНЬ
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

            {/* Calendar Widget (Floating) */}
            <div className="w-full lg:w-[320px] shrink-0 relative lg:sticky lg:top-4 self-start order-1 lg:order-2">
                <div className="bg-white rounded-none shadow-2xl overflow-hidden p-6" style={{ paddingBottom: '0.7rem' }}>
                    {/* Header with Custom Aurora Background */}
                    <div className="relative text-white -mx-6 -mt-6 p-6 mb-4 text-center overflow-hidden">
                        {/* Background Container */}
                        <div className="absolute inset-0 z-0 bg-black">
                             {/* Gradient Simulation matches photo: darker teal/green on right, orange glow center/left? */}
                             {/* Actually photo shows: teal right, orange/gold center glow, black fade */}
                             <div className="absolute top-0 right-0 w-3/4 h-full bg-teal-900/50 blur-xl rounded-full translate-x-1/4"></div>
                             <div className="absolute top-1/2 left-1/4 w-1/2 h-full bg-amber-600/30 blur-2xl rounded-full -translate-y-1/2"></div>
                             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Month Navigation Row */}
                            <div className="flex items-center justify-between mb-2 px-2 absolute w-full top-1/2 -translate-y-1/2">
                                <button onClick={() => handleMonthChange(-1)} className="text-gray-400 hover:text-white transition-colors "style={{ padding: '-0.7rem' }}>
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleMonthChange(1)} className="text-gray-400 hover:text-white transition-colors "style={{ padding: '-0.7rem' }}>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-baseline justify-center gap-2 mb-4">
                                <span className="text-4xl font-bold font-sans tracking-wide">
                                    {selectedDayData ? parseInt(selectedDayData.dayNumber) : currentDate.getDate()}
                                </span>
                                <span className="text-2xl font-bold font-sans mr-2">
                                     {selectedDayData 
                                        ? MONTHS_GENITIVE[parseInt(selectedDayData.date.split('-')[1])-1].toLowerCase() 
                                        : MONTHS[currentDate.getMonth()].toLowerCase()
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

                    {/* Grid - No Header now (moved to visual header above) */}
                    <div className="grid grid-cols-7 gap-y-3 gap-x-1 mt-6">
                            {widgetMonthDays.map((day, i) => {
                                if (!day) return <span key={`empty-${i}`}></span>
                                
                                const isSelected = selectedDayData && day.date === selectedDayData.date;
                                const now = new Date();
                                const todayIso = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
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

            {/* Content Area (Specific Day Details) */}
            <div className="flex-1 w-full max-w-4xl order-2 lg:order-1">
              
              {/* Selected Day - Main Card */}
              {selectedDayData && (
                <div className="bg-white shadow-md p-6 mb-4">
                  <div className="flex items-start gap-6 mb-4">
                    <div className="flex flex-col items-center bg-gray-100 p-4 min-w-[100px]">
                      <div className="text-5xl font-bold text-gray-700">{selectedDayData.dayNumber}</div>
                      <div className="text-sm text-gray-600 uppercase font-bold mt-1">{MONTHS[parseInt(selectedDayData.date.split('-')[1])-1]}</div>
                      {/* Removed specific icons/crosses as requested */}
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
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    {/* Updated to match upcoming days spacing exactly */}
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

              {/* Upcoming Rows */}
              <div className="hidden lg:flex flex-col flex-1 h-full"> 
              {upcomingDays.map((day, index) => {
                  const mIndex = parseInt(day.date.split('-')[1]) - 1;
                  return (
                    <div 
                        key={day.date} 
                        onClick={() => handleSelectDate(day.date)}
                        className={`flex items-start gap-6 bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                          index !== upcomingDays.length - 1 ? 'mb-4' : 'flex-1'
                        }`}
                        
                    >
                      <div className="flex flex-col items-center bg-gray-100 p-4 min-w-[100px]">
                        <div className="text-4xl font-bold text-gray-700">{day.dayNumber}</div>
                        <div className="text-sm text-gray-600 uppercase font-bold mt-1">{MONTHS[mIndex]}</div>
                        {/* No icons */}
                      </div>
                      <div className="flex-1">
                        <h2 className={clsx(
                            "text-base font-bold mb-4",
                             day.isHoliday ? "text-red-700" : "text-gray-800"
                         )}>
                          {day.title}
                        </h2>
                        {/* Display services if any, condensed */}
                        <div className="space-y-2">
                             {day.events.slice(0, 2).map((evt, i) => ( // Show first 2 events only for upcoming
                                 <div key={i} className="flex items-center gap-4 text-xs sm:text-sm">
                                    <span className="font-semibold text-gray-700 w-16">{evt.time}</span>
                                    <span className="text-gray-800 truncate">{evt.name}</span>
                                    <span className="text-gray-500 ml-auto hidden sm:block">{evt.location}</span>
                                 </div>
                             ))}
                             {day.events.length > 2 && (
                                 <div className="text-xs text-gray-400 pl-20">... ще {day.events.length - 2}</div>
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
