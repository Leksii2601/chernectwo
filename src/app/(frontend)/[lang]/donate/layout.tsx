import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isUa = lang === 'ua' || lang === 'UA';

    return {
        title: isUa ? 'Підтримати | Свято-Миколаївський Жидичинський монастир' : 'Donate | St. Nicholas Zhydychyn Monastery',
        description: isUa
            ? 'Долучіться до розбудови та підтримки Свято-Миколаївського Жидичинського монастиря.'
            : 'Join the development and support of the St. Nicholas Zhydychyn Monastery.',
        openGraph: {
            title: isUa ? 'Підтримати | Свято-Миколаївський Жидичинський монастир' : 'Donate | St. Nicholas Zhydychyn Monastery',
            description: isUa
                ? 'Ваша підтримка важлива для нашої святині.'
                : 'Your support is important for our shrine.',
            images: ['/media/donate.avif'],
        },
    };
}

export default function DonateLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
