import React from 'react'
import './styles.css'
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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="font-sans antialiased overflow-x-hidden">
         <Preloader />
         <div className="min-h-screen w-full relative">
            <LiveStreamWidget />
            {children}
         </div>
      </body>
    </html>
  )
}
