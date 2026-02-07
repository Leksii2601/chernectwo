import { useMemo } from 'react';
import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';

export function useCalendarV3(date: Date) {
    const data = useMemo(() => {
        try {
            const engine = CalendarEngine.getInstance();
            const raw = engine.generateDay(date);

            // Transform V3 GranularReadings to V2-UI-Compatible Structure
            const syntheticRule = {
                data: {
                    title: raw.feast?.title || raw.liturgy.title,
                    liturgy: raw.liturgy,
                    matins: raw.matins?.readings || [], // Extract array from ServiceReadings
                    vespers: raw.vespers?.readings || [], // Extract array from ServiceReadings
                    hours: raw.hours || {}, 
                    rubrics: raw.rubrics || []
                }
            };

            return {
                rules: [syntheticRule],
                primaryTitle: raw.feast?.title || raw.liturgy.title,
                allTitles: [raw.feast?.title || raw.liturgy.title],
                hasReadings: raw.liturgy.apostle.length > 0 || raw.liturgy.gospel.length > 0,
                rank: raw.feast?.rank || 0,
                isMajorFeast: (raw.feast?.rank || 0) >= 8,
                nday: raw.metadata?.nday || 0,
                saints: raw.saints || [],
                isLoading: false,
                error: null
            };
        } catch (e) {
            console.error("Calendar V3 Error:", e);
            return {
                rules: [],
                primaryTitle: "Error",
                allTitles: [],
                hasReadings: false,
                rank: 0,
                isMajorFeast: false,
                nday: 0,
                saints: [],
                isLoading: false,
                error: String(e)
            };
        }
    }, [date]);

    return data;
}
