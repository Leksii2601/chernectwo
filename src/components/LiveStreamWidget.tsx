'use client';

import React, { useState, useEffect } from 'react';
import { X, Radio, ExternalLink } from 'lucide-react';

// We'll fetch the status via a Next.js Server Action or API route ideally,  
// but for now, let's create a checking logic.

interface LiveStatus {
    isLive: boolean;
    link: string;
    message: string;
}

export function LiveStreamWidget() {
    const [status, setStatus] = useState<LiveStatus | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkStatus = async () => {
            try {
               const res = await fetch('/api/check-live-status');
               const data = await res.json();
               if (data.isLive) {
                   setStatus(data);
                   // Show if live AND not dismissed within this session (optional logic)
                   // For now just show
                   setIsVisible(true);
               }
            } catch (e) {
                console.error("Failed to check live status", e);
            }
        };

        // Check immediately
        checkStatus();

        // Check every 2 minutes (120000ms) to reduce request load while keeping it reasonably fresh
        const intervalId = setInterval(checkStatus, 120000); 

        return () => clearInterval(intervalId);
    }, []);

    if (!isVisible || !status) return null;

    return (
        <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 animate-slideInUp max-w-[calc(100vw-2rem)]">
            <div className="bg-gradient-to-r from-red-700 to-red-600 text-white pl-4 pr-10 py-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex items-center gap-3 border border-red-400/30 relative overflow-hidden backdrop-blur-md max-w-xs md:max-w-sm">
                
                {/* Background Decoration */}
                <div className="absolute -left-6 -top-12 w-24 h-48 bg-white/5 rotate-12 pointer-events-none"></div>

                {/* Animated Icon */}
                <div className="relative flex items-center justify-center w-10 h-10 bg-white/10 rounded-full shrink-0 animate-pulse ring-1 ring-white/20">
                    <Radio className="w-5 h-5 text-white" />
                    <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75"></span>
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base leading-tight mb-0.5 font-church tracking-wide flex items-center gap-2">
                        Прямий Ефір
                        <span className="flex h-1.5 w-1.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </span>
                    </h3>
                    <p className="text-xs text-red-50 font-medium leading-tight line-clamp-1 opacity-90">{status.message}</p>
                </div>

                {/* Action Link */}
                <a 
                    href={status.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center justify-center bg-white text-red-700 w-8 h-8 rounded-full hover:bg-neutral-100 hover:scale-110 hover:shadow-lg transition-all duration-300 group"
                    title="Дивитися трансляцію"
                >
                    <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                </a>

                {/* Close Button */}
                <button 
                    onClick={() => setIsVisible(false)}
                    className="absolute top-1 right-1 p-1 text-red-200 hover:text-white hover:bg-white/20 rounded-full transition-colors z-10"
                    aria-label="Close"
                >
                    <X className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}
