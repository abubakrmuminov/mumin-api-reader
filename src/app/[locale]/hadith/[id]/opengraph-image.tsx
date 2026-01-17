import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Hadith Detail';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

// Celestial Miracle Colors
const nobleCream = '#fffdf9';
const emeraldRadiant = '#10b981';
const goldSpiritual = '#fbbf24';
const deepForest = '#064e3b';

const patternSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzA2NGUzYiIgZmlsbC1vcGFjaXR5PSIwLjAzIj48cGF0aCBkPSJNMjAgMGw1IDExIDExIDUtMTEgNS01IDExLTUtMTEtMTEtNSAExMS01IDUtMTF6Ii8+PC9nPjwvc3ZnPg==";
const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMlpNMTIgNEwxNi45NSAxMC41TDE5LjUgMTJMMTYuOTUgMTMuNUwxMiAyMEw3LjA1IDEzLjVMMC41IDEyTDcuMDUgMTAuNUwxMiA0WiIgZmlsbD0iIzA2NGUzYiIvPgo8L3N2Zz4=";

async function getHadith(id: string) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.hadith.mumin.ink/v1';
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    try {
        const res = await fetch(`${API_URL}/hadiths/${id}`, {
            headers: {
                'X-API-Key': API_KEY || '',
            },
            next: { revalidate: 86400 }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data || data;
    } catch (e) {
        return null;
    }
}

export default async function Image(props: { params: Promise<{ locale: string; id: string }> }) {
    const params = await props.params;
    const { locale, id } = params;
    const hadith = await getHadith(id);

    if (!hadith) return new Response('Not Found', { status: 404 });

    const rawText = hadith.translation?.text || '';
    const collection = hadith.collection || 'Sahih Collection';
    const num = hadith.hadithNumber;

    // Truncate logic
    const words = rawText.split(' ');
    const truncatedText = words.length > 25
        ? words.slice(0, 25).join(' ') + '...'
        : rawText;

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: nobleCream,
                    padding: '80px',
                    position: 'relative',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${patternSrc})`,
                    backgroundRepeat: 'repeat',
                    zIndex: 0,
                }} />

                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '600px',
                    height: '600px',
                    background: `radial-gradient(circle, ${emeraldRadiant}15 0%, transparent 70%)`,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    zIndex: 1,
                }} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '48px',
                    border: `2px solid rgba(6, 78, 59, 0.08)`,
                    padding: '70px',
                    width: '1000px',
                    boxShadow: '0 30px 60px rgba(6, 78, 59, 0.08)',
                    zIndex: 10,
                    textAlign: 'center',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '45px' }}>
                        <div style={{
                            border: `2px solid ${emeraldRadiant}`,
                            color: emeraldRadiant,
                            padding: '10px 24px',
                            borderRadius: '100px',
                            fontSize: '20px',
                            fontWeight: 800,
                            marginRight: '18px',
                            letterSpacing: '0.05em',
                        }}>
                            {collection.toUpperCase()}
                        </div>
                        <div style={{
                            color: deepForest,
                            fontSize: '24px',
                            fontWeight: 600,
                            opacity: 0.5,
                        }}>
                            {locale === 'ru' ? `Хадис №${num}` : `Hadith #${num}`}
                        </div>
                    </div>

                    <div style={{
                        color: deepForest,
                        fontSize: truncatedText.length > 150 ? '38px' : '48px',
                        lineHeight: 1.4,
                        fontWeight: 700,
                        marginBottom: '45px',
                        display: 'flex',
                        flexDirection: 'column',
                        fontStyle: 'italic',
                    }}>
                        "{truncatedText}"
                    </div>

                    <div style={{
                        width: '140px',
                        height: '5px',
                        background: `linear-gradient(to right, ${emeraldRadiant}, ${goldSpiritual}, ${emeraldRadiant})`,
                        borderRadius: '10px',
                    }} />
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 10,
                    background: 'rgba(255, 255, 255, 0.5)',
                    padding: '12px 24px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(5px)',
                }}>
                    <img src={logoSrc} width="28" height="28" alt="Logo" style={{ marginRight: '15px' }} />
                    <span style={{ color: deepForest, fontSize: '22px', fontWeight: 900, letterSpacing: '0.02em' }}>MUMIN</span>
                    <span style={{ color: deepForest, fontSize: '22px', fontWeight: 300, opacity: 0.5, marginLeft: '12px' }}>hadith.mumin.ink</span>
                </div>
            </div>
        ),
        size
    );
}
