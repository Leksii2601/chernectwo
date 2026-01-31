
import { calculateDynamicReadings } from '../LiturgicalEngine';

// Test various dates
const testDates = [
    { date: new Date(2026, 0, 14, 12), name: "Jan 14 (Circumcision/St Basil)" },
    { date: new Date(2026, 0, 30, 12), name: "Jan 30 (Three Hierarchs)" },
    { date: new Date(2026, 3, 12, 12), name: "Apr 12 (Pascha 2026)" },
];

testDates.forEach(({ date, name }) => {
    console.log(`\n=== ${name} ===`);
    const r = calculateDynamicReadings(date);
    console.log("Date:", r.date);
    console.log("Vespers:", r.vespers?.readings.length || 0);
    console.log("Matins:", r.matins?.readings.length || 0);
    console.log("Liturgy Apostle:", r.liturgy.apostle.length);
    console.log("Liturgy Gospel:", r.liturgy.gospel.length);
    if (r.liturgy.apostle.length > 0) {
        console.log("  Apostle Labels:", r.liturgy.apostle.map(a => a.label).join(", "));
    }
    console.log("Feast:", r.feast?.title || "(none)");
    console.log("Metadata Key:", r.metadata?.key);
});
