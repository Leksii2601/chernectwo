'use client'

import React, { useEffect, useState } from 'react'
import { HeartHandshake } from 'lucide-react'
import { clsx } from 'clsx'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { useLanguage } from '@/context/LanguageContext';

export function FloatingButton() {
  const { t, language } = useLanguage();
  const [isDark, setIsDark] = useState(false)
  const [isOverFooter, setIsOverFooter] = useState(false)
  const [isOverSocialSection, setIsOverSocialSection] = useState(false)
  const pathname = usePathname()

  // Home page is now /[lang] or just / (before rewrite)
  // Check if pathname ends with the language code or is just /
  const isHomePage = pathname === '/' || pathname === `/${language.toLowerCase()}` || pathname === `/${language.toLowerCase()}/`;

  const langPrefix = `/${language.toLowerCase()}`;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsDark(scrollY > 100)

      const socialSection = document.getElementById('social-initiatives')
      const footerSection = document.getElementById('footer')

      let isSocial = false
      let isFooter = false

      const buttonBottom = window.innerHeight - 32 // bottom-8
      const buttonTop = buttonBottom - 56          // height

      // Only check social section on home page to avoid conflicts or unnecessary checks
      if (isHomePage && socialSection) {
        const rect = socialSection.getBoundingClientRect()
        isSocial = rect.top < buttonBottom && rect.bottom > buttonTop
      }

      if (footerSection) {
        const rect = footerSection.getBoundingClientRect()
        isFooter = rect.top < buttonBottom
      }

      setIsOverSocialSection(isSocial)
      setIsOverFooter(isFooter)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [pathname, isHomePage])

  // Determine button style based on page and position
  let useWhiteStyle = false;

  if (isHomePage) {
    // Home Page Logic:
    // White if at top (not isDark), OR if over social section, OR if over footer
    // Black if scrolled (isDark) AND not over dark sections
    if (!isDark || isOverSocialSection || isOverFooter) {
      useWhiteStyle = true;
    }
  } else {
    // Other Pages Logic:
    // Always Black, UNLESS over footer
    if (isOverFooter) {
      useWhiteStyle = true;
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:flex">
      <Link
        href={`${langPrefix}/donate`}
        className={clsx(
          "flex items-center gap-3 border-2 px-6 py-3 transition-all duration-500 ease-in-out group backdrop-blur-sm",
          useWhiteStyle
            ? "border-white text-white hover:bg-white hover:text-black"
            : "border-black text-black hover:bg-black hover:text-white"
        )}
      >
        <div className="flex flex-col items-start leading-none">
          <span className="font-bold uppercase tracking-widest text-sm text-center">
            {t('nav.make_donation').split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < t('nav.make_donation').split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </span>
        </div>
        <HeartHandshake className="w-6 h-6 group-hover:scale-110 transition-all duration-300" />
      </Link>
    </div>
  )
}
