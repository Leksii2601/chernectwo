import { CollectionConfig } from 'payload'

export const PrayerRequests: CollectionConfig = {
  slug: 'prayer-requests',
  labels: {
    singular: 'Записка',
    plural: 'Молитовні записки',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['createdAt', 'type', 'service', 'status'],
  },
  access: {
    create: () => true, // Anyone can submit
    read: () => true, // Ideally restrict this in production
  },
  fields: [
    {
      name: 'type',
      label: 'Тип записки',
      type: 'select',
      options: [
        { label: 'За Здоров\'я', value: 'health' },
        { label: 'За Упокій', value: 'repose' },
      ],
      required: true,
    },
    {
      name: 'service',
      label: 'Вид пожертви',
      type: 'text',
      required: true,
    },
    {
      name: 'names',
      label: 'Імена',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      name: 'email',
      label: 'Email користувача',
      type: 'email',
      required: true,
    },
    {
      name: 'amount',
      label: 'Сума пожертви',
      type: 'number',
    },
    {
      name: 'status',
      label: 'Статус оплати',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Очікує', value: 'pending' },
        { label: 'Оплачено', value: 'paid' },
        { label: 'Відхилено', value: 'failed' },
        { label: 'Роздруковано', value: 'printed' },
      ],
    },
    {
        name: 'printedAt',
        label: 'Дата друку',
        type: 'date',
        admin: {
            readOnly: true
        }
    }
  ],
}
