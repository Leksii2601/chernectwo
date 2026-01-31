import React from 'react'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { CalendarSection } from '@/components/landing/CalendarSection'
import { NewsSection } from '@/components/landing/NewsSection'
import { SocialInitiatives } from '@/components/landing/SocialInitiatives'
import { ExploreMore } from '@/components/landing/ExploreMore'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'
import { FloatingButton } from '@/components/landing/FloatingButton'
import { newsData } from '@/data/newsData'


export const metadata = {
  title: 'Жидичинський Свято-Миколаївський монастир',
  description: 'Офіційний сайт Жидичинського Свято-Миколаївського монастиря',
}

// export const dynamic = 'force-dynamic'; // No longer needed as we are static here

export default function HomePage() {
  // Using imported static news from newsData
  return (
    <main className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-white">
      <Header />
      <Hero />
      <CalendarSection />
      <NewsSection news={newsData} />
      <SocialInitiatives />
      <ExploreMore />
      <FAQ />
      <Footer />
      <FloatingButton />
    </main>
  )
}
