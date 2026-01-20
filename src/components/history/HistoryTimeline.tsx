'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Calendar } from 'lucide-react';

interface HistoryEvent {
  year: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery?: string[];
}

const TIMELINE_DATA: HistoryEvent[] = [
  {
    year: '975',
    title: 'Перша згадка',
    shortDescription: 'Перша письмова згадка про Жидичин в Іпатіївському літописі.',
    fullDescription: 'У 975 році в Іпатіївському літописі вперше згадується Жидичин. Це одна з найдавніших згадок про поселення на Волині, що свідчить про глибоке історичне коріння монастиря та його значення у духовному житті краю ще з часів Київської Русі.',
    image: '/media/history.jpg',
  },
  {
    year: '1227',
    title: 'Приїзд Данила Галицького',
    shortDescription: 'Князь Данило Галицький приїздить до Жидичина на поклоніння чудотворній іконі.',
    fullDescription: 'У 1227 році Великий князь Данило Галицький відвідав Жидичинський монастир, щоб поклонитися чудотворній іконі Святого Миколая. Ця подія підкреслює високий статус обителі як духовного центру, до якого зверталися правителі за молитовною підтримкою.',
    image: '/media/piligrims.jpg',
  },
  {
    year: '1496',
    title: 'Напад кримських татар',
    shortDescription: 'Спустошливі набіги татарських орд на Волинь та руйнування монастиря.',
    fullDescription: 'Наприкінці XV століття Жидичинський монастир зазнав значних руйнувань внаслідок набігів кримських татар. Обитель була спалена, але непохитна віра ченців та підтримка місцевого люду дозволили відбудувати святиню з попелу.',
    image: '/media/history.jpg', // Placeholder
  },
  {
    year: '1608',
    title: 'Унійна доба',
    shortDescription: 'Монастир переходить під юрисдикцію уніатської церкви.',
    fullDescription: 'На початку XVII століття, внаслідок релігійних змін у Речі Посполитій, Жидичинський монастир перейшов у підпорядкування Греко-Католицької Церкви. Цей період позначився значним архітектурним розбудовою та зміною внутрішнього укладу життя обителі.',
    image: '/media/life.jpg',
  },
  {
    year: '1633',
    title: 'Святитель Петро Могила',
    shortDescription: 'Митрополит Петро Могила повертає монастирю давні права та привілеї.',
    fullDescription: 'Видатний київський митрополит Петро Могила опікувався Жидичинським монастирем, сприяючи утвердженню православ’я та розвитку освіти. Його діяльність значно піднесла авторитет обителі.',
    image: '/media/contacts.jpg', // Placeholder
   },
  {
    year: '1839',
    title: 'Повернення православ\'я',
    shortDescription: 'Монастир повертається в лоно Православної Церкви.',
    fullDescription: 'Після Полоцького церковного собору 1839 року Жидичинський монастир було повернуто до Православної Церкви. Це стало початком нового етапу відродження давніх православних традицій на цих землях.',
    image: '/media/donate.jpg',
  },
  {
    year: '1914',
    title: 'Перша світова війна',
    shortDescription: 'Тяжкі випробування для обителі під час воєнних дій.',
    fullDescription: 'Перша світова війна принесла руйнування та занепад. Монастирські будівлі постраждали від обстрілів, а ченці були змушені терпіти поневіряння. Однак, незважаючи на труднощі, молитва в обителі не припинялася.',
    image: '/media/contacts.jpg', 
  },
   {
    year: '1930',
    title: 'Міжвоєнний період',
    shortDescription: 'Життя монастиря під владою Польщі у міжвоєнний час.',
    fullDescription: 'У період між двома світовими війнами монастир продовжував діяти, будучи осередком українського духовного життя на Волині, незважаючи на складні політичні обставини та утиски.',
    image: '/media/contacts.jpg', // Placeholder
  },
  {
    year: '2003',
    title: 'Відродження',
    shortDescription: 'Початок відновлення чернечого життя в незалежній Україні.',
    fullDescription: 'У 2003 році з благословення владики Якова розпочалося відродження чернечого життя у Жидичинському монастирі. Братія взялася за відбудову храмів, келій та відновлення духовного ритму життя стародавньої святині.',
    image: '/media/contacts.jpg',
  },
  {
    year: '2014',
    title: 'Капеланське служіння',
    shortDescription: 'Ченці монастиря стають духовною опорою для українських воїнів.',
    fullDescription: 'З початком російської агресії на сході України, братія монастиря активно долучилася до капеланського служіння, підтримуючи наших захисників духовно та гуманітарно на передовій.',
    image: '/media/contacts.jpg', // Placeholder
  },
    {
    year: '2019',
    title: 'Томос та ПЦУ',
    shortDescription: 'Монастир стає частиною визнаної Православної Церкви України.',
    fullDescription: 'Після отримання Томосу про автокефалію, Жидичинський монастир став важливою духовною твердинею Православної Церкви України, продовжуючи свою місію служіння Богу та українському народу.',
    image: '/media/piligrims.jpg',
  },
  {
    year: '2022',
    title: 'Волонтерський хаб',
    shortDescription: 'Монастир перетворився на центр допомоги під час повномасштабного вторгнення.',
    fullDescription: 'З перших днів великої війни монастир став прихистком для біженців та потужним волонтерським центром, з якого відправлялися тисячі тонн допомоги у постраждалі регіони та на фронт.',
    image: '/media/life.jpg', // Placeholder
  },
];

export const HistoryTimeline = () => {
    const [selectedEvent, setSelectedEvent] = useState<HistoryEvent | null>(null);
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Function to calculate exact percentage position of each node could be added
    // For now we trust the approximate logic for simple "passed" states

    useEffect(() => {
        let requestId: number;

        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementHeight = rect.height;
            
            // "Eye Level" = 35% from top of viewport
            const startOffset = windowHeight * 0.35;
            
            // If top of container is at 35% of screen, percentage is 0.
            // If bottom of container is at 35% of screen, percentage is 100.
            const currentPos = startOffset - rect.top;
            
            // Raw percentage 0 to 100
            let targetPercentage = Math.min(100, Math.max(0, (currentPos / elementHeight) * 100));

            // "Magnetic" Snap Logic
            // NEW LOGIC: Calculate position of actual DOM nodes for perfect alignment
            // _________________________________________________________________________
            
            // 1. Get all timeline nodes
            const nodes = containerRef.current.querySelectorAll('[data-timeline-node]');
            let snappedPercentage = targetPercentage;
            let minDistance = Infinity;

            const containerRect = containerRef.current.getBoundingClientRect();
           
            // Iterate not through items, but through actual DOM node positions
            nodes.forEach((node) => {
                const nodeRect = node.getBoundingClientRect();
                
                // Calculate where this node is relative to the timeline container's height (0-100%)
                // We map correct DOM position to percentage
                const relativeTop = nodeRect.top - containerRect.top + (nodeRect.height / 2);
                const nodePercentage = (relativeTop / elementHeight) * 100;
                
                const distance = Math.abs(targetPercentage - nodePercentage);

                // If close enough (e.g. within 3% ~ 30-50px depending on height)
                if (distance < 3) {
                    if (distance < minDistance) {
                        minDistance = distance;
                        snappedPercentage = nodePercentage;
                    }
                }
            });
            
            // Apply snap if found
            if (minDistance < Infinity) {
                targetPercentage = snappedPercentage;
            }
            
            setScrollPercentage(targetPercentage);
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
        // handleScroll(); // Call once initially might cause jump if not careful, better let user scroll
        
        return () => {
             window.removeEventListener('scroll', onScroll);
             if (requestId) cancelAnimationFrame(requestId);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative py-12 lg:py-24 overflow-hidden" id="timeline-container">
            {/* Background elements if needed */}
            
            <div className="max-w-[1200px] mx-auto relative px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-church font-bold text-gray-800 mb-16 uppercase tracking-wider relative z-10 inline-block bg-white px-8">
                    Хронологія подій
                </h2>
            </div>
            
            <div className="max-w-[1200px] mx-auto relative px-4">
                
                {/* Central Line Wrapper - Static Gray Line */}
                <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-gray-200 lg:-translate-x-1/2 h-full z-0 rounded-full"></div>
                
                {/* PROGRESS LINE - Dynamic Amber Line */}
                <div 
                    className="absolute left-8 lg:left-1/2 top-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 lg:-translate-x-1/2 z-0 rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(217,119,6,0.5)]"
                    style={{ height: `${scrollPercentage}%` }}
                >
                    {/* THE TRAVELING BEAD - Stays at the bottom of the progress line */}
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-amber-600 rounded-full border-4 border-white shadow-xl z-20 transition-transform duration-300">
                         {/* Glowing ring effect */}
                        <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-75"></div>
                     </div>
                </div>

                <div className="space-y-12 lg:space-y-32 relative z-10 pt-12 pb-12">
                    {TIMELINE_DATA.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const circleSize = index % 3 === 0 ? 'w-64 h-64' : index % 3 === 1 ? 'w-48 h-48' : 'w-56 h-56';
                        const circleColor = index % 2 === 0 ? 'bg-amber-50' : 'bg-stone-100';
                        
                        // Check active logic
                        // Visual "Fixation" using CSS transitions
                        const itemThreshold = (index / (TIMELINE_DATA.length - 1)) * 100;
                        const isPassed = scrollPercentage > itemThreshold;
                        const isNear = Math.abs(scrollPercentage - itemThreshold) < 5; // Within 5%

                        return (
                            <div key={index} className={`relative flex flex-col lg:flex-row items-center lg:justify-between w-full group ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                                
                                {/* DECORATIVE BACKGROUND CIRCLE */}
                                <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 rounded-full opacity-60 -z-10 transition-transform duration-700 ease-out 
                                    ${circleSize} ${circleColor}
                                    ${isEven ? 'right-12 translate-x-12' : 'left-12 -translate-x-12'}
                                    ${isNear ? 'scale-125 bg-amber-100' : 'group-hover:scale-110'}
                                `}></div>

                                {/* Date / Year (Desktop: One Side, Mobile: Next to line) */}
                                <div className={`lg:w-5/12 w-full text-left lg:text-right pl-16 lg:pl-0 ${isEven ? 'lg:pr-32 lg:text-right' : 'lg:pl-32 lg:text-left'} mb-2 lg:mb-0 relative`}>
                                     {/* Connector line for Year */}
                                     {/* Increased length w-24 -> w-32 */}
                                     <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-px w-32 transition-all duration-500
                                        ${isEven ? 'right-0' : 'left-0'}
                                        ${isPassed ? 'bg-amber-400' : 'bg-gray-300'}
                                    `}>
                                        <div className={`absolute w-1.5 h-1.5 rounded-full top-1/2 -translate-y-1/2 
                                            ${isEven ? 'left-0' : 'right-0'}
                                            ${isPassed ? 'bg-amber-600' : 'bg-gray-400'}
                                        `}></div>
                                    </div>

                                    <h3 
                                        className={`text-6xl md:text-8xl font-black transition-all duration-700 select-none
                                        ${isEven ? 'group-hover:translate-x-[-10px]' : 'group-hover:translate-x-[10px]'}
                                        ${isPassed ? 'opacity-80 text-amber-900' : 'opacity-20 text-gray-900'}
                                    `}>
                                        {item.year}
                                    </h3>
                                </div>

                                {/* Central Circle / Node */}
                                <div 
                                    data-timeline-node
                                    className="absolute left-8 lg:left-1/2 top-8 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 flex items-center justify-center"
                                >
                                    {/* The clickable center node */}
                                    <button 
                                        onClick={() => setSelectedEvent(item)}
                                        className={`relative w-8 h-8 rounded-full border-[6px] focus:outline-none z-20 transition-all duration-300
                                            ${isPassed ? 'border-amber-600 bg-white' : 'bg-white border-gray-300'}
                                            ${isNear ? '!bg-transparent !border-white shadow-[0_0_0_4px_rgba(217,119,6,1)] scale-110' : 'group-hover:scale-110'}
                                        `}
                                    >
                                    </button>
                                    
                                    {/* Horizontal Line Connector MAIN */}
                                    {/* Increased length w-40 -> w-60 as requested */}
                                    <div className={`hidden lg:block absolute h-0.5 w-60 top-1/2 -translate-y-1/2 transition-all duration-500 origin-center
                                        ${isEven ? 'right-0 translate-x-[-8px]' : 'left-0 translate-x-[8px]'}
                                        ${isPassed ? 'bg-amber-600' : 'bg-gray-800'}
                                    `}></div>

                                    {/* Extra connecting dot at the branch end */}
                                    {/* Adjusted position for longer line (-150px -> -230px, approx) */}
                                    <div className={`hidden lg:block absolute w-2 h-2 rounded-full top-1/2 -translate-y-1/2 transition-all duration-500
                                         ${isEven ? 'right-[-230px]' : 'left-[-230px]'}
                                         ${isPassed ? 'bg-amber-600 scale-125' : 'bg-gray-800'}
                                    `}></div>
                                </div>

                                {/* Content Card */}
                                <div className={`lg:w-5/12 w-full pl-16 lg:pl-0 mt-4 lg:mt-0 ${!isEven ? 'lg:pr-32 lg:text-right' : 'lg:pl-32 lg:text-left'}`}>

                                    <div 
                                        className="cursor-pointer group-hover:-translate-y-2 transition-transform duration-300 relative inline-block"
                                        onClick={() => setSelectedEvent(item)}
                                    >
                                        
                                        {/* Image Section with Decorative Borders */}
                                        <div className={`relative mb-6 ${!isEven ? 'lg:flex lg:justify-end' : ''}`}>
                                            <div className={`relative w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 z-10 mx-0
                                                ${!isEven && 'lg:ml-auto'}
                                                ${isPassed ? 'border-amber-500 ring-4 ring-amber-100' : 'border-white'}
                                                transition-all duration-500
                                            `}>
                                                <Image 
                                                    src={item.image} 
                                                    alt={item.title} 
                                                    fill 
                                                    className={`object-cover transition-transform duration-700 ${isNear ? 'scale-110' : 'group-hover:scale-110'}`} 
                                                />
                                            </div>
                                            
                                            {/* Decorative small circle attached to image */}
                                            <div className={`absolute bottom-0 w-12 h-12 rounded-full -z-0 flex items-center justify-center text-white
                                                 ${isEven ? 'right-[-10px]' : 'left-[-10px] lg:left-auto lg:right-[150px]'}
                                                 ${isPassed ? 'bg-amber-600 scale-110' : 'bg-gray-400'}
                                                 transition-all duration-500
                                            `}>
                                              <span className="text-xs font-bold">{index + 1}</span>
                                            </div>
                                        </div>

                                        <h4 className={`text-2xl font-bold mb-2 font-serif transition-colors uppercase tracking-wide
                                            ${isPassed ? 'text-amber-800' : 'text-gray-900 group-hover:text-amber-700'}
                                        `}>
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed max-w-sm font-medium">
                                            {item.shortDescription}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>

            {/* MODAL */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col md:flex-row">
                        
                        <button 
                            onClick={() => setSelectedEvent(null)}
                            className="absolute right-4 top-4 p-2 bg-white/50 rounded-full hover:bg-white transition-colors z-10"
                        >
                            <X className="w-6 h-6 text-gray-800" />
                        </button>

                        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                            <Image 
                                src={selectedEvent.image} 
                                alt={selectedEvent.title} 
                                fill 
                                className="object-cover" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <h2 className="text-5xl font-bold text-white font-church">{selectedEvent.year}</h2>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
                             <div className="flex items-center gap-2 mb-6">
                                <Calendar className="w-5 h-5 text-amber-600" />
                                <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Історична подія</span>
                             </div>
                             
                             <h3 className="text-3xl font-bold font-serif text-gray-900 mb-6">{selectedEvent.title}</h3>
                             
                             <div className="prose prose-amber text-gray-600 leading-relaxed mb-8">
                                <p>{selectedEvent.fullDescription}</p>
                             </div>

                             <button 
                                onClick={() => setSelectedEvent(null)}
                                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-bold uppercase tracking-wider"
                             >
                                Закрити
                             </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};
