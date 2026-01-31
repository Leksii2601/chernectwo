
import * as fs from 'fs';
import * as path from 'path';

const BASE_PATH = "D:\\Завантаження\\ponomar-master\\ponomar-master\\Ponomar\\languages\\xml";
const livesPath = path.join(BASE_PATH, 'lives');

const files = fs.readdirSync(livesPath).filter(f => f.endsWith('.xml'));
console.log("Total files:", files.length);

// Check specific file
const target = '010101.xml';
console.log("Has 010101.xml:", files.includes(target));

// Process just that file
if (files.includes(target)) {
    const filePath = path.join(livesPath, target);
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log("Content length:", content.length);
    console.log("First 200 chars:", content.substring(0, 200));

    const liturgyRegex = /<LITURGY>([\s\S]*?)<\/LITURGY>/;
    const liturgyMatch = liturgyRegex.exec(content);
    console.log("Liturgy match:", liturgyMatch ? 'YES' : 'NO');

    const vespersRegex = /<VESPERS>([\s\S]*?)<\/VESPERS>/;
    const vespersMatch = vespersRegex.exec(content);
    console.log("Vespers match:", vespersMatch ? 'YES' : 'NO');
}
