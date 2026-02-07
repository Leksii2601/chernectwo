/**
 * ReadingsList Component
 * 
 * Displays liturgical readings (Apostle, Gospel, Matins) with proper formatting.
 */

'use client';

import React from 'react';
import type { TypikonRule, ReadingDefinition } from '@/calendar_v2/TypikonRules';

interface ReadingsListProps {
    /** Liturgical rules to display readings from */
    rules: TypikonRule[];

    /** Additional CSS classes */
    className?: string;
}

/**
 * Single reading item component
 */
function ReadingItem({ reading, label, type }: ReadingDefinition) {
    return (
        <div className="flex gap-3 items-start group">
            {/* Label Badge */}
            {label && (
                <span className={`
                    px-2 py-1 rounded text-xs font-medium whitespace-nowrap
                    ${type === 'gospel' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'}
                `}>
                    {label}
                </span>
            )}

            {/* Reading Text */}
            <p className="text-gray-300 leading-relaxed flex-1">
                {reading}
            </p>
        </div>
    );
}

/**
 * Main ReadingsList component
 */
export function ReadingsList({ rules, className = '' }: ReadingsListProps) {
    // Filter out informational rules
    const readingRules = rules.filter(r => !r.data.isInformational);

    if (readingRules.length === 0) {
        return (
            <div className={`text-gray-500 italic ${className}`}>
                Немає читань для цього дня
            </div>
        );
    }

    // Collect all readings
    const allApostles: ReadingDefinition[] = [];
    const allGospels: ReadingDefinition[] = [];
    const allMatins: ReadingDefinition[] = [];

    readingRules.forEach(rule => {
        if (rule.data.liturgy?.apostle) {
            allApostles.push(...rule.data.liturgy.apostle);
        }
        if (rule.data.liturgy?.gospel) {
            allGospels.push(...rule.data.liturgy.gospel);
        }
        if (rule.data.matins) {
            allMatins.push(...rule.data.matins);
        }
    });

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Matins Gospel (if present) */}
            {allMatins.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide">
                        Рання
                    </h3>
                    <div className="space-y-2 pl-4 border-l-2 border-amber-500/30">
                        {allMatins.map((reading, idx) => (
                            <ReadingItem key={idx} {...reading} />
                        ))}
                    </div>
                </div>
            )}

            {/* Liturgy */}
            {(allApostles.length > 0 || allGospels.length > 0) && (
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
                        Літургія
                    </h3>

                    {/* Apostle (Epistle) */}
                    {allApostles.length > 0 && (
                        <div className="space-y-2 pl-4 border-l-2 border-blue-500/30">
                            <h4 className="text-xs font-medium text-gray-400">Апостол:</h4>
                            {allApostles.map((reading, idx) => (
                                <ReadingItem key={idx} {...reading} type="apostol" />
                            ))}
                        </div>
                    )}

                    {/* Gospel */}
                    {allGospels.length > 0 && (
                        <div className="space-y-2 pl-4 border-l-2 border-amber-500/30">
                            <h4 className="text-xs font-medium text-gray-400">Євангеліє:</h4>
                            {allGospels.map((reading, idx) => (
                                <ReadingItem key={idx} {...reading} type="gospel" />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
