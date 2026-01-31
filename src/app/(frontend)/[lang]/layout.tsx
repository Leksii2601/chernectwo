import React from 'react'
import '../styles.css'
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import { LiveStreamWidget } from '@/components/LiveStreamWidget';
import { Preloader } from '@/components/Preloader';

export const metadata = {
  description: 'Zhydychyn Monastery',
  title: 'Zhydychyn Monastery',
}

import { LanguageProvider } from '@/context/LanguageContext';

export async function generateStaticParams() {
  return [{ lang: 'ua' }, { lang: 'en' }]
}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ lang: string }> }) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <body className="font-sans antialiased overflow-x-hidden">
        <LanguageProvider initialLocale={lang}>
          <Preloader />
          <div className="min-h-screen w-full relative">
            <LiveStreamWidget />
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
