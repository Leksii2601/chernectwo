
import { getOrthodoxPascha } from '../LiturgicalEngine';

function getJulianDay(date: Date): number {
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
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

const year = 2026;
const pascha = getOrthodoxPascha(year);
console.log(`Pascha ${year}:`, pascha.toISOString());

const feb1 = new Date(year, 1, 1);
const nday = getNday(feb1, pascha);
console.log(`Feb 1 nday: ${nday}`);

const jan25 = new Date(year, 0, 25);
console.log(`Jan 25 nday: ${getNday(jan25, pascha)}`);

const target = new Date(pascha);
target.setDate(target.getDate() - 70);
console.log(`Target -70 Date:`, target.toISOString());
