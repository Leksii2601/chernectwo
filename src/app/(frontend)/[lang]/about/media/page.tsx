'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Play, Image as ImageIcon, Radio, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Video item type for fetched and mock videos
interface VideoItem {
    id: string;
    title: string;
    thumbnail: string;
    duration?: string;
    publishedAt?: string;
    date?: string;
}

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

export default function MediaPageClient() {
    const dynamicReports = [] as SimpleImage[];
    const liveConfig = undefined as LiveConfig | undefined;
    const isLiveNow = false;

    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const initialTab = (searchParams?.get('tab') as 'gallery' | 'video' | 'live') || 'gallery';
    const [activeTab, setActiveTab] = useState<'gallery' | 'video' | 'live'>(initialTab);

    const MOCK_GALLERY_IMAGES = [
        { src: '/media/history.jpg', title: t('media.mock_history') },
        { src: '/media/life.jpg', title: t('media.mock_life') },
        { src: '/media/piligrims.jpg', title: t('media.mock_pilgrims') },
        { src: '/media/donate.jpg', title: t('media.mock_donate') },
        { src: '/media/contacts.jpg', title: t('media.mock_arch') },
        { src: '/media/donate.jpg', title: t('media.mock_social') },
        { src: '/media/life.jpg', title: t('media.mock_service') },
        { src: '/media/history.jpg', title: t('media.mock_archive') },
    ];

    const VIDEOS = [
        { id: '1', title: t('media.video_1'), thumbnail: '/media/history.jpg', duration: '12:45' },
        { id: '2', title: t('media.video_2'), thumbnail: '/media/life.jpg', duration: '45:20' },
        { id: '3', title: t('media.video_3'), thumbnail: '/media/piligrims.jpg', duration: '15:10' },
    ];

    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [fetchedVideos, setFetchedVideos] = useState<VideoItem[]>([]);
    const [fetchedStreams, setFetchedStreams] = useState<VideoItem[]>([]);
    const [isLive, setIsLive] = useState(false);
    const [liveVideoId, setLiveVideoId] = useState<string | null>(null);
    const [fetchedChannelId, setFetchedChannelId] = useState<string | null>(null);

    // Pagination States
    const [galleryLimit, setGalleryLimit] = useState(9);
    const [videoPage, setVideoPage] = useState(1);
    const VIDEOS_PER_PAGE = 9;

    // State for Video Modal (Recent Videos)
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    // State for Live Tab Player
    // null = default state (show live if live, or offline message)
    // string = specific archive ID playing
    const [activeStreamId, setActiveStreamId] = useState<string | null>(null);

    useEffect(() => {
        // Fetch Cached Data (Videos + Streams)
        fetch('/api/youtube')
            .then(res => res.json())
            .then(data => {
                if (data.videos) setFetchedVideos(data.videos);
                if (data.streams) {
                    setFetchedStreams(data.streams);
                }
                if (typeof data.liveNow === 'boolean') {
                    setIsLive(data.liveNow);
                }
                if (data.liveVideoId) {
                    setLiveVideoId(data.liveVideoId);
                }
                if (data.channelId) {
                    setFetchedChannelId(data.channelId);
                }
            })
            .catch(err => console.error('Failed to fetch media', err));
    }, []);

    // Handle ESC key to close lightboxes & Lock Body Scroll
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedImageIndex(null);
                setSelectedVideoId(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (selectedImageIndex !== null || selectedVideoId !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImageIndex, selectedVideoId]);

    // Combine mock and dynamic
    const allGalleryImages = [...MOCK_GALLERY_IMAGES, ...dynamicReports];
    const visibleGalleryImages = allGalleryImages.slice(0, galleryLimit);

    // Video Pagination Logic
    const allVideos: VideoItem[] = fetchedVideos.length > 0 ? fetchedVideos : VIDEOS;
    const totalVideoPages = Math.ceil(allVideos.length / VIDEOS_PER_PAGE);
    const currentVideos = allVideos.slice((videoPage - 1) * VIDEOS_PER_PAGE, videoPage * VIDEOS_PER_PAGE);

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex === null) return;
        if (selectedImageIndex < allGalleryImages.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex === null) return;
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    // Use explicit channel ID if available, otherwise try to fallback (from API or hardcoded)
    const effectiveChannelId = (liveConfig?.channelID && liveConfig.channelID !== 'UC...')
        ? liveConfig.channelID
        : (fetchedChannelId || 'UCa7B3cQkhmvY1tMlSQjrGvQ');

    const channelEmbed = `https://www.youtube.com/embed/live_stream?channel=${effectiveChannelId}`;

    return (
        <main className="min-h-screen bg-stone-50">
            <PageHeader
                title={t('explore.media')}
                subtitle={t('media.subtitle')}
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
                        {t('media.tab_gallery')}
                    </button>

                    <button
                        onClick={() => setActiveTab('video')}
                        className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wider transition-all duration-300
              ${activeTab === 'video'
                                ? 'bg-amber-600 text-white shadow-xl scale-105'
                                : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-transparent shadow-sm'
                            }`}
                    >
                        <Play className="w-5 h-5" />
                        {t('media.tab_video')}
                    </button>

                    <button
                        onClick={() => setActiveTab('live')}
                        className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wider transition-all duration-300
              ${activeTab === 'live'
                                ? 'bg-amber-600 text-white shadow-xl scale-105'
                                : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-transparent shadow-sm'
                            }`}
                    >
                        <Radio className="w-5 h-5" />
                        {t('media.tab_live')}
                    </button>
                </div>

                {/* --- CONTENT SECTIONS --- */}

                {/* 1. GALLERY GRID */}
                {activeTab === 'gallery' && (
                    <div className="animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {visibleGalleryImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="group relative h-80 overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
                                    onClick={() => setSelectedImageIndex(idx)}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {galleryLimit < allGalleryImages.length && (
                            <div className="flex justify-center pb-8">
                                <button
                                    onClick={() => setGalleryLimit(prev => prev + 9)}
                                    className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-bold uppercase tracking-wider hover:bg-gray-50 hover:border-darksilver transition-all shadow-sm"
                                >
                                    {t('media.load_more')}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* 2. VIDEO GRID */}
                {activeTab === 'video' && (
                    <div className="animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {currentVideos.map((video: VideoItem) => (
                                <div
                                    key={video.id}
                                    onClick={() => setSelectedVideoId(video.id)}
                                    className="bg-white overflow-hidden shadow-sm group cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <div className="relative h-56 bg-gray-200">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.title}
                                            fill
                                            className="object-cover group-hover:opacity-90 transition-opacity"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-black/50 rounded-full p-3">
                                                <Play className="w-8 h-8 text-white fill-current" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2 group-hover:text-red-800 transition-colors line-clamp-2">
                                            {video.title}
                                        </h3>
                                        {video.publishedAt && (
                                            <p className="text-gray-500 text-sm">
                                                {new Date(video.publishedAt).toLocaleDateString('uk-UA')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalVideoPages > 1 && (
                            <div className="flex justify-center items-center gap-4 pb-8">
                                <button
                                    onClick={() => setVideoPage(p => Math.max(1, p - 1))}
                                    disabled={videoPage === 1}
                                    className={`p-2 rounded-full border ${videoPage === 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-400 text-gray-700 hover:bg-white hover:shadow-sm'}`}
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                <div className="flex gap-2">
                                    {Array.from({ length: totalVideoPages }, (_, i) => i + 1).map((pageNum) => (
                                        <button
                                            key={pageNum}
                                            onClick={() => setVideoPage(pageNum)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all ${videoPage === pageNum
                                                ? 'bg-amber-600 text-white shadow-md'
                                                : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setVideoPage(p => Math.min(totalVideoPages, p + 1))}
                                    disabled={videoPage === totalVideoPages}
                                    className={`p-2 rounded-full border ${videoPage === totalVideoPages ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-400 text-gray-700 hover:bg-white hover:shadow-sm'}`}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* 3. LIVE STREAMS & ARCHIVE */}
                {activeTab === 'live' && (
                    <div className="animate-fadeIn max-w-[1400px] mx-auto" id="live-player-section">

                        {/* Unified Layout: Stacked on Mobile, Two-Column (Height Matched) on Desktop */}
                        <div className="flex flex-col lg:block lg:relative">

                            {/* Left Column - Main Content (Dictates Height on Desktop) */}
                            <div className="w-full lg:w-[66%] lg:inline-block lg:align-top lg:mr-[2%] mb-6 lg:mb-0">
                                <div className="relative aspect-video bg-black shadow-2xl overflow-hidden border border-gray-800">
                                    {activeStreamId ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${activeStreamId}?autoplay=1`}
                                            title="Stream Player"
                                            className="w-full h-full absolute inset-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (isLive || isLiveNow) ? (
                                        <iframe
                                            src={liveVideoId ? `https://www.youtube.com/embed/${liveVideoId}?autoplay=1` : channelEmbed}
                                            title="Live Stream"
                                            className="w-full h-full absolute inset-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 bg-stone-900">
                                            <div className="mb-6 opacity-50">
                                                <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto">
                                                    <Radio className="w-8 h-8 text-white/50" />
                                                </div>
                                            </div>
                                            <h2 className="text-2xl font-bold font-church mb-3">{t('media.live_offline_title')}</h2>
                                            <p className="text-gray-400 max-w-md mb-6">
                                                {t('media.live_offline_desc')}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Control Bar */}
                                <div className="bg-white p-4 border-l border-r border-b border-gray-200">
                                    {activeStreamId ? (
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                                            <span className="text-red-600 font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                                                <Play className="w-4 h-4" /> {t('media.archive_record')}
                                            </span>
                                            <button onClick={() => setActiveStreamId(null)} className="text-gray-500 hover:text-black text-sm underline">
                                                {t('media.back_to_live')}
                                            </button>
                                        </div>
                                    ) : isLive ? (
                                        <div className="flex items-center justify-center sm:justify-start gap-2 text-red-600 animate-pulse">
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                            </span>
                                            <span className="font-bold uppercase text-sm tracking-wider">{t('media.live_now')}</span>
                                        </div>
                                    ) : (
                                        <div className="text-gray-500 text-sm font-medium text-center sm:text-left">{t('media.offline')}</div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Absolute Overlay on Desktop, Stacked Block on Mobile */}
                            <div className="w-full h-[400px] lg:h-full lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:w-[32%] flex flex-col bg-stone-100 border border-t border-r border-b border-gray-200 shadow-sm overflow-hidden rounded-b-lg lg:rounded-none">
                                <div className="p-4 border-b border-gray-200 bg-stone-100 flex-shrink-0">
                                    <h3 className="font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                                        <Radio className="w-5 h-5" />
                                        {t('media.archive_title')}
                                    </h3>
                                </div>
                                <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                    {fetchedStreams.length > 0 ? fetchedStreams.map((video: VideoItem) => (
                                        <div
                                            key={video.id}
                                            onClick={() => {
                                                setActiveStreamId(video.id);
                                                // Scroll to top on mobile only
                                                if (window.innerWidth < 1024) {
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }
                                            }}
                                            className={`flex gap-3 p-3 cursor-pointer transition-all border border-transparent hover:border-red-200 hover:bg-white hover:shadow-sm ${activeStreamId === video.id ? 'bg-white border-red-500 shadow-md ring-1 ring-red-500' : 'bg-transparent'}`}
                                        >
                                            <div className="relative w-36 h-20 flex-shrink-0 bg-gray-200 overflow-hidden">
                                                <Image
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {activeStreamId === video.id && (
                                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                        <Play className="w-6 h-6 text-white drop-shadow-md" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center min-w-0">
                                                <h4 className={`text-xs font-bold leading-tight mb-1 line-clamp-2 ${activeStreamId === video.id ? 'text-red-700' : 'text-gray-800'}`}>
                                                    {video.title}
                                                </h4>
                                                <span className="text-[10px] text-gray-500 font-bold uppercase">
                                                    {(video.publishedAt || video.date)
                                                        ? new Date(video.publishedAt ?? video.date ?? '').toLocaleDateString('uk-UA')
                                                        : ''}
                                                </span>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="p-8 text-center text-gray-400 text-sm">
                                            {t('media.loading_archive')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* LIGHTBOX MODAL (IMAGES) */}
            {selectedImageIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fadeIn"
                    onClick={() => setSelectedImageIndex(null)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedImageIndex(null)}
                        className="absolute top-4 right-4 z-50 text-white/50 hover:text-white transition-colors p-2"
                    >
                        <X className="w-10 h-10" />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrevImage}
                        disabled={selectedImageIndex === 0}
                        className={`absolute left-2 md:left-8 z-50 p-3 rounded-full transition-all backdrop-blur-sm ${selectedImageIndex === 0 ? 'opacity-30 cursor-not-allowed bg-white/5 text-gray-500' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                        onClick={handleNextImage}
                        disabled={selectedImageIndex === allGalleryImages.length - 1}
                        className={`absolute right-2 md:right-8 z-50 p-3 rounded-full transition-all backdrop-blur-sm ${selectedImageIndex === allGalleryImages.length - 1 ? 'opacity-30 cursor-not-allowed bg-white/5 text-gray-500' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative w-full h-full max-w-7xl max-h-screen p-4 md:p-10 flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={allGalleryImages[selectedImageIndex].src}
                                alt={allGalleryImages[selectedImageIndex].title}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* LIGHTBOX MODAL (VIDEO) */}
            {selectedVideoId && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fadeIn p-4 md:p-10"
                    onClick={() => setSelectedVideoId(null)}
                >
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={() => setSelectedVideoId(null)}
                        className="absolute top-4 right-4 z-50 text-white/50 hover:text-white transition-colors p-2"
                    >
                        <X className="w-10 h-10" />
                    </button>

                    <div className="w-full max-w-6xl aspect-video bg-black shadow-2xl relative border border-gray-800" onClick={(e) => e.stopPropagation()}>
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                            title="Video Player"
                            className="w-full h-full absolute inset-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            <Footer />

        </main>
    );
}
