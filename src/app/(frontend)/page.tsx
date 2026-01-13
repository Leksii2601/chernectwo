import React from 'react'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { CalendarSection } from '@/components/landing/CalendarSection'
import { NewsSection } from '@/components/landing/NewsSection'
import { SocialInitiatives } from '@/components/landing/SocialInitiatives'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'
import { FloatingButton } from '@/components/landing/FloatingButton'
import './styles.css'

export const metadata = {
  title: 'Жидичинський Свято-Миколаївський монастир',
  description: 'Офіційний сайт Жидичинського Свято-Миколаївського монастиря',
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-white">
      <Header />
      <Hero />
      <CalendarSection />
      <NewsSection />
      <SocialInitiatives />
      <FAQ />
      <Footer />
      <FloatingButton />
    </main>
  )
}
