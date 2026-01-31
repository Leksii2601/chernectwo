
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(process.cwd(), 'src/calendar_v2/data/ponomar_raw/ponomar_lives.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const keys = Object.keys(data);
console.log(`Total keys: ${keys.length}`);

// Check specific "9" keys
const nineKeys = keys.filter(k => k.startsWith('9'));
console.log("Keys starting with 9:", nineKeys.slice(0, 10));

// Check Jan 1
const jan1Keys = keys.filter(k => k.startsWith('0101') || k.startsWith('101'));
console.log("Jan 1 potential:", jan1Keys);

// Check Dec 19
const dec19Keys = keys.filter(k => k.startsWith('1219'));
console.log("Dec 19 potential:", dec19Keys);
