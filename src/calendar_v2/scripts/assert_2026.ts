
import { calculateDynamicReadings } from '../LiturgicalEngine';

const YEAR = 2026;
// Jan 11 should be Sunday After Theophany (Special)
// Jan 18 should be Gap (Matthew 17 or similar) => Key 170?
// Jan 25 should be Zacchaeus => Key 320
// Feb 1 should be P&P => Key 330

const checks = [
    { date: new Date(YEAR, 0, 11), expectedKey: "SPECIAL", label: "Jan 11 After Theophany" },
    { date: new Date(YEAR, 0, 18), expectedKey: "170", label: "Jan 18 Gap (Mt 17)" },
    { date: new Date(YEAR, 0, 25), expectedKey: "320", label: "Jan 25 Zacchaeus" },
    { date: new Date(YEAR, 1, 1), expectedKey: "330", label: "Feb 1 Publican" }
];

checks.forEach(c => {
    const res = calculateDynamicReadings(c.date);
    const key = res.metadata?.key;
    const desc = res.metadata?.description;

    if (key === c.expectedKey) {
        console.log(`PASS: ${c.label} -> Key ${key}`);
    } else {
        console.log(`FAIL: ${c.label} -> Expected ${c.expectedKey}, Got ${key} (${desc})`);
    }
});
