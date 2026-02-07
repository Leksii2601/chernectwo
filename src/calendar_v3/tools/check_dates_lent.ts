
import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';

async function runCheck() {
    const engine = CalendarEngine.getInstance();
    // await engine.initialize(); // Removed in V3

    const datesToCheck = [
        '2026-02-08', // Prodigal Son
        '2026-02-15', // Meatfare
        '2026-02-22', // Cheesefare
        '2026-02-23', // Clean Monday (Expect NO Liturgy)
        '2026-02-25', // Clean Wednesday (Expect NO Liturgy readings)
        '2026-02-28'  // First Saturday (Expect Liturgy)
    ];

    console.log("Checking Reading Slots for Key Dates 2026...");
    
    for (const dStr of datesToCheck) {
        // Create date object (UTC or local? Engine handles it, usually local)
        const d = new Date(dStr);
        const readings = engine.generateDay(d);
        console.log(`\nDate: ${dStr} (Nday: ${readings.metadata?.nday})`);
        
        const g = readings.liturgy?.gospel;
        const a = readings.liturgy?.apostle;
        
        if (!g || g.length === 0) {
            console.log("  Gospel: [NONE]");
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const gText = g.map((r: any) => `${r.reading} (${r.label || '?'})`).join(', ');
            console.log(`  Gospel: [${gText}]`);
        }

        if (!a || a.length === 0) {
            console.log("  Apostle: [NONE]");
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const aText = a.map((r: any) => `${r.reading} (${r.label || '?'})`).join(', ');
            console.log(`  Apostle: [${aText}]`);
        }
        
        // Also print candidates logic debug info if possible?
        // No, engine doesn't expose candidates. But results show winners.
    }
}

runCheck().catch(console.error);
