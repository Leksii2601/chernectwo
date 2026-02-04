'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Image from 'next/image';
import { clsx } from 'clsx';

interface PhotoInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    image?: string;
    gallery?: string[];
    children: React.ReactNode;
    currentIndex?: number;
    onIndexChange?: (index: number) => void;
    hideBottomGallery?: boolean;
}

export function PhotoInfoModal({
    isOpen,
    onClose,
    title,
    image,
    gallery,
    children,
    currentIndex,
    onIndexChange,
    hideBottomGallery = false,
}: PhotoInfoModalProps) {
    const [mounted, setMounted] = useState(false);
    const [animatingIn, setAnimatingIn] = useState(false);
    const [internalIndex, setInternalIndex] = useState(0);

    const activeIndex = currentIndex !== undefined ? currentIndex : internalIndex;
    const setActiveIndex = (index: number) => {
        if (onIndexChange) {
            onIndexChange(index);
        } else {
            setInternalIndex(index);
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
            document.body.style.paddingRight = `${scrollbarWidth}px`;

            setTimeout(() => setAnimatingIn(true), 10);
        } else {
            setAnimatingIn(false);

            setTimeout(() => {
                document.body.style.overflow = '';
                document.body.style.height = '';
                document.body.style.paddingRight = '';
            }, 700); // Wait for transition
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!mounted || !isOpen) return null;

    const images = gallery && gallery.length > 0 ? gallery : image ? [image] : [];

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((activeIndex + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
    };

    const headerImage = image || (gallery && gallery.length > 0 ? gallery[0] : null);

    return createPortal(
        <div
            className={clsx(
                "fixed inset-0 z-[1000] px-2 py-6 md:p-10 overflow-y-auto flex items-center justify-center",
                !animatingIn ? "opacity-0 invisible" : "opacity-100 visible"
            )}
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className={clsx(
                "fixed inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-700 touch-none",
                !animatingIn ? "opacity-0" : "opacity-100"
            )} />

            {/* Scroll Container Position */}
            <div className="min-h-full w-full flex items-center justify-center py-8">
                {/* Modal Container */}
                <div
                    className={clsx(
                        "relative w-full max-w-5xl bg-white rounded-t-none rounded-b-[40px] md:rounded-b-[60px] overflow-hidden shadow-2xl transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) my-auto",
                        !animatingIn
                            ? "opacity-0 translate-y-[100px] md:translate-y-[150px] scale-[0.98]"
                            : "opacity-100 translate-y-0 scale-100"
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-black hover:bg-amber-600 hover:text-white transition-all duration-300 group"
                    >
                        <X className="w-6 h-6 transition-transform duration-500 group-hover:rotate-90" />
                    </button>

                    {/* Header Image - ALWAYS STATIC PREVIEW */}
                    <div className="relative h-[300px] w-full bg-gray-100 group">
                        {headerImage ? (
                            <Image
                                src={headerImage}
                                alt={title}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full bg-gray-200">
                                <span className="font-montserrat text-4xl text-gray-400">{title[0]}</span>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90" />

                        <div className="absolute bottom-0 left-0 w-full p-8">
                            <h2 className={clsx(
                                "font-montserrat text-2xl md:text-3xl lg:text-4xl uppercase text-white tracking-wide transition-all duration-1000 delay-300",
                                !animatingIn ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
                            )}>
                                {title}
                            </h2>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-8 md:p-12">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
