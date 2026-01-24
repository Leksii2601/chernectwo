'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    if (typeof window === 'undefined') return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />
            <div className="relative w-full max-w-2xl bg-white text-black rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-2xl font-montserrat uppercase tracking-wider">{title}</h3>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};
