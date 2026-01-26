'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

export const RefreshYouTubeButton: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string>('');

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/youtube?action=refresh', { 
                method: 'POST' 
            });
            const data = await res.json();
            
            if (res.ok) {
                toast.success('Дані з YouTube успішно оновлено!');
                // Reload window to show new data in admin panel context if needed, 
                // but usually the changing of fields is handled by Payload state. 
                // Since this is an external action, we might just notify.
                if (data.timestamp) {
                    setLastUpdated(new Date().toLocaleTimeString());
                }
            } else {
                toast.error(`Помилка: ${data.error}`);
            }
        } catch (e) {
            toast.error('Помилка з\'єднання з сервером');
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="field-type text mb-4">
            <label className="field-label">Синхронізація YouTube</label>
            <div className="flex bg-stone-100 p-4 rounded border border-stone-200 gap-4 items-center">
                <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={loading}
                    className="btn btn--style-primary btn--size-small"
                    style={{
                        backgroundColor: loading ? '#ccc' : '#e11d48',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    {loading ? 'Оновлення...' : '🔄 Оновити відео зараз'}
                </button>
                <div className="text-sm text-gray-500">
                    <p>Натисніть щоб підтягнути нові відео та видалити старі стріми з кешу.</p>
                    {lastUpdated && <span>Останнє оновлення: {lastUpdated}</span>}
                </div>
            </div>
        </div>
    );
};
