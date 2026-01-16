import { CollectionConfig } from 'payload'

export const MissionaryProjects: CollectionConfig = {
  slug: 'missionary-projects',
  labels: {
    singular: 'Місіонерський проєкт',
    plural: 'Місіонерські проєкти',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'id'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Назва проєкту',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Логотип',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Короткий опис',
      required: true,
    },
    {
      name: 'aboutUs',
      type: 'richText',
      label: 'Про нас',
      required: true,
    },
    {
      name: 'directions',
      type: 'array',
      label: 'Напрямки роботи (Лістинг)',
      fields: [
        {
          name: 'direction',
          type: 'text',
          label: 'Напрямок',
        }
      ]
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Галерея (5 фото)',
      maxRows: 5,
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
        name: 'status',
        type: 'select',
        defaultValue: 'active',
        options: [
            { label: 'Активний', value: 'active' },
            { label: 'Завершений', value: 'completed' }
        ],
        admin: {
            position: 'sidebar'
        }
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Соціальні мережі',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook',
          required: true, 
          defaultValue: 'https://www.facebook.com/',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Телефон',
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp',
        }
      ]
    }
  ],
}
