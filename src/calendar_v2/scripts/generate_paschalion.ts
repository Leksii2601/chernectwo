
import * as fs from 'fs';
import * as path from 'path';
import { getOrthodoxPascha } from '../LiturgicalEngine';

// Helpers for Paschalion Metrics
function getIndiction(year: number): number {
    const i = (year + 8) % 15;
    return i === 0 ? 15 : i;
}

function getSolarCycle(year: number): number {
    const s = (year + 20) % 28;
    return s === 0 ? 28 : s;
}

function getLunarCycle(year: number): number {
    const l = (year + 1) % 19;
    return l === 0 ? 19 : l;
}

const LETTERS = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "Ѕ", "З", "И", "І", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "Ꙋ", "Ф", "Х", "Ѿ", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Ѣ", "Ю", "Ѫ", "Ѧ"];

function getKeyOfBoundaries(year: number, paschaNS: Date): string {
    const march22JulianAsGregorian = new Date(year, 2, 22 + 13); // March 22 + 13 = April 4.
    const diffTime = paschaNS.getTime() - march22JulianAsGregorian.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 0 && diffDays < LETTERS.length) {
        return LETTERS[diffDays];
    }
    return "?";
}

interface PaschalionRecord {
    year: number;
    indiction: number;
    solarCycle: number;
    lunarCycle: number;
    paschaDate: string; // YYYY-MM-DD
    key: string;
}

const START_YEAR = 2024;
const END_YEAR = 2050; // Generate for next few decades

const records: PaschalionRecord[] = [];

console.log(`Generating Paschalion from ${START_YEAR} to ${END_YEAR}...`);

for (let y = START_YEAR; y <= END_YEAR; y++) {
    const pascha = getOrthodoxPascha(y);
    const key = getKeyOfBoundaries(y, pascha);

    records.push({
        year: y,
        indiction: getIndiction(y),
        solarCycle: getSolarCycle(y),
        lunarCycle: getLunarCycle(y),
        paschaDate: pascha.toISOString().split('T')[0],
        key: key
    });
}

// Output
const outputDir = path.resolve(process.cwd(), 'src/calendar_v2/data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'paschalion.json'), JSON.stringify(records, null, 2));
console.log("paschalion.json generated.");
