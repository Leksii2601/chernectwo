'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

export default function CartPage() {
    const { t, language } = useLanguage();
    const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();
    const lang = language.toLowerCase();

    return (
        <main className="bg-white min-h-screen">
            <div className="bg-black">
                <Header variant="burger" />
            </div>

            <PageHeader title="Ваш Кошик" subtitle="Перевірте обрані товари перед оформленням" backgroundImage="/media/pantry/book_history.jpg" />

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-24">
                {cart.length === 0 ? (
                    <div className="text-center py-24 border-2 border-dashed border-gray-100 rounded-sm">
                        <ShoppingBag size={64} className="mx-auto text-gray-200 mb-8" />
                        <h2 className="font-kyiv text-3xl mb-4">Кошик поки що порожній</h2>
                        <p className="text-gray-400 mb-12">Здається, ви ще не додали жодного товару до кошика.</p>
                        <Link href={`/${lang}/pantry`} className="px-12 py-5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors">
                            Перейти до Комори
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Items List */}
                        <div className="flex-1">
                            <div className="border-t border-gray-100">
                                {cart.map(item => (
                                    <div key={item.id} className="flex flex-col md:flex-row items-center gap-8 py-10 border-b border-gray-100 group">
                                        <Link href={`/${lang}/pantry/${item.id}`} className="w-32 h-40 bg-gray-50 relative shrink-0 overflow-hidden">
                                            <Image src={item.image} alt={item.title} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
                                        </Link>

                                        <div className="flex-1 min-w-0 text-center md:text-left">
                                            <h3 className="font-kyiv text-xl mb-2">{item.title}</h3>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">{'author' in item ? item.author : t(`pantry.category.${item.category}`)}</p>
                                            <p className="text-lg font-sans font-light">{item.price} ₴</p>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center border border-gray-200 rounded-full px-4 py-2">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-amber-600 transition-colors"><Minus size={14} /></button>
                                                <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-amber-600 transition-colors"><Plus size={14} /></button>
                                            </div>

                                            <div className="text-right min-w-[100px]">
                                                <p className="font-bold text-lg">{item.price * item.quantity} ₴</p>
                                            </div>

                                            <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary Block */}
                        <div className="w-full lg:w-[400px]">
                            <div className="bg-gray-50 p-8 md:p-12 sticky top-32">
                                <h3 className="font-kyiv text-2xl mb-10">Підсумок</h3>

                                <div className="space-y-4 mb-10 pb-10 border-b border-gray-200">
                                    <div className="flex justify-between text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                                        <span>Кількість товарів</span>
                                        <span>{cart.length}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                                        <span>Вартість</span>
                                        <span>{cartTotal} ₴</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                                        <span>Доставка</span>
                                        <span className="text-black">За тарифами НП</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-12">
                                    <span className="font-kyiv text-xl">Разом</span>
                                    <span className="font-sans text-3xl font-light">{cartTotal} ₴</span>
                                </div>

                                <Link
                                    href={`/${lang}/pantry/checkout`}
                                    className="w-full bg-black text-white px-8 py-6 text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-all flex items-center justify-center gap-4 group shadow-xl shadow-black/10"
                                >
                                    Оформити замовлення
                                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                </Link>

                                <Link href={`/${lang}/pantry`} className="block text-center mt-6 text-gray-400 hover:text-black text-[10px] font-bold uppercase tracking-widest transition-colors">
                                    Продовжити покупки
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
