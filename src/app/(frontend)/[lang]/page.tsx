import React from 'react'
import { LandingClient } from '@/components/landing/LandingClient'
import { JsonLd } from '@/components/JsonLd';

export const metadata = {
  title: 'Свято-Миколаївський Жидичинський монастир | Головна',
  description: 'Офіційний сайт Свято-Миколаївського Жидичинського монастиря. Духовний центр, історія, новини та служіння.',
  openGraph: {
    title: 'Свято-Миколаївський Жидичинський монастир',
    description: 'Офіційний сайт монастиря. Духовний центр, історія та новини.',
    images: ['/media/pic_1.avif'],
  },
}

export default function HomePage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "PlaceOfWorship",
    "name": "Жидичинський Свято-Миколаївський монастир",
    "image": "https://www.chernectvo.com/media/logo.avif",
    "@id": "https://www.chernectvo.com",
    "url": "https://www.chernectvo.com",
    "telephone": "+38 (067) 104 22 88",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "вул. Ковельська, 1",
      "addressLocality": "с. Жидичин, Луцький р-н",
      "addressRegion": "Волинська область",
      "postalCode": "45240",
      "addressCountry": "UA"
    }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <LandingClient />
    </>
  )
}

