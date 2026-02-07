
import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/calendar_v3/data');
const OVERRIDES_PATH = path.join(DATA_DIR, 'typikon_overrides.json');
const NEW_FIXES_PATH = path.join(DATA_DIR, 'new_fixes.json');

function mergeFixes() {
    console.log(`Reading overrides from: ${OVERRIDES_PATH}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let overrides: any[] = [];
    if (fs.existsSync(OVERRIDES_PATH)) {
        overrides = JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf-8'));
    }

    console.log(`Reading new fixes from: ${NEW_FIXES_PATH}`);
    if (!fs.existsSync(NEW_FIXES_PATH)) {
        console.error("New fixes file not found!");
        process.exit(1);
    }
    const newFixes = JSON.parse(fs.readFileSync(NEW_FIXES_PATH, 'utf-8'));

    console.log(`Loaded ${overrides.length} existing overrides.`);
    console.log(`Loaded ${newFixes.length} new fixes.`);

    let addedCount = 0;
    let updatedCount = 0;

    // IDs to remove (deprecated/replaced)
    const removalIds = [
        "fix-2026-01-06-theophany",
        "fix-2026-01-07-joann",
        "fix-2026-01-19-mon",
        "fix-2026-01-23-fri",
        "fix-2026-01-26-mon",
        "fix-2026-01-28-wed",
        "fix-2026-01-29-thu",
        "fix-2026-01-04-sun-before-theophany" // I want to ensure only the new one exists, just in case
    ];

    overrides = overrides.filter(r => !removalIds.includes(r.id));
    console.log(`Filtered out ${removalIds.length} potentially deprecated rules. Remaining: ${overrides.length}`);

    for (const fix of newFixes) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const existingIndex = overrides.findIndex((r: any) => r.id === fix.id);
        if (existingIndex !== -1) {
            overrides[existingIndex] = fix;
            updatedCount++;
        } else {
            overrides.push(fix);
            addedCount++;
        }
    }

    fs.writeFileSync(OVERRIDES_PATH, JSON.stringify(overrides, null, 2), 'utf-8');
    console.log(`Merge complete. updated: ${updatedCount}, added: ${addedCount}`);
    console.log(`Total rules in overrides: ${overrides.length}`);
}

mergeFixes();
