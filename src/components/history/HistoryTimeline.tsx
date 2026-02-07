'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import { TextModal } from '../ui/TextModal';

import { HistoryEvent, TIMELINE_DATA_UA, TIMELINE_DATA_EN } from './historyData';
import { TimelineItem } from './TimelineItem';
import { TimelineTrack } from './TimelineTrack';
import { TimelineFooter } from './TimelineFooter';

export const HistoryTimeline = () => {
    const { language, t } = useLanguage();
    const TIMELINE_DATA = language === 'EN' ? TIMELINE_DATA_EN : TIMELINE_DATA_UA;

    const [selectedEvent, setSelectedEvent] = useState<HistoryEvent | null>(null);
    // Removed scrollPercentage state to prevent re-renders on every scroll frame
    const [snappedIndex, setSnappedIndex] = useState<number | null>(null);
    const [passedIndex, setPassedIndex] = useState(-1);
    const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    // Ref for the dynamic progress bar itself for direct DOM manipulation
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let requestId: number;

        const handleScroll = () => {
            if (!containerRef.current || !lineRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const trackHeight = lineRef.current.offsetHeight;
            const windowHeight = window.innerHeight;

            // "Eye Level" = 50% from top of viewport is where the "active point" is
            // This offset determines at what visual height the line triggers things
            const eyeLevelOffset = windowHeight * 0.5;
            const triggerPoint = eyeLevelOffset;

            // Current scroll position relative to the TIMELINE TRACK top (not container)
            // This ensures the visual line tip aligns exactly with the eyeLevelOffset
            const lineRect = lineRef.current.getBoundingClientRect();
            const currentLineTipPos = eyeLevelOffset - lineRect.top;

            // Simple Linear Progress Calculation
            let targetPercentage = (currentLineTipPos / trackHeight) * 100;
            targetPercentage = Math.min(100, Math.max(0, targetPercentage));

            // Determine Passed / Active Nodes
            const nodes = containerRef.current.querySelectorAll('[data-timeline-node]');
            let maxPassedIndex = -1;
            let currentActiveIndex = -1;

            nodes.forEach((node, idx) => {
                const nodeRect = node.getBoundingClientRect();

                // Direct Viewport Comparison:
                // Is the node's center above (or at) the trigger line?
                const nodeCenterOnScreen = nodeRect.top + (nodeRect.height / 2);

                if (nodeCenterOnScreen <= triggerPoint) {
                    maxPassedIndex = Math.max(maxPassedIndex, idx);
                }

                // Check strictly for "current" status (snap effect)
                // Use viewport distance directly
                if (Math.abs(nodeCenterOnScreen - triggerPoint) < 40) {
                    currentActiveIndex = idx;
                }
            });

            // Update States
            // unique key for "snapped" visual style, even if line doesn't snap physically
            setSnappedIndex(currentActiveIndex !== -1 ? currentActiveIndex : null);
            setPassedIndex(maxPassedIndex);

            // Visibility (Enter Viewport) Logic
            const newVisibleIndices: number[] = [];
            nodes.forEach((node, idx) => {
                const rect = node.getBoundingClientRect();
                if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                    newVisibleIndices.push(idx);
                }
            });

            setVisibleIndices(prev => {
                if (prev.length === newVisibleIndices.length && prev.every((val, i) => val === newVisibleIndices[i])) {
                    return prev;
                }
                return newVisibleIndices;
            });

            // Direct DOM manipulation for line height
            if (progressRef.current) {
                progressRef.current.style.height = `${targetPercentage}%`;
            }
        };

        const onScroll = () => {
            if (!requestId) {
                requestId = requestAnimationFrame(() => {
                    handleScroll();
                    requestId = 0;
                });
            }
        };

        window.addEventListener('scroll', onScroll);
        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (requestId) cancelAnimationFrame(requestId);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative py-12 lg:py-24 mb-[20vh] overflow-hidden" id="timeline-container">

            <div className="max-w-[1200px] mx-auto relative px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-church font-bold text-gray-800 mb-16 uppercase tracking-wider relative z-10 inline-block bg-white px-8">
                    {t('history.title')}
                </h2>
            </div>

            <div className="max-w-[1200px] mx-auto relative px-4">

                <TimelineTrack lineRef={lineRef} progressRef={progressRef} />

                <div className="space-y-16 lg:space-y-[15vh] relative z-10 pt-12 pb-32">
                    {TIMELINE_DATA.map((item, index) => (
                        <TimelineItem
                            key={index}
                            item={item}
                            index={index}
                            isPassed={index <= passedIndex}
                            isSnapped={snappedIndex === index}
                            isVisible={visibleIndices.includes(index)}
                            onClick={setSelectedEvent}
                        />
                    ))}
                </div>

                <TimelineFooter />
            </div>

            <TextModal
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
                title={selectedEvent?.title || ''}
            >
                {selectedEvent && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-amber-600" />
                            <span className="text-xl font-black text-amber-600 font-church">{selectedEvent.year}</span>
                            <span className="mx-2 text-gray-300">|</span>
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">{t('history.event_label')}</span>
                        </div>

                        <div className="prose prose-amber text-gray-700 leading-relaxed text-lg pt-4 border-t border-gray-100">
                            <p>{selectedEvent.fullDescription}</p>
                        </div>

                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="w-full py-4 bg-black text-white rounded-3xl hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl text-xs font-bold uppercase tracking-widest"
                        >
                            {t('history.close')}
                        </button>
                    </div>
                )}
            </TextModal>
        </div>
    );
};
