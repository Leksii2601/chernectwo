import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isUa = lang === 'ua' || lang === 'UA';

    return {
        title: isUa ? 'Розклад богослужінь | Свято-Миколаївський Жидичинський монастир' : 'Service Schedule | St. Nicholas Zhydychyn Monastery',
        description: isUa
            ? 'Розклад щоденних та святкових богослужінь у храмах Свято-Миколаївського Жидичинського монастиря.'
            : 'Schedule of daily and festive services in the temples of the St. Nicholas Zhydychyn Monastery.',
        openGraph: {
            title: isUa ? 'Розклад богослужінь | Свято-Миколаївський Жидичинський монастир' : 'Service Schedule | St. Nicholas Zhydychyn Monastery',
            description: isUa
                ? 'Дізнайтеся час проведення служб.'
                : 'Find out the time of services.',
            images: ['/media/schedule_hero.avif'],
        },
    };
}

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
