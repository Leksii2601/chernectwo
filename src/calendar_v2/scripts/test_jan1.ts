
import { calculateDynamicReadings } from '../LiturgicalEngine';

// Test Jan 1 (Circumcision + St. Basil)
const jan1 = new Date(2026, 0, 14, 12, 0, 0); // Jan 14 NS = Jan 1 OS
const result = calculateDynamicReadings(jan1);

console.log(JSON.stringify(result, null, 2));
