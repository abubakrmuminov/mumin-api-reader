import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Authentic Hadiths';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

// Убери generateImageMetadata совсем!
// Вместо этого просто принимай params

export default async function Image(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;

    // Celestial Miracle Colors
    const nobleCream = '#fffdf9';
    const emeraldRadiant = '#10b981';
    const goldSpiritual = '#fbbf24';
    const tealEthereal = '#2dd4bf';
    const indigoSoft = '#818cf8';
    const deepForest = '#064e3b';

    const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMlpNMTIgNEwxNi45NSAxMC41TDE5LjUgMTJMMTYuOTUgMTMuNUwxMiAyMEw3LjA1IDEzLjVMMC41IDEyTDcuMDUgMTAuNUwxMiA0WiIgZmlsbD0iIzA2NGUzYiIvPgo8L3N2Zz4=";

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: nobleCream,
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* 1. PRISMATIC LIGHT MESH BACKGROUND */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', background: nobleCream }} />

                {/* Radiant Emerald Glow */}
                <div style={{
                    position: 'absolute', top: '-10%', left: '-10%', width: '60%', height: '60%',
                    background: `radial-gradient(circle, ${emeraldRadiant} 0%, transparent 70%)`, opacity: 0.3, display: 'flex'
                }} />

                {/* Spiritual Gold Glow */}
                <div style={{
                    position: 'absolute', bottom: '-15%', right: '-10%', width: '70%', height: '70%',
                    background: `radial-gradient(circle, ${goldSpiritual} 0%, transparent 70%)`, opacity: 0.3, display: 'flex'
                }} />

                {/* Ethereal Teal Glow */}
                <div style={{
                    position: 'absolute', top: '20%', left: '-20%', width: '50%', height: '50%',
                    background: `radial-gradient(circle, ${tealEthereal} 0%, transparent 70%)`, opacity: 0.2, display: 'flex'
                }} />

                {/* Soft Indigo Glow */}
                <div style={{
                    position: 'absolute', top: '-5%', right: '-5%', width: '40%', height: '40%',
                    background: `radial-gradient(circle, ${indigoSoft} 0%, transparent 70%)`, opacity: 0.2, display: 'flex'
                }} />

                {/* Celestial Halos */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '1100px',
                    height: '1100px',
                    borderRadius: '1100px',
                    border: '1px solid rgba(6, 78, 59, 0.05)',
                    display: 'flex',
                }} />

                {/* 2. MAIN CONTENT LAYER */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0 100px',
                    height: '100%',
                    justifyContent: 'center',
                    zIndex: 20,
                }}>

                    {/* Brand Section */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px',
                        marginBottom: '60px',
                    }}>
                        <div style={{
                            display: 'flex',
                            padding: '18px',
                            background: 'rgba(255, 255, 255, 0.6)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 15px 35px rgba(6, 78, 59, 0.05)',
                        }}>
                            <img src={logoSrc} width="70" height="70" alt="Logo" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{
                                color: deepForest,
                                fontSize: '28px',
                                fontWeight: 800,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                            }}>
                                Mumin Reader
                            </span>
                            <span style={{ color: 'rgba(6, 78, 59, 0.5)', fontSize: '18px', letterSpacing: '0.05em', fontWeight: 600 }}>
                                HADITH.MUMIN.INK
                            </span>
                        </div>
                    </div>

                    {/* Headline Card */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '900px',
                    }}>
                        <div style={{
                            display: 'flex',
                            color: deepForest,
                            fontSize: locale === 'ru' ? '90px' : '110px',
                            fontWeight: 900,
                            lineHeight: 0.95,
                            letterSpacing: '-0.06em',
                            marginBottom: '30px',
                        }}>
                            {locale === 'ru' ? 'Истинная\nМудрость Пророка.' : 'Miracle of\nDivine Light.'}
                        </div>

                        <div style={{
                            display: 'flex',
                            height: '6px',
                            width: '160px',
                            background: `linear-gradient(to right, ${emeraldRadiant}, ${goldSpiritual}, ${tealEthereal})`,
                            marginBottom: '40px',
                            borderRadius: '3px',
                        }} />

                        <div style={{
                            display: 'flex',
                            color: 'rgba(6, 78, 59, 0.7)',
                            fontSize: '30px',
                            fontWeight: 500,
                            maxWidth: '700px',
                            lineHeight: 1.4,
                            letterSpacing: '-0.01em',
                        }}>
                            {locale === 'ru'
                                ? 'Исследуйте обширную библиотеку Сахих Хадисов в светлом и вдохновляющем интерфейсе.'
                                : 'Explore the vast library of Sahih Hadiths with a luminous interface designed for modern reflection.'}
                        </div>
                    </div>
                </div>

                {/* Floating Luminous Orbs */}
                <div style={{
                    position: 'absolute',
                    top: '100px',
                    right: '150px',
                    width: '12px',
                    height: '12px',
                    background: goldSpiritual,
                    borderRadius: '12px',
                    boxShadow: `0 0 20px ${goldSpiritual}`,
                    display: 'flex',
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '120px',
                    right: '100px',
                    width: '8px',
                    height: '8px',
                    background: tealEthereal,
                    borderRadius: '8px',
                    boxShadow: `0 0 15px ${tealEthereal}`,
                    display: 'flex',
                }} />
            </div>
        ),
        { ...size }
    );
}
