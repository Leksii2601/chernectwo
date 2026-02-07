import * as fs from 'fs';
import * as path from 'path';

const currentPath = path.resolve('src/calendar_v3/data/typikon_overrides.json');
const newFixesPath = path.resolve('src/calendar_v3/data/new_fixes.json');

const current = JSON.parse(fs.readFileSync(currentPath, 'utf8'));
const fixes = JSON.parse(fs.readFileSync(newFixesPath, 'utf8'));

// Filter out existing rules if we are re-running
const fixedIds = new Set(fixes.map((f: any) => f.id));
const filteredCurrent = current.filter((r: any) => !fixedIds.has(r.id));

const merged = [...filteredCurrent, ...fixes];

fs.writeFileSync(currentPath, JSON.stringify(merged, null, 2), 'utf8');
console.log(`Merged ${fixes.length} fixes into typikon_overrides.json`);
