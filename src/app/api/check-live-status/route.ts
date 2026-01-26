import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

interface LiveConfig {
    isManuallyLive?: boolean;
    youtubeLink?: string;
    channelID?: string;
    sundayStartTime?: string;
    sundayEndTime?: string;
    enableSundaySchedule?: boolean;
    plannedEvent?: {
        date?: string;
        startTime?: string;
        endTime?: string;
        isEnabled?: boolean;
    };
    message?: string;
}

export async function GET() {
    try {
        const payload = await getPayload({ config: configPromise });
        const globalData = await payload.findGlobal({
            slug: 'live-stream',
        }) as unknown as LiveConfig;

        let isLive = false;

        // 1. Manual Override
        if (globalData.isManuallyLive) {
            isLive = true;
        } else {
             // const now = new Date();
             
             // Timezone adjustment if needed. 
             // We assume the server time is roughly correct or we rely on UTC match.
             // For Kyiv time, we should technically offset. 
             // However, simplified local check for now:
             
             // Use proper timezone handling for Ukraine (GMT+2/GMT+3)
             // We'll trust the server's local time implies the target timezone or convert current UTC to Kyiv.
             const kyivTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Kiev" });
             const dateKyiv = new Date(kyivTime);
             const day = dateKyiv.getDay();
             const minutesOfDay = dateKyiv.getHours() * 60 + dateKyiv.getMinutes();

            // 2. Sunday Monitor
            if (globalData.enableSundaySchedule) {
                const startStr = globalData.sundayStartTime || '09:30';
                const endStr = globalData.sundayEndTime || '12:30';
                const [startH, startM] = startStr.split(':').map(Number);
                const [endH, endM] = endStr.split(':').map(Number);
                const startMin = startH * 60 + startM;
                const endMin = endH * 60 + endM;

                if (day === 0 && minutesOfDay >= startMin && minutesOfDay <= endMin) {
                    isLive = true;
                }
            }

            // 3. Planned Event
            // Note: date string from payload usually "YYYY-MM-DDT..."
            if (!isLive && globalData.plannedEvent?.date && globalData.plannedEvent.startTime && globalData.plannedEvent.endTime) {
                const eventDate = new Date(globalData.plannedEvent.date);
                // Check if same day
                if (eventDate.getDate() === dateKyiv.getDate() && 
                    eventDate.getMonth() === dateKyiv.getMonth() && 
                    eventDate.getFullYear() === dateKyiv.getFullYear()) {
                        
                    const [pStartH, pStartM] = globalData.plannedEvent.startTime.split(':').map(Number);
                    const [pEndH, pEndM] = globalData.plannedEvent.endTime.split(':').map(Number);
                    const pStartMin = pStartH * 60 + pStartM;
                    const pEndMin = pEndH * 60 + pEndM;

                    if (minutesOfDay >= pStartMin && minutesOfDay <= pEndMin) {
                        isLive = true;
                    }
                }
            }
        }

        // Determine Link
        // Default to internal media page
        let link = '/about/media?tab=live';
        
        // If we don't have a valid Channel ID to embed, fall back to YouTube
        if (!globalData.channelID || globalData.channelID === 'UC...') {
            link = globalData.youtubeLink || 'https://youtube.com';
        }

        return NextResponse.json({
            isLive,
            link,
            message: globalData.message || 'Пряма трансляція богослужіння'
        });

    } catch (error) {
        console.error('Check Live Status Error:', error);
        return NextResponse.json({ isLive: false }, { status: 500 });
    }
}
