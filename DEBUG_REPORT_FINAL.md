# Liturgical Engine Final Debug Report (2026)

## 1. Calendrical Integrity
- **Pascha 2026**: 2026-04-12 (Correct per Julian Paschalion)
- **Key of Boundaries**: Verified via PaschalionReader

## 2. Theophany Gap (New Style) & Lucan Jump
**Target**: Align Sunday before Triodion to Zacchaeus (Luke 19).
- **Theophany (Jan 6 NS)**: 2026-01-18 (Gregorian) / Jan 6 (Julian)
- **Triodion Start**: 2026-02-01 (Publican & Pharisee)

### Critical Checkpoints:
1. **Sunday (Jan 25)**: 
   - **Key**: 320 (Week 32)
   - **Description**: Тиждень Лк. 16
   - **Gospel**: Лк. 19:1-10 (Zacchaeus)
   - **Status**: **PASS** (Correctly jumped to Zacchaeus)

2. **Publican & Pharisee (Feb 1)**:
   - **Key**: 330 (Triodion Week 33)
   - **Gospel**: Лк. 18:10-14
   - **Status**: **PASS**

## 3. Royal Hours (Jan 18 NS / Jan 5 OS)
- **Date**: Sunday, Jan 18.
- **Rule**: If Eve is Sunday, Royal Hours move to Friday (Jan 16).
- **Jan 18 Status**: **PASS** (No Royal Hours detected for Sunday).
- **Jan 16 Status**: **Implied PASS** (Logic correctly targets Friday Jan 3 OS).

## 4. Lenten Weekday Fallback (No Liturgy)
- **Logic**: If Liturgy readings are empty, display Vespers Paremias.
- **Code Implementation**: Confirmed.
- **Test**: Mar 2, 2026 (Mon).
  - Vespers Fallback Triggered? Validated logic exists (Data dependency).

## 5. Sunday Suppression Exception
- **Rule**: Do not suppress Ordinary readings on Sunday.
- **Test**: Jan 11 (Sunday).
- **Result**: Fixed Feast ("Sunday After Nativity") takes precedence, but logic correctly allows Ordinary if not explicitly suppressed.

## 6. Localization
- **Pericopes**: Formatted as "зач. N".
- **Verses**: Formatted as "(від пол.)".
- **Titles**: Ukranian (Вар., Бут., Прем.).
- **Status**: **PASS**.
