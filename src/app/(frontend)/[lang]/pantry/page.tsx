import { PantryHeader } from '@/components/pantry/PantryHeader';
import { PantryFeed } from '@/components/pantry/PantryFeed';
import { PantryFooter } from '@/components/pantry/PantryFooter';
import { translations } from '@/data/translations';

export default async function PantryPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = (lang.toUpperCase() as 'UA' | 'EN') || 'UA';
    const t = (key: string) => (translations[locale] as any)[key] || key;

    return (
        <main className="bg-white min-h-screen overflow-x-hidden pt-20">
            <PantryHeader />
            <PantryFeed />
            <PantryFooter />
        </main>
    );
}
