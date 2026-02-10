export type Category = 'books' | 'cups' | 'rosaries' | 'crosses' | 'icons' | 'honey' | 'jam' | 'magnets' | 'cords' | 'tea';

export interface BaseProduct {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    price: number;
    category: Category;
    status: 'active' | 'inactive';
    sku: string;
    stock: number;
    image: string;
    gallery?: string[];
    longDescription?: string;
    badge?: 'new' | 'sale' | 'top';
    mainCharacteristic?: string;
}

export interface BookProduct extends BaseProduct {
    category: 'books';
    author: string;
    publisher: string;
    year: number;
    language: string;
    pages: number;
    sizeMm: string;
    paper: string;
    coverType: 'hard' | 'soft';
}

export interface CupProduct extends BaseProduct {
    category: 'cups';
    material: string;
    volumeMl: number;
    printType: 'decal' | 'engraving';
    color: string;
    dishwasherSafe: boolean;
}

export interface RosaryProduct extends BaseProduct {
    category: 'rosaries';
    beadsMaterial: string;
    handmade: boolean;
    lengthCm: number;
}

export interface CrossProduct extends BaseProduct {
    category: 'crosses';
    material: string;
    sizeMm: string;
    madeBy: string;
}

export interface IconProduct extends BaseProduct {
    category: 'icons';
    saint: string;
    technique: string;
    baseMaterial: string;
    sizeCm: string;
}

export interface HoneyProduct extends BaseProduct {
    category: 'honey';
    type: 'linden' | 'polyfloral';
    weightGrams: number;
    harvestYear: number;
}

export interface JamProduct extends BaseProduct {
    category: 'jam';
    fruit: string;
    weightGrams: number;
    sugarFree: boolean;
    storage: 'room' | 'fridge';
}

export interface MagnetProduct extends BaseProduct {
    category: 'magnets';
    theme: string;
    material: string;
    sizeCm: string;
}

export interface CordProduct extends BaseProduct {
    category: 'cords';
    material: string;
    color: string;
    lengthCm: number;
    thicknessMm: number;
    withClasp: boolean;
}

export interface TeaProduct extends BaseProduct {
    category: 'tea';
    weightGrams: number;
    ingredients: string[];
}

export type Product = BookProduct | CupProduct | RosaryProduct | CrossProduct | IconProduct | HoneyProduct | JamProduct | MagnetProduct | CordProduct | TeaProduct;

export const pantryProducts: Product[] = [
    {
        id: 'book-appleby-dick',
        title: 'Яблучко Дік',
        shortDescription: 'У дванадцять років Руді робить, здавалося б, безглуздий і символічний жест.',
        description: 'У дванадцять років Руді робить, здавалося б, безглуздий і символічний жест.',
        longDescription: 'Американець Руді Вальц, що мешкає в Порт-о-Пренсі на Гаїті, картається почуттям провини.',
        price: 600,
        category: 'books',
        status: 'active',
        sku: '9786178281281',
        stock: 12,
        image: '/media/pantry/book_history.avif',
        gallery: [
            '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_2.avif',
            '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_4.avif'
        ],
        author: 'Курт Воннегут',
        publisher: 'Вавилонська бібліотека',
        mainCharacteristic: 'Курт Воннегут',
        year: 2024,
        language: 'Українська',
        pages: 200,
        sizeMm: '145x215',
        paper: 'Крімі',
        coverType: 'hard'
    },
    {
        id: 'book-1',
        title: 'Жидичинська Обитель. Історія',
        shortDescription: 'Фундаментальне дослідження історії одного з найдавніших монастирів Волині.',
        description: 'Ця книга відкриває перед читачем вікові завіси історії Свято-Миколаївського Жидичинського монастиря.',
        price: 450,
        category: 'books',
        status: 'active',
        sku: 'BK-001',
        stock: 50,
        image: '/media/church-complex/economy/economy_1.avif',
        gallery: ['/media/church-complex/economy/economy_1.avif', '/media/church-complex/economy/economy_4.avif'],
        author: 'Колектив авторів',
        publisher: 'Видавництво Жидичинського монастиря',
        mainCharacteristic: 'Історія монастиря',
        year: 2023,
        language: 'Українська',
        pages: 320,
        sizeMm: '170x240',
        paper: 'Крейдований',
        coverType: 'hard'
    },
    {
        id: 'book-2',
        title: 'Моя Війна',
        shortDescription: 'Спогади та роздуми про сучасні події.',
        description: 'Важливе свідчення сучасної історії України через призму особистого досвіду.',
        price: 550,
        category: 'books',
        status: 'active',
        sku: 'BK-002',
        stock: 25,
        image: '/media/socialInitiatives/fire-brigade/fire-brigade_1.avif',
        author: 'Валерій Залужний',
        publisher: 'Vivat',
        mainCharacteristic: 'Валерій Залужний',
        year: 2024,
        language: 'Українська',
        pages: 400,
        sizeMm: '150x220',
        paper: 'Офсетний',
        coverType: 'hard'
    },
    {
        id: 'cup-1',
        title: 'Монастирська чашка "Жидичин"',
        shortDescription: 'Керамічна чашка з гравіюванням на пам’ять про відвідування обителі.',
        description: 'Вишукана керамічна чашка ручної роботи. Мінімалістичний дизайн із логотипом монастиря.',
        price: 250,
        category: 'cups',
        status: 'active',
        sku: 'CP-001',
        stock: 100,
        image: '/media/church-complex/service/zhydychyn-center/zhydychyn-center_1.avif',
        material: 'Кераміка',
        volumeMl: 350,
        printType: 'engraving',
        mainCharacteristic: 'Кераміка, 350мл',
        color: 'Білий матовий',
        dishwasherSafe: true
    },
    {
        id: 'honey-1',
        title: 'Мед Монастирський "Липовий"',
        shortDescription: 'Натуральний мед з власної монастирської пасіки.',
        description: 'Чистий липовий мед, зібраний на пасіці Жидичинського монастиря.',
        price: 180,
        category: 'honey',
        status: 'active',
        sku: 'HN-001',
        stock: 30,
        image: '/media/socialInitiatives/zhydychyn-center/zhydychyn-center_3.avif',
        type: 'linden',
        weightGrams: 500,
        mainCharacteristic: 'Липовий, 500г',
        harvestYear: 2024
    },
    {
        id: 'rosary-1',
        title: 'Чотки "Дерев’яні 33"',
        shortDescription: 'Класичні дерев’яні чотки на 33 вузли.',
        description: 'Чотки виготовлені з натурального дерева (дуб). Ручна робота братів монастиря.',
        price: 120,
        category: 'rosaries',
        status: 'active',
        sku: 'RS-001',
        stock: 15,
        image: '/media/sketes/sviatodukhivskyiskut/sviatodukhivskyi_1.avif',
        beadsMaterial: 'Дуб',
        mainCharacteristic: 'Ручна робота',
        handmade: true,
        lengthCm: 25
    },
    {
        id: 'book-3',
        title: 'Афонський щоденник',
        shortDescription: 'Духовні роздуми та нотатки з подорожі на Святу Гору.',
        description: 'Книга містить глибокі духовні поради та особисті враження автора.',
        price: 320,
        category: 'books',
        status: 'active',
        sku: 'BK-003',
        stock: 40,
        image: '/media/socialInitiatives/volunteer-movement/volunteer-movement_1.avif',
        author: 'Архімандрит Костянтин',
        publisher: 'Дух і Літера',
        mainCharacteristic: 'Архімандрит Костянтин',
        year: 2023,
        language: 'Українська',
        pages: 256,
        sizeMm: '130x200',
        paper: 'Офсетний',
        coverType: 'soft'
    },
    {
        id: 'tea-1',
        title: 'Чай "Монастирський Сад"',
        shortDescription: 'Трав’яний збір з екологічно чистих трав.',
        description: 'Склад: чебрець, м’ята, звіробій, липа. Зібрано та висушено з любов’ю.',
        price: 150,
        category: 'tea',
        status: 'active',
        sku: 'TE-001',
        stock: 60,
        image: '/media/socialInitiatives/sunday-school/sunday-school_1.avif',
        weightGrams: 100,
        mainCharacteristic: 'Трав’яний збір, 100г',
        ingredients: ['Чебрець', 'М’ята', 'Звіробій', 'Липа']
    },
    {
        id: 'book-4',
        title: 'Києво-Печерський Патерик',
        shortDescription: 'Житія святих отців Києво-Печерської Лаври.',
        description: 'Класичне видання про засновників монашества на Русі.',
        price: 480,
        category: 'books',
        status: 'active',
        sku: 'BK-004',
        stock: 35,
        image: '/media/church-complex/temples/mykolaivskyi/mykolaivskyi_5.avif',
        author: 'Прп. Нестор Літописець',
        publisher: 'Видавництво Жидичинського монастиря',
        mainCharacteristic: 'Прп. Нестор Літописець',
        year: 2022,
        language: 'Українська',
        pages: 450,
        sizeMm: '170x240',
        paper: 'Крейдований',
        coverType: 'hard'
    }
];
