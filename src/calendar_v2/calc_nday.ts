import { getOrthodoxPascha } from './LiturgicalEngine';

function getJulianDay(date: Date): number {
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    const D = date.getDate();
    if (M <= 2) { Y -= 1; M += 12; }
    const A = Math.floor(Y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5;
}

function getNday(date: Date, pascha: Date): number {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
    const p = new Date(pascha.getFullYear(), pascha.getMonth(), pascha.getDate(), 12, 0, 0);
    return getJulianDay(d) - getJulianDay(p);
}

const targets = [
    { d: "2025-01-03", label: "Jan 3 2025" },
    { d: "2025-12-01", label: "Dec 1 2025" },
    { d: "2025-12-07", label: "Dec 7 2025" },
    { d: "2026-01-19", label: "Jan 19 2026" },
    { d: "2026-02-22", label: "Feb 22 2026 (Forgiveness)" }
];

console.log("=== NDAY CALCULATOR ===");
targets.forEach(t => {
    const date = new Date(t.d + "T12:00:00");
    const year = date.getFullYear();
    const curPascha = getOrthodoxPascha(year);
    const prevPascha = getOrthodoxPascha(year - 1);
    const refPascha = (date < curPascha) ? prevPascha : curPascha;

    const nday = getNday(date, refPascha);
    console.log(`${t.label}: ${t.d} => nday ${nday} (Ref Pascha: ${refPascha.toDateString()})`);
});
