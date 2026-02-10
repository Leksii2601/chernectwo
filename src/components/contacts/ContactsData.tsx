import React from 'react';
import { Facebook, Youtube, Send, Instagram } from 'lucide-react';
import { PressItem } from './types';

// Custom Icons not available in Lucide
export const ViberIcon = ({ className }: { className?: string }) => (
    <img src="/media/viber-logo.svg" alt="Viber" className={className} />
);

export const WhatsappIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 448 512" fill="currentColor" className={className}>
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.5 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
);

export const pressItems: PressItem[] = [
    {
        id: 'brandbook',
        title_ua: 'БРЕНДБУК',
        title_en: 'BRANDBOOK',
        subtitle_ua: 'ВІЗУАЛЬНИЙ СТИЛЬ',
        subtitle_en: 'VISUAL IDENTITY',
        image: '/media/contacts_1.avif',
        description_ua: 'Офіційні матеріали, логотипи та правила візуального стилю Жидичинської обителі для коректного використання у медіа.',
        description_en: 'Official materials, logos, and visual style rules of the Zhydychyn Monastery for correct media usage.',
        details_ua: [],
        details_en: []
    },
    {
        id: 'naming',
        title_ua: 'ТИТУЛУВАННЯ',
        title_en: 'TITLES',
        subtitle_ua: 'ЕПІСТОЛЯРНИЙ ЕТИКЕТ',
        subtitle_en: 'FORMS OF ADDRESS',
        image: '/media/contacts_2.avif',
        description_ua: 'Правила та норми звернення до намісника та братії монастиря під час офіційного листування чи особистого спілкування, а також офіційне найменування монашої інституції.',
        description_en: 'Rules and norms of addressing the Abbot and the brethren of the monastery during official correspondence or personal communication, as well as the official naming of the monastic institution.',
        details_ua: [
            'ФОРМИ ЗВЕРНЕННЯ:',
            'Посада: Намісник Свято-Миколаївського Жидичинського монастиря',
            'Для офіційної кореспонденції: Наміснику Свято-Миколаївського Жидичинського монастиря архімандриту Константину (Марченко)',
            'Офіційне звернення: Високопреподобний архімандрит Константин',
            'Особисте звернення: «Отче Наміснику» або «Отець Константин»',
            'Звернення до братії: Всечесні отці та браття',
            '',
            'ЮРИДИЧНА НАЗВА: РО «Свято-Миколаївський чоловічий монастир Волинської єпархії УПЦ (ПЦУ)», код ЄДРПОУ 26278106',
            '',
            'ВАРІАНТИ НАЗВИ:',
            'Свято-Миколаївський Жидичинський монастир',
            'Монастир Святителя Миколая Чудотворця села Жидичин',
            'Жидичинський Свято-Миколаївський монастир'
        ],
        details_en: [
            'FORMS OF ADDRESS:',
            'Position: Abbot of the Saint Nicholas Zhydychyn Monastery',
            'Official Correspondence: To the Abbot of the Saint Nicholas Zhydychyn Monastery, Archimandrite Konstantin (Marchenko)',
            'Official Address: Very Reverend Archimandrite Konstantin',
            'Personal Address: "Father Abbot" or "Father Konstantin"',
            'Addressing the Brethren: Reverend Fathers and Brethren',
            '',
            'LEGAL NAME: RO "Holy Nicholas Monastery of the Volyn Eparchy of the OCU", EDRPOU code 26278106',
            '',
            'NAME VARIANTS:',
            'Saint Nicholas Zhydychyn Monastery',
            'Monastery of Saint Nicholas the Wonderworker of Zhydychyn',
            'Zhydychyn Saint Nicholas Monastery'
        ]
    },
];

export const getSocialLinks = (ViberIcon: React.ComponentType<{ className?: string }>, WhatsappIcon: React.ComponentType<{ className?: string }>) => [
    {
        icon: <Facebook className="w-5 h-5" />,
        href: "https://www.facebook.com/chernectvo.volyni",
        name: "Facebook"
    },
    {
        icon: <Instagram className="w-5 h-5" />,
        href: "https://www.instagram.com/chernetstvovolyni",
        name: "Instagram"
    },
    {
        icon: <Youtube className="w-5 h-5" />,
        href: "https://www.youtube.com/@chernectvo_volyni",
        name: "YouTube"
    },
    {
        icon: <WhatsappIcon className="w-5 h-5" />,
        href: "https://whatsapp.com/channel/0029VbCZlG3GpLHWYKNea425",
        name: "WhatsApp"
    },
    {
        icon: <Send className="w-5 h-5" />,
        href: "https://t.me/chernetstvo_volyni",
        name: "Telegram"
    },
    {
        icon: <ViberIcon className="w-6 h-6 transition-all duration-300 group-hover:brightness-0 group-hover:invert" />,
        href: "https://invite.viber.com/?g2=AQAB6djHxEo4k1YHgvbWNapcX0pRA%2B2o8tUn5LLB5Jv%2BX1BCZhctg2bkqIY%2BTmoM",
        name: "Viber"
    }
];
