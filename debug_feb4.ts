
import { getLectionaryKey } from './src/calendar_v3/core/LectionaryResolver';
import { getOrthodoxPascha } from './src/calendar_v3/core/PaschaMath';

const pascha = getOrthodoxPascha(2026);
const date = new Date(2026, 1, 4); // Feb 4 (Month is 0-indexed)

console.log("Run Debug Feb 4");
const key = getLectionaryKey(date, pascha);
console.log("Key:", key);
