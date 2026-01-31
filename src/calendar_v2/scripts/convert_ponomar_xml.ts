
import * as fs from 'fs';
import * as path from 'path';

// Override paths for testing/user environment
const BASE_PATH = "D:\\Завантаження\\ponomar-master\\ponomar-master\\Ponomar\\languages\\xml";
const OUTPUT_DIR = path.resolve(process.cwd(), 'src/calendar_v2/data/ponomar_raw');

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// --- XML Parsing Helpers (Regex based) ---

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

// --- TRIODION CONVERSION ---

function convertTriodion() {
    const triodionPath = path.join(BASE_PATH, 'triodion');
    if (!fs.existsSync(triodionPath)) {
        console.error(`Dir not found: ${triodionPath}`);
        return;
    }

    const files = fs.readdirSync(triodionPath).filter(f => f.endsWith('.xml'));
    const result: any[] = [];

    console.log(`Processing Triodion: ${files.length} files...`);

    files.forEach(file => {
        const filePath = path.join(triodionPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        const dayId = file.replace('.xml', '');

        const saintRegex = /<SAINT\s+(.*?)(\/?>)/g;
        let match;
        const saints: any[] = [];

        while ((match = saintRegex.exec(content)) !== null) {
            const attrs = parseAttributes(match[1]);
            saints.push(attrs);
        }

        result.push({
            day: dayId,
            saints: saints
        });
    });

    const outFile = path.join(OUTPUT_DIR, 'triodion_schedule.json');
    fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
    console.log(`Saved ${outFile}`);
}

// --- PENTECOSTARION CONVERSION ---

function convertPentecostarion() {
    const pentPath = path.join(BASE_PATH, 'pentecostarion');
    if (!fs.existsSync(pentPath)) {
        console.error(`Dir not found: ${pentPath}`);
        return;
    }

    const files = fs.readdirSync(pentPath).filter(f => f.endsWith('.xml'));
    const result: any[] = [];

    console.log(`Processing Pentecostarion: ${files.length} files...`);

    files.forEach(file => {
        const filePath = path.join(pentPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        const dayId = file.replace('.xml', '');

        const saintRegex = /<SAINT\s+(.*?)(\/?>)/g;
        let match;
        const saints: any[] = [];

        while ((match = saintRegex.exec(content)) !== null) {
            const attrs = parseAttributes(match[1]);
            saints.push(attrs);
        }

        result.push({
            day: dayId,
            saints: saints
        });
    });

    const outFile = path.join(OUTPUT_DIR, 'pentecostarion_schedule.json');
    fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
    console.log(`Saved ${outFile}`);
}


// --- LIVES CONVERSION ---

function convertLives() {
    const livesPath = path.join(BASE_PATH, 'lives');
    if (!fs.existsSync(livesPath)) {
        console.error(`Dir not found: ${livesPath}`);
        return;
    }

    const files = fs.readdirSync(livesPath).filter(f => f.endsWith('.xml'));
    const result: Record<string, any> = {};

    console.log(`Processing Lives: ${files.length} files...`);

    files.forEach(file => {
        const filePath = path.join(livesPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const cid = file.replace('.xml', '');

        const entry: any = { cid };

        // Parsing Service Type
        const serviceRegex = /<SERVICE\s+(.*?)>/;
        const serviceMatch = serviceRegex.exec(content);
        if (serviceMatch) {
            const attrs = parseAttributes(serviceMatch[1]);
            if (attrs['Type']) entry.serviceType = parseInt(attrs['Type']);
        }

        const liturgyRegex = /<LITURGY>(.*?)<\/LITURGY>/s;
        const liturgyMatch = liturgyRegex.exec(content);
        if (liturgyMatch) {
            entry.liturgy = parseScriptureTags(liturgyMatch[1]);
        }

        const matinsRegex = /<MATINS>(.*?)<\/MATINS>/s;
        const matinsMatch = matinsRegex.exec(content);
        if (matinsMatch) {
            entry.matins = parseScriptureTags(matinsMatch[1]);
        }

        const vespersRegex = /<VESPERS>(.*?)<\/VESPERS>/s;
        const vespersMatch = vespersRegex.exec(content);
        if (vespersMatch) {
            entry.vespers = parseScriptureTags(vespersMatch[1]);
        }

        // HOURS
        const primeRegex = /<PRIME>(.*?)<\/PRIME>/s;
        const primeMatch = primeRegex.exec(content);
        if (primeMatch) entry.prime = parseScriptureTags(primeMatch[1]);

        const terceRegex = /<TERCE>(.*?)<\/TERCE>/s;
        const terceMatch = terceRegex.exec(content);
        if (terceMatch) entry.terce = parseScriptureTags(terceMatch[1]);

        const sexteRegex = /<SEXTE>(.*?)<\/SEXTE>/s;
        const sexteMatch = sexteRegex.exec(content);
        if (sexteMatch) entry.sexte = parseScriptureTags(sexteMatch[1]);

        const noneRegex = /<NONE>(.*?)<\/NONE>/s;
        const noneMatch = noneRegex.exec(content);
        if (noneMatch) entry.none = parseScriptureTags(noneMatch[1]);


        if (entry.liturgy || entry.matins || entry.vespers || entry.prime || entry.terce || entry.sexte || entry.none) {
            result[cid] = entry;
        }
    });

    const outFile = path.join(OUTPUT_DIR, 'ponomar_lives.json');
    fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
    console.log(`Saved ${outFile}`);
}

// execute
try {
    convertTriodion();
    convertLives();
    convertPentecostarion();
} catch (e) {
    console.error("Error converting:", e);
}
