import { PageHeader } from '@/components/PageHeader';
import { PantryFeed } from '@/components/pantry/PantryFeed';
import { Footer } from '@/components/landing/Footer';
import { translations } from '@/data/translations';

export default async function PantryPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = (lang.toUpperCase() as 'UA' | 'EN') || 'UA';
    const t = (key: string) => (translations[locale] as any)[key] || key;

    return (
        <main className="bg-white min-h-screen">
            <PageHeader
                title={t('pantry.title')}
                subtitle={t('pantry.subtitle')}
                backgroundImage="/media/history.jpg"
            />
            <PantryFeed />
            <Footer />
        </main>
    );
}
