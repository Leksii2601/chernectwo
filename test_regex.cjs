
const fs = require('fs');
const c = fs.readFileSync('D:\\Завантаження\\ponomar-master\\ponomar-master\\Ponomar\\languages\\xml\\lives\\010101.xml', 'utf8');

console.log("File content:");
console.log(c);
console.log("---");

const r = /<LITURGY>([\s\S]*?)<\/LITURGY>/;
const m = r.exec(c);
console.log('Liturgy Match:', m ? 'YES' : 'NO');
if (m) console.log('Liturgy Content:', m[1]);

const v = /<VESPERS>([\s\S]*?)<\/VESPERS>/;
const vm = v.exec(c);
console.log('Vespers Match:', vm ? 'YES' : 'NO');
if (vm) console.log('Vespers Content:', vm[1]);
