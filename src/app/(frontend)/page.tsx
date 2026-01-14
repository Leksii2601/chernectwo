import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { CalendarSection } from '@/components/landing/CalendarSection'
import { NewsSection, NewsItem } from '@/components/landing/NewsSection'
import { SocialInitiatives } from '@/components/landing/SocialInitiatives'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'
import { FloatingButton } from '@/components/landing/FloatingButton'
import { Media } from '@/payload-types'
import './styles.css'

export const metadata = {
  title: 'Жидичинський Свято-Миколаївський монастир',
  description: 'Офіційний сайт Жидичинського Свято-Миколаївського монастиря',
}

export const dynamic = 'force-dynamic';

const staticNews: NewsItem[] = [
    {
      id: 'static-1',
      title: 'ВЖЕ ЦІЄЇ НЕДІЛІ - ЧИН ПРОЩЕННЯ ТА ЗАТВОРНИК',
      date: '15 березня 2024',
      category: 'Анонси',
      image: '/media/news-4.png'
    },
    {
      id: 'static-2',
      title: 'СВЯТКОВА ЛІТУРГІЯ З НАГОДИ СВЯТА СТРІТЕННЯ ГОСПОДНЬОГО',
      date: '2 лютого 2024',
      category: 'Служіння',
      image: '/media/news-3.png' 
    },
    {
       id: 'static-3',
       title: 'ВІДБУЛАСЯ ПРОЩА ДО ЧУДОТВОРНОЇ ІКОНИ',
       date: '15 лютого 2024',
       category: 'Публікації',
       image: '/media/news-2.png' 
    }
  ];

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise });
  const newsResult = await payload.find({
    collection: 'news',
    sort: '-publishedDate',
    limit: 5,
    where: {
        isPublished: { equals: true }
    }
  });

  const formattedNews: NewsItem[] = newsResult.docs.map((doc) => {
    let imageUrl = '/media/placeholder.jpg';
    if (doc.mainImage && typeof doc.mainImage !== 'number') { // Check if expanded
      imageUrl = (doc.mainImage as Media).url || imageUrl;
    }
    
    const categoryMap: Record<string, string> = {
        publications: 'Публікації',
        announcements: 'Анонси',
        official: 'Офіційно',
    };

    return {
      id: doc.id,
      title: doc.title,
      date: new Date(doc.publishedDate).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }),
      category: categoryMap[doc.category] || doc.category,
      image: imageUrl,
    };
  });

  // Merge static news with dynamic news
  const allNews = [...staticNews, ...formattedNews];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-white">
      <Header />
      <Hero />
      <CalendarSection />
      <NewsSection news={allNews} />
      <SocialInitiatives />
      <FAQ />
      <Footer />
      <FloatingButton />
    </main>
  )
}
