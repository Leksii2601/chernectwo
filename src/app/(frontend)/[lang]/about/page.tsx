'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { CircleArrowButton } from '@/components/ui/CircleArrowButton';

interface Section {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
}

function AboutSection({ section, index, language }: { section: Section, index: number, language: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how far the section is from the center of the screen
      // If the section is in the center, progress is 0.
      // If it's below, progress is positive. If above, negative.
      const sectionCenter = rect.top + rect.height / 2;
      const progress = (sectionCenter - viewportHeight / 2) * 0.1;
      setOffset(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 px-6 md:px-12 lg:px-32 mb-24 lg:mb-48 last:mb-0`}
    >

      {/* Image Block */}
      <div
        className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:h-[650px] relative overflow-hidden group shadow-2xl"
        style={{
          transform: `translate3d(0, ${offset * 0.4}px, 0)`,
          willChange: 'transform'
        }}
      >
        <Image
          src={section.image}
          alt={section.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
      </div>

      {/* Text Block */}
      <div
        className="w-full lg:w-1/2 flex flex-col items-start text-left"
        style={{
          transform: `translate3d(0, ${-offset * 0.3}px, 0)`,
          willChange: 'transform'
        }}
      >
        <div className="w-16 h-[2px] bg-amber-600 mb-8" />
        <span className="text-amber-600 font-bold uppercase tracking-[0.3em] text-xs mb-4">
          {section.subtitle}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-gray-900 mb-8 font-montserrat leading-tight">
          {section.title}
        </h2>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-medium">
          {section.description}
        </p>

        <CircleArrowButton
          text={language === 'UA' ? 'Дізнатися більше' : 'Read More'}
          href={section.href}
        />
      </div>
    </section>
  );
}

export default function AboutPage() {
  const { t, language } = useLanguage();
  const langPrefix = `/${language.toLowerCase()}`;

  const sections: Section[] = [
    {
      title: t('explore.history'),
      subtitle: t('history.subtitle'),
      description: language === 'UA'
        ? 'Жидичинський монастир – це тисячолітня історія святості, боротьби та відродження. Кожен камінь тут дихає молитвою поколінь ченців.'
        : 'Zhydychyn Monastery is a thousand-year history of holiness, struggle, and rebirth. Every stone here breathes the prayer of generations of monks.',
      image: '/media/explore-more-history.jpg',
      href: `${langPrefix}/about/history`,
    },
    {
      title: t('explore.architecture'),
      subtitle: t('page.complex_subtitle'),
      description: language === 'UA'
        ? 'Ансамбль монастиря – це унікальне поєднання архітектури бароко та духовної величі, де кожен храм має свою особливу історію.'
        : 'The monastery ensemble is a unique combination of Baroque architecture and spiritual grandeur, where each temple has its own special history.',
      image: '/media/hero-1.jpg',
      href: `${langPrefix}/about/complex`,
    },
    {
      title: t('explore.sketes'),
      subtitle: t('explore.sketes_subtitle'),
      description: language === 'UA'
        ? 'Скити Жидичинської обителі – це місця особливого усамітнення, тиші та молитовного зосередження серед мальовничої природи.'
        : 'The sketes of the Zhydychyn abode are places of special solitude, silence and prayerful concentration among picturesque nature.',
      image: '/media/explore-more-sketes.jpg',
      href: `${langPrefix}/about/sketes`,
    },
    {
      title: t('explore.media'),
      subtitle: t('page.news_subtitle'),
      description: language === 'UA'
        ? 'Пориньте у життя обителі через світлини, відеоархів та прямі трансляції богослужінь з головного храму.'
        : 'Immerse yourself in the life of the monastery through photographs, video archives, and live broadcasts of services from the main temple.',
      image: '/media/explore-more-media.jpg',
      href: `${langPrefix}/about/media`,
    },
    {
      title: t('explore.social'),
      subtitle: t('page.social_subtitle'),
      description: language === 'UA'
        ? 'Ми продовжуємо місію служіння громаді через волонтерство, освіту, культуру та допомогу тим, хто цього потребує.'
        : 'We continue the mission of serving the community through volunteering, education, culture, and helping those in need.',
      image: '/media/explore-more-social-initiatives.jpeg',
      href: `${langPrefix}/social-projects`,
    },
    {
      title: t('explore.pilgrims'),
      subtitle: t('page.pilgrims_subtitle'),
      description: language === 'UA'
        ? 'Все необхідне для вашого візиту: поради щодо доїзду, замовлення екскурсій та правила перебування в обителі.'
        : 'Everything you need for your visit: travel tips, booking excursions, and rules for staying in the monastery.',
      image: '/media/explore-more-piligrim.jpg',
      href: `${langPrefix}/pilgrims`,
    }
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-amber-600 selection:text-white">
      <PageHeader
        title={t('nav.about')}
        subtitle={t('page.about_subtitle')}
        backgroundImage="/media/about-us.jpg"
      />

      <div className="py-20 lg:py-48 overflow-hidden">
        {sections.map((section, index) => (
          <AboutSection
            key={index}
            section={section}
            index={index}
            language={language}
          />
        ))}
      </div>

      <Footer />
    </main>
  );
}



