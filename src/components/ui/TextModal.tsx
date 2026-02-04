'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface TextModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function TextModal({
    isOpen,
    onClose,
    title,
    children,
}: TextModalProps) {
    const [mounted, setMounted] = useState(false);
    const [animatingIn, setAnimatingIn] = useState(false);

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
            }, 300);
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div
            className={clsx(
                "fixed inset-0 z-[1000] px-2 py-6 md:p-10 transition-all duration-300 overflow-y-auto flex items-center justify-center",
                !animatingIn ? "opacity-0 invisible" : "opacity-100 visible"
            )}
            onClick={onClose}
        >
            {/* Backdrop - Social style blur */}
            <div className={clsx(
                "fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 touch-none",
                !animatingIn ? "opacity-0" : "opacity-100"
            )} />

            {/* Modal Container - Temple Complex style */}
            <div
                className={clsx(
                    "relative w-full max-w-5xl bg-white rounded-t-none rounded-b-[60px] overflow-hidden shadow-2xl transition-all duration-700 my-auto",
                    !animatingIn ? "scale-90 opacity-0 translate-y-12 blur-lg" : "scale-100 opacity-100 translate-y-0 blur-0"
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 md:top-8 right-6 md:right-8 z-20 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-black hover:bg-amber-600 hover:text-white transition-all duration-300 group"
                >
                    <X className="w-6 h-6 transition-transform duration-500 group-hover:rotate-90" />
                </button>

                {/* Header Title (now part of content padding or separate block?) */}
                {/* Contacts modal puts title over image. Here we don't have image. We should keep title but style it nicely. */}
                <div className="p-5 md:p-12 lg:p-16 pr-16 md:pr-24 pb-0 md:pb-0 lg:pb-0">
                    <h3 className="font-montserrat text-2xl md:text-4xl font-bold text-gray-900 uppercase tracking-widest mb-0">
                        {title}
                    </h3>
                </div>

                {/* Content */}
                <div className="p-5 md:p-12 pt-0 text-gray-700 leading-relaxed text-base md:text-lg">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
