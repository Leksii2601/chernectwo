'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Product, pantryProducts } from '@/data/pantryData';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingBag, Heart, ChevronLeft, ChevronRight, BookOpen, Check, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function ProductDetail({ product }: { product: Product }) {
    const { t, language } = useLanguage();
    const { addToCart, toggleWishlist, wishlist } = useCart();
    const [activeImage, setActiveImage] = useState(0);
    const [added, setAdded] = useState(false);
    const lang = language.toLowerCase();

    const isWishlisted = wishlist.includes(product.id);
    const gallery = product.gallery || [product.image];

    // Algorithm: Recommended products from the same category
    const recommendedProducts = useMemo(() => {
        return pantryProducts
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4);
    }, [product.category, product.id]);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-[#fcfaf7]">
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 pt-4 md:pt-8 pb-32">
                {/* Simplified Breadcrumb */}
                <div className="mb-6 md:mb-12 text-center md:text-left">
                    <Link href={`/${lang}/pantry`} className="inline-flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#b49e82] hover:text-black transition-colors group">
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        {language === 'EN' ? 'Back to Store' : 'Назад до комори'}
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-32">
                    {/* LEFT: Gallery */}
                    <div className="w-full lg:w-[55%] flex flex-col md:flex-row gap-4 md:gap-6">
                        {/* Thumbnails Sidebar - Hidden on mobile, visible on tablet+ */}
                        <div className="hidden md:flex md:flex-col gap-4 w-20 flex-shrink-0">
                            {gallery.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={clsx(
                                        "relative aspect-square border-2 transition-all rounded-sm bg-white overflow-hidden",
                                        activeImage === idx ? "border-[#b49e82]" : "border-transparent hover:border-[#e8e4db]"
                                    )}
                                >
                                    <Image src={img} alt={`${product.title} ${idx}`} fill className="object-contain p-2" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image Stage */}
                        <div className="flex-1 bg-white aspect-square relative group overflow-hidden border border-[#e8e4db] rounded-sm">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={gallery[activeImage]}
                                        alt={product.title}
                                        fill
                                        className="object-contain p-4 sm:p-8 md:p-16"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Mobile Thumbnails Indicator */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 md:hidden">
                                {gallery.map((_, idx) => (
                                    <div 
                                        key={idx} 
                                        className={clsx(
                                            "w-1.5 h-1.5 rounded-full transition-all",
                                            activeImage === idx ? "bg-[#b49e82] w-4" : "bg-gray-300"
                                        )} 
                                    />
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            {gallery.length > 1 && (
                                <div className="absolute inset-x-2 md:inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                                    <button
                                        onClick={() => setActiveImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all pointer-events-auto border border-[#e8e4db] hover:bg-black hover:text-white"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button
                                        onClick={() => setActiveImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
                                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all pointer-events-auto border border-[#e8e4db] hover:bg-black hover:text-white"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="w-full lg:w-[45%] flex flex-col pt-4 md:pt-0">
                        <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-[#b49e82] mb-4 md:mb-6">
                            {'author' in product ? product.author : t(`pantry.category.${product.category}`)}
                        </div>

                        <h1 className="font-kyiv text-3xl md:text-5xl text-[#4a3f35] mb-4 md:mb-8 leading-tight">
                            {product.title}
                        </h1>

                        <div className="text-2xl md:text-3xl font-sans font-light text-gray-900 mb-6 md:mb-10">
                            {product.price} ₴
                        </div>

                        <p className="text-[#8c7e6a] text-sm md:text-lg leading-relaxed font-sans font-light mb-8 md:mb-12 max-w-xl">
                            {product.shortDescription}
                        </p>

                        {/* Availability */}
                        <div className="flex items-center gap-3 mb-8 md:mb-10 pb-8 md:pb-10 border-b border-[#e8e4db]">
                            <div className={clsx("w-2 h-2 rounded-full", product.stock > 0 ? "bg-green-500" : "bg-red-500")} />
                            <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-gray-500">
                                {product.stock > 0 ? t('pantry.in_stock') : t('pantry.out_of_stock')}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-12">
                            <button
                                onClick={handleAddToCart}
                                className={clsx(
                                    "flex-1 px-8 h-14 md:h-16 text-[10px] md:text-xs uppercase tracking-[0.3em] font-black transition-all flex items-center justify-center gap-4 group rounded-sm shadow-lg shadow-black/5",
                                    added ? "bg-green-600 text-white" : "bg-black text-white hover:bg-[#b49e82]"
                                )}
                            >
                                {added ? <Check size={18} /> : <ShoppingBag size={18} />}
                                {added ? (language === 'EN' ? 'Added' : 'Додано') : t('pantry.add_to_cart')}
                            </button>
                            <button
                                onClick={() => toggleWishlist(product.id)}
                                className={clsx(
                                    "w-full sm:w-14 md:w-16 h-14 md:h-16 border-2 flex items-center justify-center transition-all rounded-sm",
                                    isWishlisted ? "border-red-100 bg-red-50 text-red-500" : "border-[#e8e4db] text-[#8c7e6a] hover:bg-white hover:text-red-500 hover:border-red-300"
                                )}
                            >
                                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                            </button>
                        </div>

                        {/* Small Details Grid */}
                        <div className="grid grid-cols-2 gap-y-4 text-xs font-medium">
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-400 uppercase tracking-tighter text-[9px]">Артикул:</span>
                                <span>{product.sku}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-400 uppercase tracking-tighter text-[9px]">Категорія:</span>
                                <span>{t(`pantry.category.${product.category}`)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DESC & SPECS SECTION */}
                <div className="grid lg:grid-cols-[1fr_350px] gap-12 lg:gap-24 pt-16 md:pt-24 border-t border-[#e8e4db]">
                    {/* Long Description */}
                    <div className="space-y-8 md:space-y-12">
                        <div className="space-y-4 md:space-y-6">
                            <h2 className="font-kyiv text-2xl md:text-3xl text-[#4a3f35]">Опис товару</h2>
                            <div className="prose prose-sm md:prose-lg max-w-none text-gray-600 font-sans font-light leading-relaxed whitespace-pre-line">
                                {product.longDescription || product.description}
                            </div>
                        </div>
                    </div>

                    {/* Quick Specs / Sidebar Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 md:p-8 border border-[#e8e4db] rounded-sm shadow-sm space-y-6">
                            <h4 className="font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#b49e82] border-b border-gray-50 pb-4">Характеристики</h4>
                            <div className="space-y-4">
                                {Object.entries(product).map(([key, value]) => {
                                    if (['id', 'title', 'shortDescription', 'description', 'longDescription', 'image', 'gallery', 'category', 'status', 'sku', 'stock', 'price', 'badge'].includes(key)) return null;

                                    const label = t(`pantry.field.${key}`) !== `pantry.field.${key}` ? t(`pantry.field.${key}`) : key;
                                    let displayValue = String(value);

                                    if (typeof value === 'boolean') {
                                        displayValue = t(`pantry.value.${value}`);
                                    } else if (['hard', 'soft', 'decal', 'engraving', 'room', 'fridge'].includes(value as string)) {
                                        displayValue = t(`pantry.value.${value as string}`);
                                    }

                                    return (
                                        <div key={key} className="flex justify-between items-baseline gap-4 border-b border-[#f3f1ed] pb-2">
                                            <span className="text-[10px] uppercase text-[#b49e82] font-bold tracking-tight">{label}</span>
                                            <span className="text-sm font-medium text-right text-[#4a3f35]">{displayValue}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-[#f0ece4] p-8 border border-[#e8e4db] rounded-sm flex items-center gap-4">
                            <Truck size={24} className="text-[#8c7e6a] shrink-0" />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8c7e6a] leading-tight">Доставка по всій Україні Новою Поштою</p>
                        </div>
                    </div>
                </div>

                {/* RECOMMENDED PRODUCTS */}
                {recommendedProducts.length > 0 && (
                    <div className="mt-40">
                        <div className="flex items-center justify-between mb-12 border-b border-[#e8e4db] pb-8">
                            <h2 className="font-kyiv text-3xl text-[#4a3f35]">Рекомендовані товари</h2>
                            <Link href={`/${lang}/pantry`} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#b49e82] hover:text-black transition-colors">
                                Переглянути все <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
                            {recommendedProducts.map(p => (
                                <Link
                                    key={p.id}
                                    href={`/${lang}/pantry/${p.id}`}
                                    className="group space-y-4"
                                >
                                    <div className="aspect-[4/5] bg-white border border-[#e8e4db] rounded-sm relative overflow-hidden p-8">
                                        <Image src={p.image} alt={p.title} fill className="object-contain transition-transform duration-700 group-hover:scale-105 p-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-kyiv text-lg min-h-[3rem] group-hover:text-[#b49e82] transition-colors">{p.title}</h4>
                                        <p className="text-xs font-sans font-light text-gray-900">{p.price} ₴</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
