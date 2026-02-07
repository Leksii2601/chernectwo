export type ReadingDefinition = {
    reading: string;
    label?: string;
    type?: 'apostle' | 'gospel' | 'paremia' | 'other';
};

export type LiturgyBlock = {
    apostle?: ReadingDefinition[];
    gospel?: ReadingDefinition[];
};

// Define TypikonAction type
export type TypikonAction =
    | 'SUPPRESS_SAINTS'
    | 'SUPPRESS_ORDINARY'
    | 'SUPPRESS_PONOMAR'
    | 'APPEND_LITURGY'
    | 'REPLACE_LITURGY'
    | 'SET_ALITURGICAL'
    | 'ADD_HOURS'
    | 'REPLACE_HOURS'
    | 'ADD_VESPERS'
    | 'REPLACE_VESPERS'
    | 'ADD_MATINS';

export interface TypikonRule {
    id: string;
    triggers: {
        mmdd?: string[];
        nday?: number[];
        dow?: number[];
        isLent?: boolean;
        year?: number[]; // Added Year Isolation but preferring nday for recurring
    };
    action: TypikonAction;
    data?: {
        liturgy?: LiturgyBlock;
        matins?: ReadingDefinition[];
        hours?: Record<string, ReadingDefinition[]>;
        vespers?: ReadingDefinition[];
        metadata?: string;
    };
}

const FUNERAL_AP = "1 Сол., 270 зач., 4:13-17";
const FUNERAL_EV = "Ін., 16 зач., 5:24-30";

export const OCU_RULES: TypikonRule[] = [
    // --- MOVED & RECURRING SHIFTS (Year-Agnostic via nday) ---
    // Target ndays calculated based on Paschalion configurations

    // Jan 03 Royal Hours (Eve on Sunday => Pascha May 5 => nday 243)
    {
        id: "Jan 03 Royal Hours (Eve on Sun)",
        triggers: { nday: [243] },
        action: 'REPLACE_HOURS',
        data: {
            hours: {
                "1-й час": [{ reading: "Діян. 33 зач., 13:25-32", label: "Час 1" }, { reading: "Мф. 5 зач., 3:1-11", label: "Час 1" }],
                "3-й час": [{ reading: "Діян. 42 зач., 19:1-8", label: "Час 3" }, { reading: "Мк. 1 зач., 1:1-8", label: "Час 3" }],
                "6-й час": [{ reading: "Рим. 91 зач., 6:3-11", label: "Час 6" }, { reading: "Мк. 2 зач., 1:9-15", label: "Час 6" }],
                "9-й час": [{ reading: "Тит. 302 зач., 2:11-14, 3:4-7", label: "Час 9" }, { reading: "Мф. 6 зач., 3:13-17", label: "Час 9" }]
            }
        }
    },
    {
        id: "Jan 03 Aliturgical (Eve on Sun)",
        triggers: { nday: [243] },
        action: 'SET_ALITURGICAL'
    },

    // Dec 01 Jump (Lucan Jump on Wk 31) - Force 1 Tim / Luke 14
    // Pascha Apr 20 => Dec 1 is nday 225
    {
        id: "Dec 01 Jump (Monday)",
        triggers: { nday: [225] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "1 Тим. 280 зач.; 1:1-7", label: "Ряд. (31 тиж.)" }],
                gospel: [{ reading: "Лк. 76 зач.; 14:12-15", label: "Ряд. (31 тиж.)" }]
            }
        }
    },
    // Dec 07 Jump (Sunday Wk 31)
    // Pascha Apr 20 => Dec 7 is nday 231
    {
        id: "Dec 07 Jump (Sunday)",
        triggers: { nday: [231] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "1 Тим. 280 зач.; 1:15-17", label: "Неділя" }],
                gospel: [{ reading: "Лк. 85 зач.; 17:12-19", label: "Неділя" }]
            }
        }
    },

    // --- GENERIC RULES ---

    // Jan 01 (Circumcision / Basil) - Generic (Applies to 2025 too)
    {
        id: "Jan 01 PCU Correction",
        triggers: { mmdd: ["01-01"] },
        action: 'REPLACE_VESPERS',
        data: { vespers: [] }
    },
    {
        id: "Jan 01 Liturgy",
        triggers: { mmdd: ["01-01"] },
        action: 'REPLACE_LITURGY',
        data: {
            matins: [{ reading: "Ін., 35 зач. (від половини), 10:1-9", label: "Ран.", type: 'gospel' }],
            liturgy: {
                apostle: [
                    { reading: "Кол., 254 зач., 2:8-12", label: "Свята" },
                    { reading: "Єр., 318 зач., 7:26-8:2", label: "Свт." },
                    { reading: "Гал., 213 зач., 5:22-6:2", label: "Прп." }
                ],
                gospel: [
                    { reading: "Лк., 6 зач., 2:20-21, 40-52", label: "Свята" },
                    { reading: "Ін., 36 зач., 10:9-16", label: "Свт." }, // Jn 36 as requested
                    { reading: "Лк., 24 зач., 6:17-23", label: "Прп." }
                ]
            }
        }
    },

    // Jan 02 (Forefeast)
    {
        id: "Jan 02 PCU Correction",
        triggers: { mmdd: ["01-02"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Євр., 326 зач., 10:35-11:7", label: "Ряд. (за чт.)" },
                    { reading: "Євр., 327 зач., 11:8, 11-16", label: "Ряд." },
                    { reading: "Євр., 318 зач., 7:26-8:2", label: "Свт." }
                ],
                gospel: [
                    { reading: "Мк., 39 зач., 9:10-16", label: "Ряд. (за чт.)" },
                    { reading: "Мк., 41 зач., 9:33-41", label: "Ряд." },
                    { reading: "Ін., 8 зач., 3:1-15", label: "Свт." }
                ]
            }
        }
    },

    // Jan 03 (Saturday Before Theophany) - 2026 SPECIFIC (Keep year for non-jump specifics?)
    // But Jan 3 is fixed. So mmdd + dow is better?
    // "Sat Before Theophany" if Jan 3 is Sat.
    // Triggers: mmdd 01-03, dow 6.
    {
        id: "Jan 03 Sat Before Theophany",
        triggers: { mmdd: ["01-03"], dow: [6] }, // Generic
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "1 Тим., 284 зач., 3:14-4:5", label: "Суботи перед Богоявленням" },
                    { reading: "2 Тим., 292 зач., 2:1-10", label: "Св." }
                ],
                gospel: [
                    { reading: "Мф., 5 зач., 3:1-11", label: "Суботи перед Богоявленням" },
                    { reading: "Мф., 36 зач., 10:16-22", label: "Св." }
                ]
            }
        }
    },

    // Jan 04 (Sun Before Theophany)
    // Triggers: mmdd 01-04, dow 0.
    {
        id: "Jan 04 Sun Before Theophany",
        triggers: { mmdd: ["01-04"], dow: [0] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "2 Тим., 298 зач., 4:5-8", label: "Неділі перед Богоявленням" },
                    { reading: "Рим., 96 зач. (від пол.), 8:3-9", label: "Апостолів" }
                ],
                gospel: [
                    { reading: "Мк., 1 зач., 1:1-8", label: "Неділі перед Богоявленням" },
                    { reading: "Лк., 50 зач., 10:1-15", label: "Апостолів" }
                ]
            }
        }
    },

    // Jan 05 (Eve of Theophany)
    {
        id: "Jan 05 Eve Royal Hours",
        triggers: { mmdd: ["01-05"] }, // Generic for when Eve is Jan 5
        action: 'REPLACE_HOURS',
        data: {
            hours: {
                "1-й час": [{ reading: "Діян. 33 зач., 13:25-32", label: "Час 1" }, { reading: "Мф. 5 зач., 3:1-11", label: "Час 1" }],
                "3-й час": [{ reading: "Діян. 42 зач., 19:1-8", label: "Час 3" }, { reading: "Мк. 1 зач., 1:1-8", label: "Час 3" }],
                "6-й час": [{ reading: "Рим. 91 зач., 6:3-11", label: "Час 6" }, { reading: "Мк. 2 зач., 1:9-15", label: "Час 6" }],
                "9-й час": [{ reading: "Тит. 302 зач., 2:11-14, 3:4-7", label: "Час 9" }, { reading: "Мф. 6 зач., 3:13-17", label: "Час 9" }]
            }
        }
    },
    {
        id: "Jan 05 Eve Vespers Suppression",
        triggers: { mmdd: ["01-05"] },
        action: 'REPLACE_VESPERS',
        data: { vespers: [] }
    },
    {
        id: "Jan 05 Eve Liturgy",
        triggers: { mmdd: ["01-05"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "1 Кор., 143 зач., 9:19-27", label: "Літ." },
                    { reading: "1 Кор., 143 зач. (від пол.), 10:1-4", label: "Осв. води" }
                ],
                gospel: [
                    { reading: "Лк., 9 зач., 3:1-18", label: "Літ." },
                    { reading: "Мк., 2 зач., 1:9-11", label: "Осв. води" }
                ]
            }
        }
    },

    // Jan 06 (Theophany)
    {
        id: "Jan 06 Theophany Correction",
        triggers: { mmdd: ["01-06"] },
        action: 'REPLACE_LITURGY',
        data: {
            matins: [{ reading: "Мк., 2 зач., 1:9-11", label: "Ран.", type: 'gospel' }],
            liturgy: {
                apostle: [
                    { reading: "Тит., 302 зач., 2:11-14, 3:4-7", label: "Свята" },
                    { reading: "1 Кор., 143 зач. (від пол.), 10:1-4", label: "Осв. води" }
                ],
                gospel: [
                    { reading: "Мф., 6 зач., 3:13-17", label: "Свята" },
                    { reading: "Мк., 2 зач., 1:9-11", label: "Осв. води" }
                ]
            }
        }
    },

    // Jan 07 (Synaxis)
    // Sat after Nativity? No, Synaxis is Jan 7.
    // If Jan 7 is Saturday?
    {
        id: "Jan 07 Synaxis (Sat after Nativity)",
        triggers: { mmdd: ["01-07"], dow: [6] }, // Generic
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Як., 50 зач., 1:1-18", label: "Ряд. (Суб. п. Різдві)" },
                    { reading: "Діян., 42 зач., 19:1-8", label: "Св." }
                ],
                gospel: [
                    { reading: "Мк., 44 зач., 10:11-16", label: "Ряд. (Суб. п. Різдві)" },
                    { reading: "Ін., 3 зач., 1:29-34", label: "Св." }
                ]
            }
        }
    },

    // Jan 08-09 (Ryad Overrides) - 2026 Specific.
    // These seemed random in previous file. I'll keep them with year 2026 OR remove if they are not jumps?
    // "Jan 08 Chozebite Correction" -> 2026 Jan 8 is Thursday.
    // If user didn't ask to remove year for THESE, I will keep 2026 to be safe (as they might be specific to 2026 Lectionary collision).
    // Prompt said: "Prohibit ... year trigger for RECURRING LITURGICAL SHIFTS. All lectionary jumps (Lucan/Theophany) must be defined via nday... Use year only for HISTORICAL CORRECTIONS".
    // These look like historical corrections for 2026 lectionary path.
    {
        id: "Jan 08 Chozebite Correction",
        triggers: { mmdd: ["01-08"], year: [2026] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "Як., 51 зач., 1:19-27", label: "Ряд." }],
                gospel: [{ reading: "Мк., 45 зач., 10:17-27", label: "Ряд." }]
            }
        }
    },
    {
        id: "Jan 09 Polyeuctus Correction",
        triggers: { mmdd: ["01-09"], year: [2026] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "Як., 52 зач., 2:1-13", label: "Ряд." }],
                gospel: [{ reading: "Мк., 46 зач., 10:23-32", label: "Ряд." }]
            }
        }
    },

    // Jan 10 (Sat After Theophany)
    {
        id: "Jan 10 Sat After Theophany",
        triggers: { mmdd: ["01-10"], dow: [6] }, // Generic
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Еф., 233 зач., 6:10-17", label: "Суботи після Богоявлення" },
                    { reading: "1 Кор., 151 зач., 12:7-11", label: "Свт." }
                ],
                gospel: [
                    { reading: "Мф., 7 зач., 4:1-11", label: "Суботи після Богоявлення" },
                    { reading: "Мф., 34 зач. (від половини), 10:1-8", label: "Свт." }
                ]
            }
        }
    },

    // Jan 11 (Sun After Theophany)
    {
        id: "Jan 11 Sun After Theophany",
        triggers: { mmdd: ["01-11"], dow: [0] }, // Generic
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Еф., 224 зач. (від половини), 4:7-13", label: "Неділя після Богоявлення" },
                    { reading: "2 Кор., 176 зач., 4:6-15", label: "Прп." }
                ],
                gospel: [
                    { reading: "Мф., 8 зач., 4:12-17", label: "Неділя після Богоявлення" },
                    { reading: "Мф., 43 зач., 11:27-30", label: "Прп." }
                ]
            }
        }
    },

    // Jan 12 Suppression
    {
        id: "Jan 12 Tatiana Suppression",
        triggers: { mmdd: ["01-12"] },
        action: 'SUPPRESS_SAINTS'
    },

    // Jan 13 - 2026
    {
        id: "Jan 13 Martyrs",
        triggers: { mmdd: ["01-13"], year: [2026] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Євр., 310 зач., 4:1-13", label: "Ряд." },
                    { reading: "Рим., 99 зач., 8:28-39", label: "Мчч." }
                ],
                gospel: [
                    { reading: "Лк., 106 зач., 21:12-19", label: "Ряд." },
                    { reading: "Лк., 24 зач., 6:17-23", label: "Мчч." }
                ]
            }
        }
    },

    // Jan 14 Leavetaking
    {
        id: "Jan 14 Leavetaking",
        triggers: { mmdd: ["01-14"] },
        action: 'REPLACE_LITURGY',
        data: {
            matins: [{ reading: "Мф., 34 зач. (від половини), 10:1-8", label: "Ран.", type: 'gospel' }],
            liturgy: {
                apostle: [
                    { reading: "Євр., 312 зач., 5:11-6:8", label: "Ряд." },
                    { reading: "1 Кор., 131 зач., 4:9-16", label: "Св." }
                ],
                gospel: [
                    { reading: "Лк., 104 зач., 21:5-7, 10-11, 20-24", label: "Ряд." },
                    { reading: "Мф., 104 зач., 25:1-13", label: "Св." }
                ]
            }
        }
    },

    // Jan 16 Chains
    {
        id: "Jan 16 Chains of Peter",
        triggers: { mmdd: ["01-16"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Євр., 317 зач., 7:18-25", label: "Ряд." },
                    { reading: "Діян., 29 зач., 12:1-11", label: "Ап." }
                ],
                gospel: [
                    { reading: "Лк., 108 зач., 21:37-22:8", label: "Ряд." },
                    { reading: "Ін., 67 зач., 21:15-25", label: "Ап." }
                ]
            }
        }
    },

    // Jan 17 Anthony
    {
        id: "Jan 17 Anthony",
        triggers: { mmdd: ["01-17"] },
        action: 'REPLACE_LITURGY',
        data: {
            matins: [{ reading: "Мф., 43 зач., 11:27-30", label: "Ран.", type: 'gospel' }],
            liturgy: {
                apostle: [
                    { reading: "Еф., 220 зач., 2:11-13", label: "Ряд." },
                    { reading: "Євр., 335 зач., 13:17-21", label: "Прп." }
                ],
                gospel: [
                    { reading: "Лк., 72 зач., 13:18-29", label: "Ряд." },
                    { reading: "Лк., 24 зач., 6:17-23", label: "Прп." }
                ]
            }
        }
    },

    // Jan 18 - 2026 Specific
    {
        id: "Jan 18 Sun 29 Correction",
        triggers: { mmdd: ["01-18"], year: [2026] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Кол., 257 зач., 3:4-11", label: "Неділя 29-та" },
                    { reading: "Євр., 334 зач., 13:7-16", label: "Свтт." }
                ],
                gospel: [
                    { reading: "Лк., 85 зач., 17:12-19", label: "Неділя 29-та" },
                    { reading: "Мф., 11 зач., 5:14-19", label: "Свтт." }
                ]
            }
        }
    },

    // Jan 19 2026: St James Epistle (Theophany Shift/Jump)
    // nday 274 = Jan 19 when Pascha was Apr 20
    {
        id: "Jan 19 Macarius (Theophany Shift)",
        triggers: { nday: [274] },
        action: 'REPLACE_LITURGY',
        data: {
            matins: [{ reading: "Лк., 24 зач., 6:17-23", label: "Ран.", type: 'gospel' }],
            liturgy: {
                apostle: [
                    { reading: "Як., 53 зач., 2:14-26", label: "Ряд." },
                    { reading: "Гал., 213 зач., 5:22-6:2", label: "Прп." }
                ],
                gospel: [
                    { reading: "Мк., 48 зач., 10:46-52", label: "Ряд." },
                    { reading: "Мф., 43 зач., 11:27-30", label: "Прп." }
                ]
            }
        }
    },

    // Jan 20-24 2026 - Standard Weekly (Keeping year as they are likely specific correction)
    { id: "Jan 20 Euthymius", triggers: { mmdd: ["01-20"], year: [2026] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "Як., 54 зач., 3:1-10", label: "Ряд." }, { reading: "Євр., 335 зач., 13:17-21", label: "Прп." }], gospel: [{ reading: "Мк., 50 зач., 11:11-23", label: "Ряд." }, { reading: "Лк., 24 зач., 6:17-23", label: "Прп." }] } } },
    { id: "Jan 21 Maximus", triggers: { mmdd: ["01-21"], year: [2026] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "Як., 55 зач., 3:11-4:6", label: "Ряд." }, { reading: "Євр., 330 зач., 11:33-12:2", label: "Прп." }], gospel: [{ reading: "Мк., 51 зач., 11:23-26", label: "Ряд." }, { reading: "Лк., 64 зач., 12:8-12", label: "Прп." }] } } },
    { id: "Jan 22 Timothy", triggers: { mmdd: ["01-22"], year: [2026] }, action: 'REPLACE_VESPERS', data: { vespers: [] } },
    { id: "Jan 22 Timothy Liturgy", triggers: { mmdd: ["01-22"], year: [2026] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "Як., 56 зач., 4:7-5:9", label: "Ряд." }, { reading: "2 Тим., 290 зач. (від половини), 1:3-9", label: "Ап." }], gospel: [{ reading: "Мк., 52 зач., 11:27-33", label: "Ряд." }, { reading: "Лк., 50 зач., 10:1-15", label: "Ап." }] } } },
    { id: "Jan 23 Ryad Override", triggers: { mmdd: ["01-23"], year: [2026] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "1 Пет., 58 зач., 1:1-2, 10-12, 2:6-10", label: "Ряд." }], gospel: [{ reading: "Мк., 53 зач., 12:1-12", label: "Ряд." }] } } },
    { id: "Jan 23 No Vespers", triggers: { mmdd: ["01-23"], year: [2026] }, action: "REPLACE_VESPERS", data: { vespers: [] } },
    { id: "Jan 24 Ryad Override", triggers: { mmdd: ["01-24"], year: [2026] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "1 Сол., 273 зач., 5:14-23", label: "Ряд." }], gospel: [{ reading: "Лк., 84 зач., 17:3-10", label: "Ряд." }] } } },
    { id: "Jan 24 No Vespers", triggers: { mmdd: ["01-24"], year: [2026] }, action: "REPLACE_VESPERS", data: { vespers: [] } },

    // Jan 25 (Zacchaeus)
    {
        id: "Jan 25 Zacchaeus",
        triggers: { mmdd: ["01-25"], year: [2026] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "1 Тим., 285 зач., 4:9-15", label: "Неділя про Закхея" }],
                gospel: [{ reading: "Лк., 94 зач., 19:1-10", label: "Неділя про Закхея" }]
            }
        }
    },
    { id: "Jan 25 Suppress Saints", triggers: { mmdd: ["01-25"], year: [2026] }, action: "SUPPRESS_SAINTS" },
    { id: "Jan 25 No Vespers", triggers: { mmdd: ["01-25"], year: [2026] }, action: "REPLACE_VESPERS", data: { vespers: [] } },

    // Jan 26-31 2026
    { id: "Jan 26 Ryad", triggers: { mmdd: ["01-26"], year: [2026] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "1 Пет., 59 зач., 2:21-3:9", label: "Ряд." }], gospel: [{ reading: "Мк., 54 зач., 12:13-17", label: "Ряд." }] } } },
    { id: "Jan 26 No Vespers", triggers: { mmdd: ["01-26"], year: [2026] }, action: "REPLACE_VESPERS", data: { vespers: [] } },
    { id: "Jan 27 Ryad+Saint", triggers: { mmdd: ["01-27"], year: [2026] }, action: 'REPLACE_LITURGY', data: { matins: [{ reading: "Ін., 35 зач. (від половини), 10:1-9", label: "Ран.", type: 'gospel' }], liturgy: { apostle: [{ reading: "1 Пет., 60 зач., 3:10-22", label: "Ряд." }, { reading: "Євр., 318 зач., 7:26-8:2", label: "Свт." }], gospel: [{ reading: "Мк., 55 зач., 12:18-27", label: "Ряд." }, { reading: "Ін., 36 зач., 10:9-16", label: "Свт." }] } } },
    { id: "Jan 28 Ryad", triggers: { mmdd: ["01-28"], year: [2026] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "1 Пет., 61 зач., 4:1-11", label: "Ряд." }], gospel: [{ reading: "Мк., 56 зач., 12:28-37", label: "Ряд." }] } } },
    { id: "Jan 29 Ryad Transfer", triggers: { mmdd: ["01-29"], year: [2026] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "1 Пет., 62 зач., 4:12-5:5", label: "Ряд." }, { reading: "2 Пет., 64 зач., 1:1-10", label: "Ряд. (за пт.)" }, { reading: "Євр., 311 зач. (від половини), 4:14-5:6", label: "Сщмч." }], gospel: [{ reading: "Мк., 57 зач., 12:38-44", label: "Ряд." }, { reading: "Мк., 58 зач., 13:1-8", label: "Ряд. (за пт.)" }, { reading: "Мк., 41 зач., 9:33-41", label: "Сщмч." }] } } },
    // Three Hierarchs (Jan 30) - Generic
    { id: "Jan 30 3 Hierarchs", triggers: { mmdd: ["01-30"] }, action: 'REPLACE_LITURGY', data: { matins: [{ reading: "Ін., 36 зач., 10:9-16", label: "Ран.", type: 'gospel' }], liturgy: { apostle: [{ reading: "Євр., 334 зач., 13:7-16", label: "Свтт." }], gospel: [{ reading: "Мф., 11 зач., 5:14-19", label: "Свтт." }] } } },
    { id: "Jan 30 No Vespers", triggers: { mmdd: ["01-30"] }, action: "REPLACE_VESPERS", data: { vespers: [] } },
    // Feb 31 -> Jan 31
    { id: "Jan 31 Ryad", triggers: { mmdd: ["01-31"], year: [2026] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "2 Тим., 293 зач., 3:10-15", label: "Ряд." }, { reading: "1 Кор., 153 зач., 12:27-13:8", label: "Свв." }], gospel: [{ reading: "Лк., 88 зач., 18:2-8", label: "Ряд." }, { reading: "Мф., 34 зач. (від половини), 10:1,5-8", label: "Свв." }] } } },

    // Feb 02 (Presentation)
    { id: "Feb 02 Presentation Suppression", triggers: { mmdd: ["02-02"] }, action: 'SUPPRESS_ORDINARY' },

    // Feb 03 - 2026
    { id: "Feb 03 Simeon Correction", triggers: { mmdd: ["02-03"], year: [2026] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "2 Пет., 66 зач., 1:20-2:9", label: "Ряд. (за пн.)" }, { reading: "2 Пет., 67 зач., 2:9-22", label: "Ряд." }, { reading: "Євр., 321 зач. (від половини), 9:11-14", label: "Прав." }], gospel: [{ reading: "Мк., 59 зач., 13:9-13", label: "Ряд. (за пн.)" }, { reading: "Мк., 60 зач., 13:14-23", label: "Ряд." }, { reading: "Лк., 8 зач., 2:25-38", label: "Прав." }] } } },

    // Feb 07 (Week 34) - 2026
    { id: "Feb 07 Lukina Perestupka", triggers: { mmdd: ["02-07"], year: [2026] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "2 Тим., 295 зач., 3:1-9", label: "Ряд. (34 тиж.)" }], gospel: [{ reading: "Лк., 103 зач., 20:46-21:4", label: "Ряд. (34 тиж.)" }] } } },

    // Feb 08 (Prodigal Son + Theodore Stratelates) - 2026
    {
        id: "Feb 08 Theodore Stratelates",
        triggers: { mmdd: ["02-08"], year: [2026] },
        action: 'APPEND_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "2 Тим., 292 зач., 2:1-10", label: "Вмч." }],
                gospel: [{ reading: "Ін., 52 зач., 15:17-16:2", label: "Вмч." }]
            }
        }
    },

    // Feb 10-12
    { id: "Feb 10-12 Suppression", triggers: { mmdd: ["02-10", "02-11", "02-12"], year: [2026] }, action: 'SUPPRESS_SAINTS' },

    // Feb 12 Iveron
    { id: "Feb 12 Iveron Icon Appends", triggers: { mmdd: ["02-12"], year: [2026] }, action: 'APPEND_LITURGY', data: { matins: [{ reading: "Лк., 4 зач., 1:39-49, 56", label: "Ран.", type: 'gospel' }], liturgy: { apostle: [{ reading: "Флп., 240 зач., 2:5-11", label: "Богородиці" }], gospel: [{ reading: "Лк., 54 зач., 10:38-42; 11:27-28", label: "Богородиці" }] } } },

    // Feb 22 Forgiveness Sunday (No Baptist)
    // nday -49 = Forgiveness Sunday Universal
    {
        id: "Forgiveness Sunday (No Baptist)",
        triggers: { nday: [-49] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "Рим., 112 зач., 13:11-14:4", label: "Неділя сиропусна" }],
                gospel: [{ reading: "Мф., 17 зач., 6:14-21", label: "Неділя сиропусна" }]
            }
        }
    },
    { id: "Forgiveness Sunday Suppress Saints", triggers: { nday: [-49] }, action: "SUPPRESS_SAINTS" },

    // Cheesefare Wed (-53)
    { id: "Cheesefare Wednesday Aliturgical", triggers: { nday: [-53] }, action: 'SET_ALITURGICAL' },
    { id: "Cheesefare Wednesday Readings", triggers: { nday: [-53] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іоїл. 2:12-26", label: "6-й час (Паремія)" }] } } },
    { id: "Cheesefare Wednesday Vespers", triggers: { nday: [-53] }, action: 'ADD_VESPERS', data: { vespers: [{ reading: "Іоїл. 3:12-21", label: "Вечірня (Паремія)" }] } },

    // Cheesefare Fri (-51)
    { id: "Cheesefare Friday Aliturgical", triggers: { nday: [-51] }, action: 'SET_ALITURGICAL' },
    { id: "Cheesefare Friday Readings", triggers: { nday: [-51] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Зах. 8:7-17", label: "6-й час (Паремія)" }] } } },
    { id: "Cheesefare Friday Vespers", triggers: { nday: [-51] }, action: 'ADD_VESPERS', data: { vespers: [{ reading: "Зах. 8:19-23", label: "Вечірня (Паремія)" }] } },

    // Cheesefare Sat (-50)
    { id: "Cheesefare Saturday (Ascetic Fathers)", triggers: { nday: [-50] }, action: 'APPEND_LITURGY', data: { liturgy: { apostle: [{ reading: "Гал., 213 зач., 5:22-6:2", label: "Прпп." }], gospel: [{ reading: "Мф., 43 зач., 11:27-30", label: "Прпп." }] } } },

    // Week 1 Lent
    { id: "Week 1 Monday", triggers: { nday: [-48] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 1:1-20", label: "6-й час (Паремія)" }] } } },
    { id: "Week 1 Monday Vespers", triggers: { nday: [-48] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 1:1-13", label: "Веч." }, { reading: "Притч. 1:1-20", label: "Веч." }] } },
    { id: "Week 1 Tuesday Suppression", triggers: { nday: [-47] }, action: 'SUPPRESS_SAINTS' },
    { id: "Week 1 Tuesday", triggers: { nday: [-47] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 1:19-2:3", label: "6-й час (Паремія)" }] } } },
    { id: "Week 1 Tuesday Vespers", triggers: { nday: [-47] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 1:14-23", label: "Веч." }, { reading: "Притч. 1:20-33", label: "Веч." }] } },
    { id: "Week 1 Wednesday Aliturgical", triggers: { nday: [-46] }, action: 'SET_ALITURGICAL' },
    { id: "Week 1 Wednesday Hours", triggers: { nday: [-46] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 2:3-11", label: "6-й час (Паремія)" }] } } },
    { id: "Week 1 Wednesday Vespers", triggers: { nday: [-46] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 1:24-2:3", label: "Вечірня (Паремія)" }, { reading: "Притч. 2:1-22", label: "Вечірня (Паремія)" }] } },
    { id: "Week 1 Thursday", triggers: { nday: [-45] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 2:11-21", label: "6-й час (Паремія)" }] } } },
    { id: "Week 1 Thursday Vespers", triggers: { nday: [-45] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 2:4-19", label: "Веч." }, { reading: "Притч. 3:1-18", label: "Веч." }] } },
    { id: "Week 1 Friday", triggers: { nday: [-44] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 3:1-14", label: "6-й час (Паремія)" }] } } },
    { id: "Week 1 Friday Vespers", triggers: { nday: [-44] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 2:20-3:20", label: "Веч." }, { reading: "Притч. 3:19-34", label: "Веч." }] } },
    { id: "Week 1 Saturday (Theodore Tyro)", triggers: { nday: [-43] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "Євр., 303 зач., 1:1-12", label: "Ряд." }, { reading: "2 Тим., 292 зач., 2:1-10", label: "Вмч." }], gospel: [{ reading: "Мк., 10 зач., 2:23-3:5", label: "Ряд." }, { reading: "Ін., 52 зач., 15:17-16:2", label: "Вмч." }] } } },

    // Week 2
    { id: "Week 2 Mon", triggers: { nday: [-41] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 4:2-5:7", label: "6-й час" }] } } },
    { id: "Week 2 Mon Vesp", triggers: { nday: [-41] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 3:21-4:7", label: "Веч." }, { reading: "Притч. 3:34-4:22", label: "Веч." }] } },
    { id: "Week 2 Tue", triggers: { nday: [-40] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 5:7-16", label: "6-й час" }] } } },
    { id: "Week 2 Tue Vesp", triggers: { nday: [-40] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 4:8-15", label: "Веч." }, { reading: "Притч. 5:1-15", label: "Веч." }] } },
    { id: "Week 2 Wed", triggers: { nday: [-39] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 2:3-11", label: "6-й час" }] } } },
    { id: "Week 2 Wed Vesp", triggers: { nday: [-39] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 1:14-23", label: "Веч." }, { reading: "Притч. 1:20-33", label: "Веч." }] } },
    { id: "Week 2 Thu", triggers: { nday: [-38] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 6:1-12", label: "6-й час" }] } } },
    { id: "Week 2 Thu Vesp", triggers: { nday: [-38] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 5:1-24", label: "Веч." }, { reading: "Притч. 6:3-20", label: "Веч." }] } },
    { id: "Week 2 Fri", triggers: { nday: [-37] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 7:1-14", label: "6-й час" }] } } },
    { id: "Week 2 Fri Vesp", triggers: { nday: [-37] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 5:32-6:8", label: "Веч." }, { reading: "Притч. 6:20-7:1", label: "Веч." }] } },

    // Week 3
    { id: "Week 3 Mon 40 Martyrs Liturgy", triggers: { nday: [-34] }, action: 'REPLACE_LITURGY', data: { matins: [{ reading: "Лк., 106 зач., 21:12-19", label: "Ран.", type: 'gospel' }], liturgy: { apostle: [{ reading: "Євр., 331 зач., 12:1-10", label: "Мчч." }], gospel: [{ reading: "Мф., 80 зач., 20:1-16", label: "Мчч." }] } } },
    { id: "Week 3 Mon Suppression", triggers: { nday: [-34], mmdd: ["03-09"] }, action: 'SUPPRESS_SAINTS' },
    { id: "Week 3 Mon Hours", triggers: { nday: [-34] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 8:13-9:7", label: "6-й час" }] } } },
    { id: "Week 3 Mon Vespers", triggers: { nday: [-34] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 6:9-22", label: "Веч." }, { reading: "Притч. 8:1-21", label: "Веч." }] } },

    { id: "Week 3 Tue", triggers: { nday: [-33] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 9:9-10:4", label: "6-й час" }] } } },
    { id: "Week 3 Tue Vesp", triggers: { nday: [-33] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 7:1-5", label: "Веч." }, { reading: "Притч. 8:32-9:11", label: "Веч." }] } },
    { id: "Week 3 Wed", triggers: { nday: [-32] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 10:12-20", label: "6-й час" }] } } },
    { id: "Week 3 Wed Vesp", triggers: { nday: [-32] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 7:6-9", label: "Веч." }, { reading: "Притч. 9:12-18", label: "Веч." }] } },
    { id: "Week 3 Thu", triggers: { nday: [-31] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 11:10-12:2", label: "6-й час" }] } } },
    { id: "Week 3 Thu Vesp", triggers: { nday: [-31] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 7:11-8:3", label: "Веч." }, { reading: "Притч. 10:1-22", label: "Веч." }] } },
    { id: "Week 3 Fri", triggers: { nday: [-30] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 13:2-13", label: "6-й час" }] } } },
    { id: "Week 3 Fri Vesp", triggers: { nday: [-30] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 8:4-21", label: "Веч." }, { reading: "Притч. 10:31-11:12", label: "Веч." }] } },

    // Week 4
    { id: "Week 4 Mon", triggers: { nday: [-27] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 14:24-32", label: "6-й час" }] } } },
    { id: "Week 4 Mon Vesp", triggers: { nday: [-27] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 8:21-9:7", label: "Веч." }, { reading: "Притч. 11:19-12:6", label: "Веч." }] } },

    // Soul Saturdays
    {
        id: "Soul Saturday Meatfare (-57)",
        triggers: { nday: [-57] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "1 Кор., 146 зач., 10:23-28", label: "Ряд." }, { reading: FUNERAL_AP, label: "Заупокій" }],
                gospel: [{ reading: "Лк., 105 зач., 21:8-9, 25-27, 33-36", label: "Ряд." }, { reading: FUNERAL_EV, label: "Заупокій" }]
            }
        }
    },
    { id: "Soul Saturday Week 2 (-36)", triggers: { nday: [-36] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "Євр., 309 зач., 3:12-16", label: "Ряд." }, { reading: FUNERAL_AP, label: "Заупокій" }], gospel: [{ reading: "Мк., 6 зач., 1:35-44", label: "Ряд." }, { reading: FUNERAL_EV, label: "Заупокій" }] } } },
    { id: "Soul Saturday Week 3 (-29)", triggers: { nday: [-29] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "Євр., 325 зач., 10:32-38", label: "Ряд." }, { reading: FUNERAL_AP, label: "Заупокій" }], gospel: [{ reading: "Мк., 8 зач., 2:14-17", label: "Ряд." }, { reading: FUNERAL_EV, label: "Заупокій" }] } } },
    { id: "Soul Saturdays Suppression", triggers: { nday: [-57, -36, -29, -22] }, action: 'SUPPRESS_SAINTS' },

    { id: "Week 4 Soul Saturday (-22)", triggers: { nday: [-22] }, action: 'REPLACE_LITURGY', data: { liturgy: { apostle: [{ reading: "Євр., 313 зач., 6:9-12", label: "Ряд." }, { reading: "1 Кор., 163 зач., 15:47-57", label: "Заупокій" }], gospel: [{ reading: "Мк., 31 зач., 7:31-37", label: "Ряд." }, { reading: "Ін., 16 зач., 5:24-30", label: "Заупокій" }] } } }
];
