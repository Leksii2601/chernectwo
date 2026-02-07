import { DetailedReading } from '../LiturgicalTypes';

/**
 * Reading Formatter
 * Standardizes reading format to: [Book] [Pericope] зач.; [Verses]
 * Example: "Євр. 318 зач.; 7:26-8:2"
 */

export interface ParsedReading {
    book: string;
    pericope?: string;
    verses?: string;
}

/**
 * Parses a raw reading string into components
 * Handles formats like:
 * - "Євр._7:26-8:2_(зач._318)"
 * - "Євр. 318 зач.; 7:26-8:2"
 * - "2 Тим._4:5-8"
 */
export function parseReading(raw: string): ParsedReading {
    // 1. Initial cleanup and localization
    // We remove "; " and underscores to prevent issues if normalizeReading is called multiple times
    let text = raw.replace(/; /g, ' ')
        .replace(/_/g, ' ')
        .replace(/\(mid\.\)/g, '(від пол.)')
        .trim();

    // 2. Extract Pericope (зач. X or X зач. or (зач. X))
    // Supports multiples like "115; 213"
    let pericope: string | undefined;

    // Pattern matches either "зач. 123" or "123 зач." or "(зач. 123)"
    const pericopeRegex = /(?:\(?зач\.|зачало)\s*([\d\s;]+(?:\s*\(від пол\.\))?)\)?|([\d\s;]+(?:\s*\(від пол\.\))?)\s*(?:зач\.|зачало)/i;
    const pMatch = text.match(pericopeRegex);

    if (pMatch) {
        pericope = (pMatch[1] || pMatch[2]).trim();
        text = text.replace(pMatch[0], ' '); // Remove pericope from text
    }

    // 3. Extract Book Name
    // Pattern: everything from start until we hit a digit followed by colon (verse start)
    // We allow optional leading digit for books like "1 Кор"
    let bookMatch = text.match(/^((?:\d+\s+)?[^\d:]+?)(?=\s*\d+:)/i);
    let book = '';

    if (bookMatch) {
        book = bookMatch[1].trim();
        text = text.replace(bookMatch[0], ' ');
    } else {
        // Fallback: If no verse pattern, maybe the whole thing is just a book name
        const altBookMatch = text.match(/^[^,;.:]+/);
        if (altBookMatch) {
            book = altBookMatch[0].trim();
            text = text.replace(altBookMatch[0], ' ');
        }
    }

    // 4. Verses - The remainder
    // Strip verse suffixes like 'a', 'b' (e.g., 13:11b -> 13:11)
    let verses = text.replace(/(\d+)[a-z]\b/g, '$1');

    // Final cleanup of punctuation and extra spaces
    verses = verses.replace(/^[\s,;.:]+/, '').replace(/[\s,;.:]+$/, '').trim();

    return { book, pericope, verses };
}

/**
 * Formats a reading into standard format
 */
export function formatReading(parsed: ParsedReading): string {
    const parts: string[] = [];

    if (parsed.book) {
        parts.push(parsed.book);
    }

    if (parsed.pericope) {
        parts.push(`${parsed.pericope} зач.`);
    }

    if (parsed.verses) {
        parts.push(parsed.verses);
    }

    return parts.join('; ').replace(/\s+\(\)$/g, "").trim();
}


/**
 * Normalizes a reading string to standard format
 * Returns original text if parsing fails (no book name found)
 */
export function normalizeReading(raw: string): string {
    const parsed = parseReading(raw);

    // If no book name was found, return original text (parsing failed)
    if (!parsed.book) {
        return raw.replace(/_/g, ' ').trim();
    }

    return formatReading(parsed);
}

/**
 * Deduplicates an array of DetailedReading objects
 * Compares normalized reading strings
 */
export function deduplicateReadings(readings: DetailedReading[]): DetailedReading[] {
    const seen = new Set<string>();
    const result: DetailedReading[] = [];

    for (const r of readings) {
        const normalized = normalizeReading(r.reading);

        if (!seen.has(normalized)) {
            seen.add(normalized);
            result.push({
                ...r,
                reading: normalized // Replace with normalized version
            });
        }
    }

    return result;
}

/**
 * Checks if two readings are semantically identical
 */
export function areReadingsEqual(a: string, b: string): boolean {
    return normalizeReading(a) === normalizeReading(b);
}
