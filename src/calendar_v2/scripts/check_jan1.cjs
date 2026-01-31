
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(process.cwd(), 'src/calendar_v2/data/ponomar_raw/ponomar_lives.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const keys = Object.keys(data);
const jan1 = keys.filter(k => k.startsWith('0101'));
console.log("Jan 1 Keys:", jan1);
