# Generated OCU Rules 2026

## Overview

This file (`generated_ocu_rules_2026.ts`) contains liturgical rules automatically generated from the 2026 OCU Calendar readings data (pages 5-82 of kalendar_2026.pdf).

## Generation Process

The rules were generated using the script `scripts/generate-ocu-rules.ts` which analyzes the `readings_2026.json` file and transforms it into TypeScript `TypikonRule` objects.

### Transformation Logic

1. **Movable Feasts** (Triodion/Pentecostarion periods)
   - Triggered by `nday` (number of days from Pascha)
   - Includes readings labeled "Тріод." during the 10 weeks before Pascha (nday -70 to -1)
   - Includes readings during Pentecostarion (nday 0 to 49)
   - Total: 74 rules with nday triggers

2. **Fixed Feasts** (date-based commemorations)
   - Triggered by `mmdd` (month-day) + year 2026
   - Includes saint commemorations and major feasts with fixed dates
   - Total: 251 rules with mmdd triggers

3. **Mixed Readings**
   - When a day has both movable (Triodion) and fixed (saint) readings
   - Uses `mmdd` trigger since there's a fixed component
   - Example: Feb 9, 2026 has both Triodion reading and St. Theodore Stratelates

### Data Mapping

- **Apostle** readings are mapped to `liturgy.apostle` array
- **Gospel** readings are mapped to `liturgy.gospel` array
- Each reading includes:
  - `reading`: The scripture reference (e.g., "1 Ін._2:18-3:10a")
  - `label`: The feast/commemoration name (e.g., "Тріод.", "Св.")

## Statistics

- **Total rules**: 325
- **REPLACE_LITURGY actions**: 325
- **SUPPRESS_SAINTS actions**: 0
- **Rules with nday trigger**: 74 (movable feasts)
- **Rules with mmdd trigger**: 251 (fixed feasts)

## Key Dates (2026)

- **Pascha (Easter)**: April 12, 2026
- **Triodion begins**: ~January 14, 2026 (nday -88)
- **Forgiveness Sunday**: February 22, 2026 (nday -49)
- **Great Lent begins**: February 23, 2026 (nday -48)
- **Palm Sunday**: April 5, 2026 (nday -7)
- **Pentecost**: May 31, 2026 (nday 49)

## Usage

To integrate these rules into the main `TypikonRules.ts` file:

```typescript
import { GENERATED_OCU_RULES_2026 } from './data/generated_ocu_rules_2026';

export const OCU_RULES: TypikonRule[] = [
    ...GENERATED_OCU_RULES_2026,
    // ... other manually-defined rules
];
```

## Regeneration

To regenerate the rules from updated calendar data:

```bash
cd /home/runner/work/chernectwo/chernectwo
npx tsx scripts/generate-ocu-rules.ts > src/calendar_v2/data/generated_ocu_rules_2026.ts
```

## Notes

1. **Conservative Approach**: The SUPPRESS_SAINTS action is applied very conservatively. It's currently set to 0 rules to avoid accidentally suppressing important commemorations.

2. **Year-Specific**: All rules are marked with `year: [2026]` to ensure they only apply to the correct liturgical year.

3. **Nday Calculation**: Based on Pascha April 12, 2026. The nday value represents the number of days from Pascha (negative before, positive after).

4. **Data Quality**: The generated rules are only as accurate as the source `readings_2026.json` data. Manual review and validation are recommended.

## Future Improvements

1. Add support for other TypikonAction types (ADD_HOURS, ADD_VESPERS, etc.)
2. Implement more sophisticated SUPPRESS_SAINTS logic
3. Add validation against existing OCU_RULES for consistency
4. Support multi-year generation
5. Add matins gospel readings where available
