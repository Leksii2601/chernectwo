import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface CircleArrowButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
    className?: string;
    variant?: 'light' | 'dark';
}

export const CircleArrowButton = ({
    text,
    href,
    onClick,
    className,
    variant = 'dark'
}: CircleArrowButtonProps) => {

    const isLight = variant === 'light'; // For dark backgrounds (White button)

    // Styles
    const containerClasses = clsx(
        "inline-flex items-center gap-4 group/btn w-fit cursor-pointer",
        className
    );

    const circleClasses = clsx(
        "w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300",
        isLight
            ? "border-white group-hover/btn:bg-white group-hover/btn:border-transparent"
            : "border-gray-300 group-hover/btn:bg-amber-600 group-hover/btn:border-amber-600"
    );

    const iconClasses = clsx(
        "w-5 h-5 transition-colors duration-300",
        isLight
            ? "text-white group-hover/btn:text-black"
            : "text-black group-hover/btn:text-white"
    );

    const textClasses = clsx(
        "font-montserrat uppercase tracking-widest text-sm font-bold transition-transform duration-300 group-hover/btn:translate-x-2",
        isLight ? "text-white" : "text-black"
    );

    const content = (
        <>
            <div className={circleClasses}>
                <ArrowRight className={iconClasses} />
            </div>
            <span className={textClasses}>
                {text}
            </span>
        </>
    );

    if (href) {
        return (
            <Link href={href} className={containerClasses} onClick={onClick}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={containerClasses} type="button">
            {content}
        </button>
    );
};
