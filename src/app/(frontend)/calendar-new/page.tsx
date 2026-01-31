import React from 'react';
import { CalendarSectionNew } from '@/components/landing/CalendarSectionNew';

export const metadata = {
    title: 'Церковний Календар (Test)',
    description: 'Розклад богослужінь та церковні свята',
}

export default function CalendarNewPage() {
    return (
        <CalendarSectionNew />
    );
}
