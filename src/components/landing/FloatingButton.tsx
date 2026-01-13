'use client'

import React, { useEffect, useState } from 'react'
import { HeartHandshake } from 'lucide-react'
import { clsx } from 'clsx'

export function FloatingButton() {
  const [isDark, setIsDark] = useState(false)
  const [isOverSocialInitiatives, setIsOverSocialInitiatives] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsDark(scrollY > 100)

      const socialSection = document.getElementById('social-initiatives')
      const footerSection = document.getElementById('footer')
      
      let isOverSocial = false
      let isOverFooter = false
      
      const buttonBottom = window.innerHeight - 32 // bottom-8
      const buttonTop = buttonBottom - 56          // height

      if (socialSection) {
        const rect = socialSection.getBoundingClientRect()
        isOverSocial = rect.top < buttonBottom && rect.bottom > buttonTop
      }

      if (footerSection) {
        const rect = footerSection.getBoundingClientRect()
        // Check if footer is visible in the button area
        isOverFooter = rect.top < buttonBottom
      }

      setIsOverSocialInitiatives(isOverSocial || isOverFooter)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const showWhite = isOverSocialInitiatives

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:flex">
      <a
        href="/donate"
        className={clsx(
          "flex items-center gap-3 border-2 px-6 py-3 transition-all duration-500 ease-in-out group backdrop-blur-sm",
           showWhite
             ? "border-white text-white hover:bg-white hover:text-black"
             : isDark 
             ? "border-black text-black hover:bg-black hover:text-white" 
             : "border-white text-white hover:bg-white hover:text-black"
        )}
      >
        <div className="flex flex-col items-start leading-none">
           <span className="font-bold uppercase tracking-widest text-sm">Скласти</span>
           <span className="font-bold uppercase tracking-widest text-sm">Пожертву</span>
        </div>
        <HeartHandshake className="w-6 h-6 group-hover:scale-110 transition-all duration-300" />
      </a>
    </div>
  )
}
