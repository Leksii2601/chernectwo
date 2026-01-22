'use client';

import React from 'react'

export const PrintPrayersLink = () => {
    return (
        <div style={{
            position: 'relative',
        }}>
            <a 
                href="/admin-print" 
                target="_blank"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 10px',
                  color: 'var(--theme-elevation-500)',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
            >
                🖨️ Print Prayers
            </a>
        </div>
    )
}
