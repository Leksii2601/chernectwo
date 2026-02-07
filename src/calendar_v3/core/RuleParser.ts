import { GranularReadings, TypikonRule } from './LiturgicalTypes';
// import { OCU_RULES } from '../../calendar_v2/data/parsed_rules_final.json'; // Importing data logic later
// For now, we stub the data source or expect it to be injected.
// We will look at the existing rules data from V3.
import OCU_RULES_RAW from '../../calendar_v3/data/typikon_overrides.json';
import { getNday } from './PaschaMath';

export class RuleParser {
    private static instance: RuleParser;
    private rules: TypikonRule[];

    private constructor() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.rules = OCU_RULES_RAW as any as TypikonRule[];
    }

    public static getInstance(): RuleParser {
        if (!RuleParser.instance) {
            RuleParser.instance = new RuleParser();
        }
        return RuleParser.instance;
    }

    // New method to handle Saints Integration
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public injectSaints(target: GranularReadings, saints: any[]): void {
        saints.forEach(saint => {
            // Logic: Append saint readings to liturgy
            // Future logic: Check serviceType to decide suppression?
            
            if (saint.liturgy) {
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 saint.liturgy.apostle?.forEach((r: any) => target.liturgy.apostle.push(r));
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 saint.liturgy.gospel?.forEach((r: any) => target.liturgy.gospel.push(r));
            }
            
            if (saint.matins && target.matins) {
                // target.matins.readings.push(...saint.matins);
                // Not automatically adding matins saints yet, unless needed?
                // Often saints have Matins Gospel which is vital.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                saint.matins.forEach((r: any) => {
                     if (!target.matins) target.matins = { title: "Рання", readings: [] };
                     target.matins.readings.push(r);
                });
            }
        });
    }

    /**
     * Applies rules to the readings object in-place.
     */
    public evaluate(readings: GranularReadings, date: Date, pascha: Date): void {
        const mmdd = this.formatMMDD(date);
        const nday = getNday(date, pascha);
        const year = date.getFullYear();

        // Find active rules
        const activeRules = this.rules.filter(rule => {
             // 0. Global Year Check
             if (rule.triggers.year) {
                 if (!rule.triggers.year.includes(year)) return false;
             }

             // Check triggers
             // 1. MMDD
             if (rule.triggers.mmdd && rule.triggers.mmdd.includes(mmdd)) return true;
             
             // 2. NDAY Exact
             if (rule.triggers.nday && rule.triggers.nday.includes(nday)) return true;
             
             // 3. NDAY Range
             if (rule.triggers.ndayRange) {
                 const [min, max] = rule.triggers.ndayRange;
                 if (nday >= min && nday <= max) {
                     // 4. DOW Check (if present)
                     if (rule.triggers.dow) {
                         const dow = date.getDay();
                         if (!rule.triggers.dow.includes(dow)) return false;
                     }
                     return true;
                 }
             }
             
             return false;
        });
        
        // Sort active rules by priority (ascending) so higher priority overrides lower
        activeRules.sort((a, b) => (a.priority || 0) - (b.priority || 0));

        // Apply rules in order
        for (const rule of activeRules) {
            this.applyRule(readings, rule);
        }
    }

    private isValidTitle(t: string | undefined): boolean {
        if (!t) return false;
        if (t.includes("} ##")) return false; // Garbage pattern
        if (t === "Generated") return false;
        if (t.trim() === "Saint") return false; 
        return true;
    }

    private applyRule(target: GranularReadings, rule: TypikonRule): void {
        // Stub implementation of actions
        // In a full implementation, this handles all TypikonActions defined in LiturgicalTypes
        
        if (rule.data.title) {
             // If rule has high priority or is specific, overwrite title
             // But if we have a Major Feast (Rank >= 8), do NOT overwrite blindly unless high priority?
             // Actually, for Lenten rules (priority 10), they usually define the day.
             // But if it's Annunciation (Rank > 8?), we must respect the Feast.

             // FIX: Only overwrite if no Major Feast, or if Rule is specifically targeting the Feast.
             // Currently, Lenten rules are generic (nday range).
             
             if (rule.action === 'SET_ALITURGICAL' || rule.id.includes('lenten')) {
                 if (target.feast && target.feast.rank && target.feast.rank >= 8) {
                     // Major Feast Active -> Ignore Lenten Title Override
                 } else {
                    if (this.isValidTitle(rule.data.title)) {
                        if (!target.feast) target.feast = { title: "" };
                        target.feast.title = rule.data.title;
                        target.liturgy.title = rule.data.title;
                    }
                 }
             } else {
                 // Standard overwrite
                 if (this.isValidTitle(rule.data.title)) {
                     if (!target.feast) target.feast = { title: "" };
                     target.feast.title = rule.data.title;
                     target.liturgy.title = rule.data.title;
                 }
             }
        }

        if (rule.action === 'SET_ALITURGICAL') {
            // Updated Logic: Check for Priority Exclusion
            // If we have a Major Feast (Rank >= 8), DO NOT Suppress Liturgy.
            if (target.feast && target.feast.rank && target.feast.rank >= 8) {
                // Ignore Suppression
                return;
            }

            target.liturgy.apostle = [];
            target.liturgy.gospel = [];
            target.liturgy.title = rule.data.title || "Літургія не звершується";
            // Also suppress saints unless they are very high rank?
            // Usually Aliturgical implies NO LITURGY regardless of simple saints.
            // High rank saints in Lent trigger Vesperal Liturgy or move the feast.
            // For now, simple suppression:
            // Since this runs AFTER saint injection, and clears arrays, saints are suppressed.
        }
        
        if (rule.action === 'REPLACE_LITURGY' && rule.data.liturgy) {
             // Clear existing
             target.liturgy.apostle = [];
             target.liturgy.gospel = [];

             rule.data.liturgy.apostle?.forEach(r => target.liturgy.apostle.push({
                 reading: r.reading, label: r.label, type: r.type
             }));
             rule.data.liturgy.gospel?.forEach(r => target.liturgy.gospel.push({
                 reading: r.reading, label: r.label, type: r.type
             }));
             
             if (rule.data.title && this.isValidTitle(rule.data.title)) {
                 if (!target.feast) target.feast = { title: "" };
                 target.feast.title = rule.data.title;
             }

             if (rule.data.matins) {
                 if (!target.matins) target.matins = { title: "Рання", readings: [] };
                 // Clear or append? Usually replace if it's a major feast replace action.
                 // For now, let's append/overwrite.
                 target.matins.readings = []; // Clear for Replace
                 rule.data.matins.forEach(r => target.matins!.readings.push(r));
             }
        }
        
        // Add other actions (APPEND, SUPPRESS) as needed
        if (rule.action === 'APPEND_LITURGY' && rule.data.liturgy) {
            rule.data.liturgy.apostle?.forEach(r => target.liturgy.apostle.push({
                reading: r.reading, label: r.label, type: r.type
            }));
            rule.data.liturgy.gospel?.forEach(r => target.liturgy.gospel.push({
                reading: r.reading, label: r.label, type: r.type
            }));
        }
    }

    private formatMMDD(date: Date): string {
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${m}-${d}`;
    }
}
