export const MONTHS_UA: Record<string, string> = {
    'січня': 'January',
    'лютого': 'February',
    'березня': 'March',
    'квітня': 'April',
    'травня': 'May',
    'червня': 'June',
    'липня': 'July',
    'серпня': 'August',
    'вересня': 'September',
    'жовтня': 'October',
    'листопада': 'November',
    'грудня': 'December',
    'Січня': 'January',
    'Лютого': 'February',
    'Березня': 'March',
    'Квітня': 'April',
    'Травня': 'May',
    'Червня': 'June',
    'Липня': 'July',
    'Серпня': 'August',
    'Вересня': 'September',
    'Жовтня': 'October',
    'Листопада': 'November',
    'Грудня': 'December',
};

export function parseUkrainianDate(dateStr: string): string {
    try {
        // Format is likely "DD Month YYYY" e.g., "22 Лютого 2025"
        const parts = dateStr.trim().split(/\s+/);
        if (parts.length < 3) return new Date().toISOString();

        const day = parts[0];
        const month = parts[1];
        const year = parts[2];

        const engMonth = MONTHS_UA[month] || MONTHS_UA[month.toLowerCase()];
        if (!engMonth) return new Date().toISOString();

        const d = new Date(`${engMonth} ${day}, ${year}`);
        if (isNaN(d.getTime())) return new Date().toISOString();

        return d.toISOString();
    } catch (e) {
        return new Date().toISOString();
    }
}
