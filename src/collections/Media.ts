import type { CollectionConfig } from 'payload'
import sharp from 'sharp'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' || operation === 'update') {
          if (req.file) {
            const file = req.file
            // Convert to AVIF if it's an image and not already AVIF (or even if it is, to standardize/optimize)
            if (file.mimetype.startsWith('image/') && file.mimetype !== 'image/svg+xml') {
                try {
                    const buffer = await sharp(file.data)
                        .avif({ quality: 65, effort: 2 }) // Balance speed/quality
                        .toBuffer()

                    req.file.data = buffer
                    req.file.mimetype = 'image/avif'
                    
                    // Replace extension in filename
                    const originalName = file.name
                    const nameParts = originalName.split('.')
                    if (nameParts.length > 1) {
                        nameParts.pop()
                    }
                    req.file.name = `${nameParts.join('.')}.avif`
                    
                    // Update size
                    req.file.size = buffer.length
                } catch (err) {
                    console.error('Error converting image to AVIF:', err)
                    // Continue with original file if conversion fails
                }
            }
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
