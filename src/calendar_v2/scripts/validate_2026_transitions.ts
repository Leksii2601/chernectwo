
import { calculateDynamicReadings } from '../LiturgicalEngine';

const YEAR = 2026;

function logDay(d: Date, label: string) {
    const res = calculateDynamicReadings(d);
    const key = res.metadata?.key;
    const desc = res.metadata?.description;

    console.log(`\n[${label}] ${d.toISOString().split('T')[0]} (${desc})`);
    console.log(`Key: ${key}`);
    res.readings.forEach(r => {
        console.log(` - [${r.label || 'Row'}] ${r.apostle} / ${r.gospel}`);
    });
}

console.log("\n--- Triodion Approach Check ---");
let curr = new Date(YEAR, 0, 11);
while (curr.getDay() !== 0) {
    curr.setDate(curr.getDate() + 1);
}

for (let i = 0; i < 6; i++) {
    logDay(curr, `Sunday ${curr.getDate()} Jan/Feb`);
    curr.setDate(curr.getDate() + 7);
}
