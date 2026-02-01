'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, ChevronDown, Globe, MessageSquareDiff, Menu, X, Radio } from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isForcedVisible, setIsForcedVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isForcedVisible && Math.abs(currentScrollY - lastScrollY.current) > 2) {
        setIsForcedVisible(false);
      }

      if (currentScrollY === 0) {
        setIsForcedVisible(false);
      }
      setScrolled(currentScrollY > 100);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isForcedVisible]);

  // Helper for localized paths
  const getLocalizedPath = (path: string) => {
    if (path.startsWith('http') || path.startsWith('#')) return path;
    const langPrefix = language.toLowerCase();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (cleanPath.startsWith('/ua/') || cleanPath.startsWith('/en/')) return cleanPath;
    if (cleanPath === '/') return `/${langPrefix}`;
    return `/${langPrefix}${cleanPath}`;
  };

  const mainNavItems: NavItem[] = [
    {
      label: t('nav.about'),
      href: '/about',
      children: [
        { label: t('nav.history'), href: '/about/history' },
        { label: t('nav.schedule'), href: '/#calendar' },
        { label: t('nav.complex'), href: '/about/complex' },
        { label: t('nav.sketes'), href: '/about/sketes' },
        { label: t('nav.media'), href: '/about/media' },
        { label: language === 'UA' ? 'Комора' : 'Store', href: '/store' },
      ]
    },
    {
      label: t('nav.news'),
      href: '/news',
      children: [
        { label: t('nav.publications'), href: '/news#publications' },
        { label: t('nav.announcements'), href: '/news#announcements' },
        { label: t('nav.official'), href: '/news#official' },
      ]
    },
    { label: t('nav.social'), href: '/social-projects' },
    { label: t('nav.pilgrims'), href: '/pilgrims' },
    { label: t('nav.contacts'), href: '/contacts' },
  ].map(item => ({
    ...item,
    href: getLocalizedPath(item.href),
    children: item.children?.map(sub => ({ ...sub, href: getLocalizedPath(sub.href) }))
  }));

  const showMenu = !scrolled || isForcedVisible;
  const showBall = scrolled && !isForcedVisible;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${language.toLowerCase()}/news?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
  }, [isSearchOpen]);

  // Live Status Check
  const [liveStatus, setLiveStatus] = useState<{ isLive: boolean; message?: string; link?: string } | null>(null);

  useEffect(() => {
    // Check if user dismissed banner
    const dismissed = sessionStorage.getItem('liveBannerDismissed');
    if (dismissed) return;

    fetch('/api/check-live-status')
      .then(res => res.json())
      .then(data => {
        if (data.isLive) {
          setLiveStatus(data);
        }
      })
      .catch(err => console.error('Failed to check live status:', err));
  }, []);

  const dismissBanner = () => {
    setLiveStatus(null);
    sessionStorage.setItem('liveBannerDismissed', 'true');
  };

  return (
    <>
      {/* Top Premium Live Banner bar */}
      {liveStatus?.isLive && (
        <div className="fixed top-0 left-0 right-0 z-[600] animate-fadeInDown">
          <div className="bg-gradient-to-r from-red-700 to-red-600 text-white px-4 md:px-8 py-2 md:py-3 shadow-lg flex items-center justify-center gap-4 border-b border-white/10 relative overflow-hidden backdrop-blur-md">
            {/* Gloss Decoration */}
            <div className="absolute -left-6 -top-12 w-24 h-48 bg-white/5 rotate-12 pointer-events-none" />

            {/* Content Group */}
            <div className="flex items-center gap-3 md:gap-4 flex-1 justify-center max-w-6xl mx-auto">
              <div className="relative flex items-center justify-center w-8 h-8 bg-white/10 rounded-full shrink-0 animate-pulse ring-1 ring-white/10">
                <Radio size={14} className="text-white" />
                <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75" />
              </div>

              <div className="flex items-center gap-3">
                <h3 className="font-bold text-sm md:text-base tracking-wide flex items-center gap-2 whitespace-nowrap font-church">
                  {language === 'UA' ? 'Прямий Ефір' : 'Live Now'}
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                  </span>
                </h3>
              </div>

              <p className="hidden md:block text-xs md:text-sm text-red-50 font-medium leading-tight opacity-90 truncate max-w-md">
                {liveStatus.message || (language === 'UA' ? 'Зараз триває пряма трансляція богослужіння' : 'Ongoing live stream of the service')}
              </p>

              {/* Watch Action */}
              <Link
                href="/about/media?tab=live"
                className="flex-shrink-0 flex items-center justify-center bg-white text-red-700 px-4 py-1 rounded-full hover:bg-neutral-100 hover:scale-105 transition-all duration-300 group text-[10px] md:text-xs font-bold uppercase tracking-wider"
              >
                {language === 'UA' ? 'Дивитися' : 'Watch'}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5 group-hover:translate-x-0.5 transition-transform">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Close Button */}
            <button
              onClick={dismissBanner}
              className="absolute right-4 p-1.5 text-red-200 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Unified Super Top Bar */}
      <div className={clsx(
        "fixed left-1/2 -translate-x-1/2 z-[510] transition-all duration-[2000ms] ease-[cubic-bezier(0.19,1,0.22,1)] px-4 md:px-0",
        !showMenu ? "top-[-150px] opacity-0" : (liveStatus?.isLive ? "top-14 md:top-20" : "top-6 md:top-10"),
        "opacity-100 hidden md:block" // Hidden on mobile, actions moved to dock or separate menu
      )}>
        <div className="flex items-center bg-black border border-white/5 rounded-full p-1.5 pr-2.5 shadow-2xl backdrop-blur-md">
          {/* Language Section */}
          <div className="flex items-center gap-3 px-5 py-2.5 border-r border-white/10">
            <Globe size={13} className="text-white/30" />
            <div className="flex gap-4">
              <button onClick={() => setLanguage('UA')} className={clsx("text-[11.5px] font-light tracking-widest transition-all", language === 'UA' ? "text-amber-500" : "text-white/20 hover:text-white")}>UA</button>
              <button onClick={() => setLanguage('EN')} className={clsx("text-[11.5px] font-light tracking-widest transition-all", language === 'EN' ? "text-amber-500" : "text-white/20 hover:text-white")}>EN</button>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-center w-12 h-10 text-white/30 hover:text-white transition-colors border-r border-white/10"
          >
            <Search size={14} strokeWidth={1.5} />
          </button>

          {/* Key Actions Integrated */}
          <div className="flex items-center gap-1.5 ml-1.5">
            <Link
              href={getLocalizedPath('/prayer-requests')}
              className="flex items-center gap-2.5 rounded-full text-[11.5px] font-light uppercase tracking-[0.2em] px-5 py-3 transition-all duration-500 hover:bg-white hover:text-black text-white/60"
            >
              <MessageSquareDiff size={14} strokeWidth={1} />
              <span>{t('nav.write_note')}</span>
            </Link>
            <Link
              href={getLocalizedPath('/donate')}
              className="flex items-center gap-2.5 rounded-full text-[11.5px] font-normal uppercase tracking-[0.2em] px-5 py-3 transition-all duration-500 bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500 hover:text-black"
            >
              <Heart size={14} strokeWidth={1} />
              <span>{t('nav.donate')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grand Dock Header */}
      <header
        className={clsx(
          "fixed left-1/2 -translate-x-1/2 z-[500] transition-all duration-[2400ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
          "bg-black border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.9)] w-max max-w-[95vw] rounded-full py-3 px-4 flex items-center overflow-visible",
          !showMenu
            ? "bottom-[-200px] opacity-0 translate-y-40 scale-90"
            : "bottom-12 opacity-100 translate-y-0 scale-100",
          "hidden xl:flex" // Desktop only dock
        )}
      >
        <div className="flex items-center gap-1">
          {/* Logo */}
          <Link href={getLocalizedPath('/')} className="w-14 h-14 relative mr-10 ml-3 hover:scale-110 transition-transform duration-1000 cursor-pointer">
            <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
          </Link>

          {mainNavItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-8 py-6 rounded-full text-[14.5px] font-light uppercase tracking-[0.3em] text-white/50 hover:text-white hover:bg-white/5 transition-all duration-700 whitespace-nowrap active:scale-95"
                )}
              >
                <span>{item.label}</span>
                {item.children && <ChevronDown size={17} strokeWidth={1} className={clsx("transition-transform duration-500 ml-1 opacity-50", activeDropdown === item.label && "rotate-180 opacity-100")} />}
              </Link>

              {item.children && (
                <div className={clsx(
                  "absolute bottom-full left-1/2 -translate-x-1/2 pb-8 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]",
                  activeDropdown === item.label ? "opacity-100 translate-y-0 visible scale-100" : "opacity-0 translate-y-6 invisible pointer-events-none scale-95"
                )}>
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.8)] min-w-[260px] flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="px-8 py-4 rounded-2xl text-[11px] font-light uppercase tracking-[0.3em] text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between group/item"
                      >
                        {child.label}
                        <div className="w-2 h-2 rounded-full bg-amber-500/60 scale-0 group-hover/item:scale-100 transition-all duration-500" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </header>

      {/* Mobile / Tablet Minimal Header (Simplified version of the dock) */}
      <div className={clsx(
        "fixed left-0 right-0 z-[500] xl:hidden flex items-center justify-between px-6 py-4 transition-all duration-500",
        liveStatus?.isLive ? "top-11 md:top-14" : "top-0",
        scrolled ? "bg-black/80 backdrop-blur-md translate-y-0" : "bg-transparent -translate-y-full"
      )}>
        <Link href={getLocalizedPath('/')} className="w-10 h-10 relative">
          <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
        </Link>
        <button onClick={() => setMobileMenuOpen(true)} className="text-white p-2">
          <Menu size={24} />
        </button>
      </div>

      {/* Top Logo when at Top (Mobile only) */}
      <div className={clsx(
        "fixed left-6 z-[500] xl:hidden transition-opacity duration-500",
        liveStatus?.isLive ? "top-14 md:top-18" : "top-6",
        scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <Link href={getLocalizedPath('/')} className="w-16 h-16 relative block">
          <Image src="/media/logo.webp" alt="Logo" fill className="object-contain" />
        </Link>
      </div>

      {/* Mobile Top Actions (Mini Pill) */}
      <div className={clsx(
        "fixed right-6 z-[500] xl:hidden flex items-center gap-2 transition-all duration-500",
        liveStatus?.isLive ? "top-14 md:top-18" : "top-6",
        scrolled ? "opacity-0 translate-x-10 pointer-events-none" : "opacity-100 translate-x-0"
      )}>
        <button onClick={() => setIsSearchOpen(true)} className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white/50 border border-white/10 backdrop-blur-md">
          <Search size={16} />
        </button>
        <button onClick={() => setMobileMenuOpen(true)} className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white border border-white/10 backdrop-blur-md">
          <Menu size={16} />
        </button>
      </div>

      {/* Interactive Sentinel (Ball) */}
      <button
        onClick={() => setIsForcedVisible(true)}
        className={clsx(
          "fixed left-1/2 -translate-x-1/2 z-[520] transition-all duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)] group outline-none",
          showBall
            ? "bottom-12 opacity-100 translate-y-0 scale-100 blur-0"
            : "bottom-[-100px] opacity-0 translate-y-20 scale-50 blur-xl pointer-events-none"
        )}
      >
        <div className="relative w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(245,158,11,0.5)] transition-all duration-700 hover:scale-125 hover:rotate-12 active:scale-95">
          <div className="relative w-full h-full flex items-center justify-center rotate-nav">
            <div className="w-3.5 h-3.5 bg-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]" />
            <div className="absolute inset-0 border-2 border-black/10 rounded-full animate-ping opacity-20" />
          </div>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={clsx(
        "fixed inset-0 z-[600] bg-black transition-all duration-500 px-8 py-12 flex flex-col",
        mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
        <div className="flex justify-between items-center mb-16">
          <div className="flex gap-4">
            <button onClick={() => setLanguage('UA')} className={clsx("text-xs font-bold tracking-widest transition-all", language === 'UA' ? "text-amber-500" : "text-white/20")}>UA</button>
            <button onClick={() => setLanguage('EN')} className={clsx("text-xs font-bold tracking-widest transition-all", language === 'EN' ? "text-amber-500" : "text-white/20")}>EN</button>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="text-white/40 hover:text-white transition-colors">
            <X size={32} strokeWidth={1} />
          </button>
        </div>

        <nav className="flex flex-col gap-8 mb-12 overflow-y-auto">
          {mainNavItems.map(item => (
            <div key={item.label} className="flex flex-col gap-4">
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-light uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="flex flex-col gap-3 pl-4 border-l border-white/10">
                  {item.children.map(child => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-light uppercase tracking-[0.3em] text-white/20 hover:text-amber-500 transition-all"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <Link
            href={getLocalizedPath('/prayer-requests')}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-6 rounded-full border border-white/10 text-center text-sm uppercase tracking-[0.3em] font-light hover:bg-white hover:text-black transition-all"
          >
            {t('nav.write_note')}
          </Link>
          <Link
            href={getLocalizedPath('/donate')}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-6 rounded-full bg-amber-500 text-black text-center text-sm uppercase tracking-[0.3em] font-bold hover:bg-white transition-all"
          >
            {t('nav.donate')}
          </Link>
        </div>
      </div>

      {/* Search Modal */}
      <div className={clsx(
        "fixed inset-0 z-[700] bg-black flex items-center justify-center transition-all duration-500 px-6",
        isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-10 right-10 text-white/20 hover:text-white transition-colors"
        >
          <X size={40} strokeWidth={1} />
        </button>

        <form onSubmit={handleSearchSubmit} className="w-full max-w-4xl text-center">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full bg-transparent border-b border-white/10 py-8 text-4xl md:text-6xl font-light text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-white/5"
          />
          <button type="submit" className="mt-12 text-sm uppercase tracking-[0.5em] font-light text-white/30 hover:text-amber-500 transition-all">
            {t('search.button')}
          </button>
        </form>
      </div>

      <style jsx global>{`
                .rotate-nav {
                    animation: rotate-nav 25s linear infinite;
                }
                @keyframes rotate-nav {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
    </>
  );
}
