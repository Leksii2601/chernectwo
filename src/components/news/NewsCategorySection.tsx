'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NewsItem } from '@/data/newsData';

interface NewsCategorySectionProps {
  title: string;
  items: NewsItem[];
  id?: string;
}

export function NewsCategorySection({ title, items, id }: NewsCategorySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id={id} className="w-full scroll-mt-32">
      <div className="flex justify-between items-center bg-black text-white px-6 py-3 mb-8">
        <h2 className="text-xl uppercase font-montserrat tracking-wider">{title}</h2>
        {items.length > 3 && (
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-1 hover:bg-white/20 transition-colors rounded-full"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1 hover:bg-white/20 transition-colors rounded-full"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-4 snap-x"
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="group block w-[280px] md:w-[350px] lg:w-[400px] flex-shrink-0 snap-start"
          >
            <div className="relative h-48 md:h-64 lg:h-72 mb-4 overflow-hidden shadow-lg rounded-sm">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="border-b border-amber-600 pb-2 mb-3">
              <p className="text-sm text-gray-500 font-montserrat">{item.date}</p>
            </div>
            <h3 className="text-xl font-montserrat font-bold text-gray-900 leading-tight group-hover:text-amber-700 transition-colors line-clamp-2">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
