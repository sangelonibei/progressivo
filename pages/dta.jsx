import { useState } from 'react';

export default function DTAPage() {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/generate/dta', {
                method: 'POST'
            });
            const data = await response.json();
            setValue(data.value);
            setShowDialog(true);
        } catch (error) {
            alert('Errore: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Generatore DTA</h1>
            <button
                onClick={handleGenerate}
                disabled={loading}
                style={{
                    padding: '15px 30px',
                    fontSize: '18px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1
                }}
            >
                {loading ? 'Generazione...' : 'Genera'}
            </button>

            {showDialog && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '12px',
                        maxWidth: '400px',
                        width: '90%'
                    }}>
                        <h2>Codice Generato</h2>
                        <p style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#0070f3',
                            marginTop: '20px',
                            marginBottom: '20px'
                        }}>{value}</p>
                        <button
                            onClick={() => setShowDialog(false)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#333',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}