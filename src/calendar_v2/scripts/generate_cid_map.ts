
import * as fs from 'fs';
import * as path from 'path';

const BASE_PATH = "D:\\Завантаження\\ponomar-master\\ponomar-master\\Ponomar\\languages\\en\\xml";
const OUTPUT_PATH = path.resolve(process.cwd(), 'src/calendar_v2/data/calendar_cids.json');

const result: Record<string, string[]> = {};

// Parse Attributes helper
function parseAttributes(tagObj: string): Record<string, string> {
    const attrs: Record<string, string> = {};
    const regex = /(\w+)="([^"]*)"/g;
    let match;
    while ((match = regex.exec(tagObj)) !== null) {
        attrs[match[1]] = match[2];
    }
    return attrs;
}

// Iterate Months 01..12
for (let m = 1; m <= 12; m++) {
    const mm = String(m).padStart(2, '0');
    const monthDir = path.join(BASE_PATH, mm);

    if (!fs.existsSync(monthDir)) {
        console.warn(`Month dir missing: ${monthDir}`);
        continue;
    }

    const files = fs.readdirSync(monthDir).filter(f => f.endsWith('.xml'));

    files.forEach(file => {
        const dd = file.replace('.xml', '');
        if (!/^\d{2}$/.test(dd)) return; // Only numeric days

        const content = fs.readFileSync(path.join(monthDir, file), 'utf-8');
        const cids: string[] = [];

        const saintRegex = /<SAINT\s+(.*?)(\/?>)/g;
        let match;
        while ((match = saintRegex.exec(content)) !== null) {
            const attrs = parseAttributes(match[1]);
            if (attrs['CId']) {
                cids.push(attrs['CId']);
            }
        }

        const dateKey = `${mm}-${dd}`;
        result[dateKey] = cids;
    });
}

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2));
console.log(`Generated CID map for ${Object.keys(result).length} days.`);
