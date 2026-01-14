
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const seed = async () => {
  const payload = await getPayload({ config: configPromise })

  console.log('--- SEEDING DATABASE ---')

  // 1. Create Media from existing files in public/media
  const mediaDir = path.resolve(__dirname, '../public/media')
  const mediaFiles = ['news-1.png', 'news-2.png', 'news-3.png', 'news-4.png', 'hero-1.jpg', 'hero-2.png']
  
  const mediaDocs = []

  // Clean DB first (optional, but good for testing)
  // await payload.delete({ collection: 'news', where: {} }) 
  // await payload.delete({ collection: 'media', where: {} })

  console.log('Creating Media...')
  for (const file of mediaFiles) {
    const filePath = path.join(mediaDir, file)
    if (fs.existsSync(filePath)) {
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `Image ${file}`,
        },
        file: {
          data: fs.readFileSync(filePath),
          name: file,
          mimetype: file.endsWith('png') ? 'image/png' : 'image/jpeg',
          size: fs.statSync(filePath).size,
        },
      })
      mediaDocs.push(mediaDoc)
      console.log(`Created media: ${file} (ID: ${mediaDoc.id})`)
    } else {
      console.warn(`File not found: ${filePath}`)
    }
  }

  if (mediaDocs.length === 0) {
    console.error('No media created. Cannot create news with images.')
    return
  }

  // Helper for simple RichText
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createRichText = (text: any) => ({
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: text,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  })

  // 2. Create News
  const newsData = [
    {
      title: 'Велике Свято у Монастирі',
      publishedDate: new Date().toISOString(),
      category: 'publications',
      shortDescription: 'Сьогодні відзначаємо велике свято з урочистою літургією та хресною ходою.',
      content: [
        {
          blockType: 'textBlock',
          text: createRichText('Сьогодні відзначаємо велике свято з урочистою літургією та хресною ходою. Прийшло багато вірян.'),
        },
        {
          blockType: 'largeTextBlock',
          content: '«Це великий день для нашої обителі, що об’єднує серця у спільній молитві» — Намісник монастиря.',
          isHighlight: true
        },
        {
          blockType: 'textBlock',
          text: createRichText('Після літургії відбулося освячення води та святкова трапеза для прочан.'),
        }
      ],
      mainImage: mediaDocs[0].id,
      gallery: [
         { image: mediaDocs[1].id, caption: 'Хресна хода' },
         { image: mediaDocs[2].id, caption: 'Освячення води' }
      ]
    },
    {
      title: 'Розклад Богослужінь на тиждень',
      publishedDate: new Date(Date.now() - 86400000).toISOString(), 
      category: 'announcements',
      shortDescription: 'Оновлено розклад богослужінь на поточний тиждень. Запрошуємо до спільної молитви.',
      content: [
         {
          blockType: 'textBlock',
          text: createRichText('Понеділок: 08:00 - Літургія. Вівторок: 17:00 - Вечірня.'),
         }
      ],
      mainImage: mediaDocs[3].id,
      gallery: []
    },
    {
      title: 'Звіт про соціальне служіння',
      publishedDate: new Date(Date.now() - 172800000).toISOString(),
      category: 'official',
      shortDescription: 'Братія монастиря відвідала дитячий будинок та передала подарунки.',
      content: [
         {
            blockType: 'largeTextBlock',
            content: 'Милосердя — це діяльна любов.',
            isHighlight: false
         },
         {
            blockType: 'textBlock',
            text: createRichText('Звіт про поїздку до дитячого будинку. Було передано одяг, їжу та іграшки.'),
         }
      ],
      mainImage: mediaDocs[4] ? mediaDocs[4].id : mediaDocs[0].id,
      gallery: [
         { image: mediaDocs[0].id, caption: 'Роздача подарунків' }
      ]
    },
    {
      title: 'Архієрейський візит',
      publishedDate: new Date(Date.now() - 259200000).toISOString(),
      category: 'publications', 
      shortDescription: 'Монастир відвідав Блаженніший Митрополит Епіфаній.',
      content: [
         {
           blockType: 'textBlock',
           text: createRichText('Урочиста зустріч предстоятеля. Спільна молитва за Україну.'),
         },
         {
            blockType: 'imageBlock',
            image: mediaDocs[1].id,
            caption: 'Зустріч біля воріт'
         }
      ],
      mainImage: mediaDocs[1].id,
    }
  ]


  console.log('Creating News...')
  for (const item of newsData) {
    // Check if category needs mapping in the seed script or if DB accepts the seed values directly.
    // In News.ts options: 'monastery-life', 'holidays', 'announcements'
    // My seed data uses 'holidays', 'announcements', 'monastery-life' (corrected from publications/official which were old values)
    
    await payload.create({
      collection: 'news',
      data: {
          ...item,
          content: item.content as any, // Bypass TS check for simple RichText structure
      } as any,
    })
    console.log(`Created news: ${item.title}`)
  }

  console.log('--- SEEDING COMPLETE ---')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
