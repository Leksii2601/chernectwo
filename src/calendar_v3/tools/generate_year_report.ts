import fs from 'fs';
import { CalendarEngine } from '../core/CalendarEngine';

const OUTPUT_FILE = 'YEAR_2026_REPORT.csv';

async function generateReport() {
    const engine = CalendarEngine.getInstance();
    const headers = ['Date', 'DayName', 'Title', 'Apostle', 'Gospel', 'Matins', 'Prophecies'];

    // Write Headers
    fs.writeFileSync(OUTPUT_FILE, headers.join(',') + '\n');

    const year = 2026;
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const totalDays = isLeap ? 366 : 365;

    console.log(`Generating report for ${year} (${totalDays} days)...`);

    for (let i = 1; i <= totalDays; i++) {
        // Create fresh date for each day index (Noon) to avoid DST issues
        const date = new Date(year, 0, i, 12, 0, 0, 0);

        const dateStr = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        // Generate Readings
        const dayData = await engine.generateDay(date);

        // --- FORMATTING ---
        // Title
        let title = dayData.liturgy.title || "";
        title = title.replace(/"/g, '""'); // CSV escape

        // Helper to extract reading text
        const extractText = (r: any) => {
            if (typeof r === 'string') return r;
            return r.reading || r.definition || "";
        };

        // Apostle
        const apostle = dayData.liturgy.apostle
            .map(extractText)
            .join('; ');

        // Gospel
        const gospel = dayData.liturgy.gospel
            .map(extractText)
            .join('; ');

        // Matins
        let matins = "";
        if (dayData.matins && dayData.matins.readings) {
            matins = dayData.matins.readings.map((r: any) => `${r.label || ''}: ${extractText(r)}`).join("; ");
        }

        // Prophecies
        const prophecies: string[] = [];
        if (dayData.hours?.sexte) {
            dayData.hours.sexte.forEach((r: any) => prophecies.push(`[6-y chas] ${extractText(r)}`));
        }
        if (dayData.hours?.royal) {
            dayData.hours.royal.forEach((r: any) => prophecies.push(`[Royal] ${extractText(r)}`));
        }
        if (dayData.vespers?.readings) {
            dayData.vespers.readings.forEach((r: any) => prophecies.push(`[Vechirnia] ${extractText(r)}`));
        }
        const propheciesStr = prophecies.join('; ');

        // CSV Row
        // Handle fields that might contain commas by quoting
        const row = `${dateStr},${dayName},"${title}","${apostle}","${gospel}","${matins}","${propheciesStr}"`;
        fs.appendFileSync(OUTPUT_FILE, row + '\n');
    }

    console.log(`Generated ${OUTPUT_FILE} with ${totalDays} entries.`);
}

generateReport().catch(console.error);
