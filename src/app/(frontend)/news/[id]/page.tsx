import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Footer } from '@/components/landing/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShareButtons } from '@/components/news/ShareButtons';
import { ArrowLeft } from 'lucide-react';
import { newsData } from '@/data/newsData';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const newsItem = newsData.find((n) => n.id === id);

  if (!newsItem) {
      return {
      title: 'Новина не знайдена',
    };
  }

  return {
    title: newsItem.title,
    description: newsItem.shortDescription,
    // openGraph: {
    //   title: newsItem.title,
    //   description: newsItem.shortDescription,
    //   images: [newsItem.image],
    // },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const newsItem = newsData.find((n) => n.id === id);

  if (!newsItem) return notFound();

  const mainImage = newsItem.image;
  const displayCategory = newsItem.category;

  return (
    <main className="min-h-screen bg-white">
        <PageHeader title="НОВИНИ" />
      
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
                        {newsItem.date}
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

            {/* Content Blocks (Static HTML) */}
            <div className="mb-12 prose prose-lg prose-amber max-w-none font-sans text-gray-800 leading-relaxed">
                 <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
            </div>

            <div className="border-t border-gray-200 pt-10 mt-20">
                 <h3 className="font-molodo text-2xl mb-8 text-gray-800 text-center uppercase tracking-widest">
                    Поділитися новиною
                 </h3>
                 <div className="flex justify-center">
                    <ShareButtons title={newsItem.title} />
                 </div>
            </div>

         </div>
      </div>
      
      <Footer />
    </main>
  );
}