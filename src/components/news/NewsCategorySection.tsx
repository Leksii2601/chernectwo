import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NewsItem } from '@/data/newsData';

interface NewsCategorySectionProps {
  title: string;
  items: NewsItem[];
  id?: string;
}

export function NewsCategorySection({ title, items, id }: NewsCategorySectionProps) {
  if (items.length === 0) return null;

  return (
    <div id={id} className="max-w-[1920px] mx-auto px-0 mb-16 scroll-mt-32">
      <div className="bg-black text-white px-6 py-3 mb-8">
        <h2 className="text-xl uppercase font-serif tracking-wider">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <Link key={item.id} href={`/news/${item.id}`} className="group block">
             <div className="relative h-48 md:h-56 mb-4 overflow-hidden">
                <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
             </div>
             <div className="border-b border-amber-200 pb-2 mb-3">
                 <p className="text-sm text-gray-500 font-montserrat">{item.date}</p>
             </div>
             <h3 className="text-xl font-serif font-bold text-gray-900 leading-tight group-hover:text-amber-700 transition-colors">
                 {item.title}
             </h3>
             {/* Optional: Short desc if needed, sticking to screenshot simplicity first */}
          </Link>
        ))}
      </div>
    </div>
  );
}
