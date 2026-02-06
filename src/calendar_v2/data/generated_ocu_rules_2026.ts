=== OCU RULES GENERATOR ===

Pascha 2026: Sun Apr 12 2026

Processing 364 entries for 2026...
Generated 288 rules
import { TypikonRule } from './TypikonRules';

/**
 * Auto-generated OCU Rules from readings_2026.json
 * Generated on: 2026-02-06T12:19:16.939Z
 * Pascha 2026: Sun Apr 12 2026
 * 
 * This file contains liturgical rules extracted from the 2026 OCU Calendar (pages 5-82).
 * 
 * Transformation logic:
 * - Movable feasts (Triodion/Pentecostarion) use nday triggers
 * - Fixed feasts use mmdd triggers
 * - Days with only ordinary readings apply SUPPRESS_SAINTS
 */

export const GENERATED_OCU_RULES_2026: TypikonRule[] = [
    {
        "id": "2026-01-01 Ряд.",
        "triggers": {
            "mmdd": [
                "01-01"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Як._2:1-13",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Свт.: Євр. 318 зач.; 7:26 – 8:2",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._10:23b-32a",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Свт.: Ін. 8 зач.; 3:1-15",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-02 Субота перед Богоявл.",
        "triggers": {
            "mmdd": [
                "01-02"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Тим. 284 зач.; 3:14 – 4:5",
                        "label": "Субота перед Богоявл."
                    },
                    {
                        "reading": "Мч.: 2 Тим. 292 зач.; 2:1-10",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф. 5 зач.; 3:1-11",
                        "label": "Субота перед Богоявл."
                    },
                    {
                        "reading": "Мч.: Мф. 36 зач.; 10:16-22",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-03 Нед. перед Богоявл.",
        "triggers": {
            "mmdd": [
                "01-03"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Тим. 298 зач.; 4:5-8",
                        "label": "Нед. перед Богоявл."
                    },
                    {
                        "reading": "Рим. 96 зач.; 8:3-9",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк. 1 зач.; 1:1-8",
                        "label": "Нед. перед Богоявл."
                    },
                    {
                        "reading": "Лк. 50 зач.; 10:1-15",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-04 Св.",
        "triggers": {
            "mmdd": [
                "01-04"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор. 143 зач.; 9:19-27",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк. 7 зач.; 3:1-18",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-05 Св.",
        "triggers": {
            "mmdd": [
                "01-05"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Тит. 302 зач.; 2:11-14; 3:4-7",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф. 6 зач.; 3:13-17",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-06 Св.",
        "triggers": {
            "mmdd": [
                "01-06"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян. 42 зач.; 19:1-8",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін. 3 зач.; 1:29-34",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-07 Св.",
        "triggers": {
            "mmdd": [
                "01-07"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал. 213 зач.; 5:22 – 6:2",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф. 10 зач.; 4:25 – 5:12",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-08 Ряд.",
        "triggers": {
            "mmdd": [
                "01-08"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Пет._1:1-2, 10-12, 2:6-10",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._12:1-12",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-09 Св.",
        "triggers": {
            "mmdd": [
                "01-09"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор. 151 зач.; 12:7-11",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф. 34 зач.; 9:35 – 10:1, 7-8",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-10 Св.",
        "triggers": {
            "mmdd": [
                "01-10"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор. 176 зач.; 4:6-15",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф. 43 зач.; 11:27-30",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-11 Св.",
        "triggers": {
            "mmdd": [
                "01-11"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим. 96 зач.; 8:28-39",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк. 50 зач.; 10:1-15",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-12 Св.",
        "triggers": {
            "mmdd": [
                "01-12"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим. 99 зач.; 8:28-39",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк. 24 зач.; 6:17-23",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-13 Віддання",
        "triggers": {
            "mmdd": [
                "01-13"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Тит. 302 зач.; 2:11-14; 3:4-7",
                        "label": "Віддання"
                    },
                    {
                        "reading": "1 Кор. 131 зач.; 4:9-16",
                        "label": "Рівноап."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф. 6 зач.; 3:13-17",
                        "label": "Віддання"
                    },
                    {
                        "reading": "Мф. 104 зач.; 25:1-13",
                        "label": "Рівноап."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-15 Тріод.",
        "triggers": {
            "mmdd": [
                "01-15"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Пет._1:1-10a",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Діян. 29 зач.; 12:1-11",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._13:1-8",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Ін. 67 зач.; 21:15-25",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-16 Тріод.",
        "triggers": {
            "mmdd": [
                "01-16"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Тим._2:11-19",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Євр. 335 зач.; 13:17-21",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._18:2-8a",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Лк. 24 зач.; 6:17-23",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-18 Тріод.",
        "triggers": {
            "mmdd": [
                "01-18"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Пет._1:20-2:9",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Гал. 213 зач.; 5:22 – 6:2",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._13:9-13",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Мф. 43 зач.; 11:27-30",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-19 Тріод.",
        "triggers": {
            "mmdd": [
                "01-19"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Пет._2:9-22",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Євр. 335 зач.; 13:17-21",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._13:14-23",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Лк. 24 зач.; 6:17-23",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-24 Ряд.",
        "triggers": {
            "mmdd": [
                "01-24"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Тим._4:9-15",
                        "label": "Ряд."
                    },
                    {
                        "reading": "1 Кор. 151 зач.; 12:7-11",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._19:1-10",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Ін. 36 зач.; 10:9-16",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-26 Тріод.",
        "triggers": {
            "mmdd": [
                "01-26"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Пет._3:10-22",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Євр. 318 зач.; 7:26 – 8:2",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._12:18-27",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Ін. 36 зач.; 10:9-16",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-29 Св.",
        "triggers": {
            "mmdd": [
                "01-29"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр. 334 зач.; 13:7-16",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф. 11 зач.; 5:14-19",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-01-31 Тріод.",
        "triggers": {
            "mmdd": [
                "01-31"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Тим._3:10-15",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Мч.: Рим. 96 зач.; 8:28-39",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._18:10-14",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Мч.: Лк. 52 зач.; 10:19-21",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-02-01 Св.",
        "triggers": {
            "mmdd": [
                "02-01"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр. 316 зач.; 7:7-17",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк. 7 зач.; 2:22-40",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-02-02 Тріод.",
        "triggers": {
            "mmdd": [
                "02-02"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Пет._2:9-22",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Євр. 320 зач.; 9:1-7",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._13:14-23",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Лк. 8 зач.; 2:25-32",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-02-09 Тріод.",
        "triggers": {
            "mmdd": [
                "02-09"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Ін._3:10b-20",
                        "label": "Тріод."
                    },
                    {
                        "reading": "2 Тим. 292 зач.; 2:1-10",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._14:10-42",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Ін. 52 зач.; 15:17 – 16:2",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-02-10 Тріод.",
        "triggers": {
            "mmdd": [
                "02-10"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Ін._3:21-4:6",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Євр. 335 зач.; 13:17-21",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._14:43-15:1",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Ін. 36 зач.; 10:9-16",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-02-11 Тріод.",
        "triggers": {
            "mmdd": [
                "02-11"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Ін._4:20-5:21",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Євр. 318 зач.; 7:26 – 8:2",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._15:1-15",
                        "label": "Тріод."
                    },
                    {
                        "reading": "Ін. 36 зач.; 10:9-16",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-02-22 Св.",
        "triggers": {
            "mmdd": [
                "02-22"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр. 335 зач.; 13:17-21",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін. 35 зач. (від пол.); 10:1-9",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-02-23 Св.",
        "triggers": {
            "mmdd": [
                "02-23"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор. 176 зач.; 4:6-15",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф. 40 зач.; 11:2-15",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-03-08 Св.",
        "triggers": {
            "mmdd": [
                "03-08"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр. 322 зач.; 12:1-10",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф. 80 зач.; 20:1-16",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-03-16 Св.",
        "triggers": {
            "mmdd": [
                "03-16"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр. 335 зач.; 13:17-21",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк. 24 зач.; 6:17-23",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-03-24 Св.",
        "triggers": {
            "mmdd": [
                "03-24"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр. 306 зач.; 2:11-18",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк. 3 зач.; 1:26-38",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-03-25 Св.",
        "triggers": {
            "mmdd": [
                "03-25"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр. 305 зач.; 2:2-10",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк. 51 зач.; 10:16-21",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-03-31 Св.",
        "triggers": {
            "mmdd": [
                "03-31"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал. 208 зач.; 3:23-29",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк. 33 зач.; 7:36-50",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-11 Ряд.",
        "triggers": {
            "mmdd": [
                "04-11"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._1:1-8",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._1:1-17",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-18 Ряд.",
        "triggers": {
            "mmdd": [
                "04-18"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._5:12-20",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._20:19-31",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-19 Ряд.",
        "triggers": {
            "mmdd": [
                "04-19"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._1:12-17, 21-26",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._1:18-28",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-20 Ряд.",
        "triggers": {
            "mmdd": [
                "04-20"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._2:14-21",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._24:12-35",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-21 Ряд.",
        "triggers": {
            "mmdd": [
                "04-21"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._2:22-36",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._1:35-51",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-22 Ряд.",
        "triggers": {
            "mmdd": [
                "04-22"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._2:38-43",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Діян. 29 зач.; 12:1-11",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._3:1-15",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Ін. 52 зач.; 15:17 – 16:2",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-23 Ряд.",
        "triggers": {
            "mmdd": [
                "04-23"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._3:1-8",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._2:12-22",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-24 Ряд.",
        "triggers": {
            "mmdd": [
                "04-24"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._3:11-16",
                        "label": "Ряд."
                    },
                    {
                        "reading": "1 Пет. 63 зач.; 5:6-14",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._3:22-33",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Мк. 23 зач.; 6:7-13",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-25 Ряд.",
        "triggers": {
            "mmdd": [
                "04-25"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._6:1-7",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._15:43-16:8",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-26 Ряд.",
        "triggers": {
            "mmdd": [
                "04-26"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._3:19-26",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._2:1-11",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-27 Ряд.",
        "triggers": {
            "mmdd": [
                "04-27"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._4:1-10",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._3:16-21",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-28 Ряд.",
        "triggers": {
            "mmdd": [
                "04-28"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._4:13-22",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._5:17b-24",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-29 Ряд.",
        "triggers": {
            "mmdd": [
                "04-29"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._4:23-31",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Діян. 29 зач.; 12:1-11",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._5:24-30",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Лк. 40 зач.; 9:1-6",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-04-30 Ряд.",
        "triggers": {
            "mmdd": [
                "04-30"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._5:1-11",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._5:30b-6:2",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-01 Ряд.",
        "triggers": {
            "mmdd": [
                "05-01"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._5:21-33",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._6:14-27",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-02 Ряд.",
        "triggers": {
            "mmdd": [
                "05-02"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._9:32-42",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._5:1-15",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-03 Ряд.",
        "triggers": {
            "mmdd": [
                "05-03"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._6:8-7:5a, 7:47-60",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._4:46b-54",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-04 Ряд.",
        "triggers": {
            "mmdd": [
                "05-04"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._8:5-17",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._6:27-33",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-05 Ряд.",
        "triggers": {
            "mmdd": [
                "05-05"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._8:18-25",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._6:35-39",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-06 Ряд.",
        "triggers": {
            "mmdd": [
                "05-06"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._8:26-39",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._6:40-44",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-07 Ряд.",
        "triggers": {
            "mmdd": [
                "05-07"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._8:40-9:19a",
                        "label": "Ряд."
                    },
                    {
                        "reading": "1 Ін. 73 зач.; 4:12-19",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._6:48-54",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Ін. 61 зач.; 19:25-27; 21:24-25",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-08 Ряд.",
        "triggers": {
            "mmdd": [
                "05-08"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._9:19b-31",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Євр. 335 зач.; 13:17-21",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._15:17-16:2",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Лк. 24 зач.; 6:17-23",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-09 Ряд.",
        "triggers": {
            "mmdd": [
                "05-09"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._11:19-26, 29-30",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._4:5-42",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-10 Ряд.",
        "triggers": {
            "mmdd": [
                "05-10"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._10:1-16",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Євр. 318 зач.; 7:26 – 8:2",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._6:56-69",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Мф. 11 зач.; 5:14-19",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-11 Ряд.",
        "triggers": {
            "mmdd": [
                "05-11"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._10:21-33",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._7:1-13",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-12 Ряд.",
        "triggers": {
            "mmdd": [
                "05-12"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._14:6b-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._7:14-30",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-13 Ряд.",
        "triggers": {
            "mmdd": [
                "05-13"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._10:34-43",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._8:12-20",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-14 Ряд.",
        "triggers": {
            "mmdd": [
                "05-14"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._10:44-11:10",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._8:21-30",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-15 Ряд.",
        "triggers": {
            "mmdd": [
                "05-15"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._12:1-11",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._8:31-42a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-16 Ряд.",
        "triggers": {
            "mmdd": [
                "05-16"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._16:16-34",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._9:1-38",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-17 Ряд.",
        "triggers": {
            "mmdd": [
                "05-17"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._12:12-17",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._8:42-51",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-18 Ряд.",
        "triggers": {
            "mmdd": [
                "05-18"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._12:25-13:12",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._8:51-59",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-19 Ряд.",
        "triggers": {
            "mmdd": [
                "05-19"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._13:13-24",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._6:5-14",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-20 Ряд.",
        "triggers": {
            "mmdd": [
                "05-20"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._14:20b-27",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Діян. 49 зач.; 26:1-5, 12-20",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._9:39-10:9",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Ін. 35 зач. (від пол.); 10:1-9",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-21 Ряд.",
        "triggers": {
            "mmdd": [
                "05-21"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._15:5-34",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._10:17-28a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-22 Ряд.",
        "triggers": {
            "mmdd": [
                "05-22"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._15:35-41",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._10:27-38",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-23 Ряд.",
        "triggers": {
            "mmdd": [
                "05-23"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._20:16-18a, 20:28-36",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Гал. 213 зач.; 5:22 – 6:2",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._17:1-13",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Мф. 43 зач.; 11:27-30",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-24 Ряд.",
        "triggers": {
            "mmdd": [
                "05-24"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._17:1-15",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._11:47-57",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-25 Ряд.",
        "triggers": {
            "mmdd": [
                "05-25"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._17:19-28a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._12:19-36a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-26 Ряд.",
        "triggers": {
            "mmdd": [
                "05-26"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._18:22-28",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._12:36-47",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-27 Ряд.",
        "triggers": {
            "mmdd": [
                "05-27"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._1:1-12",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._24:36-53",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-28 Ряд.",
        "triggers": {
            "mmdd": [
                "05-28"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._19:1-8",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._14:1-11a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-29 Ряд.",
        "triggers": {
            "mmdd": [
                "05-29"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._20:7-12",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._14:10b-21",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-30 Ряд.",
        "triggers": {
            "mmdd": [
                "05-30"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._2:1-11",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._7:37-52, 8:12",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-05-31 Ряд.",
        "triggers": {
            "mmdd": [
                "05-31"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._21:8-14",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._14:27b-15:7",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-01 Ряд.",
        "triggers": {
            "mmdd": [
                "06-01"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._21:26-32",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._16:2b-13a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-02 Ряд.",
        "triggers": {
            "mmdd": [
                "06-02"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._23:1-11",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._16:15-23",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-03 Ряд.",
        "triggers": {
            "mmdd": [
                "06-03"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._25:13-19",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._16:23b-33a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-04 Ряд.",
        "triggers": {
            "mmdd": [
                "06-04"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._27:1-44",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._17:18-26",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-05 Ряд.",
        "triggers": {
            "mmdd": [
                "06-05"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян._28:1-31",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін._21:15-25",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-06 Ряд.",
        "triggers": {
            "mmdd": [
                "06-06"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр._11:33-12:2a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._10:32-33, 37-38, 19:27-30",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-07 Ряд.",
        "triggers": {
            "mmdd": [
                "06-07"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._5:8b-19",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._18:10-20",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-08 Ряд.",
        "triggers": {
            "mmdd": [
                "06-08"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._1:1-7, 13-17",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._4:25-5:13",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-09 Ряд.",
        "triggers": {
            "mmdd": [
                "06-09"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._1:18-27",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._5:20-26",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-10 Ряд.",
        "triggers": {
            "mmdd": [
                "06-10"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._1:28-2:9",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._5:27-32",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-11 Ряд.",
        "triggers": {
            "mmdd": [
                "06-11"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._2:14-29",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._5:33-41",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-12 Ряд.",
        "triggers": {
            "mmdd": [
                "06-12"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._1:7b-12",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._5:42-48",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-13 Ряд.",
        "triggers": {
            "mmdd": [
                "06-13"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._2:10-16",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._4:18-23",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-14 Ряд.",
        "triggers": {
            "mmdd": [
                "06-14"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._2:28-3:18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._6:31-34, 7:9-11",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-15 Ряд.",
        "triggers": {
            "mmdd": [
                "06-15"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._4:4-12",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._7:15-21",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-16 Ряд.",
        "triggers": {
            "mmdd": [
                "06-16"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._4:13-25",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._7:21-23",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-17 Ряд.",
        "triggers": {
            "mmdd": [
                "06-17"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._5:10-16",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._8:23-27",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-18 Ряд.",
        "triggers": {
            "mmdd": [
                "06-18"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._5:17-6:2",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._9:14-17",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-19 Ряд.",
        "triggers": {
            "mmdd": [
                "06-19"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._3:19-26",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._7:1-8",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-20 Ряд.",
        "triggers": {
            "mmdd": [
                "06-20"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._5:1-10",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._6:22-33",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-21 Ряд.",
        "triggers": {
            "mmdd": [
                "06-21"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._9:18-33",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._11:2-15",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-22 Ряд.",
        "triggers": {
            "mmdd": [
                "06-22"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._7:14-8:2",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._10:9-15",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-23 Св.",
        "triggers": {
            "mmdd": [
                "06-23"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим. 112 зач.; 13:11 – 14:4",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк. 1 зач.; 1:5-25, 57-68, 76, 80",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-24 Ряд.",
        "triggers": {
            "mmdd": [
                "06-24"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._8:22-27",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._10:23-31",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-25 Ряд.",
        "triggers": {
            "mmdd": [
                "06-25"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._9:6-19",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._10:32-36, 11:1",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-26 Ряд.",
        "triggers": {
            "mmdd": [
                "06-26"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._3:28-4:3",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._7:24-8:4",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-27 Ряд.",
        "triggers": {
            "mmdd": [
                "06-27"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._6:18-23",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._8:5-13",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-28 Ряд.",
        "triggers": {
            "mmdd": [
                "06-28"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._12:4-5, 15-21",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._12:9-13",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-29 Ряд.",
        "triggers": {
            "mmdd": [
                "06-29"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._14:9-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._12:14-16,22-30",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-06-30 Ряд.",
        "triggers": {
            "mmdd": [
                "06-30"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._15:7-16",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._12:38-45",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-01 Ряд.",
        "triggers": {
            "mmdd": [
                "07-01"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._11:13-24",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._11:27-30",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-02 Ряд.",
        "triggers": {
            "mmdd": [
                "07-02"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._11:25-36",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._12:1-8",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-03 Ряд.",
        "triggers": {
            "mmdd": [
                "07-03"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._6:11-17",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._8:14-23",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-04 Ряд.",
        "triggers": {
            "mmdd": [
                "07-04"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._10:1-10",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._8:28-9:1",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-08 Ряд.",
        "triggers": {
            "mmdd": [
                "07-08"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._15:17-29",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._12:46-13:3a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-09 Ряд.",
        "triggers": {
            "mmdd": [
                "07-09"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._16:1-16",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._13:3b-9",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-10 Ряд.",
        "triggers": {
            "mmdd": [
                "07-10"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._8:14-21",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._9:9-13",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-11 Ряд.",
        "triggers": {
            "mmdd": [
                "07-11"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._12:6-14",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._9:1-8",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-12 Ряд.",
        "triggers": {
            "mmdd": [
                "07-12"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._16:17-24",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._13:10-23",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-13 Ряд.",
        "triggers": {
            "mmdd": [
                "07-13"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._1:1-9",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._13:24-30",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-14 Ряд.",
        "triggers": {
            "mmdd": [
                "07-14"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._2:9b-3:8",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._13:31-36a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-15 Ряд.",
        "triggers": {
            "mmdd": [
                "07-15"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._3:18-23",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._13:36b-43",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-16 Ряд.",
        "triggers": {
            "mmdd": [
                "07-16"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._4:5-8",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._13:44-54a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-17 Ряд.",
        "triggers": {
            "mmdd": [
                "07-17"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._9:1-5",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._9:18-26",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-18 Ряд.",
        "triggers": {
            "mmdd": [
                "07-18"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._15:1-7",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._9:27-35",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-19 Ряд.",
        "triggers": {
            "mmdd": [
                "07-19"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._5:9-6:11",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._13:54-58",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-20 Ряд.",
        "triggers": {
            "mmdd": [
                "07-20"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._6:20b-7:12",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._14:1-13",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-21 Ряд.",
        "triggers": {
            "mmdd": [
                "07-21"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._7:12b-24",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._14:35-15:11",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-22 Ряд.",
        "triggers": {
            "mmdd": [
                "07-22"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._7:24-35",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._15:12-21",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-23 Ряд.",
        "triggers": {
            "mmdd": [
                "07-23"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._7:35-8:7",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._15:29-31",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-24 Ряд.",
        "triggers": {
            "mmdd": [
                "07-24"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._12:1-3",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._10:37-11:1",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-25 Ряд.",
        "triggers": {
            "mmdd": [
                "07-25"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._1:10-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._14:14-22",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-26 Ряд.",
        "triggers": {
            "mmdd": [
                "07-26"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._9:13-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._16:1-6",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-27 Ряд.",
        "triggers": {
            "mmdd": [
                "07-27"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._10:5-12",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._16:6-12",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-28 Ряд.",
        "triggers": {
            "mmdd": [
                "07-28"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._10:12-22",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._16:20-24",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-29 Ряд.",
        "triggers": {
            "mmdd": [
                "07-29"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._10:28-11:7",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._16:24-28",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-30 Ряд.",
        "triggers": {
            "mmdd": [
                "07-30"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._11:8-22",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._17:10-18",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-07-31 Ряд.",
        "triggers": {
            "mmdd": [
                "07-31"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._13:1-10",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._12:30-37",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-01 Ряд.",
        "triggers": {
            "mmdd": [
                "08-01"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._3:9-17",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._14:22-34",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-02 Ряд.",
        "triggers": {
            "mmdd": [
                "08-02"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._11:31-12:6",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._18:1-11",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-03 Ряд.",
        "triggers": {
            "mmdd": [
                "08-03"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._12:12-26",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._18:18-22, 19:1-2, 13-15",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-04 Ряд.",
        "triggers": {
            "mmdd": [
                "08-04"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._13:4-14:5",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._20:1-16",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-05 Св.",
        "triggers": {
            "mmdd": [
                "08-05"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Пет. 65 зач.; 1:10-19",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф. 70 зач.; 17:1-9",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-06 Ряд.",
        "triggers": {
            "mmdd": [
                "08-06"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._14:26-40",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._21:12-14, 17-20",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-07 Ряд.",
        "triggers": {
            "mmdd": [
                "08-07"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Рим._14:6-9",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._15:32-39",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-08 Ряд.",
        "triggers": {
            "mmdd": [
                "08-08"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._4:9-16",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._17:14-23a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-09 Ряд.",
        "triggers": {
            "mmdd": [
                "08-09"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._15:12-19",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._21:18-22",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-10 Ряд.",
        "triggers": {
            "mmdd": [
                "08-10"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._15:29-38",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._21:23-27",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-11 Ряд.",
        "triggers": {
            "mmdd": [
                "08-11"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._16:4-12",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._21:28-32",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-12 Ряд.",
        "triggers": {
            "mmdd": [
                "08-12"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._1:1-7",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._21:43-46",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-13 Ряд.",
        "triggers": {
            "mmdd": [
                "08-13"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._1:12-20",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._22:23-33",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-14 Св.",
        "triggers": {
            "mmdd": [
                "08-14"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп. 240 зач.; 2:5-11",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк. 54 зач.; 10:38-42; 11:27-28",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-15 Ряд.",
        "triggers": {
            "mmdd": [
                "08-15"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._9:2b-12",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._18:23-35",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-16 Ряд.",
        "triggers": {
            "mmdd": [
                "08-16"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._2:3b-15a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._23:13-22",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-17 Ряд.",
        "triggers": {
            "mmdd": [
                "08-17"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._2:14-3:3",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._23:23-28",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-18 Ряд.",
        "triggers": {
            "mmdd": [
                "08-18"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._3:4-11",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._23:29-39",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-19 Ряд.",
        "triggers": {
            "mmdd": [
                "08-19"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._4:1-6",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._24:13-28",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-20 Ряд.",
        "triggers": {
            "mmdd": [
                "08-20"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._4:13-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._24:27-33, 42-51",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-21 Ряд.",
        "triggers": {
            "mmdd": [
                "08-21"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._1:3-9",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._19:3-12",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-22 Ряд.",
        "triggers": {
            "mmdd": [
                "08-22"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._15:1-11",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._19:16-26",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-23 Ряд.",
        "triggers": {
            "mmdd": [
                "08-23"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._5:10-15",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._1:9-15",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-24 Ряд.",
        "triggers": {
            "mmdd": [
                "08-24"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._5:15-21",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._1:16-22",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-25 Ряд.",
        "triggers": {
            "mmdd": [
                "08-25"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._6:11-16a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._1:23-28",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-26 Ряд.",
        "triggers": {
            "mmdd": [
                "08-26"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._7:1b-10a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._1:29-35",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-27 Ряд.",
        "triggers": {
            "mmdd": [
                "08-27"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._7:10-16",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._2:18-22",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-28 Св.",
        "triggers": {
            "mmdd": [
                "08-28"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Діян. 33 зач.; 13:25-33",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк. 24 зач.; 6:14-30",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-29 Ряд.",
        "triggers": {
            "mmdd": [
                "08-29"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._16:13-24",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._21:33-42",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-30 Ряд.",
        "triggers": {
            "mmdd": [
                "08-30"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._8:7-15",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._3:6-12",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-08-31 Ряд.",
        "triggers": {
            "mmdd": [
                "08-31"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._8:16-9:5",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._3:13-19a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-01 Ряд.",
        "triggers": {
            "mmdd": [
                "09-01"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._9:12-10:7",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._3:19b-27",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-02 Ряд.",
        "triggers": {
            "mmdd": [
                "09-02"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._10:7b-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._3:28-35",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-03 Ряд.",
        "triggers": {
            "mmdd": [
                "09-03"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._11:5-21a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._4:1-9",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-04 Ряд.",
        "triggers": {
            "mmdd": [
                "09-04"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._2:6-9",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._22:15-22",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-05 Ряд.",
        "triggers": {
            "mmdd": [
                "09-05"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._1:21-2:4",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._22:2-14",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-06 Ряд.",
        "triggers": {
            "mmdd": [
                "09-06"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._12:10-19",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._4:10-23",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-07 Св.",
        "triggers": {
            "mmdd": [
                "09-07"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп. 240 зач.; 2:5-11",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк. 54 зач.; 10:38-42; 11:27-28",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-08 Ряд.",
        "triggers": {
            "mmdd": [
                "09-08"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._13:3-14",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._4:35-41",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-09 Ряд.",
        "triggers": {
            "mmdd": [
                "09-09"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал._1:1-10, 20-2:5",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._5:1-20",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-10 Ряд.",
        "triggers": {
            "mmdd": [
                "09-10"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал._2:6-10",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._5:22-24, 35-6:1",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-11 Ряд.",
        "triggers": {
            "mmdd": [
                "09-11"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._4:1-5",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._23:1-12",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-12 Ряд.",
        "triggers": {
            "mmdd": [
                "09-12"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._4:6-15",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._22:35-46",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-13 Св.",
        "triggers": {
            "mmdd": [
                "09-13"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор. 125 зач.; 1:18-24",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Ін. 60 зач.; 19:6-11, 13-20, 25-28, 30-35",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-14 Ряд.",
        "triggers": {
            "mmdd": [
                "09-14"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал._2:21-3:7",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._6:1-7",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-15 Ряд.",
        "triggers": {
            "mmdd": [
                "09-15"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал._3:15-22",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._6:7-13",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-16 Ряд.",
        "triggers": {
            "mmdd": [
                "09-16"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал._3:23-4:5",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._6:30-45",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-17 Ряд.",
        "triggers": {
            "mmdd": [
                "09-17"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал._4:8-21",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._6:45-53",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-18 Ряд.",
        "triggers": {
            "mmdd": [
                "09-18"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._4:17-5:5",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._24:1-13",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-19 Ряд.",
        "triggers": {
            "mmdd": [
                "09-19"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._6:1-10",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._25:14-30",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-20 Ряд.",
        "triggers": {
            "mmdd": [
                "09-20"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._1:22-2:3",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._10:46-52",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-21 Ряд.",
        "triggers": {
            "mmdd": [
                "09-21"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._2:19-3:7",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._11:11-23",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-22 Ряд.",
        "triggers": {
            "mmdd": [
                "09-22"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._3:8-21",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._11:22b-26",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-23 Ряд.",
        "triggers": {
            "mmdd": [
                "09-23"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._4:14-19",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._11:27-33",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-24 Ряд.",
        "triggers": {
            "mmdd": [
                "09-24"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._4:17-25a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._12:1-12",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-25 Ряд.",
        "triggers": {
            "mmdd": [
                "09-25"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._14:20-25",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._25:1-13",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-26 Ряд.",
        "triggers": {
            "mmdd": [
                "09-26"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._6:16-7:1",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф._15:21-28",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-27 Ряд.",
        "triggers": {
            "mmdd": [
                "09-27"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._4:25-32",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._3:19-22",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-28 Ряд.",
        "triggers": {
            "mmdd": [
                "09-28"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._5:20-26",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._3:23-4:1",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-29 Ряд.",
        "triggers": {
            "mmdd": [
                "09-29"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._5:25-33a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._4:1-15",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-09-30 Ряд.",
        "triggers": {
            "mmdd": [
                "09-30"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._5:33-6:9",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Євр. 320 зач.; 9:1-7",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._4:16-22a",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Лк. 54 зач.; 10:38-42; 11:27-28",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-01 Ряд.",
        "triggers": {
            "mmdd": [
                "10-01"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._6:18-24",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._4:22b-30",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-02 Ряд.",
        "triggers": {
            "mmdd": [
                "10-02"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._15:39-45",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._4:31-36",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-03 Ряд.",
        "triggers": {
            "mmdd": [
                "10-03"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._9:6-11",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._5:1b-11",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-04 Ряд.",
        "triggers": {
            "mmdd": [
                "10-04"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп._1:1-7",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._4:37-44",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-05 Ряд.",
        "triggers": {
            "mmdd": [
                "10-05"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп._1:8-14",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._5:12-16",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-06 Ряд.",
        "triggers": {
            "mmdd": [
                "10-06"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп._1:12-20a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._5:33-39",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-07 Ряд.",
        "triggers": {
            "mmdd": [
                "10-07"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп._1:20b-27a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._6:12-19",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-08 Ряд.",
        "triggers": {
            "mmdd": [
                "10-08"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп._1:27-2:4",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._6:17-23a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-09 Ряд.",
        "triggers": {
            "mmdd": [
                "10-09"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Кор._15:58-16:3",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._5:17-26",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-10 Ряд.",
        "triggers": {
            "mmdd": [
                "10-10"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._11:31-12:9",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._6:31-36",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-11 Ряд.",
        "triggers": {
            "mmdd": [
                "10-11"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп._2:12-16a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._6:24-30",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-12 Ряд.",
        "triggers": {
            "mmdd": [
                "10-12"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп._2:16b-23",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._6:37-45",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-13 Ряд.",
        "triggers": {
            "mmdd": [
                "10-13"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп._2:24-30",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._6:46-7:1",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-14 Ряд.",
        "triggers": {
            "mmdd": [
                "10-14"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп._3:1-8",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._7:17-30",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-15 Ряд.",
        "triggers": {
            "mmdd": [
                "10-15"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп._3:8b-19",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._7:31-35",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-16 Ряд.",
        "triggers": {
            "mmdd": [
                "10-16"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._1:8-11",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._5:27-32",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-17 Ряд.",
        "triggers": {
            "mmdd": [
                "10-17"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал._1:11-19",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._7:11-16",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-18 Ряд.",
        "triggers": {
            "mmdd": [
                "10-18"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Флп._4:10-23",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._7:36-50",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-19 Ряд.",
        "triggers": {
            "mmdd": [
                "10-19"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Кол._1:1-2a, 7-11",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._8:1-3",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-20 Ряд.",
        "triggers": {
            "mmdd": [
                "10-20"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Кол._1:18-23",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._8:22-25",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-21 Ряд.",
        "triggers": {
            "mmdd": [
                "10-21"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Кол._1:24-29",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._9:7-11",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-22 Ряд.",
        "triggers": {
            "mmdd": [
                "10-22"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Кол._2:1-7",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._9:12b-18a",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-23 Ряд.",
        "triggers": {
            "mmdd": [
                "10-23"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._3:12-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._6:1-10",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-24 Ряд.",
        "triggers": {
            "mmdd": [
                "10-24"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал._2:16-20",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._8:5-15",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-25 Ряд.",
        "triggers": {
            "mmdd": [
                "10-25"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Кол._2:13-20",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._9:18-22",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-26 Ряд.",
        "triggers": {
            "mmdd": [
                "10-26"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Кол._2:20-3:3",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._9:23-27",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-27 Ряд.",
        "triggers": {
            "mmdd": [
                "10-27"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Кол._3:17-4:1",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._9:44-50",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-28 Ряд.",
        "triggers": {
            "mmdd": [
                "10-28"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Кол._4:2-9",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._9:49-56",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-29 Ряд.",
        "triggers": {
            "mmdd": [
                "10-29"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Кол._4:10-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._10:1-15",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-30 Ряд.",
        "triggers": {
            "mmdd": [
                "10-30"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._5:1-10a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._7:1b-10",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-10-31 Ряд.",
        "triggers": {
            "mmdd": [
                "10-31"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал._6:11-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._16:19-31",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-01 Ряд.",
        "triggers": {
            "mmdd": [
                "11-01"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Сол._1:1-5",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._10:22-24",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-02 Ряд.",
        "triggers": {
            "mmdd": [
                "11-02"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Сол._1:6-10",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._11:1-10",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-03 Ряд.",
        "triggers": {
            "mmdd": [
                "11-03"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Сол._2:1-8",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._11:9-13",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-04 Ряд.",
        "triggers": {
            "mmdd": [
                "11-04"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Сол._2:9-14a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._11:14-23",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-05 Ряд.",
        "triggers": {
            "mmdd": [
                "11-05"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Сол._2:14-19",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._11:23-26",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-06 Ряд.",
        "triggers": {
            "mmdd": [
                "11-06"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._8:1-5",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._8:16-21",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-07 Ряд.",
        "triggers": {
            "mmdd": [
                "11-07"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._2:4-10",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Євр. 305 зач.; 2:2-10",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._8:26-39",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Лк. 51 зач.; 10:16-21",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-08 Ряд.",
        "triggers": {
            "mmdd": [
                "11-08"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Сол._2:20-3:8",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._11:29-33",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-09 Ряд.",
        "triggers": {
            "mmdd": [
                "11-09"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Сол._3:9-13",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._11:34-41",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-10 Ряд.",
        "triggers": {
            "mmdd": [
                "11-10"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Сол._4:1-12",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._11:42-46",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-11 Ряд.",
        "triggers": {
            "mmdd": [
                "11-11"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Сол._5:1-8",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._11:47-12:1",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-12 Ряд.",
        "triggers": {
            "mmdd": [
                "11-12"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Сол._5:9-13, 24-28",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._12:2-12",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-13 Ряд.",
        "triggers": {
            "mmdd": [
                "11-13"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Кор._11:1-6",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._9:1-6",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-14 Ряд.",
        "triggers": {
            "mmdd": [
                "11-14"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._2:14-22",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._8:41-56",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-15 Ряд.",
        "triggers": {
            "mmdd": [
                "11-15"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Сол._1:1-10",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._12:13-15, 22b-31",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-16 Ряд.",
        "triggers": {
            "mmdd": [
                "11-16"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Сол._1:10b-2:2",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._12:42-48",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-17 Ряд.",
        "triggers": {
            "mmdd": [
                "11-17"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Сол._2:1-12",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._12:48b-59",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-18 Ряд.",
        "triggers": {
            "mmdd": [
                "11-18"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Сол._2:13-3:5",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._13:1-9",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-19 Ряд.",
        "triggers": {
            "mmdd": [
                "11-19"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Сол._3:6-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._13:31-35",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-20 Св.",
        "triggers": {
            "mmdd": [
                "11-20"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр. 320 зач.; 9:1-7",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк. 54 зач.; 10:38-42; 11:27-28",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-21 Ряд.",
        "triggers": {
            "mmdd": [
                "11-21"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._4:1-6",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._10:25-37",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-22 Ряд.",
        "triggers": {
            "mmdd": [
                "11-22"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Тим._1:1-7",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._14:12-15",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-23 Ряд.",
        "triggers": {
            "mmdd": [
                "11-23"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Тим._1:8-14",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._14:25-35",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-24 Ряд.",
        "triggers": {
            "mmdd": [
                "11-24"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Тим._1:18-20, 2:8-15",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._15:1-10",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-25 Ряд.",
        "triggers": {
            "mmdd": [
                "11-25"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Тим._3:1-13",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._16:1-9",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-26 Ряд.",
        "triggers": {
            "mmdd": [
                "11-26"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Тим._4:4-8, 16",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._16:15-18, 17:1-4",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-27 Ряд.",
        "triggers": {
            "mmdd": [
                "11-27"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал._3:8-12",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._9:57-62",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-28 Ряд.",
        "triggers": {
            "mmdd": [
                "11-28"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._5:8b-19",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._12:16-21",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-29 Ряд.",
        "triggers": {
            "mmdd": [
                "11-29"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Тим._5:1-10",
                        "label": "Ряд."
                    },
                    {
                        "reading": "1 Кор. 131 зач.; 4:9-16",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._17:20-25",
                        "label": "Ряд."
                    },
                    {
                        "reading": "Ін. 4 зач.; 1:35-51",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-11-30 Ряд.",
        "triggers": {
            "mmdd": [
                "11-30"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Тим._5:11-21",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._17:26-37",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-01 Ряд.",
        "triggers": {
            "mmdd": [
                "12-01"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Тим._5:22-6:11a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._18:15-17, 26-30",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-02 Ряд.",
        "triggers": {
            "mmdd": [
                "12-02"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "1 Тим._6:17-21",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._18:31-34",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-03 Ряд.",
        "triggers": {
            "mmdd": [
                "12-03"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Тим._1:1-2, 8-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._19:12-28",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-04 Ряд.",
        "triggers": {
            "mmdd": [
                "12-04"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал._5:22-6:2",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._10:19-21",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-05 Ряд.",
        "triggers": {
            "mmdd": [
                "12-05"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._6:10-17",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._13:10-17",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-06 Ряд.",
        "triggers": {
            "mmdd": [
                "12-06"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Тим._2:20-26",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._19:37-44",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-07 Ряд.",
        "triggers": {
            "mmdd": [
                "12-07"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Тим._3:16-4:4",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._19:45-48",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-08 Ряд.",
        "triggers": {
            "mmdd": [
                "12-08"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "2 Тим._4:9-22",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._20:1-8",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-09 Ряд.",
        "triggers": {
            "mmdd": [
                "12-09"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Тит._1:5-2:1",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._20:9-18",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-10 Ряд.",
        "triggers": {
            "mmdd": [
                "12-10"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Тит._1:15-2:10",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._20:19-26",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-11 Ряд.",
        "triggers": {
            "mmdd": [
                "12-11"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._1:16-23",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._12:32-40",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-12 Ряд.",
        "triggers": {
            "mmdd": [
                "12-12"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Кол._1:12-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._14:16-24",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-13 Ряд.",
        "triggers": {
            "mmdd": [
                "12-13"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр._3:5-11, 17-19",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._20:27-44",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-14 Ряд.",
        "triggers": {
            "mmdd": [
                "12-14"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр._4:1-13",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._21:12-19",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-15 Ряд.",
        "triggers": {
            "mmdd": [
                "12-15"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр._5:11-6:8",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._21:5-7, 10-11, 20-24",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-16 Ряд.",
        "triggers": {
            "mmdd": [
                "12-16"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр._7:1-6",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._21:28-33",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-17 Ряд.",
        "triggers": {
            "mmdd": [
                "12-17"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр._7:18-25",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._21:37-22:8",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-18 Ряд.",
        "triggers": {
            "mmdd": [
                "12-18"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._2:11-13",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._13:18-29",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-19 Ряд.",
        "triggers": {
            "mmdd": [
                "12-19"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Кол._3:4-11",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._17:12-19",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-20 Ряд.",
        "triggers": {
            "mmdd": [
                "12-20"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр._8:7-13",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._8:11-21",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-21 Ряд.",
        "triggers": {
            "mmdd": [
                "12-21"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр._9:8-10, 15-23",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._8:22-26",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-22 Ряд.",
        "triggers": {
            "mmdd": [
                "12-22"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр._10:1-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._8:30-34",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-23 Ряд.",
        "triggers": {
            "mmdd": [
                "12-23"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр._10:35-11:7",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._9:10-16",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-24 Св.",
        "triggers": {
            "mmdd": [
                "12-24"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Гал. 209 зач.; 4:4-7",
                        "label": "Св."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мф. 3 зач.; 2:1-12",
                        "label": "Св."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-25 Ряд.",
        "triggers": {
            "mmdd": [
                "12-25"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Еф._5:1-8a",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._14:1-11",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-26 Ряд.",
        "triggers": {
            "mmdd": [
                "12-26"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Кол._3:12-16",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Лк._18:18-27",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-27 Ряд.",
        "triggers": {
            "mmdd": [
                "12-27"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр._11:17-23, 27-31",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._9:42-10:1",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-28 Ряд.",
        "triggers": {
            "mmdd": [
                "12-28"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Євр._12:25-26, 13:22-25",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._10:2-12",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-29 Ряд.",
        "triggers": {
            "mmdd": [
                "12-29"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Як._1:1-18",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._10:11-16",
                        "label": "Ряд."
                    }
                ]
            }
        }
    },
    {
        "id": "2026-12-30 Ряд.",
        "triggers": {
            "mmdd": [
                "12-30"
            ],
            "year": [
                2026
            ]
        },
        "action": "REPLACE_LITURGY",
        "data": {
            "liturgy": {
                "apostle": [
                    {
                        "reading": "Як._1:19-27",
                        "label": "Ряд."
                    }
                ],
                "gospel": [
                    {
                        "reading": "Мк._10:17-27",
                        "label": "Ряд."
                    }
                ]
            }
        }
    }
];

=== STATISTICS ===
Total rules: 288
SUPPRESS_SAINTS: 0
REPLACE_LITURGY: 288
Rules with nday trigger: 0
Rules with mmdd trigger: 288
