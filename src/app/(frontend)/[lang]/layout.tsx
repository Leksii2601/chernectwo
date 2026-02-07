import React from 'react'
import '../styles.css'
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

export const metadata = {
  description: 'Zhydychyn Monastery',
  title: 'Zhydychyn Monastery',
  icons: {
    icon: [
      { url: '/media/favicon_black.png', media: '(prefers-color-scheme: light)' },
      { url: '/media/favicon_white.png', media: '(prefers-color-scheme: dark)' },
    ],
  },
}

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
