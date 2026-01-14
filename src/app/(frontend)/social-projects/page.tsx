import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { FloatingButton } from '@/components/landing/FloatingButton';
import '../styles.css'; // Just in case, usually in layout
import { SocialProjectsFeed, Initiative } from '@/components/social/SocialProjectsFeed';
import { Media } from '@/payload-types';

export const metadata = {
  title: 'Місіонерські Проєкти - Жидичинський Монастир',
  description: 'Соціальні та місіонерські проєкти Жидичинського монастиря: волонтерство, освіта, культура, допомога громаді.',
}

export const revalidate = 60;

// Helper to extract text from Lexical JSON
const extractTextFromRichText = (richText: any): string => {
    if (!richText) return '';
    if (typeof richText === 'string') return richText;
    
    let text = '';
    if (richText.root && richText.root.children) {
        const traverse = (node: any) => {
            if (node.text) {
                text += node.text;
            }
            if (node.children) {
                node.children.forEach(traverse);
            }
            // Add newlines for paragraphs/blocks if needed (simplified)
            if (node.type === 'paragraph' || node.type === 'heading') {
                text += '\n\n';
            }
        };
        richText.root.children.forEach(traverse);
    }
    return text.trim();
};

const staticInitiatives: Initiative[] = [
  {
    title: "ЖИДИЧИН ЦЕНТР",
    fullTitle: "Жидичин Центр",
    description: "Інституція, що забезпечує екскурсійний супровід паломників та комунікацію з відвідувачами обителі.",
    fullDescription: "Центр функціонує з 2019 року та забезпечує розвиток історичної, культурної та духовної спадщини Древнього Жидичина. Місія інституції - відкриваємо Древній Жидичин цілому світу.",
    directions: [
      "Прийом паломників і гостей",
      "Дослідження та осмислення спадщини",
      "Комунікація, маркетинг і промоція",
      "Соціальні й освітні ініціативи"
    ],
    status: "реалізовано",
    icon: "/media/socialInitiatives/Жидичин_центр-removebg-preview.png",
    gallery: [
      "/media/hero-1.jpg",
      "/media/hero-2.png",
      "/media/hero-3.jpg"
    ]
  },
  {
    title: "ВОЛОНТЕРСЬКИЙ РУХ ІМ. СИМОНА КИРИНЕЙСЬКОГО",
    fullTitle: "Волонтерський рух ім. Симона Киринейського",
    description: "Координація та допомога прихожанам під час богослужінь, організація благодійних ярмарків.",
    fullDescription: "Волонтерський рух функціонує з 2021 року та об’єднує активних вірян довкола питань турботи про духовні, соціальні та фізичні потреби громади.",
    directions: [
      "Консультації та комунікації з прихожанами",
      "Медична допомога під час богослужінь",
      "Організація благодійних ярмарків",
      "Реабілітація військових"
    ],
    status: "діючий",
    icon: "/media/socialInitiatives/Волотерський_рух-removebg-preview.jpg", 
    gallery: [
       "/media/hero-2.png",
       "/media/hero-5.jpg"
    ]
  },
  {
    title: "САДИ АРХІМАНДРІЇ",
    fullTitle: "Сади Архімандрії",
    description: "Відновлення історичних садів монастиря як простору для молитви, праці та відпочинку.",
    fullDescription: "Відновлення історичних садів монастиря як простору для молитви, праці та відпочинку. Сад стане місцем проведення освітніх заходів з екології та садівництва.",
    status: "в процесі",
    icon: "/media/socialInitiatives/Сади_архімандрії__1_-removebg-preview.png",
    gallery: [
       "/media/hero-2.png",
       "/media/hero-1.jpg"
    ]
  }
];

export default async function SocialProjectsPage() {
  const payload = await getPayload({ config: configPromise });

  const projectsResult = await payload.find({
    collection: 'missionary-projects',
    where: {
        status: { equals: 'active' } 
    },
    limit: 100,
  });

  const formattedInitiatives: Initiative[] = projectsResult.docs.map((doc) => {
    // 1. Logo
    let iconUrl = '/media/placeholder.jpg';
    if (doc.logo && typeof doc.logo !== 'number') {
        iconUrl = (doc.logo as Media).url || iconUrl;
    }

    // 2. Gallery
    const galleryUrls: string[] = [];
    if (doc.gallery && Array.isArray(doc.gallery)) {
        doc.gallery.forEach(item => {
            if (item.image && typeof item.image !== 'number') {
                const url = (item.image as Media).url;
                if (url) galleryUrls.push(url);
            }
        });
    }

    // 3. Directions
    const directionList: string[] = [];
    if (doc.directions && Array.isArray(doc.directions)) {
        doc.directions.forEach(d => {
            if (d.direction) directionList.push(d.direction);
        });
    }

    return {
        title: doc.title,
        fullTitle: doc.title,
        description: doc.shortDescription,
        // Extract text string from RichText JSON
        fullDescription: extractTextFromRichText(doc.aboutUs), 
        icon: iconUrl,
        directions: directionList,
        gallery: galleryUrls,
        status: doc.status || 'active',
        author: 'Монастирська спільнота',
        grantAmount: '-',
        term: 'Постійно',
        goal: ''
    };
  });

  // Combine static and dynamic initiatives
  const allInitiatives = [...staticInitiatives, ...formattedInitiatives];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Parallax */}
      <section 
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: 'url(/media/social-iniviatives.jpeg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 font-molodo text-5xl md:text-7xl text-white text-center tracking-wider px-4">
          МІСІОНЕРСЬКІ ПРОЄКТИ
        </h1>
      </section>

      <SocialProjectsFeed initiatives={allInitiatives} />

      <Footer />
      <FloatingButton />
    </main>
  );
}
