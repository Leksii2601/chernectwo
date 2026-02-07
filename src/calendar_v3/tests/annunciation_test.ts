import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';

const engine = CalendarEngine.getInstance();
const date = new Date('2026-03-25'); // Annunciation 2026 (Wednesday of Lent)

console.log("--- Testing Annunciation (2026-03-25) ---");
const result = engine.generateDay(date);

console.log(`Date: ${result.date}`);
console.log(`Title: "${result.feast?.title || result.liturgy.title}"`);
console.log(`Rank: ${result.feast?.rank}`);
console.log(`Liturgy Readings Count: Apostle=${result.liturgy.apostle.length}, Gospel=${result.liturgy.gospel.length}`);

// Analysis
const title = result.feast?.title || result.liturgy.title;
const hasReadings = result.liturgy.apostle.length > 0 && result.liturgy.gospel.length > 0;
const isPresanctified = title.includes("Ранішосвячених");
const isAnnunciation = title.includes("Благовіщення");

if (isAnnunciation && hasReadings) {
    console.log("SUCCESS: Annunciation overrides Lenten Aliturgical rules.");
} else if (isPresanctified) {
    console.log("FAIL: Lenten rule suppressed Annunciation.");
} else {
    console.log("FAIL: Unexpected state.");
}
