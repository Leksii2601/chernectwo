'use client';

import React from 'react';
import { TEXT_CONFIG, type ScreenSize } from './useAccessibility';

// Generate cursor SVG as a proper data URI  
function cursorSvg(size: number) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24'><path d='M5 3l14 7-6 2-3 7z' fill='black' stroke='white' stroke-width='1.5'/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${Math.round(size * 0.15)} ${Math.round(size * 0.08)}, auto`;
}

export function AccessibilityGlobalStyles({ screen }: { screen: ScreenSize }) {
    const cfg = TEXT_CONFIG[screen];

    return (
        <style jsx global>{`
            /* ===== LINK HIGHLIGHTING ===== */
            html.a11y-links a {
                background-color: rgba(251, 191, 36, 0.2) !important;
                text-decoration: underline 3px #d97706 !important;
                text-underline-offset: 3px !important;
                outline: 2px solid #fbbf24 !important;
                outline-offset: 1px !important;
                border-radius: 2px !important;
            }
            html.a11y-links a,
            html.a11y-links a span,
            html.a11y-links a p,
            html.a11y-links a div,
            html.a11y-links a h1, html.a11y-links a h2,
            html.a11y-links a h3, html.a11y-links a h4 {
                color: #92400e !important;
            }

            /* ===== LINE HEIGHT ===== */
            html[data-lh="1"] p, html[data-lh="1"] span, html[data-lh="1"] li,
            html[data-lh="1"] td, html[data-lh="1"] h1, html[data-lh="1"] h2,
            html[data-lh="1"] h3, html[data-lh="1"] h4, html[data-lh="1"] label,
            html[data-lh="1"] a { line-height: ${cfg.lineHeights[1]} !important; }
            
            html[data-lh="2"] p, html[data-lh="2"] span, html[data-lh="2"] li,
            html[data-lh="2"] td, html[data-lh="2"] h1, html[data-lh="2"] h2,
            html[data-lh="2"] h3, html[data-lh="2"] h4, html[data-lh="2"] label,
            html[data-lh="2"] a { line-height: ${cfg.lineHeights[2]} !important; }
            
            html[data-lh="3"] p, html[data-lh="3"] span, html[data-lh="3"] li,
            html[data-lh="3"] td, html[data-lh="3"] h1, html[data-lh="3"] h2,
            html[data-lh="3"] h3, html[data-lh="3"] h4, html[data-lh="3"] label,
            html[data-lh="3"] a { line-height: ${cfg.lineHeights[3]} !important; }

            /* ===== LETTER + WORD SPACING ===== */
            html[data-ls="1"] p, html[data-ls="1"] span, html[data-ls="1"] li,
            html[data-ls="1"] td, html[data-ls="1"] h1, html[data-ls="1"] h2,
            html[data-ls="1"] h3, html[data-ls="1"] h4, html[data-ls="1"] label,
            html[data-ls="1"] a, html[data-ls="1"] button { 
                letter-spacing: ${cfg.letterSpacings[1]} !important; 
                word-spacing: ${cfg.wordSpacings[1]} !important;
            }
            html[data-ls="2"] p, html[data-ls="2"] span, html[data-ls="2"] li,
            html[data-ls="2"] td, html[data-ls="2"] h1, html[data-ls="2"] h2,
            html[data-ls="2"] h3, html[data-ls="2"] h4, html[data-ls="2"] label,
            html[data-ls="2"] a, html[data-ls="2"] button { 
                letter-spacing: ${cfg.letterSpacings[2]} !important; 
                word-spacing: ${cfg.wordSpacings[2]} !important;
            }
            html[data-ls="3"] p, html[data-ls="3"] span, html[data-ls="3"] li,
            html[data-ls="3"] td, html[data-ls="3"] h1, html[data-ls="3"] h2,
            html[data-ls="3"] h3, html[data-ls="3"] h4, html[data-ls="3"] label,
            html[data-ls="3"] a, html[data-ls="3"] button { 
                letter-spacing: ${cfg.letterSpacings[3]} !important; 
                word-spacing: ${cfg.wordSpacings[3]} !important;
            }

            /* ===== ALIGNMENT ===== */
            [data-align="center"] p, [data-align="center"] h1, [data-align="center"] h2,
            [data-align="center"] h3, [data-align="center"] h4, [data-align="center"] span,
            [data-align="center"] li, 
            [data-align="center"] div:not([class*="fixed"]):not([class*="absolute"]):not([class*="flex"]):not([class*="grid"]) { 
                text-align: center !important; 
            }
            [data-align="right"] p, [data-align="right"] h1, [data-align="right"] h2,
            [data-align="right"] h3, [data-align="right"] h4, [data-align="right"] span,
            [data-align="right"] li,
            [data-align="right"] div:not([class*="fixed"]):not([class*="absolute"]):not([class*="flex"]):not([class*="grid"]) { 
                text-align: right !important; 
            }
            [data-align="justify"] p, [data-align="justify"] h1, [data-align="justify"] h2,
            [data-align="justify"] h3, [data-align="justify"] h4, [data-align="justify"] span,
            [data-align="justify"] li,
            [data-align="justify"] div:not([class*="fixed"]):not([class*="absolute"]):not([class*="flex"]):not([class*="grid"]) { 
                text-align: justify !important; 
            }

            /* ===== BIG CURSOR ===== */
            html[data-cursor="1"],
            html[data-cursor="1"] * { cursor: ${cursorSvg(32)} !important; }
            html[data-cursor="2"],
            html[data-cursor="2"] * { cursor: ${cursorSvg(48)} !important; }
            html[data-cursor="3"],
            html[data-cursor="3"] * { cursor: ${cursorSvg(64)} !important; }
        `}</style>
    );
}
