
// Намагаємось імпортувати дані про святих. 
import saintsDataRaw from '../data/saintsData.json';
import { calculateDynamicReadings, DayReadings, Reading } from '../calendar_v2/LiturgicalEngine';

// Define the shape of the JSON data
interface SaintDayData {
  saints?: string[];
  saints_en?: string[];
  isFast?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saintsData: Record<string, SaintDayData> = saintsDataRaw as any;

/**
 * --- КОНФІГУРАЦІЯ ЧАСУ БОГОСЛУЖІНЬ ---
 */
const SCHEDULES_UA = {
  weekday: [
    { time: "07:40", name: "Часи 3-й і 6-й", location: "Миколаївський храм" },
    { time: "08:00", name: "Божественна Літургія", location: "Миколаївський храм" },
    { time: "18:00", name: "Вечірня", location: "Миколаївський храм" },
    { time: "23:00", name: "Полуношниця", location: "Святошинський храм" }
  ],
  saturday: [
    { time: "08:40", name: "Часи 3-й і 6-й", location: "Миколаївський храм" },
    { time: "09:00", name: "Божественна Літургія", location: "Миколаївський храм" },
    { time: "18:00", name: "Вечірня", location: "Миколаївський храм" }
  ],
  sunday: [
    { time: "09:40", name: "Часи 3-й і 6-й", location: "Миколаївський храм" },
    { time: "10:00", name: "Божественна Літургія", location: "Миколаївський храм" },
    { time: "18:00", name: "Акафіст перед образом «Всецариця»", location: "Миколаївський храм" }
  ],
  holiday: [
    { time: "08:40", name: "Часи 3-й і 6-й", location: "Миколаївський храм" },
    { time: "09:00", name: "Святкова Божественна Літургія", location: "Миколаївський храм" },
    { time: "18:00", name: "Вечірня", location: "Миколаївський храм" }
  ]
};

const SCHEDULES_EN = {
  weekday: [
    { time: "07:40", name: "3rd and 6th Hours", location: "St. Nicholas Church" },
    { time: "08:00", name: "Divine Liturgy", location: "St. Nicholas Church" },
    { time: "18:00", name: "Vespers", location: "St. Nicholas Church" },
    { time: "23:00", name: "Midnight Office", location: "Svyatoshyn Church" }
  ],
  saturday: [
    { time: "08:40", name: "3rd and 6th Hours", location: "St. Nicholas Church" },
    { time: "09:00", name: "Divine Liturgy", location: "St. Nicholas Church" },
    { time: "18:00", name: "Vespers", location: "St. Nicholas Church" }
  ],
  sunday: [
    { time: "09:40", name: "3rd and 6th Hours", location: "St. Nicholas Church" },
    { time: "10:00", name: "Divine Liturgy", location: "St. Nicholas Church" },
    { time: "18:00", name: "Akathist before 'Pantanassa'", location: "St. Nicholas Church" }
  ],
  holiday: [
    { time: "08:40", name: "3rd and 6th Hours", location: "St. Nicholas Church" },
    { time: "09:00", name: "Festive Divine Liturgy", location: "St. Nicholas Church" },
    { time: "18:00", name: "Vespers", location: "St. Nicholas Church" }
  ]
};

/**
 * --- ФІКСОВАНІ СВЯТА ---
 */
const FIXED_HOLIDAYS_UA: Record<string, string> = {
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

const FIXED_HOLIDAYS_EN: Record<string, string> = {
  "01-01": "Circumcision of the Lord. St. Basil the Great",
  "01-06": "Theophany. Baptism of the Lord",
  "01-30": "Synaxis of the Three Hierarchs",
  "02-02": "Meeting of the Lord",
  "03-25": "Annunciation of the Theotokos",
  "04-23": "Great Martyr George the Victory-Bearer",
  "06-24": "Nativity of John the Baptist",
  "06-29": "Holy Apostles Peter and Paul",
  "08-06": "Transfiguration of the Lord",
  "09-08": "Nativity of the Theotokos",
  "09-14": "Exaltation of the Holy Cross",
  "11-30": "Ap. Andrew the First-Called",
  "12-06": "St. Nicholas the Wonderworker",
  "12-25": "Nativity of Christ"
};

/**
 * --- ДОПОМІЖНІ ФУНКЦІЇ ---
 */
function formatMonthDay(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getOrthodoxEasterDate(year: number): Date {
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  const d = (19 * a + 15) % 30;
  const e = (2 * b + 4 * c + 6 * d + 6) % 7;
  const f = d + e;
  // 22 March + 13 days = 4 April
  const easterDate = new Date(year, 3, 4);
  easterDate.setDate(easterDate.getDate() + f);
  return easterDate;
}

/**
 * Генерує масив рухомих свят на основі дати Пасхи
 */
function getMovableHolidaysMap(year: number, lang: 'UA' | 'EN'): Record<string, string> {
  const easter = getOrthodoxEasterDate(year);
  const holidays: Record<string, string> = {};

  const names = lang === 'EN' ? {
    palmSunday: "Entry of the Lord into Jerusalem (Palm Sunday)",
    easter: "Resurrection of Christ. EASTER",
    ascension: "Ascension of the Lord",
    trinity: "Holy Trinity Day (Pentecost)"
  } : {
    palmSunday: "Вхід Господній в Єрусалим (Вербна неділя)",
    easter: "Світле Христове Воскресіння. ВЕЛИКДЕНЬ",
    ascension: "Вознесіння Господнє",
    trinity: "День Святої Трійці (П'ятдесятниця)"
  };

  holidays[formatMonthDay(addDays(easter, -7))] = names.palmSunday;
  holidays[formatMonthDay(easter)] = names.easter;
  holidays[formatMonthDay(addDays(easter, 39))] = names.ascension;
  holidays[formatMonthDay(addDays(easter, 49))] = names.trinity;

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
  readingsStructured?: DayReadings; // New field
  isHoliday: boolean;
  isFast: boolean;
  events: CalendarEvent[];
}

function formatReadingsToString(readings: Reading[]): string {
  return readings.map(r => {
    const lbl = r.label ? `${r.label}: ` : "";
    return `${lbl}Ап. ${r.apostle}; Єв. ${r.gospel}`;
  }).join("\n");
}

/**
 * --- ГОЛОВНА ФУНКЦІЯ ГЕНЕРАЦІЇ ---
 */
export function generateCalendar(year: number, lang: string = 'UA'): CalendarDay[] {
  const dataset: CalendarDay[] = [];
  const startYear = new Date(year, 0, 1);
  const endYear = new Date(year, 11, 31);

  const normLang = lang.toUpperCase() === 'EN' ? 'EN' : 'UA';
  const movableHolidays = getMovableHolidaysMap(year, normLang);
  const fixedHolidays = normLang === 'EN' ? FIXED_HOLIDAYS_EN : FIXED_HOLIDAYS_UA;
  const schedules = normLang === 'EN' ? SCHEDULES_EN : SCHEDULES_UA;
  const locale = normLang === 'EN' ? 'en-US' : 'uk-UA';

  for (let d = new Date(startYear); d <= endYear; d.setDate(d.getDate() + 1)) {
    const yearStr = d.getFullYear();
    const monthStr = String(d.getMonth() + 1).padStart(2, '0');
    const dayStr = String(d.getDate()).padStart(2, '0');
    const isoDate = `${yearStr}-${monthStr}-${dayStr}`;

    const monthDay = formatMonthDay(d);
    const dayOfWeek = d.getDay();

    const movableName = movableHolidays[monthDay];
    const fixedName = fixedHolidays[monthDay];
    const extraData = saintsData[monthDay] || { saints: [], saints_en: [], isFast: false };

    // Determine saints list based on language
    let displayedSaints = extraData.saints || [];
    if (normLang === 'EN' && extraData.saints_en && extraData.saints_en.length > 0) {
      displayedSaints = extraData.saints_en;
    } else if (normLang === 'EN' && (!extraData.saints_en || extraData.saints_en.length === 0)) {
      displayedSaints = extraData.saints || [];
    }

    // GENERATE DYNAMIC READINGS
    const engineResult = calculateDynamicReadings(new Date(d)); // Clone d to avoid mutability issues

    const title = movableName || fixedName || (displayedSaints.length > 0 ? displayedSaints[0] : "");
    const isHoliday = !!(movableName || fixedName);

    let events: CalendarEvent[] = [];

    if (dayOfWeek === 0) {
      events = [...schedules.sunday];
    } else if (isHoliday) {
      events = [...schedules.holiday];
    } else if (dayOfWeek === 6) {
      events = [...schedules.saturday];
    } else {
      events = [...schedules.weekday];
    }

    dataset.push({
      date: isoDate,
      dayNumber: String(d.getDate()).padStart(2, '0'),
      dayOfWeek: d.toLocaleString(locale, { weekday: 'long' }),
      month: d.toLocaleString(locale, { month: 'long' }),
      year: d.getFullYear(),
      title: title,
      saints: displayedSaints,
      readings: formatReadingsToString(engineResult.readings),
      readingsStructured: engineResult,
      isHoliday: isHoliday,
      isFast: extraData.isFast || false,
      events: events
    });
  }

  return dataset;
}
