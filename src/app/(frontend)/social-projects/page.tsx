'use client';

import React from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import './styles.css';

// Test data simulating database content
const initiatives = [
  {
    title: "ЦЕНТР ТУРИСТИЧНОЇ ІНФОРМАЦІЇ ТА ПАЛОМНИЦТВА ЖИДИЧИН ЦЕНТР",
    description: "Жидичинський монастир упродовж століть був не лише духовним осередком, а й простором служіння громаді. Сьогодні ця місія продовжується через соціальні проєкти, що поєднують волонтерство, освіту, культуру, молодіжні ініціативи, підтримку громади та збереження спадщини.",
    icon: "/media/initiative-1.png" // Placeholder, will need to be replaced or handled
  },
  {
    title: "САДИ АРХІМАНДРІЇ",
    description: "Жидичинський монастир упродовж століть був не лише духовним осередком, а й простором служіння громаді. Сьогодні ця місія продовжується через соціальні проєкти, що поєднують волонтерство, освіту, культуру, молодіжні ініціативи, підтримку громади та збереження спадщини.",
    icon: "/media/initiative-2.png" 
  },
  {
    title: "ПАЛАМАР.UA",
    description: "Жидичинський монастир упродовж століть був не лише духовним осередком, а й простором служіння громаді. Сьогодні ця місія продовжується через соціальні проєкти, що поєднують волонтерство, освіту, культуру, молодіжні ініціативи, підтримку громади та збереження спадщини.",
    icon: "/media/initiative-3.png" 
  },
  {
    title: "ІСТОРИЧНА АРЕНА: ZHYDYCHYN HISTORY HALL",
    description: "Жидичинський монастир упродовж століть був не лише духовним осередком, а й простором служіння громаді. Сьогодні ця місія продовжується через соціальні проєкти, що поєднують волонтерство, освіту, культуру, молодіжні ініціативи, підтримку громади та збереження спадщини.",
    icon: "/media/initiative-4.png" 
  },
  {
    title: "ІНФОРМАЦІЙНА ПЛАТФОРМА ЗАВТРА",
    description: "Жидичинський монастир упродовж століть був не лише духовним осередком, а й простором служіння громаді. Сьогодні ця місія продовжується через соціальні проєкти, що поєднують волонтерство, освіту, культуру, молодіжні ініціативи, підтримку громади та збереження спадщини.",
    icon: "/media/initiative-5.png" 
  },
  {
    title: "ХОР ВОСКРЕСІННЯ",
    description: "Жидичинський монастир упродовж століть був не лише духовним осередком, а й простором служіння громаді. Сьогодні ця місія продовжується через соціальні проєкти, що поєднують волонтерство, освіту, культуру, молодіжні ініціативи, підтримку громади та збереження спадщини.",
    icon: "/media/initiative-6.png" 
  }
];

export default function SocialProjectsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Parallax */}
      <section 
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: 'url(/media/social-iniviatives.jpeg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 font-molodo text-5xl md:text-7xl text-white text-center tracking-wider px-4">
          МІСІОНЕРСЬКІ ПРОЄКТИ
        </h1>
      </section>

      {/* Grid Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {initiatives.map((item, index) => (
            <div 
              key={index}
              className="group relative h-[400px] border border-gray-100 bg-white overflow-hidden"
            >
              {/* Content Container */}
              <div className="absolute inset-0 p-8 flex flex-col items-center text-center transition-all duration-500 group-hover:opacity-10">
                <div className="w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  {/* Placeholder for Icon - using first letter for now if no image */}
                  <span className="text-3xl font-molodo text-black">{item.title[0]}</span>
                </div>
                
                <h3 className="font-molodo text-2xl mb-6 uppercase leading-tight">
                  {item.title}
                </h3>
                
                <p className="font-sans text-sm leading-relaxed text-gray-600 line-clamp-6">
                  {item.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col items-center justify-center p-8 text-white z-10">
                <h3 className="font-molodo text-2xl mb-6 uppercase text-center translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                  {item.title}
                </h3>
                
                <button className="border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black px-8 py-3 uppercase tracking-widest text-sm font-semibold transition-all duration-300 translate-y-4 group-hover:translate-y-0 delay-200">
                  Детальніше
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <FloatingButton />
    </main>
  );
}
