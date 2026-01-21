import { GlobalConfig } from 'payload';

export const LiveStream: GlobalConfig = {
  slug: 'live-stream',
  label: 'Пряма Трансляція',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'isManuallyLive',
          label: '🔴 Ефір зараз (Примусово)',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Вкючити негайно, ігноруючи будь-який розклад',
          },
        },
        {
            name: 'enableSundaySchedule',
            label: '📅 Автоматичний розклад (Неділя)',
            type: 'checkbox',
            defaultValue: true,
        },
      ],
    },
    {
        name: 'plannedEvent',
        type: 'group',
        label: 'Зміна в розкладі / Запланована трансляція',
        admin: {
            description: 'Вкажіть дату та час для разової трансляції. Це спрацює автоматично у вказаний період.',
        },
        fields: [
             {
                type: 'row',
                fields: [
                    {
                        name: 'startTime',
                        label: 'Дата та час початку',
                        type: 'date',
                        admin: {
                            date: {
                                pickerAppearance: 'dayAndTime',
                            },
                        },
                    },
                    {
                        name: 'endTime',
                        label: 'Дата та час завершення',
                        type: 'date',
                        admin: {
                            date: {
                                pickerAppearance: 'dayAndTime',
                            },
                        },
                    },
                ]
             }
        ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sundayStartTime',
          label: 'Неділя: Початок (HH:MM)',
          type: 'text',
          defaultValue: '09:30',
          admin: {
            condition: (_, siblingData) => siblingData?.enableSundaySchedule,
            width: '50%',
          },
        },
        {
          name: 'sundayEndTime',
          label: 'Неділя: Кінець (HH:MM)',
          type: 'text',
          defaultValue: '12:30',
          admin: {
            condition: (_, siblingData) => siblingData?.enableSundaySchedule,
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'youtubeLink',
      label: 'Посилання на трансляцію / Канал',
      type: 'text',
      required: true,
      defaultValue: 'https://www.youtube.com/@chernectvo_volyni',
      admin: {
        description: 'Посилання, куди перенаправляти користувачів',
      },
    },
    {
      name: 'channelID',
      label: 'YouTube Channel ID (для плеєра)',
      type: 'text',
      required: true,
      defaultValue: 'UC...',
      admin: {
          description: 'Обов\'язково для відображення відео на сайті. Має починатися з "UC". (Наприклад: UCn_sI5a6yX0n5s8d6X7yX8A). Щоб дізнатися ID, відкрийте код сторінки каналу і знайдіть "channelId".',
      }
    },
    {
        name: 'message',
        label: 'Повідомлення для користувача',
        type: 'text',
        defaultValue: 'Зараз триває пряма трансляція богослужіння',
    }
  ],
};
