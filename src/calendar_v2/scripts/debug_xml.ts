
import * as fs from 'fs';

const filePath = "D:\\Завантаження\\ponomar-master\\ponomar-master\\Ponomar\\languages\\xml\\lives\\010101.xml";
const content = fs.readFileSync(filePath, 'utf-8');
console.log("File content:");
console.log(content);

const liturgyRegex = /<LITURGY>([\s\S]*?)<\/LITURGY>/;
const match = liturgyRegex.exec(content);
console.log("Liturgy match:", match ? match[1] : 'NONE');

const vespersRegex = /<VESPERS>([\s\S]*?)<\/VESPERS>/;
const vMatch = vespersRegex.exec(content);
console.log("Vespers match:", vMatch ? vMatch[1] : 'NONE');
