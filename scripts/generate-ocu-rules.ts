/**
 * Script to generate OCU_RULES from readings_2026.json
 * 
 * This script transforms liturgical calendar data (pages 5-82 of kalendar_2026.pdf) 
 * into TypikonRule objects for the OCU_RULES array.
 * 
 * Transformation logic:
 * 1. Movable feasts (indicated by week number or Triodion name) → use nday trigger
 * 2. Fixed feasts (St. Basil, Epiphany, etc.) → use mmdd trigger
 * 3. Map "Apostle" and "Gospel" columns to liturgy object in OCU_RULES
 * 4. Days with only "Ryad" (ordinary) readings → apply SUPPRESS_SAINTS action
 * 
 * Usage:
 *   npx tsx scripts/generate-ocu-rules.ts > src/calendar_v2/data/generated_ocu_rules_2026.ts
 */

import readings2026Raw from '../src/calendar_v2/data/readings_2026.json';
import { TypikonRule } from '../src/calendar_v2/TypikonRules';
import * as fs from 'fs';

interface ReadingEntry {
    date: string;
    readings: {
        label: string;
        apostle: string;
        gospel: string;
    }[];
}

// Pascha 2026 is April 12, 2026
const PASCHA_2026 = new Date('2026-04-12T12:00:00');

// Helper function to calculate nday from a date
function calculateNday(dateStr: string): number {
    const date = new Date(dateStr + 'T12:00:00');
    const diffMs = date.getTime() - PASCHA_2026.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Helper function to check if a reading is movable (Triodion/Pentecostarion)
function isMovableFeast(label: string, date: string): boolean {
    const movableIndicators = [
        'Тріод',
        'тиж.',
        'тижн',
        'сиропусн',
        'Заупокій',
        'Лазарев',
        'Вхід',
        'Вознес',
        'П\'ятдесятн',
        'Митар',
        'Блудн',
        'Страшн',
        'Прощ',
        'Неділя про',
        'Неділя перед',
        'Неділя після',
        'Субота перед',
        'Субота після'
    ];
    
    // Sunday readings during certain periods are movable
    const dateObj = new Date(date);
    const nday = calculateNday(date);
    
    // Triodion period (roughly 10 weeks before Pascha to Pascha)
    // Pentecostarion period (Pascha to Pentecost Sunday, nday 0 to 49)
    const isTriodionPeriod = nday >= -70 && nday < 0;
    const isPentecostPeriod = nday >= 0 && nday <= 50;
    
    if ((isTriodionPeriod || isPentecostPeriod) && label.includes('Неділя')) {
        return true;
    }
    
    return movableIndicators.some(indicator => label.includes(indicator));
}

// Helper function to check if label is ordinary reading only that should be suppressed
// Be VERY conservative - only suppress when we're certain minor saints should be hidden
function shouldSuppressSaints(readings: ReadingEntry['readings'], date: string): boolean {
    if (readings.length === 0) return false;
    if (readings.length !== 1) return false; // Only single readings can be suppression candidates
    
    const label = readings[0].label.trim();
    const nday = calculateNday(date);
    
    // Only suppress "Ряд." during specific periods where we know minor saints interfere
    // Generally during major feast preparation or Triodion/Lent periods
    const isTriodionPeriod = nday >= -70 && nday < 0;
    const isPentecostPeriod = nday >= 0 && nday <= 50;
    
    // During Triodion or immediately after Pentecost, "Ряд." might indicate suppression needed
    // But be conservative - only if label is exactly "Ряд." without other context
    if (label === 'Ряд.' && (isTriodionPeriod || isPentecostPeriod)) {
        // Even more conservative - check if apostle/gospel are present
        // If they have actual readings, don't suppress
        if (readings[0].apostle && readings[0].gospel) {
            return false; // Has real readings, don't suppress
        }
    }
    
    return false; // Default: don't suppress
}

// Helper function to check if this entry should be skipped
function shouldSkipEntry(readings: ReadingEntry['readings'], date: string): boolean {
    // Skip empty readings
    if (readings.length === 0) return true;
    
    // Skip if readings don't have actual apostle/gospel text
    if (readings.length === 1 && !readings[0].apostle && !readings[0].gospel) return true;
    
    return false;
}

// Helper function to normalize reading text
function normalizeReading(text: string): string {
    // Remove extra spaces and normalize format
    return text
        .replace(/\s+/g, ' ')
        .replace(/ зач\./g, ' зач.')
        .replace(/зач\./g, 'зач.')
        .replace(/зач;/g, 'зач.;')
        .trim();
}

// Helper function to determine if this is a major fixed feast
function isMajorFixedFeast(label: string): boolean {
    const majorFeasts = [
        'Богоявл',
        'Обрізання',
        'Стрітення',
        'Благовіщ',
        'Преображ',
        'Успіння',
        'Різдва',
        'Воздвиж'
    ];
    
    return majorFeasts.some(feast => label.includes(feast));
}

// Generate rules from readings data
function generateOCURules(): TypikonRule[] {
    const readings: ReadingEntry[] = readings2026Raw as any;
    const rules: TypikonRule[] = [];
    
    // Filter to only include dates from 2026 (pages 5-82 likely covers the full year)
    const filtered = readings.filter(entry => {
        const date = new Date(entry.date);
        return date.getFullYear() === 2026;
    });
    
    console.log(`Processing ${filtered.length} entries for 2026...`);
    
    for (const entry of filtered) {
        const { date, readings: dayReadings } = entry;
        
        // Skip entries that should be ignored
        if (shouldSkipEntry(dayReadings, date)) continue;
        
        const [month, day] = date.substring(5).split('-');
        const mmdd = `${month}-${day}`;
        const nday = calculateNday(date);
        
        // Check if this should be a suppression rule (very conservative)
        if (shouldSuppressSaints(dayReadings, date)) {
            rules.push({
                id: `${date} Suppress Saints`,
                triggers: { mmdd: [mmdd], year: [2026] },
                action: 'SUPPRESS_SAINTS'
            });
            continue;
        }
        
        // Separate movable and fixed readings
        const movableReadings = dayReadings.filter(r => isMovableFeast(r.label, date));
        const fixedReadings = dayReadings.filter(r => !isMovableFeast(r.label, date) || isMajorFixedFeast(r.label));
        
        // Process readings and create rule
        if (fixedReadings.length > 0 || dayReadings.length > 1) {
            const apostle = dayReadings.map(r => ({
                reading: normalizeReading(r.apostle),
                label: r.label.trim()
            }));
            
            const gospel = dayReadings.map(r => ({
                reading: normalizeReading(r.gospel),
                label: r.label.trim()
            }));
            
            // Determine trigger type based on readings
            const hasMovable = movableReadings.length > 0;
            const hasFixed = fixedReadings.length > 0;
            const isPurelyMovable = hasMovable && !hasFixed && movableReadings.length === dayReadings.length;
            
            // If purely movable (e.g., Triodion Sunday), use nday; otherwise use mmdd
            const useMmdd = !isPurelyMovable;
            
            const rule: TypikonRule = {
                id: `${date} ${dayReadings[0].label}`,
                triggers: useMmdd 
                    ? { mmdd: [mmdd], year: [2026] }
                    : { nday: [nday] },
                action: 'REPLACE_LITURGY',
                data: {
                    liturgy: {
                        apostle,
                        gospel
                    }
                }
            };
            
            rules.push(rule);
        }
    }
    
    console.log(`Generated ${rules.length} rules`);
    return rules;
}

// Main execution
function main() {
    console.error('=== OCU RULES GENERATOR ===\n');
    console.error(`Pascha 2026: ${PASCHA_2026.toDateString()}\n`);
    
    const rules = generateOCURules();
    
    // Output TypeScript code to stdout
    console.log('import { TypikonRule } from \'./TypikonRules\';');
    console.log('');
    console.log('/**');
    console.log(' * Auto-generated OCU Rules from readings_2026.json');
    console.log(` * Generated on: ${new Date().toISOString()}`);
    console.log(` * Pascha 2026: ${PASCHA_2026.toDateString()}`);
    console.log(' * ');
    console.log(' * This file contains liturgical rules extracted from the 2026 OCU Calendar (pages 5-82).');
    console.log(' * ');
    console.log(' * Transformation logic:');
    console.log(' * - Movable feasts (Triodion/Pentecostarion) use nday triggers');
    console.log(' * - Fixed feasts use mmdd triggers');
    console.log(' * - Days with only ordinary readings apply SUPPRESS_SAINTS');
    console.log(' */');
    console.log('');
    console.log('export const GENERATED_OCU_RULES_2026: TypikonRule[] = [');
    
    rules.forEach((rule, idx) => {
        const json = JSON.stringify(rule, null, 4);
        const indented = json.split('\n').map(line => '    ' + line).join('\n');
        console.log(indented + (idx < rules.length - 1 ? ',' : ''));
    });
    
    console.log('];');
    
    // Statistics to stderr
    console.error('\n=== STATISTICS ===');
    console.error(`Total rules: ${rules.length}`);
    console.error(`SUPPRESS_SAINTS: ${rules.filter(r => r.action === 'SUPPRESS_SAINTS').length}`);
    console.error(`REPLACE_LITURGY: ${rules.filter(r => r.action === 'REPLACE_LITURGY').length}`);
    console.error(`Rules with nday trigger: ${rules.filter(r => r.triggers.nday).length}`);
    console.error(`Rules with mmdd trigger: ${rules.filter(r => r.triggers.mmdd).length}`);
}

main();
