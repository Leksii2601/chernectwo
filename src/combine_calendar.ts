import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/calendar_v2/data');
const OUT_FILE = path.join(DATA_DIR, 'native_calendar_text.txt');

function main() {
    const f0 = fs.readFileSync(path.join(DATA_DIR, 'kalendar_2026.md'), 'utf-8');
    const f1 = fs.readFileSync(path.join(DATA_DIR, 'kalendar_2026 (1).md'), 'utf-8');
    const f2 = fs.readFileSync(path.join(DATA_DIR, 'kalendar_2026 (2).md'), 'utf-8');
    const f3 = fs.readFileSync(path.join(DATA_DIR, 'kalendar_2026 (3).md'), 'utf-8');

    let combined = "";

    // 1. File 0: Jan 1 - Jan 28
    // Keep all of it, but maybe trim end if it overlaps?
    // It ends at Jan 28. F1 starts at Jan 23.
    // We want F0 up to Jan 28. 
    // F1 starts at Jan 23. We want F1 starting from Jan 29.

    // Find split point in F1: "## 29" (Jan 29 is Thursday)
    // pattern: /##\s*29\s*четвер/ or just /##\s*29/
    const idx1 = f1.search(/##\s*29/);
    if (idx1 === -1) {
        console.error("Could not find Jan 29 in f1");
        return;
    }
    const part1 = f1.substring(idx1);

    // F1 ends at March 8.
    // F2 starts at Feb 7. We want F2 from March 9.
    // Find split point in F2: March 9.
    // March 9 is Monday. "## 9"
    // But there might be other "## 9" (Feb 9?).
    // F2 starts Feb 7. Feb 9 is Monday.
    // March 9 is Monday.
    // So there might be two "## 9".
    // 40 Martyrs is on March 9.
    // Let's look for "40 мчч" which is unique to March 9.
    const idx2 = f2.search(/3-й тиждень Великого посту/); // March 9 starts 3rd week
    // Or just search for the specific text we saw: "3-й тиждень Великого посту. 40 мчч"
    if (idx2 === -1) {
        console.error("Could not find March 9 in f2");
        return;
    }
    const part2 = f2.substring(idx2);

    // F2 ends at April 10 (Good Friday).
    // F3 starts at April 9 (Holy Thurs).
    // We want F3 from April 11 (Holy Saturday).
    // April 11 is Saturday. "## 11 субота"
    const idx3 = f3.search(/##\s*11\s*субота/);
    if (idx3 === -1) {
        console.error("Could not find April 11 in f3");
        return;
    }
    const part3 = f3.substring(idx3);

    // Combine
    // f0 is kept whole? 
    // f0 ends at Jan 28. f1 splice starts at Jan 29. Perfect.
    // f1 (spliced) ends at March 8. f2 splice starts at March 9. Perfect.
    // f2 (spliced) ends at April 10. f3 splice starts at April 11. Perfect.

    combined = f0 + "\n" + part1 + "\n" + part2 + "\n" + part3;

    fs.writeFileSync(OUT_FILE, combined);
    console.log(`Combined file written to ${OUT_FILE}. Length: ${combined.length}`);
}

main();
