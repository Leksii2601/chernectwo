/**
 * useLiturgicalData Hook
 * 
 * React hook for fetching liturgical rules and readings for a specific date.
 * Integrates with LiturgicalRuleManager and handles Pascha calculation.
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { LiturgicalRuleManager, TypikonRule } from '@/calendar_v2/TypikonRules';
import { getOrthodoxPascha } from '@/calendar_v2/LiturgicalEngine';
import { ADDITIONAL_TYPIKON_RULES } from '@/calendar_v2/data/ADDITIONAL_TYPIKON_RULES';

export interface LiturgicalData {
    /** Array of all rules for this date (sorted by priority) */
    rules: TypikonRule[];

    /** Primary feast/saint title */
    primaryTitle: string;

    /** All titles (for multiple commemorations) */
    allTitles: string[];

    /** Has actual readings (not informational only) */
    hasReadings: boolean;

    /** Highest priority/rank of all rules */
    rank: number;

    /** Is this a major feast? (rank >= 8) */
    isMajorFeast: boolean;

    /** Number of days from Pascha (for movable feasts) */
    nday: number;

    /** Loading state */
    isLoading: boolean;

    /** Error state */
    error: string | null;
}

/**
 * Hook to fetch liturgical data for a specific date
 * 
 * @param selectedDate - The date to fetch data for
 * @returns LiturgicalData object with rules and metadata
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [date, setDate] = useState(new Date());
 *   const liturgicalData = useLiturgicalData(date);
 *   
 *   return (
 *     <div>
 *       <h1>{liturgicalData.primaryTitle}</h1>
 *       {liturgicalData.isMajorFeast && <Badge>Major Feast</Badge>}
 *     </div>
 *   );
 * };
 * ```
 */
export function useLiturgicalData(selectedDate: Date): LiturgicalData {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rules, setRules] = useState<TypikonRule[]>([]);

    // Calculate Pascha for the selected year (memoized)
    const paschaDate = useMemo(() => {
        try {
            return getOrthodoxPascha(selectedDate.getFullYear());
        } catch (err) {
            console.error('Failed to calculate Pascha:', err);
            return new Date(selectedDate.getFullYear(), 3, 1); // Fallback: April 1
        }
    }, [selectedDate.getFullYear()]);

    // Calculate nday (days from Pascha)
    const nday = useMemo(() => {
        return LiturgicalRuleManager.calculateNday(selectedDate, paschaDate);
    }, [selectedDate, paschaDate]);

    // Fetch rules when date changes
    useEffect(() => {
        setIsLoading(true);
        setError(null);

        try {
            const manager = LiturgicalRuleManager.getInstance();

            // Calculate variables for "Manual Wins" logic
            const mmdd = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
            const currentNday = LiturgicalRuleManager.calculateNday(selectedDate, paschaDate);
            const isRestrictedPeriod = selectedDate.getFullYear() === 2026 &&
                (selectedDate.getMonth() < 2 || (selectedDate.getMonth() === 2 && selectedDate.getDate() <= 22));

            let finalRules: TypikonRule[] = [];

            if (isRestrictedPeriod) {
                // FORCE MANUAL MODE: Ignore manager rules, look strictly in ADDITIONAL_TYPIKON_RULES
                // We find ALL matching manual rules for this day
                const manualRules = ADDITIONAL_TYPIKON_RULES.filter((rule: any) => {
                    if (rule.triggers.mmdd && rule.triggers.mmdd.includes(mmdd)) return true;
                    // Also check nday for movable manual rules (Soul Saturdays etc)
                    if (rule.triggers.nday && rule.triggers.nday.includes(currentNday)) return true;
                    return false;
                });

                if (manualRules.length > 0) {
                    // Found manual overrides - use ONLY these
                    finalRules = manualRules as TypikonRule[];
                } else {
                    // Fallback to manager if no manual rule exists (unlikely given full coverage)
                    finalRules = manager.getRulesForDate(selectedDate, paschaDate, selectedDate.getFullYear());
                }
            } else {
                // NORMAL MODE: Use manager + merge additional rules
                const mainRules = manager.getRulesForDate(
                    selectedDate,
                    paschaDate,
                    selectedDate.getFullYear()
                );

                const additionalRules: TypikonRule[] = [];

                ADDITIONAL_TYPIKON_RULES.forEach((rule: any) => {
                    let matches = false;
                    if (rule.triggers.mmdd && rule.triggers.mmdd.includes(mmdd)) matches = true;
                    if (rule.triggers.nday && rule.triggers.nday.includes(currentNday)) matches = true;
                    if (matches) additionalRules.push(rule as TypikonRule);
                });

                finalRules = [...mainRules, ...additionalRules];
                finalRules.sort((a, b) => (b.priority ?? 5) - (a.priority ?? 5));
            }

            setRules(finalRules);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch liturgical data');
            setRules([]);
        } finally {
            setIsLoading(false);
        }
    }, [selectedDate, paschaDate]);

    // Compute derived data
    const derivedData = useMemo(() => {
        if (rules.length === 0) {
            return {
                primaryTitle: '',
                allTitles: [],
                hasReadings: false,
                rank: 0,
                isMajorFeast: false,
            };
        }

        // Extract titles
        const allTitles = rules.map(r => r.data.title).filter(Boolean);
        const primaryTitle = allTitles[0] || '';

        // Check for readings (non-informational rules)
        const hasReadings = rules.some(r => !r.data.isInformational);

        // Determine rank (highest priority among rules)
        const rank = Math.max(...rules.map(r => r.priority ?? 5));
        const isMajorFeast = rank >= 8;

        return {
            primaryTitle,
            allTitles,
            hasReadings,
            rank,
            isMajorFeast,
        };
    }, [rules]);

    return {
        rules,
        nday,
        isLoading,
        error,
        ...derivedData,
    };
}

/**
 * Hook to fetch only non-informational rules (with actual readings)
 * 
 * @param selectedDate - The date to fetch data for
 * @returns Filtered LiturgicalData with only reading rules
 */
export function useLiturgicalReadings(selectedDate: Date): LiturgicalData {
    const allData = useLiturgicalData(selectedDate);

    const filteredRules = useMemo(() => {
        return allData.rules.filter(r => !r.data.isInformational);
    }, [allData.rules]);

    return {
        ...allData,
        rules: filteredRules,
    };
}
