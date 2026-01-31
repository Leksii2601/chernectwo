
const year = 2026;
const m = 2; // March
const d = 30;
const osDate = new Date(year, m, d);
console.log("Original:", osDate.toISOString());
osDate.setDate(osDate.getDate() + 13);
console.log("Plus 13:", osDate.toISOString());
