'use client';

import React from 'react';
import { Footer } from '@/components/landing/Footer';
import '../styles.css';
import { Copy, CreditCard } from 'lucide-react';
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
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* UAH Card */}
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <span className="font-bold text-xl">₴</span>
              </div>
              <h2 className="font-montserrat text-xl font-bold">Гривня (UAH)</h2>
            </div>
            
            <div className="space-y-4">
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

              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('5363542096233375')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Картка ПриватБанку</p>
                <p className="font-mono text-lg">5363 5420 9623 3375</p>
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
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <span className="font-bold text-xl">$</span>
              </div>
              <h2 className="font-montserrat text-xl font-bold">Долар (USD)</h2>
            </div>
            
            <div className="space-y-4">
              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('PO СВЯТО-МИКОЛАЇВСЬКИЙ ЧОЛОВІЧИЙ МОНАСТИР')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Company Name</p>
                <p className="font-medium text-xs leading-tight">PO СВЯТО-МИКОЛАЇВСЬКИЙ ЧОЛОВІЧИЙ МОНАСТИР</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

               <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('UA6430529900000026000000812785')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IBAN Code</p>
                <p className="font-mono text-xs break-all">UA6430529900000026000000812785</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>
              
              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('PBANUA2X')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">SWIFT Code</p>
                <p className="font-mono text-lg">PBANUA2X</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

               <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('АТ КБ «ПриватБанк»')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bank Name</p>
                <p className="font-medium text-sm">АТ КБ «ПриватБанк»</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('45240, УКРАЇНА, ОБЛ. ВОЛИНСЬКА, Р-Н. ЛУЦЬКИЙ, С. ЖИДИЧИН, ВУЛ. 17 ВЕРЕСНЯ, Б. 1')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Company address</p>
                <p className="font-medium text-xs leading-4">45240, УКРАЇНА, ОБЛ. ВОЛИНСЬКА, Р-Н. ЛУЦЬКИЙ, С. ЖИДИЧИН, ВУЛ. 17 ВЕРЕСНЯ, Б. 1</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>
          </div>

          {/* EUR Card */}
          <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <span className="font-bold text-xl">€</span>
              </div>
              <h2 className="font-montserrat text-xl font-bold">Євро (EUR)</h2>
            </div>
            
             <div className="space-y-4">
              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('PO СВЯТО-МИКОЛАЇВСЬКИЙ ЧОЛОВІЧИЙ МОНАСТИР')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Company Name</p>
                <p className="font-medium text-xs leading-tight">PO СВЯТО-МИКОЛАЇВСЬКИЙ ЧОЛОВІЧИЙ МОНАСТИР</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

               <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('UA7230529900000026003030808528')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IBAN Code</p>
                <p className="font-mono text-xs break-all">UA7230529900000026003030808528</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>
              
              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('PBANUA2X')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">SWIFT Code</p>
                <p className="font-mono text-lg">PBANUA2X</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

               <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('АТ КБ «ПриватБанк»')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bank Name</p>
                <p className="font-medium text-sm">АТ КБ «ПриватБанк»</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div className="group relative bg-gray-50 p-3 rounded-lg cursor-pointer" onClick={() => copyToClipboard('45240, УКРАЇНА, ОБЛ. ВОЛИНСЬКА, Р-Н. ЛУЦЬКИЙ, С. ЖИДИЧИН, ВУЛ. 17 ВЕРЕСНЯ, Б. 1')}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Company address</p>
                <p className="font-medium text-xs leading-4">45240, УКРАЇНА, ОБЛ. ВОЛИНСЬКА, Р-Н. ЛУЦЬКИЙ, С. ЖИДИЧИН, ВУЛ. 17 ВЕРЕСНЯ, Б. 1</p>
                <Copy className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
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
