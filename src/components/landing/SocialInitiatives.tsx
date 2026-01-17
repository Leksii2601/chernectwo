'use client';

import React from 'react';
import Link from 'next/link';

export function SocialInitiatives() {
  return (
    <section 
      id="social-initiatives"
      className="relative w-full min-h-[600px] flex items-center justify-center bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: 'url(/media/social-initiatives.jpg)',
        backgroundAttachment: 'fixed', // Parallax effect
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-left text-white">
        <h2 className="font-montserrat text-4xl md:text-6xl mb-8 tracking-wide">
          Місіонерські проєкти
        </h2>
        
        <p className="font-sans text-lg md:text-xl leading-relaxed text-gray-200">
          Жидичинський монастир упродовж століть був не лише духовним осередком, а й простором служіння громаді. 
          Сьогодні ця місія продовжується через соціальні проєкти, що поєднують волонтерство, освіту, культуру, 
          молодіжні ініціативи, підтримку громади та збереження спадщини. Кожен з них об’єднує людей, 
          ідеї та ініціативи, продовжуючи спільну місію — бути поруч, підтримувати, творити майбутнє 
          на основі віри, пам’яті та відповідальності.
        </p>

        <div className="mt-12">
            <Link href="/social-projects">
              <button className="border border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-full transition duration-300 font-sans font-semibold uppercase text-sm tracking-wider">
                  Дивитись
              </button>
            </Link>
        </div>
      </div>
    </section>
  );
}
