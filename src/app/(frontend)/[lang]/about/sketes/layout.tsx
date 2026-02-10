import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isUa = lang === 'ua' || lang === 'UA';

    return {
        title: isUa ? 'Скити монастиря | Свято-Миколаївський Жидичинський монастир' : 'Monastery Sketes | St. Nicholas Zhydychyn Monastery',
        description: isUa
            ? 'Відвідайте скити Свято-Миколаївської Жидичинської обителі: місця молитви, тиші та духовного усамітнення.'
            : 'Visit the sketes of the St. Nicholas Zhydychyn Monastery: places of prayer, silence, and spiritual solitude.',
        openGraph: {
            title: isUa ? 'Скити монастиря | Свято-Миколаївський Жидичинський монастир' : 'Monastery Sketes | St. Nicholas Zhydychyn Monastery',
            description: isUa
                ? 'Духовні осередки та скити нашої обителі.'
                : 'Spiritual centers and sketes of our monastery.',
            images: ['/media/sketes.avif'],
        },
    };
}

export default function SketesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
