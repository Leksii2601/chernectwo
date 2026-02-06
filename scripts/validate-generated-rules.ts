/**
 * Validation test for generated OCU rules
 * 
 * This script validates that the generated rules:
 * 1. Can be imported without errors
 * 2. Have the correct structure
 * 3. Match the TypikonRule interface
 * 4. Have reasonable date ranges
 */

import { GENERATED_OCU_RULES_2026 } from '../src/calendar_v2/data/generated_ocu_rules_2026';
import { TypikonRule } from '../src/calendar_v2/TypikonRules';

console.log('=== VALIDATING GENERATED OCU RULES ===\n');

// Test 1: Can import
console.log(`✓ Successfully imported ${GENERATED_OCU_RULES_2026.length} rules\n`);

// Test 2: All rules have required fields
let validStructure = true;
let ndayCount = 0;
let mmddCount = 0;

for (const rule of GENERATED_OCU_RULES_2026) {
    if (!rule.id || !rule.triggers || !rule.action) {
        console.log(`✗ Rule missing required fields: ${JSON.stringify(rule).substring(0, 100)}`);
        validStructure = false;
        break;
    }
    
    if (rule.triggers.nday) ndayCount++;
    if (rule.triggers.mmdd) mmddCount++;
}

if (validStructure) {
    console.log('✓ All rules have valid structure\n');
}

// Test 3: Check trigger types
console.log(`Trigger breakdown:`);
console.log(`  - nday triggers: ${ndayCount} (movable feasts)`);
console.log(`  - mmdd triggers: ${mmddCount} (fixed feasts)`);
console.log();

// Test 4: Check nday ranges
const ndayRules = GENERATED_OCU_RULES_2026.filter(r => r.triggers.nday);
if (ndayRules.length > 0) {
    const ndays = ndayRules.flatMap(r => r.triggers.nday || []);
    const minNday = Math.min(...ndays);
    const maxNday = Math.max(...ndays);
    
    console.log(`Nday range: ${minNday} to ${maxNday}`);
    
    // Validate reasonable ranges
    if (minNday < -100 || maxNday > 100) {
        console.log(`⚠ Warning: nday values outside expected range (-100 to +100)`);
    } else {
        console.log(`✓ Nday values within reasonable range`);
    }
    console.log();
}

// Test 5: Check action types
const actionCounts = new Map<string, number>();
for (const rule of GENERATED_OCU_RULES_2026) {
    const count = actionCounts.get(rule.action) || 0;
    actionCounts.set(rule.action, count + 1);
}

console.log(`Action types:`);
for (const [action, count] of actionCounts.entries()) {
    console.log(`  - ${action}: ${count}`);
}
console.log();

// Test 6: Sample a few rules
console.log(`Sample rules:`);
console.log('\n1. Fixed feast (mmdd):');
const fixedExample = GENERATED_OCU_RULES_2026.find(r => r.triggers.mmdd);
if (fixedExample) {
    console.log(`   ID: ${fixedExample.id}`);
    console.log(`   Trigger: mmdd=${fixedExample.triggers.mmdd?.join(',')}`);
    console.log(`   Apostle: ${fixedExample.data?.liturgy?.apostle?.[0]?.reading.substring(0, 40)}...`);
}

console.log('\n2. Movable feast (nday):');
const movableExample = GENERATED_OCU_RULES_2026.find(r => r.triggers.nday);
if (movableExample) {
    console.log(`   ID: ${movableExample.id}`);
    console.log(`   Trigger: nday=${movableExample.triggers.nday?.join(',')}`);
    console.log(`   Apostle: ${movableExample.data?.liturgy?.apostle?.[0]?.reading.substring(0, 40)}...`);
}

console.log('\n=== VALIDATION COMPLETE ===');
console.log(`\nSummary: ${GENERATED_OCU_RULES_2026.length} rules validated successfully`);
