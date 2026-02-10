'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'a11y-settings';

export const DEFAULT_STATES: Record<number, number> = {
    0: 0, // Large Text
    1: 0, // Line Spacing
    2: 0, // Text Spacing (letter + word)
    3: 0, // Alignment
    4: 0, // Inversion
    5: 0, // Monochrome
    6: 0, // Saturation
    7: 0, // Contrast
    8: 0, // Highlight Links
    9: 0, // Big Cursor
};

export const MAX_STATES: Record<number, number> = {
    0: 3, 1: 3, 2: 3, 3: 4,
    4: 1, 5: 1, 6: 2, 7: 3,
    8: 1, 9: 3,
};

function loadStates(): Record<number, number> {
    if (typeof window === 'undefined') return { ...DEFAULT_STATES };
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return { ...DEFAULT_STATES, ...JSON.parse(raw) };
    } catch { /* ignore */ }
    return { ...DEFAULT_STATES };
}

export type ScreenSize = 'mobile' | 'tablet' | 'desktop';

function getScreenCategory(): ScreenSize {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    if (w < 640) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
}

// Responsive values per screen size — smoother increments on smaller screens
export const TEXT_CONFIG = {
    mobile: {
        fontSizes: ['', '103%', '107%', '112%'],
        lineHeights: ['', '1.55', '1.7', '1.85'],
        letterSpacings: ['', '0.02em', '0.04em', '0.06em'],
        wordSpacings: ['', '0.06em', '0.12em', '0.2em'],
    },
    tablet: {
        fontSizes: ['', '105%', '112%', '120%'],
        lineHeights: ['', '1.6', '1.8', '2.0'],
        letterSpacings: ['', '0.03em', '0.06em', '0.09em'],
        wordSpacings: ['', '0.08em', '0.16em', '0.25em'],
    },
    desktop: {
        fontSizes: ['', '108%', '118%', '130%'],
        lineHeights: ['', '1.65', '1.9', '2.2'],
        letterSpacings: ['', '0.04em', '0.08em', '0.12em'],
        wordSpacings: ['', '0.1em', '0.2em', '0.3em'],
    },
};

export function useAccessibility() {
    const [states, setStates] = useState<Record<number, number>>(DEFAULT_STATES);
    const [hydrated, setHydrated] = useState(false);
    const [screen, setScreen] = useState<ScreenSize>('desktop');

    // Load from localStorage on mount
    useEffect(() => {
        setStates(loadStates());
        setScreen(getScreenCategory());
        setHydrated(true);
        const onResize = () => setScreen(getScreenCategory());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
    }, [states, hydrated]);

    // Apply all global effects
    useEffect(() => {
        if (!hydrated) return;
        const root = document.documentElement;
        const cfg = TEXT_CONFIG[screen];

        // CSS Filters
        const filters: string[] = [];
        if (states[4] === 1) filters.push('invert(100%)');
        if (states[5] === 1) filters.push('grayscale(100%)');
        if (states[6] === 1) filters.push('saturate(180%)');
        else if (states[6] === 2) filters.push('saturate(300%)');
        if (states[7] === 1) filters.push('contrast(125%)');
        else if (states[7] === 2) filters.push('contrast(160%)');
        else if (states[7] === 3) filters.push('contrast(200%)');
        root.style.filter = filters.length > 0 ? filters.join(' ') : '';

        // Font Size — level 0 leaves original styles intact
        root.style.fontSize = states[0] > 0 ? cfg.fontSizes[states[0]] : '';

        // Line Height
        root.setAttribute('data-lh', String(states[1]));

        // Letter + Word Spacing
        root.setAttribute('data-ls', String(states[2]));

        // Alignment
        if (states[3] >= 1) root.setAttribute('data-align', ['center', 'right', 'justify'][states[3] - 1]);
        else root.removeAttribute('data-align');

        // Highlight Links
        if (states[8] === 1) root.classList.add('a11y-links');
        else root.classList.remove('a11y-links');

        // Big Cursor
        if (states[9] > 0) root.setAttribute('data-cursor', String(states[9]));
        else root.removeAttribute('data-cursor');
    }, [states, hydrated, screen]);

    const toggleOption = useCallback((idx: number) => {
        const max = MAX_STATES[idx] ?? 1;
        setStates(prev => ({
            ...prev,
            [idx]: prev[idx] >= max ? 0 : prev[idx] + 1
        }));
    }, []);

    const resetOptions = useCallback(() => {
        setStates({ ...DEFAULT_STATES });
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return { states, screen, hydrated, toggleOption, resetOptions };
}
