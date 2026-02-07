// Test Lenten Weekday Prophecies
import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';
import { DetailedReading } from '@/calendar_v3/core/LiturgicalTypes';

const engine = CalendarEngine.getInstance();
const date = new Date('2026-02-25'); // Clean Wednesday (-46)

console.log("--- Testing Clean Wednesday (2026-02-25) ---");
const result = engine.generateDay(date);

console.log(`Date: ${result.date}`);
console.log(`Title: "${result.feast?.title || result.liturgy.title}"`);
console.log(`Liturgy Readings Count: Apostle=${result.liturgy.apostle.length}, Gospel=${result.liturgy.gospel.length}`);

if (result.hours?.sexte) {
    console.log(`6th Hour: YES (${result.hours.sexte.length} readings)`);
    result.hours.sexte.forEach((r: DetailedReading) => console.log(`  - ${r.label}: ${r.reading} (${r.type})`));
} else {
    console.log("6th Hour: NO");
}

if (result.vespers?.readings) {
    console.log(`Vespers: YES (${result.vespers.readings.length} readings)`);
    result.vespers.readings.forEach((r: DetailedReading) => console.log(`  - ${r.label}: ${r.reading} (${r.type})`));
} else {
    console.log("Vespers: NO");
}

const hasTitle = result.liturgy.title.includes("Ранішосвячених");
const hasNoLiturgyReadings = result.liturgy.apostle.length === 0;
const hasProphecies = (result.vespers?.readings?.length || 0) > 0;

if (hasTitle && hasNoLiturgyReadings && hasProphecies) {
    console.log("SUCCESS: Lenten structure confirmed.");
} else {
    console.log("FAIL: Missing components.");
    if (!hasTitle) console.log(" - Wrong Title");
    if (!hasNoLiturgyReadings) console.log(" - Has Liturgy Readings (Should be 0)");
    if (!hasProphecies) console.log(" - Missing Vespers Prophecies");
}
