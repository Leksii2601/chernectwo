
const fs = require('fs');
const data = require('../data/paschalion_data.json');
const entry = data.find(r => r.year === 2026);
console.log(JSON.stringify(entry, null, 2));
