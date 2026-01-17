'use client';

import React from 'react';
import { Footer } from '@/components/landing/Footer';
import '../styles.css';
import { Copy, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

export default function DonatePage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Optional: Add toast notification here
    alert('Реквізити скопійовано!');
  };

  return (
    <main className="min-h-screen bg-white">
       <PageHeader title="ПІДТРИМАТИ" backgroundImage="/media/donate.jpg" />

      {/* Hero Section */}
      <section className="pt-16 pb-16 px-4 bg-gray-50 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Ваша пожертва допомагає нам розвивати соціальні ініціативи, підтримувати історичну спадщину та дбати про нужденних. Нехай Господь благословить!
        </p>
      </section>

      {/* Donation Methods */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* UAH Card */}
          <div className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <span className="font-bold text-xl">₴</span>
              </div>
              <h2 className="font-montserrat text-2xl">Гривня (UAH)</h2>
            </div>
            
            <div className="space-y-6">
              <div className="group relative bg-gray-50 p-4 rounded-lg cursor-pointer" onClick={() => copyToClipboard('UA000000000000000000000000000')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IBAN</p>
                <p className="font-mono text-lg truncate">UA00 0000 0000 0000 0000 0000 0000 0</p>
                <Copy className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="group relative bg-gray-50 p-4 rounded-lg cursor-pointer" onClick={() => copyToClipboard('00000000')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">ЄДРПОУ</p>
                <p className="font-mono text-lg">00000000</p>
                <Copy className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="group relative bg-gray-50 p-4 rounded-lg cursor-pointer" onClick={() => copyToClipboard('Благодійна пожертва на статутну діяльність')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Призначення платежу</p>
                <p className="font-medium text-gray-800">Благодійна пожертва на статутну діяльність</p>
                <Copy className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>
          </div>

          {/* SWIFT / USD / EUR Card */}
          <div className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <span className="font-bold text-xl">$</span>
              </div>
              <h2 className="font-montserrat text-2xl">SWIFT (USD / EUR)</h2>
            </div>
            
            <div className="space-y-6">
              <div className="group relative bg-gray-50 p-4 rounded-lg cursor-pointer" onClick={() => copyToClipboard('Bank Name')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bank Name</p>
                <p className="font-medium">JSC &quot;State Savings Bank of Ukraine&quot;</p>
                <Copy className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="group relative bg-gray-50 p-4 rounded-lg cursor-pointer" onClick={() => copyToClipboard('SWIFT_CODE_HERE')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">SWIFT Code</p>
                <p className="font-mono text-lg">OSBUUAUK</p>
                <Copy className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="group relative bg-gray-50 p-4 rounded-lg cursor-pointer" onClick={() => copyToClipboard('UA000000000000000000000000000')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account Number (IBAN)</p>
                <p className="font-mono text-lg truncate">UA00 0000 0000 0000 0000 0000 0000 0</p>
                <Copy className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 text-center">
        <button className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors flex items-center gap-2 mx-auto">
           <CreditCard className="w-5 h-5" />
           Швидка оплата карткою
        </button>
      </section>

      <Footer />
    </main>
  );
}
