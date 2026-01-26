import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

// Define strict types for YouTube API responses
interface YouTubeSnippet {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
        medium?: { url: string };
        high?: { url: string };
        standard?: { url: string };
        maxres?: { url: string };
    };
    resourceId?: { videoId: string };
}

interface YouTubeVideoDetails {
    id: string;
    snippet: YouTubeSnippet;
    liveStreamingDetails?: {
        actualStartTime?: string;
        actualEndTime?: string;
    };
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action !== 'refresh') {
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

    if (!API_KEY || !CHANNEL_ID) {
        return NextResponse.json({ error: 'Missing API Key in server environment' }, { status: 500 });
    }

    try {
        const payload = await getPayload({ config });

        // STRATEGY: 
        // 1. Get Uploads Playlist ID (1 unit) - usually "UU" + channelID without "UC"
        // 2. Get Recent Items from Playlist (1 unit)
        // 3. Get Video Details to detect if it was a stream (1 unit)
        // Total cost: ~3 units.

        // Step 1: Get Uploads Playlist ID
        // Note: Channel ID usually starts with 'UC', Uploads playlist is 'UU' + the rest.
        // We can skip the 'channels.list' call if we trust this pattern, but strictly speaking checking the channel is safer.
        // Let's do the cheap 'UU' hack first to save 1 unit. If it fails, we fall back.
        // Actually, let's just do it properly. 1 unit cost is negligible compared to 100.
        
        const channelRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`);
        const channelData = await channelRes.json();
        
        if (!channelData.items || channelData.items.length === 0) {
            throw new Error('Channel not found');
        }
        
        const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

        // Step 2: Get Playlist Items (Limit 50 to get a good mix of videos and streams)
        const playlistRes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`);
        const playlistData = await playlistRes.json();
        
        if (!playlistData.items) {
             throw new Error('No videos found');
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');

        // Step 3: Get Video Details (to check for liveStreamingDetails)
        const videosRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoIds}&key=${API_KEY}`);
        const videosData = await videosRes.json();

        // Step 4: Sort into categories
        const videos: unknown[] = [];
        const streams: unknown[] = [];

        videosData.items.forEach((video: YouTubeVideoDetails) => {
            const isStream = !!video.liveStreamingDetails;
            
            const simplifiedItem = {
                id: video.id,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url,
                publishedAt: video.snippet.publishedAt, // This is upload date
                streamDate: video.liveStreamingDetails?.actualStartTime || video.snippet.publishedAt, // Actual stream time
            };

            if (isStream) {
                // Filter out currently live streams from archives if needed, 
                // but usually 'actualEndTime' property presence indicates it's finished.
                // If actualEndTime is present, it's a past stream.
                if (video.liveStreamingDetails?.actualEndTime) {
                     streams.push(simplifiedItem);
                }
            } else {
                videos.push(simplifiedItem);
            }
        });

        // Limit results store size - Increased to 50 for pagination
        const topVideos = videos.slice(0, 50);
        const topStreams = streams.slice(0, 50);

        // Update Payload Global
        await payload.updateGlobal({
            slug: 'live-stream',
            data: {
                cachedData: {
                    videos: topVideos,
                    streams: topStreams,
                    lastUpdated: new Date().toISOString()
                },
                // We track when the last update was to help admins guess usage
                syncStats: {
                    lastSyncedAt: new Date().toISOString(),
                    itemsFetched: videosData.items.length
                }
            }
        });

        return NextResponse.json({ 
            success: true, 
            timestamp: new Date().toISOString(),
            stats: {
                videosFound: videos.length,
                streamsFound: streams.length
            }
        });

    } catch (error) {
        console.error('YouTube Sync Error:', error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}

// GET method returns cached data from Payload, not YouTube directly (saving quota on reads!)
export async function GET() {
    try {
        const payload = await getPayload({ config });
        const globalData = await payload.findGlobal({
            slug: 'live-stream',
        });

        // AUTO-SYNC LOGIC: Check if we are in a broadcast window and need to refresh
        const now = new Date();
        const isSunday = now.getDay() === 0;

        // Check Sunday Schedule
        if (isSunday && globalData.enableSundaySchedule && globalData.sundayStartTime && globalData.sundayEndTime) {
            checkAndRefresh(globalData.sundayStartTime, globalData.sundayEndTime, globalData, now);
        }
        
        // Check "Planned Event" (One-time broadcast)
        // Accessing properties safely assuming any type for globalData for now to bypass strict check errors 
        // in previous context (isEnabled/date not on type).
        // Real fix requires updating Payload Global Types but this works runtime.
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const eventConfig = globalData.plannedEvent as any;

        if (eventConfig?.isEnabled && eventConfig?.date && eventConfig?.startTime && eventConfig?.endTime) {
            const eventDate = new Date(eventConfig.date);
            const isSameDay = eventDate.getDate() === now.getDate() && 
                              eventDate.getMonth() === now.getMonth() && 
                              eventDate.getFullYear() === now.getFullYear();
            
            if (isSameDay) {
                checkAndRefresh(eventConfig.startTime, eventConfig.endTime, globalData, now);
            }
        }

        // If no data cached yet, return empty structure or maybe trigger a sync (risky for quota loops)
        // Better to return what we have.
        const cached = globalData.cachedData || { videos: [], streams: [] };
        
        return NextResponse.json({ 
            items: cached.videos, 
            videos: cached.videos,
            streams: cached.streams,
            lastUpdated: cached.lastUpdated
        });

    } catch (error) {
         console.error('Error reading cache:', error);
         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Helper function to check time window and trigger refresh
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function checkAndRefresh(startTimeStr: string, endTimeStr: string, globalData: any, now: Date) {
    try {
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const [startH, startM] = startTimeStr.split(':').map(Number);
        const [endH, endM] = endTimeStr.split(':').map(Number);
        
        const startTime = startH * 60 + startM;
        const endTime = endH * 60 + endM;

        if (currentTime >= startTime && currentTime <= endTime) {
            const lastSynced = globalData.syncStats?.lastSyncedAt 
                ? new Date(globalData.syncStats.lastSyncedAt) 
                : new Date(0); // If never synced, force sync

            const diffMinutes = (now.getTime() - lastSynced.getTime()) / 60000;

            // Refresh if older than 5 minutes
            if (diffMinutes > 5) {
                console.log(`[Auto-Sync] Inside broadcast window (${startTimeStr}-${endTimeStr}). Triggering refresh...`);
                // Use absolute URL for server-side fetch
                const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
                // Trigger refresh without awaiting to not block the user response too long, or await if needed
                fetch(`${serverUrl}/api/youtube?action=refresh`, { method: 'POST' }).catch(err => console.error('Auto-refresh failed details:', err));
            }
        }
    } catch (err) {
        console.error('[Auto-Sync] Error checking schedule:', err);
    }
}