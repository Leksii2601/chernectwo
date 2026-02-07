import { getOrthodoxPascha, getNday } from './PaschaMath';
import { getLectionaryKey } from './LectionaryResolver';
import { GranularReadings, LiturgyReadings, DetailedReading } from './LiturgicalTypes';
import lectionaryOrdinaryRaw from '../../calendar_v2/data/lectionary.json'; // The Core Ordinary Cycle
import lectionaryTriodionRaw from '../../calendar_v3/data/lectionary_triodion.json';
import lectionaryFixedRaw from '../../calendar_v3/data/lectionary_fixed.json'; // Fixed Feasts Source
import { RuleParser } from './RuleParser';
import { SaintsResolver } from './SaintsResolver';
import { ProphecyResolver } from './ProphecyResolver';
import { getSundayMatinsGospel } from './MatinsResolver';
import { ReadingSynthesizer, ReadingCandidate as SynthesizerCandidate } from './logic/ReadingSynthesizer';

/**
 * Calendar Engine V3
 * Orchestrates the generation of a liturgical day by combining:
 * 1. Mathematical Paschalion (PaschaMath)
 * 2. Ordinary Readings (LectionaryResolver + JSON)
 * 3. Saints (SaintsResolver)
 * 4. Typikon Rules (RuleParser)
 */
export class CalendarEngine {
    private static instance: CalendarEngine;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private lectionary: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private fixedFeasts: any[]; // Cached Fixed Feasts
    private ruleParser: RuleParser;
    private saintsResolver: SaintsResolver;
    private prophecyResolver: ProphecyResolver;
    private readingSynthesizer: ReadingSynthesizer;

    private constructor() {
        // Merge Ordinary and Triodion dictionaries
        // Triodion keys (if overlap) take precedence, but usually keys are distinct 
        // (Ordinary uses "10"-"300+", Triodion uses "-70" or specific IDs)
        this.lectionary = { ...lectionaryOrdinaryRaw, ...lectionaryTriodionRaw };

        // PATCH: Add Missing Nativity Sundays (Data from PCU)
        this.lectionary["SUNDAY_BEFORE_NATIVITY"] = {
            epistle: "Євр. 328 зач.; 11:9-10, 17-23, 32-40",
            gospel: "Мф. 1 зач.; 1:1-25"
        };
        this.lectionary["SUNDAY_AFTER_NATIVITY"] = {
            epistle: "Гал. 200 зач.; 1:11-19",
            gospel: "Мф. 4 зач.; 2:13-23"
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.fixedFeasts = (lectionaryFixedRaw as any).fixed_holidays || [];
        this.ruleParser = RuleParser.getInstance(); // Singleton access
        this.saintsResolver = SaintsResolver.getInstance();
        this.prophecyResolver = ProphecyResolver.getInstance();
        this.readingSynthesizer = new ReadingSynthesizer();
    }

    public static getInstance(): CalendarEngine {
        if (!CalendarEngine.instance) {
            CalendarEngine.instance = new CalendarEngine();
        }
        return CalendarEngine.instance;
    }

    /**
     * Generates the complete liturgical schedule for a given day.
     * @param date - The target civilian date
     */
    public generateDay(date: Date): GranularReadings {
        const year = date.getFullYear();
        const pascha = getOrthodoxPascha(year);
        const nday = getNday(date, pascha);

        // 1. Fetch Candidates with WEIGHTS
        let candidates: SynthesizerCandidate[] = [];

        // --- A. Ordinary Weekday / Sunday ---
        let key = getLectionaryKey(date, pascha);

        const ordinaryReadings = this.fetchOrdinaryReadings(key);

        const isSunday = date.getDay() === 0;
        let ordinaryWeight = isSunday ? 10 : 1;

        // Triodion Sundays: 10
        // Ordinary Sundays: Also 10 (System Standard)
        if (["330", "340", "350", "360"].includes(key) || isSunday) {
            ordinaryWeight = 10;
        }

        // Special case for Nativity Sundays (Ordinary Weight boost)
        if (key === "SUNDAY_BEFORE_NATIVITY" || key === "SUNDAY_AFTER_NATIVITY" || key.includes("SUNDAY_")) {
            ordinaryWeight = 15;
        }

        // BOOST: Triodion Great Feasts must have dominance (Weight 15 or 20)
        // Palm Sunday (-7), Mid-Pentecost (24), Leavetaking (38), Ascension (39), Pentecost (49), Holy Spirit (50), Bright Week (1-6)
        if (nday === -7 || nday === 24 || nday === 38 || nday === 39 || nday === 49 || nday === 50 || (nday >= 1 && nday <= 6)) {
            ordinaryWeight = 20; // Super dominance

            let feastTitle = isSunday ? "Воскресіння Христове" : undefined;
            if (nday === -7) feastTitle = "Вхід Господній в Єрусалим";
            if (nday === 39) feastTitle = "Вознесіння Господнє";
            if (nday === 49) feastTitle = "День Святої Трійці. П'ятдесятниця";
            if (nday === 50) feastTitle = "День Святого Духа";

            // For Bright Week, maybe no specific title override needed, reading title usually suffices.

            candidates.push({
                source: 'feast', // Change source to 'feast' for synthesizer priority
                weight: ordinaryWeight,
                liturgy: ordinaryReadings.liturgy,
                title: feastTitle
            });
        } else {
            candidates.push({
                source: 'ordinary',
                weight: ordinaryWeight,
                liturgy: ordinaryReadings.liturgy,
                title: undefined
            });
        }

        // --- B. Fixed Feast Resolution (Master Authority) ---
        const padDate = (n: number) => n.toString().padStart(2, '0');
        const dateKey = `${padDate(date.getMonth() + 1)}-${padDate(date.getDate())}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fixedFeast = this.fixedFeasts.find((f: any) => f.date_month_day === dateKey);

        // --- C. Saints Resolution ---
        // Only fetch dynamic saints if NO Fixed Feast is defined.
        // This prevents Ponomar DB "dirty" readings (e.g. generic Martyr Rom 99) 
        // from polluting the manually curated Fixed Feast calendar (PCU).
        if (!fixedFeast) {
            const rawSaints = this.saintsResolver.getSaintsForDay(date);

            // FILTER: Prevent clutter. Keep Max 2 saints.
            let saints = [...rawSaints].sort((a, b) => b.serviceType - a.serviceType);

            if (saints.length > 0) {
                const maxRank = saints[0].serviceType;
                if (maxRank >= 4) {
                    saints = saints.filter(s => s.serviceType >= 4);
                } else {
                    saints = saints.slice(0, 1);
                }
            }

            saints.forEach(s => {
                let w = 3;
                if (s.serviceType >= 4) w = 7;
                if (s.serviceType >= 6) w = 15;

                const sLiturgy: LiturgyReadings = {
                    title: s.name,
                    apostle: [],
                    gospel: []
                };
                if (s.liturgy) {
                    s.liturgy.apostle?.forEach(r => sLiturgy.apostle.push(r));
                    s.liturgy.gospel?.forEach(r => sLiturgy.gospel.push(r));
                }

                candidates.push({
                    source: 'saint',
                    weight: w,
                    liturgy: sLiturgy,
                    title: s.name
                });
            });
        }



        // --- D. Apply Fixed Feast Candidate ---
        if (fixedFeast) {
            // SUPPRESSION LOGIC: If feast suppresses ordinary, remove it from candidates
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((fixedFeast as any).suppressOrdinary) {
                const ordIndex = candidates.findIndex(c => c.source === 'ordinary');
                if (ordIndex !== -1) {
                    candidates.splice(ordIndex, 1);
                }
            }

            const fLiturgy: LiturgyReadings = {
                title: fixedFeast.title,
                apostle: [],
                gospel: []
            };

            // Check simple format vs array format
            if (Array.isArray(fixedFeast.liturgy)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                fixedFeast.liturgy.forEach((l: any) => {
                    fLiturgy.apostle.push({ reading: l.apostle, label: l.label || 'Liturgy' });
                    fLiturgy.gospel.push({ reading: l.gospel, label: l.label || 'Liturgy' });
                });
            } else {
                if (fixedFeast.apostle) fLiturgy.apostle.push({ reading: fixedFeast.apostle, label: 'Liturgy' });
                if (fixedFeast.gospel) fLiturgy.gospel.push({ reading: fixedFeast.gospel, label: 'Liturgy' });
            }

            // Great Feast weight = 15.
            const pri = fixedFeast.priority !== undefined ? fixedFeast.priority : 10;
            let weight = 7;
            if (pri >= 8) weight = 15;
            else if (pri >= 4) weight = 7;
            else weight = 3;

            if (fixedFeast.title || fLiturgy.apostle.length > 0 || fLiturgy.gospel.length > 0) {
                candidates.push({
                    source: 'feast',
                    weight: weight,
                    liturgy: fLiturgy,
                    title: fixedFeast.title
                });
            }
        }

        // Store feast Matins Gospel for later injection
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let feastMatinsGospel: string | null = null;
        if (fixedFeast && (fixedFeast as any).morning) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            feastMatinsGospel = (fixedFeast as any).morning;
        }

        // --- C. Dominance Suppression ---
        // If we have a Super Dominant Candidate (Weight >= 20), suppress minor readings (Weight < 15).
        // This ensures Great Feasts (Pentecost, Ascension, Mid-Pentecost) stand alone or with other Great Feasts only.
        const maxWeight = Math.max(...candidates.map(c => c.weight), 0);
        if (maxWeight >= 20) {
            candidates = candidates.filter(c => c.weight >= 15);
        }

        // --- D. Lenten Suppression (Pre-Synthesis) ---
        // We still need to suppress readings on Aliturgical Days before Synthesis
        const ndayForLent = getNday(date, pascha);
        if (ndayForLent >= -48 && ndayForLent < 0) {
            const dow = date.getDay();
            const isWeekend = dow === 0 || dow === 6;

            if (!isWeekend) {
                // Check if we have a Major Candidates (Weight >= 15 for Feast?)
                // Requirement: "Native logic suppression".
                const hasGreatFeast = candidates.some(c => c.weight >= 15); // Annunciation
                const isHolyWeek = ndayForLent >= -6;

                if (!hasGreatFeast && !isHolyWeek) {
                    candidates.length = 0; // Clear all
                }
            }
        }

        // --- E. Synthesis ---
        // Replaces the old "Filtering Algorithm", "Winners", "Merging" blocks.
        // nday already calculated
        const finalReadings = this.readingSynthesizer.synthesize(candidates, date, nday, key);

        // --- F. Post-Processing Hooks ---

        // 1. Matins Gospel Injection (Special Handling)
        if (ordinaryReadings.matins) {
            if (!finalReadings.matins) finalReadings.matins = { title: "Рання", readings: [] };
            ordinaryReadings.matins.readings.forEach(r => finalReadings.matins!.readings.push(r));
        }

        // 1a. Feast Matins Gospel Injection (Highest Priority)
        if (feastMatinsGospel) {
            if (!finalReadings.matins) finalReadings.matins = { title: "Рання", readings: [] };
            finalReadings.matins.readings.unshift({
                reading: feastMatinsGospel,
                label: "[Feast]",
                source: feastMatinsGospel
            });
        }

        // 2. Sunday Matins Gospel Automatic Injection
        if (isSunday && ordinaryWeight >= 10 && finalReadings.feast?.rank !== 15) { // If not overridden by pure Great Feast
            const matinsGospel = getSundayMatinsGospel(date, pascha);
            if (matinsGospel) {
                if (!finalReadings.matins) finalReadings.matins = { title: "Недільна Рання", readings: [] };
                const alreadyHasVal = finalReadings.matins.readings.some(r => r.reading === matinsGospel.reading);
                if (!alreadyHasVal) {
                    finalReadings.matins.readings.unshift({
                        reading: matinsGospel.reading,
                        label: matinsGospel.label,
                        // Compatibility source
                        source: matinsGospel.reading
                    });
                }
            }
        }

        // 3. Prophecy Injection
        const dateStr = date.toISOString().split('T')[0];
        const prophecy = this.prophecyResolver.getReadings(nday, dateStr);
        if (prophecy.sexte) {
            if (!finalReadings.hours) finalReadings.hours = {};
            finalReadings.hours.sexte = prophecy.sexte;
        }
        if (prophecy.royalHours) {
            if (!finalReadings.hours) finalReadings.hours = {};
            // Merge/Assign Royal Hours
            Object.assign(finalReadings.hours, { royal: prophecy.royalHours });
        }
        if (prophecy.vespers) {
            if (!finalReadings.vespers) finalReadings.vespers = { title: "Вечірня", readings: [] };
            prophecy.vespers.forEach(p => finalReadings.vespers!.readings.push(p));
        }

        // 4. Aliturgical Day Suppression (Great Lent Weekdays + Cheesefare Wed/Fri)
        // Clean Week through Holy Week: No Liturgy on weekdays (Mon-Fri)
        // Exception: Great Thursday (-3) has Liturgy of St. Basil
        // Exception: Annunciation (March 25) always has Liturgy
        const isWeekday = date.getDay() >= 1 && date.getDay() <= 5; // Mon-Fri
        const isGreatThursday = nday === -3;
        const isLentenWeekday = nday >= -48 && nday <= -1 && isWeekday && !isGreatThursday; // Clean Week to Holy Week
        const isCheesefareAliturgical = nday === -53 || nday === -51; // Wed & Fri of Cheesefare
        const isAnnunciation = date.getMonth() === 2 && date.getDate() === 25; // March 25

        if ((isLentenWeekday || isCheesefareAliturgical) && !isAnnunciation) {
            // Clear Liturgy readings (Apostle/Gospel) but keep Prophecies
            finalReadings.liturgy.apostle = [];
            finalReadings.liturgy.gospel = [];

            // For Presanctified Days (Wed/Fri in Lent), the title might be adjusted elsewhere or here
            // But we ensure no "Ordinary" Apostle/Gospel is shown.
            if (!finalReadings.liturgy.title || finalReadings.liturgy.title === "Літургія") {
                finalReadings.liturgy.title = (nday >= -48) ? "Літургія Ранішосвячених Дарів (або не звершується)" : "Літургія не звершується";
            }
        }

        // Season Specific Tweaks (Holy Week Titles etc)
        if (nday >= -6 && nday <= -1) {
            const holyTitles: Record<number, string> = {
                [-6]: "Великий понеділок",
                [-5]: "Великий вівторок",
                [-4]: "Велика середа",
                [-3]: "Великий четвер. Спомин Тайної Вечері",
                [-2]: "Велика п'ятниця. Спомин Святих спасительних Страстей Господа нашого Ісуса Христа",
                [-1]: "Велика субота. Спомин погребіння Господа нашого Ісуса Христа"
            };
            if (holyTitles[nday]) {
                finalReadings.liturgy.title = holyTitles[nday];
                if (finalReadings.feast) finalReadings.feast.title = holyTitles[nday];
            }
            if (!finalReadings.rubrics) finalReadings.rubrics = [];
            finalReadings.rubrics.push("Піст. Суворий піст.");
            if (nday === -3) {
                finalReadings.rubrics.push("Літургія св. Василія Великого.");
                finalReadings.rubrics.push("Замість Херувимської: 'Вечері Твоєї тайної...'");
            }
        }

        if (nday === 0) {
            finalReadings.rubrics = [
                "Світлий тиждень. Посту немає.",
                "Замість Трисвятого: 'Всі ті, що в Христа хрестилися...'",
                "Замість 'Достойно': 'Ангел сповіщав... Світися, світися...'"
            ];
            finalReadings.liturgy.title = "СВІТЛЕ ХРИСТОВЕ ВОСКРЕСІННЯ. ПАСХА.";
            if (finalReadings.feast) finalReadings.feast.title = finalReadings.liturgy.title;
        }

        return finalReadings;
    }

    /**
     * Fetches the raw text from JSON for a specific lectionary key
     */
    private fetchOrdinaryReadings(key: string): GranularReadings {
        // Alias Mapping Implementation
        // If key is purely semantic (e.g. "PASCHA"), map to data key.
        let dataKey = key;

        const source = this.lectionary[dataKey];
        if (!source && dataKey === '332') console.log("Engine: Source missing for 332 despite constructor merge.");

        const result: GranularReadings = {
            liturgy: {
                title: "Літургія Іоана Золотоустого", // Default
                apostle: [],
                gospel: []
            },
            vespers: undefined,
            matins: undefined
        };

        if (!source) {
            return result;
        }

        // Map JSON structure to our Types
        if (source.epistle) {
            result.liturgy.apostle.push(this.createReading(source.epistle, source.epistlePericope, "Ряд."));
        }

        if (source.gospel) {
            result.liturgy.gospel.push(this.createReading(source.gospel, source.gospelPericope, "Ряд."));
        }

        // Sunday Matins Gospel?
        if (source.matins) {
            if (!result.matins) result.matins = { title: "Рання", readings: [] };
            result.matins.readings.push(this.createReading(source.matins, undefined, "Раннє Євангеліє"));
        }

        return result;
    }

    private createReading(text: string, pericope: string | undefined, label: string): DetailedReading {
        // Basic cleanup
        let reading = text.replace(/_/g, " ").trim();

        // Append pericope if provided and not already in text
        if (pericope && !reading.includes('зач.')) {
            reading = `${reading} (зач. ${pericope})`;
        }

        return {
            reading,
            label,
            source: reading
        } as any;
    }
}
