
import paschalionDataRaw from './data/paschalion.json';

// Interfaces matching the TSV structure conceptually
export interface PaschalionEntry {
    year: number;
    indiction: number;
    solar: number;
    lunar: number;
    paschaDateOldStyle: string; // e.g. "April 12"
    keyBoundary: string; // Key of Boundaries from Column 10
    yearAM: number;
}

const PASCHALION_DATA: PaschalionEntry[] = paschalionDataRaw as any[];

export class PaschalionReader {
    static getEntry(year: number): PaschalionEntry | undefined {
        return PASCHALION_DATA.find(e => e.year === year);
    }

    static getKeyOfBoundaries(year: number): string | undefined {
        return this.getEntry(year)?.keyBoundary;
    }

    static getIndiction(year: number): number | undefined {
        return this.getEntry(year)?.indiction;
    }

    static getSolarCycle(year: number): number | undefined {
        return this.getEntry(year)?.solar;
    }

    static getPaschaDateOldStyle(year: number): string | undefined {
        return this.getEntry(year)?.paschaDateOldStyle;
    }
}
