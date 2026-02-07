import { CalendarEngine } from '@/calendar_v3/core/CalendarEngine';
import { DetailedReading } from '@/calendar_v3/core/LiturgicalTypes';
import * as fs from 'fs';
import * as path from 'path';

// Define expected data structure
interface ExpectedEntry {
    date: string;
    title?: string;
    apostle?: string;
    gospel?: string;
    leiturgia?: boolean; // true = Liturgy served, false = aliturgical
}

class DiffChecker {
    private engine: CalendarEngine;
    private outputBuffer: string[] = [];

    constructor() {
        this.engine = CalendarEngine.getInstance();
    }

    private formatReading(r: DetailedReading): string {
        return `${r.reading} (${r.source || 'unknown'})`;
    }

    public async checkDate(dateStr: string, expected?: ExpectedEntry) {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            console.error(`Invalid date: ${dateStr}`);
            return;
        }

        const readings = this.engine.generateDay(date);
        
        // Extract Engine Data
        const engineTitle = readings.liturgy.title; // Or feast title
        const engineApostle = readings.liturgy.apostle.map(this.formatReading).join(' | ');
        const engineGospel = readings.liturgy.gospel.map(this.formatReading).join(' | ');
        const engineReadingsCount = readings.liturgy.apostle.length + readings.liturgy.gospel.length;
        const metadataKey = readings.metadata?.key || "N/A";
        
        // Status Check
        let status = "OK";
        if (engineReadingsCount === 0) status = "ERROR (Empty readings)";
        if (readings.liturgy.title.includes("Generated")) status = "WARN (Generated Title)";
        
        // Construct Output Block
        const block = [
            `ДАТА: ${dateStr}`,
            `ДВИГУН КАЖЕ: [Ключ ${metadataKey}, Title: ${engineTitle}, Readings: ${engineReadingsCount}]`,
            `   Apostle: ${engineApostle}`,
            `   Gospel: ${engineGospel}`,
            `PDF КАЖЕ: ${expected ? `[Title: ${expected.title || "?"}, Ap: ${expected.apostle || "?"}, Gs: ${expected.gospel || "?"}]` : "(тут буде твоє поле для вводу)"}`,
            `СТАТУС: ${status}`,
            "---------------------------------------------------"
        ].join('\n');

        console.log(block);
        this.outputBuffer.push(block);
    }

    public async saveReport(filePath: string = "correction_needed.txt") {
        const fullPath = path.resolve(process.cwd(), filePath);
        fs.writeFileSync(fullPath, this.outputBuffer.join('\n\n'), 'utf8');
        console.log(`Report saved to ${fullPath}`);
    }
}

// CLI Execution
async function main() {
    const args = process.argv.slice(2);
    const dateArg = args[0]; // Accepts single date YYYY-MM-DD or range YYYY-MM-DD:YYYY-MM-DD
    
    if (!dateArg) {
        console.log("Usage: npx tsx diff_checker.ts <YYYY-MM-DD> [expected_json_file]");
        return;
    }

    const checker = new DiffChecker();
    
    if (dateArg.includes(':')) {
        const [start, end] = dateArg.split(':');
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        const curr = new Date(startDate);
        while (curr <= endDate) {
            await checker.checkDate(curr.toISOString().split('T')[0]);
            curr.setDate(curr.getDate() + 1);
        }
    } else {
        await checker.checkDate(dateArg);
    }

    await checker.saveReport();
}

main().catch(console.error);
