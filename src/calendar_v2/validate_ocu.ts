import { calculateDynamicReadings } from './LiturgicalEngine';

const checks = [
    {
        date: "2026-01-19",
        desc: "Theophany Shift (St James)",
        check: (res: any) =>
            res.liturgy.apostle.some((r: any) => r.reading.includes("Як.") || r.reading.includes("2:14")) &&
            res.liturgy.gospel.some((r: any) => r.reading.includes("Мк.") || r.reading.includes("10:46"))
    },
    {
        date: "2026-02-22",
        desc: "Forgiveness Sunday (No Baptist)",
        check: (res: any) =>
            res.liturgy.apostle.length === 1 &&
            res.liturgy.apostle[0].label?.includes("сиропусна") &&
            !res.liturgy.apostle.some((r: any) => r.label?.includes("Предтечі"))
    },
    {
        date: "2025-12-01",
        desc: "Dec 01 Jump (1 Tim)",
        check: (res: any) =>
            res.liturgy.apostle.some((r: any) => r.reading.includes("1 Тим.") || r.reading.includes("1:1-7"))
    },
    {
        date: "2025-01-03",
        desc: "Jan 03 2025 Royal Hours",
        check: (res: any) =>
            res.hours &&
            Object.keys(res.hours).length > 0 &&
            !!res.hours['1-й час']
    }
];

console.log("=== OCU VALIDATION CHECKS ===\n");

checks.forEach(test => {
    const d = new Date(test.date + "T12:00:00");
    const res = calculateDynamicReadings(d);
    const passed = test.check(res);
    console.log(`[${passed ? "PASS" : "FAIL"}] ${test.desc} (${test.date})`);
    if (!passed) {
        console.log("  Failed Output:");
        console.log(JSON.stringify(res.liturgy, null, 2));
        console.log(JSON.stringify(res.hours, null, 2));
    }
});
