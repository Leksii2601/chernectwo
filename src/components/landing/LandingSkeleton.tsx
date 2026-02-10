import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export function HeaderSkeleton() {
    return (
        <div className="fixed top-0 left-0 right-0 z-[500] px-6 py-4 flex justify-between items-center bg-transparent">
            <Skeleton className="h-10 w-40" />
            <div className="hidden md:flex gap-8">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
        </div>
    );
}

export function HeroSkeleton() {
    return (
        <div className="relative w-full h-screen bg-gray-100 overflow-hidden flex items-center px-6 md:px-12 lg:px-20">
            <div className="w-full max-w-xl lg:max-w-[50%] flex flex-col gap-6">
                <Skeleton className="h-16 w-3/4" />
                <Skeleton className="h-16 w-1/2" />
                <div className="h-[2px] w-32 bg-gray-200" />
                <Skeleton className="h-10 w-40" />
            </div>
            <div className="absolute right-[10%] top-[20%] bottom-[20%] w-[35%] hidden lg:block">
                <Skeleton className="w-full h-full rounded-lg" />
            </div>
        </div>
    );
}

export function CalendarSectionSkeleton() {
    return (
        <div className="py-20 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                    <Skeleton className="h-10 w-48 mb-6" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-8" />
                    <Skeleton className="h-12 w-40" />
                </div>
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Skeleton className="h-64 rounded-xl" />
                    <Skeleton className="h-64 rounded-xl" />
                </div>
            </div>
        </div>
    );
}

export function NewsSectionSkeleton() {
    return (
        <div className="bg-gray-50 py-16 px-6">
            <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <Skeleton className="w-full h-[500px] rounded-lg" />
                </div>
                <div className="lg:w-1/3 flex flex-col gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex gap-4">
                            <Skeleton className="w-36 h-28 flex-shrink-0" />
                            <div className="flex flex-col justify-center gap-2 w-full">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-4/5" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function SocialInitiativesSkeleton() {
    return (
        <div className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12 flex flex-col items-center">
                <Skeleton className="h-10 w-64 mb-4" />
                <Skeleton className="h-4 w-96 max-w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col gap-4">
                        <Skeleton className="h-60 w-full rounded-xl" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function FooterSkeleton() {
    return (
        <div className="bg-gray-900 py-16 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-10 w-32 bg-gray-800" />
                    <Skeleton className="h-4 w-full bg-gray-800" />
                </div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <Skeleton className="h-6 w-24 bg-gray-800" />
                        <Skeleton className="h-4 w-full bg-gray-800" />
                        <Skeleton className="h-4 w-4/5 bg-gray-800" />
                        <Skeleton className="h-4 w-3/4 bg-gray-800" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function LandingSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <HeaderSkeleton />
            <HeroSkeleton />
            <CalendarSectionSkeleton />
            <NewsSectionSkeleton />
            <SocialInitiativesSkeleton />
            <FooterSkeleton />
        </div>
    );
}
