
import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';

const engine = CalendarEngine.getInstance();
const datesToCheck = [
    '2026-01-25', // Zacchaeus / Week 33? 
    '2026-02-01', // Publican & Pharisee
    '2026-02-02', // Meeting of the Lord
    '2026-02-08', // Prodigal Son
    '2026-02-15', // Meatfare
    '2026-02-22', // Cheesefare
    '2026-02-23'  // Clean Monday
];

console.log("--- Checking Key Dates 2026 ---");
datesToCheck.forEach(dStr => {
    const d = new Date(dStr);
    const day = engine.generateDay(d) as any; // Cast to any to access dynamic props if needed
    
    console.log(`\nDate: ${dStr}`);
    console.log(`Titles: ${day.titles?.join(' | ') || 'None'}`);
    
    if (day.liturgy?.gospel?.length > 0) {
        // Handle array of readings
        const gospel = day.liturgy.gospel.map((r: any) => `${r.reading} (${r.label})`).join(', ');
        const apostle = day.liturgy.apostle.map((r: any) => `${r.reading} (${r.label})`).join(', ');
        console.log(`Liturgy: Gospel=[${gospel}] Apostle=[${apostle}]`);
    } else {
        console.log("Liturgy: None (Length 0)");
        // console.log(JSON.stringify(day, null, 2));
    }
});
