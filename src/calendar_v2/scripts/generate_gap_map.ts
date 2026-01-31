
import fs from 'fs';
import path from 'path';

// Lectionary Load
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

// Data
const PASCHA_2025 = new Date(2025, 3, 20); // Apr 20
const BASELINE_2025 = [
    { "date": "2025-01-01", "patterns": ["Кол. 254", "Лк. 6", "Євр. 318", "Лк. 24"] },
    { "date": "2025-01-05", "patterns": ["2 Кор. 170", "Мф. 89"] },
    { "date": "2025-01-06", "patterns": ["Тит. 302", "Мф. 6"] },
    { "date": "2025-01-14", "patterns": ["Гал. 212", "Мк. 28", "1 Кор. 131", "Мф. 104"] },
    { "date": "2025-01-19", "patterns": ["2 Кор. 181", "Мф. 105"] },
    { "date": "2025-01-26", "patterns": ["2 Кор. 182", "Мф. 62"] },
    { "date": "2025-01-30", "patterns": ["Євр. 334", "Мф. 11"] },
    { "date": "2025-02-02", "patterns": ["1 Тим. 285", "Лк. 94", "Євр. 316", "Лк. 7"] },
    { "date": "2025-02-09", "patterns": ["2 Тим. 296", "Лк. 89"] },
    { "date": "2025-02-16", "patterns": ["1 Кор. 135", "Лк. 79"] },
    { "date": "2025-02-23", "patterns": ["1 Кор. 140", "Мф. 106"] },
    { "date": "2025-03-02", "patterns": ["Рим. 112", "Мф. 17"] },
    { "date": "2025-03-09", "patterns": ["Євр. 329", "Ін. 5"] },
    { "date": "2025-03-23", "patterns": ["Євр. 311", "Мк. 37"] },
    { "date": "2025-03-25", "patterns": ["Євр. 306", "Лк. 3"] }
];

console.log("Starting Generation...");
const gapMap: Record<string, string> = {};

BASELINE_2025.forEach(entry => {
    const d = new Date(entry.date);
    const nday = getNday(d, PASCHA_2025);

    let bestKey = "";

    Object.entries(lectionary).forEach(([key, val]: [string, any]) => {
        if (bestKey) return;
        const rawAp = (val.epistle || "").replace(/_/g, ' ').toLowerCase();
        const rawGs = (val.gospel || "").replace(/_/g, ' ').toLowerCase();
        const rawApP = val.epistlePericope || "";
        const rawGsP = val.gospelPericope || "";

        for (const pat of entry.patterns) {
            const cleanPat = pat.replace(/\./g, ' ').replace(/\s+/g, ' ').toLowerCase().trim();
            const patNum = pat.match(/\d{2,3}/)?.[0];
            if (patNum) {
                // Check Exact Pericope Match
                if (val.epistlePericope == patNum || val.gospelPericope == patNum) {
                    bestKey = key; break;
                }
                // Check raw text inclusion of "PericopeNumber" if logic allows (risky?)
                // Better strict
            } else {
                if (rawAp.includes(cleanPat) || rawGs.includes(cleanPat)) {
                    bestKey = key; break;
                }
            }
        }
    });

    if (bestKey) {
        gapMap[nday.toString()] = bestKey;
        console.log(`Mapped ${entry.date} (nday ${nday}) -> Key ${bestKey}`);
    } else {
        console.log(`Failed to map ${entry.date}`);
    }
});

fs.writeFileSync('src/calendar_v2/data/gap_map.json', JSON.stringify(gapMap, null, 2));
console.log(`Gap Map generated: ${Object.keys(gapMap).length} entries.`);
