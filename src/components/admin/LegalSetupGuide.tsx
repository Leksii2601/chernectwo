import React from 'react';

const LegalSetupGuide: React.FC = () => {
    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#fffbeb',
            border: '1px solid #fcd34d',
            borderRadius: '8px',
            marginBottom: '20px',
            fontFamily: 'sans-serif'
        }}>
            <h3 style={{ color: '#92400e', marginTop: 0 }}>ℹ️ Як працює юридична система</h3>
            <p style={{ color: '#b45309', fontSize: '14px', lineHeight: '1.5' }}>
                Ми впровадили нову систему <strong>динамічних юридичних документів</strong>. Тепер ви можете самостійно додавати та редагувати будь-які правові сторінки через колекцію <strong>Legal Documents</strong>.
            </p>

            <h4 style={{ color: '#92400e', marginBottom: '8px' }}>🧩 Доступні заповнювачі (Placeholders):</h4>
            <ul style={{ color: '#b45309', fontSize: '13px', paddingLeft: '20px' }}>
                <li><code>{'{'}{'{'}LEGAL_ENTITY_NAME{'}'}{'}'}</code> — Назва організації</li>
                <li><code>{'{'}{'{'}EDRPOU_CODE{'}'}{'}'}</code> — Код ЄДРПОУ</li>
                <li><code>{'{'}{'{'}LEGAL_ADDRESS{'}'}{'}'}</code> — Юридична адреса</li>
                <li><code>{'{'}{'{'}CONTACT_EMAIL{'}'}{'}'}</code> — Email для запитів</li>
                <li><code>{'{'}{'{'}PAYMENT_PROVIDER{'}'}{'}'}</code> — Сервіс оплати (напр. WayForPay)</li>
                <li><code>{'{'}{'{'}HOSTING_PROVIDER{'}'}{'}'}</code> — Хостинг (напр. Netlify)</li>
                <li><code>{'{'}{'{'}ANALYTICS_SERVICES{'}'}{'}'}</code> — Аналітика (напр. Google Analytics)</li>
                <li><code>{'{'}{'{'}MAX_REFUND_DAYS{'}'}{'}'}</code> — Термін повернення</li>
                <li><code>{'{'}{'{'}DATE{'}'}{'}'}</code> — Дата останнього оновлення</li>
            </ul>

            <p style={{ color: '#b45309', fontSize: '13px', fontStyle: 'italic', marginTop: '10px' }}>
                Використовуйте ці коди в текстах документів, і вони будуть автоматично замінені на реальні дані з цієї вкладки.
            </p>
        </div>
    );
};

export default LegalSetupGuide;
