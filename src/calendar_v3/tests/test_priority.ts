// Ensure Exaltation has high rank in patched data for test
import { SaintsResolver } from '@/calendar_v3/core/SaintsResolver';
import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';

// Monkey patch SaintsResolver to verify logic without depending on external JSON quality yet
const resolver = SaintsResolver.getInstance();
const originalGetSaints = resolver.getSaintsForDay.bind(resolver);

resolver.getSaintsForDay = (date: Date) => {
    // If Sept 14, return Exaltation with Rank 8
    const m = date.getMonth();
    const d = date.getDate();
    if (m === 8 && d === 14) {
        return [{
            name: "ВОЗДВИЖЕННЯ (MOCKED)",
            serviceType: 8,
            liturgy: {
                title: "Feast",
                apostle: [{ reading: "Exaltation Apostle", label: "Feast", type: "apostol" }],
                gospel: [{ reading: "Exaltation Gospel", label: "Feast", type: "gospel" }]
            }
        }];
    }
    return originalGetSaints(date);
};

const engine = CalendarEngine.getInstance(); // Uses the singleton resolver we just patched

console.log("--- Testing Auto-Suppression for Sept 14 ---");
const result = engine.generateDay(new Date('2026-09-14'));

console.log("Readings:");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
result.liturgy.apostle.forEach((r: any) => console.log(`- ${r.reading}`));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasOrdinary = result.liturgy.apostle.some((r: any) => r.label === 'Ряд.' || r.reading.includes("Gal"));
if (!hasOrdinary) {
    console.log("SUCCESS: Ordinary readings suppressed by Priority 8.");
} else {
    console.log("FAIL: Ordinary readings still present.");
}
