import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Authentic Hadith';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

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

export default async function Image(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    const isRu = locale === 'ru';
    const title = isRu ? 'Мумин Хадисы' : 'Mumin Hadith';
    const subtitle = isRu
        ? 'Твой духовный спутник в мире достоверных хадисов'
        : 'Your spiritual companion for authentic prophetic wisdom';

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
                {/* Patterns */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', opacity: 0.03 }}>
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="stars-main" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M50 15l5 15 15 5-15 5-5 15-5-15-15-5 15-5z" fill={deepForest} />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#stars-main)" />
                    </svg>
                </div>

                {/* Glow */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '800px',
                    height: '800px',
                    background: `radial-gradient(circle, ${emeraldRadiant}20 0%, transparent 70%)`,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                }} />

                {/* Content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 10,
                }}>
                    <div style={{
                        display: 'flex',
                        padding: '24px',
                        background: 'white',
                        borderRadius: '32px',
                        border: '2px solid rgba(6, 78, 59, 0.1)',
                        marginBottom: '40px',
                        boxShadow: '0 20px 40px rgba(6, 78, 59, 0.1)',
                    }}>
                        <svg width="80" height="80" viewBox="0 0 24 24">
                            <LogoPath />
                        </svg>
                    </div>

                    <h1 style={{
                        color: deepForest,
                        fontSize: '84px',
                        fontWeight: 900,
                        margin: 0,
                        marginBottom: '20px',
                        letterSpacing: '-0.04em',
                        display: 'flex',
                    }}>
                        {title}
                    </h1>

                    <p style={{
                        color: deepForest,
                        fontSize: '32px',
                        fontWeight: 500,
                        opacity: 0.6,
                        margin: 0,
                        textAlign: 'center',
                        maxWidth: '800px',
                        lineHeight: 1.4,
                        display: 'flex',
                    }}>
                        {subtitle}
                    </p>

                    <div style={{
                        display: 'flex',
                        marginTop: '60px',
                        padding: '12px 32px',
                        background: `linear-gradient(to right, ${emeraldRadiant}, ${goldSpiritual})`,
                        borderRadius: '100px',
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 800,
                        boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)',
                    }}>
                        hadith.mumin.ink
                    </div>
                </div>
            </div>
        ),
        size
    );
}
