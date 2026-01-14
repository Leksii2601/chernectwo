import Fuse from 'fuse.js';
import { NewsItem, newsData } from '@/data/newsData';

const options = {
  keys: ['title', 'shortDescription', 'content'],
  threshold: 0.4, // 0.0 is perfect match, 1.0 is match anything. 0.4 allows for some typos/fuzziness
  includeScore: true,
};

// Singleton-like instance, though recreation is cheap for small data
export const searchNews = (query: string): NewsItem[] => {
  if (!query) return newsData;
  
  const fuse = new Fuse(newsData, options);
  const result = fuse.search(query);
  return result.map(res => res.item);
};
