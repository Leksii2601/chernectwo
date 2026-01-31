
import { getOrthodoxPascha } from '../LiturgicalEngine';

const year = 2026;
const pascha = getOrthodoxPascha(year);
console.log(`Pascha ${year} New Style: ${pascha.toISOString().split('T')[0]}`);
