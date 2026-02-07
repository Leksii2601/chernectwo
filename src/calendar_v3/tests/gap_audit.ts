import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';

const engine = CalendarEngine.getInstance();

async function runAudit() {
    console.log("Starting Gap Audit 2026...");
    
    // We scan 365 days
    const startDate = new Date('2026-01-01');
    const endDate = new Date('2026-12-31');
    const gaps: string[] = [];
    
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        // Reset hours
        currentDate.setHours(0,0,0,0);
        
        const result = engine.generateDay(currentDate);
        const title = result.feast?.title || result.liturgy.title;
        
        // Check for generic titles
        if (!title || title.trim() === "" || title === "Generated" || title === "Saint" || title === "Літургія") {
            const dStr = currentDate.toISOString().split('T')[0];
            gaps.push(`${dStr}: "${title}"`);
        }
        
        // Test Jan 19 specifically
        if (currentDate.toISOString().split('T')[0] === '2026-01-19') {
             console.log("\n--- Jan 19, 2026 Check ---");
             console.log(`Title: ${title}`);
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             result.liturgy.apostle.forEach((r: any) => console.log(`Ap: ${r.reading || r.source}`));
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             result.liturgy.gospel.forEach((r: any) => console.log(`Gs: ${r.reading || r.source}`));
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    console.log(`\nAudit Complete.`);
    if (gaps.length > 0) {
        console.log(`Found ${gaps.length} Generic/Empty days:`);
        // Print first 20 gaps if many
        gaps.slice(0, 50).forEach(g => console.log(g));
    } else {
        console.log("SUCCESS: No generic titles found!");
    }
}

runAudit().catch(console.error);
