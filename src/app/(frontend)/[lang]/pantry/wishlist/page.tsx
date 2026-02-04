'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { PantryHeader } from '@/components/pantry/PantryHeader';
import { PantryFooter } from '@/components/pantry/PantryFooter';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ChevronLeft } from 'lucide-react';
import { pantryProducts } from '@/data/pantryData';

export default function WishlistPage() {
    const { language } = useLanguage();
    const { wishlist, toggleWishlist, addToCart } = useCart();
    const lang = language.toLowerCase();

    const wishlistItems = pantryProducts.filter(p => wishlist.includes(p.id));

    return (
        <main className="bg-[#fcfaf7] min-h-screen overflow-x-hidden pt-20">
            <PantryHeader />

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#e8e4db] pb-10">
                    <div className="space-y-4">
                        <Link href={`/${lang}/pantry`} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b49e82] hover:text-black transition-colors group">
                            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            {language === 'EN' ? 'Back to Store' : 'Назад до комори'}
                        </Link>
                        <h1 className="font-kyiv text-4xl md:text-5xl text-[#4a3f35]">
                            {language === 'EN' ? 'Wishlist' : 'Список Бажаного'}
                        </h1>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b49e82]">
                        {wishlistItems.length} {language === 'EN' ? 'Items' : 'Товарів'}
                    </div>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-32 bg-white border border-[#e8e4db] rounded-sm shadow-sm">
                        <Heart size={64} className="mx-auto text-[#f3f1ed] mb-8" />
                        <h2 className="font-kyiv text-3xl text-[#4a3f35] mb-4">
                            {language === 'EN' ? 'Your wishlist is empty' : 'Ваш список бажаного порожній'}
                        </h2>
                        <p className="text-[#8c7e6a] mb-12 max-w-md mx-auto">
                            {language === 'EN'
                                ? 'Add products you like to find them easily later and keep track of your favorites.'
                                : 'Додавайте товари, які вам сподобались, щоб не загубити їх та легко повернутися до них пізніше.'}
                        </p>
                        <Link href={`/${lang}/pantry`} className="inline-flex px-12 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#b49e82] transition-colors rounded-sm shadow-lg shadow-black/5">
                            {language === 'EN' ? 'Explore Store' : 'До Комори'}
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {wishlistItems.map(item => (
                            <div key={item.id} className="group bg-white border border-[#e8e4db] rounded-sm overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
                                <Link href={`/${lang}/pantry/${item.id}`} className="relative aspect-[4/5] bg-[#fafafa]/50 overflow-hidden block">
                                    <Image src={item.image} alt={item.title} fill className="object-contain p-8 transition-transform duration-1000 group-hover:scale-105" />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleWishlist(item.id);
                                        }}
                                        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white border border-[#e8e4db] rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                                        title={language === 'EN' ? 'Remove' : 'Видалити'}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </Link>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="mb-4 space-y-1">
                                        <h3 className="font-kyiv text-lg leading-tight text-[#4a3f35] line-clamp-2 min-h-[3rem] group-hover:text-[#b49e82] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-[9px] text-[#b49e82] uppercase tracking-widest font-black">
                                            {'author' in item ? item.author : item.category}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-[#f3f1ed] flex flex-col gap-4">
                                        <div className="text-xl font-sans font-light text-[#4a3f35]">{item.price} ₴</div>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="w-full bg-black text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#b49e82] transition-all flex items-center justify-center gap-3 rounded-sm shadow-lg shadow-black/5"
                                        >
                                            <ShoppingBag size={14} />
                                            {language === 'EN' ? 'Add to Cart' : 'До Кошика'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <PantryFooter />
        </main>
    );
}
