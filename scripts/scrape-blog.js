import { JSDOM } from 'jsdom';
import fs from 'fs/promises';

const BLOG_URL = 'https://www.chernectvo.com/blog/';

async function scrape() {
  console.log('Fetching blog list...');
  const response = await fetch(BLOG_URL);
  const html = await response.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Strategy: Identify links that look like blog posts.
  // The earlier summary showed links with titles.
  // We will look for links inside central columns or sections.
  // For now, let's grab all links and filter heuristically.
  
  const allLinks = Array.from(doc.querySelectorAll('a'));
  console.log(`Total links found on page: ${allLinks.length}`);

  const articleLinks = allLinks
    .map(a => a.href)
    .filter(href => href.startsWith('https://www.chernectvo.com/'))
    // Exclude common non-article pages
    .filter(href => {
        const ignored = [
            'https://www.chernectvo.com/',
            'https://www.chernectvo.com/blog/',
            'https://www.chernectvo.com/contacts/',
            'https://www.chernectvo.com/about/',
            'https://www.chernectvo.com/donate/',
            'https://www.chernectvo.com/schedule/',
            // Non-article pages found in previous run
            'https://www.chernectvo.com/zhyttya-obyteli/',
            'https://www.chernectvo.com/media/',
            'https://www.chernectvo.com/anonsy/',
            'https://www.chernectvo.com/news/', // Seems to be a category
            'https://www.chernectvo.com/volonterskyj-ruh-imeni-symona-kyrynejskogo/',
            'https://www.chernectvo.com/hor-voskresinnya/',
            'https://www.chernectvo.com/nedilna-shkola-prominchyk/',
            'https://www.chernectvo.com/zhydychyn-history-hall-istorychna-arena/',
            'https://www.chernectvo.com/czentr-duhovnoyi-ta-psyhologichnoyi-pidtrymky-isyhiya/',
            'https://www.chernectvo.com/informaczijna-platforma-zavtra/',
            'https://www.chernectvo.com/dobrovilna-pozhezhna-komanda-zhydychyn/',
            'https://www.chernectvo.com/pro-vydavnycztvo/',
            'https://www.chernectvo.com/shop/',
            'https://www.chernectvo.com/pozhertva/',
            'https://www.chernectvo.com/praczya/',
            'https://www.chernectvo.com/tovary/',
            'https://www.chernectvo.com/contact/',
            'https://www.chernectvo.com/poshyreni-zapytannya/',
            'https://www.chernectvo.com/cart/',
            'https://www.chernectvo.com/checkout/',
            'https://www.chernectvo.com/my-account/'
        ];
        return !ignored.includes(href) && !href.includes('#') && !href.includes('?');
    })
    .filter((value, index, self) => self.indexOf(value) === index);

  console.log(`Filtered to ${articleLinks.length} potential article links.`);

  const articles = [];
  const MAX_ARTICLES = 50; 

  for (const link of articleLinks.slice(0, MAX_ARTICLES)) {
    console.log(`Scraping ${link}...`);
    try {
        const artRes = await fetch(link);
        if (!artRes.ok) {
            console.error(`Failed to fetch ${link}: ${artRes.status}`);
            continue;
        }
        const artHtml = await artRes.text();
        const artDom = new JSDOM(artHtml);
        const artDoc = artDom.window.document;

        let title = artDoc.querySelector('h1')?.textContent?.trim();
        
        let contentNodes = artDoc.querySelectorAll('.elementor-widget-text-editor p, .post_content p, .entry-content p');
        if (contentNodes.length === 0) {
            contentNodes = artDoc.querySelectorAll('p');
        }

        const content = Array.from(contentNodes)
            .map(p => p.textContent?.trim())
            .filter(text => text && text.length > 20)
            .join('\n\n');

        // Check for login wall / empty content
        if (!content || content.includes("Don't have an account yet?") || content.length < 50) {
             console.log(`  -> Skipped (Invalid content: "${content.substring(0, 30)}...")`);
             continue;
        }

        const image = artDoc.querySelector('meta[property="og:image"]')?.content || 
                      artDoc.querySelector('img')?.src;

        const date = artDoc.querySelector('meta[property="article:published_time"]')?.content ||
                     artDoc.querySelector('time')?.getAttribute('datetime');

        if (title && content) {
            articles.push({
                url: link,
                title,
                date,
                image,
                content
            });
            console.log(`  -> Success: "${title}"`);
        } else {
            console.log(`  -> Skipped (insufficient data): Title=${!!title}, ContentLen=${content?.length}`);
        }
    } catch (e) {
        console.error(`Error scraping ${link}:`, e);
    }
    
    await new Promise(r => setTimeout(r, 500));
  }

  const outputPath = 'src/data/scraped_blog.json';
  await fs.writeFile(outputPath, JSON.stringify(articles, null, 2));
  console.log(`Saved ${articles.length} articles to ${outputPath}`);
}

scrape().catch(console.error);
