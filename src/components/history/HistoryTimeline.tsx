'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Calendar, Plus } from 'lucide-react';

interface HistoryEvent {
  year: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery?: string[];
  side?: 'left' | 'right'; // For chaotic layout
}

const TIMELINE_DATA: HistoryEvent[] = [
  {
    year: '975',
    title: 'Перша згадка',
    shortDescription: 'Перша письмова згадка про Жидичин в Іпатіївському літописі.',
    fullDescription: 'У 975 році в Іпатіївському літописі вперше згадується Жидичин. Це одна з найдавніших згадок про поселення на Волині, що свідчить про глибоке історичне коріння монастиря та його значення у духовному житті краю ще з часів Київської Русі.',
    image: '/media/history.jpg',
    side: 'left',
  },
  {
    year: '1150',
    title: 'Розквіт обителі',
    shortDescription: 'Монастир стає центром духовного життя Волині.',
    fullDescription: 'У середині XII століття монастир значно розширюється, з’являються нові келії та господарські будівлі. Слава про святість місцевих ченців поширюється далеко за межі князівства.',
    image: '/media/piligrims.jpg',
    side: 'right',
  },
  {
    year: '1227',
    title: 'Приїзд Данила Галицького',
    shortDescription: 'Князь Данило Галицький приїздить до Жидичина на поклоніння чудотворній іконі.',
    fullDescription: 'У 1227 році Великий князь Данило Галицький відвідав Жидичинський монастир, щоб поклонитися чудотворній іконі Святого Миколая. Ця подія підкреслює високий статус обителі як духовного центру.',
    image: '/media/piligrims.jpg',
    side: 'left',
  },
  {
    year: '1300',
    title: 'Монастирська бібліотека',
    shortDescription: 'Заснування великої бібліотеки та скрипторію.',
    fullDescription: 'На початку XIV століття при монастирі засновується скрипторій, де ченці переписують богослужбові книги. Бібліотека монастиря стає однією з найбагатших на західноукраїнських землях.',
    image: '/media/life.jpg',
    side: 'right',
  },
  {
    year: '1496',
    title: 'Напад кримських татар',
    shortDescription: 'Спустошливі набіги татарських орд на Волинь та руйнування монастиря.',
    fullDescription: 'Наприкінці XV століття Жидичинський монастир зазнав значних руйнувань внаслідок набігів кримських татар. Обитель була спалена, але непохитна віра ченців та підтримка місцевого люду дозволили відбудувати святиню.',
    image: '/media/history.jpg',
    side: 'left',
  },
  {
    year: '1550',
    title: 'Відбудова',
    shortDescription: 'Масштабна відбудова після руйнувань.',
    fullDescription: 'У середині XVI століття монастир постає з попелу. Будуються нові кам’яні храми, укріплюються мури. Цей період позначений новим розквітом архітектурного ансамблю.',
    image: '/media/donate.jpg',
    side: 'left',
  },
  {
    year: '1608',
    title: 'Унійна доба',
    shortDescription: 'Монастир переходить під юрисдикцію уніатської церкви.',
    fullDescription: 'На початку XVII століття, внаслідок релігійних змін у Речі Посполитій, Жидичинський монастир перейшов у підпорядкування Греко-Католицької Церкви. Цей період позначився значним архітектурним розбудовою.',
    image: '/media/life.jpg',
    side: 'right',
  },
  {
    year: '1633',
    title: 'Святитель Петро Могила',
    shortDescription: 'Митрополит Петро Могила повертає монастирю давні права та привілеї.',
    fullDescription: 'Видатний київський митрополит Петро Могила опікувався Жидичинським монастирем, сприяючи утвердженню православ’я та розвитку освіти. Його діяльність значно піднесла авторитет обителі.',
    image: '/media/contacts.jpg',
    side: 'left',
   },
   {
    year: '1700',
    title: 'Барокова розбудова',
    shortDescription: 'Архітектурний ансамбль набуває рис українського бароко.',
    fullDescription: 'На рубежі XVII-XVIII століть храми монастиря перебудовуються у стилі українського бароко. З\'являються вишукані іконостаси та настінні розписи, що вражають своєю красою.',
    image: '/media/piligrims.jpg',
    side: 'right',
   },
  {
    year: '1839',
    title: 'Повернення православ\'я',
    shortDescription: 'Монастир повертається в лоно Православної Церкви.',
    fullDescription: 'Після Полоцького церковного собору 1839 року Жидичинський монастир було повернуто до Православної Церкви. Це стало початком нового етапу відродження давніх православних традицій.',
    image: '/media/donate.jpg',
    side: 'right',
  },
  {
    year: '1890',
    title: 'Освітній центр',
    shortDescription: 'Відкриття духовної школи для дітей.',
    fullDescription: 'Наприкінці XIX століття при монастирі відкривається школа для дітей з навколишніх сіл. Обитель стає не лише духовним, а й освітнім центром регіону.',
    image: '/media/history.jpg',
    side: 'left',
  },
  {
    year: '1914',
    title: 'Перша світова війна',
    shortDescription: 'Тяжкі випробування для обителі під час воєнних дій.',
    fullDescription: 'Перша світова війна принесла руйнування та занепад. Монастирські будівлі постраждали від обстрілів, а ченці були змушені терпіти поневіряння.',
    image: '/media/contacts.jpg', 
    side: 'right',
  },
   {
    year: '1930',
    title: 'Міжвоєнний період',
    shortDescription: 'Життя монастиря під владою Польщі у міжвоєнний час.',
    fullDescription: 'У період між двома світовими війнами монастир продовжував діяти, будучи осередком українського духовного життя на Волині.',
    image: '/media/contacts.jpg',
    side: 'left',
  },
  {
    year: '1990',
    title: 'Напередодні змін',
    shortDescription: 'Перші спроби відновити службу Божу.',
    fullDescription: 'З розпадом Радянського Союзу місцева громада починає відновлювати зруйновані святині. Проводяться перші літургії у вцілілих частинах храму.',
    image: '/media/life.jpg',
    side: 'right',
  },
  {
    year: '2003',
    title: 'Відродження',
    shortDescription: 'Початок відновлення чернечого життя в незалежній Україні.',
    fullDescription: 'У 2003 році з благословення владики Якова розпочалося відродження чернечого життя у Жидичинському монастирі. Братія взялася за відбудову храмів та келій.',
    image: '/media/contacts.jpg',
    side: 'right',
  },
  {
    year: '2014',
    title: 'Капеланське служіння',
    shortDescription: 'Ченці монастиря стають духовною опорою для українських воїнів.',
    fullDescription: 'З початком російської агресії на сході України, братія монастиря активно долучилася до капеланського служіння, підтримуючи наших захисників.',
    image: '/media/contacts.jpg',
    side: 'left',
  },
    {
    year: '2019',
    title: 'Томос та ПЦУ',
    shortDescription: 'Монастир стає частиною визнаної Православної Церкви України.',
    fullDescription: 'Після отримання Томосу про автокефалію, Жидичинський монастир став важливою духовною твердинею Православної Церкви України.',
    image: '/media/piligrims.jpg',
    side: 'right',
  },
  {
    year: '2022',
    title: 'Волонтерський хаб',
    shortDescription: 'Монастир перетворився на центр допомоги під час повномасштабного вторгнення.',
    fullDescription: 'З перших днів великої війни монастир став прихистком для біженців та потужним волонтерським центром, з якого відправлялися тисячі тонн допомоги.',
    image: '/media/life.jpg',
    side: 'left',
  },
];

export const HistoryTimeline = () => {
    const [selectedEvent, setSelectedEvent] = useState<HistoryEvent | null>(null);
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [snappedIndex, setSnappedIndex] = useState<number | null>(null);
    const [passedIndex, setPassedIndex] = useState(-1);
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
            
            // "Eye Level" = 90% from top of viewport (almost bottom)
            const startOffset = windowHeight * 0.6;
            
            // If top of container is at 90% of screen, percentage is 0.
            // If bottom of container is at 90% of screen, percentage is 100.
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
            let closestNodeIndex = -1;
            let maxPassedIndex = -1;

            const containerRect = containerRef.current.getBoundingClientRect();
            
            // Calculate vertical distance in PIXELS for more reliable feel
            // scrollPercentage 0-100 maps to elementHeight
            const currentPx = (targetPercentage / 100) * elementHeight;

            // Iterate not through items, but through actual DOM node positions
            nodes.forEach((node, idx) => {
                const nodeRect = node.getBoundingClientRect();
                
                // Calculate where this node is relative to current reading "eye level"
                // The bead follows the 'targetPercentage' which is derived from 'currentPos'
                // 'currentPos' is distance from 'startOffset' to 'rect.top'.
                // The 'relativeTop' in previous code was node relative to container top.
                // We want to snap if 'targetPercentage' is close to 'nodePercentage'.
                
                const relativeTop = nodeRect.top - containerRect.top + (nodeRect.height / 2);
                const nodePercentage = (relativeTop / elementHeight) * 100;

               
                const nodePx = relativeTop;
                const distancePx = Math.abs(currentPx - nodePx);

                // Snap if closer than 50px (approx 3rem)
                if (distancePx < 50) {
                    if (distancePx < minDistance) {
                        minDistance = distancePx;
                        snappedPercentage = nodePercentage;
                        closestNodeIndex = idx;
                    }
                }

                // Check if this node has been passed by the line
                // We add a small buffer (e.g. 20px) so it lights up just as the line hits it
                if (currentPx >= nodePx - 20) {
                    maxPassedIndex = Math.max(maxPassedIndex, idx);
                }
            });
            
            // Apply snap if found
            if (minDistance < Infinity) {
                targetPercentage = snappedPercentage;
                setSnappedIndex(closestNodeIndex);
            } else {
                setSnappedIndex(null);
            }
            
            setScrollPercentage(targetPercentage);
            setPassedIndex(maxPassedIndex);
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
        <div ref={containerRef} className="relative py-12 lg:py-24 mb-[50vh] overflow-hidden" id="timeline-container">
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
                    className="absolute left-8 lg:left-1/2 top-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 lg:-translate-x-1/2 z-10 rounded-full shadow-[0_0_15px_rgba(217,119,6,0.5)] transition-[height] duration-500 ease-out"
                    style={{ height: `${scrollPercentage}%` }}
                >
                </div>

                <div className="space-y-16 lg:space-y-24 relative z-10 pt-12 pb-12">
                    {TIMELINE_DATA.map((item, index) => {
                        // Use explicit side from data, creating chaotic pattern
                        const isRight = item.side === 'right';
                        const randomSizeBase = index % 5;
                        
                        // Varying background shapes - SQUARES mostly
                        let shapeClasses = '';
                        /* eslint-disable no-fallthrough */
                        switch (randomSizeBase) {
                            case 0:
                                shapeClasses = 'w-[500px] h-[500px] rounded-full text-amber-50/50'; // Circle
                                break;
                            case 1:
                                shapeClasses = 'w-[450px] h-[450px] rotate-12'; // Rotated square
                                break;
                            case 2:
                                shapeClasses = 'w-[600px] h-[600px] rounded-full'; // Large circle
                                break;
                            case 3:
                                shapeClasses = 'w-[450px] h-[450px] rounded-full'; // Medium circle
                                break;
                            case 4:
                                shapeClasses = 'w-[550px] h-[550px] rotate-45'; // Diamond
                                break;
                            default:
                                shapeClasses = 'w-[500px] h-[500px] rounded-full';
                        }
                         /* eslint-enable no-fallthrough */

                        const circleColor = isRight ? 'bg-amber-50' : 'bg-stone-100';
                        
                        // Check active logic - dependent on passedIndex now for reliability
                        const isPassed = index <= passedIndex;
                        const isSnapped = snappedIndex === index;

                        return (
                            <div key={index} className={`relative flex flex-col lg:flex-row items-center lg:justify-between w-full ${isRight ? '' : 'lg:flex-row-reverse'}`}>
                                
                                {/* DECORATIVE BACKGROUND SHAPE - animates only on scroll */}
                                <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 opacity-50 -z-10 transition-all duration-700 ease-out 
                                    ${shapeClasses} ${circleColor}
                                    ${isRight ? 'right-0 translate-x-12' : 'left-0 -translate-x-12'}
                                    ${isSnapped ? 'scale-110 !opacity-70 !bg-amber-100' : ''}
                                `}></div>

                                {/* Date / Year (Desktop: One Side, Mobile: Next to line) */}
                                <div className={`lg:w-5/12 w-full text-left lg:text-right pl-16 lg:pl-0 ${isRight ? 'lg:pr-36 lg:text-right' : 'lg:pl-36 lg:text-left'} mb-2 lg:mb-0 relative`}>
                                     {/* Connector line for Year */}
                                     <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-px w-32 transition-all duration-500
                                        ${isRight ? 'right-0' : 'left-0'}
                                        ${isPassed ? 'bg-amber-400' : 'bg-gray-200'}
                                    `}>
                                        <div className={`absolute w-1.5 h-1.5 rounded-full top-1/2 -translate-y-1/2 transition-all duration-500
                                            ${isRight ? 'left-0' : 'right-0'}
                                            ${isPassed ? 'bg-amber-600' : 'bg-gray-300'}
                                        `}></div>
                                    </div>

                                    <h3 
                                        className={`text-6xl md:text-8xl lg:text-9xl font-black transition-all duration-700 select-none
                                        ${isPassed ? 'opacity-90 text-amber-800' : 'opacity-15 text-gray-900'}
                                    `}>
                                        {item.year}
                                    </h3>
                                </div>

                                {/* Central Circle / Node - THE CHECKPOINT */}
                                <div 
                                    data-timeline-node
                                    className="absolute left-8 lg:left-1/2 top-8 lg:top-1/2 -translate-x-[80%] lg:-translate-x-1/2 lg:-translate-y-1/2 flex items-center justify-center"
                                >
                                    {/* The checkpoint ring - bead snaps INSIDE this */}
                                    <button 
                                        onClick={() => setSelectedEvent(item)}
                                        className={`relative w-10 h-10 rounded-full border-[3px] focus:outline-none z-20 transition-all duration-500 ease-out
                                            ${isPassed ? 'border-amber-500' : 'bg-white/80 border-gray-300'}
                                            ${isSnapped ? 'border-amber-500 scale-125' : ''}
                                        `}
                                    >
                                        {/* Inner fill when snapped or passed */}
                                        <div className={`absolute inset-[3px] rounded-full transition-all duration-500 ease-out
                                            ${isSnapped || isPassed ? 'bg-amber-500 scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'}
                                        `}></div>
                                    </button>
                                    
                                    {/* Horizontal Line Connector */}
                                    <div className={`hidden lg:block absolute h-px w-20 top-1/2 -translate-y-1/2 transition-all duration-500 origin-center
                                        ${isRight ? 'right-full mr-1' : 'left-full ml-1'}
                                        ${isPassed ? 'bg-amber-500' : 'bg-gray-300'}
                                    `}></div>
                                </div>

                                {/* Content Card */}
                                <div className={`lg:w-5/12 w-full pl-16 lg:pl-0 mt-4 lg:mt-0 ${!isRight ? 'lg:pr-24 lg:text-right' : 'lg:pl-24 lg:text-left'}`}>

                                    <div 
                                        className="cursor-pointer relative inline-block"
                                        onClick={() => setSelectedEvent(item)}
                                    >
                                        
                                        {/* Image Section - HOVER ANIMATION ONLY HERE */}
                                        <div className={`relative mb-4 w-fit lg:w-full ${!isRight ? 'lg:flex lg:justify-end' : ''} group/image`}>
                                            <div className={`relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-lg border-4 z-10 mx-0
                                                ${!isRight && 'lg:ml-auto'}
                                                ${isPassed ? 'border-amber-400' : 'border-white'}
                                                transition-all duration-500
                                                group-hover/image:shadow-xl group-hover/image:scale-105
                                            `}>
                                                <Image 
                                                    src={item.image} 
                                                    alt={item.title} 
                                                    fill 
                                                    className="object-cover transition-transform duration-500 group-hover/image:scale-110" 
                                                />
                                            </div>
                                            
                                            {/* Number badge - HOVER ANIMATION HERE */}
                                            <div className={`absolute bottom-0 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl
                                                 right-0
                                                 ${isRight ? 'lg:right-0 lg:left-auto' : 'lg:right-[290px] lg:left-0'} 
                                                 ${isPassed ? 'bg-amber-600' : 'bg-gray-400'}
                                                 transition-all duration-500
                                                 group-hover/image:scale-110 group-hover/image:bg-amber-500
                                            `}>
                                              <Plus className="w-8 h-8" />
                                            </div>
                                        </div>

                                        <h4 className={`text-xl font-bold mb-1 font-serif uppercase tracking-wide transition-colors duration-500
                                            ${isPassed ? 'text-amber-800' : 'text-gray-800'}
                                        `}>
                                            {item.title}
                                        </h4>
                                        <p className={`text-sm leading-relaxed max-w-xs font-medium transition-colors duration-500
                                            ${isPassed ? 'text-gray-600' : 'text-gray-400'}
                                        `}>
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
