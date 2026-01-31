import { generateCalendar } from '../utils/calendarGenerator';

console.log("Checking Feb 2026 Critical Dates...");
const cal = generateCalendar(2026, 'UA');
const data = cal.filter(d => ["02-03", "02-12", "02-18", "02-19", "02-22"].includes(d.date.slice(5)));

data.forEach(d => {
    console.log(`\n=== ${d.date} ===`);
    console.log(d.readings);
    if (d.readingsStructured && d.readingsStructured.hours) {
        console.log("Hours Keys:", Object.keys(d.readingsStructured.hours));
    }
});
