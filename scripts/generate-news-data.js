const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../src/data/scraped_blog.json');
const OUTPUT_FILE = path.join(__dirname, '../src/data/newsData.ts');

const MONTHS = {
    0: 'Січня', 1: 'Лютого', 2: 'Березня', 3: 'Квітня', 4: 'Травня', 5: 'Червня',
    6: 'Липня', 7: 'Серпня', 8: 'Вересня', 9: 'Жовтня', 10: 'Листопада', 11: 'Грудня'
};

function formatDate(isoString) {
    if (!isoString) return '01 Січня 2026';
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function getCategory(title) {
    const t = title.toLowerCase();
    if (t.includes('анонс') || t.includes('розклад')) return 'Анонси';
    if (t.includes('офіційно') || t.includes('звернення') || t.includes('митрополит') || t.includes('епіфаній')) return 'Офіційно';
    return 'Публікації';
}

function cleanContent(content) {
    if (!content) return '';
    // Wrap paragraphs in <p> tags if they aren't already (scraped content joined by \n\n)
    return content.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('\n');
}

try {
    const rawData = fs.readFileSync(INPUT_FILE, 'utf8');
    const articles = JSON.parse(rawData);

    const newsItems = articles.map((article, index) => {
        // Fallback image if data URI or missing
        let image = article.image;
        if (!image || image.startsWith('data:')) {
            image = '/media/news.jpg'; // Default fallback
        }

        const shortDescription = article.content 
            ? article.content.substring(0, 150).replace(/\n/g, ' ') + '...'
            : 'Читати далі...';

        return {
            id: (index + 1).toString(), // Simple ID based on index
            title: article.title.replace(/"/g, '\\"'),
            date: formatDate(article.date),
            category: getCategory(article.title),
            image: image,
            shortDescription: shortDescription.replace(/"/g, '\\"'),
            content: cleanContent(article.content).replace(/`/g, '\\`').replace(/\${/g, '\\${') // Escape backticks for template literal
        };
    });

    const fileContent = `export type NewsCategory = 'Всі новини' | 'Публікації' | 'Анонси' | 'Офіційно';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: NewsCategory;
  image: string;
  shortDescription: string;
  content: string; // HTML or Markdown string for the full content
}

export const newsData: NewsItem[] = ${JSON.stringify(newsItems, null, 2)};
`;

    // Fix JSON stringify to look like TS code (keys are quoted in JSON, which is fine, but we might want cleaner output, JSON is valid TS though)
    // Actually, JSON.stringify produces valid TS object literal syntax (mostly), except for the lack of single quotes which TS linters prefer, but it works.
    
    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`Successfully wrote ${newsItems.length} items to ${OUTPUT_FILE}`);

} catch (error) {
    console.error('Error generating news data:', error);
}
