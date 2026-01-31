
import fs from 'fs';
const lectionary = JSON.parse(fs.readFileSync('src/calendar_v2/data/lectionary.json', 'utf-8'));

const targets = [
    "254", "170", "302", "212", "181", "182", "334", "285", "296", "135", "140", "112", "329", "311", "306"
];

console.log("Finding Keys...");
targets.forEach(t => {
    Object.entries(lectionary).forEach(([k, v]: [string, any]) => {
        if (v.epistlePericope === t || (v.epistle && v.epistle.includes(t))) {
            console.log(`Pericope ${t} -> Key ${k} (${v.epistle})`);
        }
    });
});
