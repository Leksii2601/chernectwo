import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const isUa = lang === 'ua' || lang === 'UA';

    return {
        title: isUa ? 'Архітектурний ансамбль | Свято-Миколаївський Жидичинський монастир' : 'Architectural Ensemble | St. Nicholas Zhydychyn Monastery',
        description: isUa
            ? 'Дізнайтеся про архітектуру та храми Свято-Миколаївського Жидичинського монастиря: Свято-Миколаївський храм, дзвіниця, келії та інші споруди.'
            : 'Learn about the architecture and temples of the St. Nicholas Zhydychyn Monastery: St. Nicholas Church, bell tower, cells, and other structures.',
        openGraph: {
            title: isUa ? 'Архітектурний ансамбль | Свято-Миколаївський Жидичинський монастир' : 'Architectural Ensemble | St. Nicholas Zhydychyn Monastery',
            description: isUa
                ? 'Опис храмів та споруд монастирського комплексу.'
                : 'Description of temples and buildings of the monastery complex.',
            images: ['/media/church-complex.avif'],
        },
    };
}

export default function ComplexLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
