'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import { X, Plus, ChevronDown, Check } from 'lucide-react';

type ServiceType = {
  id: string;
  name: string;
  price: number;
};

const SERVICES: ServiceType[] = [
  { id: 'simple', name: 'Проста записка (разово)', price: 10 },
  { id: 'sorokoust', name: 'Сорокауст (40 днів)', price: 200 },
  { id: 'half-year', name: 'Півроку', price: 1000 },
  { id: 'year', name: 'Рік', price: 2000 },
  { id: 'psalter', name: 'Псалтир (1 місяць)', price: 300 },
];

export default function PrayerNotePage() {
  const [noteType, setNoteType] = useState<'health' | 'repose'>('health');
  const [names, setNames] = useState<string[]>([]);
  const [currentName, setCurrentName] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceType>(SERVICES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Maximum 10 names per note
  const MAX_NAMES = 10;

  const addName = () => {
    if (currentName.trim() && names.length < MAX_NAMES) {
      setNames([...names, currentName.trim()]);
      setCurrentName('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addName();
    }
  };

  const removeName = (index: number) => {
    setNames(names.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return names.length * selectedService.price;
  };

  const handleSubmit = () => {
    if (names.length === 0) {
      alert('Будь ласка, додайте хоча б одне ім\'я');
      return;
    }
    // Logic for payment or submission would go here
    alert(`Записку сформовано! Сума до сплати: ${calculateTotal()} грн. Ми переходимо до оплати...`);
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <PageHeader title="ПОДАТИ ЗАПИСКУ" backgroundImage="/media/church-complex.jpg" />

      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px] py-12 lg:py-24">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start justify-center">
          
          {/* LEFT COLUMN: The Note Visual */}
          <div className="w-full lg:w-[450px] flex-shrink-0 flex justify-center perspective-1000 order-2 lg:order-1">
            <div className={`
                relative w-full max-w-[400px] min-h-[500px] shadow-2xl transition-all duration-500 transform
                ${noteType === 'health' ? 'bg-[#fdfbf7]' : 'bg-[#f4f4f6]'}
                border border-gray-200
            `}
                 style={{
                    backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)',
                    backgroundSize: '100% 2.5rem',
                    backgroundPosition: '0 2.5rem' // align first line
                 }}
            >
                {/* Note Header */}
                <div className="pt-8 pb-4 px-8 text-center border-b-2 border-double border-gray-300 mx-4 bg-opacity-90">
                    <div className="text-4xl mb-2 flex justify-center">
                        <span className={`font-serif ${noteType === 'health' ? 'text-red-700' : 'text-black'}`}>
                            †
                        </span>
                    </div>
                    <h2 className="font-church text-2xl font-bold uppercase tracking-widest font-serif mb-1">
                        {noteType === 'health' ? 'ЗА ЗДОРОВ\'Я' : 'ЗА УПОКІЙ'}
                    </h2>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                        {selectedService.name}
                    </p>
                </div>

                {/* Names List */}
                <div className="px-8 py-4 space-y-[0.6rem]">
                    {Array.from({ length: MAX_NAMES }).map((_, index) => (
                        <div key={index} className="h-8 flex items-end relative group">
                            <span className="text-gray-400 text-xs absolute left-[-20px] bottom-1 select-none">
                                {index + 1}.
                            </span>
                            {names[index] ? (
                                <div className="w-full flex justify-between items-center text-xl font-handwriting border-b border-transparent">
                                    <span className="text-gray-800 font-serif italic text-lg">{names[index]}</span>
                                    <button 
                                        onClick={() => removeName(index)}
                                        className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full border-b border-transparent h-6" /> // Empty line placeholder
                            )}
                        </div>
                    ))}
                </div>

                {/* Note Footer */}
                 <div className="absolute bottom-4 left-0 w-full text-center">
                    <p className="text-xs text-gray-400 font-serif italic">
                        Жидичинський монастир
                    </p>
                 </div>
            </div>
          </div>


          {/* RIGHT COLUMN: Controls Form */}
          <div className="w-full lg:max-w-xl space-y-8 order-1 lg:order-2">
            
            {/* 1. Toggle Type */}
            <div className="bg-white p-2 rounded-lg shadow-sm w-full lg:w-fit flex gap-2 border border-gray-100">
                <button
                    onClick={() => setNoteType('health')}
                    className={`flex-1 lg:flex-none px-8 py-3 rounded-md font-medium transition-all duration-300 ${
                        noteType === 'health' 
                        ? 'bg-red-50 text-red-700 shadow-sm ring-1 ring-red-100' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    За Здоров'я
                </button>
                <button
                    onClick={() => setNoteType('repose')}
                    className={`flex-1 lg:flex-none px-8 py-3 rounded-md font-medium transition-all duration-300 ${
                        noteType === 'repose' 
                        ? 'bg-gray-800 text-white shadow-md' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    За Упокій
                </button>
            </div>

            {/* 2. Service Dropdown */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">Тип пожертви</label>
                <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-white border border-gray-300 rounded-xl p-4 cursor-pointer flex justify-between items-center hover:border-amber-500 transition-colors shadow-sm"
                >
                    <div>
                        <span className="block font-bold text-gray-900 text-lg">{selectedService.name}</span>
                        <span className="text-amber-600 font-medium">{selectedService.price} грн / ім'я</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {isDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden animate-fadeIn">
                        {SERVICES.map((service) => (
                            <div 
                                key={service.id}
                                onClick={() => {
                                    setSelectedService(service);
                                    setIsDropdownOpen(false);
                                }}
                                className="p-4 hover:bg-amber-50 cursor-pointer flex justify-between items-center border-b border-gray-50 last:border-0"
                            >
                                <span className="text-gray-800 font-medium">{service.name}</span>
                                {selectedService.id === service.id && <Check className="w-4 h-4 text-amber-600" />}
                                <span className="text-gray-500 text-sm ml-auto mr-2">{service.price} грн</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. Input Section */}
            <div className={`transition-all duration-300 ${names.length >= MAX_NAMES ? 'opacity-50 pointer-events-none' : ''}`}>
                 <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">
                    Впишіть імена ({names.length}/{MAX_NAMES})
                 </label>
                 <div className="flex gap-4">
                    <input 
                        type="text" 
                        value={currentName}
                        onChange={(e) => setCurrentName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Наприклад: Миколи"
                        className="flex-1 bg-white border border-gray-300 p-4 rounded-xl text-lg outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm placeholder:text-gray-300"
                        autoFocus
                    />
                    <button 
                        onClick={addName}
                        disabled={!currentName.trim() || names.length >= MAX_NAMES}
                        className="bg-black text-white p-4 rounded-xl hover:bg-amber-600 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors shadow-lg active:scale-95"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                 </div>
                 {names.length >= MAX_NAMES && (
                    <p className="text-red-500 text-sm mt-2">
                        Записка заповнена. Будь ласка, подайте цю записку, щоб створити нову.
                    </p>
                 )}
            </div>

            {/* Total Block */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-8">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
                    <div>
                        <p className="text-gray-500 font-medium">Кількість імен</p>
                        <p className="text-2xl font-bold">{names.length}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 font-medium">Сума пожертви</p>
                        <p className="text-3xl font-bold text-amber-600">{calculateTotal()} грн</p>
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    <button 
                        onClick={() => setNames([])} 
                        disabled={names.length === 0}
                        className="text-gray-400 hover:text-red-500 px-4 py-2 font-medium transition-colors disabled:opacity-0"
                    >
                        Очистити
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={names.length === 0}
                        className="flex-1 bg-amber-600 text-white py-4 rounded-xl font-bold text-lg uppercase tracking-wider hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Подати записку
                    </button>
                </div>
            </div>

          </div>
          
        </div>
      </div>

      <Footer />
      <FloatingButton />
    </main>
  );
}
