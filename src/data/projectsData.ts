export interface ProjectInitiative {
  title: string;
  description: string;
  icon: string;
  fullTitle?: string;
  status?: string;
  grantAmount?: string;
  term?: string;
  author?: string;
  goal?: string;
  fullDescription?: string;
  directions?: string[];
  gallery?: string[];
  socialLinks?: {
    facebook?: string;
    website?: string;
    instagram?: string;
    phone?: string;
    whatsapp?: string;
  };
}

export const projectsData: ProjectInitiative[] = [
  {
    title: "Центр туристичної інформації та паломництва Жидичин Центр",
    fullTitle: "Центр туристичної інформації та паломництва Жидичин Центр",
    socialLinks: {
      facebook: "https://www.facebook.com/ZhydychynCenter",
      website: "https://zhydychyn.center"
    },
    description: "Інституція, що забезпечує екскурсійний супровід паломників та комунікацію з відвідувачами обителі.",
    fullDescription: "Центр функціонує з 2019 року та забезпечує розвиток історичної, культурної та духовної спадщини Древнього Жидичина. Місія інституції - відкриваємо Древній Жидичин цілому світу.",
    directions: [
      "Прийом паломників і гостей",
      "Дослідження та осмислення спадщини",
      "Комунікація, маркетинг і промоція",
      "Соціальні й освітні ініціативи"
    ],
    status: "реалізовано",
    icon: "/media/socialInitiatives/Жидичин_центр-removebg-preview.png",
    gallery: [
      "/media/hero-1.jpg",
      "/media/hero-2.png",
      "/media/hero-3.jpg"
    ]
  },
  {
    title: "Волонтерський рух ім. Симона Киринейського",
    fullTitle: "Волонтерський рух ім. Симона Киринейського",
    description: "Координація та допомога прихожанам під час богослужінь, організація благодійних ярмарків.",
    fullDescription: "Волонтерський рух функціонує з 2021 року та об’єднує активних вірян довкола питань турботи про духовні, соціальні та фізичні потреби громади.",
    directions: [
      "Консультації та комунікації з прихожанами",
      "Медична допомога під час богослужінь",
      "Організація благодійних ярмарків",
      "Реабілітація військових"
    ],
    status: "діючий",
    icon: "/media/socialInitiatives/Волотерський_рух-removebg-preview.png",
    socialLinks: {
      facebook: "https://www.facebook.com/"
    },
    gallery: [
       "/media/hero-2.png",
       "/media/hero-5.jpg"
    ]
  },
  {
    title: "Хор Воскресіння",
    fullTitle: "Хор Воскресіння",
    description: "Хор та мистецькі проєкти при монастирі.",
    fullDescription: "Розвиток хорового співу та організація культурно-мистецьких подій.",
    status: "діючий",
    icon: "/media/socialInitiatives/Воскресіння-removebg-preview.png",
    gallery: [
      "/media/hero-2.png"
    ]
  },
  {
    title: "ІНФОРМАЦІЙНА ПЛАТФОРМА ЗАВТРА",
    fullTitle: "Інформаційна платформа 'Завтра'",
    description: "Просвітницький медіа-проєкт для молоді про цінності, культуру та майбутнє.",
    fullDescription: "Медійна ініціатива, що створює контент для молоді, обговорюючи актуальні питання сьогодення крізь призму християнських цінностей.",
    status: "діючий",
    icon: "/media/socialInitiatives/Інформаційна_платформа_завтра-removebg-preview.png",
    gallery: [
      "/media/hero-4.jpg"
    ]
  },
  {
    title: "PALAMAR.UA",
    fullTitle: "Palamar UA",
    description: "Всеукраїнська спільнота паламарів.",
    fullDescription: "Об'єднання та комунікація паламарів, обмін досвідом та організація спільних заходів.",
    status: "діючий",
    icon: "/media/socialInitiatives/Паламар_юа-removebg-preview.png",
    gallery: [
      "/media/hero-3.jpg"
    ]
  },
  {
    title: "НЕДІЛЬНА ШКОЛА",
    fullTitle: "Недільна школа",
    description: "Духовно-просвітницький центр для дітей та молоді при монастирі.",
    fullDescription: "Недільна школа працює щонеділі після Літургії. Діти вивчають Закон Божий, історію Церкви, займаються творчістю та співом.",
    status: "діючий",
    icon: "/media/socialInitiatives/Недільна_школа__1_-removebg-preview.png",
    gallery: [
       "/media/hero-3.jpg"
    ],
    directions: [
        "Вивчення Закону Божого",
        "Творчі майстер-класи",
        "Організація святкових вистав"
    ]
  },
  {
    title: "Добровільна пожежна команда",
    fullTitle: "Добровільна пожежна команда",
    description: "Служба порядку та безпеки монастирського комплексу.",
    fullDescription: "Забезпечення правопорядку та безпеки під час богослужінь та масових заходів на території монастиря.",
    status: "діючий",
    icon: "/media/socialInitiatives/Внутрішня_безпека-removebg-preview.png",
    gallery: [
      "/media/hero-1.jpg"
    ]
  },
    {
    title: "САДИ АРХІМАНДРІЇ",
    fullTitle: "Сади Архімандрії",
    description: "Відновлення історичних садів монастиря як простору для молитви, праці та відпочинку.",
    fullDescription: "Відновлення історичних садів монастиря як простору для молитви, праці та відпочинку. Сад стане місцем проведення освітніх заходів з екології та садівництва.",
    status: "в процесі",
    icon: "/media/socialInitiatives/Сади_архімандрії__1_-removebg-preview.png",
    gallery: [
       "/media/hero-2.png",
       "/media/hero-1.jpg"
    ]
  },
  {
    title: "ІСТОРИЧНА АРЕНА: ZHYDYHYN HISTORY HALL",
    fullTitle: "ІСТОРИЧНА АРЕНА: ZHYDYHYN HISTORY HALL",
    description: "Театр історичної реконструкції та жива історія Древнього Жидичина.",
    fullDescription: "Театралізовані дійства та реконструкції історичних подій, пов'язаних з монастирем та історією Волині.",
    status: "діючий",
    icon: "/media/socialInitiatives/Історична_арена-removebg-preview.png",
    gallery: [
      "/media/hero-5.jpg"
    ]
  },
  {
    title: "Капеланське служіння",
    fullTitle: "Капеланське служіння",
    description: "Капеланське служіння у 229-му окремому батальйоні метеріального забезпечення несе ієромонах Пімен (Мех), насельник Жидичинського Свято-Миколаївського монастиря ПЦУ.",
    fullDescription: "Капеланське служіння у 229-му окремому батальйоні метеріального забезпечення несе ієромонах Пімен (Мех), насельник Жидичинського Свято-Миколаївського монастиря ПЦУ.",
    status: "діючий",
    icon: "/media/socialInitiatives/Капеланське_служіння-removebg-preview.png",
    gallery: [
      "/media/hero-5.jpg"
    ]
  }
];
