// Test Holy Week (Great Saturday)
import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';

const engine = CalendarEngine.getInstance();
const date = new Date('2026-04-11'); // Great Saturday 2026 (-1)

console.log("--- Testing Great Saturday (2026-04-11) ---");
const result = engine.generateDay(date);

console.log(`Date: ${result.date}`);
console.log(`Title: "${result.feast?.title || result.liturgy.title}"`);

const vespersReadings = result.vespers?.readings || [];
console.log(`Vespers Paremias Count: ${vespersReadings.length}`);

vespersReadings.forEach((r, i) => {
    console.log(`  ${i+1}. [${r.label}] ${r.reading}`);
});

if (vespersReadings.length === 15) {
    console.log("SUCCESS: 15 Paremias found for Great Saturday.");
} else {
    console.log(`FAIL: Expected 15 readings, found ${vespersReadings.length}.`);
}
