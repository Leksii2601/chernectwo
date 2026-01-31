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

const projectsDataUA: ProjectInitiative[] = [
  {
    title: "Центр туристичної інформації та паломництва Жидичин Центр",
    fullTitle: "Центр туристичної інформації та паломництва Жидичин Центр",
    socialLinks: {
      facebook: "https://www.facebook.com/ZhydychynCenter",
      website: "https://zhydychyn.center"
    },
    description: "Інституція, що забезпечує екскурсійний супровід паломників та комунікацію з відвідувачами обителі, презентує та досліджує духовну, історичну та культурну спадщину монастиря й Жидичина.",
    fullDescription: "Центр функціонує з 2019 року та забезпечує розвиток історичної, культурної та духовної спадщини Древнього Жидичина та головного центу тяжіння - Свято-Миколаївського Жидичинського монастиря. Місія інституції - відкриваємо Древній Жидичин цілому світу.",
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
    description: "Інституція, що забезпечує координацію та допомогу прихожанам під час богослужінь, а також організацію благодійних ярмарків для збору коштів на соціально важливі ініціативи.",
    fullDescription: "Волонтерський рух функціонує з 2021 року та об’єднує активних вірян довкола питань турботи про духовні, соціальні та фізичні потреби громади.",
    directions: [
      "Консультації та комунікації з прихожанами монастиря під час богослужінь",
      "Медична допомога під час богослужінь",
      "Організація благодійних ярмарків",
      "Проведення Духовних лекторіїв",
      "Реабілітація військових та членів сімей загиблих",
      "Догляд та генеральне прибирання храму"
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
    title: "Хор «Воскресіння»",
    fullTitle: "Хор «Воскресіння»",
    description: "Хор, що служить через церковний спів, збагачуючи богослужіння молитовною глибиною, духовною красою та живою традицією сакральної музики.",
    fullDescription: "Хор «Воскресіння» діє при монастирі з 2008 року та об’єднує людей, покликаних до служіння Богові через спів. Колектив формує простір спільної молитви, духовного зростання та збереження української церковної співочої традиції, поєднуючи літургійну практику з культурною місією.",
    directions: [
      "Літургійний супровід богослужінь і церковних свят",
      "Участь у монастирських та громадських подіях духовного характеру",
      "Збереження та популяризація української сакральної музичної спадщини",
      "Участь у благодійних та меморіальних заходах",
      "Духовне та музичне формування учасників хору"
    ],
    status: "діючий",
    icon: "/media/socialInitiatives/Воскресіння-removebg-preview.png",
    gallery: [
      "/media/hero-2.png"
    ]
  },
  {
    title: "Інформаційна платформа «Завтра»",
    fullTitle: "Інформаційна платформа «Завтра»",
    description: "Просвітницький медіа-проєкт, спрямований на осмислення цінностей, культури та образу майбутнього через діалог, знання і спільну відповідальність.",
    fullDescription: "ІП «Завтра» — це платформа публічної думки та культурного діалогу, що об’єднує експертів, освітян, митців і активних громадян довкола питань ідентичності, спадщини, розвитку спільнот і майбутнього України. Проєкт формує простір для рефлексії, навчання та обміну ідеями, поєднуючи традицію з сучасними викликами.",
    directions: [
      "Створення аналітичних, публіцистичних та освітніх медіаматеріалів",
      "Популяризація культурної спадщини, історичної пам’яті та ціннісних наративів",
      "Публічні дискусії, інтерв’ю та авторські колонки",
      "Просвітницькі кампанії з питань культури, освіти та громадянської відповідальності",
      "Висвітлення локальних ініціатив і практик сталого розвитку",
      "Формування візії майбутнього через міждисциплінарний діалог"
    ],
    status: "діючий",
    icon: "/media/socialInitiatives/Інформаційна_платформа_завтра-removebg-preview.png",
    gallery: [
      "/media/hero-4.jpg"
    ]
  },
  {
    title: "Недільна школа «Промінчик»",
    fullTitle: "Недільна школа «Промінчик»",
    description: "Освітньо-виховний простір для дітей, спрямований на формування християнських цінностей, духовного зростання.",
    fullDescription: "Недільна школа «Промінчик» діє при монастирі та покликана допомагати дітям пізнавати основи християнської віри у доступній, творчій та дружній формі. Навчання поєднує духовне виховання, елементи культури й традицій, розвиток особистості.",
    status: "діючий",
    icon: "/media/socialInitiatives/Недільна_школа__1_-removebg-preview.png",
    gallery: [
      "/media/hero-3.jpg"
    ],
    directions: [
      "Вивчення основ християнської віри та біблійних історій",
      "Духовно-моральне виховання дітей",
      "Творчі заняття (малювання, спів, рукоділля)",
      "Ознайомлення з церковними традиціями та святами",
      "Участь у монастирських і громадських заходах",
      "Формування культури взаємоповаги, відповідальності та любові до ближнього"
    ]
  },
  {
    title: "Паламар.юа",
    fullTitle: "Паламар.юа",
    description: "Всеукраїнська спільнота паламарів, покликана до служіння, взаємопідтримки та розвитку літургійної культури в Православній Церкві України.",
    fullDescription: "«Паламар.юа» — це платформа єднання паламарів з різних регіонів України, спрямована на обмін досвідом, знаннями та кращими практиками церковного служіння. Спільнота працює над підвищенням рівня літургійної культури, відповідального служіння та формування сучасного християнського середовища взаємодії.",
    directions: [
      "Координація та підтримка служіння паламарів у громадах",
      "Освітні та формаційні заходи з літургійної практики",
      "Обмін досвідом і методичними матеріалами",
      "Популяризація культури служіння та церковного етикету",
      "Участь у всеукраїнських церковних ініціативах",
      "Формування мережі взаємодопомоги та наставництва"
    ],
    status: "діючий",
    icon: "/media/socialInitiatives/Паламар_юа-removebg-preview.png",
    gallery: [
      "/media/hero-3.jpg"
    ]
  },
  {
    title: "Добровільна пожежна команда",
    fullTitle: "Добровільна пожежна команда",
    description: "Служба порядку та безпеки в межах Жидичинського старостинського округу Луцької міської територіальної громади.",
    fullDescription: "Добровільна пожежна команда Жидичинського Свято-Миколаївського монастиря заснована 26 липня 2023 року з метою здійснення заходів із запобігання виникненню пожеж, їх гасіння, проведення аварійно-рятувальних та інших невідкладних робіт. Діяльність ДПК зійснюється на підставі Договору про функціонування та забезпечення добровільної пожежної команди, укладеного між Виконавчим комітетом Луцької міської ради, Луцьким районним управлінням Головного управління ДСНС України у Волинській області та Свято-Миколаївським чоловічим монастирем Волинської Єпархії УПЦ (ПЦУ). Місія - нам спокійно, коли Вам безпечно.",
    directions: [
      "Гасіння пожеж та профілактична робота з населенням",
      "Надання першої домедичної допомоги",
      "Підтримка функціонування Пункту незламності та бомбосховища"
    ],
    status: "діючий",
    icon: "/media/socialInitiatives/Внутрішня_безпека-removebg-preview.png",
    gallery: [
      "/media/hero-1.jpg"
    ]
  },
  {
    title: "Сади Архімандрії",
    fullTitle: "Сади Архімандрії",
    description: "Духовно-культурний простір тиші, праці та відновлення, що поєднує монастирську традицію, турботу про землю та культуру відповідального ставлення до створеного світу.",
    fullDescription: "«Сади архімандрії» — це простір, натхненний монастирською традицією садів і городів як місця молитви, праці та споглядання. Проєкт спрямований на збереження природної спадщини монастиря, розвиток екологічної культури та формування середовища духовного і фізичного відновлення для громади та паломників.",
    directions: [
      "Догляд і розвиток монастирських садів та зелених територій",
      "Відновлення традиційного садівництва і землеробства",
      "Екологічна просвіта та формування культури дбайливого ставлення до природи",
      "Залучення волонтерів до спільної праці та служіння",
      "Створення простору тиші, відновлення і духовного споглядання",
      "Інтеграція природного ландшафту в паломницькі та культурні маршрути"
    ],
    status: "в процесі",
    icon: "/media/socialInitiatives/Сади_архімандрії__1_-removebg-preview.png",
    gallery: [
      "/media/hero-2.png",
      "/media/hero-1.jpg"
    ]
  },
  {
    title: "Історична арена Жидичин / History Hall",
    fullTitle: "Історична арена Жидичин / History Hall",
    description: "Театр історичної реконструкції та простір живої історії, що відтворює атмосферу Древнього Жидичина та занурює відвідувачів у події минулого.",
    fullDescription: "«Історична арена Жидичин» об’єднує ентузіастів історії, дослідників і акторів-реконструкторів для популяризації історичної спадщини через живі вистави, інтерактивні події та освітні програми. Проєкт формує можливість відчути дух давніх епох, розуміння історичних процесів та культурну ідентичність громади.",
    directions: [
      "Театралізовані реконструкції історичних подій Жидичина та регіону",
      "Інтерактивні історичні майстер-класи та лекції",
      "Освітні програми для школярів, студентів та туристів",
      "Популяризація локальної історичної та культурної спадщини",
      "Створення живих історичних інсталяцій і вистав",
      "Участь у міжрегіональних та міжнародних історичних фестивалях"
    ],
    status: "діючий",
    icon: "/media/socialInitiatives/Історична_арена-removebg-preview.png",
    gallery: [
      "/media/hero-5.jpg"
    ]
  },
  {
    title: "Капеланське служіння",
    fullTitle: "Капеланське служіння",
    description: "Духовна підтримка та служіння для військових, медичних працівників, громадських організацій і членів громади, що поєднує молитву, психологічну допомогу та моральну опору.",
    fullDescription: "Капеланське служіння об’єднує духовних наставників, волонтерів і фахівців для підтримки людей у складних життєвих ситуаціях. Проєкт покликаний забезпечити присутність Церкви там, де це найбільше потрібно, поєднуючи духовну опіку з психологічною, соціальною та моральною підтримкою.",
    directions: [
      "Духовна підтримка військових і медичних працівників",
      "Психологічна та моральна опора під час кризових ситуацій",
      "Проведення молитов, духовних бесід і богослужінь у місцях служіння",
      "Співпраця з громадськими організаціями та волонтерськими ініціативами",
      "Організація навчальних і формаційних програм для капеланів",
      "Соціальна допомога та супровід сімей у кризових обставинах"

    ],
    status: "діючий",
    icon: "/media/socialInitiatives/Капеланське_служіння-removebg-preview.png",
    gallery: [
      "/media/hero-5.jpg"
    ]
  },
  {
    title: "Інтерактивна читальня",
    fullTitle: "Інтерактивна читальня",
    description: "Освітньо-бібліотечний простір при монастирі, що поєднує традиції українських сільських читалень із сучасними освітніми та культурними практиками.",
    fullDescription: "Інтерактивна читальня при монастирі відроджує дух українських культурно-освітніх ініціатив XIX–XX століть. Вона функціонує як місце навчання, саморозвитку та культурного дозвілля для громади та паломників. Простір згуртовує людей довкола книги, духовної літератури, української історії та культури, відновлюючи традиції читальні як осередку просвіти, національної свідомості та соціальної взаємодії.",
    directions: [
      "Доступ до бібліотеки та освітніх ресурсів, у тому числі духовної та історичної літератури",
      "Тематичні лекції, дискусії та історико-культурні майстер-класи",
      "Популяризація традицій сільських читалень та культури спільного читання",
      "Організація драматичних гуртків, хорів та творчих ініціатив для дітей і дорослих",
      "Підтримка національної свідомості через освіту та культурні практики",
      "Створення простору для спільного навчання, духовного розвитку та соціальної взаємодії"
    ],
    status: "діючий",
    icon: "/media/socialInitiatives/bitmap-modified-removebg-preview.png",
    gallery: []
  },
  {
    title: "Молодіжна платформа «Мирт»",
    fullTitle: "Молодіжна платформа «Мирт»",
    description: "Простір для духовного розвитку та активності молоді, який допомагає зберігати зв’язок із Церквою та формувати християнські цінності.",
    fullDescription: "Молодіжна платформа «Мирт» об’єднує молодь довкола духовного, культурного та освітнього розвитку, створюючи середовище, де молоді люди можуть рости у вірі та залишатися активними учасниками церковного життя. Проєкт сприяє формуванню духовної ідентичності, підтримує участь молоді у громадських ініціативах та допомагає зберігати віру у повсякденному житті.",
    directions: [
      "Духовне та моральне виховання молоді",
      "Організація освітніх і просвітницьких заходів при Церкві",
      "Культурні, творчі та волонтерські ініціативи",
      "Формування спільноти для спілкування та взаємної підтримки",
      "Залучення молоді до життя парафії та монастиря",
      "Популяризація християнських цінностей у молодіжному середовищі"
    ],
    status: "діючий",
    icon: "/media/socialInitiatives/photo_2026-01-22_15-56-48-modified-removebg-preview.png",
    gallery: []
  }
];

const projectsDataEN: ProjectInitiative[] = [
  {
    title: "Zhydychyn Tourist Information and Pilgrimage Center",
    fullTitle: "Zhydychyn Tourist Information and Pilgrimage Center",
    socialLinks: {
      facebook: "https://www.facebook.com/ZhydychynCenter",
      website: "https://zhydychyn.center"
    },
    description: "An institution that provides excursion support for pilgrims and communication with visitors to the monastery, presents and explores the spiritual, historical, and cultural heritage of the monastery and Zhydychyn.",
    fullDescription: "The center has been operating since 2019 and ensures the development of the historical, cultural, and spiritual heritage of Ancient Zhydychyn and the main attraction center - St. Nicholas Zhydychyn Monastery. The mission of the institution is to open Ancient Zhydychyn to the whole world.",
    directions: [
      "Reception of pilgrims and guests",
      "Research and comprehension of heritage",
      "Communication, marketing and promotion",
      "Social and educational initiatives"
    ],
    status: "realized",
    icon: "/media/socialInitiatives/Жидичин_центр-removebg-preview.png",
    gallery: [
      "/media/hero-1.jpg",
      "/media/hero-2.png",
      "/media/hero-3.jpg"
    ]
  },
  {
    title: "Simon of Cyrene Volunteer Movement",
    fullTitle: "Simon of Cyrene Volunteer Movement",
    description: "An institution that ensures coordination and assistance to parishioners during services, as well as the organization of charity fairs to raise funds for socially important initiatives.",
    fullDescription: "The volunteer movement has been operating since 2021 and unites active believers around issues of caring for the spiritual, social, and physical needs of the community.",
    directions: [
      "Consultations and communications with parishioners during services",
      "Medical assistance during services",
      "Organization of charity fairs",
      "Holding Spiritual Lectures",
      "Rehabilitation of the military and families of the fallen",
      "Care and general cleaning of the temple"
    ],
    status: "active",
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
    title: "Resurrection Choir",
    fullTitle: "Resurrection Choir",
    description: "A choir serving through church singing, enriching worship with prayerful depth, spiritual beauty, and the living tradition of sacred music.",
    fullDescription: "The Resurrection Choir has been operating at the monastery since 2008 and unites people called to serve God through singing. The collective forms a space of common prayer, spiritual growth, and preservation of the Ukrainian church singing tradition, combining liturgical practice with a cultural mission.",
    directions: [
      "Liturgical accompaniment of services and church holidays",
      "Participation in monastery and public spiritual events",
      "Preservation and promotion of Ukrainian sacred musical heritage",
      "Participation in charity and memorial events",
      "Spiritual and musical formation of choir members"
    ],
    status: "active",
    icon: "/media/socialInitiatives/Воскресіння-removebg-preview.png",
    gallery: [
      "/media/hero-2.png"
    ]
  },
  {
    title: "Tomorrow Information Platform",
    fullTitle: "Tomorrow Information Platform",
    description: "A cultural and educational media project aimed at understanding values, culture, and the image of the future through dialogue, knowledge, and shared responsibility.",
    fullDescription: "\"Tomorrow\" IP is a platform for public opinion and cultural dialogue, uniting experts, educators, artists, and active citizens around issues of identity, heritage, community development, and the future of Ukraine. The project forms a space for reflection, learning, and exchange of ideas, combining tradition with modern challenges.",
    directions: [
      "Creation of analytical, publicistic and educational media materials",
      "Promotion of cultural heritage, historical memory and value narratives",
      "Public discussions, interviews and author columns",
      "Educational campaigns on culture, education and civic responsibility",
      "Highlighting local initiatives and sustainable development practices",
      "Formation of a vision of the future through interdisciplinary dialogue"
    ],
    status: "active",
    icon: "/media/socialInitiatives/Інформаційна_платформа_завтра-removebg-preview.png",
    gallery: [
      "/media/hero-4.jpg"
    ]
  },
  {
    title: "Little Ray Sunday School",
    fullTitle: "Little Ray Sunday School",
    description: "Educational and upbringing space for children, aimed at forming Christian values and spiritual growth.",
    fullDescription: "The \"Prominchyk\" (Little Ray) Sunday School operates at the monastery and is designed to help children learn the basics of the Christian faith in an accessible, creative, and friendly form. Training combines spiritual upbringing, elements of culture and traditions, and personal development.",
    status: "active",
    icon: "/media/socialInitiatives/Недільна_школа__1_-removebg-preview.png",
    gallery: [
      "/media/hero-3.jpg"
    ],
    directions: [
      "Studying the basics of the Christian faith and biblical stories",
      "Spiritual and moral education of children",
      "Creative classes (drawing, singing, needlework)",
      "Introduction to church traditions and holidays",
      "Participation in monastery and public events",
      "Forming a culture of mutual respect, responsibility and love for one's neighbor"
    ]
  },
  {
    title: "Palamar.ua",
    fullTitle: "Palamar.ua",
    description: "All-Ukrainian community of sextons, called to service, mutual support, and development of liturgical culture in the Orthodox Church of Ukraine.",
    fullDescription: "\"Palamar.ua\" is a platform for uniting sextons from different regions of Ukraine, aimed at exchanging experience, knowledge, and best practices of church service. The community works to raise the level of liturgical culture, responsible service, and the formation of a modern Christian environment of interaction.",
    directions: [
      "Coordination and support of sexton service in communities",
      "Educational and formation events on liturgical practice",
      "Exchange of experience and methodological materials",
      "Promotion of the culture of service and church etiquette",
      "Participation in all-Ukrainian church initiatives",
      "Formation of a network of mutual assistance and mentorship"
    ],
    status: "active",
    icon: "/media/socialInitiatives/Паламар_юа-removebg-preview.png",
    gallery: [
      "/media/hero-3.jpg"
    ]
  },
  {
    title: "Voluntary Fire Brigade",
    fullTitle: "Voluntary Fire Brigade",
    description: "Order and safety service within the Zhydychyn Starosta District of the Lutsk City Territorial Community.",
    fullDescription: "The Voluntary Fire Brigade of the Zhydychyn St. Nicholas Monastery was founded on July 26, 2023, with the aim of implementing measures to prevent fires, extinguish them, and conduct emergency rescue and other urgent works. The activity of the VFB is carried out on the basis of the Agreement on the functioning and provision of the voluntary fire brigade, concluded between the Executive Committee of the Lutsk City Council, the Lutsk District Department of the Main Directorate of the State Emergency Service of Ukraine in the Volyn Region, and the St. Nicholas Male Monastery of the Volyn Diocese of the OCU. Mission - we are calm when you are safe.",
    directions: [
      "Firefighting and preventive work with the population",
      "First pre-medical aid",
      "Support for the functioning of the Invincibility Point and bomb shelter"
    ],
    status: "active",
    icon: "/media/socialInitiatives/Внутрішня_безпека-removebg-preview.png",
    gallery: [
      "/media/hero-1.jpg"
    ]
  },
  {
    title: "Archimandrite Gardens",
    fullTitle: "Archimandrite Gardens",
    description: "Spiritual and cultural space of silence, labor, and restoration, combining monastic tradition, care for the earth, and a culture of responsible attitude towards the created world.",
    fullDescription: "\"Archimandrite Gardens\" is a space inspired by the monastic tradition of gardens and vegetable gardens as a place of prayer, labor, and contemplation. The project aims to preserve the natural heritage of the monastery, develop ecological culture, and form an environment for spiritual and physical restoration for the community and pilgrims.",
    directions: [
      "Care and development of monastery gardens and green areas",
      "Restoration of traditional gardening and farming",
      "Environmental education and formation of a culture of careful attitude to nature",
      "Involvement of volunteers in joint work and service",
      "Creating a space of silence, restoration and spiritual contemplation",
      "Integration of the natural landscape into pilgrimage and cultural routes"
    ],
    status: "in process",
    icon: "/media/socialInitiatives/Сади_архімандрії__1_-removebg-preview.png",
    gallery: [
      "/media/hero-2.png",
      "/media/hero-1.jpg"
    ]
  },
  {
    title: "Zhydychyn Historical Arena / History Hall",
    fullTitle: "Zhydychyn Historical Arena / History Hall",
    description: "Theater of historical reconstruction and living history space, recreating the atmosphere of Ancient Zhydychyn and immersing visitors in past events.",
    fullDescription: "\"Zhydychyn Historical Arena\" brings together history enthusiasts, researchers, and reenactors to promote historical heritage through live performances, interactive events, and educational programs. The project creates an opportunity to feel the spirit of ancient eras, understand historical processes, and the cultural identity of the community.",
    directions: [
      "Theatrical reconstructions of historical events of Zhydychyn and the region",
      "Interactive historical master classes and lectures",
      "Educational programs for schoolchildren, students and tourists",
      "Promotion of local historical and cultural heritage",
      "Creation of living historical installations and performances",
      "Participation in interregional and international historical festivals"
    ],
    status: "active",
    icon: "/media/socialInitiatives/Історична_арена-removebg-preview.png",
    gallery: [
      "/media/hero-5.jpg"
    ]
  },
  {
    title: "Chaplaincy Ministry",
    fullTitle: "Chaplaincy Ministry",
    description: "Spiritual support and service for the military, medical workers, public organizations, and community members, combining prayer, psychological assistance, and moral support.",
    fullDescription: "Chaplaincy ministry unites spiritual mentors, volunteers, and specialists to support people in difficult life situations. The project aims to ensure the presence of the Church where it is most needed, combining spiritual care with psychological, social, and moral support.",
    directions: [
      "Spiritual support for the military and medical workers",
      "Psychological and moral support during crises",
      "Holding prayers, spiritual conversations and services in places of service",
      "Cooperation with public organizations and volunteer initiatives",
      "Organization of training and formation programs for chaplains",
      "Social assistance and support for families in crisis circumstances"

    ],
    status: "active",
    icon: "/media/socialInitiatives/Капеланське_служіння-removebg-preview.png",
    gallery: [
      "/media/hero-5.jpg"
    ]
  },
  {
    title: "Interactive Reading Room",
    fullTitle: "Interactive Reading Room",
    description: "Educational and library space at the monastery, combining the traditions of Ukrainian village reading rooms with modern educational and cultural practices.",
    fullDescription: "The Interactive Reading Room at the monastery revives the spirit of Ukrainian cultural and educational initiatives of the 19th–20th centuries. It functions as a place for learning, self-development, and cultural leisure for the community and pilgrims. The space unites people around books, spiritual literature, Ukrainian history, and culture, restoring the traditions of the reading room as a center of enlightenment, national consciousness, and social interaction.",
    directions: [
      "Access to the library and educational resources, including spiritual and historical literature",
      "Thematic lectures, discussions and historical-cultural workshops",
      "Promotion of traditions of village reading rooms and culture of shared reading",
      "Organization of drama clubs, choirs and creative initiatives for children and adults",
      "Support of national consciousness through education and cultural practices",
      "Creating a space for joint learning, spiritual development and social interaction"
    ],
    status: "active",
    icon: "/media/socialInitiatives/bitmap-modified-removebg-preview.png",
    gallery: []
  },
  {
    title: "Myrt Youth Platform",
    fullTitle: "Myrt Youth Platform",
    description: "Space for spiritual development and youth activity, helping to maintain a connection with the Church and form Christian values.",
    fullDescription: "The \"Myrt\" Youth Platform unites young people around spiritual, cultural, and educational development, creating an environment where young people can grow in faith and remain active participants in church life. The project promotes the formation of spiritual identity, supports youth participation in public initiatives, and helps preserve faith in everyday life.",
    directions: [
      "Spiritual and moral education of youth",
      "Organization of educational and educational events at the Church",
      "Cultural, creative and volunteer initiatives",
      "Formation of a community for communication and mutual support",
      "Involvement of youth in the life of the parish and monastery",
      "Promotion of Christian values in the youth environment"
    ],
    status: "active",
    icon: "/media/socialInitiatives/photo_2026-01-22_15-56-48-modified-removebg-preview.png",
    gallery: []
  }
];

export const projectsData = projectsDataUA; // Fallback

export function getProjectsData(lang: string) {
  return lang.toUpperCase() === 'EN' ? projectsDataEN : projectsDataUA;
}
