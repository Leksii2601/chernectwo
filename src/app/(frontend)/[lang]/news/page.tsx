import React from 'react';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import { NewsSection } from '@/components/landing/NewsSection';
import { NewsCategorySection } from '@/components/news/NewsCategorySection';
import { newsData } from '@/data/newsData';
import { PageHeader } from '@/components/PageHeader';


export default async function NewsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

  // Filter for Categories
  const publications = newsData.filter(n => n.category === 'Публікації').slice(0, 3);
  const announcements = newsData.filter(n => n.category === 'Анонси').slice(0, 3);
  const official = newsData.filter(n => n.category === 'Офіційно').slice(0, 3);

  // Search Logic
  let filteredResults: typeof newsData = [];
  if (search) {
      filteredResults = newsData.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));
  }

  return (
    <main className="min-h-screen bg-white">
      <PageHeader title="Новини" backgroundImage="/media/news.jpg" />
      
      {/* 
         Top Section: NewsSection.
         If searching:
           - The Left "Hero" is replaced by Grid of Search Results.
           - The Right Sidebar stays (with Search Bar).
      */}
      <NewsSection 
          news={newsData} 
          showSearch={true} 
          searchResults={filteredResults}
          isSearching={!!search}
      />

      {/* 
         Below NewsSection:
         Only show Category Sections if NOT searching.
         If searching, the results are already shown inside NewsSection.
      */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-[80px] mt-8 mb-16">
        {!search && (
            <div className="flex flex-col gap-16">
                {/* Categories */}
                <NewsCategorySection id="official" title="Офіційно" items={official} />
                <NewsCategorySection id="announcements" title="Анонси" items={announcements} />
                <NewsCategorySection id="publications" title="Публікації" items={publications} />
            </div>
        )}
      </div>

      <Footer />
      <FloatingButton />
    </main>
  );
}
