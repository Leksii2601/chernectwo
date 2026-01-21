'use client';
import React from 'react';

export const PrintButton = () => {
    return (
        <div style={{ padding: '20px 0' }}>
            <a 
                href="/api/print-prayers" 
                target="_blank"
                style={{
                    backgroundColor: '#000', 
                    color: 'white',
                    padding: '12px 24px',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    display: 'inline-block',
                    fontSize: '14px'
                }}
                onClick={(e) => {
                    if(!confirm('Увага! Ця дія:\n1. Згенерує PDF файл із 10 записками.\n2. ВИДАЛИТЬ ці записки з бази даних.\n\nПродовжити?')) {
                        e.preventDefault();
                    } else {
                        // Reload page after a delay to show that items are removed
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }
                }}
            >
                🖨️ Друкувати 5 записок (та видалити)
            </a>
        </div>
    );
};
