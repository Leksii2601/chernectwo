'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NewsGalleryProps {
  images: Array<{
    url: string;
    caption?: string | null;
  }>;
}

export const NewsGallery: React.FC<NewsGalleryProps> = ({ images }) => {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);

  if (!images || images.length === 0) return null;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsGalleryLoading(true);
    setCurrentGalleryIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsGalleryLoading(true);
    setCurrentGalleryIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="my-12">
      <h3 className="text-2xl font-bold mb-6 font-molodo uppercase">Фотогалерея</h3>
      
      <div className="relative w-full h-[300px] md:h-[400px] bg-gray-100 rounded-sm overflow-hidden group max-w-4xl mx-auto shadow-md">
        <Image 
          src={images[currentGalleryIndex].url}
          alt={images[currentGalleryIndex].caption || "Gallery image"}
          fill
          onLoad={() => setIsGalleryLoading(false)}
          className={`object-cover transition-all duration-700 hover:scale-105 ${isGalleryLoading ? 'blur-sm scale-110' : 'blur-0 scale-100'}`}
        />
        
        {/* Caption */}
        {images[currentGalleryIndex].caption && (
           <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center z-10 backdrop-blur-sm">
             {images[currentGalleryIndex].caption}
           </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

        {/* Controls */}
        {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
                onClick={prevImage}
                className="bg-black/30 hover:bg-black/60 shadow-lg hover:shadow-xl text-white p-4 rounded-full transition-all flex items-center justify-center transform hover:scale-110 active:scale-95 backdrop-blur-sm"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={nextImage}
                className="bg-black/30 hover:bg-black/60 shadow-lg hover:shadow-xl text-white p-4 rounded-full transition-all flex items-center justify-center transform hover:scale-110 active:scale-95 backdrop-blur-sm"
            >
                <ArrowRight className="w-6 h-6" />
            </button>
            </div>
        )}

        {/* Dots Indicators */}
        {images.length > 1 && (
             <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 z-10">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentGalleryIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentGalleryIndex ? 'bg-amber-500 w-6' : 'bg-white/50 hover:bg-white'}`}
                    />
                ))}
             </div>
        )}
      </div>
    </div>
  );
};
