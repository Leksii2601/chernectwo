import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const payload = await getPayload({ config: configPromise });
        const liveSettings = await payload.findGlobal({
            slug: 'live-stream',
        });

        // 1. Check Global Manual Override (Force Live)
        if (liveSettings.isManuallyLive) {
            return NextResponse.json({
                isLive: true,
                link: liveSettings.youtubeLink,
                message: liveSettings.message || 'Зараз триває пряма трансляція',
            });
        }

        // 2. Check Planned One-Time Event
        if (liveSettings.plannedEvent?.startTime && liveSettings.plannedEvent?.endTime) {
            const now = new Date();
            const startStr = liveSettings.plannedEvent.startTime; // ISO string
            const endStr = liveSettings.plannedEvent.endTime;   // ISO string
            
            const start = new Date(startStr);
            const end = new Date(endStr);

            if (now >= start && now <= end) {
                 return NextResponse.json({
                    isLive: true,
                    link: liveSettings.youtubeLink,
                    message: liveSettings.message || 'Зараз триває пряма трансляція',
                });
            }
        }

        // 3. Check Automatic Sunday Schedule
        if (liveSettings.enableSundaySchedule) {
            // Get Current Kyiv Time
            // We need to be careful with Timezones on server (likely UTC)
            const kyivTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Kiev" });
            const date = new Date(kyivTime);

            const day = date.getDay(); // 0 is Sunday
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const currentTime = hours * 60 + minutes;

            // Schedule Config from Payload (defaults if empty)
            // @ts-ignore - Dynamic property access might not be fully typed if config just changed
            const startStr = liveSettings.sundayStartTime || '09:30';
             // @ts-ignore
            const endStr = liveSettings.sundayEndTime || '12:30';

            const [startH, startM] = startStr.split(':').map(Number);
            const [endH, endM] = endStr.split(':').map(Number);

            const START_TIME = (startH || 9) * 60 + (startM || 0); 
            const END_TIME = (endH || 12) * 60 + (endM || 30);  

            if (day === 0 && currentTime >= START_TIME && currentTime <= END_TIME) {
                return NextResponse.json({
                    isLive: true,
                    link: liveSettings.youtubeLink,
                    message: 'Трансляція Недільної Літургії',
                });
            }
        }

        return NextResponse.json({ isLive: false });

    } catch (error) {
        console.error('Error checking live status:', error);
        return NextResponse.json({ isLive: false }, { status: 500 });
    }
}
