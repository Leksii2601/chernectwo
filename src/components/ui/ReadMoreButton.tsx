'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface ReadMoreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export const ReadMoreButton = ({ text, className, ...props }: ReadMoreButtonProps) => {
    return (
        <button
            className={clsx(
                "group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-800 hover:text-orange-600 transition-colors w-fit",
                className
            )}
            {...props}
        >
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-orange-600 transition-colors">
                <ArrowRight className="w-4 h-4" />
            </div>
            <span className="group-hover:pl-2 transition-all duration-300">{text}</span>
        </button>
    );
};
