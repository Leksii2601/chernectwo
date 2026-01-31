import React, { Suspense } from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import MediaPageClient from './MediaPageClient';
import type { Media } from '@/payload-types';

export const dynamic = 'force-dynamic';

interface LiveConfig {
    isManuallyLive?: boolean;
    youtubeLink?: string;
    channelID?: string;
    sundayStartTime?: string;
    sundayEndTime?: string;
    plannedEvent?: {
        startTime: string;
        endTime: string;
    };
    enableSundaySchedule?: boolean;
}

export default async function MediaPage() {
  const payload = await getPayload({ config: configPromise });
  
  const [reports, liveSettings] = await Promise.all([
      payload.find({
        collection: 'photo-reports',
        depth: 1,
        limit: 100,
      }),
      payload.findGlobal({
          slug: 'live-stream',
      })
  ]);

  // Server-side check for Live Status
  // Mimic logic from route.ts
  let isLiveNow = false;

  const liveConfig = liveSettings as unknown as LiveConfig; // Cast type

  if (liveConfig?.isManuallyLive) {
      isLiveNow = true;
  } else {
     // Check Sunday
     const kyivTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Kiev" });
     const date = new Date(kyivTime);
     const day = date.getDay(); // 0 is Sunday
     const hours = date.getHours();
     const minutes = date.getMinutes();
     const currentTime = hours * 60 + minutes;

     if (liveConfig?.enableSundaySchedule) {
        const startStr = liveConfig.sundayStartTime || '09:30';
        const endStr = liveConfig.sundayEndTime || '12:30';
        const [startH, startM] = startStr.split(':').map(Number);
        const [endH, endM] = endStr.split(':').map(Number);
        const START_TIME = (startH || 9) * 60 + (startM || 0); 
        const END_TIME = (endH || 12) * 60 + (endM || 30);  

        if (day === 0 && currentTime >= START_TIME && currentTime <= END_TIME) {
            isLiveNow = true;
        }
     }

     // Check Planned Event
     if (!isLiveNow && liveConfig?.plannedEvent?.startTime && liveConfig?.plannedEvent?.endTime) {
        const now = new Date(); // Server time (verify if timezone matters here compared to UTC ISO strings from database)
        // ISO strings are usually UTC. 
        const start = new Date(liveConfig.plannedEvent.startTime);
        const end = new Date(liveConfig.plannedEvent.endTime);
        
        if (now >= start && now <= end) {
            isLiveNow = true;
        }
     }
  }

  const dynamicReports = reports.docs.map((doc) => {
    let src = '/media/placeholder.jpg'; 
    
    if (doc.coverImage && typeof doc.coverImage === 'object') {
        const media = doc.coverImage as Media;
        if (media.url) {
            src = media.url;
        }
    }

    return {
      src,
      title: doc.title,
    };
  });

  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50" />}>
        <MediaPageClient dynamicReports={dynamicReports} liveConfig={liveConfig} isLiveNow={isLiveNow} />
    </Suspense>
  );
}
