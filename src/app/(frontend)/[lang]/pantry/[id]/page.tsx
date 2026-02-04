import React from 'react';
import { notFound } from 'next/navigation';
import { pantryProducts } from '@/data/pantryData';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { ProductDetail } from '@/components/pantry/ProductDetail';

export default async function ProductPage({ params }: { params: Promise<{ lang: string, id: string }> }) {
    const { lang, id } = await params;
    const product = pantryProducts.find(p => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen">
            <div className="bg-black">
                <Header variant="burger" />
            </div>

            <div className="pt-24 md:pt-12">
                <ProductDetail product={product} />
            </div>

            <Footer />
        </main>
    );
}
