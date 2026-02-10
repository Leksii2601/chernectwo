import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isUa = lang === 'ua' || lang === 'UA';

    return {
        title: isUa ? 'Медіа | Свято-Миколаївський Жидичинський монастир' : 'Media | St. Nicholas Zhydychyn Monastery',
        description: isUa
            ? 'Фотогалерея, відеоархів та прямі трансляції богослужінь Свято-Миколаївського Жидичинського монастиря.'
            : 'Photo gallery, video archive, and live broadcasts of services at the St. Nicholas Zhydychyn Monastery.',
        openGraph: {
            title: isUa ? 'Медіа | Свято-Миколаївський Жидичинський монастир' : 'Media | St. Nicholas Zhydychyn Monastery',
            description: isUa
                ? 'Світлини, відео та трансляції з життя обителі.'
                : 'Photos, videos, and broadcasts from the life of the monastery.',
            images: ['/media/gallery.avif'],
        },
    };
}

export default function MediaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
