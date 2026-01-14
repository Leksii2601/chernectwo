'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface NewsItem {
  id: number | string;
  date: string;
  title: string;
  image: string;
  category: string;
}

interface NewsSectionProps {
  news: NewsItem[];
}

export function NewsSection({ news }: NewsSectionProps) {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // If no news, don't crash, maybe show empty state or hide
  if (!news || news.length === 0) return null;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => 
        prevIndex === news.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]); 

  const currentNews = news[currentNewsIndex];
  
  // Display latest 4 for the side list, but cycle through ALL in the main view
  // Or should the side list be the valid navigation?
  // The original code sliced (0,4) for the side list using `newsData`.
  const latestNews = news.slice(0, 4); 

  return (
    <section className="min-h-screen bg-gray-50 font-montserrat text-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        <Link href="/news">
          <h2 className="text-4xl text-center mb-16 uppercase font-bold text-gray-800 font-montserrat hover:text-amber-600 transition-colors cursor-pointer">
            Новини Монастиря
          </h2>
        </Link>
        
        <div className="flex gap-6 flex-col lg:flex-row items-stretch">
          
          {/* Main News - Left */}
          <div className="lg:w-2/3 flex flex-col">
          <Link href={`/news/${currentNews.id}`} className="block w-full h-full"> 
            <div className="relative overflow-hidden shadow-lg group w-full h-full min-h-[500px] lg:min-h-0">
              <Image 
                src={currentNews.image} 
                alt={currentNews.title}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8">
                <div className="inline-block bg-white text-gray-900 px-4 py-1 text-xs font-bold uppercase mb-4 tracking-wider">
                  {currentNews.category}
                </div>
                <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight drop-shadow-md">
                  {currentNews.title}
                </h1>
                <p className="text-gray-300 mt-2 text-sm md:text-base font-medium">{currentNews.date}</p>
              </div>
            </div>
           </Link>
          </div>

          {/* Side News List - Right (Latest 4) */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {latestNews.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="flex gap-4 cursor-pointer hover:bg-white/50 transition-all duration-300 group flex-1 p-2 rounded-lg"
              >
                <div className="relative w-36 h-28 flex-shrink-0 overflow-hidden">
                    <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-gray-400 text-xs uppercase font-bold mb-2 tracking-wide">{item.date}</p>
                  <h3 className="text-gray-900 font-bold text-base leading-snug group-hover:text-amber-600 transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
