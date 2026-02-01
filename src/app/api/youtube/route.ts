import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

// Helper to decode HTML entities
const decodeHTMLEntities = (text: string) => {
    if (!text) return "";
    return text
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
};

// Core Fetch Logic
async function fetchYouTubeData(forceRefresh = false) {
    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
        throw new Error('Missing Credentials');
    }

    const cacheOptions: RequestInit = forceRefresh
        ? { cache: 'no-store' }
        : { next: { revalidate: 300, tags: ['youtube'] } };

    const shortCacheOptions: RequestInit = forceRefresh
        ? { cache: 'no-store' }
        : { next: { revalidate: 30, tags: ['youtube'] } };

    // 1. Get Channel 'Uploads' Playlist ID
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${CHANNEL_ID}&part=contentDetails`;
    const channelRes = await fetch(channelUrl, cacheOptions);
    const channelData = await channelRes.json();
    const uploadsPlaylistId = channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
        throw new Error('Could not find uploads playlist');
    }

    // 2. Fetch Playlist Items (Videos + Streams mixed)
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet,contentDetails&maxResults=50`;
    const playlistRes = await fetch(playlistUrl, cacheOptions);
    const playlistData = await playlistRes.json();

    // 2b. Add a direct search for currently live events (most reliable way to check live status)
    const liveSearchUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&type=video&eventType=live&part=snippet`;
    const liveSearchRes = await fetch(liveSearchUrl, shortCacheOptions);
    const liveSearchData = await liveSearchRes.json();

    let liveNowId = liveSearchData?.items?.[0]?.id?.videoId || null;

    if (!playlistData.items && !liveNowId) {
        return { videos: [], streams: [], liveNow: false, rawStats: { itemsFetched: 0 } };
    }

    // 3. Get Details for these IDs to determine if they are Live/Stream/Video
    const videoIds = playlistData.items?.map((item: any) => item.contentDetails.videoId) || [];
    if (liveNowId && !videoIds.includes(liveNowId)) {
        videoIds.unshift(liveNowId);
    }

    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds.join(',')}&part=snippet,liveStreamingDetails`;
    const detailsRes = await fetch(detailsUrl, cacheOptions);
    const detailsData = await detailsRes.json();

    // Process Items
    let isLive = !!liveNowId;
    const videoList: any[] = [];
    const streamList: any[] = [];

    if (detailsData.items) {
        detailsData.items.forEach((item: any) => {
            const broadcastContent = item.snippet.liveBroadcastContent;
            const isStream = !!item.liveStreamingDetails;

            const formattedItem = {
                id: item.id,
                title: decodeHTMLEntities(item.snippet.title),
                thumbnail: item.snippet.thumbnails.maxres?.url ||
                    item.snippet.thumbnails.standard?.url ||
                    item.snippet.thumbnails.high?.url ||
                    item.snippet.thumbnails.medium?.url ||
                    item.snippet.thumbnails.default?.url,
                publishedAt: item.snippet.publishedAt,
                streamDate: item.liveStreamingDetails?.actualStartTime || item.snippet.publishedAt,
                description: item.snippet.description,
                liveBroadcastContent: broadcastContent
            };

            if (broadcastContent === 'live') {
                isLive = true;
            } else if (broadcastContent === 'upcoming') {
                // Ignore upcoming
            } else {
                if (isStream) {
                    streamList.push(formattedItem);
                } else {
                    videoList.push(formattedItem);
                }
            }
        });
    }

    return {
        videos: videoList,
        streams: streamList,
        liveNow: isLive,
        liveVideoId: liveNowId,
        rawStats: {
            itemsFetched: detailsData.items?.length || 0
        }
    };
}

// Helper for Auto-Sync
async function checkAndRefresh(globalData: any) {
    try {
        const kyivTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Kiev" });
        const now = new Date(kyivTime);
        const day = now.getDay();
        const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

        let shouldRefresh = false;

        // Check Sunday Window
        if (day === 0 && globalData.enableSundaySchedule) {
            const [startH, startM] = (globalData.sundayStartTime || '09:00').split(':').map(Number);
            const [endH, endM] = (globalData.sundayEndTime || '13:00').split(':').map(Number);
            const startMin = startH * 60 + startM;
            const endMin = endH * 60 + endM;

            if (currentTimeInMinutes >= startMin && currentTimeInMinutes <= endMin) {
                shouldRefresh = true;
            }
        }

        // Check Planned Event Window
        if (!shouldRefresh && globalData.plannedEvent?.isEnabled && globalData.plannedEvent?.date) {
            const eventDate = new Date(globalData.plannedEvent.date);
            if (eventDate.getDate() === now.getDate() &&
                eventDate.getMonth() === now.getMonth() &&
                eventDate.getFullYear() === now.getFullYear()) {

                const [pStartH, pStartM] = (globalData.plannedEvent.startTime || '00:00').split(':').map(Number);
                const [pEndH, pEndM] = (globalData.plannedEvent.endTime || '23:59').split(':').map(Number);
                const pStartMin = pStartH * 60 + pStartM;
                const pEndMin = pEndH * 60 + pEndM;

                if (currentTimeInMinutes >= pStartMin && currentTimeInMinutes <= pEndMin) {
                    shouldRefresh = true;
                }
            }
        }

        if (shouldRefresh) {
            const lastSynced = globalData.syncStats?.lastSyncedAt
                ? new Date(globalData.syncStats.lastSyncedAt)
                : new Date(0);

            const diffMinutes = (Date.now() - lastSynced.getTime()) / 60000;

            // Trigger sync if older than 10 minutes (to save quota)
            if (diffMinutes > 10) {
                console.log(`[Auto-Sync] Inside broadcast window. Triggering YouTube refresh...`);
                // We don't await this to keep the GET response fast
                const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
                fetch(`${serverUrl}/api/youtube`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                }).catch(err => console.error('Auto-sync trigger failed:', err));
            }
        }
    } catch (err) {
        console.error('Auto-sync helper error:', err);
    }
}

export async function GET() {
    try {
        const payload = await getPayload({ config: configPromise });
        const globalData = await payload.findGlobal({ slug: 'live-stream' });

        // Trigger Auto-Sync check in background
        checkAndRefresh(globalData);

        // Return cached data
        const cached = globalData.cachedData || { videos: [], streams: [], latestLiveStatus: false };

        return NextResponse.json({
            videos: cached.videos || [],
            streams: cached.streams || [],
            liveNow: cached.latestLiveStatus || false,
            channelId: CHANNEL_ID,
            lastUpdated: cached.lastUpdated
        });

    } catch (error) {
        console.error('Error reading YouTube cache:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST() {
    try {
        console.log('Refreshing YouTube Data and syncing with Payload...');
        const payload = await getPayload({ config: configPromise });

        // 1. Force fetch fresh data from YouTube
        const data = await fetchYouTubeData(true);

        // 2. Update Payload Global
        await payload.updateGlobal({
            slug: 'live-stream',
            data: {
                cachedData: {
                    videos: data.videos,
                    streams: data.streams,
                    latestLiveStatus: data.liveNow, // This is crucial for the indicator
                    lastUpdated: new Date().toISOString()
                },
                syncStats: {
                    lastSyncedAt: new Date().toISOString(),
                    itemsFetched: data.rawStats.itemsFetched
                }
            }
        });

        // 3. Revalidate Next.js cache
        revalidateTag('youtube');

        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            stats: {
                videosFound: data.videos.length,
                streamsFound: data.streams.length,
                liveNow: data.liveNow
            }
        });

    } catch (error) {
        console.error('YouTube Sync Error:', error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}