
import { CalendarEngine } from '../core/CalendarEngine';

async function inspect() {
    const engine = CalendarEngine.getInstance();
    const date = new Date('2026-01-01');
    const res = engine.generateDay(date);
    
    console.log(`\nReadings for ${date.toISOString().split('T')[0]}:`);
    
    // Dump Liturgy
    if (res.liturgy) {
        console.log("Liturgy Structure (JSON):");
        console.log(JSON.stringify(res.liturgy, null, 2));
    }
}

inspect().catch(console.error);
