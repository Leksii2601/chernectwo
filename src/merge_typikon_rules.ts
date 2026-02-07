/**
 * Merge OCU_2026_RULES into OCU_RULES.json
 * 
 * Converts the detailed 2026 Typikon rules into the eternal format
 * and merges them with existing rules.
 */

import * as fs from 'fs';
import * as path from 'path';

// Import existing rules
const OCU_RULES_PATH = path.join(__dirname, 'calendar_v2', 'data', 'OCU_RULES.json');
const existingRules = JSON.parse(fs.readFileSync(OCU_RULES_PATH, 'utf-8'));

// OCU_2026 Typikon Rules (from user)
const FUNERAL_AP = "1 Сол., 270 зач., 4:13-17";
const FUNERAL_EV = "Ін., 16 зач., 5:24-30";

const OCU_2026_RULES: any[] = [
    // --- JANUARY FIXES ---

    // Jan 01 (Circumcision / Basil / Prp)
    {
        id: "Jan 01 PCU Correction",
        triggers: { mmdd: ["01-01"] },
        action: 'REPLACE_VESPERS',
        data: { title: "Обрізання Господнє (Remove Vespers)", vespers: [], isInformational: true }
    },
    {
        id: "Jan 01 Liturgy",
        triggers: { mmdd: ["01-01"] },
        action: 'REPLACE_LITURGY',
        priority: 9,
        data: {
            title: "ОБРІЗАННЯ ГОСПОДНЄ. Свт. Василія Великого, архієп. Кесарії Каппадокійської (379).",
            matins: [{ reading: "Ін., 35 зач. (від половини), 10:1-9", label: "Ран.", type: 'gospel' }],
            liturgy: {
                apostle: [
                    { reading: "Кол., 254 зач., 2:8-12", label: "Свята" },
                    { reading: "Єр., 318 зач., 7:26-8:2", label: "Свт." },
                    { reading: "Гал., 213 зач., 5:22-6:2", label: "Прп." }
                ],
                gospel: [
                    { reading: "Лк., 6 зач., 2:20-21, 40-52", label: "Свята" },
                    { reading: "Ін., 36 зач., 10:9-16", label: "Свт." },
                    { reading: "Лк., 24 зач., 6:17-23", label: "Прп." }
                ]
            }
        }
    },

    // Jan 02
    {
        id: "01-02",
        triggers: { mmdd: ["01-02"] },
        action: 'REPLACE_LITURGY',
        priority: 7,
        data: {
            title: "Передсвяття Богоявлення. Прп. Сильвестра, папи Римського (335). Перенесення (1148) мощей блгв. кн. Ігоря Чернігівського (1147).",
            liturgy: {
                apostle: [
                    { reading: "Євр., 326 зач., 10:35-11:7", label: "Ряд. (за чт.)" },
                    { reading: "Євр., 327 зач., 11:8, 11-16", label: "Ряд." },
                    { reading: "Євр., 318 зач., 7:26-8:2", label: "Свт." }
                ],
                gospel: [
                    { reading: "Мк., 39 зач., 9:10-16", label: "Ряд. (за чт.)" },
                    { reading: "Мк., 41 зач., 9:33-41", label: "Ряд." },
                    { reading: "Ін., 8 зач., 3:1-15", label: "Свт." }
                ]
            }
        }
    },

    // Jan 03
    {
        id: "01-03",
        triggers: { mmdd: ["01-03"] },
        action: 'REPLACE_LITURGY',
        priority: 8,
        data: {
            title: "Субота перед Богоявленням. Прор. Малахії (400 р. до Р.Х.). Мч. Гордія (IV).",
            liturgy: {
                apostle: [
                    { reading: "1 Тим., 284 зач., 3:14-4:5", label: "Суботи перед Богоявленням" },
                    { reading: "2 Тим., 292 зач., 2:1-10", label: "Св." }
                ],
                gospel: [
                    { reading: "Мф., 5 зач., 3:1-11", label: "Суботи перед Богоявленням" },
                    { reading: "Мф., 36 зач., 10:16-22", label: "Св." }
                ]
            }
        }
    },

    // Jan 04
    {
        id: "01-04",
        triggers: { mmdd: ["01-04"] },
        action: 'REPLACE_LITURGY',
        priority: 8,
        data: {
            title: "Неділя перед Богоявленням. Собор 70-ти апостолів.",
            liturgy: {
                apostle: [
                    { reading: "2 Тим., 298 зач., 4:5-8", label: "Неділі перед Богоявленням" },
                    { reading: "Рим., 96 зач. (від пол.), 8:3-9", label: "Апостолів" }
                ],
                gospel: [
                    { reading: "Мк., 1 зач., 1:1-8", label: "Неділі перед Богоявленням" },
                    { reading: "Лк., 50 зач., 10:1-15", label: "Апостолів" }
                ]
            }
        }
    },

    // Jan 05
    {
        id: "01-05-hours",
        triggers: { mmdd: ["01-05"] },
        action: 'REPLACE_HOURS',
        priority: 10,
        data: {
            title: "Навечір'я Богоявлення (Царські Години)",
            hours: {
                "1-й час": [{ reading: "Діян. 33 зач., 13:25-32" }, { reading: "Мф. 5 зач., 3:1-11" }],
                "3-й час": [{ reading: "Діян. 42 зач., 19:1-8" }, { reading: "Мк. 1 зач., 1:1-8" }],
                "6-й час": [{ reading: "Рим. 91 зач., 6:3-11" }, { reading: "Мк. 2 зач., 1:9-15" }],
                "9-й час": [{ reading: "Тит. 302 зач., 2:11-14, 3:4-7" }, { reading: "Мф. 6 зач., 3:13-17" }]
            },
            isInformational: true
        }
    },
    {
        id: "01-05",
        triggers: { mmdd: ["01-05"] },
        action: 'REPLACE_LITURGY',
        priority: 10,
        data: {
            title: "Навечір'я Богоявлення. Освячення води.",
            liturgy: {
                apostle: [
                    { reading: "1 Кор., 143 зач., 9:19-27", label: "Літ." },
                    { reading: "1 Кор., 143 зач. (від пол.), 10:1-4", label: "Осв. води" }
                ],
                gospel: [
                    { reading: "Лк., 9 зач., 3:1-18", label: "Літ." },
                    { reading: "Мк., 2 зач., 1:9-11", label: "Осв. води" }
                ]
            }
        }
    },

    // Jan 06
    {
        id: "01-06",
        triggers: { mmdd: ["01-06"] },
        action: 'REPLACE_LITURGY',
        priority: 10,
        data: {
            title: "СВЯТЕ БОГОЯВЛЕННЯ. ХРЕЩЕННЯ ГОСПОДА БОГА І СПАСА НАШОГО ІСУСА ХРИСТА.",
            matins: [{ reading: "Мк., 2 зач., 1:9-11", label: "Ран.", type: 'gospel' }],
            liturgy: {
                apostle: [
                    { reading: "Тит., 302 зач., 2:11-14, 3:4-7", label: "Свята" },
                    { reading: "1 Кор., 143 зач. (від пол.), 10:1-4", label: "Осв. води" }
                ],
                gospel: [
                    { reading: "Мф., 6 зач., 3:13-17", label: "Свята" },
                    { reading: "Мк., 2 зач., 1:9-11", label: "Осв. води" }
                ]
            }
        }
    },

    // Jan 07
    {
        id: "01-07",
        triggers: { mmdd: ["01-07"] },
        action: 'REPLACE_LITURGY',
        priority: 8,
        data: {
            title: "Собор Предтечі і Хрестителя Господнього Іоанна.",
            liturgy: {
                apostle: [
                    { reading: "Як., 50 зач., 1:1-18", label: "Ряд. (Суб. п. Різдві)" },
                    { reading: "Діян., 42 зач., 19:1-8", label: "Св." }
                ],
                gospel: [
                    { reading: "Мк., 44 зач., 10:11-16", label: "Ряд. (Суб. п. Різдві)" },
                    { reading: "Ін., 3 зач., 1:29-34", label: "Св." }
                ]
            }
        }
    },

    // Continue with remaining dates...
    // Adding key dates from OCU_2026_RULES

    // Feb 02
    {
        id: "02-02",
        triggers: { mmdd: ["02-02"] },
        action: 'SUPPRESS_ORDINARY',
        priority: 10,
        data: {
            title: "СТРІТЕННЯ ГОСПОДА НАШОГО ІСУСА ХРИСТА.",
            isInformational: false
        }
    },

    // Feb 07 (Luke's Jump)
    {
        id: "02-07",
        triggers: { mmdd: ["02-07"] },
        action: 'REPLACE_LITURGY',
        priority: 6,
        data: {
            title: "Субота перед неділею про блудного сина. Лукина перестубка (34 тиж.).",
            liturgy: {
                apostle: [{ reading: "2 Тим., 295 зач., 3:1-9", label: "Ряд. (34 тиж.)" }],
                gospel: [{ reading: "Лк., 103 зач., 20:46-21:4", label: "Ряд. (34 тиж.)" }]
            }
        }
    },

    // Feb 08
    {
        id: "02-08",
        triggers: { mmdd: ["02-08"] },
        action: 'APPEND_LITURGY',
        priority: 7,
        data: {
            title: "Вмч. Феодора Стратилата (319).",
            liturgy: {
                apostle: [{ reading: "2 Тим., 292 зач., 2:1-10", label: "Вмч." }],
                gospel: [{ reading: "Мф., 36 зач., 10:16-22", label: "Вмч." }]
            }
        }
    },

    // Soul Saturdays (nday triggers)
    {
        id: "nday--57",
        triggers: { nday: [-57] },
        action: 'REPLACE_LITURGY',
        priority: 9,
        data: {
            title: "М'ясопусна субота. Заупокійна.",
            liturgy: {
                apostle: [
                    { reading: "1 Кор., 146 зач., 10:23-28", label: "Ряд." },
                    { reading: FUNERAL_AP, label: "Заупокій" }
                ],
                gospel: [
                    { reading: "Лк., 105 зач., 21:8-9, 25-27, 33-36", label: "Ряд." },
                    { reading: FUNERAL_EV, label: "Заупокій" }
                ]
            }
        }
    },

    // Add more critical dates from OCU_2026_RULES as needed...
];

// Merge function
function mergeRules() {
    console.log(`📊 Starting merge...`);
    console.log(`   Existing rules: ${existingRules.length}`);
    console.log(`   New rules: ${OCU_2026_RULES.length}`);

    // Create a map of existing rules by ID
    const existingMap = new Map();
    existingRules.forEach((rule: any) => {
        existingMap.set(rule.id, rule);
    });

    let added = 0;
    let updated = 0;
    let skipped = 0;

    OCU_2026_RULES.forEach(newRule => {
        if (existingMap.has(newRule.id)) {
            // Update existing rule (merge data)
            const existing = existingMap.get(newRule.id);

            // Priority: Take new rule if it has higher priority
            if ((newRule.priority || 5) >= (existing.priority || 5)) {
                existingMap.set(newRule.id, {
                    ...existing,
                    ...newRule,
                    data: {
                        ...existing.data,
                        ...newRule.data
                    }
                });
                updated++;
            } else {
                skipped++;
            }
        } else {
            // Add new rule
            existingMap.set(newRule.id, newRule);
            added++;
        }
    });

    // Convert map back to array
    const mergedRules = Array.from(existingMap.values());

    // Sort by ID for consistency
    mergedRules.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });

    console.log(`✅ Merge complete:`);
    console.log(`   Added: ${added}`);
    console.log(`   Updated: ${updated}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Total: ${mergedRules.length}`);

    // Write back to file
    fs.writeFileSync(
        OCU_RULES_PATH,
        JSON.stringify(mergedRules, null, 2),
        'utf-8'
    );

    console.log(`💾 Saved to ${OCU_RULES_PATH}`);
}

// Run merge
mergeRules();
