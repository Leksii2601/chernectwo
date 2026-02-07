// Test Formatting & Title Generation
import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';
import { SaintsResolver } from '@/calendar_v3/core/SaintsResolver';

const engine = CalendarEngine.getInstance();
const date = new Date('2026-09-26'); // Saturday, St. John Theologian

// Mock Saint John to ensure high priority 6 and readable title
const resolver = SaintsResolver.getInstance();
const originalGetSaints = resolver.getSaintsForDay.bind(resolver);

resolver.getSaintsForDay = (date: Date) => {
    // 09-26
    const m = date.getMonth();
    const d = date.getDate();
    if (m === 8 && d === 26) {
        return [{
            name: "Апостола і євангелиста Іоана Богослова",
            serviceType: 6, // High Rank (Vigil)
            liturgy: {
                title: "Апостола і євангелиста Іоана Богослова",
                apostle: [{ reading: "1 Ін. 4:12-19", label: "Святого", type: "apostol" }],
                gospel: [{ reading: "Ін. 19:25-27; 21:24-25", label: "Святого", type: "gospel" }]
            }
        }];
    }
    return originalGetSaints(date);
};

console.log("--- Testing Formatting for 2026-09-26 (Saturday + Saint) ---");
const result = engine.generateDay(date);

console.log(`Generated Title: "${result.liturgy.title}"`);
console.log("\nReadings:");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
result.liturgy.apostle.forEach((r: any) => console.log(`[Ap] (${r.label}) ${r.reading}`));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
result.liturgy.gospel.forEach((r: any) => console.log(`[Ev] (${r.label}) ${r.reading}`));

// Checks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasSat = result.liturgy.apostle.some((r: any) => r.label === 'Суботи');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasSaint = result.liturgy.apostle.some((r: any) => r.label === 'Святого');

if (hasSat && hasSaint) {
    console.log("\nSUCCESS: Both Saturday and Saint readings present with correct labels.");
} else {
    console.log(`\nFAIL: Missing source. Sat: ${hasSat}, Saint: ${hasSaint}`);
}
