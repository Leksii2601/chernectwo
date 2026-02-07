import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';

const engine = CalendarEngine.getInstance();
const startDate = new Date('2025-09-01');
const endDate = new Date('2026-08-31');

console.log("Date | Key | Title");
console.log("--- | --- | ---");

let currentDate = new Date(startDate);

while (currentDate <= endDate) {
    const result = engine.generateDay(currentDate);
    
    const dateStr = result.date;
    const key = result.metadata?.key || "N/A";
    const title = result.feast?.title || result.liturgy.title || "No Title";
    
    console.log(`${dateStr} | ${key} | ${title}`);
    
    // Increment day
    currentDate.setDate(currentDate.getDate() + 1);
}
