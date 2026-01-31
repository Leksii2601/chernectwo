
import { calculateDynamicReadings } from './LiturgicalEngine';

const TEST_DATE = "2026-03-09";
console.log(`--- Debugging ${TEST_DATE} ---`);

const date = new Date(TEST_DATE);
const result = calculateDynamicReadings(date);

console.log("\nFinal Result Readings:");
result.readings.forEach(r => {
    console.log(`  ${r.label || 'Def'}: ${r.apostle} / ${r.gospel}`);
});
