
import fs from 'fs';
import path from 'path';

const V2_DATA = path.resolve('src/calendar_v2/data');
const V3_DATA = path.resolve('src/calendar_v3/data');

const lectionaryPath = path.join(V2_DATA, 'lectionary.json');
const fixedPath = path.join(V3_DATA, 'lectionary_fixed.json');

const lectionary = JSON.parse(fs.readFileSync(lectionaryPath, 'utf8'));
const fixedRaw = JSON.parse(fs.readFileSync(fixedPath, 'utf8'));
const fixed = fixedRaw.fixed_holidays || fixedRaw; // Handle wrapper or array

// 1. Build Index of Existing Pericopes
const existingEpistles = new Set<string>();
const existingGospels = new Set<string>();

let maxKey = 0;

for (const key in lectionary) {
    const k = parseInt(key);
    if (!isNaN(k) && k > maxKey) maxKey = k;
    
    const entry = lectionary[key];
    if (entry.epistlePericope) existingEpistles.add(entry.epistlePericope.toString());
    if (entry.gospelPericope) existingGospels.add(entry.gospelPericope.toString());
}

console.log(`Max Key: ${maxKey}`);
console.log(`Existing Epistles: ${existingEpistles.size}`);
console.log(`Existing Gospels: ${existingGospels.size}`);

// 2. Scan Fixed Feasts for Missing Pericopes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const repairs: any[] = [];

const parseZachalo = (str: string) => {
    // try to match "Book. ### Zach.; ref"
    const regex = /^(.+?)\.?\s*(\d+)\s*зач\.;\s*(.*)$/;
    const m = str.match(regex);
    if (!m) return null;
    return {
        book: m[1].trim(),
        id: m[2],
        ref: m[3].trim()
    };
};

const formatRef = (book: string, ref: string) => `${book}._${ref}`;

const processEntry = (apostleStr: string, gospelStr: string) => {
    const aParsed = parsing(apostleStr, existingEpistles);
    const gParsed = parsing(gospelStr, existingGospels);
    
    // Logic: only add if at least one is missing
    // But we need to handle "already added in this run" logic?
    // Just blindly add new rows if missing.
    
    if (aParsed || gParsed) {
         // Create row
         maxKey++;
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const row: any = {};
         
         // Re-parse to get details
         const aDetails = apostleStr ? parseZachalo(apostleStr) : null;
         const gDetails = gospelStr ? parseZachalo(gospelStr) : null;

         if (aDetails) {
             row.epistle = formatRef(aDetails.book, aDetails.ref);
             row.epistlePericope = aDetails.id;
             existingEpistles.add(aDetails.id);
         }
         if (gDetails) {
             row.gospel = formatRef(gDetails.book, gDetails.ref);
             row.gospelPericope = gDetails.id;
             existingGospels.add(gDetails.id);
         }
         
         lectionary[maxKey.toString()] = row;
         repairs.push(`Added Row ${maxKey}: ${row.epistlePericope || ''} / ${row.gospelPericope || ''}`);
    }
}

// parsing helper returns boolean "needs addition"
const parsing = (str: string, set: Set<string>) => {
    if(!str) return false;
    const p = parseZachalo(str);
    if (p && !set.has(p.id)) return true;
    return false;
};


for (const feast of fixed) {
    // 1. Direct props
    processEntry(feast.apostle, feast.gospel);

    // 2. Liturgy array
    if (Array.isArray(feast.liturgy)) {
        for (const l of feast.liturgy) {
            processEntry(l.apostle, l.gospel);
        }
    }
    
    // 3. Water Blessing (optional)
    if (feast.waterBlessing) {
         processEntry(feast.waterBlessing.apostle, feast.waterBlessing.gospel);
    }
}

// 3. Save
if (repairs.length > 0) {
    console.log(`Making ${repairs.length} repairs...`);
    fs.writeFileSync(lectionaryPath, JSON.stringify(lectionary, null, 2));
    repairs.forEach(r => console.log(r));
} else {
    console.log("No repairs needed.");
}
