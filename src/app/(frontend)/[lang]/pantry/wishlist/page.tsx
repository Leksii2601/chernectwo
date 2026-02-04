'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { pantryProducts } from '@/data/pantryData';

export default function WishlistPage() {
    const { t, language } = useLanguage();
    const { wishlist, toggleWishlist, addToCart } = useCart();
    const lang = language.toLowerCase();

    const wishlistItems = pantryProducts.filter(p => wishlist.includes(p.id));

    return (
        <main className="bg-white min-h-screen">
            <div className="bg-black">
                <Header variant="burger" />
            </div>

            <PageHeader
                title="Список Бажаного"
                subtitle="Збережіть те, що припало до душі"
                backgroundImage="/media/history.jpg"
            />

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-24">
                {wishlistItems.length === 0 ? (
                    <div className="text-center py-32 border-2 border-dashed border-gray-100 rounded-sm">
                        <Heart size={64} className="mx-auto text-gray-100 mb-8" />
                        <h2 className="font-kyiv text-3xl mb-4">Ваш список бажаного порожній</h2>
                        <p className="text-gray-400 mb-12">Додавайте товари, які вам сподобались, щоб не загубити їх.</p>
                        <Link href={`/${lang}/pantry`} className="px-12 py-5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors">
                            Перейти до Комори
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {wishlistItems.map(item => (
                            <div key={item.id} className="group flex flex-col border-b border-gray-100 pb-12">
                                <Link href={`/${lang}/pantry/${item.id}`} className="relative aspect-[4/5] bg-gray-50 mb-8 overflow-hidden">
                                    <Image src={item.image} alt={item.title} fill className="object-contain p-8 group-hover:scale-110 transition-transform duration-1000" />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleWishlist(item.id);
                                        }}
                                        className="absolute top-6 right-6 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-500 shadow-xl opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </Link>

                                <div className="flex-1 text-center">
                                    <h3 className="font-kyiv text-2xl mb-2">{item.title}</h3>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">{item.sku}</p>
                                    <p className="text-xl font-light mb-8">{item.price} ₴</p>

                                    <div className="flex flex-col gap-4">
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-all flex items-center justify-center gap-3"
                                        >
                                            <ShoppingBag size={16} />
                                            Додати до кошика
                                        </button>
                                        <Link
                                            href={`/${lang}/pantry/${item.id}`}
                                            className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors"
                                        >
                                            Детальніше
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
