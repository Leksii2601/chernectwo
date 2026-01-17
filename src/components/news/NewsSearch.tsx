'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function NewsSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // Sync internal state if URL changes externally (e.g. going back)
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    if (urlSearch !== searchTerm) {
       setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
        const currentSearch = searchParams.get('search') || '';
        // Only push if different from URL to avoid loop
        if (searchTerm.trim() !== currentSearch) {
             const params = new URLSearchParams(searchParams.toString());
            if (searchTerm.trim()) {
                params.set('search', searchTerm.trim());
            } else {
                params.delete('search');
            }
            params.delete('page');
            router.push(`/news?${params.toString()}`, { scroll: false }); // Disable auto-scroll to avoid jumps
        }
    }, 500); // Increased debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, router, searchParams]);

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-sm px-4 py-2 text-gray-700 focus:outline-none focus:border-black font-montserrat"
        />
        <div className="absolute right-0 top-0 bottom-0 px-3 flex items-center text-gray-500 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
           </svg>
        </div>
      </div>
    </div>
  );
}
