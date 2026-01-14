import React from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import { NewsFeed } from '@/components/news/NewsFeed';
import { newsData } from '@/data/newsData';

export default async function NewsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(typeof searchParams.page === 'string' ? searchParams.page : '1') || 1;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

  let filteredNews = newsData;

  // Filter by Category check
  // newsData.category values are 'Офіційно', 'Публікації', 'Анонси', 'Всі новини'
  // The URL param might be 'official', 'publications' etc if passed from somewhere, 
  // OR it might be the label itself if the links were built that way.
  // Assuming the `NewsFeed` component generates links.
  
  if (category && category !== 'all') {
      // Simple match or map if needed. 
      // For now, let's just filter if it matches one of our known categories values
      filteredNews = filteredNews.filter(n => n.category === category);
  }

  if (search) {
     filteredNews = filteredNews.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));
  }

  const limit = 12;
  const totalDocs = filteredNews.length;
  const totalPages = Math.ceil(totalDocs / limit);
  // Ensure page is within bounds
  const safePage = Math.min(Math.max(1, page), totalPages || 1);
  const paginatedItems = filteredNews.slice((safePage - 1) * limit, safePage * limit);

  // Map to NewsFeed expected format
  // NewsDoc usually expects: { id, title, date, category, categoryLabel, shortDescription, image }
  // My newsData items have: { id, title, date, category, image, shortDescription, content }
  const formattedNews = paginatedItems.map(item => ({
      id: item.id, // cast to number if needed, but string preferred normally
      title: item.title,
      date: item.date,
      category: 'news', // internal slug if needed
      categoryLabel: item.category, // Display text
      shortDescription: item.shortDescription,
      image: item.image
  }));

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-black/90 pt-48 pb-30 shadow-lg">
        <Header />
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-end gap-6 text-white">
            <h1 className="font-molodo text-4xl uppercase tracking-wider">Новини</h1>
         </div>
      </div>
      
      <NewsFeed 
         docs={formattedNews} 
         totalPages={totalPages} 
         currentPage={safePage} 
      />

      <Footer />
      <FloatingButton />
    </main>
  );
}
