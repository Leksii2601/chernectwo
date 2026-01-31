# Liturgical Engine Status & Validation Report

**Last Updated:** 2026-01-30

---

## 🔍 Validation Summary

### 1. Paschalion Validation ✅

| Metric | 2026 Value | Source |
|--------|------------|--------|
| Indiction | 4 | paschalion_baseline.tsv |
| Solar Cycle | 2 | paschalion_baseline.tsv |
| Key of Boundaries | З | paschalion_baseline.tsv |
| Pascha (OS) | March 30 | paschalion_baseline.tsv |
| Pascha (NS) | April 12 | Calculated (OS + 13) |

**Validation Rule:** For any year, the engine's Key of Boundaries, Indiction, and Solar Cycle MUST match the TSV baseline values.

### 2. Suppression Rules ✅

Based on `Commemoration1.java` line 165 and `Paschalion.java`:

```
IF serviceType >= 4 (Polyeleos/Great Feast):
    ON WEEKDAYS: Suppress "Ряд" (ordinary) readings
    ON SUNDAYS: Show BOTH Sunday + Feast readings
```

**Implemented in:** `LiturgicalEngine.ts` line 296-316

### 3. Service Granularity ✅

| Service | Container | Content Type |
|---------|-----------|--------------|
| Вечірня | `vespers.readings[]` | OT Paremias only |
| Рання | `matins.readings[]` | Gospel → "Раннє Євангеліє" |
| Часи | `hours.{prime,terce,sexte,none}` | OT + Apostle + Gospel |
| Літургія | `liturgy.{apostle[],gospel[]}` | Apostle + Gospel |

### 4. Royal Hours ✅

| Condition | Date (OS) | Date (NS) |
|-----------|-----------|-----------|
| Good Friday | nday = -2 | Variable |
| Eve of Nativity | Dec 24 | Jan 6 |
| Eve of Theophany | Jan 5 | Jan 18 |

**Exception:** NOT on Saturday or Sunday

### 5. Localization ✅

| Ponomar | Ukrainian |
|---------|-----------|
| Gen | Бут. |
| Deut | Повт. |
| Prov | Притч. |
| Wisd | Прем. |
| Is/Isa | Іс. |
| Bar | Вар. |
| Mt | Мф. |
| Mk | Мк. |
| Lk | Лк. |
| Jn | Ін. |

---

## 📊 Key Findings from Ponomar Analysis

### From `Paschalion.java`:
- **Line 68-84**: Gaussian Pascha calculation
- **Line 163-187**: Key of Boundaries = `(month==3) ? day-21 : day+10`
- **Line 193-201**: Indiction = `mod(year - 312, 15)`
- **Line 207-215**: Solar Cycle = `mod(year + 5508, 28)`

### From `Commemoration1.java`:
- **Line 164-166**: Service Type extracted from `<SERVICE Type="N">`
- **Line 378**: Rank determines suppression (`dRank >= 4`)
- **Line 483-518**: Service containers: VESPERS, MATINS, LITURGY, HOURS

### From `GospelSelector.java`:
- **Line 39-41**: Two modes: "TheophanyJump" and "LucanJump"
- The Lucan Jump adjusts Gospel cycle after Theophany

### From `RoyalHours.java`:
- **Line 165**: Royal Hours served when:
  - `nday == -2` (Good Friday)
  - `doy == 4 && dow != 6 && dow != 0` (Eve of Theophany weekday)
  - `doy == 357 && dow != 6 && dow != 0` (Eve of Nativity weekday)

---

## 🐛 Known Discrepancies

### 1. Gospel Jump Logic
The Lucan Jump needs New Style correction. The trigger should be relative to January 6 NS (Theophany), not the Old Style date.

**TODO:** Implement jump based on gap between Theophany (Jan 19 NS) and Triodion start.

### 2. Sunday Exception
On Sundays with high-rank feasts, both readings should appear. Current logic may over-suppress.

**TODO:** Add explicit Sunday check in suppression logic.

### 3. Royal Hours Triple Set
Royal Hours should have OT Paremia + Apostle + Gospel for each hour.

**TODO:** Add validation for complete triple set.

---

## 📁 File Structure

```
src/calendar_v2/
├── LiturgicalEngine.ts        # Core engine (400+ lines)
├── PaschalionReader.ts        # Paschalion data access
├── data/
│   ├── paschalion.json        # From paschalion_baseline.tsv
│   ├── lectionary.json        # Ordinary readings
│   ├── calendar_cids.json     # Date → CID mapping (OS)
│   └── ponomar_raw/
│       ├── ponomar_lives.json     # Raw Ponomar XML parsed
│       └── ponomar_lives_ua.json  # Ukrainian translated
└── scripts/
    ├── LiturgicalValidator.ts   # Comprehensive validator
    ├── simple_validator.ts      # Quick test script
    ├── convert_ponomar_xml.ts   # XML → JSON converter
    ├── translate_lives.ts       # Book name translator
    └── convert_paschalion_tsv.ts # TSV → JSON converter
```

---

## 🔧 Validation Commands

```bash
# Run simple validation
npx tsx src/calendar_v2/scripts/simple_validator.ts

# Test specific date
npx tsx -e "const {calculateDynamicReadings}=require('./src/calendar_v2/LiturgicalEngine'); console.log(JSON.stringify(calculateDynamicReadings(new Date(2026,0,14,12)), null, 2));"

# Verify Pascha 2026
npx tsx -e "const {getOrthodoxPascha}=require('./src/calendar_v2/LiturgicalEngine'); console.log(getOrthodoxPascha(2026));"
```

---

## ✅ Implementation Checklist

- [x] Paschalion baseline sync
- [x] Service-based granularity (Vespers, Matins, Liturgy, Hours)
- [x] Rank-based suppression (dRank >= 4)
- [x] Old Style → New Style date conversion
- [x] Multi-CID aggregation per day
- [x] Ukrainian book abbreviations
- [x] Royal Hours detection
- [ ] Sunday exception in suppression
- [ ] Lucan Jump New Style correction
- [ ] Complete Hours reading triple set
- [ ] Full year regression testing

---

## 📚 References

- **Ponomar Project:** https://github.com/typiconman/ponomar
- **Paschalion.java:** Gaussian algorithm, Key of Boundaries
- **Commemoration1.java:** Rank system, Service parsing
- **RoyalHours.java:** Royal Hours conditions
- **kahuna.pl:** Reading ID generation
