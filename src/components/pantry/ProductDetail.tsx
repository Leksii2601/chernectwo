'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/pantryData';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingBag, Heart, ChevronLeft, ChevronRight, BookOpen, Truck, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductDetail({ product }: { product: Product }) {
    const { t } = useLanguage();
    const { addToCart, toggleWishlist, wishlist } = useCart();
    const [activeImage, setActiveImage] = useState(0);
    const [added, setAdded] = useState(false);

    const isWishlisted = wishlist.includes(product.id);
    const gallery = product.gallery || [product.image];

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 pb-24">
            {/* Top Section: Visuals + Buying Info */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-24">

                {/* LEFT: Gallery */}
                <div className="w-full lg:w-[60%] flex gap-6">
                    {/* Thumbnails Sidebar */}
                    <div className="hidden md:flex flex-col gap-4 w-20 flex-shrink-0">
                        {gallery.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={clsx(
                                    "relative aspect-square border transition-all",
                                    activeImage === idx ? "border-amber-600 shadow-lg" : "border-gray-100 hover:border-gray-300"
                                )}
                            >
                                <Image src={img} alt={`${product.title} ${idx}`} fill className="object-contain p-1" />
                            </button>
                        ))}
                    </div>

                    {/* Main Image Stage */}
                    <div className="flex-1 bg-gray-50 aspect-square relative group overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeImage}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={gallery[activeImage]}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-8 md:p-16"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {gallery.length > 1 && (
                            <>
                                <button
                                    onClick={() => setActiveImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center translate-x-[-100%] group-hover:translate-x-0 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={() => setActiveImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center translate-x-[100%] group-hover:translate-x-0 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* RIGHT: Product Info */}
                <div className="w-full lg:w-[40%] flex flex-col pt-4">
                    {/* Art and Author */}
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-4 font-medium">
                        {t('pantry.product.by')} <span className="text-gray-900">{'author' in product ? product.author : product.category}</span>
                        <span className="mx-2 opacity-30">|</span>
                        ({t('pantry.product.art')}: {product.sku})
                    </div>

                    <h1 className="font-kyiv text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-8 leading-[1.1]">
                        {product.title}
                    </h1>

                    <p className="text-gray-500 text-lg leading-relaxed font-sans font-light mb-12 max-w-xl">
                        {product.shortDescription}
                    </p>

                    {/* Specialized Info Box: Book Type */}
                    <div className="bg-gray-50 p-6 rounded-sm mb-12 flex items-start gap-5 border border-gray-100">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                            <BookOpen size={20} className="text-gray-900" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-bold text-gray-900">{t('pantry.product.paper_book')}</span>
                                <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                                    <Check size={14} className="text-white" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-400">{t('pantry.product.delivery_info')}</p>
                        </div>
                    </div>

                    {/* Price and Stock */}
                    <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                        <div className="text-3xl font-sans font-light text-gray-900">
                            {product.price} ₴
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-green-600">
                                {product.stock > 0 ? t('pantry.in_stock') : t('pantry.out_of_stock')}
                            </span>
                            <div className="w-full h-px bg-green-100 mt-1 border-b border-dotted" />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className={clsx(
                                "flex-1 px-8 py-5 text-sm uppercase tracking-[0.3em] font-bold transition-all flex items-center justify-center gap-4 group",
                                added ? "bg-green-600 text-white" : "bg-black text-white hover:bg-amber-600"
                            )}
                        >
                            {added ? <Check size={20} /> : <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                            {added ? t('pantry.added') || 'Додано' : t('pantry.add_to_cart')}
                        </button>
                        <button
                            onClick={() => toggleWishlist(product.id)}
                            className={clsx(
                                "w-16 h-16 border flex items-center justify-center transition-colors",
                                isWishlisted ? "border-red-100 bg-red-50 text-red-500" : "border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-red-500"
                            )}
                        >
                            <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Detailed Description & Specs */}
            {product.longDescription && (
                <div className="border-t border-gray-100 pt-24 max-w-4xl mx-auto">
                    <h2 className="font-kyiv text-3xl mb-12 text-center lg:text-left">{t('pantry.product.about_book')}</h2>
                    <div className="prose prose-lg max-w-none text-gray-600 font-sans font-light leading-loose space-y-8 whitespace-pre-line">
                        {product.longDescription}
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
                        <MetadataBox label={t('pantry.field.language')} value={('language' in product ? product.language : '—')} />
                        <MetadataBox label={t('pantry.product.isbn')} value={product.sku} />
                        <MetadataBox label={t('pantry.field.year')} value={('year' in product ? product.year : '—')} />
                    </div>
                </div>
            )}
        </div>
    );
}

function MetadataBox({ label, value }: { label: string, value: any }) {
    return (
        <div className="bg-gray-50/50 border border-gray-100 p-8 flex flex-col gap-2 rounded-sm">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{label}:</span>
            <span className="text-lg font-sans text-gray-900">{value}</span>
        </div>
    );
}
