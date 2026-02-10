
import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { HeaderSkeleton, FooterSkeleton } from '@/components/landing/LandingSkeleton';

export function AboutUsSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <HeaderSkeleton />
            <div className="relative h-[60vh] min-h-[500px] bg-gray-200 overflow-hidden mb-12 flex items-center justify-center">
                <div className="text-center w-full max-w-4xl px-4 flex flex-col items-center gap-6">
                    <Skeleton className="h-6 w-48 bg-gray-300" />
                    <Skeleton className="h-16 w-3/4 md:w-1/2 bg-gray-300" />
                </div>
            </div>
            <div className="py-20 px-6 max-w-7xl mx-auto space-y-24">
                {[1, 2].map((i) => (
                    <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>
                        <Skeleton className="w-full lg:w-1/2 h-[400px] lg:h-[500px] rounded-xl" />
                        <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
                            <Skeleton className="h-2 w-16 bg-amber-200" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-12 w-48 mt-4 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
            <FooterSkeleton />
        </div>
    );
}

export function HistorySkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <HeaderSkeleton />
            <div className="relative h-[60vh] min-h-[500px] bg-gray-200 overflow-hidden mb-12 flex items-center justify-center">
                <div className="text-center w-full max-w-4xl px-4 flex flex-col items-center gap-6">
                    <Skeleton className="h-6 w-48 bg-gray-300" />
                    <Skeleton className="h-16 w-3/4 md:w-1/2 bg-gray-300" />
                </div>
            </div>
            <div className="py-16 max-w-[1000px] mx-auto px-4 text-center mb-12">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mx-auto mb-2" />
                <Skeleton className="h-4 w-4/5 mx-auto" />
            </div>
            <div className="max-w-4xl mx-auto px-4 relative pb-20">
                {/* Timeline Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 -translate-x-1/2" />
                {[1, 2, 3].map((i) => (
                    <div key={i} className={`relative flex items-center justify-between mb-16 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                        <div className="w-5/12 hidden md:block" />
                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-400 rounded-full border-4 border-white z-10" />
                        <div className="w-full md:w-5/12 pl-12 md:pl-0">
                            <Skeleton className="h-64 w-full rounded-xl mb-4" />
                            <Skeleton className="h-6 w-32 mb-2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    </div>
                ))}
            </div>
            <FooterSkeleton />
        </div>
    );
}

export function ComplexSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <HeaderSkeleton />
            <div className="relative h-[60vh] min-h-[500px] bg-gray-200 overflow-hidden mb-12 flex items-center justify-center">
                <div className="text-center w-full max-w-4xl px-4 flex flex-col items-center gap-6">
                    <Skeleton className="h-6 w-48 bg-gray-300" />
                    <Skeleton className="h-16 w-3/4 md:w-1/2 bg-gray-300" />
                </div>
            </div>
            <div className="bg-gray-100 py-12 border-b border-gray-200 mb-12">
                <div className="max-w-[1200px] mx-auto px-4">
                    <Skeleton className="h-8 w-64 mx-auto mb-4" />
                    <Skeleton className="h-4 w-1/2 mx-auto mb-8" />
                    <Skeleton className="w-full h-[300px] rounded-2xl bg-gray-300" />
                </div>
            </div>
            <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-16 flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/4">
                    <Skeleton className="h-8 w-48 mb-6" />
                    {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-12 w-full mb-2 rounded-lg" />)}
                </div>
                <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-80 w-full rounded-xl" />)}
                </div>
            </div>
            <FooterSkeleton />
        </div>
    );
}

export function SketesSkeleton() {
    return (
        <div className="min-h-screen bg-black">
            <HeaderSkeleton />
            <div className="relative h-screen w-full bg-gray-900 overflow-hidden flex items-center justify-center">
                <div className="text-center w-full max-w-4xl px-4 flex flex-col items-center gap-6">
                    <Skeleton className="h-6 w-48 bg-gray-800" />
                    <Skeleton className="h-16 w-3/4 md:w-1/2 bg-gray-800" />
                </div>
            </div>
            <div className="bg-zinc-900 border-t border-black/80 py-20 px-6">
                <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="aspect-[3/4] bg-gray-800 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
            <FooterSkeleton />
        </div>
    );
}

// Default export if someone imports generic (but we moved to named)
export function AboutPageSkeleton() {
    return <AboutUsSkeleton />;
}
