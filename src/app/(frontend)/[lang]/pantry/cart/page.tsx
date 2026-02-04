'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { PantryHeader } from '@/components/pantry/PantryHeader';
import { PantryFooter } from '@/components/pantry/PantryFooter';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ChevronLeft, ShieldCheck } from 'lucide-react';

export default function CartPage() {
    const { language } = useLanguage();
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const lang = language.toLowerCase();

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
                            {language === 'EN' ? 'Shopping Cart' : 'Ваш Кошик'}
                        </h1>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b49e82]">
                        {cart.length} {language === 'EN' ? 'Product Types' : 'Різновиди товарів'}
                    </div>
                </div>

                {cart.length === 0 ? (
                    <div className="text-center py-32 bg-white border border-[#e8e4db] rounded-sm shadow-sm">
                        <ShoppingBag size={64} className="mx-auto text-[#f3f1ed] mb-8" />
                        <h2 className="font-kyiv text-3xl text-[#4a3f35] mb-4">
                            {language === 'EN' ? 'Your cart is empty' : 'Ваш кошик порожній'}
                        </h2>
                        <p className="text-[#8c7e6a] mb-12 max-w-md mx-auto">
                            {language === 'EN'
                                ? 'Looks like you haven\'t added anything yet. Discover our unique monastic products in the pantry.'
                                : 'Схоже, ви ще нічого не додали до кошика. Ознайомтеся з унікальними монастирськими виробами в нашій коморі.'}
                        </p>
                        <Link href={`/${lang}/pantry`} className="inline-flex px-12 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#b49e82] transition-colors rounded-sm shadow-lg shadow-black/5">
                            {language === 'EN' ? 'Explore Store' : 'До Комори'}
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* List of Items */}
                        <div className="flex-1 space-y-6">
                            {cart.map(item => (
                                <div key={item.id} className="bg-white border border-[#e8e4db] p-6 rounded-sm shadow-sm flex flex-col md:flex-row gap-8">
                                    <Link href={`/${lang}/pantry/${item.id}`} className="w-full md:w-32 aspect-square relative bg-[#fafafa]/50 rounded-sm overflow-hidden shrink-0">
                                        <Image src={item.image} alt={item.title} fill className="object-contain p-4" />
                                    </Link>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start gap-4 mb-2">
                                                <h3 className="font-kyiv text-xl text-[#4a3f35] hover:text-[#b49e82] transition-colors">
                                                    <Link href={`/${lang}/pantry/${item.id}`}>{item.title}</Link>
                                                </h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-[#d8d4cb] hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-[#b49e82] uppercase tracking-widest font-black mb-1">
                                                {item.sku}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-8 md:mt-0">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center border border-[#e8e4db] rounded-sm bg-[#fafafa]">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="p-3 text-[#8c7e6a] hover:text-black transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-12 text-center text-sm font-bold text-[#4a3f35]">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-3 text-[#8c7e6a] hover:text-black transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <div className="text-xl font-sans font-light text-[#4a3f35]">
                                                {item.price * item.quantity} ₴
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-[400px] shrink-0">
                            <div className="bg-white border border-[#e8e4db] p-8 rounded-sm shadow-lg sticky top-32 space-y-8">
                                <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-[#b49e82] border-b border-gray-50 pb-4">
                                    {language === 'EN' ? 'Order Summary' : 'Підсумок замовлення'}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm text-[#8c7e6a]">
                                        <span>{language === 'EN' ? 'Subtotal' : 'Сума товарів'}</span>
                                        <span>{cartTotal} ₴</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-[#8c7e6a]">
                                        <span>{language === 'EN' ? 'Shipping' : 'Доставка'}</span>
                                        <span className="text-black font-medium">{language === 'EN' ? 'Calculated on next step' : 'За тарифами перевізника'}</span>
                                    </div>
                                    <div className="pt-6 border-t border-gray-50 flex justify-between items-baseline">
                                        <span className="text-lg font-kyiv text-[#4a3f35]">{language === 'EN' ? 'Total' : 'Разом'}</span>
                                        <span className="text-3xl font-sans font-light text-black">{cartTotal} ₴</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/${lang}/pantry/checkout`}
                                    className="flex w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#b49e82] transition-all items-center justify-center gap-4 rounded-sm shadow-xl shadow-black/5"
                                >
                                    {language === 'EN' ? 'Proceed to Checkout' : 'Оформити Замовлення'}
                                    <ArrowRight size={16} />
                                </Link>

                                <div className="bg-[#fafafa] p-4 border border-[#f3f1ed] rounded-sm flex gap-4">
                                    <ShieldCheck size={24} className="text-green-600 shrink-0" />
                                    <p className="text-[10px] text-[#8c7e6a] leading-relaxed uppercase tracking-wider font-bold">
                                        {language === 'EN'
                                            ? 'Safe & Secure checkout. Your data is protected by industry standard encryption.'
                                            : 'Безпечне оформлення. Ваші дані захищені сучасними протоколами шифрування.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <PantryFooter />
        </main>
    );
}
