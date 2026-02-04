'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart, Search, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { clsx } from 'clsx';

interface PantryHeaderProps {
    isProductPage?: boolean;
}

export function PantryHeader({ isProductPage = false }: PantryHeaderProps) {
    const { language, t } = useLanguage();
    const { cart, wishlist } = useCart();
    const lang = language.toLowerCase();

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] bg-[#f8f5f0]/90 backdrop-blur-md border-b border-[#e8e4db] h-16 md:h-20 shadow-sm transition-all">
            <div className="max-w-[1920px] mx-auto h-full px-4 md:px-8 flex items-center justify-between gap-2">

                {/* Left: Home Button */}
                <div className="flex items-center lg:w-1/3 gap-2 md:gap-4 shrink-0">
                    <Link
                        href={`/${lang}`}
                        className="flex items-center gap-2 text-[#8c7e6a] hover:text-black transition-colors group"
                        title={language === 'EN' ? 'Website Home' : 'На головну сайту'}
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#d8d4cb] flex items-center justify-center group-hover:bg-[#d8d4cb] transition-all">
                            <Home size={16} className="md:w-[18px] md:h-[18px]" />
                        </div>
                    </Link>

                    {isProductPage && (
                        <Link
                            href={`/${lang}/pantry`}
                            className="flex items-center gap-2 text-[#b49e82] hover:text-black transition-colors group border-l border-[#e8e4db] pl-2 md:pl-4"
                        >
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] hidden sm:inline">
                                {language === 'EN' ? 'Store' : 'Комора'}
                            </span>
                        </Link>
                    )}
                </div>

                {/* Center: Branding */}
                <div className="flex justify-center flex-1 lg:w-1/3 shrink-0">
                    <Link href={`/${lang}/pantry`} className="flex items-center gap-2 md:gap-3 group">
                        <div className="w-7 h-7 md:w-10 md:h-10 relative">
                            <Image 
                                src="/media/logo.webp" 
                                alt="Logo" 
                                fill 
                                className="object-contain transition-transform group-hover:scale-105 filter grayscale-[1] brightness-0 contrast-200" 
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-church text-lg md:text-2xl leading-none tracking-tight text-[#4a3f35] group-hover:text-black transition-colors">КОМОРА</span>
                            <span className="text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#b49e82]">Жидичин</span>
                        </div>
                    </Link>
                </div>

                {/* Right: Search & Cart */}
                <div className="flex items-center justify-end gap-1 md:gap-6 lg:w-1/3 shrink-0">
                    <button className="p-2 md:p-2.5 text-[#8c7e6a] hover:text-black hover:bg-[#ece8df] rounded-full transition-all hidden sm:block">
                        <Search size={18} />
                    </button>

                    <Link href={`/${lang}/pantry/wishlist`} className="relative p-2 text-[#8c7e6a] hover:text-black transition-colors">
                        <Heart size={20} className={clsx("w-[18px] h-[18px] md:w-5 md:h-5", wishlist.length > 0 && "text-red-500 fill-red-500")} />
                        {wishlist.length > 0 && (
                            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-black text-white text-[8px] font-black rounded-full flex items-center justify-center scale-75 md:scale-100">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>

                    <Link href={`/${lang}/pantry/cart`} className="relative p-2 text-[#8c7e6a] hover:text-black transition-colors">
                        <ShoppingBag size={20} className="w-[18px] h-[18px] md:w-5 md:h-5" />
                        {cart.length > 0 && (
                            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#b49e82] text-black text-[8px] font-black rounded-full flex items-center justify-center scale-75 md:scale-100">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
