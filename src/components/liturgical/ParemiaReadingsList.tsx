/**
 * ParemiaReadingsList Component
 * 
 * Displays Old Testament paremia readings for aliturgical days (Great Lent weekdays)
 */

import React from 'react';

interface ParemiaReading {
    reading: string;
    label?: string;
    type?: string;
}

interface ParemiaReadingsListProps {
    hours?: Record<string, ParemiaReading[]>;
    vespers?: ParemiaReading[];
    title?: string;
}

export const ParemiaReadingsList: React.FC<ParemiaReadingsListProps> = ({
    hours,
    vespers,
    title = "Алітургійний день"
}) => {
    const hasHours = hours && Object.keys(hours).length > 0;
    const hasVespers = vespers && vespers.length > 0;

    if (!hasHours && !hasVespers) {
        return null;
    }

    return (
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-2 border-amber-200 dark:border-amber-700">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📖</span>
                <h3 className="font-bold text-lg text-amber-900 dark:text-amber-100">
                    {title}
                </h3>
            </div>

            {/* Info */}
            <p className="text-sm text-amber-700 dark:text-amber-300 mb-4 italic">
                У будні дні Великого посту повна Літургія не звершується.
                Замість неї — Часи та Вечірня з читаннями Старого Завіту (Паремії).
            </p>

            {/* Hours Sections */}
            {hasHours && (
                <div className="mb-4">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        ⏰ Часи:
                    </h4>
                    {Object.entries(hours!).map(([hourName, readings]) => (
                        <div key={hourName} className="ml-4 mb-2">
                            <span className="font-medium text-amber-700 dark:text-amber-300">
                                {hourName}:
                            </span>
                            <ul className="ml-4 mt-1">
                                {readings.map((reading, idx) => (
                                    <li key={idx} className="text-amber-900 dark:text-amber-100">
                                        • {reading.reading}
                                        {reading.label && (
                                            <span className="text-xs text-amber-600 dark:text-amber-400 ml-2">
                                                ({reading.label})
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* Vespers Section */}
            {hasVespers && (
                <div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        🌙 Вечірня (Паремії Старого Завіту):
                    </h4>
                    <ul className="ml-4">
                        {vespers!.map((reading, idx) => (
                            <li key={idx} className="text-amber-900 dark:text-amber-100 mb-1">
                                <span className="font-medium">{idx + 1}.</span> {reading.reading}
                                {reading.label && (
                                    <span className="text-xs text-amber-600 dark:text-amber-400 ml-2">
                                        — {reading.label}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
