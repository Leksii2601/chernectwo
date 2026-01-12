'use client'

import React, { useEffect, useState } from 'react'
import { HeartHandshake } from 'lucide-react'
import { clsx } from 'clsx'

export function FloatingButton() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Button is at the bottom. As we scroll down, the white section (below Hero) 
      // rises up from the bottom. The button overlaps it very quickly.
      // We switch to dark mode shortly after scrolling starts.
      setIsDark(window.scrollY > 100)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:flex">
      <a
        href="/donate"
        className={clsx(
          "flex items-center gap-3 border-2 px-6 py-3 transition-all group backdrop-blur-sm",
           isDark 
             ? "border-black text-black hover:bg-black hover:text-white" 
             : "border-white text-white hover:bg-white hover:text-black"
        )}
      >
        <div className="flex flex-col items-start leading-none">
           <span className="font-bold uppercase tracking-widest text-sm">Скласти</span>
           <span className="font-bold uppercase tracking-widest text-sm">Пожертву</span>
        </div>
        <HeartHandshake className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  )
}
