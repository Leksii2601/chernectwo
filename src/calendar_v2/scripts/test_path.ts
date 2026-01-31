
import * as fs from 'fs';
import * as path from 'path';

// Test reading the file
const testFile = "D:\\Завантаження\\ponomar-master\\ponomar-master\\Ponomar\\languages\\xml\\lives\\010101.xml";
console.log("Testing path:", testFile);
console.log("Exists:", fs.existsSync(testFile));
if (fs.existsSync(testFile)) {
    console.log("Content:", fs.readFileSync(testFile, 'utf-8').substring(0, 100));
}
