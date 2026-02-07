import * as fs from 'fs';
import * as path from 'path';

// --- Configuration ---
const INPUT_FILE = './src/calendar_v2/data/native_calendar_text.txt';
const SAINTS_INDEX = './src/calendar_v2/data/saints_index.json';
const OUTPUT_FILE = './src/calendar_v2/data/parsed_rules_final.json';

const PASCHA_2026 = new Date(2026, 3, 12); // April 12, 2026

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

// Map Ukrainian Month Names to indices (0-11)
const MONTH_MAP: { [key: string]: number } = {
    "СІЧЕНЬ": 0, "ЛЮТИЙ": 1, "БЕРЕЗЕНЬ": 2, "КВІТЕНЬ": 3, "ТРАВЕНЬ": 4, "ЧЕРВЕНЬ": 5,
    "ЛИПЕНЬ": 6, "СЕРПЕНЬ": 7, "ВЕРЕСЕНЬ": 8, "ЖОВТЕНЬ": 9, "ЛИСТОПАД": 10, "ГРУДЕНЬ": 11
};

// --- Helpers ---

// Clean Title for Display
function cleanTitle(text: string): string {
    let cleaned = text;

    // Remove image URLs
    cleaned = cleaned.replace(/!\[.*?\]\(https?:\/\/[^\)]+\)/g, "");

    // Remove HTML tags
    cleaned = cleaned.replace(/<[^>]+>/g, " ");

    // Remove LaTeX markup
    cleaned = cleaned.replace(/\\section\*\{[^}]*\}/g, "");
    cleaned = cleaned.replace(/\\[a-z]+\{[^}]*\}/g, "");

    // Remove markdown headers
    cleaned = cleaned.replace(/^#{1,6}\s+/gm, "");

    // Remove URLs
    cleaned = cleaned.replace(/https?:\/\/[^\s]+/g, "");

    // Normalize whitespace
    cleaned = cleaned.replace(/\s+/g, " ").trim();

    // Remove common instruction prefixes that aren't titles
    const instructionPrefixes = [
        /^На Літургії.*/i,
        /^На ранній.*/i,
        /^На веч\./i,
        /^На \d-му часі.*/i,
        /^Літургія за чином.*/i,
        /^Служба.*/i,
        /^Всенічна.*/i,
        /^Звершується.*/i,
        /^Прокимен.*/i,
        /^Антифони.*/i
    ];

    for (const prefix of instructionPrefixes) {
        if (prefix.test(cleaned)) {
            return ""; // This is an instruction, not a title
        }
    }

    // Smart sentence extraction - handle abbreviations
    const abbrevs = ['Мч', 'Мц', 'Прп', 'Свт', 'Блгв', 'Прмч', 'Сщмч', 'Рівноап', 'Ап', 'Прпп', 'Мчч', 'Сщмчч'];

    // Find first real sentence end (not an abbreviation)
    let sentenceEnd = -1;
    let pos = 0;

    while (pos < cleaned.length) {
        const dotPos = cleaned.indexOf('. ', pos);
        if (dotPos === -1) break;

        // Check if this is an abbreviation
        const beforeDot = cleaned.substring(Math.max(0, dotPos - 10), dotPos).trim();
        const isAbbrev = abbrevs.some(abbr => beforeDot.endsWith(abbr));

        if (!isAbbrev) {
            sentenceEnd = dotPos + 1;
            break;
        }

        pos = dotPos + 2;
    }

    if (sentenceEnd > 0 && sentenceEnd < 250) {
        return cleaned.substring(0, sentenceEnd);
    }

    // No sentence end found, limit to 200 chars
    return cleaned.substring(0, 200).trim();
}

// Sanitize Text for Matching
function normalizeText(text: string): string {
    return text.toLowerCase().replace(/[^\p{L}\d]/gu, "");
}

// Sanitize Reading
function sanitizeReading(text: string): string {
    let s = text.trim();
    s = s.replace(/^[-–]\s*/, ""); // Remove bold dash

    // Technical cleanups
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

    // Fix double spaces
    return s.replace(/\s+/g, " ");
}

const READING_PREFIXES = [
    "Ран", "Літ", "Ап", "Єв", "Свт", "Прп", "Мч", "Вмч", "Рівноап",
    "Безср", "Прор", "Заупокійне", "Ряд", "Богородиці", "Мц", "Сщмч", "Блгв", "Арханг"
];

const BIBLE_BOOKS = [
    "Мф", "Мк", "Лк", "Ін", "Діян", "Рим", "Кор", "Гал", "Еф", "Флп", "Кол",
    "Сол", "Тим", "Тит", "Флм", "Євр", "Як", "Пет", "Іоан", "Юд", "Одкр",
    "Бут", "Вих", "Лев", "Чис", "Втор", "Нав", "Суд", "Рут", "Цар", "Пар",
    "Езд", "Неем", "Ест", "Йов", "Пс", "Прип", "Еккл", "Пісн", "Іс", "Єр",
    "Плач", "Єз", "Дан", "Ос", "Йоїл", "Ам", "Овд", "Йон", "Мих", "Наум",
    "Авв", "Соф", "Ог", "Зах", "Мал"
];

// Helper to match book with boundary
function getBookRegex() {
    const options = BIBLE_BOOKS.join("|");
    return new RegExp(`(?:^|[^\\p{L}])(${options})(?=[^\\p{L}]|$)`, "iu");
}

function isReadingLine(line: string): boolean {
    const trimmed = line.trim();

    const prefixPattern = new RegExp(`^(${READING_PREFIXES.join("|")})[а-я0-9]*[.:]`, "i");
    const hasPrefix = prefixPattern.test(trimmed);

    const isMatins = /^Ран\s*[.–-]/.test(trimmed);

    const bookRegex = getBookRegex();
    const implicitBookMatch = trimmed.match(new RegExp(`^(${BIBLE_BOOKS.join("|")})(?=[^\\p{L}]|$)`, "iu"));

    const looksLikeReading = /(\d+)|(зач)|(mid\.)/.test(trimmed);

    if (implicitBookMatch && looksLikeReading) return true;

    if (hasPrefix || isMatins) {
        const hasBook = bookRegex.test(trimmed);
        const hasZach = /зач/i.test(trimmed);
        const hasGospelNum = /Єв\.\s*\d/i.test(trimmed);
        if (hasBook || hasZach || hasGospelNum) return true;

        if (implicitBookMatch) return true;
        return false;
    }

    return false;
}

function tokenize(text: string): string[] {
    return text.toLowerCase().match(/\p{L}{4,}/gu) || [];
}

// Token Index for fast lookup
class SaintMatcher {
    private index: Map<string, SaintEntry[]> = new Map();
    private allSaints: SaintEntry[];

    constructor(saints: SaintEntry[]) {
        this.allSaints = saints;
        saints.forEach(s => {
            const tokens = tokenize(s.name);
            tokens.forEach(t => {
                if (t.length < 3) return;
                if (!this.index.has(t)) this.index.set(t, []);
                this.index.get(t)?.push(s);
            });
        });
    }

    findMatch(text: string, referenceDate: Date): string | null {
        const textLower = text.toLowerCase();

        if (/перенесення мощів.+миколая/i.test(text)) return "05-09";
        if (/ісидора/i.test(text) && /хіоського/i.test(text)) return "05-14";
        if (/ісидора/i.test(text) && /251/i.test(text)) return "05-14";

        if (/пахомія/i.test(text) && /великого/i.test(text)) {
            return "05-15";
        }

        if (/федора освяченого/i.test(text)) return "05-16";

        if (/глікерії/i.test(text) || /гликєрії/i.test(text)) return "05-13";

        if (/самарянку/i.test(text) && !/післясвято/i.test(text)) return "nday:28";

        if (/сліпого/i.test(text) && !/післясвято/i.test(text)) return "nday:35";

        if (/отців.+вселенського.+собору/i.test(text) && /7-ма неділя/i.test(text)) return "nday:42";
        if (/вознесіння/i.test(text) && !/віддання/i.test(text) && !/післясвято/i.test(text)) return "nday:39";

        if (/переполовення/i.test(text)) {
            if (/віддання/i.test(text)) return "nday:31";
            if (!/свята/i.test(text) || text.length < 100) return "nday:24";
        }

        if (/п'?ятдесятниця/i.test(text) && !/віддання/i.test(text) && !/тиждень/i.test(text) && !/троїцька субота/i.test(text)) {
            if (/день святої тройці/i.test(text)) return "nday:49";
        }
        if (/день святого духа/i.test(text)) return "nday:50";
        if (/всіх святих/i.test(text) && /1-ша неділя/i.test(text)) return "nday:56";
        if (/всіх святих землі української/i.test(text)) return "nday:63";

        const textTokens = tokenize(text);
        if (textTokens.length === 0) return null;

        const candidates = new Map<SaintEntry, number>();
        textTokens.forEach(t => {
            if (t.length < 3) return;
            const matches = this.index.get(t);
            if (matches) {
                matches.forEach(m => {
                    candidates.set(m, (candidates.get(m) || 0) + 1);
                });
            }
        });

        if (candidates.size === 0) return null;

        let bestSaint: SaintEntry | null = null;
        let bestScore = 0;

        for (const [saint, matchCount] of candidates.entries()) {
            const saintTokens = tokenize(saint.name);
            const score = matchCount / (textTokens.length + saintTokens.length - matchCount);

            if (score > bestScore) {
                bestScore = score;
                bestSaint = saint;
            }
        }

        if (bestScore > 0.05 && bestSaint && bestSaint.dates.length > 0) {
            let bestDateStr = bestSaint.dates[0];
            let minDiff = Infinity;

            const currentMs = referenceDate.getTime();

            for (const dStr of bestSaint.dates) {
                let [m, d] = dStr.split('-').map(Number);
                let date = new Date(2026, m - 1, d);

                let diff = date.getTime() - currentMs;

                if (diff < -2 * 24 * 3600 * 1000) {
                    diff += 365 * 24 * 3600 * 1000;
                }

                if (diff < minDiff && diff > -172800000) {
                    minDiff = diff;
                    bestDateStr = dStr;
                }
            }

            return bestDateStr;
        }

        return null;
    }
}

// Reading Parsing
function isGospel(text: string): boolean {
    return /^(Мф|Мк|Лк|Ін)\.?/i.test(text);
}

function isValidReading(text: string): boolean {
    const hasDigit = /\d/.test(text);
    const hasBook = /^(Мф|Мк|Лк|Ін|Діян|Рим|Кор|Гал|Еф|Флп|Кол|Сол|Тим|Тит|Флм|Євр|Як|Пет|Іоан|Юд|Одкр|Бут|Вих|Лев|Чис|Втор|Іс|Єр|Єз|Дан|Ос|Іоїл|Ам|Овд|Іон|Мих|Наум|Авв|Соф|Аг|Зах|Мал|Притч|Еккл|Пісн|Прем|Сир|Іов)\.?/i.test(text.replace(/^\d\s+/, ""));
    const hasZach = /зач/i.test(text);

    return hasDigit && (hasBook || hasZach);
}

function splitReadings(text: string): string[] {
    const books = ["Мф", "Мк", "Лк", "Ін", "Діян", "Рим", "Кор", "Гал", "Еф", "Флп", "Кол", "Сол", "Тим", "Тит", "Флм", "Євр", "Як", "Пет", "Іоан", "Юд", "Одкр", "Бут", "Вих", "Лев", "Чис", "Втор", "Іс", "Єр", "Єз", "Дан", "Ос", "Іоїл", "Ам", "Овд", "Іон", "Мих", "Наум", "Авв", "Соф", "Аг", "Зах", "Мал", "Притч", "Еккл", "Пісн", "Прем", "Сир", "Іов"];
    const parts: string[] = [];

    const tokens = text.split(" ");
    let startIndex = 0;

    const isBookToken = (t: string, nextT?: string) => {
        if (books.some(b => t.startsWith(b))) return true;
        if (/^\d$/.test(t) && nextT && books.some(b => nextT.startsWith(b))) return true;
        return false;
    };

    for (let i = 0; i < tokens.length; i++) {
        if (isBookToken(tokens[i], tokens[i + 1])) {
            startIndex = i;
            break;
        }
    }

    const relevantTokens = tokens.slice(startIndex);
    let buffer = "";

    for (let i = 0; i < relevantTokens.length; i++) {
        const t = relevantTokens[i];

        if (buffer && isBookToken(t, relevantTokens[i + 1])) {
            if (isValidReading(buffer)) {
                parts.push(buffer.trim());
                buffer = "";
            }
        }
        buffer += t + " ";
    }
    if (buffer.trim()) parts.push(buffer.trim());

    return parts.filter(p => isValidReading(p));
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
            let content = match[2].trim();

            if (BIBLE_BOOKS.some(b => b === label || b === label.replace("І", "I"))) {
                content = label + ". " + content;
                label = "Літ.";
            }

            if (label.startsWith("Ран")) {
                if (isValidReading(content)) {
                    matins.push({ reading: content, label: "Ран." });
                }
            } else {
                const parts = splitReadings(content);
                parts.forEach(p => {
                    if (isGospel(p)) liturgyGosp.push({ reading: p, label: label });
                    else liturgyAp.push({ reading: p, label: label });
                });
            }
        } else {
            const parts = splitReadings(clean);
            parts.forEach(p => {
                if (isGospel(p)) liturgyGosp.push({ reading: p, label: "Літ." });
                else liturgyAp.push({ reading: p, label: "Літ." });
            });
        }
    });

    return { matins, liturgy: { apostle: liturgyAp, gospel: liturgyGosp } };
}

// --- Main ---
const MONTHS_UA = ["СІЧЕНЬ", "ЛЮТИЙ", "БЕРЕЗЕНЬ", "КВІТЕНЬ", "ТРАВЕНЬ", "ЧЕРВЕНЬ", "ЛИПЕНЬ", "СЕРПЕНЬ", "ВЕРЕСЕНЬ", "ЖОВТЕНЬ", "ЛИСТОПАД", "ГРУДЕНЬ"];

function extractDateFromLine(line: string): number | null {
    if (line.length > 80) return null;

    let clean = line.replace(/^[#> \t]+/, "")
        .replace(/\\section\*\{/, "")
        .replace(/<br>/g, " ")
        .trim();

    const match = clean.match(/^(\d+)\b/);
    if (match) {
        const d = parseInt(match[1]);
        if (d >= 1 && d <= 31) return d;
    }
    return null;
}

function extractMonthFromLine(line: string): number | null {
    const clean = line.replace(/[#> \t]+/g, "").trim().toUpperCase();
    for (let i = 0; i < MONTHS_UA.length; i++) {
        if (clean.includes(MONTHS_UA[i])) return i;
    }
    return null;
}

function main() {
    console.log("Loading Saints Index...");
    const saintsRaw = fs.readFileSync(SAINTS_INDEX, 'utf-8');
    const saintsIndex: SaintEntry[] = JSON.parse(saintsRaw);
    const matcher = new SaintMatcher(saintsIndex);

    console.log("Reading Calendar Text...");
    const content = fs.readFileSync(INPUT_FILE, 'utf-8');
    const lines = content.split('\n');

    const rules: TypikonRule[] = [];

    let referenceDate = new Date(2026, 0, 1);
    let currentMonth = 0;
    let lastDateKey: string | null = null;
    let explicitDateKey: string | null = "01-01";

    let currentTextBuffer: string[] = [];
    let currentReadingBuffer: string[] = [];

    const processBlock = () => {
        if (currentTextBuffer.length === 0 && currentReadingBuffer.length === 0) return;

        const fullText = currentTextBuffer.join(" ").trim();
        let dateKey = matcher.findMatch(fullText, referenceDate);

        if (!dateKey && explicitDateKey) {
            dateKey = explicitDateKey;
        }

        if (dateKey) {
            lastDateKey = dateKey;

            if (!dateKey.startsWith("nday:")) {
                const [m, d] = dateKey.split('-').map(Number);
            }

        } else if (lastDateKey && currentReadingBuffer.length > 0) {
            dateKey = lastDateKey;
        }

        if (dateKey && (currentReadingBuffer.length > 0 || currentTextBuffer.length > 0)) {
            const { matins, liturgy } = parseReadingsBlock(currentReadingBuffer);
            const titleText = cleanTitle(fullText);

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

            if (!titleText && !matins.length && !liturgy.apostle.length && !liturgy.gospel.length) {
                // skip empty rules
            } else {
                const existing = rules.find(r => r.id === id);
                if (existing && existing.data && existing.data.liturgy) {
                    if (matins.length) existing.data.matins = [...(existing.data.matins || []), ...matins];
                    if (liturgy.apostle.length) existing.data.liturgy.apostle = [...(existing.data.liturgy.apostle || []), ...liturgy.apostle];
                    if (liturgy.gospel.length) existing.data.liturgy.gospel = [...(existing.data.liturgy.gospel || []), ...liturgy.gospel];

                    if (titleText && existing.data.title && !existing.data.title.includes(titleText.substring(0, 20))) {
                        existing.data.title += " | " + titleText;
                    } else if (titleText && !existing.data.title) {
                        existing.data.title = titleText;
                    }
                } else {
                    rules.push({
                        id, triggers, action: "REPLACE_LITURGY",
                        data: { title: titleText || "", liturgy, matins: matins.length ? matins : undefined }
                    });
                }
            }
        }

        currentTextBuffer = [];
        currentReadingBuffer = [];
    };

    console.log("Parsing lines...");
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line || line.startsWith("---")) continue;

        const mIdx = extractMonthFromLine(line);
        if (mIdx !== null) {
            currentMonth = mIdx;
            referenceDate = new Date(2026, currentMonth, 1);
            console.log(`Detected Month Index: ${currentMonth} (${MONTHS_UA[currentMonth]})`);
            continue;
        }

        const d = extractDateFromLine(line);
        const isReading = isReadingLine(line);

        if (d !== null && !isReading) {
            if (referenceDate.getDate() > 20 && d < 5) {
                currentMonth++;
                console.log(`Auto-incrementing month to ${currentMonth + 1} (rollover ${referenceDate.getDate()} -> ${d})`);
            }

            processBlock();

            referenceDate = new Date(2026, currentMonth, d);
            const mStr = (currentMonth + 1).toString().padStart(2, '0');
            const dStr = d.toString().padStart(2, '0');
            explicitDateKey = `${mStr}-${dStr}`;

            continue;
        }

        if (/^(понеділок|вівторок|середа|четвер|п\'ятниця|субота|неділя)$/i.test(line)) continue;

        if (isReading) {
            currentReadingBuffer.push(line);
        } else {
            if (currentReadingBuffer.length > 0) {
                if (/^(Мф|Мк|Лк|Ін|Діян|Рим|Кор|Гал|Євр|Як)\.?\s*,/.test(line)) {
                    currentReadingBuffer.push(line);
                } else {
                    processBlock();
                    currentTextBuffer.push(line);
                }
            } else {
                currentTextBuffer.push(line);
            }
        }
    }
    processBlock();

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(rules, null, 2));
    console.log(`Generated ${rules.length} rules.`);
}

main();
