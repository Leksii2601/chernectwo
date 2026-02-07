/**
 * Mathematical calculations for Paschalion (Easter date)
 * Implements the standard Gauss algorithm for Orthodox Pascha (Julian Calendar)
 * Converted to Gregorian date.
 */

export function getOrthodoxPascha(year: number): Date {
    const a = year % 19;
    const b = year % 4;
    const c = year % 7;
    const d = (19 * a + 15) % 30;
    const e = (2 * b + 4 * c + 6 * d + 6) % 7;
    const f = d + e;
    
    // Base date: April 4th (Julian) which is roughly where the offset starts calculation
    // Note: The logic below produces the Gregorian Date directly if we consider the Julian shift
    // But usually this algorithm produces the Julian date offset from March/April.
    // Let's stick to the implementation from V2 which was working:
    // const pascha = new Date(year, 3, 4, 12, 0, 0); // April 4th ??
    // Actually the V2 implementation:
    // const pascha = new Date(year, 3, 4, 12, 0, 0);
    // pascha.setDate(pascha.getDate() + f);
    
    // Standard Meeus/Jones/Butcher's algorithm for Julian/Orthodox Easter
    // 1. Calculate Julian Date
    // 2. Add 13 days for Gregorian (in 20th/21st century)
    
    // Re-implementing the V2 exact logic to ensure continuity:
    const pascha = new Date(year, 3, 4, 12, 0, 0);
    pascha.setDate(pascha.getDate() + f);
    return pascha;
}

export function getJulianDay(date: Date): number {
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    const D = date.getDate();
    if (M <= 2) { Y -= 1; M += 12; }
    const A = Math.floor(Y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5;
}

export function getNday(date: Date, pascha: Date): number {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
    const p = new Date(pascha.getFullYear(), pascha.getMonth(), pascha.getDate(), 12, 0, 0);
    return getJulianDay(d) - getJulianDay(p);
}
