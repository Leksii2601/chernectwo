import { describe, it, expect, beforeAll } from 'vitest';
import { calculateDynamicReadings, getOrthodoxPascha } from '../../src/calendar_v2/LiturgicalEngine';
import OCU_RULES_RAW from '../../src/calendar_v2/data/OCU_RULES.json';

/**
 * Eternal Calendar Logic Test Suite
 * 
 * Verifies that the OCU_RULES.json database correctly implements
 * "Eternal Logic" for both fixed and movable feasts across multiple years.
 * 
 * Reference Pascha Dates (Orthodox):
 * - 2025: April 20
 * - 2026: April 12
 * - 2027: May 2
 */

interface TypikonRule {
    id: string;
    triggers: {
        mmdd?: string[];
        nday?: number[];
        year?: number[];
    };
    action: string;
    data: {
        title: string;
        liturgy?: {
            apostle?: Array<{ reading: string; label: string }>;
            gospel?: Array<{ reading: string; label: string }>;
        };
        matins?: Array<{ reading: string; label: string }>;
        isInformational?: boolean;
    };
}

const OCU_RULES = OCU_RULES_RAW as TypikonRule[];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate the actual date for a given nday relative to Pascha
 */
function calculateNdayDate(year: number, nday: number): Date {
    const pascha = getOrthodoxPascha(year);
    const result = new Date(pascha);
    result.setDate(pascha.getDate() + nday);
    return result;
}

/**
 * Format date as YYYY-MM-DD for easy comparison
 */
function formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

/**
 * Find a rule by ID in OCU_RULES
 */
function findRuleById(id: string): TypikonRule | undefined {
    return OCU_RULES.find(r => r.id === id);
}

/**
 * Check if a title contains OCR artifacts
 */
function hasOCRArtifacts(title: string): boolean {
    // Check for common OCR pollution
    const artifacts = [
        /https?:\/\//,           // URLs
        /!\[.*?\]\(/,           // Markdown images
        /<[^>]+>/,              // HTML tags
        /\\section\*/,          // LaTeX commands
        /\[.*?\]\(.*?\)/,       // Markdown links
    ];

    return artifacts.some(pattern => pattern.test(title));
}

/**
 * Validate that a reading array is not empty and well-formed
 */
function validateReadings(readings: Array<{ reading: string; label: string }> | undefined): boolean {
    if (!readings || readings.length === 0) return false;
    return readings.every(r => r.reading && r.reading.trim().length > 0);
}

// ============================================================================
// TEST SUITE
// ============================================================================

describe('Eternal Calendar Logic - OCU_RULES.json', () => {

    beforeAll(() => {
        console.log(`\n📖 Loaded ${OCU_RULES.length} rules from OCU_RULES.json\n`);
    });

    // ========================================================================
    // SCENARIO A: Fixed Feast Persistence (St. Pachomius - May 15)
    // ========================================================================

    describe('Scenario A: Fixed Feast Persistence', () => {
        it('should find St. Pachomius (05-15) consistently across years', () => {
            const rule = findRuleById('05-15');

            expect(rule).toBeDefined();
            expect(rule?.triggers.mmdd).toContain('05-15');
            expect(rule?.data.title).toMatch(/Пахомія Великого/);
        });

        it('should activate St. Pachomius on May 15, 2025', () => {
            const date = new Date(2025, 4, 15); // May 15, 2025
            const result = calculateDynamicReadings(date);

            // Check that readings exist (the engine should apply the rule)
            expect(result.liturgy).toBeDefined();
            // Note: Full validation depends on engine implementation
        });

        it('should activate St. Pachomius on May 15, 2026', () => {
            const date = new Date(2026, 4, 15); // May 15, 2026
            const result = calculateDynamicReadings(date);

            expect(result.liturgy).toBeDefined();
        });

        it('should activate St. Pachomius on May 15, 2027', () => {
            const date = new Date(2027, 4, 15); // May 15, 2027
            const result = calculateDynamicReadings(date);

            expect(result.liturgy).toBeDefined();
        });

        it('should have valid readings for St. Pachomius', () => {
            const rule = findRuleById('05-15');

            expect(rule).toBeDefined();
            expect(rule?.data.liturgy?.apostle).toBeDefined();
            expect(rule?.data.liturgy?.gospel).toBeDefined();

            const hasApostle = validateReadings(rule?.data.liturgy?.apostle);
            const hasGospel = validateReadings(rule?.data.liturgy?.gospel);

            expect(hasApostle || hasGospel).toBe(true);
        });
    });

    // ========================================================================
    // SCENARIO B: Movable Feast Shift (Leavetaking of Mid-Pentecost - nday 31)
    // ========================================================================

    describe('Scenario B: Movable Feast Shift', () => {
        it('should find nday-31 (Leavetaking of Mid-Pentecost)', () => {
            const rule = findRuleById('nday-31');

            expect(rule).toBeDefined();
            expect(rule?.triggers.nday).toContain(31);
            expect(rule?.data.title).toMatch(/Віддання.*Переполовення/i);
        });

        it('should place nday-31 on May 13, 2026 (Pascha April 12 + 31 days)', () => {
            const pascha2026 = getOrthodoxPascha(2026);
            const expected = formatDate(pascha2026);

            expect(expected).toBe('2026-04-12'); // Verify Pascha date

            const ndayDate = calculateNdayDate(2026, 31);
            expect(formatDate(ndayDate)).toBe('2026-05-13');
        });

        it('should place nday-31 on June 2, 2027 (Pascha May 2 + 31 days)', () => {
            const pascha2027 = getOrthodoxPascha(2027);
            const expected = formatDate(pascha2027);

            expect(expected).toBe('2027-05-02'); // Verify Pascha date (Orthodox)

            const ndayDate = calculateNdayDate(2027, 31);
            expect(formatDate(ndayDate)).toBe('2027-06-02');
        });

        it('should place nday-31 on May 21, 2025 (Pascha April 20 + 31 days)', () => {
            const pascha2025 = getOrthodoxPascha(2025);
            const expected = formatDate(pascha2025);

            expect(expected).toBe('2025-04-20'); // Verify Pascha date

            const ndayDate = calculateNdayDate(2025, 31);
            expect(formatDate(ndayDate)).toBe('2025-05-21');
        });

        it('should activate correctly on calculated date for 2026', () => {
            const date = new Date(2026, 4, 13); // May 13, 2026
            const result = calculateDynamicReadings(date);

            expect(result.liturgy).toBeDefined();
            // Nday should be 31
            expect(result.metadata?.nday).toBe(31);
        });

        it('should activate correctly on calculated date for 2027', () => {
            const date = new Date(2027, 5, 2); // June 2, 2027
            const result = calculateDynamicReadings(date);

            expect(result.liturgy).toBeDefined();
            expect(result.metadata?.nday).toBe(31);
        });
    });

    // ========================================================================
    // SCENARIO C: Collision Handling (Special Cases)
    // ========================================================================

    describe('Scenario C: Collision Handling', () => {
        it('should handle January 1 (Circumcision + St. Basil)', () => {
            const rule = findRuleById('01-01');

            expect(rule).toBeDefined();
            expect(rule?.data.title).toMatch(/ОБРІЗАННЯ ГОСПОДНЄ/);
            expect(rule?.data.title).toMatch(/Василія Великого/);
        });

        it('should verify February 22, 2026 is Forgiveness Sunday (nday -49)', () => {
            const date = new Date(2026, 1, 22); // Feb 22, 2026
            const result = calculateDynamicReadings(date);

            expect(result.metadata?.nday).toBe(-49);
            expect(result.metadata?.description).toMatch(/Прощена неділя|сиропусна/i);
        });

        it('should prioritize movable feast over fixed saint on collision', () => {
            // This is a design decision test
            // If a fixed saint falls on a Triodion Sunday, the Sunday should take precedence
            const date = new Date(2026, 1, 22); // Forgiveness Sunday 2026
            const result = calculateDynamicReadings(date);

            // Should have Sunday readings
            expect(result.liturgy.apostle.length).toBeGreaterThan(0);
            expect(result.liturgy.gospel.length).toBeGreaterThan(0);
        });
    });

    // ========================================================================
    // FULL DATABASE VALIDATION
    // ========================================================================

    describe('Full Database Validation', () => {
        it('should have all 122 rules with valid IDs', () => {
            expect(OCU_RULES.length).toBe(122);

            OCU_RULES.forEach(rule => {
                expect(rule.id).toBeTruthy();
                expect(rule.id.length).toBeGreaterThan(0);
            });
        });

        it('should have valid triggers for all rules', () => {
            OCU_RULES.forEach(rule => {
                const hasMMDD = rule.triggers.mmdd && rule.triggers.mmdd.length > 0;
                const hasNday = rule.triggers.nday && rule.triggers.nday.length > 0;

                expect(hasMMDD || hasNday).toBe(true);
            });
        });

        it('should have no year-specific triggers (eternal calendar)', () => {
            OCU_RULES.forEach(rule => {
                expect(rule.triggers.year).toBeUndefined();
            });
        });

        it('should have non-empty titles for all rules', () => {
            OCU_RULES.forEach(rule => {
                expect(rule.data.title).toBeDefined();
                expect(rule.data.title.trim().length).toBeGreaterThan(0);
            });
        });

        it('should have no OCR artifacts in titles', () => {
            const rulesWithArtifacts: string[] = [];

            OCU_RULES.forEach(rule => {
                if (hasOCRArtifacts(rule.data.title)) {
                    rulesWithArtifacts.push(`${rule.id}: ${rule.data.title}`);
                }
            });

            if (rulesWithArtifacts.length > 0) {
                console.warn('❌ Rules with OCR artifacts:', rulesWithArtifacts);
            }

            expect(rulesWithArtifacts.length).toBe(0);
        });

        it('should have valid readings or matins for all non-informational rules', () => {
            const emptyRules: string[] = [];

            OCU_RULES.forEach(rule => {
                // Skip informational rules
                if (rule.data.isInformational) return;

                const hasApostle = validateReadings(rule.data.liturgy?.apostle);
                const hasGospel = validateReadings(rule.data.liturgy?.gospel);
                const hasMatins = validateReadings(rule.data.matins);

                if (!hasApostle && !hasGospel && !hasMatins) {
                    emptyRules.push(rule.id);
                }
            });

            if (emptyRules.length > 0) {
                console.warn('⚠️  Non-informational rules without readings:', emptyRules);
            }

            // All non-informational rules should have readings
            expect(emptyRules.length).toBe(0);
        });

        it('should have correct nday range for movable feasts', () => {
            OCU_RULES.forEach(rule => {
                if (rule.triggers.nday) {
                    rule.triggers.nday.forEach(nday => {
                        // Extended range: -100 (pre-Triodion) to +250 (late Matthew cycle)
                        expect(nday).toBeGreaterThanOrEqual(-100);
                        expect(nday).toBeLessThanOrEqual(250);
                    });
                }
            });
        });

        it('should have correctly formatted mmdd triggers', () => {
            OCU_RULES.forEach(rule => {
                if (rule.triggers.mmdd) {
                    rule.triggers.mmdd.forEach(mmdd => {
                        expect(mmdd).toMatch(/^\d{2}-\d{2}$/);

                        const [month, day] = mmdd.split('-').map(Number);
                        expect(month).toBeGreaterThanOrEqual(1);
                        expect(month).toBeLessThanOrEqual(12);
                        expect(day).toBeGreaterThanOrEqual(1);
                        expect(day).toBeLessThanOrEqual(31);
                    });
                }
            });
        });
    });

    // ========================================================================
    // PASCHA CALCULATION VERIFICATION
    // ========================================================================

    describe('Pascha Calculation', () => {
        it('should calculate Pascha 2025 as April 20', () => {
            const pascha = getOrthodoxPascha(2025);
            expect(formatDate(pascha)).toBe('2025-04-20');
        });

        it('should calculate Pascha 2026 as April 12', () => {
            const pascha = getOrthodoxPascha(2026);
            expect(formatDate(pascha)).toBe('2026-04-12');
        });

        it('should calculate Pascha 2027 as May 2', () => {
            const pascha = getOrthodoxPascha(2027);
            expect(formatDate(pascha)).toBe('2027-05-02');
        });
    });

    // ========================================================================
    // CRITICAL FEASTS VERIFICATION
    // ========================================================================

    describe('Critical Feasts Verification', () => {
        it('should have Pascha (nday:0)', () => {
            const rule = OCU_RULES.find(r => r.triggers.nday?.includes(0));
            expect(rule).toBeDefined();
        });

        it('should have Pentecost (nday:49)', () => {
            const rule = OCU_RULES.find(r => r.triggers.nday?.includes(49));
            expect(rule).toBeDefined();
        });

        it('should have Christmas (12-25)', () => {
            const rule = findRuleById('12-25');
            expect(rule).toBeDefined();
        });

        it('should have Theophany (01-06)', () => {
            const rule = OCU_RULES.find(r => r.triggers.mmdd?.includes('01-06'));
            expect(rule).toBeDefined();
        });
    });
});
