
import * as fs from 'fs';
import * as path from 'path';

// --- Book Name Translation Map ---
// Translates English/Latin abbreviations to Ukrainian.

const BOOK_MAP: Record<string, string> = {
    // Gospels
    "Mt": "Мф.",
    "Mk": "Мк.",
    "Lk": "Лк.",
    "Jn": "Ін.",
    // Apostles
    "Acts": "Діян.",
    "Rom": "Рим.",
    "I Cor": "1 Кор.",
    "II Cor": "2 Кор.",
    "Gal": "Гал.",
    "Eph": "Еф.",
    "Philip": "Флп.",
    "Col": "Кол.",
    "I Thes": "1 Сол.",
    "II Thes": "2 Сол.",
    "I Tim": "1 Тим.",
    "II Tim": "2 Тим.",
    "Tit": "Тит.",
    "Philem": "Флм.",
    "Heb": "Євр.",
    "Jam": "Як.",
    "I Pet": "1 Пет.",
    "II Pet": "2 Пет.",
    "I Jn": "1 Ін.",
    "II Jn": "2 Ін.",
    "III Jn": "3 Ін.",
    "Jude": "Юди",
    // OT
    "Gen": "Бут.",
    "Exod": "Вих.",
    "Lev": "Лев.",
    "Num": "Чис.",
    "Deut": "Повт.",
    "Josh": "Нав.",
    "Judg": "Суд.",
    "Ruth": "Рут.",
    "I Sam": "1 Цар.",
    "II Sam": "2 Цар.",
    "III Ki": "3 Цар.",
    "IV Ki": "4 Цар.",
    "I Chron": "1 Пар.",
    "II Chron": "2 Пар.",
    "Ezra": "Езд.",
    "Neh": "Неєм.",
    "Esth": "Ест.",
    "Job": "Іов.",
    "Ps": "Пс.",
    "Prov": "Притч.",
    "Eccl": "Еккл.",
    "Song": "Пісн.",
    "Wisd": "Прем.",
    "Isa": "Іс.",
    "Jer": "Єр.",
    "Lam": "Плач",
    "Ezek": "Єз.",
    "Dan": "Дан.",
    "Hos": "Ос.",
    "Joel": "Іоїл.",
    "Amos": "Ам.",
    "Obad": "Авд.",
    "Jonah": "Іона",
    "Mic": "Міх.",
    "Nah": "Наум.",
    "Hab": "Авв.",
    "Zeph": "Соф.",
    "Hag": "Аг.",
    "Zech": "Зах.",
    "Mal": "Мал.",
    "Is": "Іс.",
    "Bar": "Вар."
};

function translateReading(readingStr: string): string {
    if (!readingStr) return "";

    // Split by comma first to handle multiple readings e.g. "Gen_1:1-13, Gen_1:14-20"
    // But verify format. Ponomar usually is "Book_Ch:Vs".
    // Sometimes "Gen_1:1-5, 6-8".

    // The previous logic was splitting by '_'.
    // If multiple readings are separated by comma?
    // "Gen_1:1-13, Gen_1:14-20" -> Ponomar usually uses separate <SCRIPTURE> tags if distinct.
    // But inside one Reading attr?
    // Let's assume standard Ponomar format "Book_Verses".

    const parts = readingStr.split('_');
    if (parts.length < 2) {
        // Maybe it's just Book without underscore? or no book?
        return readingStr;
    }

    const bookEn = parts[0];
    const verses = parts.slice(1).join('_');

    const bookUa = BOOK_MAP[bookEn];
    if (bookUa) {
        // Handle verse suffix 'b' -> '(від пол.)'
        let translatedVerses = verses;

        // Replace patterns like "22b" or "1:22b" with "(від пол.)"
        translatedVerses = translatedVerses.replace(/(\d+)b\b/g, '$1 (від пол.)');

        // Replace explicit "(mid.)" marker
        translatedVerses = translatedVerses.replace(/\(mid\.\)/g, '(від пол.)');

        // Replace 'a' suffix as well (від початку) - less common
        translatedVerses = translatedVerses.replace(/(\d+)a\b/g, '$1');

        return `${bookUa} ${translatedVerses}`;
    } else {
        // Try recursive check if comma exists and books are repeated?
        // Unlikely for now.
        return readingStr;
    }
}

/**
 * Format pericope number in Ukrainian
 * @param pericope - the pericope number (e.g., "254")
 * @returns formatted string like "зач. 254"
 */
function formatPericope(pericope: string | number): string {
    if (!pericope) return "";
    return `зач. ${pericope}`;
}

function processStructure(data: any): any {
    if (Array.isArray(data)) {
        return data.map(item => processStructure(item));
    } else if (typeof data === 'object' && data !== null) {
        const newData: any = { ...data };

        // Translate Reading field
        if (newData.Reading) {
            newData.Reading = translateReading(newData.Reading);
        }

        // Format Pericope field as "зач. N"
        if (newData.Pericope) {
            newData.PericopeFormatted = formatPericope(newData.Pericope);
        }

        // Recursively process other fields
        Object.keys(newData).forEach(key => {
            if (typeof newData[key] === 'object' || Array.isArray(newData[key])) {
                newData[key] = processStructure(newData[key]);
            }
        });

        return newData;
    }
    return data;
}

const INPUT_FILE = path.resolve(process.cwd(), 'src/calendar_v2/data/ponomar_raw/ponomar_lives.json');
const OUTPUT_FILE = path.resolve(process.cwd(), 'src/calendar_v2/data/ponomar_raw/ponomar_lives_ua.json');

console.log(`Reading ${INPUT_FILE}...`);
const inputData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));

console.log('Translating...');
const translatedData = processStructure(inputData);

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(translatedData, null, 2));
console.log(`Saved translated file to ${OUTPUT_FILE}`);
