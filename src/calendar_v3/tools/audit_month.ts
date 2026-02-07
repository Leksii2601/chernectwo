
import { CalendarEngine } from '../core/CalendarEngine';

import * as fs from 'fs';

async function auditYear(year: number) {
    const logBuffer: string[] = [];
    const log = (msg: string) => {
        console.log(msg);
        logBuffer.push(msg);
    };

    log(`Auditing Year ${year}...`);
    const engine = CalendarEngine.getInstance();

    // JS months 0-11
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    let errors = 0;

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${day}`;

        const dayData = await engine.generateDay(new Date(d));

        const hasLit = !!dayData.liturgy;
        const apostles = hasLit ? dayData.liturgy.apostle : [];
        const gospels = hasLit ? dayData.liturgy.gospel : [];

        // Check for missing readings
        if (apostles.length === 0 || gospels.length === 0) {
            // Special case: Good Friday might have no Liturgy?
            // But usually it has Vespers readings treated as Liturgy in some contexts, OR we check Vespers.
            // Our system usually puts Readings in Liturgy slot for report?
            // Actually Good Friday -> No Liturgy.
            // But we have readings.

            const title = dayData.liturgy?.title || 'No Title';
            // Suppress error for known ALiturgical days if title matches
            if (!title.includes('Велика п\'ятниця') && !title.includes('Строгий піст') && !title.includes('Літургія не звершується')) {
                log(`[FAIL] ${dateStr}: Missing Liturgy readings! Title: ${title}`);
                errors++;
            }
        }

        // Prophecy Check for Lent
        // If it's a Lenten weekday, check if prophecies exist
        // Clean Mon (Feb 23) -> Holy Thu (Apr 9)
        // Except Sat/Sun
        // Simple heuristic: if dayData.vespers.readings has entries?
        // dayData is GranularReadings. 
        // We can just log if it's empty during known Lent.
    }

    if (errors === 0) {
        log(`\nSUCCESS: All days in ${year} have required readings (excluding known aliturgical days).`);
    } else {
        log(`\nFAILURE: Found ${errors} days with missing readings.`);
    }

    fs.writeFileSync('audit_output.txt', logBuffer.join('\n'));
}

// Run for 2026
auditYear(2026);
