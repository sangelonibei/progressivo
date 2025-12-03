import { kv } from '@vercel/kv';
import { incrementCounter } from '../lib/counter';

export default async function handler(req, res) {
    // Abilita CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        // Recupera il valore attuale da Vercel KV
        let currentValue = await kv.get('counter:DTA');

        // Se non esiste, inizializza
        if (!currentValue) {
            currentValue = '000131-DTA-2025';
            await kv.set('counter:DTA', currentValue);
        }

        // Incrementa il valore
        const newValue = incrementCounter(currentValue);

        // Salva il nuovo valore in KV
        await kv.set('counter:DTA', newValue);

        return res.status(200).json({
            success: true,
            value: newValue
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}