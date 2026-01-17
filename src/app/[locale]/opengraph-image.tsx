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
const lightEmerald = '#d1fae5';
const softGold = '#fef3c7';

const LogoPath = ({ color = deepForest }: { color?: string }) => (
    <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4L16.95 10.5L19.5 12L16.95 13.5L12 20L7.05 13.5L4.5 12L7.05 10.5L12 4Z"
        fill={color}
    />
);

export default async function Image(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    const isRu = locale === 'ru';
    const title = 'MUMIN';
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
                    background: `linear-gradient(180deg, ${softGold} 0%, ${nobleCream} 50%, ${lightEmerald}40 100%)`,
                    position: 'relative',
                }}
            >
                {/* Subtle Islamic Geometric Pattern */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.08 }}>
                    {/* 8-pointed stars pattern */}
                    {[...Array(12)].map((_, i) => {
                        const x = 200 + (i % 4) * 250;
                        const y = 150 + Math.floor(i / 4) * 180;
                        return (
                            <g key={`star-${i}`}>
                                <circle cx={x} cy={y} r="50" fill="none" stroke={deepForest} strokeWidth="1.5" />
                                <circle cx={x} cy={y} r="30" fill="none" stroke={deepForest} strokeWidth="1" />
                                {[...Array(8)].map((_, j) => {
                                    const angle = (j * 45 * Math.PI) / 180;
                                    const x1 = x + Math.cos(angle) * 20;
                                    const y1 = y + Math.sin(angle) * 20;
                                    const x2 = x + Math.cos(angle) * 40;
                                    const y2 = y + Math.sin(angle) * 40;
                                    return (
                                        <line
                                            key={`line-${j}`}
                                            x1={x1}
                                            y1={y1}
                                            x2={x2}
                                            y2={y2}
                                            stroke={deepForest}
                                            strokeWidth="1"
                                        />
                                    );
                                })}
                            </g>
                        );
                    })}
                </svg>

                {/* Elegant Corner Ornaments */}
                <div style={{
                    position: 'absolute',
                    top: '35px',
                    left: '35px',
                    width: '100px',
                    height: '100px',
                    display: 'flex'
                }}>
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <path 
                            d="M0,20 Q20,20 20,0 L0,0 Z" 
                            fill="none" 
                            stroke={emeraldRadiant} 
                            strokeWidth="2.5"
                        />
                        <path 
                            d="M0,40 Q40,40 40,0" 
                            fill="none" 
                            stroke={goldSpiritual} 
                            strokeWidth="1.5"
                            opacity="0.6"
                        />
                        <circle cx="30" cy="30" r="8" fill="none" stroke={emeraldRadiant} strokeWidth="1.5" />
                    </svg>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '35px',
                    right: '35px',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    transform: 'scaleX(-1)'
                }}>
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <path 
                            d="M0,20 Q20,20 20,0 L0,0 Z" 
                            fill="none" 
                            stroke={emeraldRadiant} 
                            strokeWidth="2.5"
                        />
                        <path 
                            d="M0,40 Q40,40 40,0" 
                            fill="none" 
                            stroke={goldSpiritual} 
                            strokeWidth="1.5"
                            opacity="0.6"
                        />
                        <circle cx="30" cy="30" r="8" fill="none" stroke={emeraldRadiant} strokeWidth="1.5" />
                    </svg>
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '35px',
                    left: '35px',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    transform: 'scaleY(-1)'
                }}>
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <path 
                            d="M0,20 Q20,20 20,0 L0,0 Z" 
                            fill="none" 
                            stroke={goldSpiritual} 
                            strokeWidth="2.5"
                        />
                        <path 
                            d="M0,40 Q40,40 40,0" 
                            fill="none" 
                            stroke={emeraldRadiant} 
                            strokeWidth="1.5"
                            opacity="0.6"
                        />
                        <circle cx="30" cy="30" r="8" fill="none" stroke={goldSpiritual} strokeWidth="1.5" />
                    </svg>
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '35px',
                    right: '35px',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    transform: 'scale(-1)'
                }}>
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <path 
                            d="M0,20 Q20,20 20,0 L0,0 Z" 
                            fill="none" 
                            stroke={goldSpiritual} 
                            strokeWidth="2.5"
                        />
                        <path 
                            d="M0,40 Q40,40 40,0" 
                            fill="none" 
                            stroke={emeraldRadiant} 
                            strokeWidth="1.5"
                            opacity="0.6"
                        />
                        <circle cx="30" cy="30" r="8" fill="none" stroke={goldSpiritual} strokeWidth="1.5" />
                    </svg>
                </div>

                {/* Delicate Frame */}
                <div style={{
                    position: 'absolute',
                    top: '60px',
                    left: '60px',
                    right: '60px',
                    bottom: '60px',
                    border: `1.5px solid ${emeraldRadiant}30`,
                    borderRadius: '24px',
                    display: 'flex'
                }} />

                <div style={{
                    position: 'absolute',
                    top: '70px',
                    left: '70px',
                    right: '70px',
                    bottom: '70px',
                    border: `1px solid ${goldSpiritual}25`,
                    borderRadius: '20px',
                    display: 'flex'
                }} />

                {/* Main Content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    textAlign: 'center',
                }}>
                    {/* Refined Logo */}
                    <div style={{
                        width: '130px', 
                        height: '130px', 
                        background: `linear-gradient(135deg, ${emeraldRadiant}, ${emeraldRadiant}e6)`,
                        borderRadius: '32px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '48px',
                        boxShadow: `0 10px 40px ${emeraldRadiant}25, 0 0 0 1px ${emeraldRadiant}20`,
                        border: `1px solid rgba(255, 255, 255, 0.2)`,
                        position: 'relative'
                    }}>
                        <svg width="68" height="68" viewBox="0 0 24 24" style={{ position: 'relative', zIndex: 1 }}>
                            <LogoPath color="white" />
                        </svg>
                    </div>

                    {/* Title - Elegant */}
                    <h1 style={{
                        color: deepForest,
                        fontSize: '120px',
                        fontWeight: 800,
                        margin: 0,
                        marginBottom: '16px',
                        letterSpacing: '0.18em',
                        display: 'flex',
                    }}>
                        {title}
                    </h1>

                    {/* Subtitle */}
                    <div style={{
                        color: goldSpiritual,
                        fontSize: '17px',
                        fontWeight: 700,
                        letterSpacing: '0.4em',
                        marginBottom: '48px',
                        textTransform: 'uppercase',
                        display: 'flex',
                        opacity: 0.85
                    }}>
                        {isRu ? 'ДОСТОВЕРНЫЕ ХАДИСЫ' : 'AUTHENTIC HADITH'}
                    </div>

                    {/* Elegant Divider */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        width: '200px', 
                        justifyContent: 'center',
                        marginBottom: '48px'
                    }}>
                        <div style={{ 
                            height: '1px', 
                            flex: 1, 
                            background: `linear-gradient(to right, transparent, ${goldSpiritual}50, ${goldSpiritual})` 
                        }} />
                        <div style={{ 
                            width: '6px', 
                            height: '6px', 
                            background: goldSpiritual, 
                            transform: 'rotate(45deg)', 
                            margin: '0 16px'
                        }} />
                        <div style={{ 
                            height: '1px', 
                            flex: 1, 
                            background: `linear-gradient(to left, transparent, ${goldSpiritual}50, ${goldSpiritual})` 
                        }} />
                    </div>

                    {/* Description - Calm */}
                    <p style={{
                        color: deepForest,
                        fontSize: '26px',
                        fontWeight: 500,
                        opacity: 0.7,
                        margin: 0,
                        textAlign: 'center',
                        maxWidth: '800px',
                        lineHeight: 1.5,
                        display: 'flex',
                        letterSpacing: '0.01em'
                    }}>
                        {subtitle}
                    </p>
                </div>

                {/* Simple Footer */}
                <div style={{
                    position: 'absolute', 
                    bottom: '70px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    zIndex: 10
                }}>
                    <span style={{ 
                        color: deepForest, 
                        fontSize: '19px', 
                        fontWeight: 500, 
                        opacity: 0.5, 
                        display: 'flex',
                        letterSpacing: '0.02em'
                    }}>
                        hadith.mumin.ink
                    </span>
                </div>
            </div>
        ),
        size
    );
}