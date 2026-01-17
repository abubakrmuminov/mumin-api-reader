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

// Direct SVG path for logo
const LogoPath = () => (
    <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4L16.95 10.5L19.5 12L16.95 13.5L12 20L7.05 13.5L4.5 12L7.05 10.5L12 4Z"
        fill={deepForest}
    />
);

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
                }}
            >
                {/* Background Pattern */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', opacity: 0.03 }}>
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="stars-detail" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M50 15l5 15 15 5-15 5-5 15-5-15-15-5 15-5z" fill={deepForest} />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#stars-detail)" />
                    </svg>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '800px',
                    height: '800px',
                    background: `radial-gradient(circle, ${emeraldRadiant}15 0%, transparent 70%)`,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                }} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'white',
                    borderRadius: '48px',
                    border: `2px solid rgba(6, 78, 59, 0.1)`,
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
                            display: 'flex',
                        }}>
                            {hadith.collection.toUpperCase()}
                        </div>
                        <div style={{
                            color: deepForest,
                            fontSize: '24px',
                            fontWeight: 600,
                            opacity: 0.5,
                            display: 'flex',
                        }}>
                            {locale === 'ru' ? `Хадис №${num}` : `Hadith #${num}`}
                        </div>
                    </div>

                    <div style={{
                        color: deepForest,
                        fontSize: truncatedText.length > 150 ? '34px' : '44px',
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
                        display: 'flex',
                    }} />
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 10,
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '12px 24px',
                    borderRadius: '20px',
                }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" style={{ marginRight: '15px' }}>
                        <LogoPath />
                    </svg>
                    <span style={{ color: deepForest, fontSize: '22px', fontWeight: 900, letterSpacing: '0.02em', display: 'flex' }}>MUMIN</span>
                    <span style={{ color: deepForest, fontSize: '22px', fontWeight: 300, opacity: 0.5, marginLeft: '12px', display: 'flex' }}>hadith.mumin.ink</span>
                </div>
            </div>
        ),
        size
    );
}