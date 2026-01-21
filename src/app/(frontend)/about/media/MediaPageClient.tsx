'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import Image from 'next/image';
import { Play, Image as ImageIcon, Radio, Calendar, ChevronRight, X } from 'lucide-react';

// --- MOCK DATA (Existing) ---

const MOCK_GALLERY_IMAGES = [
  { src: '/media/history.jpg', title: 'Історичні пам’ятки' },
  { src: '/media/life.jpg', title: 'Монастирське життя' },
  { src: '/media/piligrims.jpg', title: 'Паломництво' },
  { src: '/media/donate.jpg', title: 'Благодійність' },
  { src: '/media/contacts.jpg', title: 'Архітектура' },
  { src: '/media/socialInitiatives/charity_dinner_2.jpg', title: 'Соціальне служіння' },
  // Duplicates for grid fullness
  { src: '/media/life.jpg', title: 'Богослужіння' },
  { src: '/media/history.jpg', title: 'Архівні фото' },
];

const VIDEOS = [
  { id: '1', title: 'Історія відродження монастиря', thumbnail: '/media/history.jpg', duration: '12:45' },
  { id: '2', title: 'Вечірнє богослужіння', thumbnail: '/media/life.jpg', duration: '45:20' },
  { id: '3', title: 'Проповідь настоятеля', thumbnail: '/media/piligrims.jpg', duration: '15:10' },
];

const UPCOMING_STREAMS = [
  { id: '1', date: 'Завтра, 09:00', title: 'Божественна Літургія', status: 'scheduled' },
  { id: '2', date: 'Неділя, 17:00', title: 'Акафіст до Св. Миколая', status: 'scheduled' },
];

interface SimpleImage {
    src: string;
    title: string;
}

interface LiveConfig {
    isManuallyLive?: boolean;
    youtubeLink?: string;
    channelID?: string;
    sundayStartTime?: string;
    sundayEndTime?: string;
}

interface MediaPageClientProps {
    dynamicReports: SimpleImage[];
    liveConfig?: LiveConfig;
    isLiveNow?: boolean;
}

export default function MediaPageClient({ dynamicReports, liveConfig, isLiveNow = false }: MediaPageClientProps) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'video' | 'live'>('gallery');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Combine mock and dynamic
  const allGalleryImages = [...MOCK_GALLERY_IMAGES, ...dynamicReports];

  const fullYoutubeLink = liveConfig?.youtubeLink || 'https://youtube.com';
  // Use explicit channel ID if available, otherwise try to fallback (flaky) or empty
  const channelEmbed = liveConfig?.channelID && liveConfig.channelID !== 'UC...' 
        ? `https://www.youtube.com/embed/live_stream?channel=${liveConfig.channelID}`
        : null;

  return (
    <main className="min-h-screen bg-stone-50">
      <PageHeader 
        title="МЕДІАТЕКА" 
        subtitle="Фото, відео та прямі трансляції з життя обителі"
        backgroundImage="/media/gallery.jpg" 
      />

      <div className="max-w-[1200px] mx-auto px-4 py-12 lg:py-24">
        
        {/* --- NAVIGATION TABS --- */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wider transition-all duration-300
              ${activeTab === 'gallery' 
                ? 'bg-amber-600 text-white shadow-xl scale-105' 
                : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-transparent shadow-sm'
              }`}
          >
            <ImageIcon className="w-5 h-5" />
            Фотогалерея
          </button>
          
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wider transition-all duration-300
              ${activeTab === 'video' 
                ? 'bg-red-600 text-white shadow-xl scale-105' 
                : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-transparent shadow-sm'
              }`}
          >
            <Play className="w-5 h-5" />
            Відеоархів
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wider transition-all duration-300
              ${activeTab === 'live' 
                ? 'bg-black text-white shadow-xl scale-105' 
                : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-transparent shadow-sm'
              }`}
          >
            <Radio className="w-5 h-5" />
            Трансляції
          </button>
        </div>

        {/* --- CONTENT SECTIONS --- */}
        
        {/* 1. GALLERY GRID */}
        {activeTab === 'gallery' && (
           <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allGalleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
                  onClick={() => setSelectedImage(img.src)}
                >
                  <Image 
                    src={img.src} 
                    alt={img.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <h3 className="text-white font-bold text-xl font-montserrat">{img.title}</h3>
                  </div>
                </div>
              ))}
           </div>
        )}

        {/* 2. VIDEO GRID */}
        {activeTab === 'video' && (
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {VIDEOS.map((video) => (
               <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:translate-y-[-5px] transition-transform duration-300 group">
                  <div className="relative h-56 bg-gray-200">
                     <Image 
                        src={video.thumbnail} 
                        alt={video.title} 
                        fill 
                        className="object-cover group-hover:opacity-90 transition-opacity" 
                     />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-white">
                           <Play className="w-6 h-6 text-white fill-current translate-x-1" />
                        </div>
                     </div>
                     <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                        {video.duration}
                     </span>
                  </div>
                  <div className="p-6">
                     <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2 group-hover:text-red-600 transition-colors">
                        {video.title}
                     </h3>
                     <p className="text-gray-500 text-sm">Переглядів: 1.2 тис • 2 дні тому</p>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* 3. LIVE STREAMS */}
        {activeTab === 'live' && (
          <div className="animate-fadeIn max-w-4xl mx-auto">
             
             {/* Main Player */}
             <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl mb-12 border-4 border-gray-900 group">
                {isLiveNow && channelEmbed ? (
                   <iframe 
                      src={channelEmbed} 
                      title="Live Stream"
                      className="w-full h-full" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                   ></iframe>
                ) : (
                /* Offline State */
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                   <div className="animate-pulse mb-6">
                      <div className="w-24 h-24 rounded-full border-4 border-red-600 flex items-center justify-center bg-red-600/20">
                         <Radio className="w-10 h-10 text-red-600" />
                      </div>
                   </div>
                   {isLiveNow ? (
                       // Live is theoretically active but no Channel ID is configured
                       <div className="px-4">
                           <h2 className="text-2xl md:text-3xl font-bold font-church mb-2">Налаштуйте ID каналу</h2>
                           <p className="text-gray-400">Трансляція активна за розкладом, але в Адмін панелі не вказано &quot;YouTube Channel ID&quot;.</p>
                       </div>
                   ) : (
                       <>
                        <h2 className="text-2xl md:text-3xl font-bold font-church mb-2">Наразі немає активних трансляцій</h2>
                        <p className="text-gray-400">Слідкуйте за розкладом нижче</p>
                       </>
                   )}
                </div>
                )}
             </div>

             {/* Schedule */}
             <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                   <Calendar className="w-6 h-6 text-amber-600" />
                   <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Розклад трансляцій</h3>
                </div>
                
                <div className="space-y-4">
                   {/* Scheduled Sunday Service */}
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors group cursor-pointer border-l-4 border-transparent hover:border-amber-500">
                         <div className="flex items-center gap-4 md:gap-8">
                            <div className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-lg shadow-sm text-center p-2 min-w-[64px]">
                               <span className="text-xs text-gray-500 uppercase font-bold">НЕДІЛЯ</span>
                               <span className="text-lg font-black text-amber-600">{liveConfig?.sundayStartTime || '09:30'}</span>
                            </div>
                            <div>
                               <h4 className="font-bold text-lg text-gray-900 group-hover:text-amber-700 transition-colors">Божественна Літургія</h4>
                               <span className="text-sm text-gray-500 font-medium">Канал: Чернецтво Волині</span>
                            </div>
                         </div>
                         <a href={fullYoutubeLink} target="_blank" className="hidden md:flex w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center text-gray-400 group-hover:text-amber-600 group-hover:border-amber-200 transition-all">
                             <ChevronRight className="w-5 h-5" />
                         </a>
                    </div>

                   {UPCOMING_STREAMS.map((stream) => (
                      <div key={stream.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors group cursor-pointer border-l-4 border-transparent hover:border-amber-500">
                         <div className="flex items-center gap-4 md:gap-8">
                            <div className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-lg shadow-sm text-center p-2 min-w-[64px]">
                               <span className="text-xs text-gray-500 uppercase font-bold">{stream.date.split(',')[0]}</span>
                               <span className="text-lg font-black text-amber-600">{stream.date.split(' ')[1]}</span>
                            </div>
                            <div>
                               <h4 className="font-bold text-lg text-gray-900 group-hover:text-amber-700 transition-colors">{stream.title}</h4>
                               <span className="text-sm text-gray-500 font-medium">Канал: Жидичин Центр</span>
                            </div>
                         </div>
                         <button className="hidden md:flex w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center text-gray-400 group-hover:text-amber-600 group-hover:border-amber-200 transition-all">
                             <ChevronRight className="w-5 h-5" />
                         </button>
                      </div>
                   ))}
                </div>

                <div className="mt-8 text-center">
                   <a href={fullYoutubeLink} target="_blank" className="inline-flex items-center text-red-600 font-bold hover:underline">
                      Перейти на YouTube канал
                      <ChevronRight className="w-4 h-4 ml-1" />
                   </a>
                </div>
             </div>
          </div>
        )}

      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
           <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-amber-500 transition-colors"
           >
              <X className="w-10 h-10" />
           </button>
           <div className="relative w-full max-w-5xl aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image 
                src={selectedImage} 
                alt="Fullview" 
                fill 
                className="object-contain"
              />
           </div>
        </div>
      )}

      <Footer />
      <FloatingButton />
    </main>
  );
}
