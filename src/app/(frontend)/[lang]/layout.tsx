import React from 'react'
import '../styles.css'
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.chernectvo.com'),
  title: {
    default: 'Свято-Миколаївський Жидичинський монастир | Офіційний сайт',
    template: '%s | Свято-Миколаївський Жидичинський монастир',
  },
  description: 'Офіційний сайт Свято-Миколаївського Жидичинського монастиря. Історія, розклад богослужінь, новини та соціальні проєкти.',
  openGraph: {
    title: 'Свято-Миколаївський Жидичинський монастир',
    description: 'Духовний осередок Волині з багатовіковою історією.',
    url: 'https://www.chernectvo.com',
    siteName: 'Свято-Миколаївський Жидичинський монастир',
    locale: 'uk_UA',
    type: 'website',
    images: [
      {
        url: '/media/pic_1.avif',
        width: 1200,
        height: 630,
        alt: 'Жидичинський монастир',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Жидичинський монастир',
    description: 'Духовний осередок Волині з багатовіковою історією.',
    images: ['/media/pic_1.avif'],
  },
  alternates: {
    canonical: './',
    languages: {
      'uk-UA': '/ua',
      'en-US': '/en',
    },
  },
  icons: {
    icon: [
      { url: '/media/favicon_black.avif', media: '(prefers-color-scheme: light)' },
      { url: '/media/favicon_white.avif', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';

export async function generateStaticParams() {
  return [{ lang: 'ua' }, { lang: 'en' }]
}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ lang: string }> }) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <body className="font-sans antialiased overflow-x-hidden">
        <CartProvider>
          <LanguageProvider initialLocale={lang}>
            <div className="min-h-screen w-full relative">
              {children}
            </div>
          </LanguageProvider>
        </CartProvider>
      </body>
    </html>
  )
}
