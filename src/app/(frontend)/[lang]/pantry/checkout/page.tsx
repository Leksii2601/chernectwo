'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ShoppingBag } from 'lucide-react';
import { clsx } from 'clsx';

export default function CheckoutPage() {
    const { t, language } = useLanguage();
    const { cart, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        address: '',
        paymentMethod: 'card'
    });

    if (cart.length === 0 && step !== 3) {
        return (
            <main className="bg-white min-h-screen pt-32 text-center">
                <Header variant="burger" />
                <div className="max-w-md mx-auto py-24">
                    <ShoppingBag size={64} className="mx-auto text-gray-200 mb-8" />
                    <h1 className="font-kyiv text-3xl mb-4">Ваш кошик порожній</h1>
                    <Link href={`/${language.toLowerCase()}/pantry`} className="text-amber-600 uppercase tracking-widest font-bold text-xs hover:underline">
                        Повернутися до покупок
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="bg-gray-50 min-h-screen">
            <div className="bg-black">
                <Header variant="burger" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-24 md:py-32 flex flex-col lg:flex-row gap-16">

                {/* LEFT: Checkout Form */}
                <div className="flex-1 space-y-12">
                    <div className="flex items-center gap-10">
                        <div className={clsx("flex items-center gap-3", step === 1 ? "text-black" : "text-gray-300")}>
                            <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold text-xs">1</span>
                            <span className="font-bold text-xs uppercase tracking-widest">Контакти</span>
                        </div>
                        <div className="w-12 h-px bg-gray-200" />
                        <div className={clsx("flex items-center gap-3", step === 2 ? "text-black" : "text-gray-300")}>
                            <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold text-xs">2</span>
                            <span className="font-bold text-xs uppercase tracking-widest">Доставка та Оплата</span>
                        </div>
                    </div>

                    {step === 1 ? (
                        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 animate-fadeIn">
                            <h2 className="font-kyiv text-2xl mb-8">Контактні дані</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Ім'я" value={formData.firstName} onChange={(v) => setFormData({ ...formData, firstName: v })} />
                                <Input label="Прізвище" value={formData.lastName} onChange={(v) => setFormData({ ...formData, lastName: v })} />
                                <Input label="Телефон" value={formData.phone} placeholder="+380" onChange={(v) => setFormData({ ...formData, phone: v })} />
                                <Input label="Email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
                            </div>
                            <button
                                onClick={() => setStep(2)}
                                className="mt-12 w-full md:w-auto px-12 py-5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors"
                            >
                                Продовжити
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 animate-fadeIn">
                            <h2 className="font-kyiv text-2xl mb-8">Доставка</h2>
                            <div className="grid grid-cols-1 gap-6 mb-12">
                                <Input label="Місто" value={formData.city} onChange={(v) => setFormData({ ...formData, city: v })} />
                                <Input label="Адреса або відділення Нової Пошти" value={formData.address} onChange={(v) => setFormData({ ...formData, address: v })} />
                            </div>

                            <h2 className="font-kyiv text-2xl mb-8">Оплата</h2>
                            <div className="space-y-4">
                                <PaymentOption
                                    id="card"
                                    icon={<CreditCard size={20} />}
                                    title="Оплата карткою (LiqPay)"
                                    active={formData.paymentMethod === 'card'}
                                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                                />
                                <PaymentOption
                                    id="cash"
                                    icon={<Truck size={20} />}
                                    title="Оплата при отриманні"
                                    active={formData.paymentMethod === 'cash'}
                                    onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                                />
                            </div>

                            <div className="flex items-center justify-between mt-12 gap-4">
                                <button onClick={() => setStep(1)} className="text-gray-400 hover:text-black transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                    <ChevronLeft size={16} /> Назад
                                </button>
                                <button
                                    onClick={() => {
                                        clearCart();
                                        window.location.href = `/${language.toLowerCase()}/pantry/success`;
                                    }}
                                    className="px-12 py-5 bg-amber-600 text-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl shadow-amber-600/20"
                                >
                                    Оформити замовлення
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT: Order Summary */}
                <div className="w-full lg:w-[400px] shrink-0">
                    <div className="bg-white p-8 border border-gray-100 sticky top-32">
                        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                            <h3 className="font-bold text-xs uppercase tracking-widest">Ваше замовлення</h3>
                            <span className="text-gray-400 text-xs">{cart.length} товари</span>
                        </div>

                        <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-4 no-scrollbar">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-16 h-16 bg-gray-50 relative shrink-0">
                                        <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold truncate mb-1">{item.title}</h4>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-400">{item.quantity} x {item.price} ₴</span>
                                            <span className="text-sm font-medium">{item.price * item.quantity} ₴</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 border-t border-gray-100 pt-6">
                            <div className="flex justify-between text-gray-500 text-sm">
                                <span>Сума замовлення</span>
                                <span>{cartTotal} ₴</span>
                            </div>
                            <div className="flex justify-between text-gray-500 text-sm">
                                <span>Доставка</span>
                                <span className="text-black font-bold">За тарифами перевізника</span>
                            </div>
                            <div className="flex justify-between text-black font-bold text-lg pt-3">
                                <span>Разом</span>
                                <span>{cartTotal} ₴</span>
                            </div>
                        </div>

                        <div className="mt-8 bg-gray-50 p-4 rounded-sm flex gap-4">
                            <ShieldCheck size={24} className="text-green-600 shrink-0" />
                            <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider font-medium">Ваші платежі захищені та безпечні. Дані замовлення передаються в зашифрованому вигляді.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

function Input({ label, value, onChange, placeholder = '' }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border-b border-gray-200 py-3 text-sm focus:border-amber-500 outline-none transition-all placeholder:text-gray-200"
            />
        </div>
    );
}

function PaymentOption({ id, icon, title, active, onClick }: { id: string, icon: React.ReactNode, title: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "w-full flex items-center justify-between p-6 border transition-all text-left",
                active ? "border-black bg-black text-white shadow-xl translate-y-[-2px]" : "border-gray-100 hover:border-gray-300"
            )}
        >
            <div className="flex items-center gap-4">
                <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center", active ? "bg-white/10" : "bg-gray-100")}>
                    {icon}
                </div>
                <span className="text-sm font-bold uppercase tracking-widest">{title}</span>
            </div>
            <div className={clsx("w-5 h-5 rounded-full border-2 flex items-center justify-center", active ? "border-amber-500" : "border-gray-200")}>
                {active && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
            </div>
        </button>
    );
}
