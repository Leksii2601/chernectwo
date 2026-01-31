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
    side?: 'left' | 'right';
    layoutType?: 'default' | 'image-bottom' | 'image-top' | 'minimal';
}

import { useLanguage } from '@/context/LanguageContext';

const TIMELINE_DATA_UA: HistoryEvent[] = [
    {
        year: '975',
        title: 'Перша згадка',
        shortDescription: 'Жидичинський архімандрит Анект дарує напрестольне Євангеліє Жидичинській церкві.',
        fullDescription: 'У 975 році Жидичинський архімандрит Анект дарує напрестольне Євангеліє Жидичинській церкві. Ця подія згадується у Василіанських хроніках і вважається однією з перших письмових згадок.',
        image: '/media/history.jpg',
        side: 'left',
        layoutType: 'image-bottom',
    },
    {
        year: '1227',
        title: 'Візит Данила Галицького',
        shortDescription: 'Князь Данило Романович їде у Жидичин на поклін до ікони Святого Миколая.',
        fullDescription: 'У 1227 році князь Данило Романович відвідав монастир «на поклін до ікони Святого Миколая», що зафіксовано у Галицько-Волинському літописі. Це свідчить про високий духовний статус обителі.',
        image: '/media/piligrims.jpg',
        side: 'right',
        layoutType: 'default',
    },
    {
        year: '1335',
        title: 'Статус Архімандрії',
        shortDescription: 'Жидичинський монастир отримує статус архімандрії.',
        fullDescription: 'У 1335 році Жидичинський монастир офіційно отримує статус архімандрії, що підкреслює його адміністративну та духовну вагу в регіоні.',
        image: '/media/life.jpg',
        side: 'left',
        layoutType: 'image-top',
    },
    {
        year: '1399',
        title: 'Чудо ікони',
        shortDescription: 'Чудо від ікони Миколая Жидичинського у Лукомлі.',
        fullDescription: 'В Іпатіївському літописі згадується чудо від ікони Миколая Жидичинського, що сталося у Лукомлі, зміцнюючи віру вірян у святість цієї реліквії.',
        image: '/media/piligrims.jpg',
        side: 'right',
        layoutType: 'default',
    },
    {
        year: '1491',
        title: 'Титул Лаври',
        shortDescription: 'За написом у рукописному Євангеліє монастир іменується Лаврою.',
        fullDescription: 'У 1491 році, згідно з написом у рукописному Євангеліє, Жидичинський монастир вже іменується Лаврою, що ставить його в один ряд з найбільшими духовними центрами.',
        image: '/media/history.jpg',
        side: 'left',
        layoutType: 'image-bottom',
    },
    {
        year: '1496',
        title: 'Напад Татар',
        shortDescription: 'Жидичинський монастир спалено кримськими татарами.',
        fullDescription: 'Трагічна сторінка історії: у 1496 році Київський літопис фіксує спалення монастиря кримськими татарами. Обитель зазнала руйнувань, але згодом відродилася.',
        image: '/media/contacts.jpg',
        side: 'right',
        layoutType: 'image-top',
    },
    {
        year: '1507',
        title: 'Кам’яна Церква',
        shortDescription: 'Будівництво кам’яної церкви коштом князя Костянтина Острозького.',
        fullDescription: 'У 1507 році розпочинається будівництво нової кам’яної церкви у Жидичині за підтримки та коштом видатного князя Костянтина Острозького.',
        image: '/media/donate.jpg',
        side: 'left',
        layoutType: 'default',
    },
    {
        year: '1552',
        title: 'Архімандрича Вежа',
        shortDescription: 'Монастир утримує Архімандричу вежу Луцького замку.',
        fullDescription: 'Монастир мав значні статки та вплив, адже у 1552 році за власний кошт утримував одну з оборонних веж Луцького замку — Архімандричу вежу.',
        image: '/media/life.jpg',
        side: 'right',
        layoutType: 'image-bottom',
    },
    {
        year: '1608',
        title: 'Унійна Конфесія',
        shortDescription: 'Перехід монастиря до унійної конфесії.',
        fullDescription: 'У 1608 році, внаслідок релігійних процесів у Речі Посполитій, Жидичинський монастир переходить у підпорядкування унійної церкви.',
        image: '/media/piligrims.jpg',
        side: 'left',
        layoutType: 'image-top',
    },
    {
        year: '1659',
        title: 'Ікона Богоматері',
        shortDescription: 'В підземеллях зберігається чудотворна ікона Холмської Богоматері.',
        fullDescription: 'У неспокійні часи 1659 року підземелля обителі стали сховком для святині — образу чудотворної ікони Холмської Богоматері.',
        image: '/media/history.jpg',
        side: 'right',
        layoutType: 'default',
    },
    {
        year: '1723',
        title: 'Велика Забудова',
        shortDescription: 'Масштабна розбудова монастиря єпископом Іосифом Левицьким.',
        fullDescription: '1723 рік позначився великою розбудовою архітектурного ансамблю монастиря, яку фінансував холмський унійний єпископ Іосиф Левицький.',
        image: '/media/donate.jpg',
        side: 'left',
        layoutType: 'image-bottom',
    },
    {
        year: '1798',
        title: 'Ченці Трапісти',
        shortDescription: 'Поселення у монастирі ченців трапістів.',
        fullDescription: 'Наприкінці XVIII століття у стінах монастиря оселилися ченці ордену трапістів, принісши свої традиції та устав.',
        image: '/media/contacts.jpg',
        side: 'right',
        layoutType: 'image-top',
    },
    {
        year: '1826',
        title: 'Ліквідація',
        shortDescription: 'Офіційна ліквідація монастиря.',
        fullDescription: 'У 1826 році російська імперська влада прийняла рішення про ліквідацію Жидичинського монастиря, перервавши багатовікову чернечу традицію.',
        image: '/media/life.jpg',
        side: 'left',
        layoutType: 'default',
    },
    {
        year: '1897',
        title: 'Домовий Храм',
        shortDescription: 'Освячення домового храму у Палаці митрополитів.',
        fullDescription: 'У 1897 році відбулося освячення домового храму в Палаці митрополитів на честь трьох віленських мучеників: Антонія, Іоанна та Євстафія.',
        image: '/media/piligrims.jpg',
        side: 'right',
        layoutType: 'image-bottom',
    },
    {
        year: '1935',
        title: 'Переклад Письма',
        shortDescription: 'Комісія по перекладу Святого Письма на українську мову.',
        fullDescription: 'У 1935 році в Жидичині під керівництвом митрополита Полікарпа Сікорського плідно працювала комісія над перекладом Святого Письма на українську мову.',
        image: '/media/history.jpg',
        side: 'left',
        layoutType: 'image-top',
    },
    {
        year: '2003',
        title: 'Відродження',
        shortDescription: 'Початок відродження Жидичинського монастиря (23.07.2003).',
        fullDescription: '23 липня 2003 року розпочалася нова епоха — відродження чернечого життя у давньому Жидичинському монастирі.',
        image: '/media/donate.jpg',
        side: 'right',
        layoutType: 'default',
    },
    {
        year: '2005',
        title: 'Храм Миколи Святоші',
        shortDescription: 'Освячення домового храму на честь Миколи Святоші (19.02.2005).',
        fullDescription: '19 лютого 2005 року було освячено домовий храм на честь преподобного Миколи Святоші, князя Луцького.',
        image: '/media/contacts.jpg',
        side: 'left',
        layoutType: 'image-bottom',
    },
    {
        year: '2010',
        title: 'Свято-Духівський скит',
        shortDescription: 'Освячення Свято-Духівського скита (14.10.2010).',
        fullDescription: '14 жовтня 2010 року відбулося урочисте освячення Свято-Духівського скита монастиря.',
        image: '/media/life.jpg',
        side: 'right',
        layoutType: 'image-top',
    },
    {
        year: '2015',
        title: 'Петро-Павлівський скит',
        shortDescription: 'Освячення Петро-Павлівського скита (21.12.2015).',
        fullDescription: '21 грудня 2015 року монастирська родина поповнилася ще однією святинею — освячено Петро-Павлівський скит.',
        image: '/media/piligrims.jpg',
        side: 'left',
        layoutType: 'default',
    },
    {
        year: '2016',
        title: 'Архімандрія',
        shortDescription: 'Відновлення статусу архімандрії (17.03.2016).',
        fullDescription: '17 березня 2016 року історична справедливість була відновлена — монастирю повернуто древній статус архімандрії.',
        image: '/media/history.jpg',
        side: 'right',
        layoutType: 'image-bottom',
    },
    {
        year: '2019',
        title: 'Перехід до ПЦУ',
        shortDescription: 'Громада приєдналася до ПЦУ (17.02.2019).',
        fullDescription: '17 лютого 2019 року релігійна громада Свято-Миколаївської церкви прийняла історичне рішення про перехід до Православної Церкви України.',
        image: '/media/donate.jpg',
        side: 'left',
        layoutType: 'image-top',
    },
    {
        year: '2020',
        title: 'Усипальниця',
        shortDescription: 'Віднайдення Монастирської усипальниці (15.02.2020).',
        fullDescription: '15 лютого 2020 року в підземеллях Миколаївського храму було віднайдено давню монастирську усипальницю.',
        image: '/media/contacts.jpg',
        side: 'right',
        layoutType: 'default',
    },
];

const TIMELINE_DATA_EN: HistoryEvent[] = [
    {
        year: '975',
        title: 'First Mention',
        shortDescription: 'Archimandrite Anekt presents the Gospel to the Zhydychyn Church.',
        fullDescription: 'In 975, the Zhydychyn Archimandrite Anekt presented the Altar Gospel to the Zhydychyn Church. This event is mentioned in the Basilian Chronicles and is considered one of the first written mentions.',
        image: '/media/history.jpg',
        side: 'left',
        layoutType: 'image-bottom',
    },
    {
        year: '1227',
        title: 'Visit of Daniel of Galicia',
        shortDescription: 'Prince Danylo Romanovych goes to Zhydychyn to bow to the icon of St. Nicholas.',
        fullDescription: 'In 1227, Prince Danylo Romanovych visited the monastery "to bow to the icon of St. Nicholas," as recorded in the Galician-Volhynian Chronicle. This testifies to the high spiritual status of the monastery.',
        image: '/media/piligrims.jpg',
        side: 'right',
        layoutType: 'default',
    },
    {
        year: '1335',
        title: 'Archimandrite Status',
        shortDescription: 'Zhydychyn Monastery receives the status of Archimandrite.',
        fullDescription: 'In 1335, the Zhydychyn Monastery officially received the status of an Archimandrite, emphasizing its administrative and spiritual importance in the region.',
        image: '/media/life.jpg',
        side: 'left',
        layoutType: 'image-top',
    },
    {
        year: '1399',
        title: 'Miracle of the Icon',
        shortDescription: 'Miracle from the icon of Nicholas of Zhydychyn in Lukoml.',
        fullDescription: 'The Hypatian Chronicle mentions a miracle from the icon of Nicholas of Zhydychyn that occurred in Lukoml, strengthening the believers\' faith in the sanctity of this relic.',
        image: '/media/piligrims.jpg',
        side: 'right',
        layoutType: 'default',
    },
    {
        year: '1491',
        title: 'Lavra Title',
        shortDescription: 'According to the inscription in the handwritten Gospel, the monastery is called Lavra.',
        fullDescription: 'In 1491, according to an inscription in a handwritten Gospel, the Zhydychyn Monastery was already called Lavra, placing it on par with the largest spiritual centers.',
        image: '/media/history.jpg',
        side: 'left',
        layoutType: 'image-bottom',
    },
    {
        year: '1496',
        title: 'Tatar Attack',
        shortDescription: 'Zhydychyn Monastery burned by Crimean Tatars.',
        fullDescription: 'A tragic page of history: in 1496, the Kyiv Chronicle records the burning of the monastery by Crimean Tatars. The monastery suffered destruction but was later reborn.',
        image: '/media/contacts.jpg',
        side: 'right',
        layoutType: 'image-top',
    },
    {
        year: '1507',
        title: 'Stone Church',
        shortDescription: 'Construction of a stone church at the expense of Prince Konstantin Ostrogski.',
        fullDescription: 'In 1507, the construction of a new stone church in Zhydychyn began with the support and funding of the prominent Prince Konstantin Ostrogski.',
        image: '/media/donate.jpg',
        side: 'left',
        layoutType: 'default',
    },
    {
        year: '1552',
        title: 'Archimandrite Tower',
        shortDescription: 'The monastery maintains the Archimandrite Tower of Lutsk Castle.',
        fullDescription: 'The monastery had significant wealth and influence, as in 1552 it maintained one of the defensive towers of Lutsk Castle—the Archimandrite Tower—at its own expense.',
        image: '/media/life.jpg',
        side: 'right',
        layoutType: 'image-bottom',
    },
    {
        year: '1608',
        title: 'Uniate Period',
        shortDescription: 'Transition of the monastery to the Uniate confession.',
        fullDescription: 'In 1608, due to religious processes in the Polish-Lithuanian Commonwealth, the Zhydychyn Monastery came under the jurisdiction of the Uniate Church.',
        image: '/media/piligrims.jpg',
        side: 'left',
        layoutType: 'image-top',
    },
    {
        year: '1659',
        title: 'Icon of Mother of God',
        shortDescription: 'The miraculous icon of the Kholm Mother of God is stored in the dungeons.',
        fullDescription: 'In the turbulent times of 1659, the monastery dungeons became a hiding place for a shrine—the miraculous icon of the Kholm Mother of God.',
        image: '/media/history.jpg',
        side: 'right',
        layoutType: 'default',
    },
    {
        year: '1723',
        title: 'Great Construction',
        shortDescription: 'Large-scale expansion of the monastery by Bishop Joseph Levytsky.',
        fullDescription: 'The year 1723 was marked by a major expansion of the monastery\'s architectural ensemble, funded by the Kholm Uniate Bishop Joseph Levytsky.',
        image: '/media/donate.jpg',
        side: 'left',
        layoutType: 'image-bottom',
    },
    {
        year: '1798',
        title: 'Trappist Monks',
        shortDescription: 'Settlement of Trappist monks in the monastery.',
        fullDescription: 'At the end of the 18th century, monks of the Trappist order settled within the monastery walls, bringing their traditions and charter.',
        image: '/media/contacts.jpg',
        side: 'right',
        layoutType: 'image-top',
    },
    {
        year: '1826',
        title: 'Liquidation',
        shortDescription: 'Official liquidation of the monastery.',
        fullDescription: 'In 1826, the Russian imperial authorities decided to liquidate the Zhydychyn Monastery, interrupting the centuries-old monastic tradition.',
        image: '/media/life.jpg',
        side: 'left',
        layoutType: 'default',
    },
    {
        year: '1897',
        title: 'House Church',
        shortDescription: 'Consecration of the house church in the Metropolitan\'s Palace.',
        fullDescription: 'In 1897, the house church in the Metropolitan\'s Palace was consecrated in honor of the three Vilnius martyrs: Anthony, John, and Eustathius.',
        image: '/media/piligrims.jpg',
        side: 'right',
        layoutType: 'image-bottom',
    },
    {
        year: '1935',
        title: 'Scripture Translation',
        shortDescription: 'Commission on the translation of Holy Scripture into Ukrainian.',
        fullDescription: 'In 1935, a commission worked fruitfully in Zhydychyn under the leadership of Metropolitan Polikarp Sikorsky on translating the Holy Scripture into Ukrainian.',
        image: '/media/history.jpg',
        side: 'left',
        layoutType: 'image-top',
    },
    {
        year: '2003',
        title: 'Rebirth',
        shortDescription: 'Beginning of the rebirth of Zhydychyn Monastery (July 23, 2003).',
        fullDescription: 'On July 23, 2003, a new era began—the rebirth of monastic life in the ancient Zhydychyn Monastery.',
        image: '/media/donate.jpg',
        side: 'right',
        layoutType: 'default',
    },
    {
        year: '2005',
        title: 'St. Nicholas Church',
        shortDescription: 'Consecration of the house church in honor of St. Nicholas Sviatosha.',
        fullDescription: 'On February 19, 2005, the house church in honor of the Venerable Nicholas Sviatosha, Prince of Lutsk, was consecrated.',
        image: '/media/contacts.jpg',
        side: 'left',
        layoutType: 'image-bottom',
    },
    {
        year: '2010',
        title: 'Holy Spirit Skete',
        shortDescription: 'Consecration of the Holy Spirit Skete (October 14, 2010).',
        fullDescription: 'On October 14, 2010, the solemn consecration of the Holy Spirit Skete of the monastery took place.',
        image: '/media/life.jpg',
        side: 'right',
        layoutType: 'image-top',
    },
    {
        year: '2015',
        title: 'Peter and Paul Skete',
        shortDescription: 'Consecration of the Peter and Paul Skete (December 21, 2015).',
        fullDescription: 'On December 21, 2015, the monastery family was replenished with another shrine—the Peter and Paul Skete was consecrated.',
        image: '/media/piligrims.jpg',
        side: 'left',
        layoutType: 'default',
    },
    {
        year: '2016',
        title: 'Archimandrite Status',
        shortDescription: 'Restoration of the status of Archimandrite (March 17, 2016).',
        fullDescription: 'On March 17, 2016, historical justice was restored—the ancient status of Archimandrite was returned to the monastery.',
        image: '/media/history.jpg',
        side: 'right',
        layoutType: 'image-bottom',
    },
    {
        year: '2019',
        title: 'Transition to OCU',
        shortDescription: 'Community joined the OCU (February 17, 2019).',
        fullDescription: 'On February 17, 2019, the religious community of St. Nicholas Church made a historic decision to join the Orthodox Church of Ukraine.',
        image: '/media/donate.jpg',
        side: 'left',
        layoutType: 'image-top',
    },
    {
        year: '2020',
        title: 'Crypt',
        shortDescription: 'Discovery of the Monastery crypt (February 15, 2020).',
        fullDescription: 'On February 15, 2020, an ancient monastery crypt was found in the dungeons of St. Nicholas Church.',
        image: '/media/contacts.jpg',
        side: 'right',
        layoutType: 'default',
    },
];

export const HistoryTimeline = () => {
    const { language, t } = useLanguage();
    const TIMELINE_DATA = language === 'EN' ? TIMELINE_DATA_EN : TIMELINE_DATA_UA;

    const [selectedEvent, setSelectedEvent] = useState<HistoryEvent | null>(null);
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [snappedIndex, setSnappedIndex] = useState<number | null>(null);
    const [passedIndex, setPassedIndex] = useState(-1);
    const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let requestId: number;

        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementHeight = rect.height;

            // "Eye Level" = 60% from top of viewport
            const startOffset = windowHeight * 0.3;
            const currentPos = startOffset - rect.top;

            // Raw percentage 0 to 100
            // Accelerated progress: Reach 100% when at 85% of physical scroll height
            const effectiveHeight = elementHeight * 0.8;
            let targetPercentage = Math.min(100, Math.max(0, (currentPos / effectiveHeight) * 100));

            // "Magnetic" Snap Logic
            const nodes = containerRef.current.querySelectorAll('[data-timeline-node]');
            let snappedPercentage = targetPercentage;
            let minDistance = Infinity;
            let closestNodeIndex = -1;
            let maxPassedIndex = -1;

            const containerRect = containerRef.current.getBoundingClientRect();
            const currentPx = (targetPercentage / 100) * elementHeight;

            nodes.forEach((node, idx) => {
                const nodeRect = node.getBoundingClientRect();
                const relativeTop = nodeRect.top - containerRect.top + (nodeRect.height / 2);
                const nodePercentage = (relativeTop / elementHeight) * 100;
                const nodePx = relativeTop;
                const distancePx = Math.abs(currentPx - nodePx);

                // Snap if closer than 50px
                if (distancePx < 50) {
                    if (distancePx < minDistance) {
                        minDistance = distancePx;
                        snappedPercentage = nodePercentage;
                        closestNodeIndex = idx;
                    }
                }

                // Check active logic
                if (currentPx >= nodePx - 20) {
                    maxPassedIndex = Math.max(maxPassedIndex, idx);
                }
            });



            if (minDistance < Infinity) {
                targetPercentage = snappedPercentage;
                setSnappedIndex(closestNodeIndex);
            } else {
                setSnappedIndex(null);
            }

            // Calculate Visibility for Animations
            const newVisibleIndices: number[] = [];
            nodes.forEach((node, idx) => {
                const rect = node.getBoundingClientRect();
                // If the node is roughly within the viewport (with some buffer to start animation early)
                if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                    newVisibleIndices.push(idx);
                }
            });
            // Simple optimization to avoid too many re-renders: only update if changed
            setVisibleIndices(prev => {
                if (prev.length === newVisibleIndices.length && prev.every((val, i) => val === newVisibleIndices[i])) {
                    return prev;
                }
                return newVisibleIndices;
            });

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

                {/* Central Line Wrapper - Static Gray Line */}
                <div className="absolute left-4 lg:left-1/2 top-0 bottom-[35vw] lg:bottom-[15vw] w-[2px] bg-gray-200 -translate-x-[120%] lg:-translate-x-1/2 z-0"></div>

                {/* PROGRESS LINE - Dynamic Amber Line */}
                {/* PROGRESS LINE - Dynamic Amber Line */}
                {/* Wrapped in a container that matches the static track's geometry so 100% height reaches exactly the end point */}
                <div className="absolute left-4 lg:left-1/2 top-0 bottom-[35vw] lg:bottom-[15vw] w-[3px] -translate-x-[120%] lg:-translate-x-1/2 z-10 pointer-events-none overflow-hidden">
                    <div
                        className="w-full bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.5)] transition-[height] duration-500 ease-out"
                        style={{ height: `${scrollPercentage}%` }}
                    ></div>
                </div>

                <div className="space-y-16 lg:space-y-[15vh] relative z-10 pt-12 pb-32">
                    {TIMELINE_DATA.map((item, index) => {
                        const isRight = item.side === 'right';
                        const randomSizeBase = index % 5;
                        const layoutType = item.layoutType || 'default';

                        // Varying background shapes
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
                        const isPassed = index <= passedIndex;
                        const isSnapped = snappedIndex === index;
                        const isVisible = visibleIndices.includes(index);

                        // Layout logic: On mobile, Image is ALWAYS first (order-1), Text second (order-2).
                        // On desktop:
                        // - image-top: Image (order-1), Text (order-2)
                        // - image-bottom: Text (order-1), Image (order-2)
                        // - default: Text (order-1), Image (absolute - handled separately or via order if we refactor)

                        // To allow absolute positioning for 'default' on desktop, we might keep it separate or use a clever grid.
                        // Let's settle on: Mobile = Stacked (Image Top). Desktop = Varies.

                        return (
                            <div key={index} className={`relative flex flex-col lg:flex-row items-center w-full ${isRight ? 'lg:justify-end' : 'lg:justify-start'}`}>

                                {/* DECORATIVE BACKGROUND SHAPE */}
                                <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 -z-10 transition-all duration-1000 ease-out 
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
                                    className="absolute left-4 lg:left-1/2 top-0 lg:top-1/2 -translate-x-[120%] lg:-translate-x-1/2 lg:-translate-y-1/2 flex items-center justify-center z-20"
                                >
                                    {/* The checkpoint ring */}
                                    <div
                                        className={`relative w-6 h-6 lg:w-8 lg:h-8 rounded-full border-[3px] transition-all duration-500 ease-out bg-white
                                            ${isPassed ? 'border-amber-500' : 'border-gray-300'}
                                            ${isSnapped ? 'scale-125 border-amber-500' : ''}
                                        `}
                                    >
                                        <div className={`absolute inset-[3px] rounded-full transition-all duration-500 ease-out
                                            ${isSnapped || isPassed ? 'bg-amber-500 scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'}
                                        `}></div>
                                    </div>

                                    {/* Connector Line to Content */}
                                    <div className={`absolute h-px w-8 lg:w-24 top-1/2 -translate-y-1/2 transition-all duration-500
                                        left-full
                                        ${!isRight ? 'lg:right-full lg:left-auto' : ''}
                                        ${isPassed ? 'bg-amber-500' : 'bg-gray-300'}
                                    `}></div>
                                </div>

                                {/* Content Card */}
                                <div className={`w-full relative pl-16 lg:pl-0 ${isRight ? 'lg:pl-[10vw] lg:text-left' : 'lg:pr-[10vw] lg:text-right'} lg:w-1/2`}>

                                    <div
                                        className={`cursor-pointer group flex flex-col relative
                                            items-start ${isRight ? 'lg:items-start' : 'lg:items-end'}
                                        `}
                                        onClick={() => setSelectedEvent(item)}
                                    >

                                        {/* Unified Image Container */}
                                        <div className={`
                                            relative overflow-hidden rounded-2xl lg:rounded-full shadow-lg transition-all duration-500
                                            w-full aspect-video md:w-48 md:h-48 lg:w-[15vw] lg:h-[15vw]
                                            ${isPassed ? 'border-amber-400' : 'border-white'}
                                            group-hover:shadow-xl group-hover:scale-105
                                            order-1 
                                            ${ /* Desktop Positioning Logic - REMOVED ABSOLUTE POSITIONING TO PREVENTION OVERLAP */
                                            layoutType === 'image-bottom' || layoutType === 'default' ? 'lg:order-3 lg:mt-6' :
                                                'lg:order-1 lg:mb-6' /* image-top */
                                            }
                                            mb-4 lg:mb-0
                                        `}>
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Text Content */}
                                        <div className={`flex flex-col items-start ${isRight ? 'lg:items-start' : 'lg:items-end'} z-10 order-2`}>
                                            <div className="flex flex-row items-baseline gap-4 mb-2 lg:mb-4">
                                                <span
                                                    className={`text-3xl md:text-5xl lg:text-[4vw] font-black transition-all duration-700 font-church leading-none
                                                    ${isPassed ? 'text-amber-600' : 'text-gray-300'}
                                                `}>
                                                    {item.year}
                                                </span>
                                            </div>

                                            <h4 className={`text-lg md:text-xl lg:text-[1.2vw] font-bold font-serif uppercase tracking-wide transition-colors duration-500
                                                ${isPassed ? 'text-gray-900' : 'text-gray-600'}
                                            `}>
                                                {item.title}
                                            </h4>
                                            <p className={`text-sm lg:text-[1vw] font-medium mt-2 max-w-full lg:max-w-[20vw] transition-colors duration-500 opacity-80
                                                text-left ${isRight ? 'lg:text-left' : 'lg:text-right'}
                                                ${isPassed ? 'text-gray-700' : 'text-gray-400'}
                                            `}>
                                                {item.shortDescription}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Animation: Revival Continues */}
                {/* Fixed Layout using aspect-ratio and vw for fluid scaling */}
                <div className="relative w-full h-[50vw] lg:h-[30vw] flex flex-col items-center justify-end pb-[5vw] -mt-[10vw] z-20 overflow-visible">

                    {/* Empty Track Line for Filling */}
                    {/* Ends at bottom-[41vw] on mobile to stop above the circle */}


                    <div className="relative z-10 flex flex-col items-center gap-[2vw] animate-fadeIn lg:pl-0 w-full">

                        {/* Creative Animation Node */}
                        <div className="absolute left-4 lg:left-1/2 bottom-[35vw] lg:bottom-[15vw] -translate-x-[120%] lg:-translate-x-1/2 flex items-center justify-center">
                            {/* Outer Ring */}
                            <div className="absolute w-[16vw] h-[16vw] lg:w-[8vw] lg:h-[8vw] rounded-full border border-amber-500/30 animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute w-[16vw] h-[16vw] lg:w-[8vw] lg:h-[8vw] rounded-full border-t border-b border-amber-500/60 animate-[spin_5s_linear_infinite_reverse]"></div>

                            {/* Pulse Waves */}
                            <div className="absolute w-[8vw] h-[8vw] lg:w-[4vw] lg:h-[4vw] bg-amber-500/20 rounded-full animate-ping"></div>

                            {/* Core */}
                            <div className="relative w-[6vw] h-[6vw] lg:w-[3vw] lg:h-[3vw] bg-amber-500 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.8)] flex items-center justify-center">
                                <div className="w-[3vw] h-[3vw] lg:w-[1.5vw] lg:h-[1.5vw] bg-white rounded-full animate-pulse"></div>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="relative mt-[8vw] lg:mt-[5vw] text-center">
                            <span className="block text-[6vw] lg:text-[2.5vw] font-church font-bold text-amber-800 tracking-[0.2em] uppercase animate-pulse drop-shadow-md">
                                {t('footer.rebirth')}
                            </span>
                            <span className="block text-[3vw] lg:text-[1vw] text-amber-600/80 uppercase tracking-[0.5em] mt-[1vw]">
                                {t('footer.join')}
                            </span>
                        </div>
                    </div>
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
                                <span className="text-sm font-bold uppercase tracking-widest text-gray-500">{t('history.event_label')}</span>
                            </div>

                            <h3 className="text-3xl font-bold font-serif text-gray-900 mb-6">{selectedEvent.title}</h3>

                            <div className="prose prose-amber text-gray-600 leading-relaxed mb-8">
                                <p>{selectedEvent.fullDescription}</p>
                            </div>

                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-bold uppercase tracking-wider"
                            >
                                {t('history.close')}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};
