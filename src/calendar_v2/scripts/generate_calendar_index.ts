
import * as fs from 'fs';
import * as path from 'path';

const LIVES_PATH = path.resolve(process.cwd(), 'src/calendar_v2/data/ponomar_raw/ponomar_lives_ua.json');
const OUTPUT_PATH = path.resolve(process.cwd(), 'src/calendar_v2/data/calendar_index.json');

const lives = JSON.parse(fs.readFileSync(LIVES_PATH, 'utf-8'));
const keys = Object.keys(lives);

const index: Record<string, string[]> = {};

keys.forEach(key => {
    let mm: number = -1;
    let dd: number = -1;

    // Try Standard MMDD...
    if (key.length >= 4) {
        const p1 = parseInt(key.substring(0, 2));
        const p2 = parseInt(key.substring(2, 4));
        if (p1 >= 1 && p1 <= 12 && p2 >= 1 && p2 <= 31) {
            mm = p1;
            dd = p2;
        }
    }

    // Try Short MDD... (e.g. 901 for Sep 1, or 101 for Jan 1)
    if (mm === -1 && key.length >= 3) {
        const m1 = parseInt(key.substring(0, 1));
        const d1 = parseInt(key.substring(1, 3));
        if (m1 >= 1 && m1 <= 9 && d1 >= 1 && d1 <= 31) {
            mm = m1;
            dd = d1;
        }
    }

    // Try Short MMD... (e.g. 101 for Oct 1 but unlikely if 101 matches Jan 1)
    // Ambiguity: 112 -> Jan 12 or Nov 2?
    // Ponomar usually pads -> 0112 or 1102.
    // keys starting with '9' are Sep (9).
    if (mm === -1 && key.startsWith('9') && key.length >= 3) {
        // 901 -> Sep 1? 9001 -> Sep 1 (handled below manual)
        // 937 -> Sep 37 (No).
    }

    if (mm !== -1 && dd !== -1) {
        const dateKey = `${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
        if (!index[dateKey]) index[dateKey] = [];
        index[dateKey].push(key);
    }
});

// Manual fixes for 90... keys (Sep)
keys.filter(k => k.startsWith('90')).forEach(k => {
    // 9001 -> Sep 01
    // 9002 -> Sep 02
    if (k.length >= 4) {
        const dd = parseInt(k.substring(2, 4));
        if (dd >= 1 && dd <= 31) {
            const dateKey = `09-${String(dd).padStart(2, '0')}`;
            if (!index[dateKey]) index[dateKey] = [];
            if (!index[dateKey].includes(k)) index[dateKey].push(k);
        }
    }
});

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(index, null, 2));
console.log(`Generated index with ${Object.keys(index).length} dates.`);
