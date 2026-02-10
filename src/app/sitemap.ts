import { MetadataRoute } from 'next';
import { newsData } from '@/data/newsData';
import { parseUkrainianDate } from '@/utils/dateUtils';

const BASE_URL = 'https://www.chernectvo.com';

const languages = ['ua', 'en'];
const staticRoutes = [
    '',
    '/about',
    '/about/history',
    '/about/complex',
    '/about/sketes',
    '/about/media',
    '/news',
    '/pilgrims',
    '/contacts',
    '/social-projects',
    '/join',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];

    // Static routes
    languages.forEach((lang) => {
        staticRoutes.forEach((route) => {
            routes.push({
                url: `${BASE_URL}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1.0 : 0.8,
            });
        });
    });

    // Dynamic news routes
    newsData.forEach((news) => {
        languages.forEach((lang) => {
            // Assuming news URLs follow /lang/news/[id] pattern
            routes.push({
                url: `${BASE_URL}/${lang}/news/${news.id}`,
                lastModified: new Date(parseUkrainianDate(news.date)),
                changeFrequency: 'monthly',
                priority: 0.6,
            });
        });
    });

    return routes;
}
