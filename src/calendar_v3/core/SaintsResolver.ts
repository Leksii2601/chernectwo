import { LiturgyBlock, ReadingDefinition } from './LiturgicalTypes';
import calendarCidsRaw from '../../calendar_v2/data/calendar_cids.json';
import ponomarLivesRaw from '../../calendar_v2/data/ponomar_raw/ponomar_lives_ua.json';
import saintsDataRaw from '../../calendar_v3/data/saints_metadata.json';

const CALENDAR_CIDS: Record<string, string[]> = calendarCidsRaw;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PONOMAR_LIVES: Record<string, any> = ponomarLivesRaw;
const SAINTS_DATA: Record<string, { saints: string[], isFast?: boolean }> = saintsDataRaw;

export interface SaintEntry {
    name: string; // The title/name of the saint
    serviceType: number; // Rank (0-6 etc)
    primaryTitle?: boolean; // New flag: is this the main title?
    liturgy?: LiturgyBlock;
    matins?: ReadingDefinition[];
    vespers?: ReadingDefinition[];
    // We can add more as needed
}

export class SaintsResolver {
    private static instance: SaintsResolver;

    private constructor() {}

    public static getInstance(): SaintsResolver {
        if (!SaintsResolver.instance) {
            SaintsResolver.instance = new SaintsResolver();
        }
        return SaintsResolver.instance;
    }

    /**
     * Retrieves all saints for the given date.
     * @param date - The date to check
     * @returns Array of SaintEntry objects with readings and rank
     */
    public getSaintsForDay(date: Date): SaintEntry[] {
        const mmdd = this.formatMMDD(date);
        
        // 0. Primary Title Source: saintsData.json
        const primaryData = SAINTS_DATA[mmdd];
        const results: SaintEntry[] = [];
        
        if (primaryData && primaryData.saints.length > 0) {
            // Priority: Taking the first saint as the "Title" of the day
            // Or joining them?
            // Usually we want the full string "Name 1. Name 2." or just list them.
            // Let's create a "Title Entry" - high priority for naming (but 0 rank readings unless fetched below)
            const titleStr = primaryData.saints.join(". ");
            results.push({
                name: titleStr,
                serviceType: 0, // Will be upgraded by logic if readings present? Or just used for title?
                primaryTitle: true,
                liturgy: { apostle: [], gospel: [] }
            });
        }
        
        // Revised Julian Note: 
        // In the previous engine, we sometimes projected dates or had logic for Old/New style.
        // Assuming 'date' passed here is the CIVIL date which matches the CHURCH date 
        // for Fixed Feasts in the Revised Julian calendar (e.g. Dec 25 is Dec 25).
        // If we needed Julian, we would shift. Currently assuming direct mapping.
        
        const cids = CALENDAR_CIDS[mmdd];
        // If no Ponomar IDs, we at least have the Title from saintsData (if exists)
        
        if (cids) {
            cids.forEach(cid => {
                const raw = PONOMAR_LIVES[cid];
                if (raw) {
                    // We don't rely on 'raw' for title anymore if saintsData exists??
                    // Or we merge readings into the primary title?
                    // Better: Push these as entries. The Engine will decide merging.
                    results.push(this.transformSaint(raw, raw.title)); 
                }
            });
        }

        return results;
    }

    private formatMMDD(date: Date): string {
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${m}-${d}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private transformSaint(raw: any, defaultName: string = "Saint"): SaintEntry {
        // Safe extraction of readings
        const liturgy: LiturgyBlock = { apostle: [], gospel: [] };
        
        if (raw.liturgy) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            raw.liturgy.forEach((r: any) => {
                const item: ReadingDefinition = {
                    reading: this.cleanReading(r.Reading),
                    label: this.getRankLabel(raw.serviceType),
                    type: r.Type
                };
                
                if (r.Pericope) {
                    item.reading = `${item.reading} (зач. ${r.Pericope})`;
                }

                if (r.Type === 'apostol') liturgy.apostle?.push(item);
                else if (r.Type === 'gospel') liturgy.gospel?.push(item);
            });
        }
        
        // Matins, Vespers similar... keeping it simple for now
        const matins: ReadingDefinition[] = [];
        if (raw.matins) {
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             raw.matins.forEach((r: any) => {
                 matins.push({
                     reading: this.cleanReading(r.Reading),
                     label: this.getRankLabel(raw.serviceType),
                     type: r.Type
                 });
             });
        }

        return {
            name: raw.title || raw.Title || defaultName, // Attempt to find title
            serviceType: raw.serviceType || 0,
            liturgy,
            matins
        };
    }

    private cleanReading(text: string): string {
        if (!text) return "";
        return text.replace(/_/g, " ")
                   .replace(/Composite_\d+/, (m) => `[${m}]`); // composites
    }
    
    private getRankLabel(rank: number): string {
        // Simple mapping
        if (rank >= 4) return "Свята";
        return "Святого"; 
    }
}
