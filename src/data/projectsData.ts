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
    instagram?: string;
    phone?: string;
    whatsapp?: string;
  };
}

export const projectsData: ProjectInitiative[] = [
  {
    title: "ЖИДИЧИН ЦЕНТР",
    fullTitle: "Жидичин Центр",
    socialLinks: {
      facebook: "https://www.facebook.com/ZhydychynCenter",
      instagram: "https://www.instagram.com/zhydychyncenter",
      phone: "+380123456789"
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
    title: "ВОЛОНТЕРСЬКИЙ РУХ ІМ. СИМОНА КИРИНЕЙСЬКОГО",
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
    icon: "/media/socialInitiatives/Волотерський_рух-removebg-preview.jpg", 
    socialLinks: {
      facebook: "https://www.facebook.com/"
    },
    gallery: [
       "/media/hero-2.png",
       "/media/hero-5.jpg"
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
    title: "НЕДІЛЬНА ШКОЛА",
    fullTitle: "Недільна школа",
    description: "Духовно-просвітницький центр для дітей та молоді при монастирі.",
    fullDescription: "Недільна школа працює щонеділі після Літургії. Діти вивчають Закон Божий, історію Церкви, займаються творчістю та співом.",
    status: "діючий",
    icon: "/media/socialInitiatives/logo_placeholder.png", 
    gallery: [
       "/media/hero-3.jpg"
    ],
    directions: [
        "Вивчення Закону Божого",
        "Творчі майстер-класи",
        "Організація святкових вистав"
    ]
  }
];
