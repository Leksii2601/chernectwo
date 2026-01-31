
import React from 'react'
import { Header } from '@/components/landing/Header'
import { CalendarSectionNew } from '@/components/landing/CalendarSectionNew'
import { Footer } from '@/components/landing/Footer'

export const metadata = {
    title: 'Новий Календар (Test)',
    description: 'Testing the new liturgical engine',
}

export default function CalendarNewPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-white">
            <Header />
            <CalendarSectionNew />
            <Footer />
        </main>
    )
}
