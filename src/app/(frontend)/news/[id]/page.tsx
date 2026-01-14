import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShareButtons } from '@/components/news/ShareButtons';
import { ArrowLeft } from 'lucide-react';
import { NewsGallery } from '@/components/news/NewsGallery';
import { serializeLexical } from '@/utils/serializeRichText';
import { Media, News } from '@/payload-types';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const payload = await getPayload({ config: configPromise });
  let newsItem: News | null = null;
  
  try {
    newsItem = await payload.findByID({
      collection: 'news',
      id: parseInt(id),
    });
  } catch (error) {
    return {
      title: 'Новина не знайдена',
    };
  }

  if (!newsItem) {
      return {
      title: 'Новина не знайдена',
    };
  }

  const getImageUrl = (image: number | Media | null | undefined) => {
    if (!image || typeof image === 'number') return '/media/placeholder.jpg';
    return image.url || '/media/placeholder.jpg';
  };

  const imageUrl = getImageUrl(newsItem.mainImage);

  return {
    title: newsItem.title,
    description: newsItem.shortDescription,
    openGraph: {
      title: newsItem.title,
      description: newsItem.shortDescription,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: newsItem.title,
        },
      ],
      type: 'article',
      publishedTime: newsItem.publishedDate,
    },
    twitter: {
        card: 'summary_large_image',
        title: newsItem.title,
        description: newsItem.shortDescription,
        images: [imageUrl],
    }
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const payload = await getPayload({ config: configPromise });

  let newsItem: News | null = null;
  try {
    newsItem = await payload.findByID({
      collection: 'news',
      id: parseInt(id),
    });
  } catch (_error) {
    return notFound();
  }

  if (!newsItem) return notFound();

  // Helper to get Image URL
  const getImageUrl = (image: number | Media) => {
    if (typeof image === 'number') return '/media/placeholder.jpg';
    return image.url || '/media/placeholder.jpg';
  };

  const mainImage = getImageUrl(newsItem.mainImage);
  
  const categoryMap: Record<string, string> = {
    publications: 'Публікації',
    announcements: 'Анонси',
    official: 'Офіційно',
  };
  
  const displayCategory = categoryMap[newsItem.category] || newsItem.category;

  // Prepare gallery images
  const galleryImages = newsItem.gallery?.map((item) => ({
    url: getImageUrl(item.image),
    caption: item.caption,
  })) || [];

  return (
    <main className="min-h-screen bg-white">
        <div className="bg-black/90 pt-32 pb-6 shadow-lg"> 
           <Header />
        </div>
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
         <Link href="/news" className="inline-flex items-center text-gray-400 hover:text-amber-600 mb-12 transition-colors text-xs font-bold uppercase tracking-widest group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Всі новини
            </Link>
         {/* Top Section: Image Left, Title/Info Right */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
             
             {/* Left Column: Image */}
             <div className="lg:col-span-7">
                <div className="relative h-[500px] md:h-[500px] w-full rounded-sm overflow-hidden shadow-md">
                    <Image
                        src={mainImage}
                        alt={newsItem.title}
                        fill
                        className="object-cover"
                    />
                </div>
             </div>

             {/* Right Column: Title & Meta */}
             <div className="lg:col-span-5 flex flex-col">
                <h1 className="font-molodo text-3xl md:text-4xl lg:text-5xl leading-tight mb-8 text-gray-900">
                    {newsItem.title}
                </h1>

                <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
                    <div className="text-gray-400 text-sm font-bold uppercase tracking-wider">
                        {new Date(newsItem.publishedDate).toLocaleDateString('uk-UA', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                        })}
                    </div>
                    <div className="bg-[#7A3E3E] text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
                        {displayCategory}
                    </div>
                </div>

                <div className="text-lg md:text-xl text-gray-600 font-sans leading-relaxed italic border-l-4 border-amber-500 pl-6">
                    {newsItem.shortDescription}
                </div>
             </div>
         </div>

         {/* Main Content Area */}
         <div className="">

            {/* Content Blocks */}
            <div className="mb-12">
               {newsItem.content?.map((block, index) => {
                  switch (block.blockType) {
                    case 'textBlock':
                      return (
                         <div key={index} className="prose prose-lg prose-amber max-w-none mb-8 font-sans text-gray-800 leading-relaxed">
                             {serializeLexical(block.text)}
                         </div>
                      );
                    case 'largeTextBlock':
                      return (
                        <div key={index} className={`my-12 p-8 md:p-10 border-l-4 rounded-sm ${block.isHighlight ? 'bg-amber-50 border-amber-500' : 'bg-gray-50 border-gray-400'}`}>
                           <p className={`font-molodo text-2xl md:text-3xl leading-snug italic text-center ${block.isHighlight ? 'text-amber-900' : 'text-gray-800'}`}>
                              {block.content}
                           </p>
                        </div>
                      );
                    case 'imageBlock':
                      const imgUrl = getImageUrl(block.image);
                      return (
                        <figure key={index} className="my-12">
                           <div className="relative h-[400px] md:h-[500px] w-full rounded-sm overflow-hidden shadow-lg">
                              <Image 
                                 src={imgUrl} 
                                 alt={block.caption || 'Article image'}
                                 fill
                                 className="object-cover"
                              />
                           </div>
                           {block.caption && (
                             <figcaption className="text-center text-sm text-gray-500 mt-4 font-bold uppercase tracking-wide">
                                {block.caption}
                             </figcaption>
                           )}
                        </figure>
                      );
                    default:
                      return null;
                  }
               })}
            </div>
            
            {/* Gallery / Carousel */}
            {galleryImages.length > 0 && <NewsGallery images={galleryImages} />}
            
            {/* Footer Meta */}
            <div className="border-t border-gray-200 pt-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                    Поширити новину:
                 </div>
                 <ShareButtons title={newsItem.title} />
            </div>

         </div>
      </div>

      <Footer />
    </main>
  );
}