import React from 'react';
import { notFound } from 'next/navigation';
import { pantryProducts } from '@/data/pantryData';
import { PantryFooter } from '@/components/pantry/PantryFooter';
import { PantryHeader } from '@/components/pantry/PantryHeader';
import { ProductDetail } from '@/components/pantry/ProductDetail';

export default async function ProductPage({ params }: { params: Promise<{ lang: string, id: string }> }) {
    const { lang, id } = await params;
    const product = pantryProducts.find(p => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen overflow-x-hidden pt-20">
            <PantryHeader isProductPage={true} />

            <ProductDetail product={product} />

            <PantryFooter />
        </main>
    );
}
