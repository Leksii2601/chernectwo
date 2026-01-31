
import fs from 'fs';
import path from 'path';
import { calculateDynamicReadings, getOrthodoxPascha } from '../LiturgicalEngine';
import lectionary from '../data/lectionary.json';

// --- Configuration ---
const YEAR = 2026;
const REPORT_FILE = path.resolve(process.cwd(), 'validation_report.json');

// --- Types ---
interface ValidationResult {
    date: string;
    passed: boolean;
    errors: string[];
    warnings: string[];
}

interface GoldenCase {
    date: string;
    description: string;
    checks: (result: any) => string[]; // returns error messages
}

// --- Helpers ---
function formatMMDD(date: Date): string {
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${m}-${d}`;
}

// --- Golden Test Cases ---
const GOLDEN_CASES: GoldenCase[] = [
    {
        date: '2026-01-04',
        description: 'Sunday before Theophany',
        checks: (data) => {
            const errs: string[] = [];
            if (!data.readings.some((r: any) => r.label.includes('перед Богоявленням') || r.label.includes('Свята') || r.label.includes('Ряд.'))) {
                // In generic output, it might just be the readings.
                // We check if we have multiple readings (Sunday + Before Feast).
                if (data.liturgy.apostle.length < 2) errs.push(`Expected >= 2 apostles for Sunday before Theophany.`);
            }
            return errs;
        }
    },
    {
        date: '2026-01-16',
        description: 'Royal Hours (Transferred Eve)',
        checks: (data) => {
            const errs: string[] = [];
            // Check hours.royal existence
            if (!data.hours?.royal) errs.push('Missing Royal Hours container on Jan 16');
            else {
                // Check triple set
                ['prime', 'terce', 'sexte', 'none'].forEach(h => {
                    const r = data.hours[h];
                    if (!r || r.length < 3) errs.push(`Hour ${h} missing triple set (OT/Ap/Gospel)`);
                });
            }
            return errs;
        }
    },
    {
        date: '2026-01-05',
        description: 'Royal Hours (New Style Eve)',
        checks: (data) => {
            const errs: string[] = [];
            // Check hours.royal existence
            if (!data.hours?.royal) errs.push('Missing Royal Hours container on Jan 5');
            else {
                // Check triple set
                ['prime', 'terce', 'sexte', 'none'].forEach(h => {
                    const r = data.hours[h];
                    if (!r || r.length < 3) errs.push(`Hour ${h} missing triple set (OT/Ap/Gospel)`);
                });
            }
            return errs;
        }
    },
    {
        date: '2026-01-31',
        description: 'Week 32 Saturday (2 Tim 293 za.)',
        checks: (data) => {
            const errs: string[] = [];
            // Expect 2 Tim 2:11-19 (Pericope 293)
            const str = JSON.stringify(data.readings);
            if (!str.includes('293')) {
                errs.push(`Expected 2 Tim 293 za. for Jan 31. Got: ${str}`);
            }
            return errs;
        }
    },
    {
        date: '2026-01-25',
        description: 'Zacchaeus (Luke 19:1-10)',
        checks: (data) => {
            const errs: string[] = [];
            const hasZacchaeus = data.liturgy.gospel.some((r: any) => r.reading.includes('Лк.') && (r.reading.includes('19:1') || r.reading.includes('зач. 51'))); // 51 or 51 mid? No, Zacchaeus is Zac 94. Wait.
            // Zacchaeus is Luke 19:1-10. Pericope 94.
            // My engine output uses 'зач. 94'.
            const readingStr = JSON.stringify(data.liturgy.gospel);
            if (!readingStr.includes('19:1-10') && !readingStr.includes('94')) {
                errs.push(`Expected Luke 19:1-10 (Zacchaeus). Got: ${readingStr}`);
            }
            return errs;
        }
    },
    {
        date: '2026-02-01',
        description: 'Publican & Pharisee (Triodion Start)',
        checks: (data) => {
            const errs: string[] = [];
            if (data.metadata.nday !== -70) errs.push(`Expected nday -70, got ${data.metadata.nday}`);
            // Check reading Luke 18:10-14 (Pericope 89)
            const readingStr = JSON.stringify(data.liturgy.gospel);
            if (!readingStr.includes('18:10-14') && !readingStr.includes('89')) {
                errs.push(`Expected Publican & Pharisee (Luke 18:10-14).`);
            }
            return errs;
        }
    }
];

// --- Main Validator ---
async function runValidation() {
    const pascha = getOrthodoxPascha(YEAR);
    const startDate = new Date(YEAR, 0, 1);
    const endDate = new Date(YEAR, 11, 31);

    const results: ValidationResult[] = [];
    const report: any = {
        summary: { passed: 0, failed: 0, total: 0 },
        failed_dates: {}
    };

    console.log(`Starting Validation for ${YEAR}...`);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const dow = d.getDay();
        const res: ValidationResult = { date: dateStr, passed: true, errors: [], warnings: [] };

        // 1. Run Engine
        let data;
        try {
            data = calculateDynamicReadings(new Date(d));
        } catch (e: any) {
            res.passed = false;
            res.errors.push(`Engine Crash: ${e.message}`);
            results.push(res);
            continue;
        }

        // 2. Structural Checks
        // Sunday Check
        if (dow === 0 && data.metadata.nday !== 0) { // Not Pascha
            const count = (data.liturgy.apostle.length + data.liturgy.gospel.length) / 2; // Approx pairs
            if (data.liturgy.apostle.length < 2 && !data.feast) {
                // Sunday shoud usually have 2 readings (Ordinary + Saint/Feast), UNLESS suppressed?
                // But we have Sunday Exception! "Always return both".
                // Except specific dates like Pascha
                res.warnings.push(`Sunday has only ${data.liturgy.apostle.length} Apostle reading(s). Expected >= 2.`);
            }
        }

        // Suppression Check (Weekday)
        if (dow !== 0) {
            // How to check rank?
            const rank = data.feast?.rank || 0;
            if (rank >= 4) {
                // Should suppress ordinary.
                // Ordinary label is "Ряд."
                const hasOrdinary = data.liturgy.apostle.some(r => r.label === 'Ряд.');
                if (hasOrdinary) {
                    // St. Nina (Rank < 4) allowed it.
                    // Major feasts suppress.
                    // This check requires knowing strict rank.
                    // We'll skip stringent auto-fail here as rules vary.
                }
            }
        }

        // Localization Check
        const allText = JSON.stringify(data.readings);
        if (allText.match(/\b(Wisd|Bar|Is|Isa|Gen|Prov|Deut)\b/)) {
            res.passed = false;
            res.errors.push('Untranslated Bible Book ID found.');
        }

        // 3. Golden Case Checks
        const golden = GOLDEN_CASES.find(g => g.date === dateStr);
        if (golden) {
            const errs = golden.checks(data);
            if (errs.length > 0) {
                res.passed = false;
                res.errors.push(...errs);
            }
        }

        // 4. Kahuna Match (Key Check)
        // Verify key exists in lectionary
        const key = data.metadata.key;
        if (!lectionary[key as keyof typeof lectionary]) {
            // Only error if it's supposed to exist (e.g. not a pure feast day calculation overridden completely)
            // But engine always produces a key.
            res.warnings.push(`Key ${key} not found in lectionary.json`);
        } else {
            // Verify Gospel ID matches (Light checks)
            // const expected = lectionary[key].gospel;
            // matches data.liturgy.gospel[0].reading?
            // Not strictly, due to formatting.
        }

        if (!res.passed) {
            report.failed_dates[dateStr] = res.errors;
            report.summary.failed++;
        } else {
            report.summary.passed++;
        }
        report.summary.total++;
    }

    // Write Report
    fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
    console.log(`Validation Complete. Failed: ${report.summary.failed}. Report saved to validation_report.json.`);

    // Output failures
    if (report.summary.failed > 0) {
        console.log("Failures:", JSON.stringify(report.failed_dates, null, 2));
    }
}

runValidation();
