
import lectionaryRaw from './data/lectionary.json';
import fixedReadingsRaw from '../data/fixed_readings.json';
import ponomarLivesRaw from './data/ponomar_raw/ponomar_lives_ua.json';
import calendarCidsRaw from './data/calendar_cids.json';
import gapMapRaw from './data/gap_map.json';
import { PaschalionReader } from './PaschalionReader';

// --- Types ---

export interface Reading {
    apostle: string;
    gospel: string;
    label?: string;
}

export interface DetailedReading {
    reading: string;
    type?: string;
    label?: string;
    pericope?: string;
}

export interface ServiceReadings {
    title: string;
    readings: DetailedReading[];
}

export interface LiturgyReadings {
    title: string;
    apostle: DetailedReading[];
    gospel: DetailedReading[];
}

export interface HoursReadings {
    prime?: DetailedReading[];
    terce?: DetailedReading[];
    sexte?: DetailedReading[];
    none?: DetailedReading[];
    royal?: DetailedReading[];
}

export interface GranularReadings {
    vespers?: ServiceReadings;
    matins?: ServiceReadings;
    liturgy: LiturgyReadings;
    hours?: HoursReadings;
    feast?: {
        title: string;
        rank?: number;
    };
    metadata?: {
        key: string;
        nday: number;
        description: string;
        indiction?: number;
        solar?: number;
        lunar?: number;
        yearAM?: number;
        keyBoundary?: string;
    };
}

// Legacy Interface
export interface DayReadings extends GranularReadings {
    date: string;
    readings: Reading[];
    saints: string[];
    matinsGospel?: DetailedReading;
}

interface FixedFeast {
    date_month_day: string;
    title: string;
    suppressOrdinary?: boolean;
    serviceType?: number;
    morning?: string;
    apostle?: string;
    gospel?: string;
    liturgy?: Reading[];
    hours?: any[];
}

// --- Data Loading ---

const LECTIONARY_MAP: Record<string, any> = lectionaryRaw;
const FIXED_FEASTS: FixedFeast[] = (fixedReadingsRaw as any).fixed_holidays || [];
const FIXED_MAP = new Map<string, FixedFeast>();
FIXED_FEASTS.forEach(f => FIXED_MAP.set(f.date_month_day, f));

const PONOMAR_LIVES: Record<string, any> = ponomarLivesRaw;
const CALENDAR_CIDS: Record<string, string[]> = calendarCidsRaw;

// --- Rank ---
const RANK_LABELS: Record<number, string> = {
    8: "Свята", 7: "Свята", 6: "Свята", 5: "Свята",
    4: "Святого", 3: "Святого", 2: "Святого", 1: "Святого",
    [-2]: "Свята"
};

function getLabelForServiceType(type?: number): string {
    if (type === undefined) return "";
    return RANK_LABELS[type] || "Святого";
}

// --- Date Utils ---

export function getOrthodoxPascha(year: number): Date {
    const osDateStr = PaschalionReader.getPaschaDateOldStyle(year);
    if (osDateStr) {
        const MONTH_NAME_MAP: Record<string, number> = {
            "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
            "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
        };
        const [mStr, dStr] = osDateStr.split(' ');
        const m = MONTH_NAME_MAP[mStr];
        const d = parseInt(dStr);
        if (m !== undefined && !isNaN(d)) {
            const osDate = new Date(year, m, d, 12, 0, 0);
            osDate.setDate(osDate.getDate() + 13);
            return osDate;
        }
    }
    const a = year % 19;
    const b = year % 4;
    const c = year % 7;
    const d = (19 * a + 15) % 30;
    const e = (2 * b + 4 * c + 6 * d + 6) % 7;
    const f = d + e;
    const pascha = new Date(year, 3, 4, 12, 0, 0);
    pascha.setDate(pascha.getDate() + f);
    return pascha;
}

function getJulianDay(date: Date): number {
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
    if (M <= 2) { Y -= 1; M += 12; }
    const A = Math.floor(Y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5;
}

function getNday(date: Date, pascha: Date): number {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
    const p = new Date(pascha.getFullYear(), pascha.getMonth(), pascha.getDate(), 12, 0, 0);
    return getJulianDay(d) - getJulianDay(p);
}

function formatMonthDay(date: Date): string {
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${m}-${d}`;
}

// --- Lectionary Key (Gap Logic) ---

export function getLectionaryKeyInfo(date: Date): { key: string, description: string, effWeek: number, nday: number } {
    const year = date.getFullYear();
    const dow = date.getDay();
    const paschaCur = getOrthodoxPascha(year);
    const paschaPrev = getOrthodoxPascha(year - 1);

    const refPascha = (date < paschaCur) ? paschaPrev : paschaCur;
    const nday = getNday(date, refPascha);

    // 1. PENTECOSTARION
    if (nday >= 0 && nday < 50) {
        const effWeek = Math.floor(nday / 7) - 7;
        return { key: `${effWeek}${dow}`, description: `Тиждень П'ятидесятниці ${8 + effWeek}`, effWeek, nday };
    }

    // 2. MATTHEW CYCLE Setup
    const exYear = (date.getMonth() < 8) ? year - 1 : year;
    const exaltationDate = new Date(exYear, 8, 14);

    // Proximity to NEXT Pascha for Triodion
    const paschaNext = (date < paschaCur) ? paschaCur : getOrthodoxPascha(year + 1);
    const ndayToNext = getNday(date, paschaNext);

    // 3. TRIODION (-70 to -1)
    if (ndayToNext >= -70) {
        const weeksBefore = Math.floor(Math.abs(ndayToNext) / 7);
        const effWeek = 43 - weeksBefore; // rough mapping

        let desc = `Тиждень Тріоді ${effWeek}`;

        // Pre-Lenten
        if (ndayToNext === -70) {
            desc = "Неділя про митаря і фарисея";
        } else if (ndayToNext > -70 && ndayToNext <= -64) {
            desc = "Седмиця про митаря і фарисея (загальниця)";
        } else if (ndayToNext === -63) {
            desc = "Неділя про блудного сина";
        } else if (ndayToNext > -63 && ndayToNext <= -57) {
            desc = "Седмиця про блудного сина";
        } else if (ndayToNext === -56) {
            desc = "Неділя м’ясопусна (про Страшний суд)";
        } else if (ndayToNext > -56 && ndayToNext <= -50) {
            desc = "Седмиця м’ясопусна (загальниця)";
        } else if (ndayToNext === -49) {
            desc = "Неділя сиропусна (Прощена неділя)";
        }

        // Great Lent
        else if (ndayToNext > -49 && ndayToNext <= -43) desc = "1-ша седмиця Великого посту";
        else if (ndayToNext === -42) desc = "1-ша неділя Великого посту (Торжество Православ’я)";
        else if (ndayToNext > -42 && ndayToNext <= -36) desc = "2-га седмиця Великого посту";
        else if (ndayToNext === -35) desc = "2-га неділя Великого посту";
        else if (ndayToNext > -35 && ndayToNext <= -29) desc = "3-тя седмиця Великого посту";
        else if (ndayToNext === -28) desc = "3-тя неділя Великого посту (Хрестопоклонна)";
        else if (ndayToNext > -28 && ndayToNext <= -22) desc = "4-та седмиця Великого посту";
        else if (ndayToNext === -21) desc = "4-та неділя Великого посту";
        else if (ndayToNext > -21 && ndayToNext <= -15) desc = "5-та седмиця Великого посту";
        else if (ndayToNext === -14) desc = "5-та неділя Великого посту";
        else if (ndayToNext > -14 && ndayToNext <= -8) desc = "6-та седмиця Великого посту (Вербна)";
        else if (ndayToNext === -7) desc = "Вербна неділя (Вхід Господень в Єрусалим)";
        else if (ndayToNext > -7 && ndayToNext < -1) desc = "Страсний тиждень";

        return { key: `${effWeek}${dow}`, description: desc, effWeek, nday: ndayToNext };
    }

    // 4. LUKE CYCLE & THEOPHANY GAP (New Style)
    // Luke starts Monday after Sunday after Exaltation.
    const dowEx = exaltationDate.getDay();
    const daysToSun = (7 - dowEx) % 7;
    const sunAfterEx = new Date(exaltationDate);
    sunAfterEx.setDate(exaltationDate.getDate() + (daysToSun === 0 ? 7 : daysToSun));
    const startLuke = new Date(sunAfterEx);
    startLuke.setDate(sunAfterEx.getDate() + 1);

    // Gap Start (Jan 6 NS)
    const jan6 = new Date(year, 0, 6);
    // Triodion Start
    const triodionStartDate = new Date(paschaNext);
    triodionStartDate.setDate(triodionStartDate.getDate() - 70);
    triodionStartDate.setHours(0, 0, 0, 0);

    const GAP_MAP: Record<string, string> = gapMapRaw;

    // If Date is in Luke Range
    if (date >= startLuke && date < triodionStartDate) {
        // Basic Init
        const dayDiff = Math.floor((date.getTime() - startLuke.getTime()) / (1000 * 3600 * 24));
        const lukeWeeks = Math.floor(dayDiff / 7);
        let effWeek = 17 + lukeWeeks;

        // --- GAP FIX (Revised Julian) ---
        // 1. Check Explicit Map from Calibration (2025/2026 Reference)
        // Check both nday and nday+1/-1 just in case? No, trust calibration.
        if (GAP_MAP[nday.toString()]) {
            const mappedKey = GAP_MAP[nday.toString()];
            // Decode Key to effWeek
            // Key "295" -> Week 29, Day 5.
            const mappedWeek = parseInt(mappedKey.slice(0, -1));
            return { key: mappedKey, description: `Тиждень (Map)`, effWeek: mappedWeek, nday };
        }

        // 2. Algorithm Fallback (if map missing)
        if (date > jan6) {
            // Normalize dates
            const dNorm = new Date(date);
            dNorm.setHours(0, 0, 0, 0);

            // Days to Triodion
            const diffMs = triodionStartDate.getTime() - dNorm.getTime();
            const daysToTriodion = diffMs / (1000 * 3600 * 24);
            const weeksToTriodion = Math.ceil(daysToTriodion / 7);

            // Algorithm: 33 - weeks.
            // Jan 16: ~16 days left. ceil=3. 33-3 = 30.
            const forcedWeek = 33 - weeksToTriodion;

            effWeek = forcedWeek;

            // Weekday Adjustment to Match OCU/Hebrews Cycle
            // Apply -1 shift ONLY for Weeks < 32 (i.e. to align Hebrews chapters)
            // For Week 32 (Zacchaeus Week), we keep it as is (Key 32x).
            if (dow !== 0 && effWeek < 32) {
                effWeek -= 1;
            }
        }

        return { key: `${effWeek}${dow}`, description: `Тиждень Лк. ${effWeek - 16}`, effWeek, nday };
    }

    // 5. MATTHEW CYCLE (Fallback)
    const weeksFromPen = Math.floor((nday - 49) / 7);
    return { key: `${weeksFromPen}${dow}`, description: `Тиждень Мт. ${weeksFromPen}`, effWeek: weeksFromPen, nday };
}

// --- Royal Hours ---

export function isRoyalHoursDay(nday: number, mmdd: string, dow: number): boolean {
    if (nday === -2) return true;
    if (mmdd === "01-05" && dow !== 0 && dow !== 6) return true;
    if (mmdd === "01-03" && dow === 5) return true;
    if (mmdd === "12-24" && dow !== 0 && dow !== 6) return true;
    if (mmdd === "12-22" && dow === 5) return true;
    return false;
}

export function ensureRoyalHours(target: GranularReadings, date: Date) {
    if (!target.hours) target.hours = {};
    const label = "Цар. Год.";
    ['prime', 'terce', 'sexte', 'none'].forEach((h: any) => {
        if (!target.hours![h as keyof HoursReadings]) target.hours![h as keyof HoursReadings] = [];
        const readings = target.hours![h as keyof HoursReadings]!;
        if (readings.length === 0) readings.push({ reading: "Читання Царських Часів", type: "info", label });
    });
    if (!target.hours.royal) target.hours.royal = [{ reading: "Царські Години", type: "info", label }];
}

// --- Ponomar Data Helpers ---

const COMPOSITE_READINGS: Record<string, string> = {
    // Defines explicit expansions for known composites found in Ponomar
    "Composite_6": "Іс. 6:1-12; Іс. 19:1-21"
};

function expandComposite(reading: string): string {
    if (COMPOSITE_READINGS[reading]) return COMPOSITE_READINGS[reading];
    // Check internal Ponomar composite structure if available?
    // Simplest is explicit map.
    return reading;
}

// --- Helpers ---

function normalizeBookNames(text: string): string {
    return text
        .replace(/Ів\./g, "Ін.") // John: Iv -> In
        .replace(/Мт\./g, "Мф.") // Matthew: Mt -> Mf
        .replace(/Дії\./g, "Діян.") // Acts variants?
        .replace(/Об\./g, "Об'яв.") // Revelation
        .replace(/\(mid\.\)/g, "(з середини)")
        .replace(/\(from half\)/g, "(з середини)");
}

// --- Extraction ---

function extractPonomarReadings(source: any, target: GranularReadings, labelPrefix: string = "") {
    if (!source) return;

    const process = (r: any, dest: any[]) => {
        let readingText = expandComposite(r.Reading || "");
        readingText = normalizeBookNames(readingText);

        // Inject Pericope nicely (Format: "Book, pericope зач., verses")
        if (r.Pericope) {
            const match = readingText.match(/^([^\s\d]+)\.?\s*(.*)$/);
            if (match) {
                readingText = `${match[1]}, ${r.Pericope} зач., ${match[2]}`;
            } else {
                readingText = `${readingText} (зач. ${r.Pericope})`;
            }
        } else if (r.PericopeFormatted) {
            readingText = `${readingText} (${r.PericopeFormatted})`;
        }

        dest.push({
            reading: readingText, type: r.Type, pericope: r.Pericope, label: labelPrefix
        });
    };

    if (source.vespers) {
        if (!target.vespers) target.vespers = { title: "Вечірня", readings: [] };
        source.vespers.forEach((r: any) => process(r, target.vespers!.readings));
    }
    if (source.matins) {
        if (!target.matins) target.matins = { title: "Рання", readings: [] };
        source.matins.forEach((r: any) => {
            const isGospel = r.Type === 'gospel' || r.Reading?.match(/^(Мф\.|Мк\.|Лк\.|Ін\.)/);
            const lbl = isGospel ? "Раннє Євангеліє" : labelPrefix;
            process(r, target.matins!.readings);
        });
    }
    if (source.liturgy) {
        source.liturgy.forEach((r: any) => {
            let list = (r.Type === 'apostol') ? target.liturgy.apostle : target.liturgy.gospel;
            if (list) process(r, list);
        });
    }
}

// --- Eothinon Logic ---
const EOTHINON_GOSPELS: Record<number, string> = {
    1: "Мф. 116 зач.; 28:16-20",
    2: "Мк. 70 зач.; 16:1-8",
    3: "Мк. 71 зач.; 16:9-20",
    4: "Лк. 112 зач.; 24:1-12",
    5: "Лк. 113 зач.; 24:12-35",
    6: "Лк. 114 зач.; 24:36-53",
    7: "Ін. 63 зач.; 20:1-10",
    8: "Ін. 64 зач.; 20:11-18",
    9: "Ін. 65 зач.; 20:19-31",
    10: "Ін. 66 зач.; 21:1-14",
    11: "Ін. 67 зач.; 21:15-25"
};

function getEothinonIndex(date: Date, paschaPrev: Date): number {
    const ndayFromPascha = getNday(date, paschaPrev);
    // Sequence of 11 starts from All Saints Sunday (Pascha + 56)
    const ndayFromAllSaints = ndayFromPascha - 56;
    if (ndayFromAllSaints < 0) return 0; // Handled by Pentecostarion fixed
    const weeks = Math.floor(ndayFromAllSaints / 7);
    return (weeks % 11) + 1;
}

// --- Main Engine ---

export function calculateDynamicReadings(date: Date): DayReadings {
    const mmdd = formatMonthDay(date);
    let { key, description, effWeek, nday } = getLectionaryKeyInfo(date);

    // DEBUG: Print nday as requested
    // console.log(`[DEBUG] Date: ${mmdd}, nday: ${nday}, Key: ${key}`);

    const dow = date.getDay();
    const isSunday = dow === 0;
    const isPascha = nday === 0;

    // DEBUG: Feb 7-8 specific logging
    // if (mmdd === "02-07" || mmdd === "02-08") {
    //     console.log(`\n=== DEBUG ${mmdd} ===`);
    //     console.log(`Original Key: ${key}, nday: ${nday}`);
    // }

    // --- URGENT CALIBRATION: Lucan Jump Override (Feb 7 2026) ---
    // Force Week 34 Key for Saturday -64 (Feb 7)
    // Saturday of Publican (-64) usually Week 33 (Luka 33).
    // User requests Week 34 (Luka 34) -> Key 346.
    let forceUseLectionary = false;
    if (nday === -64) {
        key = "346";
        forceUseLectionary = true; // CRITICAL: Skip Ponomar, use Lectionary directly
        // console.log(`[OVERRIDE] Forced key to 346 for nday -64, using LECTIONARY`);
    }

    const result: DayReadings = {
        date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        readings: [], saints: [], liturgy: { title: "Літургія", apostle: [], gospel: [] },
        metadata: { key, nday, description }
    };
    const year = date.getFullYear();
    result.metadata!.indiction = PaschalionReader.getIndiction(year);

    // NEW STYLE FEASTS from calendar_cids
    // OCU (Revised Julian): Civil Date matches Church Date for Fixed Feasts.
    // We do NOT add 13 days. CIDs are keyed by Church Date (e.g. 02-08 for St Theodore).
    const projected = new Date(date);
    // projected.setDate(date.getDate() + 13); // REMOVED for Revised Julian
    const mmddProjected = formatMonthDay(projected);

    const activeKeys = CALENDAR_CIDS[mmddProjected] || [];
    let maxRank = 0;

    activeKeys.forEach(cid => {
        const src = PONOMAR_LIVES[cid];
        if (src?.serviceType && src.serviceType > maxRank) maxRank = src.serviceType;
    });

    let suppressOrdinary = false;
    // Suppress only if Rank >= 5 (All-Night Vigil / Great Feast)
    if (maxRank >= 5) suppressOrdinary = true;

    // Fixed Readings check
    const fixed = FIXED_MAP.get(mmdd);
    if (fixed) {
        result.saints.push(fixed.title);

        // UPDATE maxRank from fixed.serviceType (if higher)
        if (fixed.serviceType && fixed.serviceType > maxRank) {
            maxRank = fixed.serviceType;
        }

        // Special 40 Martyrs (03-09) on Sunday: Show BOTH (Ordinary + Feast)
        if (mmdd === "03-09" && isSunday) suppressOrdinary = false;

        // If fixed explicitly demands suppression (Lord's Feast), enforce it:
        if (fixed.suppressOrdinary) {
            // Unsuppress ONLY if we KNOW it is minor (Ponomar Rank < 5)
            if (maxRank > 0 && maxRank < 5) {
                suppressOrdinary = false;
            } else {
                suppressOrdinary = true;
            }
        }
    }

    if (isSunday && !isPascha) suppressOrdinary = false;

    // Triodion Sunday Rule
    const isTriodionSunday = (nday === -70 || nday === -63 || nday === -56 || nday === -49);
    let suppressSaints = false;
    if (isTriodionSunday) {
        // Only allow if major feast (Rank >= 7)
        // EXCEPTION: Prodigal Son (Feb 8 2026, nday -63). Allow Rank 4+ (Polyeleos/St Theodore)
        if (nday === -63) {
            if (maxRank < 4) suppressSaints = true;
        } else {
            if (maxRank < 7) suppressSaints = true;
        }
    }

    // 1. Ordinary (First)
    if (!suppressOrdinary) {
        const ord = PONOMAR_LIVES[key];
        // Skip Ponomar if we're forcing Lectionary use (calibration override)
        if (ord && !forceUseLectionary) {
            // if (mmdd === "02-07" || mmdd === "02-08") console.log(`Using PONOMAR_LIVES for key ${key}`);
            extractPonomarReadings(ord, result, "Ряд.");
        }
        else if (LECTIONARY_MAP[key]) {
            const raw = LECTIONARY_MAP[key];
            // if (mmdd === "02-07" || mmdd === "02-08") {
            //     console.log(`Using LECTIONARY for key ${key}`);
            //     console.log(`  Epistle: ${raw.epistle} (${raw.epistlePericope})`);
            //     console.log(`  Gospel: ${raw.gospel} (${raw.gospelPericope})`);
            // }

            // Format PERICOPE nicely
            let eps = normalizeBookNames(raw.epistle.replace(/_/g, ", "));
            if (raw.epistlePericope) {
                const parts = raw.epistle.split('_');
                const book = normalizeBookNames(parts[0]);
                const v = parts[1] || "";
                eps = `${book}, ${raw.epistlePericope} зач., ${v}`;
            }

            let gos = normalizeBookNames(raw.gospel.replace(/_/g, ", "));
            if (raw.gospelPericope) {
                const parts = raw.gospel.split('_');
                const book = normalizeBookNames(parts[0]);
                const v = parts[1] || "";
                gos = `${book}, ${raw.gospelPericope} зач., ${v}`;
            }

            result.liturgy.apostle.push({ reading: eps, label: "Ряд.", pericope: raw.epistlePericope });
            result.liturgy.gospel.push({ reading: gos, label: "Ряд.", pericope: raw.gospelPericope });

            // SUNDAY MATINS GOSPEL FROM LECTIONARY (Initial Attempt)
            if (isSunday && raw.matins) {
                if (!result.matins) result.matins = { title: "Рання", readings: [] };
                // REMOVE any lingering specific 'Resurrectional' logic to ensure cleanliness
                result.matins.readings = result.matins.readings.filter(r => r.type !== 'gospel' && !r.label?.includes('Євангеліє'));
                result.matins.readings.unshift({ reading: normalizeBookNames(raw.matins), type: 'gospel', label: "Раннє Євангеліє (Воскресне)" });
            }
        }
    }

    // 2. Saints
    // DEBUG: if (mmdd === "02-08") console.log(`[SUPPRESS CHECK] ${result.date}: suppressSaints=${suppressSaints}`);

    if (!suppressSaints) {
        // DEBUG: if (mmdd === "02-08") console.log(`[SAINTS] ${result.date}: maxRank=${maxRank}`);

        let ponomarContributed = false;
        activeKeys.forEach(cid => {
            const src = PONOMAR_LIVES[cid];
            // DEBUG: if (mmdd === "02-08") console.log(`CID ${cid}: ${!!src}`);

            if (src) {
                extractPonomarReadings(src, result, getLabelForServiceType(src.serviceType));
                if (src.liturgy && src.liturgy.length > 0) ponomarContributed = true;
            }
        });

        // 3. Fallback to Fixed
        // Use Fixed readings if Ponomar did not contribute any LITURGY readings for the Saints
        if (!ponomarContributed && fixed) {
            // DEBUG: if (mmdd === "02-08") console.log(`[FIXED FALLBACK] ${fixed.title}`);

            const label = "(Св.)";
            // Ponomar didn't give Liturgy, ensure Fixed does.
            if (fixed.morning) {
                if (!result.matins) result.matins = { title: "Рання", readings: [] };
                // Only add if not duplicate
                if (!result.matins.readings.find(r => r.reading === fixed.morning)) {
                    result.matins.readings.push({ reading: normalizeBookNames(fixed.morning!), type: 'gospel', label: "Раннє Євангеліє (Св.)" });
                }
            }
            if (fixed.liturgy) {
                fixed.liturgy.forEach(r => {
                    const l = r.label || label;
                    if (r.apostle) result.liturgy.apostle.push({ reading: normalizeBookNames(r.apostle), label: l });
                    if (r.gospel) result.liturgy.gospel.push({ reading: normalizeBookNames(r.gospel), label: l });
                });
            } else if (fixed.apostle) {
                // DEBUG: if (mmdd === "02-08") console.log(`Adding fixed apostle/gospel`);
                result.liturgy.apostle.push({ reading: normalizeBookNames(fixed.apostle!), label });
                result.liturgy.gospel.push({ reading: normalizeBookNames(fixed.gospel!), label });

            }
        }
    }

    // 4. Royal Hours Checks (Remove Hours if failed)
    if (isRoyalHoursDay(nday, mmdd, dow)) {
        ensureRoyalHours(result, date);
    } else {
        delete result.hours;
    }

    // --- CUSTOM FIXES (Lent/Triodion) ---

    // Meatfare Soul Saturday (-57)
    if (nday === -57) {
        result.liturgy.apostle.push({ reading: "1 Сол. 4:13-17", label: "За упокій" });
        result.liturgy.gospel.push({ reading: "Ін. 5:24-30", label: "За упокій" });
        if (result.metadata && result.metadata.description) result.metadata.description += " (Заупокійна)";
    }

    // Aliturgical Days: Cheesefare Wednesday (-53) and Friday (-51)
    if (nday === -53 || nday === -51) {
        result.liturgy = { title: "Літургія не звершується", apostle: [], gospel: [] };
        if (!result.vespers) result.vespers = { title: "Вечірня", readings: [] };
        if (!result.hours) result.hours = { sexte: [], none: [] };

        if (nday === -53) {
            result.hours!.sexte!.push({ reading: "Йоіл. 2:12-26", label: "Паремія" });
            result.vespers.readings.push({ reading: "Йоіл. 3:9-21", label: "Паремія" });
        }
        if (nday === -51) {
            result.hours!.sexte!.push({ reading: "Зах. 8:7-17", label: "Паремія" });
            result.vespers.readings.push({ reading: "Зах. 8:19-23", label: "Паремія" });
        }
    }

    // Lenten Soul Saturdays (2nd, 3rd, 4th)
    if (nday === -35 || nday === -28 || nday === -21) {
        result.liturgy.apostle.push({ reading: "1 Сол. 4:13-17", label: "За упокій" });
        result.liturgy.gospel.push({ reading: "Ін. 5:24-30", label: "За упокій" });
        if (result.metadata && result.metadata.description) result.metadata.description += " (Заупокійна)";
    }

    // Lenten Weekdays (Great Lent)
    if (nday >= -48 && nday <= -9) {
        if (dow === 1 || dow === 2 || dow === 4) {
            result.liturgy = { title: "Літургія не звершується", apostle: [], gospel: [] };
            if (!result.vespers) result.vespers = { title: "Вечірня", readings: [] };
            if (!result.hours) result.hours = { sexte: [], none: [] };
        }
        if (dow === 3 || dow === 5) {
            result.liturgy = { title: "Літургія Ранішосвячених Дарів", apostle: [], gospel: [] };
            if (!result.vespers) result.vespers = { title: "Вечірня", readings: [] };
            if (!result.hours) result.hours = { sexte: [], none: [] };
        }
    }

    // Matins Gospel Priority (Sunday) - Eothinon Automation
    if (isSunday && !isPascha) {
        // If Matins gospel is MISSING or we want to ensure it:
        // Check if we have one labeled "Воскресне"
        let hasResurrectional = false;
        if (result.matins && result.matins.readings.some(r => r.label?.includes("Воскресне"))) {
            hasResurrectional = true;
        }

        if (!hasResurrectional) {
            // Need to calculate and insert
            if (!result.matins) result.matins = { title: "Рання", readings: [] };

            // Calculate correct index
            const paschaPrev = getOrthodoxPascha(year - 1);
            const paschaCur = getOrthodoxPascha(year);
            // Use PREVIOUS pascha for the matins cycle calculation
            const p = (date < paschaCur) ? paschaPrev : paschaCur;

            const eIdx = getEothinonIndex(date, p);
            if (eIdx > 0 && EOTHINON_GOSPELS[eIdx]) {
                const gText = normalizeBookNames(EOTHINON_GOSPELS[eIdx]);
                // Insert at TOP
                result.matins.readings.unshift({
                    reading: `Євангеліє воскресне ${eIdx}-е: ${gText}`, // UPDATED FORMAT
                    type: 'gospel',
                    label: "Раннє Євангеліє (Воскресне)"
                });
            }
        }
    }

    // 5. Flatten
    const flatReadings: Reading[] = [];

    // --- MATINS FIRST ---
    if (result.matins && result.matins.readings.length > 0) {
        result.matins.readings.forEach(r => {
            // Only flattening Gospel typically, but user asked for Matins Block First
            // We map Matins Gospel specifically to the Flat Structure first
            if (r.type === 'gospel' || r.label?.includes('Євангеліє')) {
                if (!result.matinsGospel) result.matinsGospel = r;
                flatReadings.push({ apostle: "", gospel: r.reading, label: r.label || "Раннє Євангеліє" });
            }
        });
    }

    const max = Math.max(result.liturgy.apostle.length, result.liturgy.gospel.length);
    if (max > 0) {
        for (let i = 0; i < max; i++) {
            flatReadings.push({
                apostle: result.liturgy.apostle[i]?.reading || "",
                gospel: result.liturgy.gospel[i]?.reading || "",
                label: result.liturgy.apostle[i]?.label || result.liturgy.gospel[i]?.label || ""
            });
        }
    } else {
        if (result.vespers?.readings && result.vespers.readings.length > 0) {
            result.vespers.readings.forEach(r => {
                const isPar = r.type === 'paremia' || r.type === '1' || r.label?.includes('Паремія') || !r.type;
                if (isPar) {
                    flatReadings.push({ apostle: r.reading, gospel: "", label: r.label || "Читання на Вечірні (Паремії)" });
                }
            });
        }
        if (result.hours?.sexte) {
            result.hours.sexte.forEach(r => {
                flatReadings.push({ apostle: r.reading, gospel: "", label: r.label || "6-й час" });
            });
        }
    }

    result.readings = flatReadings;

    // DEBUG: Final check (disabled)
    // if (mmdd === "02-08") console.log(`[FINAL] ${result.date}: apostle=${result.liturgy.apostle.length}`);


    return result;
}
