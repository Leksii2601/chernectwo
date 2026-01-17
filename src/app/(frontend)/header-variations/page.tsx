
'use client';

import React from 'react';
import Image from 'next/image';
import { Search, Menu, ArrowRight, Heart, Globe, X, User } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { label: 'Історія', href: '#' },
  { label: 'Новини', href: '#' },
  { label: 'Проєкти', href: '#' },
  { label: 'Візит', href: '#' },
];

const Logo = ({ className }: { className?: string }) => (
    <div className={clsx("relative flex items-center justify-center", className || "w-12 h-12")}>
        <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
    </div>
);

// Wrapper to simulate the header environment
const DemoSection = ({ title, desc, children, className = "bg-white", dark = false }: { title: string, desc: string, children: React.ReactNode, className?: string, dark?: boolean }) => (
    <section className="mb-32 scroll-mt-24 group" id={title.toLowerCase().replace(/\s/g, '-')}>
        <div className="flex items-baseline gap-4 mb-6 px-4">
            <span className="text-amber-500 font-mono text-sm">0{title.split('.')[0]}</span>
            <div>
                <h2 className="text-3xl font-montserrat text-gray-900 uppercase tracking-tight">{title.split('. ')[1]}</h2>
                <p className="text-gray-500 font-sans text-sm mt-1">{desc}</p>
            </div>
        </div>
        
        <div className={clsx(
            "relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 transition-all duration-500 group-hover:shadow-3xl", 
            className,
            dark ? "bg-[#0a0a0a]" : "bg-gray-50"
        )}>
             {children}
             
             {/* Fake Content */}
             <div className={clsx("absolute inset-0 z-0 flex flex-col items-center justify-center pt-32 pointer-events-none opacity-20", dark ? "grayscale invert" : "")}>
                <div className="w-64 h-4 bg-gray-300 rounded-full mb-4"></div>
                <div className="w-96 h-4 bg-gray-200 rounded-full mb-4"></div>
                <div className="w-80 h-4 bg-gray-200 rounded-full"></div>
             </div>
        </div>
    </section>
);

export default function HeaderVariationsPage() {
  return (
    <main className="min-h-screen bg-white p-8 md:p-16 max-w-[1600px] mx-auto">
        <header className="mb-24 text-center max-w-2xl mx-auto">
            <h1 className="font-montserrat text-6xl mb-6">MODERN HEADERS</h1>
            <p className="text-gray-500 font-sans text-lg">
                Добірка сучасних UX/UI рішень для навігації. <br/>
                Акцент на мікро-анімаціях, прозорості та типографіці.
            </p>
        </header>

        {/* 1. The "Dynamic Island" */}
        <DemoSection 
            title="1. The Floating Island" 
            desc="Тренд 2024-2025. Компактна капсула, що плаває над контентом. Економить місце, виглядає технологічно."
            className="bg-[url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
        >
             <div className="absolute top-8 left-0 right-0 flex justify-center">
                 <div className="bg-white/90 backdrop-blur-xl border border-white/20 pl-2 pr-2 py-2 rounded-full shadow-xl shadow-black/5 flex items-center gap-2 max-w-fit animate-fade-in-up">
                     <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center ml-1">
                        <Logo className="w-6 h-6" />
                     </div>
                     
                     <nav className="flex items-center px-4">
                         {navItems.map((item, i) => (
                             <a key={i} href={item.href} className="px-5 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition-all cursor-pointer">
                                 {item.label}
                             </a>
                         ))}
                     </nav>

                     <div className="flex items-center gap-1 pl-2 border-l border-gray-200">
                        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">
                             <Search className="w-4 h-4" />
                        </button>
                        <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all">
                            Donate
                        </button>
                     </div>
                 </div>
             </div>
        </DemoSection>

        {/* 2. The "Swiss Grid" */}
        <DemoSection 
            title="2. Swiss Grid System" 
            desc="Строгий, архітектурний стиль. Видимі лінії сітки. Ідеально підходить для інституції з історією."
            className="bg-white"
        >
             <header className="absolute top-0 left-0 right-0 border-b border-black">
                 <div className="grid grid-cols-12 h-20 divide-x divide-black">
                     {/* Logo Area */}
                     <div className="col-span-3 lg:col-span-2 flex items-center justify-center bg-amber-500 text-white">
                         <Logo className="w-10 h-10 brightness-0 invert" />
                     </div>
                     
                     {/* Nav Area */}
                     <div className="col-span-6 lg:col-span-8 flex items-center justify-between px-8 bg-white">
                         <nav className="flex gap-8">
                            {navItems.map((item, i) => (
                                <a key={i} href={item.href} className="uppercase text-xs tracking-[0.2em] font-bold hover:text-amber-600 transition-colors">
                                    {item.label}
                                </a>
                            ))}
                         </nav>
                         <div className="text-[10px] text-gray-400 font-mono hidden xl:block uppercase">Volyn Region / Est. 1270</div>
                     </div>

                     {/* Actions */}
                     <div className="col-span-3 lg:col-span-2 flex items-center justify-center gap-4 bg-black text-white hover:bg-gray-900 cursor-pointer transition-colors group/btn">
                         <span className="text-sm font-bold uppercase tracking-wider">Menu</span>
                         <Menu className="w-5 h-5 group-hover/btn:rotate-180 transition-transform" />
                     </div>
                 </div>
             </header>
        </DemoSection>

        {/* 3. The "Glassmorphism 2.0" */}
        <DemoSection 
            title="3. Deep Glassmorphism" 
            desc="Глибоке розмиття фону. Створює відчуття преміальності та спокою. Текст контрастний."
            className="bg-[url('https://images.unsplash.com/photo-1542259659-4ab2870c2834?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
        >
             <div className="absolute inset-x-0 top-0">
                 <div className="w-full h-24 bg-gradient-to-b from-black/60 to-transparent"></div>
                 <header className="absolute top-6 left-6 right-6 h-20 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/10 flex items-center justify-between px-8 shadow-2xl">
                    <div className="flex items-center gap-4 text-white">
                        <Menu className="w-6 h-6 cursor-pointer hover:text-amber-400 transition-colors" />
                        <span className="w-px h-6 bg-white/20"></span>
                        <Logo className="w-8 h-8 brightness-0 invert" />
                    </div>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                         <span className="font-montserrat text-2xl text-white tracking-widest uppercase">Zhydychyn</span>
                    </div>

                    <a href="#" className="group flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500 text-amber-500 hover:text-white px-5 py-2 rounded-lg border border-amber-500/50 transition-all duration-300">
                        <Heart className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold uppercase tracking-wider">Підтримати</span>
                    </a>
                 </header>
             </div>
        </DemoSection>

        {/* 4. The "Minimal Sidebar" */}
        <DemoSection 
            title="4. Vertical Line" 
            desc="Навігація зміщена вліво. Звільняє горизонтальний простір для контенту."
            className="flex flex-row"
        >
             <aside className="w-24 h-full border-r border-gray-100 flex flex-col items-center py-8 bg-white z-10">
                 <Logo className="w-10 h-10 mb-12" />
                 
                 <div className="flex-1 flex flex-col items-center gap-8 w-full">
                     <div className="h-px w-8 bg-gray-200"></div>
                     <button className="p-3 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"><Search className="w-5 h-5" /></button>
                     <button className="p-3 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"><User className="w-5 h-5" /></button>
                     <button className="p-3 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"><Globe className="w-5 h-5" /></button>
                 </div>

                 <div className="mt-auto">
                    <button className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-amber-500/30 hover:scale-110 transition-transform">
                        <Menu className="w-5 h-5" />
                    </button>
                 </div>
             </aside>
             <div className="flex-1 bg-gray-50 relative p-8">
                <h3 className="font-montserrat text-4xl text-gray-200 uppercase">Page Content</h3>
             </div>
        </DemoSection>

        {/* 5. The "Big Typography" */}
        <DemoSection 
            title="5. Typographic & Brutal" 
            desc="Меню стає частиною дизайну. Великі літери, без зайвих іконок."
            dark
        >
             <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start mix-blend-difference text-white">
                 <Logo className="w-16 h-16 brightness-0 invert" />
                 
                 <nav className="flex flex-col items-end gap-1">
                     {['Про нас', 'Історія', 'Проєкти', 'Контакти'].map((item, i) => (
                         <a key={i} href="#" className="font-montserrat text-5xl hover:ml-4 hover:text-amber-500 transition-all duration-300 uppercase leading-[0.85] opacity-50 hover:opacity-100">
                             {item}
                         </a>
                     ))}
                 </nav>
             </header>
             <div className="absolute bottom-8 left-8 text-white/40 font-mono text-xs max-w-[200px]">
                 SCROLL TO EXPLORE THE HERITAGE IMPRINTED IN WALLS
             </div>
        </DemoSection>

        {/* 6. The "Double Layer" */}
        <DemoSection 
            title="6. Stacked Layers" 
            desc="Розділення контекстів. Верхній рівень для службового, нижній для навігації. Виглядає організовано."
            className="bg-stone-100"
        >
             <div className="w-[90%] mx-auto mt-6">
                 {/* Top Layer */}
                 <div className="bg-stone-900 text-stone-300 rounded-t-xl py-3 px-6 flex justify-between items-center text-xs tracking-wider uppercase">
                     <div className="flex gap-4">
                         <span>Пн-Нд: 08:00 - 20:00</span>
                         <span className="text-amber-500">Сьогодні відкрито</span>
                     </div>
                     <div className="flex gap-4">
                         <span className="hover:text-white cursor-pointer transition-colors">Facebook</span>
                         <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
                     </div>
                 </div>
                 
                 {/* Main Layer */}
                 <header className="bg-white rounded-b-xl shadow-xl py-5 px-8 flex items-center justify-between">
                     <Logo className="w-12 h-12" />
                     
                     <nav className="hidden md:flex items-center gap-1 bg-stone-50 p-1 rounded-lg">
                         {navItems.map((item, i) => (
                             <a key={i} href={item.href} className="px-6 py-2 rounded-md hover:bg-white hover:shadow-sm text-sm font-semibold text-stone-700 transition-all">
                                 {item.label}
                             </a>
                         ))}
                     </nav>

                     <button className="bg-amber-500 text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors">
                         Пожертва
                     </button>
                 </header>
             </div>
        </DemoSection>

        {/* 7. The "Split Corner" */}
        <DemoSection 
            title="7. Corner Navigation" 
            desc="Елементи розкидані по кутах екрану. Максимально звільняє центр."
            className="bg-[url('https://images.unsplash.com/photo-1548625361-9872e45da808?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center"
        >
             <div className="absolute inset-0 bg-black/30"></div>
             
             {/* Top Left */}
             <div className="absolute top-8 left-8">
                 <div className="bg-white p-4 rounded-se-2xl rounded-bl-2xl shadow-lg">
                    <Logo className="w-12 h-12" />
                 </div>
             </div>

             {/* Top Right */}
             <div className="absolute top-8 right-8">
                 <button className="bg-amber-500 hover:bg-amber-600 text-white w-16 h-16 rounded-full flex items-center justify-center transition-all hover:rotate-90 shadow-lg glow">
                     <Menu className="w-8 h-8" />
                 </button>
             </div>

             {/* Bottom Center - Optional Text */}
             <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white">
                 <p className="font-montserrat text-4xl tracking-widest drop-shadow-md">MONASTERY</p>
             </div>
        </DemoSection>

        {/* 8. The "App Bar" */}
        <DemoSection 
            title="8. Bottom App Bar" 
            desc="Інтерфейс як у мобільному додатку. Зручно для планшетів та десктопів."
            className="bg-gray-100 flex flex-col justify-end pb-8"
        >
             <div className="w-[600px] mx-auto bg-white rounded-3xl p-2 shadow-2xl flex items-center justify-between ring-1 ring-black/5">
                 <div className="flex items-center gap-1">
                     <a href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                         <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                     </a>
                     {navItems.map((item, i) => (
                         <a key={i} href={item.href} className="px-6 py-3 rounded-2xl text-sm font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all">
                             {item.label}
                         </a>
                     ))}
                 </div>
                 
                 <button className="bg-black text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
                     Action <ArrowRight className="w-4 h-4" />
                 </button>
             </div>
        </DemoSection>

        {/* 9. The "Mega Magazine" */}
        <DemoSection 
            title="9. Magazine Header" 
            desc="Великий білий простір, чітка ієрархія. Класика в сучасній обробці."
            className="bg-white"
        >
             <header className="absolute top-0 left-0 right-0">
                 <div className="border-b border-gray-100 py-6 text-center">
                      <h1 className="font-montserrat text-5xl tracking-tight text-gray-900">ZHYDYCHYN</h1>
                 </div>
                 <div className="border-b border-gray-100 py-3 flex justify-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
                     <nav className="flex items-center gap-12">
                         {navItems.map((item, i) => (
                             <a key={i} href={item.href} className="font-sans text-sm uppercase tracking-widest font-bold text-gray-900 hover:text-amber-600 relative group overflow-hidden">
                                 {item.label}
                                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                             </a>
                         ))}
                         <span className="w-px h-4 bg-gray-300"></span>
                         <Search className="w-4 h-4 text-gray-400 hover:text-gray-900 cursor-pointer" />
                     </nav>
                 </div>
             </header>
        </DemoSection>

        {/* 10. The "Interactive Pill" */}
        <DemoSection 
            title="10. Liquid Navigation" 
            desc="Інтерактивна навігація, що реагує на курсор. Плавні форми."
            className="bg-slate-900 text-white"
            dark
        >
             <header className="absolute top-8 right-8 left-8 flex justify-between items-center">
                 <Logo className="w-12 h-12 brightness-0 invert" />

                 <nav className="bg-white/10 backdrop-blur-md rounded-full p-1 pl-2 flex gap-1 border border-white/5 shadow-2xl">
                     {navItems.map((item, i) => (
                         <a key={i} href={item.href} className="relative z-10 px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                             {item.label}
                         </a>
                     ))}
                     <a href="#" className="relative z-10 px-8 py-3 bg-amber-500 rounded-full text-sm font-bold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all">
                        Support
                     </a>
                 </nav>
             </header>
        </DemoSection>

    </main>
  );
}
