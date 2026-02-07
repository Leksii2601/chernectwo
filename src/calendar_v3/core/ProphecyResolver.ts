import { DetailedReading } from './LiturgicalTypes';

// Structure for standard Lent (Clean Week - Palm Friday)
interface LentenDayReadings {
    sexte?: string; // 6th Hour (Isaiah)
    vespers1?: string; // Genesis
    vespers2?: string; // Proverbs
}

// Structure for Holy Week (Multiple Paremias)
interface ComplexReading {
    reading: string;
    type?: 'paremia' | 'apostle' | 'gospel';
    label?: string;
}

// Structure for Holy Week (Multiple Paremias)
interface HolyWeekDayReadings {
    sexte?: string;
    vespers: (string | ComplexReading)[]; // List of paremias or complex readings
    royalHours?: string[]; // List of readings for Royal Hours
}

export class ProphecyResolver {
    private static instance: ProphecyResolver;

    // Standard Lent map
    private lentenReadings: Record<number, LentenDayReadings> = {
        // CHEESEFARE THURSDAY (-52)
        [-52]: {
            sexte: "Зах. 8:7-17",
            vespers1: "Зах. 8:19-23"
        },
        // CLEAN MONDAY (-48)
        [-48]: {
            sexte: "Іс. 1:1-20",
            vespers1: "Бут. 1:1-13",
            vespers2: "Притч. 1:1-20"
        },
        // CLEAN TUESDAY (-47)
        [-47]: {
            sexte: "Іс. 1:19-31",
            vespers1: "Бут. 1:14-23",
            vespers2: "Притч. 1:20-33"
        },
        // CLEAN WEDNESDAY (-46)
        [-46]: {
            sexte: "Іс. 2:3-11",
            vespers1: "Бут. 1:24-2:3",
            vespers2: "Притч. 2:1-22"
        },
        // CLEAN THURSDAY (-45)
        [-45]: {
            sexte: "Іс. 2:11-21",
            vespers1: "Бут. 2:4-19",
            vespers2: "Притч. 3:1-18"
        },
        // CLEAN FRIDAY (-44)
        [-44]: {
            sexte: "Іс. 3:1-14",
            vespers1: "Бут. 2:20-3:20",
            vespers2: "Притч. 3:19-34"
        },
        // WEEK 2
        [-41]: { sexte: "Іс. 4:2-5:7", vespers1: "Бут. 3:21-4:7", vespers2: "Притч. 3:34-4:22" },
        [-40]: { sexte: "Іс. 5:7-16", vespers1: "Бут. 4:8-15", vespers2: "Притч. 5:1-15" },
        [-39]: { sexte: "Іс. 5:16-25", vespers1: "Бут. 4:16-26", vespers2: "Притч. 5:15-6:3" },
        [-38]: { sexte: "Іс. 6:1-12", vespers1: "Бут. 5:1-24", vespers2: "Притч. 6:3-20" },
        [-37]: { sexte: "Іс. 7:1-14", vespers1: "Бут. 5:32-6:8", vespers2: "Притч. 6:20-7:1" },
        // WEEK 3
        [-34]: { sexte: "Іс. 8:13-9:7", vespers1: "Бут. 6:9-22", vespers2: "Притч. 8:1-21" },
        [-33]: { sexte: "Іс. 9:9-10:4", vespers1: "Бут. 7:1-5", vespers2: "Притч. 8:32-9:11" },
        [-32]: { sexte: "Іс. 10:12-20", vespers1: "Бут. 7:6-9", vespers2: "Притч. 9:12-18" },
        [-31]: { sexte: "Іс. 11:10-12:2", vespers1: "Бут. 7:11-8:3", vespers2: "Притч. 10:1-22" },
        [-30]: { sexte: "Іс. 13:2-13", vespers1: "Бут. 8:4-21", vespers2: "Притч. 10:31-11:12" },
        // WEEK 4
        [-27]: { sexte: "Іс. 14:24-32", vespers1: "Бут. 8:21-9:7", vespers2: "Притч. 11:19-12:6" },
        [-26]: { sexte: "Іс. 25:1-9", vespers1: "Бут. 9:8-17", vespers2: "Притч. 12:8-22" },
        [-25]: { sexte: "Іс. 26:21-27:9", vespers1: "Бут. 9:18-10:1", vespers2: "Притч. 12:23-13:9" },
        [-24]: { sexte: "Іс. 28:14-22", vespers1: "Бут. 10:32-11:9", vespers2: "Притч. 13:20-14:6" },
        [-23]: { sexte: "Іс. 29:13-23", vespers1: "Бут. 12:1-7", vespers2: "Притч. 14:15-26" },
        // WEEK 5
        [-20]: { sexte: "Іс. 37:33-38:6", vespers1: "Бут. 13:12-18", vespers2: "Притч. 14:27-15:4" },
        [-19]: { sexte: "Іс. 40:18-31", vespers1: "Бут. 15:1-15", vespers2: "Притч. 15:7-19" },
        [-18]: { sexte: "Іс. 41:4-14", vespers1: "Бут. 17:1-9", vespers2: "Притч. 15:20-16:9" },
        [-17]: { sexte: "Іс. 42:5-16", vespers1: "Бут. 18:20-33", vespers2: "Притч. 16:17-17:17" },
        [-16]: { sexte: "Іс. 45:11-17", vespers1: "Бут. 22:1-18", vespers2: "Притч. 17:17-18:5" },
        // WEEK 6
        [-13]: { sexte: "Іс. 48:17-49:4", vespers1: "Бут. 27:1-41", vespers2: "Притч. 19:16-25" },
        [-12]: { sexte: "Іс. 49:6-10", vespers1: "Бут. 31:3-16", vespers2: "Притч. 21:3-21" },
        [-11]: { sexte: "Іс. 58:1-11", vespers1: "Бут. 43:26-31; 45:1-16", vespers2: "Притч. 21:23-22:4" },
        [-10]: { sexte: "Іс. 65:8-16", vespers1: "Бут. 46:1-7", vespers2: "Притч. 23:15-24:5" },
        [-9]: { sexte: "Іс. 66:10-24", vespers1: "Бут. 49:33-50:26", vespers2: "Притч. 31:8-32" }
    };

    // Holy Week map
    private holyWeekReadings: Record<number, HolyWeekDayReadings> = {
        // GREAT MONDAY (-6)
        [-6]: {
            sexte: "Єз. 1:1-20",
            vespers: [
                "Вих. 1:1-20",
                "Іов. 1:1-12"
            ]
        },
        // GREAT TUESDAY (-5)
        [-5]: {
            sexte: "Єз. 1:21-28",
            vespers: [
                "Вих. 2:5-10",
                "Іов. 1:13-22"
            ]
        },
        // GREAT WEDNESDAY (-4)
        [-4]: {
            sexte: "Єз. 2:3-3:3",
            vespers: [
                "Вих. 2:11-22",
                "Іов. 2:1-10"
            ]
        },
        // GREAT THURSDAY (-3)
        [-3]: {
            sexte: undefined,
            vespers: [
                "Вих. 19:10-19",
                "Іов. 38:1-23; 42:1-5",
                "Іс. 50:4-11"
            ]
        },
        // GREAT FRIDAY (-2)
        [-2]: {
            royalHours: [
                "1-й час: Зах. 11:10-13; Гал. 6:14-18; Мф. 27:1-56",
                "3-й час: Іс. 50:4-11; Рим. 5:6-11; Мк. 15:16-41",
                "6-й час: Іс. 52:13-54:1; Євр. 2:11-18; Лк. 23:32-49",
                "9-й час: Єр. 11:18-12:5; Євр. 10:19-31; Ін. 19:23-37"
            ],
            vespers: [
                "Вих. 33:11-23",
                "Іов. 42:12-17",
                "Іс. 52:13-54:1",
                { reading: "1 Кор. 1:18-2:2", type: "apostle", label: "Апостол" },
                { reading: "Мф. 27:1-38; Лк. 23:39-43; Мф. 27:39-54; Ін. 19:31-37; Мф. 27:55-61", type: "gospel", label: "Євангеліє" }
            ]
        },
        // GREAT SATURDAY (-1)
        [-1]: {
            sexte: undefined,
            vespers: [
                "Бут. 1:1-13",
                "Іс. 60:1-16",
                "Вих. 12:1-11",
                "Іона 1:1-4:11",
                "Іс. Нав. 5:10-15",
                "Вих. 13:20-15:19",
                "Соф. 3:8-15",
                "3 Цар. 17:8-24",
                "Іс. 61:10-62:5",
                "Бут. 22:1-18",
                "Іс. 61:1-9",
                "4 Цар. 4:8-37",
                "Іс. 63:11-64:5",
                "Єр. 31:31-34",
                "Дан. 3:1-88"
            ]
        }
    };

    // Fixed Date Prophecies (Theophany, Christmas, etc.)
    private fixedReadings: Record<string, { sexte?: string[], vespers?: string[], hours?: string[] }> = {
        // NAVECHIRYA BOGOYAVLENNYA (01-05) - Royal Hours & Vespers
        "01-05": {
            hours: [
                "Іс. 35:1-10 (1-й час)",
                "Іс. 1:16-20 (3-й час)",
                "Іс. 12:3-6 (6-й час)",
                "Іс. 49:8-15 (9-й час)"
            ],
            vespers: [
                "Бут. 1:1-13",
                "Вих. 14:15-18, 21-23, 27-29",
                "Вих. 15:22-16:1",
                "Іс. Нав. 3:7-8, 15-17",
                "4 Цар. 2:6-14",
                "4 Цар. 5:9-14",
                "Іс. 1:16-20",
                "Бут. 32:1-10",
                "Вих. 2:5-10",
                "Суд. 6:36-40",
                "3 Цар. 18:30-39",
                "4 Цар. 2:19-22",
                "Іс. 49:8-15"
            ]
        },
        // BOGOYAVLENNYA (01-06) - Liturgy Paremias/Epistle
        "01-06": {
            // Usually Matins Gospel & Liturgy readings handled elsewhere
            // But if Great Vespers is served separately?
        }
    };

    private constructor() { }

    public static getInstance(): ProphecyResolver {
        if (!ProphecyResolver.instance) {
            ProphecyResolver.instance = new ProphecyResolver();
        }
        return ProphecyResolver.instance;
    }

    public getReadings(nday: number, dateStr?: string): { sexte?: DetailedReading[], vespers?: DetailedReading[], royalHours?: DetailedReading[] } {
        const result: { sexte?: DetailedReading[], vespers?: DetailedReading[], royalHours?: DetailedReading[] } = {};

        // 1. Check Fixed Dates (priority)
        if (dateStr) {
            const monthDay = dateStr.slice(5); // "MM-DD"
            const fixed = this.fixedReadings[monthDay];
            if (fixed) {
                if (fixed.hours) {
                    result.royalHours = fixed.hours.map(r => ({ reading: r, type: 'prophecy', label: 'Царські Часи' }));
                }
                if (fixed.vespers) {
                    result.vespers = fixed.vespers.map((r, i) => ({ reading: r, type: 'paremia', label: `Паремія ${i + 1}` }));
                }
                return result;
            }
        }

        // 2. Lent Logic (nday dependent)
        // Only valid for Lent (approx -55 to -1)
        if (nday >= -55 && nday <= -1) {

            // Logic Switching: Holy Week Mode vs Standard Lent
            if (nday >= -8) {
                // Holy Week Mode
                const readings = this.holyWeekReadings[nday];
                if (readings) {
                    if (readings.sexte) {
                        result.sexte = [{
                            reading: readings.sexte,
                            type: 'paremia',
                            label: '6-й час'
                        }];
                    }
                    if (readings.vespers && readings.vespers.length > 0) {
                        result.vespers = readings.vespers.map((r, i) => {
                            if (typeof r === 'string') {
                                return {
                                    reading: r,
                                    type: 'paremia',
                                    label: `Паремія ${i + 1}`
                                };
                            } else {
                                return {
                                    reading: r.reading,
                                    type: r.type || 'paremia',
                                    label: r.label || `Паремія ${i + 1}`
                                };
                            }
                        });
                    }
                    if (readings.royalHours) {
                        result.royalHours = readings.royalHours.map(r => ({
                            reading: r,
                            type: 'prophecy',
                            label: 'Царські Часи' // Label handled in report usually, but keeping simple
                        }));
                    }
                }
            } else {
                // Standard Lent Mode
                const readings = this.lentenReadings[nday];

                if (readings) {
                    if (readings.sexte) {
                        result.sexte = [{
                            reading: readings.sexte,
                            type: 'paremia',
                            label: '6-й час (Ісая)'
                        }];
                    }

                    if (readings.vespers1 || readings.vespers2) {
                        result.vespers = [];
                        if (readings.vespers1) {
                            result.vespers.push({
                                reading: readings.vespers1,
                                type: 'paremia',
                                label: 'Буття'
                            });
                        }
                        if (readings.vespers2) {
                            result.vespers.push({
                                reading: readings.vespers2,
                                type: 'paremia',
                                label: 'Притчі'
                            });
                        }
                    }
                }
            }
        }

        return result;
    }
}
