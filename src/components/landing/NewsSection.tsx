'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const newsData = [
    {
      id: 1,
      date: 'Грудень 19, 2025',
      title: 'Прихована таємниця чернечого життя',
      image: '/media/news-1.png',
      category: 'Публікації'
    },
    {
      id: 2,
      date: 'Грудень 18, 2025',
      title: 'Коли секуляризація поглинає членів церкви',
      image: '/media/news-2.png',
      category: 'Публікації'
    },
    {
      id: 3,
      date: 'Грудень 14, 2025',
      title: 'Не страшно і не соромно. Як сповідатися, щоб отримати прощення?',
      image: '/media/news-3.png',
      category: 'Публікації'
    },
    {
      id: 4,
      date: 'Грудень 08, 2025',
      title: 'ЗВЕРНЕННЯ ЩОДО ВИКОРИСТАННЯ ПІДЛІТКІВ У ПІДРИВНІЙ РОБОТІ ЗАГАРБНИКІВ',
      image: '/media/news-4.png',
      category: 'Публікації'
    },
    {
      id: 5,
      date: 'Грудень 05, 2025',
      title: 'World Meeting on Human Fraternity 2025: program',
      image: '/media/news-2.png',
      category: 'Публікації'
    }
  ];

export function NewsSection() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => 
        prevIndex === newsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []); // Removed newsData.length dependcy to strictly array

  const currentNews = newsData[currentNewsIndex];
  
  // Logic: "Right side is static latest 4 news, Left side cycles through all"
  const latestNews = newsData.slice(0, 4);

  return (
    <section className="min-h-screen bg-gray-50 font-montserrat text-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-4xl text-center mb-16 uppercase font-bold text-gray-800 font-montserrat">
          Новини Монастиря
        </h2>
        
        <div className="flex gap-6 flex-col lg:flex-row items-stretch">
          
          {/* Main News - Left */}
          <div className="lg:w-2/3 flex flex-col">
            <div className="relative overflow-hidden shadow-lg group w-full h-full min-h-[500px] lg:min-h-0">
              <Image 
                src={currentNews.image} 
                alt={currentNews.title}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8">
                <div className="inline-block bg-white text-gray-900 px-4 py-1 text-xs font-bold uppercase mb-4 tracking-wider">
                  {currentNews.category}
                </div>
                <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight drop-shadow-md">
                  {currentNews.title}
                </h1>
                <p className="text-gray-300 mt-2 text-sm md:text-base font-medium">{currentNews.date}</p>
              </div>
            </div>
          </div>

          {/* Side News List - Right (Latest 4) */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {latestNews.map((news) => (
              <div 
                key={news.id}
                className="flex gap-4 cursor-pointer hover:bg-white transition-all duration-300 group flex-1"
                onClick={() => setCurrentNewsIndex(newsData.findIndex(n => n.id === news.id))}
              >
                <div className="relative w-36 h-28 flex-shrink-0 overflow-hidden">
                    <Image 
                    src={news.image} 
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-gray-400 text-xs uppercase font-bold mb-2 tracking-wide">{news.date}</p>
                  <h3 className="text-gray-900 font-bold text-base leading-snug group-hover:text-amber-600 transition-colors line-clamp-3">
                    {news.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
