import { generateCalendar } from '../utils/calendarGenerator';

console.log("Checking Feb 2026 Status (V2)...");
const cal = generateCalendar(2026, 'UA');
const entries = cal.filter(d => ["02-03", "02-12", "02-22", "02-25", "02-28"].includes(d.date.slice(5)));

entries.forEach(d => {
    console.log(`\n=== ${d.date} ===`);
    console.log("Liturgy:");
    d.readings.split('\n').forEach(r => {
        if (!r.includes("Вечірня") && !r.includes("час")) console.log("  " + r);
    });

    // Check Vespers specifically for Feb 25
    if (d.date.includes("02-25")) {
        console.log("Vespers:");
        d.readings.split('\n').filter(r => r.includes("Вечірня")).forEach(r => console.log("  " + r));
    }
});
