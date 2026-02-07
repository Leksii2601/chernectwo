# LiturgicalRuleManager - Production Documentation

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Database:** OCU_RULES.json (122 eternal rules, validated 2025-2027)

---

## Overview

The **LiturgicalRuleManager** is a high-performance TypeScript class for managing liturgical rules in the OCU (Orthodox Church of Ukraine) eternal calendar system. It provides fast, indexed lookups for both fixed (mmdd) and movable (nday) feasts.

---

## Key Features

### 🚀 **Performance**
- **Singleton Pattern**: Rules loaded once, cached in memory
- **Hash Map Indexing**: O(1) lookup for both nday and mmdd triggers
- **Average lookup time**: 0.01ms per query (tested with 100 random dates)

### 📅 **Eternal Calendar Logic**
- **Fixed Feasts**: Triggered by MM-DD dates (e.g., Christmas: 12-25)
- **Movable Feasts**: Triggered by days relative to Pascha (e.g., Pentecost: nday+49)
- **Year-agnostic**: Works for any year with valid Pascha calculation

### 🎯 **Smart Filtering**
- **Informational Rules**: 49 rules tagged with `isInformational: true`
- **Reading Rules**: 73 rules with actual liturgical readings
- **Priority System**: Collision resolution for overlapping rules

---

## Architecture

### Class Structure

```typescript
LiturgicalRuleManager
├── rules: TypikonRule[]           // All 122 rules
├── ndayIndex: Map<number, Rule[]> // Fast nday lookup (35 keys)
├── mmddIndex: Map<string, Rule[]> // Fast mmdd lookup (86 keys)
└── Methods:
    ├── getRulesForDate()          // Main lookup method
    ├── getReadingsOnly()          // Filter informational rules
    ├── getRuleById()              // Direct ID lookup
    ├── getRulesByNday()           // Query by nday
    ├── getRulesByMMDD()           // Query by mmdd
    └── getStatistics()            // Database stats
```

### TypikonRule Interface

```typescript
interface TypikonRule {
    id: string;                    // "nday-0", "05-15", etc.
    triggers: {
        mmdd?: string[];           // ["01-01", "12-25"]
        nday?: number[];           // [0, 49, -49]
        year?: number[];           // [2026] (rare, for corrections)
    };
    action: TypikonAction;         // 'REPLACE_LITURGY', etc.
    data: {
        title: string;             // Feast/saint name
        liturgy?: LiturgyBlock;    // Apostle & Gospel readings
        matins?: ReadingDefinition[];
        isInformational?: boolean; // True for instructions
    };
    priority?: number;             // For collision resolution
}
```

---

## Usage Examples

### 1. Basic Initialization

```typescript
import { LiturgicalRuleManager } from './calendar_v2/TypikonRules.ts';

// Get singleton instance (loads rules on first call)
const manager = LiturgicalRuleManager.getInstance();

// Check statistics
const stats = manager.getStatistics();
console.log(`Total: ${stats.total}`);           // 122
console.log(`With Readings: ${stats.withReadings}`); // 73
console.log(`Informational: ${stats.informational}`); // 49
```

### 2. Find Rules for a Date

```typescript
// Define Pascha for the year
const pascha2026 = new Date(2026, 3, 12); // April 12, 2026

// Find rules for May 15, 2026 (St. Pachomius)
const date = new Date(2026, 4, 15);
const rules = manager.getRulesForDate(date, pascha2026);

rules.forEach(rule => {
    console.log(rule.data.title);
    // "Прп. Пахомія Великого (348)."
});
```

### 3. Movable Feasts (nday-based)

```typescript
const pascha2026 = new Date(2026, 3, 12);

// Pentecost = Pascha + 49 days
const pentecost = new Date(2026, 4, 31); // May 31
const rules = manager.getRulesForDate(pentecost, pascha2026);

console.log(rules[0].data.title);
// "ДЕНЬ СВЯТОЇ ТРОЙЦІ. П'ЯТДЕСЯТНИЦЯ."

console.log(rules[0].data.liturgy?.apostle[0].reading);
// "Діян., 3 зач.; ІІ, 1-11."
```

### 4. Filter Informational Rules

```typescript
// Get only rules with actual readings (no instructions)
const readingRules = manager.getReadingsOnly(date, pascha2026);

readingRules.forEach(rule => {
    if (rule.data.liturgy?.apostle) {
        console.log('Apostle:', rule.data.liturgy.apostle[0].reading);
    }
    if (rule.data.liturgy?.gospel) {
        console.log('Gospel:', rule.data.liturgy.gospel[0].reading);
    }
});
```

### 5. Direct Lookups

```typescript
// By ID
const pascha = manager.getRuleById('nday-0');
console.log(pascha?.data.title);
// "СВІТЛЕ ХРИСТОВЕ ВОСКРЕСІННЯ. ПАСХА."

// By nday
const pentecosts = manager.getRulesByNday(49);
console.log(pentecosts[0].data.title);
// "ДЕНЬ СВЯТОЇ ТРОЙЦІ. П'ЯТДЕСЯТНИЦЯ."

// By mmdd
const christmas = manager.getRulesByMMDD('12-25');
console.log(christmas.length); // 1 or more
```

---

## Performance Benchmarks

**Test Environment:**
- Platform: Windows 11
- Node.js: v20+
- Database: 122 rules

**Results:**
```
100 random date lookups: 1ms total
Average per lookup: 0.01ms
Memory footprint: ~500KB (rules + indexes)
```

**Scalability:**
- ✅ Handles 1000+ lookups/second
- ✅ Constant O(1) lookup time regardless of database size
- ✅ Minimal memory overhead (~4x raw JSON size)

---

## Collision Handling

When multiple rules match the same date (e.g., fixed saint + movable Sunday):

1. **All matching rules are returned** in the array
2. **Sorted by priority** (highest first)
3. **Default priority**: 5
4. **Major feasts**: 8-10

Example:
```typescript
// January 1: Circumcision + St. Basil (combined in one rule)
const jan1Rules = manager.getRulesForDate(new Date(2026, 0, 1), pascha);
console.log(jan1Rules[0].data.title);
// "ОБРІЗАННЯ ГОСПОДНЄ. Свт. Василія Великого..."
```

---

## Error Handling

### Invalid Dates
```typescript
try {
    const rules = manager.getRulesForDate(invalidDate, pascha);
} catch (error) {
    console.error('Invalid date input');
}
```

### Missing Pascha
If Pascha calculation fails for a year, nday-based rules won't trigger, but mmdd-based rules will still work.

---

## Database Statistics

**OCU_RULES.json Structure:**
```json
{
  "total_rules": 122,
  "movable_feasts": 34,  // nday-based
  "fixed_feasts": 88,    // mmdd-based
  "with_readings": 73,
  "informational": 49,
  "validated_years": "2025-2027"
}
```

**Critical Feasts Included:**
- ✅ Pascha (nday: 0)
- ✅ Pentecost (nday: 49)
- ✅ Christmas (12-25)
- ✅ Theophany (01-06)
- ✅ 118+ other feasts and saints

---

## Integration Guide

### With LiturgicalEngine

```typescript
import { LiturgicalRuleManager } from './TypikonRules.ts';
import { calculateDynamicReadings } from './LiturgicalEngine.ts';

const manager = LiturgicalRuleManager.getInstance();
const pascha = new Date(2026, 3, 12);
const date = new Date(2026, 4, 15);

// Get rules
const rules = manager.getRulesForDate(date, pascha);

// Apply to engine
const readings = calculateDynamicReadings(date);
rules.forEach(rule => {
    if (rule.action === 'REPLACE_LITURGY') {
        // Replace liturgy with rule's data
    }
});
```

### With Next.js API

```typescript
// pages/api/calendar/[date].ts
import { LiturgicalRuleManager } from '@/calendar_v2/TypikonRules.ts';

export default async function handler(req, res) {
    const manager = LiturgicalRuleManager.getInstance();
    const { date } = req.query;
    
    const targetDate = new Date(date);
    const pascha = calculatePascha(targetDate.getFullYear());
    
    const rules = manager.getReadingsOnly(targetDate, pascha);
    
    return res.json({
        date: targetDate.toISOString(),
        rules: rules.map(r => ({
            title: r.data.title,
            readings: r.data.liturgy
        }))
    });
}
```

---

## Testing

Comprehensive test suite available in `tests/int/eternal-calendar.int.spec.ts`:

```bash
npx vitest run tests/int/eternal-calendar.int.spec.ts
```

**Test Coverage:**
- ✅ 29/29 tests passing (100%)
- ✅ Fixed feast persistence (2025-2027)
- ✅ Movable feast shifting
- ✅ Collision handling
- ✅ Database integrity
- ✅ Pascha calculation accuracy

---

## Maintenance

### Adding New Rules

1. Edit `OCU_RULES.json`
2. Follow the TypikonRule interface structure
3. Tag informational rules with `"isInformational": true`
4. Run tests to verify

### Updating Pascha Dates

The system is year-agnostic, but Pascha must be calculated externally:

```typescript
import { getOrthodoxPascha } from './LiturgicalEngine.ts';

const pascha2028 = getOrthodoxPascha(2028);
const rules = manager.getRulesForDate(someDate, pascha2028);
```

---

## Troubleshooting

### "Rules not found for date"
- Check Pascha date is correct for the year
- Verify date is within supported range (nday: -100 to +250)

### "Informational rule has readings"
- Check `isInformational` flag in JSON
- Re-run `src/fix_ocu_rules.ts` to re-tag

### "Performance slower than expected"
- Verify singleton is being used (not creating new instances)
- Check index rebuilding isn't happening repeatedly

---

## API Reference

### Methods

#### `getRulesForDate(date, paschaDate, year?)`
**Returns:** `TypikonRule[]`  
Main lookup method. Finds all rules matching the date.

#### `getReadingsOnly(date, paschaDate, year?)`
**Returns:** `TypikonRule[]`  
Filters out informational rules, returns only rules with readings.

#### `getRuleById(id)`
**Returns:** `TypikonRule | undefined`  
Direct lookup by rule ID.

#### `getRulesByNday(nday)`
**Returns:** `TypikonRule[]`  
All rules triggered by this nday value.

#### `getRulesByMMDD(mmdd)`
**Returns:** `TypikonRule[]`  
All rules triggered by this MM-DD date.

#### `getStatistics()`
**Returns:** `{ total, informational, withReadings }`  
Database statistics.

---

## License

MIT License - Free for liturgical use

---

## Support

For issues or questions:
- GitHub Issues: [repository]/issues
- Maintainer: Liturgical Calendar Team
- Last Updated: 2026-02-06

---

**Status:** ✅ Production Ready | **Version:** 1.0.0 | **Validated:** 2025-2027
