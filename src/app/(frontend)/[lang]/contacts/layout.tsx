import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isUa = lang === 'ua' || lang === 'UA';

    return {
        title: isUa ? 'Контакти | Свято-Миколаївський Жидичинський монастир' : 'Contacts | St. Nicholas Zhydychyn Monastery',
        description: isUa
            ? 'Зв’яжіться з нами: телефон, адреса та соціальні мережі Свято-Миколаївського Жидичинського монастиря.'
            : 'Contact us: phone, address, and social media of the St. Nicholas Zhydychyn Monastery.',
        openGraph: {
            title: isUa ? 'Контакти | Свято-Миколаївський Жидичинський монастир' : 'Contacts | St. Nicholas Zhydychyn Monastery',
            description: isUa
                ? 'Наші контакти та розташування на карті.'
                : 'Our contacts and location on the map.',
            images: ['/media/contacts.avif'],
        },
    };
}

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
