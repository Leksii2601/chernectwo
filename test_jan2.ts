import { CalendarEngine } from './src/calendar_v3/core/CalendarEngine';

async function test() {
    const engine = CalendarEngine.getInstance();
    const day = await engine.generateDay(new Date(2026, 0, 2)); // Jan 2

    console.log('=== Jan 2, 2026 ===');
    console.log('Apostles:', day.liturgy.apostle.map(r => `"${r.reading}"`).join(', '));
    console.log('Gospels:', day.liturgy.gospel.map(r => `"${r.reading}"`).join(', '));
}

test().catch(console.error);
