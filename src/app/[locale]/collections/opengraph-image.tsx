import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Explore Hadith Collections - Sahih Bukhari, Muslim, and more';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;

    // Celestial Miracle Colors
    const nobleCream = '#fffdf9';
    const emeraldRadiant = '#10b981';
    const goldSpiritual = '#fbbf24';
    const tealEthereal = '#2dd4bf';
    const indigoSoft = '#818cf8';
    const deepForest = '#064e3b';

    const collections = [
        { en: 'Sahih al-Bukhari', ru: 'Сахих аль-Бухари' },
        { en: 'Sahih Muslim', ru: 'Сахих Муслим' },
        { en: 'Sunan an-Nasa\'i', ru: 'Сунан ан-Насаи' },
        { en: 'Sunan Abi Dawud', ru: 'Сунан Абу Дауд' },
    ];

    const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMlpNMTIgNEwxNi45NSAxMC41TDE5LjUgMTJMMTYuOTUgMTMuNUwxMiAyMEw3LjA1IDEzLjVMMC41IDEyTDcuMDUgMTAuNUwxMiA0WiIgZmlsbD0iIzA2NGUzYiIvPgo8L3N2Zz4=";

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
                    position: 'absolute', top: '-10%', left: '10%', width: '100%', height: '100%',
                    background: `radial-gradient(circle, ${emeraldRadiant} 0%, transparent 70%)`, opacity: 0.15, display: 'flex'
                }} />

                <div style={{
                    position: 'absolute', bottom: '-15%', right: '10%', width: '70%', height: '70%',
                    background: `radial-gradient(circle, ${goldSpiritual} 0%, transparent 70%)`, opacity: 0.15, display: 'flex'
                }} />

                <div style={{
                    position: 'absolute', top: '20%', right: '-10%', width: '50%', height: '50%',
                    background: `radial-gradient(circle, ${tealEthereal} 0%, transparent 70%)`, opacity: 0.1, display: 'flex'
                }} />

                {/* Left Section: Branding Sidebar (Frosted) */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '440px',
                    padding: '80px 60px',
                    justifyContent: 'space-between',
                    background: 'rgba(255, 255, 255, 0.4)',
                    borderRight: '1px solid rgba(6, 78, 59, 0.05)',
                    backdropFilter: 'blur(30px)',
                    zIndex: 20,
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{
                            display: 'flex',
                            padding: '16px',
                            background: 'white',
                            borderRadius: '20px',
                            border: '1px solid rgba(6, 78, 59, 0.1)',
                            alignSelf: 'flex-start',
                            marginBottom: '40px',
                            boxShadow: '0 10px 25px rgba(6, 78, 59, 0.05)',
                        }}>
                            <img src={logoSrc} width="60" height="60" alt="Logo" />
                        </div>
                        <div style={{ color: emeraldRadiant, fontSize: '18px', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '12px' }}>
                            {locale === 'ru' ? 'СВЯЩЕННАЯ БИБЛИОТЕКА' : 'SACRED LIBRARY'}
                        </div>
                        <div style={{ color: deepForest, fontSize: '56px', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em' }}>
                            {locale === 'ru' ? 'Достоверные Коллекции' : 'The Authentic Collections'}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '3px', width: '60px', background: goldSpiritual, marginBottom: '20px' }} />
                        <span style={{ color: 'rgba(6, 78, 59, 0.4)', fontSize: '18px', letterSpacing: '0.05em', fontWeight: 700 }}>
                            HADITH.MUMIN.INK
                        </span>
                    </div>
                </div>

                {/* Right Section: Floating Grid */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    padding: '80px',
                    justifyContent: 'center',
                    zIndex: 20,
                }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                        {collections.map((c, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    padding: '30px 45px',
                                    background: idx === 0 ? 'white' : 'rgba(255, 255, 255, 0.6)',
                                    borderRadius: '30px',
                                    border: `2px solid ${idx === 0 ? emeraldRadiant : 'rgba(255, 255, 255, 0.8)'}`,
                                    color: idx === 0 ? deepForest : 'rgba(6, 78, 59, 0.8)',
                                    fontSize: '34px',
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                    boxShadow: idx === 0 ? '0 15px 35px rgba(16, 185, 129, 0.1)' : '0 10px 25px rgba(0,0,0,0.02)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                {locale === 'ru' ? c.ru : c.en}
                            </div>
                        ))}
                        <div style={{
                            display: 'flex',
                            padding: '30px 45px',
                            background: 'transparent',
                            borderRadius: '30px',
                            border: '2px dashed rgba(6, 78, 59, 0.15)',
                            color: 'rgba(6, 78, 59, 0.3)',
                            fontSize: '34px',
                            fontWeight: 500,
                        }}>
                            {locale === 'ru' ? '+ Еще больше' : '+ Many more'}
                        </div>
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}