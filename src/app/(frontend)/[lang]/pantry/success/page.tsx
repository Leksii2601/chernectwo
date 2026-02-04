'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
    const { language } = useLanguage();
    const lang = language.toLowerCase();

    return (
        <main className="bg-white min-h-screen">
            <div className="bg-black">
                <Header variant="burger" />
            </div>

            <div className="max-w-2xl mx-auto px-4 py-32 text-center">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 text-green-600">
                    <CheckCircle size={48} />
                </div>

                <h1 className="font-kyiv text-4xl mb-6">Дякуємо за замовлення!</h1>
                <p className="text-gray-500 text-lg mb-12 leading-relaxed">
                    Ваше замовлення успішно оформлено. Наш менеджер зв'яжеться з вами найближчим часом для підтвердження деталей доставки.
                </p>

                <div className="bg-gray-50 p-8 rounded-sm mb-12 text-left">
                    <h3 className="font-bold text-xs uppercase tracking-widest mb-4">Що далі?</h3>
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li className="flex gap-3">
                            <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] shrink-0">1</span>
                            <span>Ви отримаєте SMS-повідомлення з номером замовлення.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] shrink-0">2</span>
                            <span>Ми зберемо ваші товари та передамо їх службі доставки.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] shrink-0">3</span>
                            <span>Ви отримаєте номер ТТН для відстеження посилки.</span>
                        </li>
                    </ul>
                </div>

                <Link
                    href={`/${lang}/pantry`}
                    className="inline-flex items-center gap-4 bg-black text-white px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-all group"
                >
                    Повернутися до Комори
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>

            <Footer />
        </main>
    );
}
