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
      { label: 'Богослужіння', href: '/#calendar' },
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };
  
  // Mobile accordion state
  const [mobileExpanded, setMobileExpanded] = useState<string[]>([]);
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const toggleMobileDropdown = (label: string) => {
    setMobileExpanded(prev => 
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  useEffect(() => {
    if (isSearchOpen || mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
        if (searchInputRef.current && isSearchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    } else {
        document.body.style.overflow = '';
    }
    return () => {
        document.body.style.overflow = '';
    }
  }, [isSearchOpen, mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
             if (isSearchOpen) setIsSearchOpen(false);
             if (mobileMenuOpen) setMobileMenuOpen(false);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, mobileMenuOpen]);

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
        (isVisible || mobileMenuOpen) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none',
        'bg-transparent py-4 md:py-8' // Reduced padding on mobile/opened state handled by content sizing
      )}
    >
      <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
           <div className={clsx(
               "relative flex items-center justify-center transition-all duration-300 ease-in-out",
               mobileMenuOpen ? "w-14 h-14" : "w-24 h-24 md:w-32 md:h-32"
           )}>
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
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className="hover:text-amber-400 transition-colors flex items-center gap-1 py-4"
              >
                {item.label}
                {item.dropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
              
              {item.dropdown && activeDropdown === item.label && (
                <div 
                    className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-md shadow-2xl rounded-b-sm overflow-hidden animate-fadeInScale border-t-2 border-amber-500/50"
                    onMouseEnter={() => {
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    }}
                    onMouseLeave={handleMouseLeave}
                >
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-6 py-3 hover:bg-amber-50 text-gray-800 hover:text-amber-600 transition-all duration-200 text-sm font-medium tracking-wide border-b border-gray-100 last:border-0"
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
          className="xl:hidden text-white relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>
    </header>

      {/* Mobile Menu Overlay - OUTSIDE of Header to prevent clipping/transform context issues */}
      <div className={clsx(
          "fixed inset-0 bg-black z-40 overflow-y-auto transition-all duration-300 pt-28 px-4 pb-12 flex flex-col",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
          <nav className="flex flex-col gap-4 text-center flex-grow">
             
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                {item.dropdown ? (
                    <div className="w-full">
                        <button 
                            onClick={() => toggleMobileDropdown(item.label)}
                            className="text-xl font-bold py-2 w-full flex items-center justify-center gap-2 text-white hover:text-amber-400 transition-colors"
                        >
                            {item.label}
                            <ChevronDown className={clsx("w-5 h-5 transition-transform duration-300", mobileExpanded.includes(item.label) ? "rotate-180" : "")} />
                        </button>
                        
                         <div className={clsx(
                             "overflow-hidden transition-all duration-300 flex flex-col items-center gap-3 bg-white/5 w-full rounded-lg",
                             mobileExpanded.includes(item.label) ? "max-h-[500px] py-4 mt-2 opacity-100" : "max-h-0 opacity-0"
                         )}>
                            {item.dropdown.map(subItem => (
                                <Link
                                    key={subItem.label}
                                    href={subItem.href}
                                    className="text-gray-300 hover:text-amber-400 py-2 text-base transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {subItem.label}
                                </Link>
                            ))}
                         </div>
                    </div>
                ) : (
                    item.label !== 'Підтримати' && (
                        <Link
                          href={item.href}
                          className="text-xl font-bold block py-2 text-white hover:text-amber-400 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                    )
                )}
                {/* Separator line for visual structure */}
                
              </div>
            ))}
          </nav>
            
            {/* Mobile Footer Area */}
             <div className="mt-8 flex flex-col items-center gap-6 pb-8">
                 <Link 
                    href="/donate"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-white text-black px-8 py-4 font-bold uppercase tracking-wider rounded-sm hover:bg-amber-400 transition-colors w-full max-w-xs text-center text-lg"
                  >
                    Скласти Пожертву
                  </Link>

                 <div className="flex justify-center gap-4 text-white/50 text-lg font-medium">
                    <span className="text-white">UA</span>
                    <span>EN</span>
                 </div>
             </div>
      </div>

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
