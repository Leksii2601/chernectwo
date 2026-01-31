
import * as fs from 'fs';
import * as path from 'path';

const file = path.resolve(process.cwd(), 'src/calendar_v2/data/ponomar_raw/ponomar_lives_ua.json');
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
const keys = Object.keys(data).slice(0, 20);
console.log("Keys:", keys);
