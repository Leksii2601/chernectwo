'use client';

import React from 'react';
import clsx from 'clsx';

interface SectionHeaderProps {
    title: string;
    className?: string;
}

export const SectionHeader = ({ title, className }: SectionHeaderProps) => {
    return (
        <div className={clsx("mb-10 lg:pl-10", className)}>
            <h2 className="text-4xl font-montserrat text-gray-900 mb-4 uppercase">
                {title}
            </h2>
            <div className="h-1 w-16 bg-orange-600"></div>
        </div>
    );
};
