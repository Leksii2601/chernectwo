
import * as fs from 'fs';
import * as path from 'path';
import fixedReadingsRaw from '../../data/fixed_readings.json';
import saintsDataRaw from '../../data/saintsData.json';

interface SaintEntry {
    name: string;
    dates: string[]; // MM-DD
    source: string;
}

const masterIndex: Record<string, SaintEntry> = {};

// 1. Process Fixed Readings (Menaion Fixed Feasts)
const fixedFeasts = (fixedReadingsRaw as any).fixed_holidays || [];
fixedFeasts.forEach((f: any) => {
    const name = f.title.replace(/Свт\.|Прп\.|Мч\.|Вмч\.|Ап\.|Сщмч\./g, '').trim();
    if (!masterIndex[name]) {
        masterIndex[name] = { name, dates: [], source: 'fixed' };
    }
    masterIndex[name].dates.push(f.date_month_day);
});

// 2. Process saintsData
Object.entries(saintsDataRaw).forEach(([date, data]: [string, any]) => {
    const saints = data.saints || [];
    saints.forEach((s: string) => {
        const name = s.replace(/Свт\.|Прп\.|Мч\.|Вмч\.|Ап\.|Сщмч\./g, '').trim();
        if (!masterIndex[name]) {
            masterIndex[name] = { name, dates: [], source: 'saintsData' };
        }
        if (!masterIndex[name].dates.includes(date)) {
            masterIndex[name].dates.push(date);
        }
    });
});

// Output
const sortedKeys = Object.keys(masterIndex).sort((a, b) => a.localeCompare(b, 'uk'));
const sortedList = sortedKeys.map(k => masterIndex[k]);

const outputDir = path.resolve(process.cwd(), 'src/calendar_v2/data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'saints_index.json'), JSON.stringify(sortedList, null, 2));
console.log("saints_index.json generated.");
