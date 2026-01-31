
import * as fs from 'fs';
import * as path from 'path';

const FILE = path.resolve(process.cwd(), 'src/calendar_v2/data/ponomar_raw/ponomar_lives_ua.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf-8'));

if (data["146"]) {
    console.log("Entry 146 Found:");
    console.log(JSON.stringify(data["146"], null, 2));
} else {
    console.log("Entry 146 not found.");
}
