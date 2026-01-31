
import { calculateDynamicReadings, getLectionaryKeyInfo } from '../LiturgicalEngine.ts';

const feb7 = new Date(2026, 1, 7);
const feb8 = new Date(2026, 1, 8);

console.log("--- DEBUG FEB 7 (Saturday) ---");
const info7 = getLectionaryKeyInfo(feb7);
console.log(`NDAY: ${info7.nday}`);
console.log(`Lectionary Key (Before Override): ${info7.key}`);

const res7 = calculateDynamicReadings(feb7);
console.log(`Final Key Used: ${res7.metadata?.key}`);
console.log("Liturgy Readings:");
res7.liturgy.gospel.forEach(r => console.log(`  Gospel: ${r.reading} (${r.label})`));
res7.liturgy.apostle.forEach(r => console.log(`  Apostle: ${r.reading} (${r.label})`));


console.log("\n--- DEBUG FEB 8 (Sunday Prodigal Son) ---");
const info8 = getLectionaryKeyInfo(feb8);
console.log(`NDAY: ${info8.nday}`);
console.log(`Lectionary Key: ${info8.key}`);

const res8 = calculateDynamicReadings(feb8);
console.log("Saints List:", res8.saints);
console.log("Liturgy Readings:");
res8.liturgy.gospel.forEach(r => console.log(`  Gospel: ${r.reading} (${r.label})`));
res8.liturgy.apostle.forEach(r => console.log(`  Apostle: ${r.reading} (${r.label})`));

// Check specifically for Theodore Stratelates (0208)
// Check if suppression happened
const hasSt = res8.readings.some(r => r.label && r.label.includes("Св"));
console.log(`Has Saint Readings? ${hasSt}`);
