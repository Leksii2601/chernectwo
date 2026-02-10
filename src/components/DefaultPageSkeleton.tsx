
import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { HeaderSkeleton, FooterSkeleton } from '@/components/landing/LandingSkeleton';

export function DefaultPageSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <HeaderSkeleton />

            {/* Generic Page Content Skeleton */}
            <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
                {/* Title Skeleton */}
                <Skeleton className="h-10 w-2/3 md:w-1/2 mb-8" />

                {/* Text Skeletons */}
                <div className="space-y-4 mb-12">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-6 w-full mt-8" />
                    <Skeleton className="h-6 w-5/6" />
                </div>

                {/* Grid Skeletons (generic blocks) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <Skeleton className="h-48 w-full rounded-xl" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>

            <FooterSkeleton />
        </div>
    );
}

export { HeaderSkeleton, FooterSkeleton }; // Re-export for convenience if needed
