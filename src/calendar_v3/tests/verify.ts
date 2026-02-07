// Verification Script for V3 Architecture
import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';

const engine = CalendarEngine.getInstance();
const date = new Date('2026-09-14'); // Exaltation of the Cross

console.log("--- Generating for 2026-09-14 ---");
const result = engine.generateDay(date);

console.log(JSON.stringify(result, null, 2));
