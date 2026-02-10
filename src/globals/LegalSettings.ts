import { GlobalConfig } from 'payload';

export const LegalSettings: GlobalConfig = {
    slug: 'legal-settings',
    label: '⚖️ Правові документи',
    access: {
        read: () => true,
    },
    admin: {
        description: 'Налаштування для сторінок Політики конфіденційності, Умов використання та Політики повернення.',
    },
    fields: [
        {
            name: 'setupGuide',
            type: 'ui',
            admin: {
                components: {
                    Field: {
                        path: '@/components/admin/LegalSetupGuide',
                    },
                },
            },
        },
        {
            name: 'companyData',
            type: 'group',
            label: '🏛️ Дані організації',
            admin: {
                description: 'Ці дані використовуються як автоматичні заповнювачі {{LEGAL_ENTITY_NAME}}, {{EDRPOU_CODE}}, {{LEGAL_ADDRESS}}.',
            },
            fields: [
                {
                    name: 'legalEntityName',
                    label: 'Повна юридична назва',
                    type: 'text',
                    required: true,
                    defaultValue: 'Релігійна організація «Свято-Миколаївський Жидичинський чоловічий монастир»',
                },
                {
                    name: 'edrpouCode',
                    label: 'Код ЄДРПОУ',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'legalAddress',
                    label: 'Юридична адреса',
                    type: 'text',
                    required: true,
                    defaultValue: '45240, Волинська область, Луцький р-н, с. Жидичин, вул. Ковельська, 1',
                },
            ],
        },
        {
            name: 'contactDetails',
            type: 'group',
            label: '📧 Контактні дані',
            admin: {
                description: 'Для заповнювача {{CONTACT_EMAIL}}.',
            },
            fields: [
                {
                    name: 'contactEmail',
                    label: 'Email для юридичних запитів',
                    type: 'email',
                    required: true,
                },
            ],
        },
        {
            name: 'technicalProviders',
            type: 'group',
            label: '🔧 Технічні провайдери',
            admin: {
                description: 'Для заповнювачів {{PAYMENT_PROVIDER}}, {{HOSTING_PROVIDER}}, {{ANALYTICS_SERVICES}}.',
            },
            fields: [
                {
                    name: 'paymentProvider',
                    label: 'Платіжний провайдер',
                    type: 'text',
                    defaultValue: 'WayForPay',
                },
                {
                    name: 'hostingProvider',
                    label: 'Хостинг-провайдер',
                    type: 'text',
                    defaultValue: 'Netlify',
                },
                {
                    name: 'analyticsServices',
                    label: 'Сервіси аналітики',
                    type: 'text',
                    defaultValue: 'Google Analytics',
                },
            ],
        },
        {
            name: 'refundParameters',
            type: 'group',
            label: '💰 Параметри повернення',
            admin: {
                description: 'Для заповнювачів {{MAX_REFUND_DAYS}}, {{REFUND_PROCESSING_DAYS}}.',
            },
            fields: [
                {
                    name: 'maxRefundDays',
                    label: 'Максимальний термін (днів)',
                    type: 'number',
                    defaultValue: 14,
                },
                {
                    name: 'refundProcessingDays',
                    label: 'Термін обробки (днів)',
                    type: 'number',
                    defaultValue: 10,
                },
            ],
        },
        {
            name: 'lastUpdatedDate',
            label: '📅 Дата останнього оновлення (для всіх документів)',
            type: 'date',
            required: true,
        },
    ],
};
