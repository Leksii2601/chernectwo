// src/collections/News.ts
import { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news', // це буде в URL API: /api/news
  admin: {
    useAsTitle: 'title', // поле, яке буде заголовком в адмінці
  },
  access: {
    read: () => true, // відкрити доступ для всіх (публічний API)
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок новини',
    },
    {
      name: 'content',
      type: 'textarea', // або 'richText' для редактора тексту
      label: 'Текст',
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      label: 'Опублікувати на сайті',
      defaultValue: true,
    },
  ],
}