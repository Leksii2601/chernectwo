'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { Product, Category, pantryProducts } from '@/data/pantryData';
import { clsx } from 'clsx';
import { ShoppingBag, ChevronDown, Search, Heart, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export function PantryFeed() {
    const { t, language } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

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
        'cords',
        'tea'
    ];

    // Reset filters when category changes
    const handleCategoryChange = (cat: Category | 'all') => {
        setActiveCategory(cat);
        setSelectedFilters({});
    };

    // Define which fields are filterable for each category
    const filterConfig: Partial<Record<Category, string[]>> = {
        books: ['author', 'coverType', 'language'],
        cups: ['material', 'printType'],
        honey: ['type'],
        icons: ['technique', 'baseMaterial'],
        tea: ['weightGrams'],
        rosaries: ['beadsMaterial'],
    };

    // Extract unique values for filters based on active category
    const availableFilters = useMemo(() => {
        if (activeCategory === 'all') return {};
        const config = filterConfig[activeCategory];
        if (!config) return {};

        const filters: Record<string, string[]> = {};
        config.forEach(field => {
            const values = new Set<string>();
            pantryProducts
                .filter(p => p.category === activeCategory)
                .forEach(p => {
                    const value = (p as any)[field];
                    if (value !== undefined) values.add(String(value));
                });
            if (values.size > 0) filters[field] = Array.from(values);
        });
        return filters;
    }, [activeCategory]);

    const filteredProducts = useMemo(() => {
        return pantryProducts.filter(product => {
            // Category filter
            if (activeCategory !== 'all' && product.category !== activeCategory) return false;

            // Characteristic filters
            for (const [field, value] of Object.entries(selectedFilters)) {
                if (String((product as any)[field]) !== value) return false;
            }

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase().trim();
                const searchFields = [
                    product.title,
                    product.sku,
                    product.shortDescription || '',
                    product.description || '',
                    t(`pantry.category.${product.category}`),
                    ...Object.values(product).filter(v => typeof v === 'string')
                ];

                const isMatch = searchFields.some(field => 
                    field.toLowerCase().includes(query)
                );

                if (!isMatch) return false;
            }
            return true;
        });
    }, [activeCategory, searchQuery, selectedFilters, t]);

    return (
        <section className="bg-[#fcfaf7] min-h-screen">
            {/* Title & Search Bar */}
            <div className="bg-[#fcfaf7] pt-8 md:pt-12 pb-6 px-4 md:px-8">
                <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                    <div className="space-y-1 text-center md:text-left">
                        <h1 className="font-kyiv text-3xl sm:text-4xl md:text-7xl text-[#4a3f35] uppercase tracking-tight">
                            {activeCategory === 'all' ? t('pantry.title') : t(`pantry.category.${activeCategory}`)}
                        </h1>
                        <p className="text-[#b49e82] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center md:justify-start gap-4">
                            <span>{filteredProducts.length} {t('pantry.all_products')}</span>
                            {searchQuery && (
                                <span className="text-[#8c7e6a] lowercase font-normal italic hidden sm:inline">
                                    {language === 'UA' ? 'результати для' : 'results for'} "{searchQuery}"
                                </span>
                            )}
                        </p>
                    </div>

                    <div className="relative group max-w-md w-full mx-auto md:mx-0">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('pantry.search.placeholder')}
                            className="w-full bg-white/50 border-b border-[#e8e4db] focus:border-[#4a3f35] px-4 md:px-6 py-2 md:py-3 text-sm transition-all outline-none rounded-sm placeholder:text-[#d8d4cb] font-sans"
                        />
                        <Search className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-[#b49e82] opacity-50" size={18} />
                    </div>
                </div>
            </div>

            {/* Nav: Categories - Moved Below Title */}
            <div className="bg-[#fcfaf7] border-y border-[#e8e4db]/50 sticky top-16 md:top-20 z-40 overflow-x-auto no-scrollbar backdrop-blur-md bg-white/70">
                <div className="max-w-[1920px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4 h-11 md:h-12">
                    <div className="flex items-center gap-6 md:gap-8 h-full whitespace-nowrap overflow-x-auto no-scrollbar mx-auto md:mx-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={clsx(
                                    "text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-black transition-all h-full flex items-center border-b-2",
                                    activeCategory === cat
                                        ? "text-black border-black"
                                        : "text-[#8c7e6a] border-transparent hover:text-black opacity-60 hover:opacity-100"
                                )}
                            >
                                {cat === 'all' ? t('pantry.all_products') : t(`pantry.category.${cat}`)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Characteristic Filters */}
            <AnimatePresence>
                {Object.keys(availableFilters).length > 0 && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="bg-[#fcfaf7] border-b border-[#e8e4db] py-4 md:py-6 px-4 md:px-8 shadow-sm">
                            <div className="max-w-[1920px] mx-auto flex flex-wrap gap-2 md:gap-4 items-center justify-center md:justify-start">
                                <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#b49e82] font-black mr-2 hidden sm:inline">
                                    {t('pantry.filter.title')}:
                                </span>
                                {Object.entries(availableFilters).map(([field, values]) => (
                                    <div key={field} className="relative group min-w-[120px] md:min-w-[auto]">
                                        <select
                                            value={selectedFilters[field] || ''}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setSelectedFilters(prev => {
                                                    const next = { ...prev };
                                                    if (val) next[field] = val;
                                                    else delete next[field];
                                                    return next;
                                                });
                                            }}
                                            className="w-full appearance-none bg-white border border-[#e8e4db] px-3 md:px-4 py-1.5 md:py-2 pr-8 md:pr-10 text-[9px] md:text-[10px] uppercase font-bold tracking-wider rounded-sm outline-none focus:border-[#b49e82] cursor-pointer hover:bg-[#fbfaf8] transition-colors"
                                        >
                                            <option value="">{t(`pantry.field.${field}`)}</option>
                                            {values.map(val => (
                                                <option key={val} value={val}>
                                                    {t(`pantry.value.${val}`) !== `pantry.value.${val}` ? t(`pantry.value.${val}`) : val}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#b49e82]" />
                                    </div>
                                ))}
                                {Object.keys(selectedFilters).length > 0 && (
                                    <button
                                        onClick={() => setSelectedFilters({})}
                                        className="text-[8px] md:text-[9px] uppercase font-black text-red-800 hover:scale-105 transition-transform px-3 py-1 bg-red-50 rounded-full"
                                    >
                                        {language === 'UA' ? 'Скинути' : 'Reset'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content: Shelf Grid */}

            <main className="max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-0 gap-y-0 bg-[#e8e4db]">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white border-b-[20px] border-[#d8d4cb] shadow-[inset_0_-4px_12px_rgba(0,0,0,0.05)] relative group/shelf">
                                <ProductCard product={product} />
                                {/* Shelf Shadow */}
                                <div className="absolute bottom-[-20px] left-0 right-0 h-1 bg-black/5 blur-sm pointer-events-none" />
                            </div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-32 text-center space-y-4">
                        <div className="w-16 h-16 bg-[#f8f5f0] rounded-full flex items-center justify-center mx-auto">
                            <Search size={24} className="text-[#d8d4cb]" />
                        </div>
                        <p className="text-[#8c7e6a] font-sans font-light italic">
                            {language === 'UA' ? 'Нічого не знайдено за вашим запитом' : 'Nothing found for your request'}
                        </p>
                    </div>
                )}
            </main>
        </section>
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

    // Helper to get primary characteristic
    const getCharacteristic = () => {
        if (product.mainCharacteristic) return product.mainCharacteristic;
        
        const characteristics: string[] = [];
        
        switch (product.category) {
            case 'books': 
                if ('author' in product) characteristics.push(product.author);
                if ('coverType' in product) characteristics.push(t(`pantry.value.${product.coverType}`));
                break;
            case 'cups': 
                if ('material' in product) characteristics.push(product.material);
                if ('volumeMl' in product) characteristics.push(`${product.volumeMl}мл`);
                break;
            case 'honey':
            case 'jam':
            case 'tea': 
                if ('weightGrams' in product) characteristics.push(`${product.weightGrams}г`);
                break;
            case 'rosaries': 
                if ('beadsMaterial' in product) characteristics.push(product.beadsMaterial);
                break;
            case 'icons': 
                if ('saint' in product) characteristics.push(product.saint);
                if ('sizeCm' in product) characteristics.push(product.sizeCm);
                break;
            default: 
                characteristics.push(t(`pantry.category.${product.category}`));
        }
        
        return characteristics.join(' | ');
    };

    return (
        <Link
            href={`/${lang}/pantry/${product.id}`}
            className="group bg-white p-6 lg:p-10 cursor-pointer relative block h-full border-r border-[#f3f1ed] transition-all hover:bg-[#fbfaf8]"
        >
            {/* Badges */}
            {product.badge && (
                <div className="absolute top-6 left-6 z-10">
                    <span className="bg-black text-white text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-sm">
                        {t(`pantry.badge.${product.badge}`)}
                    </span>
                </div>
            )}

            {/* Wishlist Heart */}
            <button
                onClick={handleWishlistClick}
                className={clsx(
                    "absolute top-6 right-6 z-10 transition-colors",
                    isWishlisted ? "text-red-500" : "text-gray-200 hover:text-red-500"
                )}
            >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
            </button>

            <div className="relative aspect-[4/5] mb-8 overflow-hidden bg-[#fafafa]/20 rounded-sm">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain transition-transform duration-1000 group-hover:scale-110 p-4"
                />
            </div>

            <div className="space-y-6">
                <div className="space-y-1">
                    <div className="flex flex-wrap gap-x-2">
                        <p className="text-[9px] text-[#b49e82] uppercase tracking-[0.2em] font-black">
                            {getCharacteristic()}
                        </p>
                    </div>
                    <h3 className="font-kyiv text-xl leading-[1.1] group-hover:text-[#b49e82] transition-colors line-clamp-2 min-h-[2.2em]">
                        {product.title}
                    </h3>
                </div>

                <div className="flex items-center justify-between border-t border-[#f3f1ed] pt-6">
                    <div className="flex flex-col">
                        <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold mb-1">{t('pantry.field.price')}</span>
                        <span className="text-xl font-sans font-light text-[#4a3f35] tracking-tighter">{product.price} ₴</span>
                    </div>
                    <button
                        onClick={handleAddClick}
                        className="w-12 h-12 bg-[#f8f5f0] text-[#8c7e6a] hover:bg-black hover:text-white transition-all rounded-full flex items-center justify-center border border-[#e8e4db] hover:border-black"
                    >
                        <ShoppingBag size={16} />
                    </button>
                </div>
            </div>
        </Link>
    );
}
