'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NewsSearch } from '@/components/news/NewsSearch';

export interface NewsItem {
  id: number | string;
  date: string;
  title: string;
  image: string;
  category: string;
}

interface NewsSectionProps {
  news: NewsItem[];
  showSearch?: boolean;
  searchResults?: NewsItem[];
  isSearching?: boolean;
  title?: string;
}

export function NewsSection({ news, showSearch = false, searchResults = [], isSearching = false, title }: NewsSectionProps) {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Use a flag for empty news rather than early return before hooks
  const hasNews = news && news.length > 0;

  useEffect(() => {
    // Disable slide show if searching
    if (!hasNews || isSearching) return;

    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => 
        prevIndex === news.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [hasNews, news?.length, isSearching]); 

  // If no news, don't crash, maybe show empty state or hide
  if (!hasNews) return null;

  const currentNews = news[currentNewsIndex];
  
  // Display latest 4 for the side list
  const latestNews = news.slice(0, 4); 

  return (
    <section className="bg-gray-50 font-montserrat text-gray-900 pb-12"> 
      <div className="max-w-[1920px] mx-auto p-4 md:p-6 lg:px-[80px]">
        {title && (
            <h2 className="font-montserrat font-bold text-3xl md:text-5xl uppercase tracking-widest text-center mb-10 text-gray-900">
              {title}
            </h2>
        )}
        
        {/* Mobile Search Bar - Shows at top only on mobile */}
        {showSearch && (
            <div className="lg:hidden mb-6">
                 <NewsSearch />
            </div>
        )}

        <div className="flex gap-6 flex-col lg:flex-row items-stretch">
          
          {/* Main Content - Left */}
          {/* If Searching, show Grid. If not, show Hero */}
          <div className="lg:w-2/3 flex flex-col">
          
          {isSearching ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full content-start">
               {/* Show search results or 'No results' */}
               {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <Link key={item.id} href={`/news/${item.id}`} className="group block">
                       <div className="relative h-40 mb-3 overflow-hidden">
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
                       <h3 className="text-lg font-serif font-bold text-gray-900 leading-tight group-hover:text-amber-700 transition-colors line-clamp-3">
                           {item.title}
                       </h3>
                    </Link>
                  ))
               ) : (
                  <div className="col-span-full py-12 text-center text-gray-500">
                      Пошук не дав результатів.
                  </div>
               )}
             </div>
          ) : (
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
          )}

          </div>

          {/* Side News List - Right (Latest 4) */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {showSearch && (
                <div className="mb-4 hidden lg:block">
                    <NewsSearch />
                </div>
            )}
            
            {latestNews.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className={`flex gap-4 cursor-pointer hover:bg-white/50 transition-all duration-300 group flex-1 p-2 rounded-lg ${isSearching ? 'hidden lg:flex' : ''}`}
              >
                <div className="relative w-36 h-28 flex-shrink-0 overflow-hidden">
                    <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                 <div className="flex flex-col justify-center w-full">
                  <div className="border-b border-amber-200 pb-2 mb-3">
                     <p className="text-gray-400 text-xs uppercase font-bold tracking-wide">{item.date}</p>
                  </div>
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
