import { get } from '@vercel/edge-config';

export const config = {
    runtime: 'edge',
};

function parseValue(value) {
    // Esempio: "DC-90319-2025" -> { tag: "DC", progressive: 90319, year: 2025 }
    const match = value.match(/^([A-Z]+)-(\d+)-([A-Z]*)-?(\d{4})$/);

    if (match) {
        // Formato: TAG-NUM-TAG-YEAR (es: "000131-DTA-2025")
        return {
            tagPrefix: match[1],
            progressive: parseInt(match[2], 10),
            tagSuffix: match[3],
            year: parseInt(match[4], 10),
            format: 'prefix-num-suffix-year'
        };
    }

    const match2 = value.match(/^([A-Z]+)-(\d+)-(\d{4})$/);
    if (match2) {
        // Formato: TAG-NUM-YEAR (es: "DC-90319-2025")
        return {
            tag: match2[1],
            progressive: parseInt(match2[2], 10),
            year: parseInt(match2[3], 10),
            format: 'tag-num-year'
        };
    }

    throw new Error('Formato valore non riconosciuto');
}

function formatValue(parsed) {
    if (parsed.format === 'prefix-num-suffix-year') {
        const paddedNum = String(parsed.progressive).padStart(6, '0');
        return `${paddedNum}-${parsed.tagSuffix}-${parsed.year}`;
    } else {
        return `${parsed.tag}-${parsed.progressive}-${parsed.year}`;
    }
}

function incrementValue(value) {
    const parsed = parseValue(value);
    const currentYear = new Date().getFullYear();

    // Incrementa il progressivo
    parsed.progressive += 1;

    // Aggiorna l'anno se è cambiato (ma il progressivo continua)
    if (parsed.year !== currentYear) {
        parsed.year = currentYear;
    }

    return formatValue(parsed);
}

export default async function handler(request) {
    const url = new URL(request.url);
    const type = url.pathname.split('/').pop();

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        // Leggi il valore corrente da Edge Config
        const currentValue = await get(type);

        if (!currentValue) {
            return new Response(JSON.stringify({ error: 'Valore non trovato' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Incrementa il valore
        const newValue = incrementValue(currentValue);

        // Aggiorna Edge Config
        const edgeConfigId = process.env.EDGE_CONFIG_ID;
        const token = process.env.VERCEL_API_TOKEN;

        const updateResponse = await fetch(
            `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: [
                        {
                            operation: 'update',
                            key: type,
                            value: newValue
                        }
                    ]
                })
            }
        );

        if (!updateResponse.ok) {
            throw new Error('Errore aggiornamento Edge Config');
        }

        return new Response(JSON.stringify({ value: newValue }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}