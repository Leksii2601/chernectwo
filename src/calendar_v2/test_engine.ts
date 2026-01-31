
import { calculateDynamicReadings } from './LiturgicalEngine';

const TEST_YEAR = 2026;
const DATES_TO_CHECK = [
    "2026-01-01",
    "2026-01-04",
    "2026-01-06",
    "2026-01-07",
    "2026-01-11",
    "2026-01-18",
    "2026-01-25",
    "2026-02-01",
];

console.log(`--- Test ${TEST_YEAR} ---`);

DATES_TO_CHECK.forEach(dateStr => {
    const date = new Date(dateStr);
    const result = calculateDynamicReadings(date);
    const key = result.metadata?.key;
    const desc = result.metadata?.description;

    console.log(`${dateStr} [${key}] ${desc}`);
    result.readings.forEach(r => {
        // truncate strings for display
        const g = r.gospel.substring(0, 25);
        console.log(`  ${r.label || 'Def'}: ${g}...`);
    });
});
