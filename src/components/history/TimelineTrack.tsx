
import React, { RefObject } from 'react';

interface TimelineTrackProps {
    lineRef: RefObject<HTMLDivElement | null>;
    progressRef: RefObject<HTMLDivElement | null>;
}

export const TimelineTrack: React.FC<TimelineTrackProps> = ({ lineRef, progressRef }) => {
    return (
        <>
            {/* Central Line Wrapper - Static Gray Line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-[10rem] lg:bottom-[10rem] w-[2px] bg-gray-200 -translate-x-[120%] lg:-translate-x-1/2 z-0"></div>

            {/* PROGRESS LINE - Dynamic Amber Line */}
            {/* Wrapped in a container that matches the static track's geometry so 100% height reaches exactly the end point */}
            <div ref={lineRef} className="absolute left-4 lg:left-1/2 top-0 bottom-[10rem] lg:bottom-[10rem] w-[3px] -translate-x-[120%] lg:-translate-x-1/2 z-10 pointer-events-none overflow-hidden">
                <div
                    ref={progressRef}
                    className="w-full bg-gradient-to-b from-amber-600 to-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.5)]"
                    style={{ height: '0%' }}
                ></div>
            </div>
        </>
    );
};
