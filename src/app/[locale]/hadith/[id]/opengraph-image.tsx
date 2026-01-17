import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Hadith Detail';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

async function getHadith(id: string) {
    const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.hadith.mumin.ink';
    try {
        const res = await fetch(`${API_URL}/hadiths/${id}`);
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        console.error('OG Image Fetch Exception:', e);
        return null;
    }
}

export default async function Image(props: { params: Promise<{ locale: string; id: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const hadith = await getHadith(params.id);

    // Celestial Miracle Colors
    const nobleCream = '#fffdf9';
    const emeraldRadiant = '#10b981';
    const goldSpiritual = '#fbbf24';
    const tealEthereal = '#2dd4bf';
    const indigoSoft = '#818cf8';
    const deepForest = '#064e3b';

    const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMlpNMTIgNEwxNi45NSAxMC41TDE5LjUgMTJMMTYuOTUgMTMuNUwxMiAyMEw3LjA1IDEzLjVMMC41IDEyTDcuMDUgMTAuNUwxMiA0WiIgZmlsbD0iIzA2NGUzYiIvPgo8L3N2Zz4=";

    if (!hadith) {
        return new ImageResponse(
            <div style={{ width: 1200, height: 630, background: nobleCream, color: deepForest, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                Hadith Not Found
            </div>
        );
    }

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: nobleCream,
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* 1. LAYERED LIGHT MESH */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', background: nobleCream }} />

                <div style={{
                    position: 'absolute', top: '-10%', right: '-10%', width: '100%', height: '100%',
                    background: `radial-gradient(circle, ${emeraldRadiant} 0%, transparent 70%)`, opacity: 0.15, display: 'flex'
                }} />

                <div style={{
                    position: 'absolute', bottom: '-20%', left: '-10%', width: '70%', height: '70%',
                    background: `radial-gradient(circle, ${goldSpiritual} 0%, transparent 70%)`, opacity: 0.15, display: 'flex'
                }} />

                {/* 2. SIDEBAR CONTENT (Digital Manuscript Meta) */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '420px',
                    padding: '80px 60px',
                    justifyContent: 'space-between',
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(30px)',
                    borderRight: '1px solid rgba(6, 78, 59, 0.05)',
                    zIndex: 20,
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{
                            display: 'flex',
                            padding: '16px',
                            background: 'white',
                            borderRadius: '24px',
                            border: '1px solid rgba(6, 78, 59, 0.1)',
                            alignSelf: 'flex-start',
                            marginBottom: '60px',
                            boxShadow: '0 10px 30px rgba(6, 78, 59, 0.05)',
                        }}>
                            <img src={logoSrc} width="50" height="50" alt="Logo" />
                        </div>

                        <div style={{ color: emeraldRadiant, fontSize: '14px', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '12px', textTransform: 'uppercase' }}>
                            {locale === 'ru' ? 'КОЛЛЕКЦИЯ' : 'COLLECTION'}
                        </div>
                        <div style={{ color: deepForest, fontSize: '42px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '30px' }}>
                            {hadith.collection || 'Sahih Collection'}
                        </div>

                        <div style={{
                            display: 'flex',
                            padding: '12px 24px',
                            background: 'white',
                            borderRadius: '12px',
                            border: `2px solid ${goldSpiritual}`,
                            alignSelf: 'flex-start'
                        }}>
                            <span style={{ color: deepForest, fontSize: '20px', fontWeight: 800 }}>
                                {locale === 'ru' ? `Хадис №${hadith.hadithNumber}` : `Hadith #${hadith.hadithNumber}`}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'rgba(6, 78, 59, 0.4)', fontSize: '16px', letterSpacing: '0.1em', fontWeight: 700 }}>MUMIN READER</span>
                        <span style={{ color: 'rgba(6, 78, 59, 0.2)', fontSize: '14px', fontWeight: 600 }}>hadith.mumin.ink</span>
                    </div>
                </div>

                {/* 3. MAIN AREA (HADITH TEXT) */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    padding: '100px',
                    justifyContent: 'center',
                    zIndex: 20,
                    position: 'relative',
                }}>
                    {/* Decorative Massive Quote Icon */}
                    <div style={{
                        position: 'absolute',
                        top: '80px',
                        left: '80px',
                        opacity: 0.05,
                        display: 'flex',
                    }}>
                        <svg width="140" height="140" viewBox="0 0 24 24" fill={emeraldRadiant}>
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.34315 11.3601 6 13.017 6H19.017C20.6738 6 22.017 7.34315 22.017 9V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.01697 21L3.01697 18C3.01697 16.8954 3.9124 16 5.01697 16H8.01697C8.56925 16 9.01697 15.5523 9.01697 15V9C9.01697 8.44772 8.56925 8 8.01697 8H4.01697C3.46468 8 3.01697 8.44772 3.01697 9V12C3.01697 12.5523 2.56925 13 2.01697 13H0.0169678C-0.535317 13 -0.983032 12.5523 -0.983032 12V9C-0.983032 7.34315 0.360114 6 2.01697 6H8.01697C9.67382 6 11.017 7.34315 11.017 9V15C11.017 18.3137 8.33068 21 5.01697 21H3.01697Z" />
                        </svg>
                    </div>

                    <div style={{
                        color: deepForest,
                        fontSize: (hadith.translation?.text || '').length > 400 ? '28px' : '38px',
                        lineHeight: 1.5,
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        {(hadith.translation?.text || '').length > 600
                            ? (hadith.translation?.text || '').substring(0, 600) + '...'
                            : (hadith.translation?.text || '')}
                    </div>

                    {/* Accented Bottom Line */}
                    <div style={{
                        display: 'flex',
                        height: '4px',
                        width: '100px',
                        background: `linear-gradient(to right, ${emeraldRadiant}, ${goldSpiritual})`,
                        marginTop: '40px',
                        borderRadius: '2px',
                    }} />
                </div>

                {/* Vertical Decorative Bracket (Architectural Miracle) */}
                <div style={{
                    position: 'absolute',
                    top: '40px',
                    right: '40px',
                    bottom: '40px',
                    width: '60px',
                    borderRight: '1px solid rgba(6, 78, 59, 0.1)',
                    borderTop: '1px solid rgba(6, 78, 59, 0.1)',
                    borderBottom: '1px solid rgba(6, 78, 59, 0.1)',
                    display: 'flex',
                }} />
            </div>
        ),
        { ...size }
    );
}
