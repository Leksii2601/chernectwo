import { GranularReadings, LiturgyReadings, DetailedReading, ServiceReadings } from '../LiturgicalTypes';
import { deduplicateReadings, normalizeReading } from './ReadingFormatter';

export interface ReadingCandidate {
    source: 'ordinary' | 'sunday' | 'saint' | 'feast';
    weight: number;
    liturgy: LiturgyReadings;
    matins?: ServiceReadings;
    vespers?: ServiceReadings;
    title?: string;
}

export class ReadingSynthesizer {
    /**
     * Synthesizes the final set of readings from a list of candidates
     * based on the Weight System and Cut-off Rules.
     */
    public synthesize(candidates: ReadingCandidate[], date: Date, nday: number, key: string): GranularReadings {

        // 1. Initial Container
        const finalReadings: GranularReadings = {
            date: date.toISOString().split('T')[0],
            liturgy: { title: "", apostle: [], gospel: [] },
            metadata: { key, nday, description: "Generated" },
            saints: [] // Populated separately or extracted from candidates
        };

        // 2. Sorting Candidates by Weight DESC
        // This helps in title generation and initial prioritization
        candidates.sort((a, b) => b.weight - a.weight);

        // 3. Title Generation
        // Primary Title comes from the highest weight candidate
        const titles: string[] = [];
        const uniqueTitles = new Set<string>();

        candidates.forEach(c => {
            if (c.title && !uniqueTitles.has(c.title)) {
                // If it's a high weight source OR if we don't have a title yet
                if (c.weight >= 7 || titles.length === 0) {
                    // Clean up specific "Saint" titles if needed
                    const t = c.title.trim();
                    if (t && t !== "Літургія" && t !== "Saint" && t !== "Saint.") {
                        // Check for substring overlap to prevent "St. Basil. St. Basil the Great"
                        // Only perform this check if we already have titles
                        const isDuplicate = Array.from(uniqueTitles).some(existing =>
                            existing.includes(t) || t.includes(existing)
                        );

                        if (!isDuplicate) {
                            uniqueTitles.add(t);
                            titles.push(t);
                        }
                    }
                } else if (c.weight >= 3 && titles.length < 2) {
                    // Include saint name if strict mode allows?
                    const t = c.title.trim();
                    if (t && t !== "Літургія" && t !== "Saint") {
                        const isDuplicate = Array.from(uniqueTitles).some(existing =>
                            existing.includes(t) || t.includes(existing)
                        );
                        if (!isDuplicate) {
                            uniqueTitles.add(t);
                            titles.push(t);
                        }
                    }
                }
            }
        });
        finalReadings.liturgy.title = titles.join(". ");

        // 4. Reading Aggregation
        // We flatten all readings, attaching their source weight
        let apostles = this.flattenReadings(candidates, 'apostle');
        let gospels = this.flattenReadings(candidates, 'gospel');

        // 5. Deduplication
        apostles = this.deduplicate(apostles);
        gospels = this.deduplicate(gospels);

        // 6. The Cut-off Rule
        // Rule: If TOTAL readings (Apostles + Gospels) > 3, leave only highest weights.
        // E.g. Sunday (10) + Saint (3) = 2 Ap + 2 Gp = 4 Readings. 4 > 3.
        // Logic: Calculate thresholds based on Max Weight available.

        const totalCount = apostles.length + gospels.length;

        if (totalCount > 3) {
            // Find Global Max Weight
            const maxW_Ap = Math.max(...apostles.map(i => i.weight), 0);
            const maxW_Gp = Math.max(...gospels.map(i => i.weight), 0);
            const globalMax = Math.max(maxW_Ap, maxW_Gp);

            // Check if this is a Lenten Saturday (special rule: keep both ordinary + saint)
            const dow = date.getDay();
            const isLentenSaturday = dow === 6 && nday >= -48 && nday <= -8;

            // Determine Cutoff Threshold
            let threshold = 0;
            const isPentecostarion = nday >= 0 && nday <= 50;
            // Pre-Lent (Publican, Prodigal, Meatfare, Cheesefare) requires merging Saint + Row readings
            const isPreLent = nday >= -70 && nday <= -49;

            if (globalMax >= 10 && !isLentenSaturday && !isPentecostarion && !isPreLent) {
                // Dominant Feast or Sunday present.
                // Keep only Significant Commemorations (>= 7).
                // Drops Simple Saints (3) and Ordinary (1) if they conflict.
                threshold = 7;

                // Exception: If we have Sunday(10) + Feast(15), both kept.
            } else if (isLentenSaturday || isPentecostarion || isPreLent) {
                // Lenten Saturday: Keep both ordinary (1) and saint (3)
                // Pentecostarion: Acts/John are vital, merge them with Saints/Feasts
                // Pre-Lent: Merge Row (Ordinary) with Saint
                threshold = 1;
            } else {
                // No dominant feast. 
                // Default to keeping ALL readings (Ordinary + Saint) to ensure completeness.
                // Previously threshold 3 dropped Ordinary (1), causing missing row readings.
                threshold = 1;
            }

            const filterFn = (list: WeightedReading[]) => {
                const kept = list.filter(i => i.weight >= threshold);
                if (kept.length > 0) { // Safety: Don't empty list completely if not strictly necessary? 
                    // Or enforce strict cut? Enforce strict.
                    list.length = 0;
                    kept.forEach(k => list.push(k));
                } else {
                    // If all filtered (e.g. all were weight 1?), keep top 1?
                    // With globalMax logic, this shouldn't happen for the group that Has Max.
                }
            };

            filterFn(apostles);
            filterFn(gospels);
        }

        // Apply deduplication and normalization
        finalReadings.liturgy.apostle = deduplicateReadings(apostles.map(r => r.def));
        finalReadings.liturgy.gospel = deduplicateReadings(gospels.map(r => r.def));

        return finalReadings;
    }

    private flattenReadings(candidates: ReadingCandidate[], type: 'apostle' | 'gospel'): WeightedReading[] {
        const result: WeightedReading[] = [];
        candidates.forEach(c => {
            const list = type === 'apostle' ? c.liturgy.apostle : c.liturgy.gospel;
            list.forEach(r => {
                // Ignore empty readings
                if (!r.reading && !r.source) return;

                // Label Polish within Synthesis
                if (c.source === 'ordinary') {
                    // r.label = "Ряд."; // Or context aware
                }

                result.push({
                    def: r,
                    weight: c.weight,
                    sourceStr: c.source
                });
            });
        });
        return result;
    }

    private deduplicate(list: WeightedReading[]): WeightedReading[] {
        const uniqueMap = new Map<string, WeightedReading>();

        list.forEach(item => {
            const key = this.getReadingKey(item.def);

            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, item);
            } else {
                const existing = uniqueMap.get(key)!;
                // Conflict Resolution: Prefer higher weight
                if (item.weight > existing.weight) {
                    uniqueMap.set(key, item);
                }
                // Equal weight: Prefer more detailed reading (with verses)
                else if (item.weight === existing.weight) {
                    const currentDetailed = (item.def.reading || "").includes(':');
                    const existingDetailed = (existing.def.reading || "").includes(':');

                    if (currentDetailed && !existingDetailed) {
                        uniqueMap.set(key, item);
                    }
                }
            }
        });

        return Array.from(uniqueMap.values());
    }

    private getReadingKey(r: DetailedReading): string {
        // Extract Pericope or normalize text
        const text = r.reading || r.source || "";
        // Strict pericope matching: "254 зач" or "зач. 254"
        const match = text.match(/(\d+)\s*зач|зач\.?\s*(\d+)/i);

        if (match) {
            const num = match[1] || match[2];
            const bookMatch = text.match(/^([^\.,\s]+)/);
            // Normalize book name to lower case to conflate "Кол." and "кол"
            const book = bookMatch ? bookMatch[1].toLowerCase() : "unknown";
            return `${book}_${num}`;
        }

        // Fallback: Remove punctuation and spaces for string comparison
        return text.trim().replace(/\s+/g, '').replace(/[.,:;]/g, '').toLowerCase();
    }

    // private applyWeightCutoff(list: WeightedReading[]) {
    //    // Unused legacy method
    // }
}

interface WeightedReading {
    def: DetailedReading;
    weight: number;
    sourceStr: string;
}
