'use client';

import React from 'react';
import { Footer } from '@/components/landing/Footer';
import '../styles.css';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="pt-32 pb-16 px-4 max-w-3xl mx-auto relative">
        <Link 
            href="/social-projects" 
            className="absolute top-8 left-4 md:left-0 flex items-center gap-2 text-gray-500 hover:text-black transition-colors group"
        >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase text-sm tracking-wider font-medium">Назад</span>
        </Link>
        <h1 className="font-molodo text-4xl mb-8 text-center mt-8">Долучитися до ініціативи</h1>
        <p className="text-gray-600 text-center mb-12">
          Заповніть форму нижче, і ми зв'яжемося з вами найближчим часом.
        </p>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ім'я</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" placeholder="Ваше ім'я" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
              <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" placeholder="+380..." />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" placeholder="example@mail.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Повідомлення</label>
            <textarea rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" placeholder="Я хочу долучитися до..." />
          </div>

          <button type="submit" className="w-full bg-amber-500 text-white font-bold py-4 rounded-lg hover:bg-amber-600 transition-colors uppercase tracking-wider">
            Відправити
          </button>
        </form>
      </div>
      <Footer />
    </main>
  );
}
