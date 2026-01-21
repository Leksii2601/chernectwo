import type { CollectionConfig } from 'payload'

export const PhotoReports: CollectionConfig = {
  slug: 'photo-reports',
  labels: {
    singular: 'Фоторепортаж',
    plural: 'Фоторепортажі',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Назва події / Служби',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Дата проведення',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Головне фото (обкладинка)',
    },
    {
        name: 'gallery',
        type: 'array',
        label: 'Фотографії',
        minRows: 1,
        fields: [
            {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                required: true,
            }
        ]
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Короткий опис',
    },
  ],
}
