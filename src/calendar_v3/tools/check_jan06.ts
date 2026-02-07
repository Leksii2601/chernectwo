
import { CalendarEngine } from '../core/CalendarEngine';
import * as fs from 'fs';
import * as path from 'path';

const engine = CalendarEngine.getInstance();
const date = new Date('2026-01-06');
const data = engine.generateDay(date);
const data19 = engine.generateDay(new Date('2026-01-19'));

const log = [];
log.push("Jan 06 2026 Check:");
if (data.liturgy?.apostle?.length) {
    log.push("PASS: Readings found.");
    log.push(JSON.stringify(data.liturgy, null, 2));
} else {
    log.push("FAIL: No Readings for Jan 06.");
}

log.push("\nJan 19 2026 Check:");
if (data19.liturgy?.apostle?.length) {
    log.push("PASS: Readings found.");
    log.push(JSON.stringify(data19.liturgy, null, 2));
} else {
    log.push("FAIL: No Readings for Jan 19.");
}

fs.writeFileSync(path.join(process.cwd(), 'jan_check_result.txt'), log.join('\n'));
