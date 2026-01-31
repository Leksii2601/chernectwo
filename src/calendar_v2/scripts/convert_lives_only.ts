
import * as fs from 'fs';
import * as path from 'path';

const BASE_PATH = "D:\\Завантаження\\ponomar-master\\ponomar-master\\Ponomar\\languages\\xml";
const OUTPUT_DIR = path.resolve(process.cwd(), 'src/calendar_v2/data/ponomar_raw');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function parseAttributes(tagObj: string): Record<string, string> {
    const attrs: Record<string, string> = {};
    const regex = /(\w+)="([^"]*)"/g;
    let match;
    while ((match = regex.exec(tagObj)) !== null) {
        attrs[match[1]] = match[2];
    }
    return attrs;
}

function parseScriptureTags(content: string): any[] {
    const scriptures: any[] = [];
    const scriptRegex = /<SCRIPTURE\s+(.*?)(\/?>)/g;
    let match;
    while ((match = scriptRegex.exec(content)) !== null) {
        scriptures.push(parseAttributes(match[1]));
    }
    return scriptures;
}

function convertLives() {
    const livesPath = path.join(BASE_PATH, 'lives');
    if (!fs.existsSync(livesPath)) {
        console.error(`Dir not found: ${livesPath}`);
        return;
    }

    const files = fs.readdirSync(livesPath).filter(f => f.endsWith('.xml'));
    const result: Record<string, any> = {};

    console.log(`Processing Lives: ${files.length} files...`);

    let processedCount = 0;
    files.forEach(file => {
        const filePath = path.join(livesPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const cid = file.replace('.xml', '');

        const entry: any = { cid };

        // Parse Service Type
        const serviceRegex = /<SERVICE\s+(.*?)>/;
        const serviceMatch = serviceRegex.exec(content);
        if (serviceMatch) {
            const attrs = parseAttributes(serviceMatch[1]);
            if (attrs['Type']) entry.serviceType = parseInt(attrs['Type']);
        }

        const liturgyRegex = /<LITURGY>([\s\S]*?)<\/LITURGY>/;
        const liturgyMatch = liturgyRegex.exec(content);
        if (liturgyMatch) {
            entry.liturgy = parseScriptureTags(liturgyMatch[1]);
        }

        const matinsRegex = /<MATINS>([\s\S]*?)<\/MATINS>/;
        const matinsMatch = matinsRegex.exec(content);
        if (matinsMatch) {
            entry.matins = parseScriptureTags(matinsMatch[1]);
        }

        const vespersRegex = /<VESPERS>([\s\S]*?)<\/VESPERS>/;
        const vespersMatch = vespersRegex.exec(content);
        if (vespersMatch) {
            entry.vespers = parseScriptureTags(vespersMatch[1]);
        }

        if (entry.liturgy || entry.matins || entry.vespers) {
            result[cid] = entry;
            processedCount++;
        }
    });

    const outFile = path.join(OUTPUT_DIR, 'ponomar_lives.json');
    fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
    console.log(`Saved ${outFile} with ${processedCount} entries`);
}

convertLives();
