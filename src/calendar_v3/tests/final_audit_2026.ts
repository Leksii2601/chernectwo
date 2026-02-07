
import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';
import { getLectionaryKey } from '@/calendar_v3/core/LectionaryResolver';
import { getNday, getOrthodoxPascha } from '@/calendar_v3/core/PaschaMath';
import fs from 'fs';
import path from 'path';

async function runAudit() {
    console.log("Starting Final Audit for 2026...");
    const engine = CalendarEngine.getInstance();
    const pascha = getOrthodoxPascha(2026);
    
    // Setup date range: Jan 1 to Dec 31, 2026
    const startDate = new Date('2026-01-01');
    const endDate = new Date('2026-12-31');
    
    const csvRows: string[] = [];
    // Header
    csvRows.push("Date,nday,Lectionary Key,Title,Reading Count,Is Aliturgical,Red Flags");

    const currentDate = new Date(startDate);
    let errorCount = 0;

    while (currentDate <= endDate) {
        // Generate
        const readings = engine.generateDay(currentDate);
        const nday = getNday(currentDate, pascha);
        const key = getLectionaryKey(currentDate, pascha);
        
        // Metrics
        const apostleCount = readings.liturgy.apostle.length;
        const gospelCount = readings.liturgy.gospel.length;
        const totalReadings = apostleCount + gospelCount;
        const isAliturgical = totalReadings === 0;
        
        const title = (readings.feast?.title || readings.liturgy.title).replace(/,/g, ';'); // Escape commas for CSV
        
        // Red Flags
        const flags: string[] = [];
        
        // 1. Duplicate Check
        if (totalReadings > 4) {
            flags.push("High Reading Count (>4)");
        }

        // 2. Lenten Weekday Check (nday -48 to -1, excluding Sat/Sun)
        // Weekdays range from -48 (Clean Monday) to -2 (Great Friday).
        // Saturdays: -43, -36, -29, -22, -15, -8, -1
        // Sundays: -42, -35, -28, -21, -14, -7
        // Annunciation exception (2026-03-25 is Wednesday) is handled by engine logic, 
        // but let's see if the engine flags it as Aliturgical or not.
        // For audit purposes: If it's a generic Lenten weekday and NOT Aliturgical, flag it.
        // But exceptions exist (Annunciation, Presanctified technically has no Apostle/Gospel liturgy readings so count is 0).
        // Presanctified days (Wed/Fri) have 0 liturgy readings usually in this system (paremias in vespers).
        // So checking "Is Aliturgical" (count === 0) is actually CORRECT for most Lenten weekdays.
        // The flag should be if Count > 0 on a strictly aliturgical day (like Clean Mon/Tue/Thu).
        
        const isLentenPeriod = nday >= -48 && nday < -1;
        const dayOfWeek = currentDate.getDay(); // 0-6
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        if (isLentenPeriod && !isWeekend) {
             // Exceptions: Annunciation (Liturgical), Holy Week (Holy Thu/Sat have Liturgy)
             const isAnnunciation = title.includes("Благовіщення") && !title.includes("Передсвято");
             const isHolyWeek = nday >= -6; // Holy Mon-Sat
             
             // If valid Liturgy (reads > 0) and NOT Annunciation/HolyWeek -> Flag
             if (!isAliturgical && !isAnnunciation && !isHolyWeek) {
                 flags.push("Lent Weekday has Liturgy (Unexpected?)");
             }
        }

        // 3. Key Missing
        if (!key || key === "" || key === "undefined") {
            flags.push("Invalid Key");
        }

        // Additional: Clean Monday should be Aliturgical
        if (nday === -48 && !isAliturgical) flags.push("Clean Monday has Readings");

        // Prepare Row
        const dateStr = currentDate.toISOString().split('T')[0];
        const flagStr = flags.length > 0 ? flags.join(" | ") : "OK";
        
        if (flags.length > 0) errorCount++;

        csvRows.push(`${dateStr},${nday},${key},"${title}",${totalReadings},${isAliturgical},${flagStr}`);

        // Next Day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Write File
    const outputPath = path.resolve('audit_report_2026.csv');
    fs.writeFileSync(outputPath, csvRows.join('\n'), 'utf-8');
    
    console.log(`Audit Complete. ${errorCount} flagged days.`);
    console.log(`Report saved to: ${outputPath}`);
}

runAudit().catch(console.error);
