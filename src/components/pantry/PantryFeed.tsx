'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { Product, Category, pantryProducts } from '@/data/pantryData';
import { clsx } from 'clsx';
import { ShoppingBag, ChevronDown, X, Search, Heart, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export function PantryFeed() {
    const { t, language } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [openFilters, setOpenFilters] = useState<string[]>(['status', 'category', 'book_type', 'author']);

    // Dynamic Filter State
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
        status: [],
        author: [],
        coverType: [],
        language: [],
    });

    const categories: (Category | 'all')[] = [
        'all',
        'books',
        'cups',
        'rosaries',
        'crosses',
        'icons',
        'honey',
        'jam',
        'magnets',
        'cords'
    ];

    const toggleFilter = (section: string) => {
        setOpenFilters(prev =>
            prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
        );
    };

    const handleFilterChange = (section: string, value: string) => {
        setSelectedFilters(prev => {
            const current = prev[section] || [];
            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [section]: updated };
        });
    };

    const filteredProducts = useMemo(() => {
        return pantryProducts.filter(product => {
            // Category Filter
            if (activeCategory !== 'all' && product.category !== activeCategory) return false;

            // Search Filter
            if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

            // Sidebar Filters
            if (selectedFilters.status.length > 0) {
                const inStock = product.stock > 0;
                const matches = selectedFilters.status.some(s =>
                    (s === 'in_stock' && inStock) || (s === 'out_of_stock' && !inStock)
                );
                if (!matches) return false;
            }

            if (selectedFilters.author.length > 0 && 'author' in product) {
                if (!selectedFilters.author.includes(product.author)) return false;
            }

            if (selectedFilters.coverType.length > 0 && 'coverType' in product) {
                if (!selectedFilters.coverType.includes(product.coverType)) return false;
            }

            return true;
        });
    }, [activeCategory, searchQuery, selectedFilters]);

    // Derived metadata for filters
    const authors = useMemo(() => {
        const set = new Set<string>();
        pantryProducts.forEach(p => { if ('author' in p) set.add(p.author); });
        return Array.from(set);
    }, []);

    return (
        <section className="bg-white min-h-screen">
            {/* Main Layout: Container for Sidebar + Content */}
            <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row border-t border-gray-100">

                {/* LEFT SIDEBAR: Filters */}
                <aside className="w-full lg:w-[320px] lg:min-h-screen border-r border-gray-100 p-8 space-y-8 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-10">
                        <LayoutGrid size={20} className="text-gray-400" />
                        <span className="text-sm font-bold uppercase tracking-[0.2em]">{t('pantry.filter.title')}</span>
                    </div>

                    {/* Filter Action Group: Category */}
                    <FilterSection
                        title={t('pantry.categories')}
                        isOpen={openFilters.includes('category')}
                        onToggle={() => toggleFilter('category')}
                    >
                        <div className="flex flex-col gap-3">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={clsx(
                                        "text-left text-sm transition-all hover:text-black",
                                        activeCategory === cat ? "text-black font-bold" : "text-gray-400"
                                    )}
                                >
                                    {cat === 'all' ? t('pantry.all_products') : t(`pantry.category.${cat}`)}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Filter Group: Status */}
                    <FilterSection
                        title={t('pantry.status.title')}
                        isOpen={openFilters.includes('status')}
                        onToggle={() => toggleFilter('status')}
                    >
                        <div className="space-y-3">
                            {['in_stock', 'out_of_stock'].map(s => (
                                <label key={s} className="flex items-center gap-3 cursor-pointer group">
                                    <div
                                        onClick={() => handleFilterChange('status', s)}
                                        className={clsx(
                                            "w-5 h-5 border-2 transition-all flex items-center justify-center",
                                            selectedFilters.status.includes(s) ? "border-black bg-black" : "border-gray-200 group-hover:border-gray-400"
                                        )}
                                    >
                                        {selectedFilters.status.includes(s) && <div className="w-2 h-2 bg-white" />}
                                    </div>
                                    <span className="text-sm text-gray-500 group-hover:text-black">{t(`pantry.${s}`)}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Dynamic: Books Filters */}
                    {activeCategory === 'books' && (
                        <>
                            <FilterSection
                                title={t('pantry.filter.book_type')}
                                isOpen={openFilters.includes('book_type')}
                                onToggle={() => toggleFilter('book_type')}
                            >
                                <div className="space-y-3">
                                    {['hard', 'soft'].map(v => (
                                        <label key={v} className="flex items-center gap-3 cursor-pointer group">
                                            <div
                                                onClick={() => handleFilterChange('coverType', v)}
                                                className={clsx(
                                                    "w-5 h-5 border-2 transition-all flex items-center justify-center",
                                                    (selectedFilters.coverType || []).includes(v) ? "border-black bg-black" : "border-gray-200 group-hover:border-gray-400"
                                                )}
                                            >
                                                {(selectedFilters.coverType || []).includes(v) && <div className="w-2 h-2 bg-white" />}
                                            </div>
                                            <span className="text-sm text-gray-500 group-hover:text-black">{t(`pantry.value.${v}`)}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            <FilterSection
                                title={t('pantry.field.author')}
                                isOpen={openFilters.includes('author')}
                                onToggle={() => toggleFilter('author')}
                            >
                                <div className="space-y-3">
                                    {authors.map(v => (
                                        <label key={v} className="flex items-center gap-3 cursor-pointer group">
                                            <div
                                                onClick={() => handleFilterChange('author', v)}
                                                className={clsx(
                                                    "w-5 h-5 border-2 transition-all flex items-center justify-center",
                                                    (selectedFilters.author || []).includes(v) ? "border-black bg-black" : "border-gray-200 group-hover:border-gray-400"
                                                )}
                                            >
                                                {(selectedFilters.author || []).includes(v) && <div className="w-2 h-2 bg-white" />}
                                            </div>
                                            <span className="text-sm text-gray-500 group-hover:text-black">{v}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>
                        </>
                    )}
                </aside>

                {/* RIGHT CONTENT: Search + Grid */}
                <main className="flex-1 bg-white">
                    {/* Top Search Toolbar */}
                    <div className="border-b border-gray-100 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="relative w-full max-w-md group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('pantry.search.placeholder')}
                                className="w-full bg-gray-50 border-none pl-12 pr-4 py-3 text-sm focus:ring-1 focus:ring-black transition-all outline-none rounded-sm"
                            />
                        </div>

                        <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                            <span>{filteredProducts.length} {t('pantry.all_products')}</span>
                        </div>
                    </div>

                    {/* Grid with Shelf Design */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:bg-[#e8e4db] gap-y-12 lg:gap-y-0">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white border-b-[24px] border-[#d8d4cb] shadow-[inset_0_-8px_16px_rgba(0,0,0,0.1)] relative">
                                    <ProductCard
                                        product={product}
                                    />
                                    {/* Shelf Depth Effect */}
                                    <div className="absolute bottom-[-24px] left-0 right-0 h-2 bg-black/10 blur-sm pointer-events-none" />
                                </div>
                            ))}
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </section>
    );
}

function FilterSection({ title, children, isOpen, onToggle }: { title: string, children: React.ReactNode, isOpen: boolean, onToggle: () => void }) {
    return (
        <div className="border-b border-gray-100 pb-6 first:pt-0 pt-6">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between group mb-4"
            >
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                    {title}
                </span>
                <ChevronDown size={14} className={clsx("text-gray-400 transition-transform duration-300", isOpen && "rotate-180")} />
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                className="overflow-hidden"
            >
                <div>{children}</div>
            </motion.div>
        </div>
    );
}

function ProductCard({ product }: { product: Product }) {
    const { t, language } = useLanguage();
    const { addToCart, toggleWishlist, wishlist } = useCart();
    const lang = language.toLowerCase();
    const isWishlisted = wishlist.includes(product.id);

    const handleAddClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.id);
    };

    return (
        <Link
            href={`/${lang}/pantry/${product.id}`}
            className="group bg-white p-8 lg:p-10 cursor-pointer relative block h-full border-b lg:border-none"
        >
            {/* Badges */}
            <div className="absolute top-6 left-6 z-10 space-y-2">
                {product.badge && (
                    <div className={clsx(
                        "px-3 py-1 text-[9px] uppercase font-black text-white",
                        product.badge === 'new' ? "bg-red-600" : "bg-amber-600"
                    )}>
                        {t(`pantry.badge.${product.badge}`)}
                    </div>
                )}
            </div>

            {/* Wishlist Heart */}
            <button
                onClick={handleWishlistClick}
                className={clsx(
                    "absolute top-6 right-6 z-10 transition-colors",
                    isWishlisted ? "text-red-500" : "text-gray-200 hover:text-red-500"
                )}
            >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>

            <div className="relative aspect-[3/4] mb-8 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain transition-transform duration-1000 group-hover:scale-110 p-4"
                />
            </div>

            <div className="space-y-4">
                <div className="space-y-1">
                    <h3 className="font-kyiv text-lg leading-tight group-hover:text-amber-600 transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">
                        {'author' in product ? product.author : t(`pantry.category.${product.category}`)}
                    </p>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-sans font-light">{product.price} ₴</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 border-b border-dotted border-gray-200 w-fit pb-0.5">
                        {product.stock > 0 ? t('pantry.in_stock') : t('pantry.out_of_stock')}
                    </span>
                </div>

                <button
                    onClick={handleAddClick}
                    className="w-full mt-4 py-3 px-6 text-[10px] font-bold uppercase tracking-widest border border-gray-100 text-gray-400 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all"
                >
                    {t('pantry.add_to_cart')}
                </button>
            </div>
        </Link>
    );
}
