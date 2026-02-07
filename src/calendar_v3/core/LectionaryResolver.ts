import { getNday } from './PaschaMath';

/**
 * Lectionary Resolver
 * Determines the correct reading key (Week + Day) for the "Ordinary Time"
 * (Matthew and Luke cycles), handling the crucial "Lukan Jump".
 */

/**
 * Calculates the lectionary key for a given date.
 * Does NOT rely on gap_map.json.
 * 
 * Logic:
 * 1. Matthew Cycle: Starts after Pentecost.
 * 2. Luke Cycle: Starts on the Monday after the Sunday after the Exaltation of the Cross.
 * 3. Acts Cycle (Pentecostarion): Handles the period from Pascha to Pentecost.
 * 
 * @param date - The date to check (will be normalized to midnight)
 * @param pascha - The Orthodox Pascha date for final reference (used for Matthew calculation base)
 * @returns Key string, e.g., "181" (Week 18, Monday) or "30" (Week 3, Sunday - if standard format matches)
 *          Format is strictly "{WeekIndex}{DayOfWeek}" (0=Sun, 1=Mon...).
 */
export function getLectionaryKey(date: Date, pascha: Date): string {
    // Normalize dates to midnight to avoid time-of-day math errors
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    const paschaDate = new Date(pascha);
    paschaDate.setHours(0, 0, 0, 0);

    const dow = currentDate.getDay(); // 0 = Sunday, 1 = Monday...

    // 2. Determine "Luke Start" (Lukan Jump) based on User Algorithm:
    // "Monday after 17th Sunday after Pentecost"
    // 17th Sum after Pent = Pascha + 49 (Pentecost) + (17 * 7) days
    const nday = getNday(currentDate, paschaDate);

    // Pentecost is nday 49.
    // 17th Sunday after Pentecost is nday = 49 + (17 * 7) = 49 + 119 = 168.
    // The "Monday after" is nday = 169.
    const startOfLukeNday = 169;


    // THEOPHANY SUNDAY LOGIC
    // Sundays between Jan 2-5 are "Sunday Before Theophany".
    // Sundays between Jan 7-13 are "Sunday After Theophany".
    const m = currentDate.getMonth(); // 0-11
    const d = currentDate.getDate();
    if (m === 0 && dow === 0) { // January Sunday
        if (d >= 2 && d <= 5) return "SUNDAY_BEFORE_THEOPHANY";
        if (d >= 7 && d <= 13) return "SUNDAY_AFTER_THEOPHANY";
    }

    // NATIVITY SUNDAY LOGIC (DECEMBER)
    if (m === 11 && dow === 0) { // December Sunday
        // Sunday Before Nativity (Holy Fathers): Dec 18-24
        if (d >= 18 && d <= 24) return "SUNDAY_BEFORE_NATIVITY";
        // Sunday After Nativity (David, Joseph, James): Dec 26-31
        if (d >= 26 && d <= 31) return "SUNDAY_AFTER_NATIVITY";
    }

    // Special Overrides for Clarity (Semantic Mapping)
    // Pascha itself (nday 0) matches key "-70" in lectionary_triodion.json
    if (nday === 0) return "-70";

    // 2a. Holy Week (-6 to -1)
    if (nday >= -6 && nday < 0) {
        return nday.toString();
    }

    // 2b. Triodion / Pre-Lent / Lent Period
    // Includes:
    // - Cheesefare (-49)
    // - Meatfare (-56)
    // - Prodigal (-63)
    // - Publican (-70)
    // - AND the weeks of Luke prior to Publican (Weeks 32, 31, 30...)
    // - AND Great Lent (Week 1 to Palm Sunday)

    if (nday < -6) {
        // Special case: Lazarus Saturday (-8)
        if (nday === -8) return "426";

        const weeksFromPublican = Math.floor((nday - (-70)) / 7);

        // Base calculation
        let weekBase = 330 + (weeksFromPublican * 10);

        // CORRECTION LOGIC 2026:
        // From Publican (-70) onwards: Weekdays lead by 1 week (+10 keys).
        // Before Publican (< -70): Weekdays lag by 1 week (-10 keys) TO FIX JAN 12 ISSUE

        if (dow !== 0) {
            if (nday >= -70) {
                weekBase += 10;
            } else {
                weekBase -= 10;
            }
        }

        const key = weekBase + dow;
        return key.toString();
    }

    // 2c. Acts Cycle (Pentecostarion): Pascha + 1 to Pentecost
    if (nday > 0 && nday < 49) {
        let weekIndex = Math.floor((nday - 49) / 7);
        if (dow !== 0) {
            weekIndex += 1;
        }
        return `${weekIndex}${dow}`;
    }

    // 3. Resolve Cycle (Ordinary Time)
    if (nday >= startOfLukeNday) {
        // --- LUKE CYCLE ---
        const weeksElapsed = Math.floor((nday - startOfLukeNday) / 7);
        const weekIndex = 18 + weeksElapsed;
        return `${weekIndex}${dow}`;
    } else {
        // --- MATTHEW CYCLE ---
        const weeksFromPentecost = Math.floor((nday - 49) / 7);
        let weekIndex = weeksFromPentecost;
        if (dow !== 0) {
            weekIndex += 1;
        }
        return `${weekIndex}${dow}`;
    }
}
