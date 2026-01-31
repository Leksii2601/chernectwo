
import { calculateDynamicReadings, getOrthodoxPascha } from '../LiturgicalEngine';

// Baseline 2025 Data
const BASELINE_2025: Record<string, any> = {
    "2025-01-01": { "name": "Обрізання", "patterns": ["Кол. 254", "Лк. 6", "Євр. 318", "Лк. 24"] },
    "2025-01-05": { "name": "Навечір’я", "patterns": ["2 Кор. 170", "Мф. 89"] },
    "2025-01-06": { "name": "БОГОЯВЛЕННЯ", "patterns": ["Тит. 302", "Мф. 6"] },
    "2025-01-14": { "name": "Рівноап. Ніни", "patterns": ["Гал. 212", "Мк. 28", "1 Кор. 131", "Мф. 104"] },
    "2025-01-19": { "name": "30-та неділя", "patterns": ["2 Кор. 181", "Мф. 105"] },
    "2025-01-26": { "name": "31-ша неділя", "patterns": ["2 Кор. 182", "Мф. 62"] },
    "2025-01-30": { "name": "Трьох Святителів", "patterns": ["Євр. 334", "Мф. 11"] },
    "2025-02-02": { "name": "СТРІТЕННЯ/Закхей", "patterns": ["1 Тим. 285", "Лк. 94", "Євр. 316", "Лк. 7"] },
    "2025-02-09": { "name": "Митаря (-70)", "nday": -70, "patterns": ["2 Тим. 296", "Лк. 89"] },
    "2025-02-16": { "name": "Блудного (-63)", "nday": -63, "patterns": ["1 Кор. 135", "Лк. 79"] },
    "2025-02-23": { "name": "М’ясопусна (-56)", "nday": -56, "patterns": ["1 Кор. 140", "Мф. 106"] },
    "2025-03-02": { "name": "Сиропусна (-49)", "nday": -49, "patterns": ["Рим. 112", "Мф. 17"] },
    "2025-03-09": { "name": "1-ша посту (-42)", "nday": -42, "patterns": ["Євр. 329", "Ін. 5"] },
    "2025-03-23": { "name": "3-тя посту (-28)", "nday": -28, "patterns": ["Євр. 311", "Мк. 37"] },
    "2025-03-25": { "name": "БЛАГОВІЩЕННЯ", "patterns": ["Євр. 306", "Лк. 3"] }
};

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

const PASCHA_2025 = new Date(2025, 3, 20); // Apr 20
const PASCHA_2026 = getOrthodoxPascha(2026); // Apr 12

console.log("Starting Audit...");
console.log(`Pascha 2025: ${PASCHA_2025.toDateString()}`);
console.log(`Pascha 2026: ${PASCHA_2026.toDateString()}`);

let total = 0;
let passed = 0;

Object.entries(BASELINE_2025).forEach(([dateStr2025, baseline]) => {
    total++;
    const [y, m, d] = dateStr2025.split('-').map(Number);
    const date2025 = new Date(y, m - 1, d);

    // 1. Calculate nday
    const nday = getNday(date2025, PASCHA_2025);

    // 2. Find equivalent 2026 date
    // Target Date = Pascha2026 + nday
    // Pascha2026 is at Noon.
    // Result will be at Noon.
    const date2026 = new Date(PASCHA_2026.getTime() + (nday * 24 * 3600 * 1000));
    // Normalize to Midnight for logging?
    date2026.setHours(12, 0, 0, 0);

    // 3. Run Engine
    const result = calculateDynamicReadings(date2026);
    const json = JSON.stringify(result.readings);

    console.log(`\nChecking: ${baseline.name} (nday ${nday})`);
    console.log(`2025: ${dateStr2025}. 2026: ${date2026.toISOString().split('T')[0]}`);

    // 4. Validate Patterns
    const missing: string[] = [];
    baseline.patterns.forEach((pat: string) => {
        // Simple text normalization for check
        // Remove spaces, punctuation for fuzzy match
        const pNorm = pat.replace(/\./g, ' ').replace(/\s+/g, ' ').trim();
        // Check if `json` includes the MAIN part (Book + Chapter)
        // E.g. "Кол 254" might match "Кол., 254 зач."
        // Or "Col. 254"
        // Let's rely on Pericope Number if present in pattern? "254", "318", "170".
        const pericopeMatch = pat.match(/\d{2,3}/);
        if (pericopeMatch) {
            if (!json.includes(pericopeMatch[0])) missing.push(pat);
        } else {
            // Text match (e.g. Chapter:Verse)
            // "1 Cor 131" -> "1 Кор 131"
            if (!json.includes(pat)) missing.push(pat);
        }
    });

    if (missing.length === 0) {
        console.log("PASS");
        passed++;
    } else {
        console.log("FAIL. Missing:", missing);
        console.log("Got:", json);
    }
});

console.log(`\nAudit Complete. Passed: ${passed}/${total}`);
if (passed === total) process.exit(0);
else process.exit(1);
