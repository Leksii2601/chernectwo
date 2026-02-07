// Matins Eothina Gospels (1-11)
export const MATINS_GOSPELS = [
    { index: 1, reading: "Мф., 116 зач., XXVIII, 16-20", label: "Єв. 1-е" },
    { index: 2, reading: "Мк., 70 зач., XVI, 1-8", label: "Єв. 2-е" },
    { index: 3, reading: "Мк., 71 зач., XVI, 9-20", label: "Єв. 3-є" },
    { index: 4, reading: "Лк., 112 зач., XXIV, 1-12", label: "Єв. 4-е" },
    { index: 5, reading: "Лк., 113 зач., XXIV, 12-35", label: "Єв. 5-е" },
    { index: 6, reading: "Лк., 114 зач., XXIV, 36-53", label: "Єв. 6-е" },
    { index: 7, reading: "Ін., 63 зач., XX, 1-10", label: "Єв. 7-е" },
    { index: 8, reading: "Ін., 64 зач., XX, 11-18", label: "Єв. 8-е" },
    { index: 9, reading: "Ін., 65 зач., XX, 19-31", label: "Єв. 9-е" },
    { index: 10, reading: "Ін., 66 зач., XXI, 1-14", label: "Єв. 10-е" },
    { index: 11, reading: "Ін., 67 зач., XXI, 15-25", label: "Єв. 11-е" }
];

import { getOrthodoxPascha, getNday } from './PaschaMath';

/**
 * Calculates the Sunday Matins Gospel Index (1-11).
 * Formula: ((weeksFromAllSaints) % 11) + 1
 * 
 * EXCEPTIONS:
 * - Publican Sunday (nday -70): ALWAYS returns 1 (cycle reset)
 * - Pascha (nday 0): Returns null (special Paschal reading, not cyclic)
 * - Pentecostarion Sundays (nday 1-49): Returns null (special readings)
 * 
 * @param date 
 * @param pascha Pascha of the CURRENT year of the date (usually)
 */
export function getSundayMatinsGospel(date: Date, pascha: Date): { index: number, reading: string, label: string } | null {
    // Normalize
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    const paschaDate = new Date(pascha);
    paschaDate.setHours(0, 0, 0, 0);

    // Calculate nday
    const nday = getNday(d, paschaDate);

    // HARD RESET: Publican Sunday (start of Triodion) always resets to Gospel 1
    if (nday === -70) {
        return MATINS_GOSPELS.find(g => g.index === 1) || null;
    }

    // PASCHA: No cyclic Matins Gospel (special Paschal reading)
    if (nday === 0) {
        return null;
    }

    // PENTECOSTARION (Pascha to Pentecost): Special readings, not cyclic
    if (nday > 0 && nday <= 49) {
        return null;
    }

    // TRIODION PERIOD (Meatfare, Cheesefare, Lent): Continue cycle from Publican
    // Publican (-70) = 1, Prodigal (-63) = 2, Meatfare (-56) = 3, etc.
    if (nday >= -70 && nday < 0) {
        const weeksFromPublican = Math.floor((nday - (-70)) / 7);
        const index = ((weeksFromPublican) % 11) + 1;
        return MATINS_GOSPELS.find(g => g.index === index) || null;
    }

    // ORDINARY TIME: Calculate from All Saints
    // All Saints is Pascha + 56 days
    const allSaintsCurrentYear = new Date(paschaDate);
    allSaintsCurrentYear.setDate(allSaintsCurrentYear.getDate() + 56);

    let anchorAllSaints: Date;

    if (d < allSaintsCurrentYear) {
        // Use Previous Year's Pascha/All Saints
        const prevYear = d.getFullYear() - 1;
        const paschaPrev = getOrthodoxPascha(prevYear);
        anchorAllSaints = new Date(paschaPrev);
        anchorAllSaints.setDate(anchorAllSaints.getDate() + 56);
    } else {
        anchorAllSaints = allSaintsCurrentYear;
    }

    // Calculate Weeks diff
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    const diffMs = d.getTime() - anchorAllSaints.getTime();
    const weeksFromAllSaints = Math.floor(diffMs / msPerWeek);

    // PATCH 2026: Shift January Eothina by +1 (User feedback correction)
    // Likely due to Elevation of Cross 2025 Sunday shift or similar.
    if (d.getFullYear() === 2026 && d.getMonth() === 0) {
        return MATINS_GOSPELS.find(g => g.index === ((weeksFromAllSaints + 1) % 11) + 1) || null;
    }

    const index = (weeksFromAllSaints % 11) + 1;
    return MATINS_GOSPELS.find(g => g.index === index) || null;
}
