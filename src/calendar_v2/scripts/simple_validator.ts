/**
 * Simple Validation Test
 */

import {
    getOrthodoxPascha,
    calculateDynamicReadings,
    getLectionaryKeyInfo
} from '../LiturgicalEngine';
import { PaschalionReader } from '../PaschalionReader';

console.log("=== Liturgical Engine Validation ===\n");

// 1. Paschalion Check for 2026
console.log("1. PASCHALION VALIDATION 2026");
const entry = PaschalionReader.getEntry(2026);
console.log(`   From JSON: Indiction=${entry?.indiction}, Solar=${entry?.solar}, KeyBoundary=${entry?.keyBoundary}`);
console.log(`   Pascha OS: ${entry?.paschaDateOldStyle}`);

const pascha2026 = getOrthodoxPascha(2026);
console.log(`   Calculated Pascha NS: ${pascha2026.toDateString()}`);

// Expected: March 30 OS + 13 = April 12 NS
const expectedPascha = new Date(2026, 3, 12);
console.log(`   Expected Pascha NS: ${expectedPascha.toDateString()}`);
console.log(`   Pascha Match: ${pascha2026.getMonth() === expectedPascha.getMonth() && pascha2026.getDate() === expectedPascha.getDate()}`);

// 2. Test Key Dates
console.log("\n2. KEY DATES VALIDATION");

const testDates = [
    { date: new Date(2026, 0, 14, 12), name: "Jan 14 (Circumcision - Jan 1 OS)" },
    { date: new Date(2026, 0, 19, 12), name: "Jan 19 (Theophany - Jan 6 OS)" },
    { date: new Date(2026, 0, 30, 12), name: "Jan 30 (Three Hierarchs)" },
    { date: new Date(2026, 3, 12, 12), name: "Apr 12 (Pascha 2026)" },
];

testDates.forEach(({ date, name }) => {
    try {
        const result = calculateDynamicReadings(date);
        const info = getLectionaryKeyInfo(date);

        console.log(`\n   ${name}`);
        console.log(`   Key: ${info.key}, nday: ${info.nday}`);
        console.log(`   Vespers: ${result.vespers?.readings.length || 0} readings`);
        console.log(`   Matins: ${result.matins?.readings.length || 0} readings`);
        console.log(`   Liturgy: ${result.liturgy.apostle.length} + ${result.liturgy.gospel.length} readings`);

        // Check suppression
        const hasOrdinary = result.liturgy.apostle.some(r => r.label === "Ряд.");
        const hasFeast = result.liturgy.apostle.some(r => r.label === "Свята" || r.label === "Святого");
        console.log(`   Has Ряд: ${hasOrdinary}, Has Свята: ${hasFeast}`);

        // Check localization
        const allReadings = [...result.liturgy.apostle, ...result.liturgy.gospel].map(r => r.reading);
        const hasEnglish = allReadings.some(r => r && /\b(Gen|Exod|Mt|Mk|Lk|Jn|Rom)\b/.test(r));
        console.log(`   Localization OK: ${!hasEnglish}`);

    } catch (e) {
        console.log(`   ERROR: ${e}`);
    }
});

console.log("\n=== Validation Complete ===");
