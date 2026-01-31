
import type { NextApiRequest, NextApiResponse } from 'next';
import { calculateDynamicReadings, DayReadings } from '../../../calendar_v2/LiturgicalEngine';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<DayReadings | { error: string }>
) {
    const { date } = req.query;

    if (!date || typeof date !== 'string') {
        return res.status(400).json({ error: 'Date parameter is required (YYYY-MM-DD)' });
    }

    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const readings = calculateDynamicReadings(d);
        res.status(200).json(readings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
