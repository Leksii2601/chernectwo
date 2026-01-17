import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NewsItem } from '@/data/newsData';

interface SearchResultsProps {
  results: NewsItem[];
  searchTerm: string;
}

export function SearchResults({ results, searchTerm }: SearchResultsProps) {
  if (results.length === 0) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-serif text-gray-800 mb-4">No results found for {searchTerm}</h2>
            <p className="text-gray-600">Please try a different search term.</p>
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
       {/* List Layout */}
       <div className="flex flex-col gap-8">
           {results.map(item => (
               <Link key={item.id} href={`/news/${item.id}`} className="flex flex-col md:flex-row gap-6 group">
                   <div className="relative w-full md:w-64 h-48 flex-shrink-0 overflow-hidden">
                       <Image 
                           src={item.image} 
                           alt={item.title} 
                           fill 
                           className="object-cover group-hover:scale-105 transition-transform duration-500"
                       />
                   </div>
                   <div className="flex flex-col justify-start py-2">
                       <p className="text-sm text-gray-400 uppercase font-montserrat mb-2">{item.date}</p>
                       <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                           {item.title}
                       </h3>
                       <p className="text-gray-600 font-montserrat line-clamp-2 md:line-clamp-3">
                           {item.shortDescription}
                       </p>
                   </div>
               </Link>
           ))}
       </div>
    </div>
  );
}
