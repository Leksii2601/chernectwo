
import * as fs from 'fs';
import * as path from 'path';

// --- Configuration ---
const INPUT_FILE = './src/calendar_v2/data/native_calendar_text.txt';
const SAINTS_INDEX = './src/calendar_v2/data/saints_index.json';
const OUTPUT_FILE = './src/calendar_v2/data/parsed_rules_v2.json';

const PASCHA_2026 = new Date(2026, 3, 12); // April 12, 2026

// Map Ukrainian Month Names to indices (0-11)
const MONTH_MAP: { [key: string]: number } = {
    "СІЧЕНЬ": 0, "ЛЮТИЙ": 1, "БЕРЕЗЕНЬ": 2, "КВІТЕНЬ": 3, "ТРАВЕНЬ": 4, "ЧЕРВЕНЬ": 5,
    "ЛИПЕНЬ": 6, "СЕРПЕНЬ": 7, "ВЕРЕСЕНЬ": 8, "ЖОВТЕНЬ": 9, "ЛИСТОПАД": 10, "ГРУДЕНЬ": 11
};

// --- Types ---
interface TypikonRule {
    id: string;
    triggers: {
        mmdd?: string[];
        nday?: number[];
    };
    action: string;
    data: {
        title: string;
        liturgy?: {
            apostle?: ReadingItem[];
            gospel?: ReadingItem[];
        };
        matins?: ReadingItem[];
    };
}

interface ReadingItem {
    reading: string;
    label: string;
}

interface SaintEntry {
    name: string;
    dates: string[]; // "MM-DD"
}

// --- Helpers ---

// Reading Line Detector
// Must start with a prefix AND contain digits or book abbreviations to avoid false positives (saint names)
const READING_PREFIXES = [
    "Ран", "Літ", "Ап", "Єв", "Свт", "Прп", "Мч", "Вмч", "Рівноап",
    "Безср", "Прор", "Заупокійне", "Ряд", "Богородиці", "Мц", "Сщмч", "Блгв", "Арханг"
];

function isReadingLine(line: string): boolean {
    const trimmed = line.trim();
    // Regex for "Prefix" followed by punctuation
    const pattern = new RegExp(`^(${READING_PREFIXES.join("|")})[а-я0-9]*[.:]`, "i"); // allowed 0-9 in prefix just in case "Мч.2"
    const hasPrefix = pattern.test(trimmed);

    // Must also look like a reading: contains digits or "зач" or standard book abbrevs followed by punctuation
    const looksLikeReading = /(\d+)|(зач)|(Кор|Рим|Мф|Мк|Лк|Ін|Діян)/.test(trimmed);

    return hasPrefix && looksLikeReading;
}

function normalizeText(text: string): string {
    return text.toLowerCase().replace(/[^\p{L}\d]/gu, "");
}

// Similarity Scorer for Saint Matching
function findBestDate(text: string, saintIndex: SaintEntry[], currentMonth: number | null): string | null {
    // 1. Check for Movable Feasts Keywords
    if (/самарянку/i.test(text)) return "nday:28";
    if (/сліпого/i.test(text)) return "nday:35";
    if (/отців.+вселенського.+собору/i.test(text) && /7-ма неділя/i.test(text)) return "nday:42";
    if (/вознесіння/i.test(text) && !/віддання/i.test(text)) return "nday:39";
    if (/п'?ятдесятниця/i.test(text) && !/віддання/i.test(text) && !/тиждень/i.test(text)) {
        if (/день святої тройці/i.test(text)) return "nday:49";
    }
    if (/день святого духа/i.test(text)) return "nday:50";
    if (/всіх святих/i.test(text) && /1-ша неділя/i.test(text)) return "nday:56";
    if (/всіх святих землі української/i.test(text)) return "nday:63";

    // 2. Fixed Feasts scoring
    const textTokens: string[] = text.toLowerCase().match(/\p{L}{4,}/gu) || [];
    if (textTokens.length === 0) return null;

    let bestScore = 0;
    let bestDates: string[] = [];

    for (const saint of saintIndex) {
        let score = 0;
        const saintTokens = saint.name.toLowerCase().match(/\p{L}{4,}/gu) || [];

        let matches = 0;
        for (const token of saintTokens) {
            if (textTokens.includes(token)) matches++;
        }

        if (matches > 0) {
            score = matches / (textTokens.length + saintTokens.length - matches);
        }

        if (score > bestScore) {
            bestScore = score;
            bestDates = saint.dates;
        }
    }

    if (bestScore > 0.1 && bestDates.length > 0) {
        // Filter by Current Month if known
        if (currentMonth !== null) {
            // Check current month and maybe next/prev month margin
            // Saint Index dates are "MM-DD"
            const monthStr = String(currentMonth + 1).padStart(2, '0');
            const inMonth = bestDates.find(d => d.startsWith(monthStr));
            if (inMonth) return inMonth;
        }
        return bestDates[0];
    }
    return null;
}

// Sanitizer
function sanitizeReading(text: string): string {
    let s = text.trim();
    // Remove leading dash/punctuation often left by OCR split
    s = s.replace(/^[-–]\s*/, "");

    // Roman replacements
    s = s.replace(/\bІМ\b/g, "IV")
        .replace(/\bМІІ\b/g, "VII")
        .replace(/\bХІМ\b/g, "XIV")
        .replace(/\bХП\b/g, "XII")
        .replace(/\bІХ\b/g, "IX")
        .replace(/\bХУ\b/g, "XV");

    s = s.replace(/зач\.,/g, "зач.;");
    s = s.replace(/\bін\./g, "Ін.");
    s = s.replace(/\(mid\.\)/g, "(з середини)");
    s = s.replace(/\(\.\)/g, "(від половини)");

    return s;
}

// --- Main Process ---

function main() {
    console.log("Starting processing...");

    const saintsRaw = fs.readFileSync(SAINTS_INDEX, 'utf-8');
    const saintsIndex: SaintEntry[] = JSON.parse(saintsRaw);

    const content = fs.readFileSync(INPUT_FILE, 'utf-8');
    const lines = content.split('\n');

    const rules: TypikonRule[] = [];

    let currentTextBuffer: string[] = [];
    let currentReadingBuffer: string[] = [];

    let currentMonth: number | null = null;
    let lastDateKey: string | null = null;

    // Heuristic: Start with context if needed, but file has headers
    // If native_calendar_text.txt starts at Page 36 (May), Set default to May?
    // User snippet showed "ТРАВЕНЬ" early on.

    const processBlock = () => {
        if (currentTextBuffer.length === 0 && currentReadingBuffer.length === 0) return;

        const fullText = currentTextBuffer.join(" ").trim();
        let dateKey = findBestDate(fullText, saintsIndex, currentMonth);

        // Refine ID: if no match, check if it's supplementary to previous?
        if (dateKey) {
            lastDateKey = dateKey;
        } else if (lastDateKey && currentReadingBuffer.length > 0) {
            // Assume continuation
            dateKey = lastDateKey;
        }

        if (dateKey && currentReadingBuffer.length > 0) {
            const { matins, liturgy } = parseReadingsBlock(currentReadingBuffer);

            // Clean title - remove junk
            // Take first 200 chars
            const cleanTitle = fullText.replace(/\s+/g, " ").substring(0, 200);

            let id = "";
            const triggers: any = {};

            if (dateKey.startsWith("nday:")) {
                const n = parseInt(dateKey.split(":")[1]);
                triggers.nday = [n];
                id = `2026-nday-${n}`;
            } else {
                triggers.mmdd = [dateKey];
                id = `2026-${dateKey}`;
            }

            // Merge logic
            const existing = rules.find(r => r.id === id);
            if (existing && existing.data && existing.data.liturgy) {
                if (matins.length) existing.data.matins = [...(existing.data.matins || []), ...matins];
                if (liturgy.apostle) existing.data.liturgy.apostle = [...(existing.data.liturgy.apostle || []), ...liturgy.apostle];
                if (liturgy.gospel) existing.data.liturgy.gospel = [...(existing.data.liturgy.gospel || []), ...liturgy.gospel];
                existing.data.title += " | " + cleanTitle;
            } else {
                const rule: TypikonRule = {
                    id: id,
                    triggers: triggers,
                    action: "REPLACE_LITURGY",
                    data: {
                        title: cleanTitle,
                        liturgy: liturgy,
                        matins: matins.length ? matins : undefined
                    }
                };
                rules.push(rule);
            }
        }

        currentTextBuffer = [];
        currentReadingBuffer = [];
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith("---") || /^\d+$/.test(line)) {
            continue;
        }

        // Month Detection
        for (const m in MONTH_MAP) {
            if (line.includes(m) && line.length < 30) {
                currentMonth = MONTH_MAP[m];
                console.log("Current Month set to:", m);
            }
        }

        if (isReadingLine(line)) {
            currentReadingBuffer.push(line);
        } else {
            // Check if false negative reading line (continuation)
            if (currentReadingBuffer.length > 0 && /^(Мф|Мк|Лк|Ін|Діян|Рим|Кор|Гал|Євр|Як)\.?\s*,/.test(line)) {
                currentReadingBuffer.push(line);
            } else {
                if (currentReadingBuffer.length > 0) {
                    // Flush
                    processBlock();
                }

                // Buffer text if not day name
                if (!/^(понеділок|вівторок|середа|четвер|п'ятниця|субота|неділя)$/i.test(line)) {
                    currentTextBuffer.push(line);
                }
            }
        }
    }
    processBlock(); // Last one

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(rules, null, 2));
    console.log(`Generated ${rules.length} rules.`);
}

function parseReadingsBlock(lines: string[]) {
    const matins: ReadingItem[] = [];
    const liturgyAp: ReadingItem[] = [];
    const liturgyGosp: ReadingItem[] = [];

    lines.forEach(line => {
        const clean = sanitizeReading(line);
        const match = clean.match(/^([^.:]+)[.:–-]\s*(.*)$/);

        if (match) {
            let label = match[1].trim();
            const content = match[2].trim();

            if (label.startsWith("Ран")) {
                matins.push({ reading: content, label: "Ран." });
            } else {
                // Liturgy or specific
                const parts = splitReadings(content);
                parts.forEach(p => {
                    if (isGospel(p)) liturgyGosp.push({ reading: p, label: label });
                    else liturgyAp.push({ reading: p, label: label });
                });
            }
        } else {
            // No label? treat as continuation of previous?
            // Or default to Liturgy Ryad?
            // "1 Кор..."
            const parts = splitReadings(clean);
            parts.forEach(p => {
                if (isGospel(p)) liturgyGosp.push({ reading: p, label: "Літ." });
                else liturgyAp.push({ reading: p, label: "Літ." });
            });
        }
    });

    return { matins, liturgy: { apostle: liturgyAp, gospel: liturgyGosp } };
}

function isGospel(text: string): boolean {
    return /^(Мф|Мк|Лк|Ін)\.?/i.test(text);
}

function splitReadings(text: string): string[] {
    const books = ["Мф", "Мк", "Лк", "Ін", "Діян", "Рим", "Кор", "Гал", "Еф", "Флп", "Кол", "Сол", "Тим", "Тит", "Флм", "Євр", "Як", "Пет", "Іоан", "Юд", "Одкр"];
    const parts: string[] = [];
    let buffer = "";

    const tokens = text.split(" ");
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        let isBookStart = false;
        if (books.some(b => t.startsWith(b))) isBookStart = true;
        if (/^\d$/.test(t) && i + 1 < tokens.length && books.some(b => tokens[i + 1].startsWith(b))) {
            isBookStart = true;
        }

        if (isBookStart && buffer.length > 5) {
            // Check delimiter
            if (buffer.trim().endsWith(".") || buffer.trim().endsWith(";")) {
                parts.push(buffer.trim());
                buffer = "";
            }
        }
        buffer += t + " ";
    }
    if (buffer.trim()) parts.push(buffer.trim());
    return parts;
}

main();
