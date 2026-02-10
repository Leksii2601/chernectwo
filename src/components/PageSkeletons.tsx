
import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { HeaderSkeleton, FooterSkeleton } from '@/components/landing/LandingSkeleton';

export function MediaSkeleton() {
    return (
        <div className="min-h-screen bg-stone-50">
            <HeaderSkeleton />
            <div className="relative h-[60vh] min-h-[500px] bg-gray-200 overflow-hidden mb-12 flex items-center justify-center">
                <div className="text-center w-full max-w-4xl px-4 flex flex-col items-center gap-6">
                    <Skeleton className="h-6 w-48 bg-gray-300" />
                    <Skeleton className="h-16 w-3/4 md:w-1/2 bg-gray-300" />
                </div>
            </div>
            <div className="max-w-[1200px] mx-auto px-4 py-12 lg:py-24">
                {/* Tabs */}
                <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 mb-16">
                    <Skeleton className="h-16 w-40 rounded-full" />
                    <Skeleton className="h-16 w-40 rounded-full" />
                    <Skeleton className="h-16 w-40 rounded-full" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <Skeleton key={i} className="h-80 w-full rounded-none" />
                    ))}
                </div>
            </div>
            <FooterSkeleton />
        </div>
    );
}

export function NewsListSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <HeaderSkeleton />
            <div className="relative h-[60vh] min-h-[500px] bg-gray-200 overflow-hidden mb-12 flex items-center justify-center">
                <div className="text-center w-full max-w-4xl px-4 flex flex-col items-center gap-6">
                    <Skeleton className="h-6 w-48 bg-gray-300" />
                    <Skeleton className="h-16 w-3/4 md:w-1/2 bg-gray-300" />
                </div>
            </div>
            <div className="bg-gray-50 py-16 px-6">
                <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <Skeleton className="w-full h-[500px] rounded-lg" />
                    </div>
                    <div className="lg:w-1/3 flex flex-col gap-4">
                        {[1, 2, 3, 4].map(i => (
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
            <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-[80px] mt-8 mb-16 space-y-16">
                {[1, 2, 3].map(i => (
                    <div key={i} className="space-y-6">
                        <div className="flex justify-between items-end border-b border-black pb-4">
                            <Skeleton className="h-10 w-48" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map(j => (
                                <div key={j} className="space-y-3">
                                    <Skeleton className="h-48 w-full" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <FooterSkeleton />
        </div>
    );
}

export function NewsArticleSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <HeaderSkeleton />
            <div className="relative h-[60vh] min-h-[500px] bg-gray-200 overflow-hidden mb-12 flex items-center justify-center">
                <div className="text-center w-full max-w-4xl px-4 flex flex-col items-center gap-6">
                    <Skeleton className="h-6 w-48 bg-gray-300" />
                    <Skeleton className="h-16 w-3/4 md:w-1/2 bg-gray-300" />
                </div>
            </div>
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <Skeleton className="h-4 w-32 mb-12" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                    <div className="lg:col-span-7">
                        <Skeleton className="h-[500px] w-full rounded-sm" />
                    </div>
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <Skeleton className="h-12 w-full" />
                        <div className="flex justify-between border-b border-gray-200 pb-6">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-6 w-32 rounded-sm" />
                        </div>
                        <div className="space-y-2 border-l-4 border-gray-200 pl-6">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    </div>
                </div>
                <div className="space-y-4 max-w-none">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-64 w-full my-8" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
            <FooterSkeleton />
        </div>
    );
}

export function SocialProjectsSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <HeaderSkeleton />
            <div className="relative h-[60vh] min-h-[500px] bg-gray-200 overflow-hidden mb-12 flex items-center justify-center">
                <div className="text-center w-full max-w-4xl px-4 flex flex-col items-center gap-6">
                    <Skeleton className="h-6 w-48 bg-gray-300" />
                    <Skeleton className="h-16 w-3/4 md:w-1/2 bg-gray-300" />
                </div>
            </div>
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[80px] py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex flex-col gap-4">
                            <Skeleton className="h-[400px] w-full rounded-lg" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    ))}
                </div>
            </div>
            <FooterSkeleton />
        </div>
    );
}

export function PilgrimsSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <HeaderSkeleton />
            <div className="relative h-[60vh] min-h-[500px] bg-gray-200 overflow-hidden mb-12 flex items-center justify-center">
                <div className="text-center w-full max-w-4xl px-4 flex flex-col items-center gap-6">
                    <Skeleton className="h-6 w-48 bg-gray-300" />
                    <Skeleton className="h-16 w-3/4 md:w-1/2 bg-gray-300" />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-48 w-full rounded-lg" />
                    ))}
                </div>
            </div>
            <FooterSkeleton />
        </div>
    );
}

export function ContactsSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <HeaderSkeleton />
            <div className="relative h-[60vh] min-h-[500px] bg-gray-200 overflow-hidden mb-12 flex items-center justify-center">
                <div className="text-center w-full max-w-4xl px-4 flex flex-col items-center gap-6">
                    <Skeleton className="h-6 w-48 bg-gray-300" />
                    <Skeleton className="h-16 w-3/4 md:w-1/2 bg-gray-300" />
                </div>
            </div>
            <div className="border-b border-gray-100 bg-white sticky top-0 z-30 mt-10 mb-10">
                <div className="flex justify-center gap-10">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                </div>
            </div>
            <div className="mx-auto px-6 py-10 max-w-[1100px]">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="w-full md:w-1/2 space-y-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-4">
                                <Skeleton className="w-12 h-12 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-6 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-12 w-40" />
                    </div>
                </div>
            </div>
            <FooterSkeleton />
        </div>
    );
}

export function JoinSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <div className="pt-32 pb-16 px-4 max-w-3xl mx-auto">
                <Skeleton className="h-6 w-32 mb-8" />
                <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
                <div className="space-y-4 mb-12">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mx-auto" />
                </div>
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-14 w-48" />
                </div>
            </div>
            <FooterSkeleton />
        </div>
    );
}
