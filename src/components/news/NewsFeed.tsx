'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronRight, Search, ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export interface NewsDoc {
  id: string | number;
  title: string;
  date: string;
  category: string; // The value from DB: 'publications', etc.
  categoryLabel: string; // The display label: 'Публікації', etc.
  shortDescription: string;
  image: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'Всі новини',
  publications: 'Публікації',
  announcements: 'Анонси',
  official: 'Офіційно',
};

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

interface NewsFeedProps {
  docs: NewsDoc[];
  totalPages: number;
  currentPage: number;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ docs, totalPages, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  
  const [activeCategoryLabel, setActiveCategoryLabel] = useState<string>(
    CATEGORY_LABELS[currentCategory] || CATEGORY_LABELS.all
  );
  const [activeCategoryValue, setActiveCategoryValue] = useState<string>(currentCategory);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
     const cat = searchParams.get('category') || 'all';
     setActiveCategoryValue(cat);
     setActiveCategoryLabel(CATEGORY_LABELS[cat] || CATEGORY_LABELS.all);
     setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    const currentUrlSearch = searchParams.get('search') || '';
    if (debouncedSearch === currentUrlSearch) return; 

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, router, pathname, searchParams]);

  const handleCategorySelect = (key: string, label: string) => {
    setActiveCategoryLabel(label);
    setActiveCategoryValue(key);
    setIsDropdownOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    if (key === 'all') {
        params.delete('category');
    } else {
        params.set('category', key);
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: true });
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
      {/* Controls Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
            <input 
                type="text" 
                placeholder="Пошук новин..."
                value={searchQuery}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const params = new URLSearchParams(searchParams.toString());
                    if (searchQuery) params.set('search', searchQuery);
                    else params.delete('search');
                    params.set('page', '1');
                    router.push(`${pathname}?${params.toString()}`, { scroll: false });
                  }
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-12 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:border-amber-500 focus:ring-0 transition-all outline-none font-bold text-sm tracking-widest text-gray-800 placeholder-gray-400 uppercase"
            />
            <button 
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                if (searchQuery) params.set('search', searchQuery);
                else params.delete('search');
                params.set('page', '1');
                router.push(`${pathname}?${params.toString()}`, { scroll: false });
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-amber-600 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
        </div>

        {/* Category Dropdown */}
        <div className="relative z-20 w-full md:w-64" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:border-amber-500 transition-colors uppercase font-bold text-sm tracking-widest text-gray-800"
          >
            {activeCategoryLabel}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
             {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => handleCategorySelect(key, label)}
                  className={`w-full text-left px-6 py-3 hover:bg-amber-50 text-sm font-bold uppercase tracking-wider transition-colors ${activeCategoryValue === key ? 'text-amber-600 bg-amber-50' : 'text-gray-600'}`}
                >
                  {label}
                </button>
             ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {docs.length > 0 ? (
            docs.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`} className="group flex flex-col h-full bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all duration-500 border border-transparent hover:border-amber-100">
                <div className="relative h-64 overflow-hidden">
                    <Image 
                        src={item.image} 
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-900 rounded-sm">
                        {item.categoryLabel}
                    </div>
                </div>
                
                <div className="flex flex-col flex-grow p-8">
                    <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">
                        {item.date}
                    </div>
                    <h3 className="font-molodo text-xl text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-amber-700 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-gray-500 font-sans leading-relaxed text-sm line-clamp-3 mb-6 flex-grow">
                        {item.shortDescription}
                    </p>
                    
                    <div className="flex items-center text-amber-600 font-bold uppercase text-xs tracking-widest mt-auto group/btn">
                        <span>Читати повністю</span>
                        <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </div>
                </div>
            </Link>
            ))
        ) : (
            <div className="col-span-full border border-dashed border-gray-300 rounded-xl p-12 text-center">
                 <p className="text-gray-500 text-lg">Новин за вашим запитом не знайдено.</p>
                 <button onClick={() => {
                        setSearchQuery(''); 
                        handleCategorySelect('all', 'Всі новини'); 
                     }} className="mt-4 text-amber-600 font-bold hover:underline">
                    Скинути фільтри
                 </button>
            </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
             <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-amber-500 hover:text-amber-600 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all"
             >
                <ChevronLeft className="w-5 h-5" />
             </button>
             
             <div className="flex items-center gap-2">
                {totalPages <= 7 ? (
                    Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center transition-all ${currentPage === page ? 'bg-amber-600 text-white shadow-lg scale-110' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            {page}
                        </button>
                    ))
                ) : (
                    <>
                         <button onClick={() => handlePageChange(1)} className={`w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center transition-all ${currentPage === 1 ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>1</button>
                         {currentPage > 3 && <span className="text-gray-400">...</span>}
                         {currentPage > 1 && currentPage < totalPages && (
                             <span className="w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center bg-amber-600 text-white shadow-lg scale-110">
                                {currentPage}
                             </span>
                         )}
                         {currentPage < totalPages - 2 && <span className="text-gray-400">...</span>}
                         <button onClick={() => handlePageChange(totalPages)} className={`w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center transition-all ${currentPage === totalPages ? 'bg-amber-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{totalPages}</button>
                    </>
                )}
            </div>

            <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-amber-500 hover:text-amber-600 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all"
             >
                <ChevronRight className="w-5 h-5" />
             </button>
        </div>
      )}
    </div>
  );
};
