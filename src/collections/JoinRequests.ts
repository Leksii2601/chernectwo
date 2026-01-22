import { CollectionConfig } from 'payload'

export const JoinRequests: CollectionConfig = {
  slug: 'join-requests',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Ім\'я',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Повідомлення',
    },
  ],
}
