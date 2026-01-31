
import fs from 'fs';
import path from 'path';

// --- CONFIG ---
const PASCHA_2025 = new Date(2025, 3, 20); // Apr 20
const OUTPUT_FILE = 'src/calendar_v2/data/gap_map.json';

// --- DATA (Markdown Content) ---
const MD_CONTENT = `
2025-01-01|Кол. 254; Лк. 6
2025-01-02|Гал. 198; Мк. 19
2025-01-03|Рим. 91; Тит. 302
2025-01-04|1 Тим. 284; Мф. 5
2025-01-05|2 Кор. 170; Мф. 89
2025-01-06|Тит. 302; Мф. 6
2025-01-07|Гал. 207; Мк. 23
2025-01-08|Гал. 208; Мк. 25
2025-01-09|Гал. 210; Мк. 26
2025-01-10|Еф. 233; Мф. 7
2025-01-11|Гал. 212; Мк. 28
2025-01-12|Еф. 224; Мф. 8
2025-01-13|Гал. 211; Мк. 27
2025-01-14|Гал. 214; Мк. 29
2025-01-15|Еф. 216; Мк. 30
2025-01-16|Еф. 217; Мк. 32
2025-01-17|1 Кор. 146; Мф. 101
2025-01-18|Еф. 219; Мк. 48
2025-01-19|2 Кор. 181; Мф. 105
2025-01-20|Еф. 219; Мк. 48
2025-01-21|Еф. 222; Мк. 50
2025-01-22|Еф. 223; Мк. 51
2025-01-23|Еф. 225; Мк. 52
2025-01-24|Еф. 226; Мк. 53
2025-01-25|1 Кор. 156; Мф. 104
2025-01-26|2 Кор. 182; Мф. 62
2025-01-27|Еф. 227; Лк. 10
2025-01-28|Еф. 230; Лк. 11
2025-01-29|Еф. 231; Лк. 12
2025-01-30|Євр. 334; Мф. 11
2025-01-31|Еф. 234; Лк. 14
2025-02-01|1 Кор. 162; Лк. 15
2025-02-02|1 Тим. 285; Лк. 94; Євр. 316; Лк. 7
2025-02-03|1 Пет. 59; Мк. 54
2025-02-04|1 Пет. 60; Мк. 55
2025-02-05|1 Пет. 61; Мк. 56
2025-02-06|Еф. 234; Лк. 14
2025-02-07|1 Ін. 71; Мк. 49
2025-02-08|1 Ін. 72; Мк. 64
2025-02-09|2 Тим. 296; Лк. 89
2025-02-15|2 Тим. 295; Лк. 103
2025-02-16|1 Кор. 135; Лк. 79
`;

// Load Lectionary
const lectionary = JSON.parse(fs.readFileSync('src/calendar_v2/data/lectionary.json', 'utf-8'));

// Helpers
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

const gapMap: Record<string, string> = {};

console.log("Generating Map from Markdown Data...");

const lines = MD_CONTENT.trim().split('\n');
lines.forEach(line => {
    const [dateStr, readingsStr] = line.split('|');
    const d = new Date(dateStr);
    const nday = getNday(d, PASCHA_2025);

    // Extract Pericope Numbers from readings string
    const patterns = readingsStr.split(';').map(s => s.trim());

    let bestKey = "";

    // Find Key
    Object.entries(lectionary).forEach(([key, val]: [string, any]) => {
        if (bestKey) return;
        const rawApP = val.epistlePericope || "";
        const rawGsP = val.gospelPericope || "";
        const rawAp = (val.epistle || "").toLowerCase();

        for (const pat of patterns) {
            const patNum = pat.match(/\d{2,3}/)?.[0];
            if (patNum) {
                // Strict Pericope Match
                if (rawApP === patNum || rawGsP === patNum) {
                    bestKey = key; break;
                }
                // Fallback Text Match
                if (rawAp.includes(patNum) && pat.length > 5 && rawAp.includes(pat.split('.')[0].toLowerCase())) {
                    // Ensure book match too if possible?
                    // "Eph. 217" -> "Еф 217".
                    bestKey = key; break;
                }
            }
        }
    });

    if (bestKey) {
        gapMap[nday.toString()] = bestKey;
        console.log(`NDAY ${nday} (${dateStr}) -> Key ${bestKey}`);
    } else {
        console.warn(`FAILED TO MAP: ${dateStr} [${readingsStr}]`);
        // Fallback: If Jan 30 (Heb 334) fails, we manually inject?
        if (dateStr === "2025-01-30") gapMap[nday.toString()] = "334_MANUAL";
        // Note: Engine expects valid key. if "334_MANUAL", parseint might fail if letters.
        // Key 334 should exist.
    }
});

// Manual patches for hard-to-match items if needed
// e.g. Jan 30 "Heb 334" -> Key 334 (if exists).

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(gapMap, null, 2));
console.log(`Map Saved: ${Object.keys(gapMap).length} entries.`);
