import * as fs from 'fs';
import * as path from 'path';

const OCU_RULES_PATH = './src/calendar_v2/data/OCU_RULES.json';

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
            apostle?: Array<{ reading: string; label: string }>;
            gospel?: Array<{ reading: string; label: string }>;
        };
        matins?: Array<{ reading: string; label: string }>;
        isInformational?: boolean;
    };
}

// Load current rules
const rules: TypikonRule[] = JSON.parse(fs.readFileSync(OCU_RULES_PATH, 'utf8'));

console.log(`📖 Loaded ${rules.length} rules\n`);

// ============================================================================
// TASK 2: ADD MISSING CRITICAL FEASTS
// ============================================================================

const hasPascha = rules.some(r => r.triggers.nday?.includes(0));
const hasPentecost = rules.some(r => r.triggers.nday?.includes(49));

if (!hasPascha) {
    console.log('✅ Adding Pascha (nday:0)');
    rules.unshift({
        id: 'nday-0',
        triggers: { nday: [0] },
        action: 'REPLACE_LITURGY',
        data: {
            title: 'СВІТЛЕ ХРИСТОВЕ ВОСКРЕСІННЯ. ПАСХА.',
            liturgy: {
                apostle: [
                    { reading: 'Діян., 1 зач.; І, 1-8.', label: 'Літ.' }
                ],
                gospel: [
                    { reading: 'Ін., 1 зач.; І, 1-17.', label: 'Літ.' }
                ]
            },
            matins: [
                { reading: 'Мк., 70 зач.; ХVІ, 1-8.', label: 'Раннє Євангеліє' }
            ]
        }
    });
}

if (!hasPentecost) {
    console.log('✅ Adding Pentecost (nday:49)');
    const pentecostIndex = rules.findIndex(r => r.triggers.nday && r.triggers.nday[0] > 49);
    const insertIndex = pentecostIndex === -1 ? rules.length : pentecostIndex;

    rules.splice(insertIndex, 0, {
        id: 'nday-49',
        triggers: { nday: [49] },
        action: 'REPLACE_LITURGY',
        data: {
            title: "ДЕНЬ СВЯТОЇ ТРОЙЦІ. П'ЯТДЕСЯТНИЦЯ.",
            liturgy: {
                apostle: [
                    { reading: 'Діян., 3 зач.; ІІ, 1-11.', label: 'Літ.' }
                ],
                gospel: [
                    { reading: 'Ін., 27 зач.; VІІ, 37-52; VІІІ, 12.', label: 'Літ.' }
                ]
            },
            matins: [
                { reading: 'Ін., 65 зач.; ХХ, 19-31.', label: 'Раннє Євангеліє' }
            ]
        }
    });
}

// ============================================================================
// TASK 3: FIX EMPTY TITLES & TAG INFORMATIONAL RULES
// ============================================================================

const TITLE_FIXES: Record<string, string> = {
    '01-06': 'Богоявлення Господнє. Хрещення Господа нашого Ісуса Христа.',
    '01-07': 'Собор святого Іоанна Хрестителя.',
    '12-25': 'Різдво Христове.',
};

rules.forEach(rule => {
    // Fix empty titles
    if (!rule.data.title || rule.data.title.trim() === '') {
        const mmdd = rule.triggers.mmdd?.[0];
        if (mmdd && TITLE_FIXES[mmdd]) {
            console.log(`🔧 Fixed empty title for ${rule.id}: ${TITLE_FIXES[mmdd]}`);
            rule.data.title = TITLE_FIXES[mmdd];
        } else {
            console.warn(`⚠️  Empty title for ${rule.id} - no fix available`);
        }
    }

    // Tag informational rules (no readings)
    const hasApostle = rule.data.liturgy?.apostle && rule.data.liturgy.apostle.length > 0;
    const hasGospel = rule.data.liturgy?.gospel && rule.data.liturgy.gospel.length > 0;
    const hasMatins = rule.data.matins && rule.data.matins.length > 0;

    if (!hasApostle && !hasGospel && !hasMatins) {
        rule.data.isInformational = true;
    }
});

// Count informational rules
const informationalCount = rules.filter(r => r.data.isInformational).length;
console.log(`\n📝 Tagged ${informationalCount} informational rules\n`);

// ============================================================================
// SAVE UPDATED RULES
// ============================================================================

fs.writeFileSync(OCU_RULES_PATH, JSON.stringify(rules, null, 2), 'utf8');

console.log('✅ OCU_RULES.json updated successfully!');
console.log(`   Total rules: ${rules.length}`);
console.log(`   Informational: ${informationalCount}`);
console.log(`   Has Pascha: ${rules.some(r => r.triggers.nday?.includes(0))}`);
console.log(`   Has Pentecost: ${rules.some(r => r.triggers.nday?.includes(49))}`);
