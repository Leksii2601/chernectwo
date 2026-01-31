
import * as fs from 'fs';
import * as path from 'path';
import { calculateDynamicReadings } from '../LiturgicalEngine';

const YEAR = 2026; // Target year for this specific static generation

interface DayEntry {
    date: string;
    readings: any;
}

const dataset: DayEntry[] = [];

// Determine start and end
const start = new Date(YEAR, 0, 1); // Jan 1
const end = new Date(YEAR, 11, 31); // Dec 31

console.log(`Generating Readings Matrix for ${YEAR}...`);

for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    // Clone date to safe
    const current = new Date(d);

    // Calculate Readings
    const result = calculateDynamicReadings(current);

    dataset.push({
        date: result.date,
        readings: result.readings.map(r => ({
            label: r.label,
            apostle: r.apostle,
            gospel: r.gospel
        }))
    });
}

// Output
const outputDir = path.resolve(process.cwd(), 'src/calendar_v2/data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, `readings_${YEAR}.json`), JSON.stringify(dataset, null, 2));
console.log(`readings_${YEAR}.json generated.`);
