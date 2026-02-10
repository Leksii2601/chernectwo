import { CollectionConfig } from 'payload';

export const LegalDocuments: CollectionConfig = {
    slug: 'legal-documents',
    admin: {
        useAsTitle: 'titleUA',
        group: '⚖️ Юридичне',
        defaultColumns: ['titleUA', 'slug', 'updatedAt'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'slug',
            label: 'URL Шлаг (напр. privacy)',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'UA - Українська',
                    fields: [
                        {
                            name: 'titleUA',
                            label: 'Заголовок сторінки',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'subtitleUA',
                            label: 'Підзаголовок',
                            type: 'text',
                        },
                        {
                            name: 'sectionsUA',
                            label: 'Розділи документа',
                            type: 'array',
                            fields: [
                                {
                                    name: 'title',
                                    label: 'Заголовок розділу',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'content',
                                    label: 'Текст розділу',
                                    type: 'textarea',
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'EN - English',
                    fields: [
                        {
                            name: 'titleEN',
                            label: 'Page Title',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'subtitleEN',
                            label: 'Subtitle',
                            type: 'text',
                        },
                        {
                            name: 'sectionsEN',
                            label: 'Document Sections',
                            type: 'array',
                            fields: [
                                {
                                    name: 'title',
                                    label: 'Section Title',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'content',
                                    label: 'Section Content',
                                    type: 'textarea',
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
