
import * as fs from 'fs';
import * as path from 'path';

// --- Constants & lookups ---

const MATINS_GOSPELS: { [key: string]: string } = {
    "1": "Мф., 116 зач., 28:16-20",
    "2": "Мк., 70 зач., 16:1-8",
    "3": "Мк., 71 зач., 16:9-20",
    "4": "Лк., 112 зач., 24:1-12",
    "5": "Лк., 113 зач., 24:12-35",
    "6": "Лк., 114 зач., 24:36-53",
    "7": "Ін., 63 зач., 20:1-10",
    "8": "Ін., 64 зач., 20:11-18",
    "9": "Ін., 65 зач., 20:19-31",
    "10": "Ін., 66 зач., 21:1-14",
    "11": "Ін., 67 зач., 21:15-25"
};

// PASCHA 2026 is April 12
const PASCHA_2026 = new Date(2026, 3, 12); // Month is 0-indexed: 3 = April

// --- Helper Functions ---

function sanitizeText(text: string): string {
    // 1. Roman Numeral Correction & specific OCR fixes based on prompt
    // "ІМ" -> "IV", "МІІ" -> "VII", "М" -> "V" (in context), "У" -> "V" (often chapter 5)
    // We'll do this carefully within reading strings, but some global replace might be safe for obvious ones
    // specifically prompt mentions: ІМ -> IV -> 4, МІІ -> VII -> 7
    // Also markers like (.), (mid.)

    let san = text
        .replace(/\(.\)/g, "(від половини)")
        .replace(/\(mid\.\)/g, "(з середини)")
        .replace(/ін\./g, "Ін.") // lowercase in for Gospel of John
        .replace(/зач\.,/g, "зач.;") // comma after zachalo to semicolon
        .replace(/Мф\./g, "Мф."); // Ensure consistent

    // Remove technical markers a, b, c, sexte, _
    // san = san.replace(/\b[abc]\b/g, "").replace(/sexte/g, "").replace(/_/g, "");

    return san;
}

function parseRoman(rom: string): string {
    // Convert Roman/Cyrillic-Roman mix to number
    // Map of OCRd roman numerals
    const map: { [k: string]: number } = {
        "І": 1, "I": 1,
        "ІІ": 2, "II": 2,
        "ІІІ": 3, "III": 3, // Cyrillic I
        // "МІІІ": 8, // Removed duplicate
        "ІМ": 4, // Prompt says ІМ -> IV -> 4
        "V": 5, "У": 5, "М": 5,
        "VI": 6, "МІ": 6,
        "VII": 7, "МІІ": 7,
        "VIII": 8, "МІІІ": 8,
        "IX": 9, "ІХ": 9, "ЇХ": 9,
        "X": 10, "Х": 10,
        "XI": 11, "ХІ": 11,
        "XII": 12, "ХІІ": 12, "ХП": 12,
        "XIII": 13, "ХІІІ": 13, "ХШ": 13,
        "XIV": 14, "ХІМ": 14, "ХІV": 14,
        "XV": 15, "ХУ": 15, "ХМ": 15, // ХМ might be XV
        "XVI": 16, "ХМІ": 16, "ХVI": 16,
        "XVII": 17, "ХМІІ": 17,
        "XVIII": 18, "ХМІІІ": 18,
        "XIX": 19, "ХІХ": 19,
        "XX": 20, "ХХ": 20,
        "XXI": 21, "ХХІ": 21,
        "XXII": 22, "ХХІІ": 22
    };

    // Try allow direct parsing if standard roman
    // But we focus on the weird OCR ones
    if (map[rom]) return map[rom].toString();

    // Fallback: try to replace chars and parse
    let norm = rom.replace(/М/g, "V").replace(/У/g, "V").replace(/П/g, "II").replace(/І/g, "I").replace(/Х/g, "X");
    // Standard Roman to Int converter could go here, but for now let's rely on simple mapping or keep as is if commonly understood? 
    // The prompt asks to "Convert Roman Numeral ... to Arabic".
    // I really should try to convert.
    return norm;
}

function normalizeReading(reading: string): string {
    // Expected: "Book., Pericope, Chapters:Verses"
    // e.g. "Діян., 27 зач., Х, 44 - ХІ, 10."

    // 1. Remove trailing period
    let r = reading.trim().replace(/\.$/, "");

    // 2. Normalize Chapter Roman Numerals
    // Regex to find Roman numerals in chapter position: "., ROMAN, " or "- ROMAN,"
    // Only basic range 1-150.

    // Split by comma
    // Check if parts look like chapter numbers

    // Strategy: Regex replace specific patterns
    // "Х, 44" -> "10:44"
    // "ХІ, 10" -> "11:10"

    // OCR Map replacement in context
    r = r.split(/([\s\-,:;|]+)/).map(token => {
        // pure roman token?
        if (/^[ІХVМLСUDM]+$/.test(token) || /^[IXV]+$/.test(token) || /^[ХІУМ]+$/.test(token)) {
            // Try to convert
            // Use our map or heuristics
            // e.g. ХХІ
            const clean = token.replace(/М/g, "V").replace(/У/g, "V").replace(/І/g, "I").replace(/Х/g, "X").replace(/Ї/g, "I").replace(/Ш/g, "III");
            // naive roman to int?
            // It's safer to map common ones because "I" is 1 but "In" is John. Wait, this token is split by space.
            // "Ін" is a book name.
            // We should only convert if it looks like a chapter number.
            // Usually chapters are NOT book names.
            if (getBookName(token)) return token; // It's a book

            // Convert
            try {
                return parseRomanLike(clean);
            } catch (e) {
                return token;
            }
        }
        return token;
    }).join("");

    // Reformating "Book pericope Ch:Ver"
    // "10 44" -> "10:44" if suitable
    // The text has "Х, 44". After Roman replacement: "10, 44".
    // We want "10:44".
    // Replace ", " with ":" only after a chapter number?
    // "10, 44 - 11, 10" -> "10:44 - 11:10"

    r = r.replace(/(\d+)\s*,\s*(\d+)/g, "$1:$2");

    return r;
}

function parseRomanLike(str: string): string {
    // Simple parser or map
    const ROMAN_VAL: { [k: string]: number } = { I: 1, V: 5, X: 10, L: 50, C: 100 };
    let total = 0;
    let prev = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        const c = str[i];
        const v = ROMAN_VAL[c];
        if (!v) return str; // failed
        if (v < prev) total -= v;
        else total += v;
        prev = v;
    }
    return total.toString();
}

const BOOKS = ["Мф", "Мк", "Лк", "Ін", "Діян", "Рим", "Кор", "Гал", "Еф", "Флп", "Кол", "Сол", "Тим", "Тит", "Флм", "Євр", "Як", "Пет", "Іоан", "Юд", "Одкр", "Бут", "Вих", "Лев", "Чис", "Втор", "Іс", "Єр", "Єз", "Дан", "Ос", "Іоїл", "Ам", "Овд", "Іон", "Мих", "Наум", "Авв", "Соф", "Аг", "Зах", "Мал", "Притч", "Еккл", "Пісн", "Прем", "Сир", "Іов"];

function getBookName(str: string): boolean {
    return BOOKS.some(b => str.startsWith(b));
}

// --- Main Parsing ---

interface ReadingObj {
    reading: string;
    label: string;
    type?: string;
}

function parseFile(content: string) {
    const lines = content.split('\n');
    const rules: any[] = [];

    let currentMonth = 5; // Start in May (5) per snippet analysis.
    let currentDayStr = "";
    let currentDayInt = 0;

    let buffer: string[] = [];

    // Regex for date line: start with number, maybe text
    // "8" or "10"
    // We need to detect "Month" change headers

    const flushDay = () => {
        if (!currentDayStr) return;

        // Parse the buffer
        const rule = processDay(currentDayInt, currentMonth, buffer);
        if (rule) rules.push(rule);

        buffer = [];
    };

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) continue;

        // Check for Month Header
        if (line.includes("ЧЕРВЕНЬ")) { if (currentDayInt > 20) currentMonth = 6; } // simple heuristic
        if (line.includes("ЛИПЕНЬ")) currentMonth = 7;
        // ... add others if file spans more

        // Check for Day Logic
        // A line that is just a number? Or starts with number and looks like date?
        // OCR sometimes puts "10" then newline.
        // Or "10 понеділок".
        const dayMatch = line.match(/^(\d{1,2})(\s+([а-яієї']+|[a-z]+))?$/i);

        if (dayMatch) {
            // It is a new day
            const d = parseInt(dayMatch[1]);

            // Check formatted continuity (e.g. not a verse number)
            // Verse numbers usually inside text. Dates usually standalone or with Weekday.
            if (d > 0 && d <= 31) {
                // If we jumped from 30 to 1, month increment
                if (currentDayInt >= 28 && d <= 2) {
                    currentMonth++;
                }

                flushDay();
                currentDayInt = d;
                currentDayStr = `${2026}-${String(currentMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                continue;
            }
        }

        buffer.push(line);
    }
    flushDay(); // last one

    return rules;
}

function processDay(day: number, month: number, lines: string[]): any {
    const dateStr = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const id = `2026-${dateStr}`;

    // Calculate nday
    const current = new Date(2026, month - 1, day);
    const diffTime = current.getTime() - PASCHA_2026.getTime();
    const nday = Math.round(diffTime / (1000 * 60 * 60 * 24));

    // Arrays for readings
    const matins: ReadingObj[] = [];
    const liturgyAp: ReadingObj[] = [];
    const liturgyGosp: ReadingObj[] = [];

    let title = "";

    // Processing context
    let section = "title"; // title, matins, liturgy, other

    for (let line of lines) {
        line = sanitizeText(line);

        // Title extraction: usually first lines before "Ран." or "Літ."
        if (section === "title") {
            if (line.startsWith("Ран.") || line.startsWith("Літ.") || line.startsWith("Ап.") || line.startsWith("Єв.") || line.startsWith("Діян.") || line.startsWith("Рим.") || line.startsWith("Мф.") || line.startsWith("Ін.") || line.startsWith("Лк.") || line.startsWith("Мк.")) {
                section = "readings";
            } else {
                title += (title ? " " : "") + line;
                continue;
            }
        }

        // Parsing Readings
        // Pattern: "Label - Reading"
        // "Ран. - ..."
        // "Літ. - ..."
        // "Ап.: ..."
        // "Ікон ... (Title continuation?)" -> If section is readings, be careful. Sometimes saints list continues.

        // Identify line type
        if (line.startsWith("Ран.")) {
            // Matins
            // content after dash
            let content = line.replace(/^Ран\.\s*[-–]\s*/, "");
            // Check for "Єв. X-е"
            const evMatch = content.match(/Єв\.\s*(\d+)-?[еє]/);
            if (evMatch) {
                const num = evMatch[1];
                if (MATINS_GOSPELS[num]) {
                    content = MATINS_GOSPELS[num];
                }
            }
            // Normalize
            content = normalizeReading(content);
            matins.push({ reading: content, label: "Ран." });
        } else if (line.startsWith("Літ.")) {
            let content = line.replace(/^Літ\.\s*[-–]\s*/, "");
            // usually "Ap., ..., Gosp., ..." or separate lines?
            // "Літ. - Діян., 27 зач., X, 44 - XI, 10. Ін., 30 зач. ..."
            // Need to split Apostle and Gospel.
            // Heuristic: Look for second book start?
            // "Діян... Ін..."
            // Or maybe they are just allowed to be in Liturgy?
            // Schema separates them. Apostle / Gospel.
            // We need to detect which book is which.
            // Acts/Epistles -> Apostle. Gospels -> Gospel.

            const chunks = splitReadings(content);
            chunks.forEach(c => {
                if (isGospel(c)) liturgyGosp.push({ reading: normalizeReading(c), label: "Літ." });
                else liturgyAp.push({ reading: normalizeReading(c), label: "Літ." });
            });
        }
        else if (line.startsWith("Ап.:") || line.startsWith("Апп.:") || line.startsWith("Св.:") || line.startsWith("Свт.:") || line.startsWith("Прп.:") || line.startsWith("Муч.:") || line.startsWith("Мч.:") || line.startsWith("Вмч.:") || line.startsWith("Рівноап.:")) {
            // Specific saint readings
            const label = line.split(/[.:]/)[0] + "."; // extract label "Ап." or "Свт."
            let content = line.replace(/^[^.:]+[.:]+\s*/, "");
            const chunks = splitReadings(content);
            chunks.forEach(c => {
                if (isGospel(c)) liturgyGosp.push({ reading: normalizeReading(c), label: label });
                else liturgyAp.push({ reading: normalizeReading(c), label: label });
            });
        }
        // Sometimes lines just start with reading (continuation or implicit Liturgy)
        else if (getBookName(line)) {
            // Likely Liturgy readings if not specified
            const chunks = splitReadings(line);
            chunks.forEach(c => {
                if (isGospel(c)) liturgyGosp.push({ reading: normalizeReading(c), label: "Ряд." }); // Default to Ryad/Day?
                else liturgyAp.push({ reading: normalizeReading(c), label: "Ряд." });
            });
        }
    }

    // Construct Object
    const obj: any = {
        id: id,
        triggers: {
            nday: [nday],
            mmdd: [dateStr]
        },
        action: "REPLACE_LITURGY",
        data: {
            title: title.trim(),
            liturgy: {
                apostle: liturgyAp,
                gospel: liturgyGosp
            }
        }
    };

    if (matins.length > 0) obj.data.matins = matins;

    return obj;
}

function splitReadings(text: string): string[] {
    // "Act 1, 2. Matt 3, 4"
    // Regex lookahead for Book Name?
    // "BOOK., "
    // We split by "BOOK" but keep the delimiter.

    // Naive split by ". " then check if part starts with book?
    // "Ін., 30 зач..."
    // "Діян., 27 зач..."

    // Regex: Find index where a Book Name starts a new sentence/clause
    // It's hard to regex split keeping delimiters properly in one go in JS without lookbehind sometimes.

    // Use token matches
    const bookPattern = "(" + BOOKS.join("|") + ")";
    // Match "Book., or Book "
    const regex = new RegExp("(?<=\\s|^)" + bookPattern + "[\\.,]", "g"); // Lookbehind might not be supported in all envs.

    // Simple pass:
    // Scan for book names.
    const parts: string[] = [];
    const words = text.split(/\s+/);
    let currentPart = "";

    for (let i = 0; i < words.length; i++) {
        const w = words[i];
        const isBook = BOOKS.some(b => w.startsWith(b));
        // Also check punctuation. "Мф.,"

        if (isBook && currentPart.trim().length > 0 && i > 0) {
            // Check if it's really a new reading start.
            // Usually preceded by period? Or it's the start of "OtherBook"
            // If currentPart ends with logic flow (like numbers), and new word is a book.
            parts.push(currentPart.trim());
            currentPart = w;
        } else {
            currentPart += " " + w;
        }
    }
    if (currentPart) parts.push(currentPart.trim());
    return parts;
}

function isGospel(reading: string): boolean {
    return reading.startsWith("Мф") || reading.startsWith("Мк") || reading.startsWith("Лк") || reading.startsWith("Ін");
}

// --- Run ---

const filePath = path.join(__dirname, 'calendar_v2/data/extracted_calendar.txt');
const content = fs.readFileSync(filePath, 'utf-8');
const result = parseFile(content);

fs.writeFileSync(path.join(__dirname, 'calendar_v2/data/parsed_rules.json'), JSON.stringify(result, null, 2));
console.log(`Parsed ${result.length} rules.`);

