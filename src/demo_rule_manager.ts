/**
 * LiturgicalRuleManager Usage Demo
 * 
 * Demonstrates the high-performance rule lookup system for the eternal calendar.
 */

import { LiturgicalRuleManager } from './calendar_v2/TypikonRules';

console.log('\n🕊️  Liturgical Rule Manager Demo\n');
console.log('='.repeat(60));

// ============================================================================
// 1. INITIALIZE MANAGER (Singleton - loads once)
// ============================================================================

const manager = LiturgicalRuleManager.getInstance();
const stats = manager.getStatistics();

console.log('\n📊 Database Statistics:');
console.log(`   Total Rules: ${stats.total}`);
console.log(`   With Readings: ${stats.withReadings}`);
console.log(`   Informational: ${stats.informational}`);

// ============================================================================
// 2. PASCHA 2026: April 12
// ============================================================================

const pascha2026 = new Date(2026, 3, 12); // April 12, 2026
console.log('\n🌟 Pascha 2026:', pascha2026.toDateString());

const paschaRules = manager.getRulesForDate(pascha2026, pascha2026);
console.log(`   Found ${paschaRules.length} rule(s):`);
paschaRules.forEach(rule => {
    console.log(`   - ${rule.data.title}`);
    if (rule.data.liturgy?.gospel?.[0]) {
        console.log(`     Gospel: ${rule.data.liturgy.gospel[0].reading}`);
    }
});

//============================================================================
// 3. PENTECOST 2026: May 31 (Pascha + 49 days)
// ============================================================================

const pentecost2026 = new Date(2026, 4, 31); // May 31, 2026
console.log('\n🕊️  Pentecost 2026:', pentecost2026.toDateString());

const pentecostRules = manager.getRulesForDate(pentecost2026, pascha2026);
console.log(`   Found ${pentecostRules.length} rule(s):`);
pentecostRules.forEach(rule => {
    console.log(`   - ${rule.data.title}`);
    if (rule.data.liturgy?.apostle?.[0]) {
        console.log(`     Apostle: ${rule.data.liturgy.apostle[0].reading}`);
    }
});

// ============================================================================
// 4. FIXED FEAST: St. Pachomius (May 15)
// ============================================================================

const stPachomius = new Date(2026, 4, 15); // May 15, 2026
console.log('\n📿 St. Pachomius (May 15, 2026):', stPachomius.toDateString());

const pachomiusRules = manager.getRulesForDate(stPachomius, pascha2026);
console.log(`   Found ${pachomiusRules.length} rule(s):`);
pachomiusRules.forEach(rule => {
    console.log(`   - ${rule.data.title}`);
});

// ============================================================================
// 5. MOVABLE FEAST: Leavetaking of Mid-Pentecost (nday: 31)
// ============================================================================

console.log('\n🎊 Leavetaking of Mid-Pentecost (nday: 31)');

// Calculate date: Pascha + 31 days
const leavetaking = new Date(pascha2026);
leavetaking.setDate(leavetaking.getDate() + 31);
console.log(`   Date in 2026: ${leavetaking.toDateString()}`);

const leavetakingRules = manager.getRulesForDate(leavetaking, pascha2026);
console.log(`   Found ${leavetakingRules.length} rule(s):`);
leavetakingRules.forEach(rule => {
    console.log(`   - ${rule.data.title}`);
});

// ============================================================================
// 6. COLLISION EXAMPLE: Check for multiple rules on same date
// ============================================================================

const jan1 = new Date(2026, 0, 1);
console.log('\n⚖️  Collision Test (Jan 1):', jan1.toDateString());

const jan1Rules = manager.getRulesForDate(jan1, pascha2026);
console.log(`   Found ${jan1Rules.length} rule(s) (priority-sorted):`);
jan1Rules.forEach((rule, index) => {
    console.log(`   ${index + 1}. ${rule.data.title} (Priority: ${rule.priority ?? 5})`);
});

// ============================================================================
// 7. FILTER INFORMATIONAL RULES
// ============================================================================

const jan7 = new Date(2026, 0, 7);
console.log('\n📖 January 7 (Synaxis of John the Baptist):');

const allJan7Rules = manager.getRulesForDate(jan7, pascha2026);
const readingsOnlyJan7 = manager.getReadingsOnly(jan7, pascha2026);

console.log(`   All rules: ${allJan7Rules.length}`);
console.log(`   With readings: ${readingsOnlyJan7.length}`);

readingsOnlyJan7.forEach(rule => {
    console.log(`   - ${rule.data.title}`);
});

// ============================================================================
// 8. PERFORMANCE TEST: Lookup 100 random dates
// ============================================================================

console.log('\n⚡ Performance Test (100 random lookups):');

const startTime = Date.now();
for (let i = 0; i < 100; i++) {
    const randomDate = new Date(2026, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    manager.getRulesForDate(randomDate, pascha2026);
}
const endTime = Date.now();

console.log(`   Completed in ${endTime - startTime}ms`);
console.log(`   Average: ${((endTime - startTime) / 100).toFixed(2)}ms per lookup`);

// ============================================================================
// 9. DIRECT LOOKUP BY ID
// ============================================================================

console.log('\n🔍 Direct Lookup Examples:');

const paschaById = manager.getRuleById('nday-0');
console.log(`   nday-0: ${paschaById?.data.title}`);

const christmas = manager.getRuleById('12-25');
console.log(`   12-25: ${christmas?.data.title ?? 'Not found'}`);

const theophany = manager.getRulesByMMDD('01-06');
console.log(`   01-06: Found ${theophany.length} rule(s)`);

// ============================================================================
// 10. ETERNAL CALENDAR VERIFICATION (2025-2027)
// ============================================================================

console.log('\n🌍 Eternal Calendar Verification:');

const paschas = [
    { year: 2025, date: new Date(2025, 3, 20) }, // April 20
    { year: 2026, date: new Date(2026, 3, 12) }, // April 12
    { year: 2027, date: new Date(2027, 4, 2) }   // May 2
];

paschas.forEach(({ year, date }) => {
    const nday31 = new Date(date);
    nday31.setDate(nday31.getDate() + 31);

    const rules = manager.getRulesForDate(nday31, date);
    console.log(`   ${year}: nday-31 on ${nday31.toDateString()} → ${rules[0]?.data.title ?? 'Not found'}`);
});

console.log('\n' + '='.repeat(60));
console.log('✅ Demo Complete!\n');
