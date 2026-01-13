// Намагаємось імпортувати дані про святих. 
// Якщо файл ще не створено або порожній, використовуємо пустий об'єкт, щоб код не ламався.
import saintsDataRaw from '../data/saintsData.json'; 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saintsData: Record<string, { saints?: string[], isFast?: boolean, readings?: string }> = saintsDataRaw as any;

/**
 * --- КОНФІГУРАЦІЯ ЧАСУ БОГОСЛУЖІНЬ ---
 */
const SCHEDULES = {
  // Звичайні будні (Понеділок - П'ятниця)
  weekday: [
    { time: "07:40", name: "Часи 3-й і 6-й", location: "Миколаївський храм" },
    { time: "08:00", name: "Божественна Літургія", location: "Миколаївський храм" },
    { time: "18:00", name: "Вечірня", location: "Миколаївський храм" },
    { time: "23:00", name: "Полуношниця", location: "Святошинський храм" }
  ],
  // Субота
  saturday: [
    { time: "08:40", name: "Часи 3-й і 6-й", location: "Миколаївський храм" },
    { time: "09:00", name: "Божественна Літургія", location: "Миколаївський храм" },
    { time: "18:00", name: "Вечірня", location: "Миколаївський храм" }
  ],
  // Неділя
  sunday: [
    { time: "09:40", name: "Часи 3-й і 6-й", location: "Миколаївський храм" },
    { time: "10:00", name: "Божественна Літургія", location: "Миколаївський храм" },
    { time: "18:00", name: "Акафіст перед образом «Всецариця»", location: "Миколаївський храм" }
  ],
  // Великі свята у будні дні (ідентично суботі, але без полуношниці)
  holiday: [
    { time: "08:40", name: "Часи 3-й і 6-й", location: "Миколаївський храм" },
    { time: "09:00", name: "Святкова Божественна Літургія", location: "Миколаївський храм" },
    { time: "18:00", name: "Вечірня", location: "Миколаївський храм" }
  ]
};

/**
 * --- ФІКСОВАНІ СВЯТА (НОВОЮЛІАНСЬКИЙ КАЛЕНДАР) ---
 * Ключ: "MM-DD"
 */
const FIXED_HOLIDAYS: Record<string, string> = {
  "01-01": "Обрізання Господнє. Свт. Василія Великого",
  "01-06": "Богоявлення. Хрещення Господнє",
  "01-30": "Собор трьох святителів",
  "02-02": "Стрітення Господнє",
  "03-25": "Благовіщення Пресвятої Богородиці",
  "04-23": "Вмч. Юрія Переможця",
  "06-24": "Різдво Іоана Предтечі",
  "06-29": "Святих апп. Петра і Павла",
  "08-06": "Преображення Господнє",
  "08-15": "Успіння Пресвятої Богородиці",
  "08-29": "Усікновення глави Іоана Предтечі",
  "09-08": "Різдво Пресвятої Богородиці",
  "09-14": "Воздвиження Хреста Господнього",
  "10-01": "Покрова Пресвятої Богородиці",
  "11-08": "Собор Архістратига Михаїла",
  "11-21": "Введення в храм Пресвятої Богородиці",
  "11-30": "Ап. Андрія Первозванного",
  "12-06": "Свт. Миколая Чудотворця",
  "12-25": "Різдво Христове"
};

/**
 * --- ДОПОМІЖНІ ФУНКЦІЇ ---
 */

// Форматує дату об'єкта Date у рядок "MM-DD"
function formatMonthDay(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${m}-${d}`;
}

// Додає дні до дати і повертає новий об'єкт Date
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Розраховує дату Православної Пасхи (Олександрійська пасхалія)
 * Алгоритм Гаусса для Юліанського календаря + корекція на Григоріанський (+13 днів).
 */
function getOrthodoxEasterDate(year: number): Date {
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  const d = (19 * a + 15) % 30;
  const e = (2 * b + 4 * c + 6 * d + 6) % 7;
  
  // f = дні від 22 березня за ст. стилем
  const f = d + e;
  
  // 22 березня (місяць 2 в JS) + f днів + 13 днів (різниця стилів)
  // Можна спростити: 22 березня + 13 = 4 квітня. Рахуємо від 4 квітня.
  const easterDate = new Date(year, 3, 4); 
  easterDate.setDate(easterDate.getDate() + f);
  
  return easterDate;
}

/**
 * Генерує масив рухомих свят на основі дати Пасхи
 */
function getMovableHolidaysMap(year: number): Record<string, string> {
  const easter = getOrthodoxEasterDate(year);
  const holidays: Record<string, string> = {};

  // Вхід Господній в Єрусалим (Вербна неділя) - за 7 днів до Пасхи
  holidays[formatMonthDay(addDays(easter, -7))] = "Вхід Господній в Єрусалим (Вербна неділя)";
  
  // Великдень
  holidays[formatMonthDay(easter)] = "Світле Христове Воскресіння. ВЕЛИКДЕНЬ";
  
  // Вознесіння - 40-й день (через 39 днів після Пасхи)
  holidays[formatMonthDay(addDays(easter, 39))] = "Вознесіння Господнє";
  
  // Трійця - 50-й день (через 49 днів після Пасхи)
  holidays[formatMonthDay(addDays(easter, 49))] = "День Святої Трійці (П'ятдесятниця)";

  return holidays;
}

export interface CalendarEvent {
  time: string;
  name: string;
  location?: string;
}

export interface CalendarDay {
  date: string;
  dayNumber: string;
  dayOfWeek: string;
  month: string;
  year: number;
  title: string;
  saints: string[];
  readings: string;
  isHoliday: boolean;
  isFast: boolean;
  events: CalendarEvent[];
}

/**
 * --- ГОЛОВНА ФУНКЦІЯ ГЕНЕРАЦІЇ ---
 * @param {number} year - Рік (наприклад, 2026)
 * @returns {Array} Масив об'єктів для кожного дня року
 */
export function generateCalendar(year: number): CalendarDay[] {
  const dataset: CalendarDay[] = [];
  
  // Початок і кінець року
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  
  // Отримуємо рухомі свята для поточного року
  const movableHolidays = getMovableHolidaysMap(year);

  // Цикл по кожному дню року
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    
    // Основні параметри поточної дати в циклі
    // ВИПРАВЛЕННЯ: Використовуємо локальний час для генерації рядка дати, щоб уникнути зсуву через toISOString (UTC)
    const yearStr = d.getFullYear();
    const monthStr = String(d.getMonth() + 1).padStart(2, '0');
    const dayStr = String(d.getDate()).padStart(2, '0');
    const isoDate = `${yearStr}-${monthStr}-${dayStr}`; // "2026-01-01"

    const monthDay = formatMonthDay(d);            // "01-01"
    const dayOfWeek = d.getDay();                  // 0 = Неділя ... 6 = Субота

    // 1. Збір даних про день
    
    // Чи це рухоме свято?
    const movableName = movableHolidays[monthDay];
    
    // Чи це фіксоване велике свято?
    const fixedName = FIXED_HOLIDAYS[monthDay];
    
    // Дані з зовнішнього JSON (святі, піст)
    const extraData = saintsData[monthDay] || { saints: [], isFast: false, readings: "" };

    // Визначаємо заголовок дня. Пріоритет:
    // 1. Рухоме велике свято (Великдень, Трійця)
    // 2. Фіксоване велике свято (Різдво)
    // 3. Ім'я першого святого з JSON (якщо немає свята)
    const title = movableName || fixedName || (extraData.saints && extraData.saints.length > 0 ? extraData.saints[0] : "");

    // Чи є цей день святковим (червоним у календарі)
    const isHoliday = !!(movableName || fixedName);

    // 2. Вибір розкладу богослужінь
    let events: CalendarEvent[] = [];

    if (dayOfWeek === 0) {
      // НЕДІЛЯ
      // Навіть якщо свято, в неділю літургія зазвичай пізніше (10:00), 
      // хіба що це Великдень, тоді розклад нічний (можна додати умову окремо).
      events = [...SCHEDULES.sunday];
    } 
    else if (isHoliday) {
      // СВЯТО В БУДНІЙ ДЕНЬ АБО СУБОТУ
      // Згідно вашого запиту: Літургія о 9:00, Часи о 8:40
      events = [...SCHEDULES.holiday];
    } 
    else if (dayOfWeek === 6) {
      // ЗВИЧАЙНА СУБОТА
      events = [...SCHEDULES.saturday];
    } 
    else {
      // ЗВИЧАЙНИЙ БУДНІЙ ДЕНЬ (Пн-Пт)
      events = [...SCHEDULES.weekday];
    }

    // 3. Формування фінального об'єкта
    dataset.push({
      date: isoDate,                         // "2026-01-01"
      dayNumber: String(d.getDate()).padStart(2, '0'), // "01"
      dayOfWeek: d.toLocaleString('uk-UA', { weekday: 'long' }), // "четвер"
      month: d.toLocaleString('uk-UA', { month: 'long' }),       // "січень"
      year: d.getFullYear(),
      
      title: title,                          // Головна назва
      saints: extraData.saints || [],        // Масив інших святих
      readings: extraData.readings || "",    // Євангеліє
      
      isHoliday: isHoliday,                  // Для стилізації (червоний колір)
      isFast: extraData.isFast || false,     // Для іконки посту
      
      events: events                         // Масив подій {time, name}
    });
  }

  return dataset;
}
