/**
 * Liturgical Types
 * Consolidated interfaces to avoid circular dependencies and duplication.
 */

// --- Basic Reading Types ---

export interface Reading {
    apostle: string;
    gospel: string;
    label?: string;
}

export interface DetailedReading {
    reading: string;
    type?: string;
    label?: string;
    pericope?: string;
    source?: string;
}

// --- Service Structure Blocks ---

export interface ServiceReadings {
    title: string;
    readings: DetailedReading[];
}

export interface LiturgyReadings {
    title: string;
    apostle: DetailedReading[];
    gospel: DetailedReading[];
}

export interface HoursReadings {
    [key: string]: DetailedReading[] | undefined;
}

// --- Main Calendar Object ---

export interface GranularReadings {
    date?: string; // "YYYY-MM-DD"
    vespers?: ServiceReadings;
    matins?: ServiceReadings;
    liturgy: LiturgyReadings;
    hours?: HoursReadings;
    feast?: {
        title: string;
        rank?: number;
    };
    rubrics?: string[]; // New field for liturgical instructions
    metadata?: {
        key: string;
        nday: number;
        description: string;
        indiction?: number;
        solar?: number;
        lunar?: number;
        yearAM?: number;
        keyBoundary?: string;
    };
    saints?: string[];
    // Legacy support
    readings?: Reading[]; 
    matinsGospel?: DetailedReading;
}

// --- Rule System Types (OCU_RULES.json) ---

export type TypikonAction =
    | 'REPLACE_LITURGY'
    | 'REPLACE_VESPERS'
    | 'REPLACE_HOURS'
    | 'APPEND_LITURGY'
    | 'SET_ALITURGICAL'
    | 'SUPPRESS_SAINTS'
    | 'SUPPRESS_ORDINARY'
    | 'SUPPRESS_PONOMAR'
    | 'ADD_HOURS'
    | 'ADD_VESPERS';

export interface ReadingDefinition {
    reading: string;
    label: string;
    type?: string;
}

export interface LiturgyBlock {
    apostle?: ReadingDefinition[];
    gospel?: ReadingDefinition[];
}

export interface TypikonRuleData {
    title: string;
    liturgy?: LiturgyBlock;
    matins?: ReadingDefinition[];
    hours?: Record<string, ReadingDefinition[]>;
    vespers?: ReadingDefinition[];
    metadata?: string;
    isInformational?: boolean;
}

export interface TypikonRule {
    /** Unique identifier (e.g., "nday-0", "05-15") */
    id: string;

    triggers: {
        /** fixed dates ["MM-DD"] */
        mmdd?: string[];
        /** days relative to Pascha */
        nday?: number[];
        /** Range for nday: [min, max] inclusive */
        ndayRange?: [number, number];
        /** Restrict to specific days of week (0=Sun, 1=Mon...) */
        dow?: number[];
        /** specific years for exceptions */
        year?: number[];
    };

    action: TypikonAction;
    data: TypikonRuleData;
    priority?: number;
}
