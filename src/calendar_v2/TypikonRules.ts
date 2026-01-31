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
    | 'REPLACE_HOURS' // Added
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
const BLGV_AP = "Гал., 213 зач., 5:22-6:2";
const BLGV_EV = "Мф., 10 зач., 4:25-5:12";

export const OCU_2026_RULES: TypikonRule[] = [
    // --- JANUARY FIXES ---

    // Jan 01 (Circumcision / Basil / Prp)
    {
        id: "Jan 01 PCU Correction",
        triggers: { mmdd: ["01-01"] },
        action: 'REPLACE_VESPERS', // Remove Vespers
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
                    { reading: "Ін., 36 зач., 10:9-16", label: "Свт." },
                    { reading: "Лк., 24 зач., 6:17-23", label: "Прп." }
                ]
            }
        }
    },

    // Jan 02 (Forefeast / Sylvester / Jan 1 Transfer)
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

    // Jan 03 (Saturday Before Theophany)
    {
        id: "Jan 03 Sat Before Theophany",
        triggers: { mmdd: ["01-03"] },
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

    // Jan 04 (Sunday Before Theophany / 70 Apostles)
    {
        id: "Jan 04 Sun Before Theophany",
        triggers: { mmdd: ["01-04"] },
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

    // Jan 05 (Eve of Theophany) - Complex
    {
        id: "Jan 05 Eve Royal Hours",
        triggers: { mmdd: ["01-05"] },
        action: 'REPLACE_HOURS', // Use Override
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
        data: { vespers: [] } // Clear Vespers
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

    // Jan 07 (Synaxis of John the Baptist)
    {
        id: "Jan 07 Synaxis Correction",
        triggers: { mmdd: ["01-07"] },
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

    // Jan 08 (St George Chozebite) - Ryad Only
    {
        id: "Jan 08 Chozebite Correction",
        triggers: { mmdd: ["01-08"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "Як., 51 зач., 1:19-27", label: "Ряд." }],
                gospel: [{ reading: "Мк., 45 зач., 10:17-27", label: "Ряд." }]
            }
        }
    },

    // Jan 09 (Martyr Polyeuctus) - Ryad Only
    {
        id: "Jan 09 Polyeuctus Correction",
        triggers: { mmdd: ["01-09"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "Як., 52 зач., 2:1-13", label: "Ряд." }],
                gospel: [{ reading: "Мк., 46 зач., 10:23-32", label: "Ряд." }]
            }
        }
    },

    // Jan 10 (Saturday After Theophany / St Gregory of Nyssa)
    {
        id: "Jan 10 Sat After Theophany",
        triggers: { mmdd: ["01-10"] },
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

    // Jan 11 (Sunday After Theophany / St Theodosius)
    {
        id: "Jan 11 Sun After Theophany",
        triggers: { mmdd: ["01-11"] },
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

    // Jan 12 (Martyr Tatiana) - Suppress Saints
    {
        id: "Jan 12 Tatiana Suppression",
        triggers: { mmdd: ["01-12"] },
        action: 'SUPPRESS_SAINTS'
    },

    // Jan 13 (Martyrs Hermylus and Stratonicus) - Ryad + Saint
    {
        id: "Jan 13 Martyrs",
        triggers: { mmdd: ["01-13"] },
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

    // Jan 14 (Leavetaking of Theophany / Sinai Fathers)
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

    // Jan 16 (Veneration of Chains of Peter)
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

    // Jan 17 (St Anthony the Great)
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

    // Jan 18 (Athanasius & Cyril / Sunday 29)
    {
        id: "Jan 18 Sun 29 Correction",
        triggers: { mmdd: ["01-18"] },
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

    // Jan 19 (St Macarius)
    {
        id: "Jan 19 Macarius",
        triggers: { mmdd: ["01-19"] },
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

    // Jan 20 (St Euthymius)
    {
        id: "Jan 20 Euthymius",
        triggers: { mmdd: ["01-20"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Як., 54 зач., 3:1-10", label: "Ряд." },
                    { reading: "Євр., 335 зач., 13:17-21", label: "Прп." }
                ],
                gospel: [
                    { reading: "Мк., 50 зач., 11:11-23", label: "Ряд." },
                    { reading: "Лк., 24 зач., 6:17-23", label: "Прп." }
                ]
            }
        }
    },

    // Jan 21 (St Maximus)
    {
        id: "Jan 21 Maximus",
        triggers: { mmdd: ["01-21"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Як., 55 зач., 3:11-4:6", label: "Ряд." },
                    { reading: "Євр., 330 зач., 11:33-12:2", label: "Прп." }
                ],
                gospel: [
                    { reading: "Мк., 51 зач., 11:23-26", label: "Ряд." },
                    { reading: "Лк., 64 зач., 12:8-12", label: "Прп." }
                ]
            }
        }
    },

    // Jan 22 (Apostle Timothy)
    {
        id: "Jan 22 Timothy",
        triggers: { mmdd: ["01-22"] },
        action: 'REPLACE_VESPERS',
        data: { vespers: [] }
    },
    {
        id: "Jan 22 Timothy Liturgy",
        triggers: { mmdd: ["01-22"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Як., 56 зач., 4:7-5:9", label: "Ряд." },
                    { reading: "2 Тим., 290 зач. (від половини), 1:3-9", label: "Ап." }
                ],
                gospel: [
                    { reading: "Мк., 52 зач., 11:27-33", label: "Ряд." },
                    { reading: "Лк., 50 зач., 10:1-15", label: "Ап." }
                ]
            }
        }
    },

    // Jan 23 (Override Ryad)
    {
        id: "Jan 23 Ryad Override",
        triggers: { mmdd: ["01-23"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "1 Пет., 58 зач., 1:1-2, 10-12, 2:6-10", label: "Ряд." }],
                gospel: [{ reading: "Мк., 53 зач., 12:1-12", label: "Ряд." }]
            }
        }
    },
    { id: "Jan 23 No Vespers", triggers: { mmdd: ["01-23"] }, action: "REPLACE_VESPERS", data: { vespers: [] } },

    // Jan 24 (Override Ryad)
    {
        id: "Jan 24 Ryad Override",
        triggers: { mmdd: ["01-24"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "1 Сол., 273 зач., 5:14-23", label: "Ряд." }],
                gospel: [{ reading: "Лк., 84 зач., 17:3-10", label: "Ряд." }]
            }
        }
    },
    { id: "Jan 24 No Vespers", triggers: { mmdd: ["01-24"] }, action: "REPLACE_VESPERS", data: { vespers: [] } },

    // Jan 25 (Sunday of Zacchaeus)
    {
        id: "Jan 25 Zacchaeus",
        triggers: { mmdd: ["01-25"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "1 Тим., 285 зач., 4:9-15", label: "Неділя про Закхея" }],
                gospel: [{ reading: "Лк., 94 зач., 19:1-10", label: "Неділя про Закхея" }]
            }
        }
    },
    { id: "Jan 25 Suppress Saints", triggers: { mmdd: ["01-25"] }, action: "SUPPRESS_SAINTS" },
    { id: "Jan 25 No Vespers", triggers: { mmdd: ["01-25"] }, action: "REPLACE_VESPERS", data: { vespers: [] } },

    // Jan 26 (Mon Week 33)
    {
        id: "Jan 26 Ryad", triggers: { mmdd: ["01-26"] }, action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "1 Пет., 59 зач., 2:21-3:9", label: "Ряд." }],
                gospel: [{ reading: "Мк., 54 зач., 12:13-17", label: "Ряд." }]
            }
        }
    },
    { id: "Jan 26 No Vespers", triggers: { mmdd: ["01-26"] }, action: "REPLACE_VESPERS", data: { vespers: [] } },

    // Jan 27 (Tue Week 33 / St John Chrysostom)
    {
        id: "Jan 27 Ryad+Saint", triggers: { mmdd: ["01-27"] }, action: 'REPLACE_LITURGY',
        data: {
            matins: [{ reading: "Ін., 35 зач. (від половини), 10:1-9", label: "Ран.", type: 'gospel' }],
            liturgy: {
                apostle: [
                    { reading: "1 Пет., 60 зач., 3:10-22", label: "Ряд." },
                    { reading: "Євр., 318 зач., 7:26-8:2", label: "Свт." }
                ],
                gospel: [
                    { reading: "Мк., 55 зач., 12:18-27", label: "Ряд." },
                    { reading: "Ін., 36 зач., 10:9-16", label: "Свт." }
                ]
            }
        }
    },
    { id: "Jan 27 No Vespers", triggers: { mmdd: ["01-27"] }, action: "REPLACE_VESPERS", data: { vespers: [] } },

    // Jan 28 (Wed Week 33)
    {
        id: "Jan 28 Ryad", triggers: { mmdd: ["01-28"] }, action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "1 Пет., 61 зач., 4:1-11", label: "Ряд." }],
                gospel: [{ reading: "Мк., 56 зач., 12:28-37", label: "Ряд." }]
            }
        }
    },
    { id: "Jan 28 No Vespers", triggers: { mmdd: ["01-28"] }, action: "REPLACE_VESPERS", data: { vespers: [] } },

    // Jan 29 (Thu Week 33 / Transfer of Friday Ryad)
    {
        id: "Jan 29 Ryad Transfer", triggers: { mmdd: ["01-29"] }, action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "1 Пет., 62 зач., 4:12-5:5", label: "Ряд." },
                    { reading: "2 Пет., 64 зач., 1:1-10", label: "Ряд. (за пт.)" },
                    { reading: "Євр., 311 зач. (від половини), 4:14-5:6", label: "Сщмч." }
                ],
                gospel: [
                    { reading: "Мк., 57 зач., 12:38-44", label: "Ряд." },
                    { reading: "Мк., 58 зач., 13:1-8", label: "Ряд. (за пт.)" },
                    { reading: "Мк., 41 зач., 9:33-41", label: "Сщмч." }
                ]
            }
        }
    },
    { id: "Jan 29 No Vespers", triggers: { mmdd: ["01-29"] }, action: "REPLACE_VESPERS", data: { vespers: [] } },

    // Jan 30 (Fri Week 33 / Three Hierarchs)
    {
        id: "Jan 30 3 Hierarchs", triggers: { mmdd: ["01-30"] }, action: 'REPLACE_LITURGY',
        data: {
            matins: [{ reading: "Ін., 36 зач., 10:9-16", label: "Ран.", type: 'gospel' }],
            liturgy: {
                apostle: [
                    { reading: "Євр., 334 зач., 13:7-16", label: "Свтт." }
                ],
                gospel: [
                    { reading: "Мф., 11 зач., 5:14-19", label: "Свтт." }
                ]
            }
        }
    },
    { id: "Jan 30 No Vespers", triggers: { mmdd: ["01-30"] }, action: "REPLACE_VESPERS", data: { vespers: [] } },

    // Jan 31 (Sat Week 33 / Cyrus & John)
    {
        id: "Jan 31 Ryad", triggers: { mmdd: ["01-31"] }, action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "2 Тим., 293 зач., 3:10-15", label: "Ряд." },
                    { reading: "1 Кор., 153 зач., 12:27-13:8", label: "Свв." }
                ],
                gospel: [
                    { reading: "Лк., 88 зач., 18:2-8", label: "Ряд." },
                    { reading: "Мф., 34 зач. (від половини), 10:1,5-8", label: "Свв." }
                ]
            }
        }
    },
    { id: "Jan 31 No Vespers", triggers: { mmdd: ["01-31"] }, action: "REPLACE_VESPERS", data: { vespers: [] } },

    // --- FEBRUARY DATE FIXES ---

    // Feb 02 (Presentation of Lord) - Suppress Ordinary
    {
        id: "Feb 02 Presentation Suppression",
        triggers: { mmdd: ["02-02"] },
        action: 'SUPPRESS_ORDINARY',
        data: {}
    },

    // Feb 03 (Simeon & Anna)
    {
        id: "Feb 03 Simeon Correction",
        triggers: { mmdd: ["02-03"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "2 Пет., 66 зач., 1:20-2:9", label: "Ряд. (за пн.)" },
                    { reading: "2 Пет., 67 зач., 2:9-22", label: "Ряд." },
                    { reading: "Євр., 321 зач. (від половини), 9:11-14", label: "Прав." }
                ],
                gospel: [
                    { reading: "Мк., 59 зач., 13:9-13", label: "Ряд. (за пн.)" },
                    { reading: "Мк., 60 зач., 13:14-23", label: "Ряд." },
                    { reading: "Лк., 8 зач., 2:25-38", label: "Прав." }
                ]
            }
        }
    },

    // Feb 05 (St Theodosius of Chernihiv)
    {
        id: "Feb 05 Theodosius",
        triggers: { mmdd: ["02-05"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "1 Ін., 69 зач., 1:8-2:6", label: "Ряд." },
                    { reading: "Євр., 335 зач., 13:17-21", label: "Свт." }
                ],
                gospel: [
                    { reading: "Мк., 62 зач., 13:31-14:2", label: "Ряд." },
                    { reading: "Ін., 36 зач., 10:9-16", label: "Свт." }
                ]
            }
        }
    },

    // Feb 07 (Sat before Prodigal Son / Luke's Jump) - Week 34 Override
    {
        id: "Feb 07 Lukina Perestupka",
        triggers: { mmdd: ["02-07"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "2 Тим., 295 зач., 3:1-9", label: "Ряд. (34 тиж.)" }],
                gospel: [{ reading: "Лк., 103 зач., 20:46-21:4", label: "Ряд. (34 тиж.)" }]
            }
        }
    },

    // Feb 08 (Theodore Stratelates)
    {
        id: "Feb 08 Theodore Stratelates",
        triggers: { mmdd: ["02-08"] },
        action: 'APPEND_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "2 Тим., 292 зач., 2:1-10", label: "Вмч." }],
                gospel: [{ reading: "Мф., 36 зач., 10:16-22", label: "Вмч." }]
            }
        }
    },

    // Feb 10, 11, 12 Suppression
    {
        id: "Feb 10-12 Suppression",
        triggers: { mmdd: ["02-10", "02-11", "02-12"] },
        action: 'SUPPRESS_SAINTS'
    },

    // Feb 12 (Iveron Icon) - Explicit Matins + Liturgy Append
    {
        id: "Feb 12 Iveron Icon Appends",
        triggers: { mmdd: ["02-12"] },
        action: 'APPEND_LITURGY',
        data: {
            matins: [{ reading: "Лк., 4 зач., 1:39-49, 56", label: "Ран.", type: 'gospel' }],
            liturgy: {
                apostle: [{ reading: "Флп., 240 зач., 2:5-11", label: "Богородиці" }],
                gospel: [{ reading: "Лк., 54 зач., 10:38-42; 11:27-28", label: "Богородиці" }]
            }
        }
    },

    // Feb 13 (Constantine Ostrogsky)
    {
        id: "Feb 13 Constantine Blgv",
        triggers: { mmdd: ["02-13"] },
        action: 'APPEND_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "Гал., 213 зач., 5:22-6:2", label: "Блгв." }],
                gospel: [{ reading: "Мф., 10 зач., 4:25-5:12", label: "Блгв." }]
            }
        }
    },

    // Feb 17 Theodore Tyro
    {
        id: "Feb 17 Theodore Tyro",
        triggers: { mmdd: ["02-17"] },
        action: 'APPEND_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "2 Тим., 292 зач., 2:1-10", label: "Вмч." }],
                gospel: [{ reading: "Ін., 52 зач., 15:17-16:2", label: "Вмч." }]
            }
        }
    },

    // Feb 19 Blgv (Requested by User)
    {
        id: "Feb 19 Blgv",
        triggers: { mmdd: ["02-19"] },
        action: 'APPEND_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "Гал., 213 зач., 5:22-6:2", label: "Блгв." }],
                gospel: [{ reading: "Мф., 10 зач., 4:25-5:12", label: "Блгв." }]
            }
        }
    },

    // Feb 20 (Yaroslav the Wise)
    {
        id: "Feb 20 Yaroslav Blgv",
        triggers: { mmdd: ["02-20"] },
        action: 'APPEND_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "Гал., 213 зач., 5:22-6:2", label: "Блгв." }],
                gospel: [{ reading: "Мф., 10 зач., 4:25-5:12", label: "Блгв." }]
            }
        }
    },

    // Feb 22 (Forgiveness Sunday + Finding of Head of John Baptist)
    {
        id: "Feb 22 Forgiveness & Baptist",
        triggers: { mmdd: ["02-22"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Рим., 112 зач., 13:11-14:4", label: "Неділя сиропусна" },
                    { reading: "2 Кор., 176 зач., 4:6-15", label: "Предтечі" }
                ],
                gospel: [
                    { reading: "Мф., 17 зач., 6:14-21", label: "Неділя сиропусна" },
                    { reading: "Мф., 40 зач., 11:2-15", label: "Предтечі" }
                ]
            }
        }
    },
    { id: "Feb 22 Suppress Others", triggers: { mmdd: ["02-22"] }, action: "SUPPRESS_SAINTS" },

    // Feb 25 (Wed Week 1 of Lent) - Aliturgical
    {
        id: "Feb 25 Wed Week 1",
        triggers: { mmdd: ["02-25"] },
        action: 'SET_ALITURGICAL',
        data: {
            vespers: [
                { reading: "Бут. 1:24-2:3", label: "Веч." }
            ]
        }
    },
    {
        id: "Feb 25 Wed Week 1 Hours",
        triggers: { mmdd: ["02-25"] },
        action: 'ADD_HOURS',
        data: { hours: { "sexte": [{ reading: "Іс. 2:3-11", label: "6-й час (Паремія)" }] } }
    },

    // March 1 (Sunday of Orthodoxy)
    {
        id: "Mar 01 Orthodoxy",
        triggers: { mmdd: ["03-01"] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "Євр., 329 зач. (від половини), 11:24-26, 11:32-12:2", label: "Неділя" }],
                gospel: [{ reading: "Ін., 5 зач., 1:43-51", label: "Неділя" }]
            }
        }
    },

    // --- SOUL SATURDAYS (Specific Rules) ---

    // Feb 14 (Meatfare Saturday / -57)
    {
        id: "Soul Saturday Meatfare (-57)",
        triggers: { nday: [-57] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "1 Кор., 146 зач., 10:23-28", label: "Ряд." },
                    { reading: FUNERAL_AP, label: "Заупокій" }
                ],
                gospel: [
                    { reading: "Лк., 105 зач., 21:8-9, 25-27, 33-36", label: "Ряд." },
                    { reading: FUNERAL_EV, label: "Заупокій" }
                ]
            }
        }
    },

    // Mar 07 (Sat Week 2 Lent / -36)
    {
        id: "Soul Saturday Week 2 (-36)",
        triggers: { nday: [-36] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Євр., 309 зач., 3:12-16", label: "Ряд." },
                    { reading: FUNERAL_AP, label: "Заупокій" }
                ],
                gospel: [
                    { reading: "Мк., 6 зач., 1:35-44", label: "Ряд." },
                    { reading: FUNERAL_EV, label: "Заупокій" }
                ]
            }
        }
    },

    // Mar 14 (Sat Week 3 Lent / -29)
    {
        id: "Soul Saturday Week 3 (-29)",
        triggers: { nday: [-29] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Євр., 325 зач., 10:32-38", label: "Ряд." },
                    { reading: FUNERAL_AP, label: "Заупокій" }
                ],
                gospel: [
                    { reading: "Мк., 8 зач., 2:14-17", label: "Ряд." },
                    { reading: FUNERAL_EV, label: "Заупокій" }
                ]
            }
        }
    },

    // Suppress Saints for all Soul Saturdays
    {
        id: "Soul Saturdays Suppression",
        triggers: { nday: [-57, -36, -29] },
        action: 'SUPPRESS_SAINTS'
    },

    // Week 2 Sunday (March 8) - St. Gregory Palamas
    {
        id: "Week 2 Sunday Palamas",
        triggers: { nday: [-35] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Євр., 304 зач., 1:10-2:3", label: "Неділя" },
                    { reading: "Євр., 318 зач., 7:26-8:2", label: "Свт." },
                    { reading: "Гал., 213 зач., 5:22-6:2", label: "Прп. (Феофілакта)" }
                ],
                gospel: [
                    { reading: "Мк., 7 зач., 2:1-12", label: "Неділя" },
                    { reading: "Ін., 36 зач., 10:9-16", label: "Свт." },
                    { reading: "Лк., 24 зач., 6:17-23", label: "Прп. (Феофілакта)" }
                ]
            }
        }
    },
    {
        id: "Week 2 Sunday Suppression",
        triggers: { nday: [-35] },
        action: 'SUPPRESS_SAINTS'
    },

    // Week 4 Saturday (-22) - Specific Readings
    {
        id: "Week 4 Soul Saturday",
        triggers: { nday: [-22] },
        action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [
                    { reading: "Євр., 313 зач., 6:9-12", label: "Ряд." },
                    { reading: "1 Кор., 163 зач., 15:47-57", label: "Заупокій" }
                ],
                gospel: [
                    { reading: "Мк., 31 зач., 7:31-37", label: "Ряд." },
                    { reading: "Ін., 16 зач., 5:24-30", label: "Заупокій" }
                ]
            }
        }
    },
    {
        id: "Week 4 Soul Saturday Suppression",
        triggers: { nday: [-22] },
        action: 'SUPPRESS_SAINTS'
    },

    // --- DUPLICATE RULES REMOVED ---
    // Meatfare & Lenten Soul Saturdays handled above in consolidated block.


    // Cheesefare Week
    {
        id: "Cheesefare Wednesday Aliturgical",
        triggers: { nday: [-53] },
        action: 'SET_ALITURGICAL'
    },
    {
        id: "Cheesefare Wednesday Readings",
        triggers: { nday: [-53] },
        action: 'ADD_HOURS',
        data: {
            hours: {
                "sexte": [{ reading: "Іоїл. 2:12-26", label: "6-й час (Паремія)" }]
            }
        }
    },
    {
        id: "Cheesefare Wednesday Vespers",
        triggers: { nday: [-53] },
        action: 'ADD_VESPERS',
        data: {
            vespers: [{ reading: "Іоїл. 3:12-21", label: "Вечірня (Паремія)" }]
        }
    },
    {
        id: "Cheesefare Friday Aliturgical",
        triggers: { nday: [-51] },
        action: 'SET_ALITURGICAL'
    },
    {
        id: "Cheesefare Friday Readings",
        triggers: { nday: [-51] },
        action: 'ADD_HOURS',
        data: {
            hours: {
                "sexte": [{ reading: "Зах. 8:7-17", label: "6-й час (Паремія)" }]
            }
        }
    },
    {
        id: "Cheesefare Friday Vespers",
        triggers: { nday: [-51] },
        action: 'ADD_VESPERS',
        data: {
            vespers: [{ reading: "Зах. 8:19-23", label: "Вечірня (Паремія)" }]
        }
    },
    {
        id: "Cheesefare Saturday (Ascetic Fathers)",
        triggers: { nday: [-50] },
        action: 'APPEND_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "Гал., 213 зач., 5:22-6:2", label: "Прпп." }],
                gospel: [{ reading: "Мф., 43 зач., 11:27-30", label: "Прпп." }]
            }
        }
    },

    // --- GREAT LENT WEEK 1 (Clean Week) ---
    // Monday
    {
        id: "Week 1 Monday", triggers: { nday: [-48] }, action: 'ADD_HOURS',
        data: { hours: { "sexte": [{ reading: "Іс. 1:1-20", label: "6-й час (Паремія)" }] } }
    },
    {
        id: "Week 1 Monday Vespers", triggers: { nday: [-48] }, action: 'REPLACE_VESPERS',
        data: { vespers: [{ reading: "Бут. 1:1-13", label: "Веч." }, { reading: "Притч. 1:1-20", label: "Веч." }] }
    },
    // Tuesday
    {
        id: "Week 1 Tuesday Suppression", triggers: { nday: [-47] }, action: 'SUPPRESS_SAINTS'
    },
    {
        id: "Week 1 Tuesday", triggers: { nday: [-47] }, action: 'ADD_HOURS',
        data: { hours: { "sexte": [{ reading: "Іс. 1:19-2:3", label: "6-й час (Паремія)" }] } }
    },
    {
        id: "Week 1 Tuesday Vespers", triggers: { nday: [-47] }, action: 'REPLACE_VESPERS',
        data: { vespers: [{ reading: "Бут. 1:14-23", label: "Веч." }, { reading: "Притч. 1:20-33", label: "Веч." }] }
    },
    // Wednesday (Feb 25) - No Proverbs
    // Wednesday (Feb 25) - Aliturgical, Paremias
    {
        id: "Week 1 Wednesday Aliturgical", triggers: { nday: [-46] }, action: 'SET_ALITURGICAL', data: {}
    },
    {
        id: "Week 1 Wednesday Hours", triggers: { nday: [-46] }, action: 'ADD_HOURS',
        data: { hours: { "sexte": [{ reading: "Іс. 2:3-11", label: "6-й час (Паремія)" }] } }
    },
    {
        id: "Week 1 Wednesday Vespers", triggers: { nday: [-46] }, action: 'REPLACE_VESPERS',
        data: { vespers: [{ reading: "Бут. 1:24-2:3", label: "Вечірня (Паремія)" }, { reading: "Притч. 2:1-22", label: "Вечірня (Паремія)" }] }
    },
    // Thursday
    {
        id: "Week 1 Thursday", triggers: { nday: [-45] }, action: 'ADD_HOURS',
        data: { hours: { "sexte": [{ reading: "Іс. 2:11-21", label: "6-й час (Паремія)" }] } }
    },
    {
        id: "Week 1 Thursday Vespers", triggers: { nday: [-45] }, action: 'REPLACE_VESPERS',
        data: { vespers: [{ reading: "Бут. 2:4-19", label: "Веч." }, { reading: "Притч. 3:1-18", label: "Веч." }] }
    },
    // Friday
    {
        id: "Week 1 Friday", triggers: { nday: [-44] }, action: 'ADD_HOURS',
        data: { hours: { "sexte": [{ reading: "Іс. 3:1-14", label: "6-й час (Паремія)" }] } }
    },
    {
        id: "Week 1 Friday Vespers", triggers: { nday: [-44] }, action: 'REPLACE_VESPERS',
        data: { vespers: [{ reading: "Бут. 2:20-3:20", label: "Веч." }, { reading: "Притч. 3:19-34", label: "Веч." }] }
    },
    // Saturday (Theodore Tyro)
    {
        id: "Week 1 Saturday (Theodore Tyro)", triggers: { nday: [-43] }, action: 'REPLACE_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "Євр., 303 зач., 1:1-12", label: "Ряд." }, { reading: "2 Тим., 292 зач., 2:1-10", label: "Вмч." }],
                gospel: [{ reading: "Мк., 10 зач., 2:23-3:5", label: "Ряд." }, { reading: "Ін., 52 зач., 15:17-16:2", label: "Вмч." }]
            }
        }
    },

    // --- GREAT LENT WEEK 2 ---
    // Sunday of Orthodoxy (March 1)
    {
        id: "Sunday of Orthodoxy Moleben",
        triggers: { nday: [-42] },
        action: 'APPEND_LITURGY',
        data: {
            liturgy: {
                apostle: [{ reading: "Рим., 121 зач., 16:17-24", label: "На молебні" }],
                gospel: [{ reading: "Мф., 75 зач., 18:10-20", label: "На молебні" }]
            }
        }
    },

    // Week 2 Mon-Fri (Standard Readings)
    { id: "Week 2 Mon", triggers: { nday: [-41] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 4:2-5:7", label: "6-й час" }] } } },
    { id: "Week 2 Mon Vesp", triggers: { nday: [-41] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 3:21-4:7", label: "Веч." }, { reading: "Притч. 3:34-4:22", label: "Веч." }] } },
    { id: "Week 2 Tue", triggers: { nday: [-40] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 5:7-16", label: "6-й час" }] } } },
    { id: "Week 2 Tue Vesp", triggers: { nday: [-40] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 4:8-15", label: "Веч." }, { reading: "Притч. 5:1-15", label: "Веч." }] } },

    // Wednesday (March 4) - User Correction
    { id: "Week 2 Wed", triggers: { nday: [-39] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 2:3-11", label: "6-й час" }] } } },
    { id: "Week 2 Wed Vesp", triggers: { nday: [-39] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 1:14-23", label: "Веч." }, { reading: "Притч. 1:20-33", label: "Веч." }] } },

    { id: "Week 2 Thu", triggers: { nday: [-38] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 6:1-12", label: "6-й час" }] } } },
    { id: "Week 2 Thu Vesp", triggers: { nday: [-38] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 5:1-24", label: "Веч." }, { reading: "Притч. 6:3-20", label: "Веч." }] } },
    { id: "Week 2 Fri", triggers: { nday: [-37] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 7:1-14", label: "6-й час" }] } } },
    { id: "Week 2 Fri Vesp", triggers: { nday: [-37] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 5:32-6:8", label: "Веч." }, { reading: "Притч. 6:20-7:1", label: "Веч." }] } },

    // --- GREAT LENT WEEK 3 ---

    // Week 3 Monday (40 Martyrs of Sebaste) - Consolidated
    // Note: Vespers must be separate actions due to Engine logic.
    {
        id: "Week 3 Mon 40 Martyrs Liturgy", triggers: { nday: [-34] }, action: 'REPLACE_LITURGY',
        data: {
            matins: [{ reading: "Лк., 106 зач., 21:12-19", label: "Ран.", type: 'gospel' }],
            liturgy: { apostle: [{ reading: "Євр., 331 зач., 12:1-10", label: "Мчч." }], gospel: [{ reading: "Мф., 80 зач., 20:1-16", label: "Мчч." }] }
        }
    },
    { id: "Week 3 Mon Suppression", triggers: { nday: [-34], mmdd: ["03-09"] }, action: 'SUPPRESS_SAINTS' },
    { id: "Week 3 Mon Hours", triggers: { nday: [-34] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 8:13-9:7", label: "6-й час" }] } } },
    { id: "Week 3 Mon Vespers", triggers: { nday: [-34] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 6:9-22", label: "Веч." }, { reading: "Притч. 8:1-21", label: "Веч." }] } },
    // Note: Since I used APPEND_LITURGY, I need separate rule for Vespers REPLACE?
    // Using `vespers` in `data` will ADD to existing?
    // Week 3 Mon default vespers should be empty.
    // However, if I want to guarantee "Just Gen/Prov", I should check if LiturgicalEngine handles `data.vespers` correctly in `APPEND_LITURGY` action.
    // Yes, Step 394 code handles `rule.data.vespers` if action handles it.
    // Wait. `LiturgicalEngine.ts` Line 706 check:
    // `if (rule.data.vespers && (rule.action === 'ADD_VESPERS' || rule.action === 'REPLACE_VESPERS'))`
    // It DOES NOT check `APPEND_LITURGY`.
    // SO `vespers` defined in `APPEND_LITURGY` action WILL BE IGNORED by Engine!
    // I MUST use `ADD_VESPERS` (or REPLACE) action separately.
    // Or update Engine to allow Vespers via Append?
    // No, cleaner to map actions properly. I will use MULTIPLE rules for Mar 9.



    // Week 3 Tue-Fri (Standard)
    { id: "Week 3 Tue", triggers: { nday: [-33] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 9:9-10:4", label: "6-й час" }] } } },
    { id: "Week 3 Tue Vesp", triggers: { nday: [-33] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 7:1-5", label: "Веч." }, { reading: "Притч. 8:32-9:11", label: "Веч." }] } },

    { id: "Week 3 Wed", triggers: { nday: [-32] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 10:12-20", label: "6-й час" }] } } },
    { id: "Week 3 Wed Vesp", triggers: { nday: [-32] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 7:6-9", label: "Веч." }, { reading: "Притч. 9:12-18", label: "Веч." }] } },

    { id: "Week 3 Thu", triggers: { nday: [-31] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 11:10-12:2", label: "6-й час" }] } } },
    { id: "Week 3 Thu Vesp", triggers: { nday: [-31] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 7:11-8:3", label: "Веч." }, { reading: "Притч. 10:1-22", label: "Веч." }] } },

    { id: "Week 3 Fri", triggers: { nday: [-30] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 13:2-13", label: "6-й час" }] } } },
    { id: "Week 3 Fri Vesp", triggers: { nday: [-30] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 8:4-21", label: "Веч." }, { reading: "Притч. 10:31-11:12", label: "Веч." }] } },



    // --- GREAT LENT WEEK 4 (March 16-21) ---
    { id: "Week 4 Mon", triggers: { nday: [-27] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 14:24-32", label: "6-й час" }] } } },
    { id: "Week 4 Mon Vesp", triggers: { nday: [-27] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 8:21-9:7", label: "Веч." }, { reading: "Притч. 11:19-12:6", label: "Веч." }] } },

    { id: "Week 4 Tue", triggers: { nday: [-26] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 25:1-9", label: "6-й час" }] } } },
    { id: "Week 4 Tue Vesp", triggers: { nday: [-26] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 9:8-17", label: "Веч." }, { reading: "Притч. 12:8-22", label: "Веч." }] } },

    { id: "Week 4 Wed", triggers: { nday: [-25] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 26:21-27:9", label: "6-й час" }] } } },
    { id: "Week 4 Wed Vesp", triggers: { nday: [-25] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 9:18-10:1", label: "Веч." }, { reading: "Притч. 12:23-13:9", label: "Веч." }] } },

    { id: "Week 4 Thu", triggers: { nday: [-24] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 28:14-22", label: "6-й час" }] } } },
    { id: "Week 4 Thu Vesp", triggers: { nday: [-24] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 10:32-11:9", label: "Веч." }, { reading: "Притч. 13:20-14:6", label: "Веч." }] } },

    { id: "Week 4 Fri", triggers: { nday: [-23] }, action: 'ADD_HOURS', data: { hours: { "sexte": [{ reading: "Іс. 29:13-23", label: "6-й час" }] } } },
    { id: "Week 4 Fri Vesp", triggers: { nday: [-23] }, action: 'REPLACE_VESPERS', data: { vespers: [{ reading: "Бут. 12:1-7", label: "Веч." }, { reading: "Притч. 14:15-26", label: "Веч." }] } },
];
