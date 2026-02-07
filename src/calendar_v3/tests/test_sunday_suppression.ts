import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';

const engine = CalendarEngine.getInstance();
const date = new Date('2026-09-27'); // Sunday, St. Callistratus

console.log(`--- Checking 2026-09-27 (Sunday) ---`);
const result = engine.generateDay(date);

console.log("Saints listed:", result.saints);

console.log("\nLiturgy Readings:");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
result.liturgy.apostle.forEach((r: any) => console.log(`[Apostle] ${r.label}: ${r.reading}`));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
result.liturgy.gospel.forEach((r: any) => console.log(`[Gospel] ${r.label}: ${r.reading}`));

// Validation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ordinaryCount = result.liturgy.apostle.filter((r: any) => r.label === 'Ряд.').length;
const saintCount = result.liturgy.apostle.length - ordinaryCount;

if (saintCount === 0) {
    console.log("\nSUCCESS: Saint readings suppressed. Only Ordinary Sunday readings present.");
} else {
    console.log(`\nFAIL: Found ${saintCount} saint readings. Should be suppressed.`);
}
