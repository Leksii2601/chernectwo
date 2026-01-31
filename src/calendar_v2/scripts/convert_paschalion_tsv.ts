
import * as fs from 'fs';
import * as path from 'path';

const TSV_PATH = "D:\\Завантаження\\ponomar-master\\ponomar-master\\Ponomar\\scripts\\Perl\\data\\paschalion_baseline.tsv";
const OUTPUT_FILE = path.resolve(process.cwd(), 'src/calendar_v2/data/paschalion.json');

const dir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

if (!fs.existsSync(TSV_PATH)) {
    console.error(`TSV Not Found: ${TSV_PATH}`);
    process.exit(1);
}

const content = fs.readFileSync(TSV_PATH, 'utf-8');
const lines = content.split('\n');
const data: any[] = [];

lines.forEach((line, index) => {
    // Skip comments
    if (line.trim().startsWith('#') || !line.trim()) return;

    // Use regex to split by whitespace (handle tabs or spaces)
    // The format is: Year AM Ind Sol Lun U1 U2 U3 Month Day Key
    // Example: 2026 7534 4 2 2 10 23 28 March 30 З
    const cols = line.trim().split(/\s+/);

    if (cols.length < 11) {
        // Line too short (maybe header or malformed?)
        return;
    }

    // We need Year (0) to be a number
    if (isNaN(parseInt(cols[0]))) return;

    const year = parseInt(cols[0]);
    const yearAM = parseInt(cols[1]);
    const indiction = parseInt(cols[2]);
    const solar = parseInt(cols[3]);
    const lunar = parseInt(cols[4]);

    // Cols 5, 6, 7 are unknown numeric params
    const month = cols[8];
    const day = cols[9];
    const key = cols[10];

    const paschaDate = `${month} ${day}`;

    data.push({
        year,
        yearAM,
        indiction,
        solar,
        lunar,
        keyBoundary: key,
        paschaDateOldStyle: paschaDate
    });
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
console.log(`Converted ${data.length} entries. Saved to ${OUTPUT_FILE}`);
