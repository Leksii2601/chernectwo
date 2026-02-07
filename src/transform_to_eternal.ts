import * as fs from 'fs';
import * as path from 'path';

/**
 * Liturgical Data Transformer: Static to Dynamic Logic
 * Converts 2026-specific calendar rules to eternal triggers (nday/mmdd)
 */

const INPUT_FILE = './src/calendar_v2/data/parsed_rules_final.json';
const OUTPUT_FILE = './src/calendar_v2/data/OCU_RULES.json';
const PASCHA_2026 = new Date(2026, 3, 12); // April 12, 2026

interface ReadingItem {
    reading: string;
    label: string;
}

interface TypikonRule {
    id: string;
    triggers: {
        mmdd?: string[];
        nday?: number[];
        year?: number[];
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

// Movable feast keywords (Paschal cycle)
const MOVABLE_KEYWORDS = [
    // Sundays and weeks
    'неділя', 'тиждень',
    // Great Lent
    'великого посту', 'хрестопоклонна', 'м\'ясопусна', 'сиропусна',
    // Holy Week
    'великий четвер', 'великий п\'ятниця', 'велика субота', 'великодня',
    // Paschal period
    'пасх', 'світлий', 'фомина', 'мироносиць', 'розслабленого', 'самарянку', 'сліпого',
    // Ascension cycle
    'переполовення', 'вознесіння', 'п\'ятдесятниця', 'тройці', 'духа',
    // Post-Pentecost
    'всіх святих землі української',
    // Soul Saturdays
    'поминання померлих', 'заупокійна субота', 'троїцька субота',
    // Specific movable feasts
    'віддання', 'післясвято'
];

// Manual overrides for specific dates
const TITLE_OVERRIDES: { [key: string]: string } = {
    '2026-01-01': 'ОБРІЗАННЯ ГОСПОДНЄ. Свт. Василія Великого, архієп. Кесарії Каппадокійської (379).',
};

function isMovableFeast(title: string, id: string): boolean {
    const titleLower = title.toLowerCase();

    // Check if already has nday in ID
    if (id.includes('nday')) return true;

    // Check for movable keywords
    return MOVABLE_KEYWORDS.some(keyword => titleLower.includes(keyword));
}

function calculateNday(mmdd: string): number {
    const [month, day] = mmdd.split('-').map(Number);
    const date = new Date(2026, month - 1, day);
    const diffMs = date.getTime() - PASCHA_2026.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
}

function cleanTitle(title: string): string {
    let cleaned = title;

    // Remove residual OCR artifacts
    cleaned = cleaned.replace(/!\[.*?\]\(https?:\/\/[^\)]+\)/g, '');
    cleaned = cleaned.replace(/<[^>]+>/g, ' ');
    cleaned = cleaned.replace(/\\section\*\{[^}]*\}/g, '');
    cleaned = cleaned.replace(/\\[a-z]+\{[^}]*\}/g, '');
    cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');
    cleaned = cleaned.replace(/https?:\/\/[^\s]+/g, '');

    // Remove OCR noise like "GIYEH5"
    cleaned = cleaned.replace(/^[A-Z]{3,}\d+\s*/g, '');

    // Normalize whitespace
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    // Remove trailing " |" artifacts from concatenation
    cleaned = cleaned.replace(/\s*\|\s*$/, '');

    return cleaned;
}

function validateReadings(rule: TypikonRule): boolean {
    const hasApostle = !!(rule.data.liturgy?.apostle && rule.data.liturgy.apostle.length > 0);
    const hasGospel = !!(rule.data.liturgy?.gospel && rule.data.liturgy.gospel.length > 0);
    const hasMatins = !!(rule.data.matins && rule.data.matins.length > 0);

    return hasApostle || hasGospel || hasMatins;
}

function transformRule(rule: TypikonRule): TypikonRule | null {
    // Apply manual title overrides
    if (TITLE_OVERRIDES[rule.id]) {
        rule.data.title = TITLE_OVERRIDES[rule.id];
    }

    // Clean the title
    rule.data.title = cleanTitle(rule.data.title);

    // Skip if title is empty and no readings
    if (!rule.data.title && !validateReadings(rule)) {
        console.log(`⚠️  Skipping empty rule: ${rule.id}`);
        return null;
    }

    // Determine if movable or fixed feast
    const isMovable = isMovableFeast(rule.data.title, rule.id);

    if (isMovable) {
        // Convert to nday trigger
        if (rule.id.includes('nday')) {
            // Already has nday, keep it
            delete rule.triggers.mmdd;
            delete rule.triggers.year;
        } else if (rule.triggers.mmdd && rule.triggers.mmdd[0]) {
            // Calculate nday from mmdd
            const nday = calculateNday(rule.triggers.mmdd[0]);
            rule.triggers.nday = [nday];
            delete rule.triggers.mmdd;
            delete rule.triggers.year;

            // Update ID to reflect nday
            rule.id = `nday-${nday}`;
        }
    } else {
        // Fixed feast - keep mmdd, remove year
        delete rule.triggers.nday;
        delete rule.triggers.year;

        // Ensure ID matches mmdd format
        if (rule.triggers.mmdd && rule.triggers.mmdd[0]) {
            rule.id = rule.triggers.mmdd[0];
        }
    }

    return rule;
}

function main() {
    console.log('🔄 Liturgical Data Transformer: Static → Dynamic');
    console.log('================================================\n');

    // Read input
    const inputData = fs.readFileSync(INPUT_FILE, 'utf-8');
    const rules: TypikonRule[] = JSON.parse(inputData);

    console.log(`📖 Loaded ${rules.length} rules from parsed_rules_final.json\n`);

    // Transform
    const transformed: TypikonRule[] = [];
    let ndayCount = 0;
    let mmddCount = 0;
    let skippedCount = 0;

    rules.forEach(rule => {
        const result = transformRule(rule);

        if (result) {
            transformed.push(result);

            if (result.triggers.nday) {
                ndayCount++;
            } else if (result.triggers.mmdd) {
                mmddCount++;
            }
        } else {
            skippedCount++;
        }
    });

    // Sort: nday first (ascending), then mmdd (ascending)
    transformed.sort((a, b) => {
        if (a.triggers.nday && b.triggers.nday) {
            return a.triggers.nday[0] - b.triggers.nday[0];
        }
        if (a.triggers.nday) return -1;
        if (b.triggers.nday) return 1;

        if (a.triggers.mmdd && b.triggers.mmdd) {
            return a.triggers.mmdd[0].localeCompare(b.triggers.mmdd[0]);
        }

        return 0;
    });

    // Write output
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(transformed, null, 2));

    // Summary
    console.log('✅ Transformation Complete!\n');
    console.log('Summary:');
    console.log(`  📅 Movable feasts (nday):  ${ndayCount}`);
    console.log(`  📖 Fixed feasts (mmdd):    ${mmddCount}`);
    console.log(`  🗑️  Skipped (empty):        ${skippedCount}`);
    console.log(`  📊 Total output rules:     ${transformed.length}\n`);
    console.log(`💾 Written to: ${OUTPUT_FILE}`);
}

main();
