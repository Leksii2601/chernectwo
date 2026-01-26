'use client';

import React from 'react';
import Image from 'next/image';
import { Menu, MessageSquarePlus, ChevronDown, MapPin, Clock } from 'lucide-react';
import { clsx } from 'clsx';

// Real navigation items from the main site
const NAV_ITEMS = [
  {
    label: 'Про монастир',
    href: '/about',
    hasDropdown: true,
  },
  {
    label: 'Новини',
    href: '/news',
    hasDropdown: true,
  },
  { label: 'Соціальні проєкти', href: '/social-projects' },
  { label: 'Паломнику', href: '/pilgrims' },
  { label: 'Підтримати', href: '/donate', isSpecial: true },
  { label: 'Контакти', href: '/contacts' },
];

const Logo = ({ className }: { className?: string }) => (
    <div className={clsx("relative flex items-center justify-center", className || "w-12 h-12")}>
        <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
    </div>
);

// Wrapper to simulate the header environment
const DemoSection = ({ title, desc, children, className = "bg-white", dark = false }: { title: string, desc: string, children: React.ReactNode, className?: string, dark?: boolean }) => (
    <section className="mb-32 scroll-mt-24 group border border-gray-100 rounded-3xl overflow-hidden shadow-sm" id={title.toLowerCase().replace(/\s/g, '-')}>
        <div className="bg-white p-8 border-b border-gray-100">
            <div className="flex items-baseline gap-4">
                <span className="text-amber-500 font-mono text-sm font-bold bg-amber-50 px-2 py-1 rounded">0{title.split('.')[0]}</span>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">{title.split('. ')[1]}</h2>
                    <p className="text-gray-500 font-sans text-sm mt-2 max-w-2xl">{desc}</p>
                </div>
            </div>
        </div>
        
        <div className={clsx(
            "relative w-full h-[400px] overflow-hidden transition-all duration-500", 
            className,
            dark ? "bg-[#0a0a0a]" : "bg-gray-50"
        )}>
             {children}
             
             {/* Background Context Hints */}
             <div className={clsx("absolute inset-0 z-0 flex flex-col items-center justify-center pt-32 pointer-events-none opacity-10", dark ? "grayscale invert" : "")}>
                <div className="w-64 h-4 bg-gray-400 rounded-full mb-4"></div>
                <div className="w-96 h-4 bg-gray-300 rounded-full mb-4"></div>
                <div className="w-80 h-4 bg-gray-300 rounded-full"></div>
             </div>
        </div>
    </section>
);

export default function HeaderVariationsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-12 max-w-[1600px] mx-auto font-sans">
        <header className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="font-bold text-4xl md:text-5xl mb-6 text-gray-900">Header Variations</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
                Варіанти дизайну шапки сайту з урахуванням повного набору навігації та новим функціоналом 
                <span className="inline-block mx-2 px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-base font-semibold">Написати записку</span>.
            </p>
        </header>

        {/* 1. Classic Extended */}
        <DemoSection 
            title="1. Classic Augmented" 
            desc="Класичне розташування з акцентом на дії. Кнопки 'Написати записку' та 'Підтримати' виділені в окремий блок справа."
            className="bg-white"
        >
             <header className="absolute top-0 left-0 right-0 py-6 px-8 flex items-center justify-between bg-white/95 backdrop-blur-sm shadow-sm z-10 transition-all duration-300">
                 {/* Logo */}
                 <div className="flex items-center gap-3">
                     <Logo className="w-12 h-12" />
                     <div className="hidden xl:block">
                         <div className="font-bold text-gray-900 leading-none tracking-wide text-lg">ZHYDYCHYN</div>
                         <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Monastery</div>
                     </div>
                 </div>

                 {/* Nav */}
                 <nav className="hidden lg:flex items-center gap-6">
                     {NAV_ITEMS.filter(i => !i.isSpecial).map((item, i) => (
                         <div key={i} className="group relative flex items-center gap-1 cursor-pointer py-2">
                             <a href={item.href} className="text-sm font-semibold text-gray-600 group-hover:text-amber-600 transition-colors uppercase tracking-wide">
                                 {item.label}
                             </a>
                             {item.hasDropdown && <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-amber-600 mt-0.5" />}
                         </div>
                     ))}
                 </nav>

                 {/* Actions */}
                 <div className="flex items-center gap-3">
                     <a href="/prayer-requests" className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-amber-500 hover:text-amber-600 text-gray-700 transition-all text-sm font-semibold group bg-gray-50 hover:bg-white">
                         <MessageSquarePlus className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
                         <span>Написати записку</span>
                     </a>
                     <a href="/donate" className="hidden sm:flex px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 transition-all text-sm font-bold tracking-wide uppercase">
                         Підтримати
                     </a>
                 </div>
             </header>
        </DemoSection>

        {/* 2. Modern Pill */}
        <DemoSection 
            title="2. The Floating Capsule" 
            desc="Сучасний тренд. Навігація зібрана в плаваючу капсулу. Економить простір, фокусує увагу. Ідеально для прозорого хедеру на головній."
            className="bg-[url('https://images.unsplash.com/photo-1519681393798-382879e34bd3?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center"
        >
             <div className="absolute top-8 left-0 right-0 flex justify-center z-10 px-4">
                 <div className="bg-white/90 backdrop-blur-xl border border-white/40 pl-2 pr-2 py-2 rounded-full shadow-2xl shadow-black/10 flex items-center gap-1 max-w-full overflow-x-auto">
                     {/* Logo Icon */}
                     <div className="bg-gray-50 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center mr-2">
                        <Logo className="w-6 h-6" />
                     </div>
                     
                     {/* Nav Links */}
                     <nav className="hidden md:flex items-center">
                         {NAV_ITEMS.filter(i => !i.isSpecial).map((item, i) => (
                             <a key={i} href={item.href} className="px-4 py-2 rounded-full text-xs font-bold text-gray-800 hover:bg-black/5 transition-all whitespace-nowrap uppercase tracking-wider">
                                 {item.label}
                             </a>
                         ))}
                     </nav>

                     {/* Divider */}
                     <div className="w-px h-6 bg-gray-300 mx-2 hidden md:block"></div>

                     {/* Actions */}
                     <div className="flex items-center gap-1">
                        <a href="/prayer-requests" className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs font-bold whitespace-nowrap">
                             <MessageSquarePlus className="w-3.5 h-3.5" />
                             <span className="hidden sm:inline">Записка</span>
                        </a>
                        <a href="/donate" className="flex items-center justify-center px-5 py-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors text-xs font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
                            Підтримати
                        </a>
                         <button className="w-10 h-10 rounded-full flex md:hidden items-center justify-center hover:bg-gray-100 transition-colors text-gray-700">
                             <Menu className="w-5 h-5" />
                        </button>
                     </div>
                 </div>
             </div>
        </DemoSection>

        {/* 3. Utility Split */}
        <DemoSection 
            title="3. Utility Split" 
            desc="Розділення на два рівні. Верхній - для контактів та записок (утилітарний), нижній - для брендингу та навігації. Дуже організовано."
            className="bg-gray-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
        >
            <div className="w-full bg-white shadow-sm z-10 relative">
                {/* Top Bar */}
                <div className="bg-slate-900 text-slate-300 border-b border-white/5 py-2 px-8 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors max-md:hidden">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            вул. Данила Галицького, 16, Жидичин
                        </span>
                        <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            Сьогодні: 08:00 - 20:00
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="/prayer-requests" className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium">
                            <MessageSquarePlus className="w-3.5 h-3.5" />
                            Написати записку
                        </a>
                        <span className="w-px h-3 bg-slate-700"></span>
                        <div className="flex gap-3">
                            <span className="hover:text-white cursor-pointer">FB</span>
                            <span className="hover:text-white cursor-pointer">IG</span>
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <header className="py-4 px-8 flex items-center justify-between">
                     <div className="flex items-center gap-12">
                         <div className="flex items-center gap-3">
                             <Logo className="w-14 h-14" />
                             <div className="hidden xl:block">
                                <span className="block font-bold text-gray-900 leading-none text-lg uppercase tracking-widest">Monastery</span>
                             </div>
                         </div>
                         
                         <nav className="hidden xl:flex items-center gap-8">
                             {NAV_ITEMS.map((item, i) => (
                                 <a key={i} href={item.href} className={clsx(
                                     "text-sm font-bold uppercase tracking-wider transition-colors py-2 border-b-2 border-transparent",
                                     item.isSpecial ? "text-amber-600 hover:text-amber-700" : "text-gray-800 hover:text-amber-600 hover:border-amber-600"
                                 )}>
                                     {item.label}
                                 </a>
                             ))}
                         </nav>
                     </div>

                     <div className="flex items-center gap-6">
                         <div className="hidden lg:flex flex-col items-end">
                             <a href="tel:+380981234567" className="text-lg font-bold text-gray-900 leading-none hover:text-amber-600 transition-colors">+380 98 123 45 67</a>
                             <span className="text-[10px] uppercase tracking-widest text-gray-500">Call Center</span>
                         </div>
                         <a href="/donate" className="bg-amber-500 text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-[0.15em] hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/30">
                             Пожертва
                         </a>
                         <button className="xl:hidden p-2 text-gray-800">
                             <Menu className="w-6 h-6" />
                         </button>
                     </div>
                </header>
            </div>
        </DemoSection>

        {/* 4. Minimal Sidebar Style (Horizontal) */}
        <DemoSection 
            title="4. Clean Minimal" 
            desc="Мінімалізм. Логотип зліва, навігація в окремому блоці. Максимальна 'повітряність'."
            className="bg-white"
        >
             <header className="absolute inset-x-0 top-0 p-6 md:p-10 flex items-center justify-between z-10 transition-all">
                 <div className="flex items-center gap-4">
                    <Logo className="w-12 h-12" />
                 </div>

                 <div className="flex items-center bg-white/50 backdrop-blur-md rounded-2xl p-1.5 pr-2 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                     <nav className="hidden lg:flex px-4 gap-6">
                         {NAV_ITEMS.filter(i => !i.isSpecial).map((item, i) => (
                             <a key={i} href={item.href} className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group">
                                 {item.label}
                                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
                             </a>
                         ))}
                     </nav>
                     
                     <div className="flex items-center gap-2 pl-6 border-l border-gray-200 ml-2">
                         <a href="/prayer-requests" className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:border-amber-500 hover:text-amber-500 transition-all group relative" title="Написати записку">
                            <MessageSquarePlus className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                         </a>
                         <a href="/donate" className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-500 transition-colors shadow-lg shadow-gray-900/10">
                             Donate
                         </a>
                         <button className="lg:hidden w-10 h-10 flex items-center justify-center">
                             <Menu className="w-5 h-5 text-gray-600" />
                         </button>
                     </div>
                 </div>
             </header>
        </DemoSection>

    </main>
  );
}
