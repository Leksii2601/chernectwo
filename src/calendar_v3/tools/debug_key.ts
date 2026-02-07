
import { getLectionaryKey } from '../core/LectionaryResolver';
import { getOrthodoxPascha } from '../core/PaschaMath';
import { getNday } from '../core/PaschaMath';

const year = 2026;
const pascha = getOrthodoxPascha(year);
const datesToCheck = [
    '2026-01-04',
    '2026-01-19', // Ryad day in question
    '2026-01-23'
];

console.log(`Pascha ${year}: ${pascha.toISOString()}`);
console.log("Check Dates:");

datesToCheck.forEach(dStr => {
    const d = new Date(dStr);
    const nday = getNday(d, pascha);
    const key = getLectionaryKey(d, pascha);
    console.log(`${dStr}: nday=${nday}, key=${key}`);
});
