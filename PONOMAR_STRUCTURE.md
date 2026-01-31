# Ponomar Project Structure Analysis

This document outlines the structure of the `ponomar-master` directory located at `D:\Завантаження\ponomar-master\ponomar-master`.

## Root Directory
- **Ponomar/**: The main source code directory (Java).
- **Makefile**: Build script (uses `javac`).
- **README.md**: General project information.

## Ponomar/ (Source Code)
This folder contains the core Java application logic and resources.
- **Java Files (`*.java`)**:
    - `Paschalion.java`: Implements the Paschal calculation logic.
    - `DivineLiturgy1.java`: Service generation logic.
    - `JDate.java`: Julian Calendar handling.
- **scripts/**: Perl scripts for data generation.

## Ponomar/scripts/Perl/ (The "Brain")
This directory contains the logic for generating liturgical rules, specifically the "Lucan Jump".

- **kahuna.pl**: The core script. It reads "solution files" (numbered TSVs) and `lectionary.tsv` to generate XML rule definitions. It essentially maps `{LiturgicalDay (nday) + FixedDate (doy)}` -> `{ReadingIndex}`.
- **data/lectionary.tsv**: The **Master Lookup Table**.
    - Maps `effweek` (Effective Week) + `dow` (Day of Week) to specific readings (e.g., "Week 29 Monday" -> "Hebrews 3:5-11...").
- **data/*.tsv` (1.tsv, etc.)**: **Regression Baselines**.
    - These files contain pre-Calculated readings for specific years (e.g., `1.tsv` is 2010).
    - `test_lj.pl` runs the Ponomar Engine for these years and verifies the output matches these TSVs.
    - They represent the "Correct Answer" for the Lucan Jump logic across a cycle of years.

## Key Logic to Port

### 1. Data Layer (`lectionary.tsv`)
This is the dictionary. We need to convert this to a JSON object to allow O(1) lookup of readings.
**Target Format**:
```json
{
  "291": { // Week 29, Day 1 (Monday)
    "apostle": "Heb ...",
    "gospel": "Luke ..."
  }
}
```

### 2. Logic Layer (The "Jump" Algorithm)
The numbered TSVs show *what* the result should be.
To port this, we can either:
- **Option A (Hard)**: Reverse-engineer the general "Jump Rule" from the Java source.
- **Option B (Data-Driven)**: Generate a massive lookup table or "Rule Set" similar to what Ponomar exports.
- **Option C (Project Goal)**: We already have a `calendarGenerator.ts`. We can refine its `getPentecostWeek` logic and use the `lectionary.json` as the source of truth for the strings.
