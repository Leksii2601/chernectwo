
import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';

const engine = CalendarEngine.getInstance();
const date = new Date('2026-02-01'); // Sunday of Prodigal Son + Martyr Tryphon

const result = engine.generateDay(date);

console.log(`\n=== Inspection for ${date.toISOString().split('T')[0]} ===`);
console.log(`Title: ${result.liturgy.title}`);
console.log(`Readings Count: Apostle=${result.liturgy.apostle.length}, Gospel=${result.liturgy.gospel.length}`);

console.log(`\n[Apostles]`);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
result.liturgy.apostle.forEach((r: any) => console.log(` - [${(r as any).rank}] ${r.reading} (Label: ${r.label})`));
console.log(`\n[Gospels]`);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
result.liturgy.gospel.forEach((r: any) => console.log(` - [${(r as any).rank}] ${r.reading} (Label: ${r.label})`));

const hasTryphon = JSON.stringify(result).includes("Трифон");

console.log(`\nContains 'Трифон' in output? ${hasTryphon}`);
// On Feb 1 Tryphon readings are usually Lk 10:19... or similar.
// But Prodigal Son is Luke 15.
