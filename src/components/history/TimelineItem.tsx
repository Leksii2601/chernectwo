import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HistoryEvent } from './historyData';

interface TimelineItemProps {
    item: HistoryEvent;
    index: number;
    isPassed: boolean;
    isSnapped: boolean;
    isVisible: boolean;
    onClick: (item: HistoryEvent) => void;
}

// Visual Component (New Design)
const TimelineVisual = ({ image, index, isPassed, isSnapped }: { image: string, index: number, isPassed: boolean, isSnapped: boolean }) => {
    const variant = index % 4;
    let bgClasses = '';

    // 4 Variations of offset
    switch (variant) {
        case 0: bgClasses = 'top-10 -left-10'; break;
        case 1: bgClasses = '-top-10 -right-10'; break;
        case 2: bgClasses = '-top-10 -left-10'; break;
        case 3: bgClasses = 'top-10 -right-10'; break;
        default: bgClasses = 'top-10 -left-10';
    }

    // Conditional top margin: Variants with -top-10 (circle moving UP) need more space to avoid text overlap
    const marginClass = (variant === 1 || variant === 2) ? 'mt-24' : 'mt-6';

    return (
        <div className={`relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] flex-shrink-0 ${marginClass} mb-4`}>
            {/* Background Circle */}
            <div className={`absolute w-full h-full rounded-full bg-amber-600 z-0 transition-transform ${bgClasses} ${isSnapped ? 'scale-105 duration-700' : 'scale-100 duration-[1500ms] delay-500'}`} />

            {/* Main Image */}
            <div className={`relative w-full h-full rounded-full overflow-hidden shadow-xl z-10 transition-transform duration-500 bg-white`}>
                <Image
                    src={image}
                    alt="History Event"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
};

export const TimelineItem: React.FC<TimelineItemProps> = ({
    item,
    index,
    isPassed,
    isSnapped,
    isVisible,
    onClick
}) => {
    const isRight = item.side === 'right';
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Parallax Effects:
    // Text moves slightly UP as you scroll down (Increased range)
    // On mobile, we passing 0 to disable the effect
    const yText = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [70, -70]);
    // Image moves slightly DOWN (opposite) creates depth
    const yImage = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-70, 70]);

    // Decorative Background Shapes Logic
    const randomSizeBase = index % 5;
    let shapeClasses = '';
    switch (randomSizeBase) {
        case 0: shapeClasses = 'w-[40vw] h-[40vw] rounded-full text-amber-50/50'; break;
        case 1: shapeClasses = 'w-[35vw] h-[35vw] rotate-12'; break;
        case 2: shapeClasses = 'w-[50vw] h-[50vw] rounded-full'; break;
        case 3: shapeClasses = 'w-[35vw] h-[35vw] rounded-full'; break;
        case 4: shapeClasses = 'w-[45vw] h-[45vw] rotate-45'; break;
        default: shapeClasses = 'w-[40vw] h-[40vw] rounded-full';
    }
    const circleColor = isRight ? 'bg-amber-50' : 'bg-stone-100';

    return (
        <div
            ref={containerRef}
            className={`relative flex flex-col lg:flex-row items-start w-full mb-24 lg:mb-32 ${isRight ? 'lg:justify-end' : 'lg:justify-start'}`}
        >

            {/* DECORATIVE BACKGROUND SHAPE */}
            <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 -z-10 transition-all ease-out 
                ${isSnapped ? 'duration-1000' : 'duration-[2000ms] delay-500'}
                ${shapeClasses} ${circleColor}
                ${isRight ? 'right-0' : 'left-0'}
                ${isSnapped ? 'scale-110 !opacity-70 !bg-amber-100' : 'opacity-50'}
                ${isVisible
                    ? 'translate-x-[10%] opacity-50 rotate-0'
                    : (isRight ? 'translate-x-[100%] rotate-90 opacity-0' : '-translate-x-[100%] -rotate-90 opacity-0')
                }
            `}></div>

            {/* Central Circle / Node */}
            <div
                data-timeline-node
                className="absolute left-4 lg:left-1/2 top-60 -translate-x-[120%] lg:-translate-x-1/2 flex items-center justify-center z-20"
            >
                {/* Deep Dissipating Ripple Effect */}
                <div className={`absolute inset-0 rounded-full bg-amber-500/30 z-0
                    ${isPassed ? 'animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]' : 'opacity-0 scale-50'}
                `}></div>

                <div className={`absolute inset-0 rounded-full bg-amber-500/20 z-0 delay-1000
                    ${isPassed ? 'animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]' : 'opacity-0 scale-50'}
                `}></div>

                {/* The checkpoint ring (Fast for Sync) */}
                <div
                    className={`relative w-6 h-6 lg:w-8 lg:h-8 rounded-full border-[3px] transition-all duration-200 ease-out bg-white
                        ${isPassed ? 'border-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.6)]' : 'border-gray-300'}
                        ${isSnapped ? 'scale-125 border-amber-600' : ''}
                    `}
                >
                    <div className={`absolute inset-[3px] rounded-full transition-all duration-200 ease-out
                        ${isSnapped || isPassed ? 'bg-amber-600 scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'}
                    `}></div>
                </div>

                {/* Connector Line to Content */}
                <div className={`absolute h-px w-8 lg:w-24 top-1/2 -translate-y-1/2 transition-all duration-500
                    left-full
                    ${!isRight ? 'lg:right-full lg:left-auto' : ''}
                    ${isPassed ? 'bg-amber-600' : 'bg-gray-300'}
                `}></div>
            </div>

            {/* Content Wrapper */}
            <div className={`w-full relative pl-16 lg:pl-0 ${isRight ? 'lg:pl-[10vw] lg:text-left' : 'lg:pr-[10vw] lg:text-right'} lg:w-1/2`}>

                <div
                    className={`cursor-pointer group flex flex-col relative
                        items-start ${isRight ? 'lg:items-start' : 'lg:items-end'}
                    `}
                    onClick={() => onClick(item)}
                >
                    {/* Text Block - Title/Year FIRST as requested */}
                    {/* z-0 to sit behind image relative to stack */}
                    <motion.div
                        style={{ y: yText }}
                        className={`flex flex-col relative z-0
                        items-start text-left ${isRight ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'}
                    `}>
                        <div className="flex flex-row items-baseline gap-4 mb-2 lg:mb-4">
                            <span
                                className={`text-5xl md:text-6xl lg:text-[5vw] font-black transition-all duration-700 font-church leading-none
                                ${isPassed ? 'text-amber-600' : 'text-gray-300'}
                            `}>
                                {item.year}
                            </span>
                        </div>

                        <h4 className={`text-xl md:text-2xl lg:text-[1.5vw] font-bold font-montserrat uppercase tracking-wide transition-colors duration-500
                            ${isPassed ? 'text-gray-900' : 'text-gray-600'}
                        `}>
                            {item.title}
                        </h4>
                        <p className={`text-base lg:text-[1.2vw] font-medium mt-2 max-w-full lg:max-w-[20vw] transition-colors duration-500 opacity-80
                            text-left ${isRight ? 'lg:text-left' : 'lg:text-right'}
                            ${isPassed ? 'text-gray-700' : 'text-gray-400'}
                        `}>
                            {item.shortDescription}
                        </p>
                    </motion.div>

                    {/* Image Block - Higher Z-Index to overlap text if they cross */}
                    <motion.div style={{ y: yImage }} className="relative z-20">
                        <TimelineVisual image={item.image} index={index} isPassed={isPassed} isSnapped={isSnapped} />
                    </motion.div>

                </div>
            </div>
        </div>
    );
};
