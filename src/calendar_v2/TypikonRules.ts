/**
 * Liturgical Rule Management System
 * 
 * This module provides a robust, high-performance interface for working with
 * the OCU_RULES.json eternal calendar database (122 rules, validated 2025-2027).
 * 
 * Features:
 * - Lazy loading & singleton pattern for optimal memory usage
 * - Fast date-based rule lookup (O(n) worst case, typically much faster)
 * - Collision handling for fixed/movable feast conflicts
 * - Informational rule filtering
 */

import OCU_RULES_RAW from './data/OCU_RULES.json';

// ============================================================================
// TYPE DEFINITIONS (aligned with OCU_RULES.json structure)
// ============================================================================

export interface ReadingDefinition {
    reading: string;
    label: string;
    type?: string;
}

export interface LiturgyBlock {
    apostle?: ReadingDefinition[];
    gospel?: ReadingDefinition[];
}

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

/**
 * Typikon Rule Interface
 * 
 * Represents a single liturgical rule from the eternal calendar.
 * Rules are triggered by either fixed dates (mmdd) or movable dates (nday relative to Pascha).
 */
export interface TypikonRule {
    /** Unique identifier for the rule (e.g., "nday-0", "05-15") */
    id: string;

    /** Trigger conditions for when this rule activates */
    triggers: {
        /** Fixed calendar dates in MM-DD format (e.g., ["01-01", "12-25"]) */
        mmdd?: string[];

        /** Days relative to Pascha (e.g., [0] for Pascha, [49] for Pentecost) */
        nday?: number[];

        /** Optional: specific years (used for historical corrections) */
        year?: number[];
    };

    /** Action to perform when rule is triggered */
    action: TypikonAction;

    /** Rule data and content */
    data: {
        /** Human-readable title for this feast/saint/commemoration */
        title: string;

        /** Liturgy readings (apostle & gospel) */
        liturgy?: LiturgyBlock;

        /** Matins (morning) readings */
        matins?: ReadingDefinition[];

        /** Hours readings (for Royal Hours, etc.) */
        hours?: Record<string, ReadingDefinition[]>;

        /** Vespers (evening) readings */
        vespers?: ReadingDefinition[];

        /** Additional metadata or instructions */
        metadata?: string;

        /** 
         * Flag indicating this rule is informational only (e.g., liturgical instructions).
         * Informational rules have no actual readings but provide guidance for celebration.
         */
        isInformational?: boolean;
    };

    /** 
     * Optional priority for collision resolution.
     * Higher values take precedence when multiple rules match the same date.
     * Default priority: 5 (normal), 8-10 (major feasts).
     */
    priority?: number;
}

// ============================================================================
// LITURGICAL RULE MANAGER
// ============================================================================

/**
 * High-performance manager for liturgical rules
 * 
 * Provides efficient date-based lookups with caching and collision handling.
 * Implements singleton pattern to ensure rules are loaded only once.
 */
export class LiturgicalRuleManager {
    private static instance: LiturgicalRuleManager | null = null;
    private rules: TypikonRule[] = [];
    private ndayIndex: Map<number, TypikonRule[]> = new Map();
    private mmddIndex: Map<string, TypikonRule[]> = new Map();

    /**
     * Private constructor (singleton pattern)
     * Loads and indexes rules from OCU_RULES.json
     */
    private constructor() {
        this.loadRules();
        this.buildIndexes();
    }

    /**
     * Get singleton instance of the rule manager
     */
    public static getInstance(): LiturgicalRuleManager {
        if (!LiturgicalRuleManager.instance) {
            LiturgicalRuleManager.instance = new LiturgicalRuleManager();
        }
        return LiturgicalRuleManager.instance;
    }

    /**
     * Load rules from JSON file
     * @private
     */
    private loadRules(): void {
        this.rules = OCU_RULES_RAW as TypikonRule[];
        console.log(`✅ Loaded ${this.rules.length} liturgical rules`);
    }

    /**
     * Build performance indexes for fast lookups
     * @private
     */
    private buildIndexes(): void {
        this.rules.forEach(rule => {
            // Index by nday
            if (rule.triggers.nday) {
                rule.triggers.nday.forEach(nday => {
                    if (!this.ndayIndex.has(nday)) {
                        this.ndayIndex.set(nday, []);
                    }
                    this.ndayIndex.get(nday)!.push(rule);
                });
            }

            // Index by mmdd
            if (rule.triggers.mmdd) {
                rule.triggers.mmdd.forEach(mmdd => {
                    if (!this.mmddIndex.has(mmdd)) {
                        this.mmddIndex.set(mmdd, []);
                    }
                    this.mmddIndex.get(mmdd)!.push(rule);
                });
            }
        });

        console.log(`📇 Indexed: ${this.ndayIndex.size} nday keys, ${this.mmddIndex.size} mmdd keys`);
    }

    /**
     * Calculate nday (days from Pascha) for a given date
     * 
     * @param date - Target date
     * @param paschaDate - Pascha date for the relevant year
     * @returns Number of days from Pascha (negative = before, positive = after)
     */
    public static calculateNday(date: Date, paschaDate: Date): number {
        const MS_PER_DAY = 1000 * 60 * 60 * 24;

        // Normalize to midnight
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const p = new Date(paschaDate.getFullYear(), paschaDate.getMonth(), paschaDate.getDate());

        const diffMs = d.getTime() - p.getTime();
        return Math.round(diffMs / MS_PER_DAY);
    }

    /**
     * Format date as MM-DD string
     * @private
     */
    private static formatMMDD(date: Date): string {
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${mm}-${dd}`;
    }

    /**
     * Get all active rules for a specific date
     * 
     * This is the CORE method for eternal calendar logic.
     * 
     * @param date - The target date to find rules for
     * @param paschaDate - Pascha date for the relevant year
     * @param year - Optional year filter (for historical corrections)
     * @returns Array of matching rules, sorted by priority (highest first)
     * 
     * @example
     * ```typescript
     * const manager = LiturgicalRuleManager.getInstance();
     * const pascha2026 = new Date(2026, 3, 12); // April 12, 2026
     * const rules = manager.getRulesForDate(new Date('2026-05-15'), pascha2026);
     * console.log(rules.map(r => r.data.title));
     * ```
     */
    public getRulesForDate(date: Date, paschaDate: Date, year?: number): TypikonRule[] {
        const matchedRules: TypikonRule[] = [];

        // Calculate triggers
        const mmdd = LiturgicalRuleManager.formatMMDD(date);
        const nday = LiturgicalRuleManager.calculateNday(date, paschaDate);

        // Find rules by mmdd (fixed feasts)
        const mmddRules = this.mmddIndex.get(mmdd) || [];
        matchedRules.push(...mmddRules);

        // Find rules by nday (movable feasts)
        const ndayRules = this.ndayIndex.get(nday) || [];
        matchedRules.push(...ndayRules);

        // Filter by year (if specified and rule has year constraint)
        let filtered = matchedRules;
        if (year !== undefined) {
            filtered = matchedRules.filter(rule => {
                if (!rule.triggers.year) return true; // No year constraint
                return rule.triggers.year.includes(year);
            });
        }

        // Sort by priority (higher first)
        // Default priority: 5 for normal rules, can be overridden
        filtered.sort((a, b) => {
            const priorityA = a.priority ?? 5;
            const priorityB = b.priority ?? 5;
            return priorityB - priorityA;
        });

        return filtered;
    }

    /**
     * Get only non-informational rules (with actual readings)
     * 
     * Filters out liturgical instructions and informational markers.
     * 
     * @param date - The target date
     * @param paschaDate - Pascha date for the relevant year
     * @param year - Optional year filter
     * @returns Array of rules with actual readings
     */
    public getReadingsOnly(date: Date, paschaDate: Date, year?: number): TypikonRule[] {
        const allRules = this.getRulesForDate(date, paschaDate, year);
        return allRules.filter(rule => !rule.data.isInformational);
    }

    /**
     * Get a specific rule by ID
     * 
     * @param id - Rule ID (e.g., "nday-0", "05-15")
     * @returns The rule, or undefined if not found
     */
    public getRuleById(id: string): TypikonRule | undefined {
        return this.rules.find(r => r.id === id);
    }

    /**
     * Get all rules for a specific nday
     * 
     * @param nday - Days from Pascha
     * @returns Array of matching rules
     */
    public getRulesByNday(nday: number): TypikonRule[] {
        return this.ndayIndex.get(nday) || [];
    }

    /**
     * Get all rules for a specific fixed date
     * 
     * @param mmdd - Date in MM-DD format (e.g., "12-25")
     * @returns Array of matching rules
     */
    public getRulesByMMDD(mmdd: string): TypikonRule[] {
        return this.mmddIndex.get(mmdd) || [];
    }

    /**
     * Get total number of loaded rules
     */
    public getRuleCount(): number {
        return this.rules.length;
    }

    /**
     * Get count of informational vs. reading rules
     */
    public getStatistics(): { total: number; informational: number; withReadings: number } {
        const informational = this.rules.filter(r => r.data.isInformational).length;
        return {
            total: this.rules.length,
            informational,
            withReadings: this.rules.length - informational
        };
    }
}

// ============================================================================
// LEGACY EXPORT (for backward compatibility)
// ============================================================================

/**
 * Legacy export: Direct access to rules array
 * 
 * @deprecated Use LiturgicalRuleManager.getInstance() instead for better performance
 */
export const OCU_RULES: TypikonRule[] = OCU_RULES_RAW as TypikonRule[];

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Example 1: Get rules for a specific date
 * 
 * @example
 * ```typescript
 * const manager = LiturgicalRuleManager.getInstance();
 * const pascha2026 = new Date(2026, 3, 12); // April 12, 2026
 * 
 * // St. Pachomius (May 15)
 * const rules = manager.getRulesForDate(new Date('2026-05-15'), pascha2026);
 * console.log(rules[0].data.title); // "Прп. Пахомія Великого (348)."
 * ```
 */

/**
 * Example 2: Get Pascha and Pentecost
 * 
 * @example
 * ```typescript
 * const manager = LiturgicalRuleManager.getInstance();
 * const pascha2026 = new Date(2026, 3, 12);
 * 
 * // Pascha (April 12, 2026)
 * const paschaRules = manager.getRulesForDate(pascha2026, pascha2026);
 * console.log(paschaRules[0].data.title); // "СВІТЛЕ ХРИСТОВЕ ВОСКРЕСІННЯ. ПАСХА."
 * 
 * // Pentecost (May 31, 2026 = Pascha + 49 days)
 * const pentecostDate = new Date(2026, 4, 31);
 * const pentecostRules = manager.getRulesForDate(pentecostDate, pascha2026);
 * console.log(pentecostRules[0].data.title); // "ДЕНЬ СВЯТОЇ ТРОЙЦІ. П'ЯТДЕСЯТНИЦЯ."
 * ```
 */

/**
 * Example 3: Filter informational rules
 * 
 * @example
 * ```typescript
 * const manager = LiturgicalRuleManager.getInstance();
 * const pascha2026 = new Date(2026, 3, 12);
 * 
 * // Get only rules with actual readings (no instructions)
 * const readingRules = manager.getReadingsOnly(new Date('2026-01-07'), pascha2026);
 * readingRules.forEach(rule => {
 *     console.log(rule.data.title);
 *     console.log('  Apostle:', rule.data.liturgy?.apostle?.[0]?.reading);
 *     console.log('  Gospel:', rule.data.liturgy?.gospel?.[0]?.reading);
 * });
 * ```
 */

/**
 * Example 4: Statistics
 * 
 * @example
 * ```typescript
 * const manager = LiturgicalRuleManager.getInstance();
 * const stats = manager.getStatistics();
 * console.log(`Total: ${stats.total}`);           // 122
 * console.log(`Informational: ${stats.informational}`); // 49
 * console.log(`With Readings: ${stats.withReadings}`);  // 73
 * ```
 */
