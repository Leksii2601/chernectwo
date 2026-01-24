'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';

interface ScrollRevealSectionProps {
    children: React.ReactNode;
    className?: string;
}

export const ScrollRevealSection = ({ children, className }: ScrollRevealSectionProps) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div 
            ref={ref}
            className={clsx(
                "transition-all duration-1000 ease-out transform",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24",
                className
            )}
        >
            {children}
        </div>
    );
};
