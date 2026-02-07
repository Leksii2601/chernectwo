
import * as fs from 'fs';
import * as path from 'path';

const OVERRIDES_PATH = path.join(process.cwd(), 'src/calendar_v3/data/typikon_overrides.json');
const NEW_FIXES_PATH = path.join(process.cwd(), 'src/calendar_v3/data/new_fixes.json');

// Delete new_fixes.json
if (fs.existsSync(NEW_FIXES_PATH)) {
    fs.unlinkSync(NEW_FIXES_PATH);
    console.log("Deleted new_fixes.json");
}

// Clean overrides
if (fs.existsSync(OVERRIDES_PATH)) {
    let rules = JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf-8'));
    const countBefore = rules.length;

    // Remove the Ryad patches and Theophany patches (now handled by Engine/Resolver)
    const idsToRemove = [
        "fix-2026-01-06-theophany",
        "fix-2026-01-07-joann",
        "fix-2026-01-19-mon",
        "fix-2026-01-23-fri",
        "fix-2026-01-26-mon",
        "fix-2026-01-28-wed",
        "fix-2026-01-29-thu",
        "global-theophany-01-06",
        "global-synaxis-john-01-07",
        "2026-fix-01-19-mon-ryad",
        "2026-fix-01-23-fri-ryad",
        "2026-fix-01-26-mon-ryad",
        "2026-fix-01-28-wed-ryad",
        "2026-fix-01-29-thu-ryad",
        "2026-fix-01-04-sun-before-theophany" // Let's try removing this too and see if Engine handles it.
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rules = rules.filter((r: any) => !idsToRemove.includes(r.id));

    fs.writeFileSync(OVERRIDES_PATH, JSON.stringify(rules, null, 2), 'utf-8');
    console.log(`Removed ${countBefore - rules.length} patched rules.`);
}
