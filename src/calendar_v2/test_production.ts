
import { generateCalendar } from '../utils/calendarGenerator';

console.log("Generating 2026 Calendar...");
const cal = generateCalendar(2026, 'UA');
console.log(`Generated ${cal.length} days.`);

// Check Jan 25
const jan25 = cal.find(d => d.date === '2026-01-25');
console.log(`Jan 25 Reading: \n${jan25?.readings}`);

// Check Feb 1
const feb1 = cal.find(d => d.date === '2026-02-01');
console.log(`Feb 1 Reading: \n${feb1?.readings}`);
