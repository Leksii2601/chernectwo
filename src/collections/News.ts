// src/collections/News.ts
import { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', 'category', 'isPublished'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Дата публікації',
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категорія',
      options: [
        { label: 'Публікації', value: 'publications' },
        { label: 'Анонси', value: 'announcements' },
        { label: 'Офіційно', value: 'official' },
      ],
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Короткий опис (для списку)',
      required: true,
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Головне фото',
      required: true,
    },
    {
      name: 'content',
      type: 'blocks',
      label: 'Конструктор новини',
      required: true,
      blocks: [
        {
          slug: 'textBlock',
          labels: { singular: 'Текстовий блок', plural: 'Текстові блоки' },
          fields: [
            {
              name: 'text',
              type: 'richText',
              label: 'Текст',
              required: true,
            },
          ],
        },
        {
          slug: 'largeTextBlock',
          labels: { singular: 'Великий текст (Цитата)', plural: 'Великі тексти' },
          fields: [
             {
              name: 'content',
              type: 'textarea',
              label: 'Текст',
              required: true,
             },
             {
               name: 'isHighlight',
               type: 'checkbox',
               label: 'Виділити кольором (акцент)',
               defaultValue: false,
             }
          ]
        },
        {
           slug: 'imageBlock',
           labels: { singular: 'Зображення в тексті', plural: 'Зображення' },
           fields: [
             {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                required: true,
             },
             {
                name: 'caption',
                type: 'text',
                label: 'Підпис',
             }
           ]
        }
      ]
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Фотогалерея (карусель)',
      admin: {
        description: 'Опціонально: додайте фотографії для каруселі',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Фото',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Підпис',
        },
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      label: 'Опублікувати',
      defaultValue: true,
    },
  ],
}