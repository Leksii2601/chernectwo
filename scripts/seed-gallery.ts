
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const seedGallery = async () => {
    const payload = await getPayload({ config: configPromise })

    console.log('--- SEEDING PHOTO REPORTS ---')

    // Find existing media to use
    // In a real scenario, we might upload specific files, but here we reuse existing ones
    // We look for 'pic_1.avif', 'hero-1.avif' etc. which were hopefully seeded or exist
    
    // Helper to find media by filename
    const findMedia = async (filename: string) => {
        const result = await payload.find({
            collection: 'media',
            where: {
                filename: {
                    contains: filename,
                },
            },
            limit: 1,
        });
        return result.totalDocs > 0 ? result.docs[0].id : null;
    };

    // Get some media IDs
    const coverId = await findMedia('piligrims'); // Use pilgrims as cover
    const galleryId1 = await findMedia('hero-1');
    const galleryId2 = await findMedia('hero-2');
    const galleryId3 = await findMedia('pic_1');

    if (!coverId) {
        console.warn('Could not find cover image (piligrims), skipping seed.');
        process.exit(0);
    }

    const galleryImages = [galleryId1, galleryId2, galleryId3].filter(id => id !== null).map(id => ({ image: id }));

    if (galleryImages.length === 0) {
        // Fallback if no gallery images found
        galleryImages.push({ image: coverId });
    }

    const reports = [
        {
            title: 'Святкове Богослужіння на Різдво',
            date: '2025-01-07',
            coverImage: coverId,
            gallery: galleryImages,
            status: 'published'
        },
        {
            title: 'День відкритих дверей у недільній школі',
            date: '2025-09-01',
            coverImage: galleryId1 || coverId,
            gallery: galleryImages,
            status: 'published'
        }
    ];

    for (const report of reports) {
        const existing = await payload.find({
            collection: 'photo-reports',
            where: {
                title: {
                    equals: report.title,
                },
            },
        });

        if (existing.totalDocs === 0) {
            console.log(`Creating photo report: ${report.title}`);
            await payload.create({
                collection: 'photo-reports',
                data: report as any,
            });
        } else {
            console.log(`Photo report already exists: ${report.title}`);
        }
    }

    console.log('--- SEEDING COMPLETE ---')
    process.exit(0)
}

seedGallery().catch((err) => {
    console.error(err);
    process.exit(1);
})
