import Link from 'next/link';

export default function Home() {
    return (
        <div style={{
            padding: '40px',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center'
        }}>
            <h1>Generatore Codici</h1>
            <p>Seleziona una pagina:</p>
            <div style={{ marginTop: '30px' }}>
                <Link href="/dc" style={{
                    display: 'inline-block',
                    margin: '10px',
                    padding: '15px 30px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px'
                }}>
                    Vai a DC
                </Link>
                <Link href="/dta" style={{
                    display: 'inline-block',
                    margin: '10px',
                    padding: '15px 30px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px'
                }}>
                    Vai a DTA
                </Link>
            </div>
        </div>
    );
}