'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight } from 'lucide-react';
import { searchNews } from '@/utils/search';
import { NewsItem } from '@/data/newsData';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Perform search whenever query changes
    const hits = searchNews(query);
    setResults(hits);
  }, [query]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Input Area */}
        <div className="mb-16">
            <h1 className="font-molodo text-4xl uppercase tracking-wider mb-8">Пошук</h1>
            <div className="relative max-w-2xl">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Введіть запит..." 
                    className="w-full p-4 pl-6 pr-14 text-lg border-b-2 border-gray-300 focus:border-amber-500 focus:outline-none bg-transparent transition-colors font-sans"
                    autoFocus
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
            
            {query && (
                <p className="mt-4 text-gray-500 text-sm">
                    Знайдено результатів: <span className="font-bold text-black">{results.length}</span>
                </p>
            )}
        </div>

        {/* Results List */}
        <div className="space-y-8 max-w-4xl">
            {results.map((item) => (
                <Link 
                    href={`/news/${item.id}`} 
                    key={item.id}
                    className="group block bg-white border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300 rounded-sm overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row h-auto md:h-[200px]">
                        
                        {/* Image - Left */}
                        <div className="relative w-full md:w-[300px] h-[200px] md:h-full flex-shrink-0 overflow-hidden">
                             <Image 
                                src={item.image} 
                                alt={item.title} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                             />
                             {/* Category Label Overlay */}
                            <div className="absolute top-0 right-0 bg-amber-900 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                                {item.category}
                            </div>
                        </div>

                        {/* Content - Right */}
                        <div className="p-6 flex flex-col justify-center flex-grow">
                             <div className="flex items-center gap-3 mb-3">
                                <span className="text-amber-600 font-bold text-sm tracking-widest uppercase">{item.date}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <h4 className="text-amber-500 font-molodo uppercase text-sm tracking-wider">Новини</h4>
                             </div>
                             
                             <h3 className="font-molodo text-xl md:text-2xl mb-3 leading-tight text-gray-900 group-hover:text-amber-700 transition-colors">
                                {item.title}
                             </h3>

                             <p className="text-gray-500 text-sm line-clamp-2 font-sans mb-4">
                                {item.shortDescription}
                             </p>
                            
                             <div className="flex items-center text-xs font-bold uppercase tracking-widest mt-auto group-hover:translate-x-2 transition-transform duration-300">
                                <span>Читати повністю</span>
                                <ChevronRight className="w-4 h-4 ml-1 text-amber-500" />
                             </div>
                        </div>
                    </div>
                </Link>
            ))}

            {results.length === 0 && query && (
                <div className="py-12 px-8 bg-gray-50 text-center rounded-lg border border-gray-100">
                    <p className="text-gray-500 mb-2">На жаль, за вашим запитом нічого не знайдено.</p>
                    <p className="text-sm text-gray-400">Спробуйте змінити ключові слова або перевірте правильність написання.</p>
                </div>
            )}
        </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-black/90 pt-32 pb-6 shadow-lg">
        <Header />
      </div>

      <Suspense fallback={<div className="p-12 text-center">Завантаження...</div>}>
         <SearchContent />
      </Suspense>

      <Footer />
      <FloatingButton />
    </main>
  );
}
