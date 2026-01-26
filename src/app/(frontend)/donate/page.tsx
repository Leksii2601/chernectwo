'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Footer } from '@/components/landing/Footer';
import '../styles.css';
import { Copy, CreditCard, Check, X } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

export default function DonatePage() {
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyModal(true);
    setTimeout(() => {
      setShowCopyModal(false);
    }, 2000);
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

      {/* Quick Card Donations */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="font-montserrat text-2xl font-bold text-center mb-8">Швидка допомога</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PrivatBank Card */}
          <div className="border-2 border-amber-500 rounded-xl p-6 hover:shadow-xl transition-shadow bg-gradient-to-br from-amber-50 to-white">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-8 h-8 text-amber-600" />
              <h3 className="font-montserrat text-lg font-bold">Картка ПриватБанку</h3>
            </div>
            <div className="group relative bg-white p-4 rounded-lg cursor-pointer border border-gray-200 hover:border-amber-500 transition-colors" onClick={() => copyToClipboard('5363542096233375')}>
              <p className="font-mono text-2xl text-center tracking-wider mb-2">5363 5420 9623 3375</p>
              <p className="text-sm text-gray-600 text-center">Натисніть, щоб скопіювати</p>
              <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
            </div>
          </div>

          {/* PayPal placeholder for future */}
          <div className="border-2 border-gray-300 rounded-xl p-6 bg-gray-50 opacity-60">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">$</span>
              </div>
              <h3 className="font-montserrat text-lg font-bold text-gray-600">Міжнародні платежі</h3>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 text-center">Скоро з&apos;явиться можливість<br/>донату через PayPal та Stripe</p>
            </div>
          </div>

        </div>
      </section>

      {/* Bank Transfer Details */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="font-montserrat text-2xl font-bold text-center mb-12">Банківські реквізити</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* UAH Card */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-black">
                <span className="font-bold text-xl">₴</span>
              </div>
              <h2 className="font-montserrat text-xl font-bold">Гривня (UAH)</h2>
            </div>
            
            <div className="space-y-3">
              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('РО СВЯТО-МИКОЛАЇВСЬКИЙ ЧОЛОВІЧИЙ МОНАСТИР')}>
                 <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Отримувач</p>
                 <p className="font-medium text-sm leading-tight">РО СВЯТО-МИКОЛАЇВСЬКИЙ ЧОЛОВІЧИЙ МОНАСТИР</p>
                 <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

               <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('26278106')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">ЄДРПОУ</p>
                <p className="font-mono text-lg">26278106</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('UA7730529900000026006000812444')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IBAN</p>
                <p className="font-mono text-sm break-all">UA7730529900000026006000812444</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('305299')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">МФО</p>
                <p className="font-mono text-lg">305299</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('АТ КБ «ПриватБанк»')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Банк</p>
                <p className="font-medium text-sm">АТ КБ «ПриватБанк»</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('Благодійна пожертва')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Призначення платежу</p>
                <p className="font-medium text-sm">Благодійна пожертва</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>
          </div>

          {/* USD Card */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-black">
                <span className="font-bold text-xl">$</span>
              </div>
              <h2 className="font-montserrat text-xl font-bold">Долар (USD)</h2>
            </div>
            
            <div className="space-y-3">
              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('РО СВЯТО-МИКОЛАЇВСЬКИЙ ЧОЛОВІЧИЙ МОНАСТИР')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Отримувач</p>
                <p className="font-medium text-xs leading-tight">РО СВЯТО-МИКОЛАЇВСЬКИЙ ЧОЛОВІЧИЙ МОНАСТИР</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

               <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('UA643052990000026000000812785')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IBAN</p>
                <p className="font-mono text-xs break-all">UA643052990000026000000812785</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>
              
              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('АТ КБ «ПриватБанк»')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Банк</p>
                <p className="font-medium text-sm">АТ КБ «ПриватБанк»</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('PBANUA2X')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">SWIFT</p>
                <p className="font-mono text-lg">PBANUA2X</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 font-medium">Банки-кореспонденти:</p>
                <p className="text-xs text-blue-600 mt-1">JP Morgan Chase Bank (CHASUS33)</p>
                <p className="text-xs text-blue-600">Bank of New York Mellon (IRVTUS3N)</p>
                <p className="text-xs text-blue-600">Citibank N.A. (CITIUS33)</p>
              </div>
            </div>
          </div>

          {/* EUR Card */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-black">
                <span className="font-bold text-xl">€</span>
              </div>
              <h2 className="font-montserrat text-xl font-bold">Євро (EUR)</h2>
            </div>
            
             <div className="space-y-3">
              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('РО СВЯТО-МИКОЛАЇВСЬКИЙ ЧОЛОВІЧИЙ МОНАСТИР')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Отримувач</p>
                <p className="font-medium text-xs leading-tight">РО СВЯТО-МИКОЛАЇВСЬКИЙ ЧОЛОВІЧИЙ МОНАСТИР</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

               <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('UA723052990000026003030808528')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IBAN</p>
                <p className="font-mono text-xs break-all">UA723052990000026003030808528</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>
              
              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('АТ КБ «ПриватБанк»')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Банк</p>
                <p className="font-medium text-sm">АТ КБ «ПриватБанк»</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('PBANUA2X')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">SWIFT</p>
                <p className="font-mono text-lg">PBANUA2X</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                <p className="text-xs text-indigo-700 font-medium">Банки-кореспонденти:</p>
                <p className="text-xs text-indigo-600 mt-1">Commerzbank AG (COBADEFF)</p>
                <p className="text-xs text-indigo-600">J.P.Morgan AG (CHASDEFX)</p>
                <p className="text-xs text-indigo-600">Citibank Europe PLC (CITIIE2X)</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Info Section */}
      <section className="py-8 px-4 max-w-4xl mx-auto text-center">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-sm text-gray-700">
            <strong>Призначення платежу:</strong> &quot;Благодійна пожертва&quot;<br/>
            Усі пожертви йдуть на підтримку монастиря та соціальних ініціатив
          </p>
        </div>
      </section>

      <Footer />

      {/* Copy Success Toast */}
      {showCopyModal && mounted && createPortal(
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 border border-gray-800">
             <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white">
                <Check className="w-3 h-3" strokeWidth={3} />
             </div>
             <span className="font-medium text-sm">Реквізити скопійовано</span>
          </div>
        </div>,
        document.body
      )}
    </main>
  );
}