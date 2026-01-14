import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import { NewsFeed, NewsDoc } from '@/components/news/NewsFeed';
import { Media } from '@/payload-types';

export const dynamic = 'force-dynamic';

export default async function NewsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(typeof searchParams.page === 'string' ? searchParams.page : '1') || 1;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

  const payload = await getPayload({ config: configPromise });

  const whereQuery: any = {
    and: [
       { isPublished: { equals: true } }
    ]
  };

  if (category && category !== 'all') {
     whereQuery.and.push({ category: { equals: category } });
  }

  if (search) {
     whereQuery.and.push({
        or: [
           { title: { like: search } },
           { shortDescription: { like: search } }
        ]
     });
  }

  const newsResult = await payload.find({
    collection: 'news',
    sort: '-publishedDate',
    limit: 12, 
    page: page,
    where: whereQuery,
  });

  const categoryMap: Record<string, string> = {
    publications: 'Публікації',
    announcements: 'Анонси',
    official: 'Офіційно',
  };

  const formattedNews: NewsDoc[] = newsResult.docs.map((doc) => {
    // Handle image type (Upload field returns ID or Media object)
    let imageUrl = '/media/placeholder.jpg'; // Fallback
    if (doc.mainImage && typeof doc.mainImage !== 'number') {
      imageUrl = (doc.mainImage as Media).url || imageUrl;
    }

    return {
      id: doc.id,
      title: doc.title,
      date: new Date(doc.publishedDate).toLocaleDateString('uk-UA'),
      category: doc.category,
      categoryLabel: categoryMap[doc.category] || doc.category,
      shortDescription: doc.shortDescription,
      image: imageUrl,
    };
  });

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
         totalPages={newsResult.totalPages} 
         currentPage={newsResult.page || 1} 
      />

      <Footer />
      <FloatingButton />
    </main>
  );
}
