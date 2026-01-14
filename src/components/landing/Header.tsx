'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ChevronDown, Menu, X } from 'lucide-react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'

const navItems = [
  {
    label: 'Про монастир',
    href: '/about',
    dropdown: [
      { label: 'Історія', href: '/about/history' },
      { label: 'Богослужіння', href: '/about/schedule' },
      { label: 'Храмовий комплекс', href: '/about/complex' },
      { label: 'Скити', href: '/about/sketes' },
      { label: 'Життя обителі', href: '/about/life' },
      { label: 'Галерея', href: '/about/gallery' },
    ],
  },
  {
    label: 'Новини',
    href: '/news',
    dropdown: [
      { label: 'Публікації', href: '/news?category=publications' },
      { label: 'Анонси', href: '/news?category=announcements' },
      { label: 'Офіційно', href: '/news?category=official' },
    ],
  },
  { label: 'Соціальні проєкти', href: '/social-projects' },
  { label: 'Паломнику', href: '/pilgrims' },
  { label: 'Підтримати', href: '/donate' },
  { label: 'Контакти', href: '/contacts' },
]

export function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen) {
        document.body.style.overflow = 'hidden';
        if (searchInputRef.current) {
            // timeout to ensure visibility transition has started/modal is rendered
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    } else {
        document.body.style.overflow = '';
    }
    return () => {
        document.body.style.overflow = '';
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isSearchOpen) {
            setIsSearchOpen(false);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
        router.push(`/news?search=${encodeURIComponent(searchQuery)}`);
        setIsSearchOpen(false);
        setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // User requested: "Appear ONLY when user is completely at the top"
      // We'll set a strict threshold close to 0
      if (window.scrollY < 50) {
          setIsVisible(true);
      } else {
          setIsVisible(false);
      }
    }
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none',
        'bg-transparent py-8' // Always clear background now, as it only shows on Hero
      )}
    >
      <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
           <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
             <Image 
               src="/media/logo.webp" 
               alt="Logo" 
               fill
               className="object-contain"
             />
           </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8 text-white text-lg font-medium uppercase tracking-wider">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group "
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="hover:text-amber-400 transition-colors flex items-center gap-1 "
              >
                {item.label}
                {item.dropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
              
              {item.dropdown && activeDropdown === item.label && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white text-black rounded shadow-lg py-2 animate-fade-in">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors text-xs"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="relative flex items-center">
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-amber-400 transition-colors"
                aria-label="Open search"
            >
                <Search className="w-5 h-5" />
            </button>
          </div>
        </nav>

        {/* Language Switcher */}
        <div className="hidden md:flex items-center gap-2 text-white font-large text-lg">
          <span className="cursor-pointer hover:text-amber-400">UA</span>
          <span className="opacity-50">|</span>
          <span className="cursor-pointer hover:text-amber-400 opacity-70">EN</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-black/95 text-white p-4 h-screen overflow-y-auto">
          <nav className="flex flex-col gap-4 text-center">
             {/* Mobile Donate Button */}
            <div className="mb-6 flex justify-center">
              <Link 
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-white text-black px-6 py-3 font-bold uppercase tracking-wider rounded-sm hover:bg-amber-400 transition-colors w-full max-w-xs"
              >
                Скласти Пожертву
              </Link>
            </div>

            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="text-lg font-bold block py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="flex flex-col gap-2 mt-2 pl-4 border-l border-gray-700">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="text-sm text-gray-400 py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                       {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
             <div className="flex justify-center gap-4 mt-8 ">
                <span>UA</span>
                <span>EN</span>
             </div>
          </nav>
        </div>
      )}
    </header>

    {/* Full Screen Search Modal */}
    <div 
        className={clsx(
            "fixed inset-0 z-[100] bg-black/95 flex items-center justify-center transition-all duration-300 backdrop-blur-sm",
            isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        onClick={(e) => {
            if (e.target === e.currentTarget) setIsSearchOpen(false);
        }}
    >
         {/* Close Button */}
         <button 
            type="button"
            onClick={() => setIsSearchOpen(false)} 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
         >
             <X className="w-10 h-10" />
         </button>
         
         <form onSubmit={handleSearchSubmit} className="w-full max-w-4xl px-4 flex flex-col items-center gap-8">
             <div className="relative w-full">
                <input 
                    ref={searchInputRef}
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Пошук по сайту?"
                    className="w-full bg-transparent border-b-2 border-white/20 text-white text-3xl md:text-5xl font-light py-4 px-2 focus:outline-none focus:border-amber-400 placeholder:text-white/20 text-center transition-colors"
                />
             </div>
             
             <button 
                type="submit" 
                className="bg-white text-black px-12 py-4 text-lg font-bold tracking-widest hover:bg-amber-400 transition-colors uppercase"
             >
                Шукати
             </button>
         </form>
     </div>
    </>
  )
}
