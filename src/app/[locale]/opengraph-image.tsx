import { ImageResponse } from 'next/og';
import { OG_PALETTE, fetchFont } from '@/lib/og-helper';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Authentic Hadith';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    const isRu = locale === 'ru';
    const title = 'MUMIN';
    const subtitle = isRu
        ? 'Твой Духовный Спутник'
        : 'Your Spiritual Companion';
    const tagline = isRu
        ? 'Свет Достоверной Мудрости'
        : 'The Light of Authentic Wisdom';

    console.log('Generating Premium Satori-Compatible OG Image for locale:', locale);

    try {
        const cynzelRegular = await fetchFont('Cinzel', 400);
        const cinzelBold = await fetchFont('Cinzel', 700);
        const amiri = await fetchFont('Amiri', 400);

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
                        background: '#1a2f2f',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Background Gradient Layers */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, #1a3838 0%, #0f2020 100%)',
                        display: 'flex',
                    }} />

                    {/* Top Radial Glow */}
                    <div style={{
                        position: 'absolute',
                        top: '-150px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '700px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 65%)',
                        borderRadius: '50%',
                        display: 'flex',
                    }} />

                    {/* Center Glow */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '900px',
                        height: '700px',
                        background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.12) 0%, transparent 60%)',
                        borderRadius: '50%',
                        display: 'flex',
                    }} />

                    {/* Diagonal Light Beams */}
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15 }}>
                        <line x1="600" y1="0" x2="500" y2="630" stroke="#d4af37" strokeWidth="120" opacity="0.25" />
                        <line x1="600" y1="0" x2="700" y2="630" stroke="#d4af37" strokeWidth="120" opacity="0.25" />
                        <line x1="600" y1="0" x2="350" y2="630" stroke="#f4e5c2" strokeWidth="80" opacity="0.15" />
                        <line x1="600" y1="0" x2="850" y2="630" stroke="#f4e5c2" strokeWidth="80" opacity="0.15" />
                    </svg>

                    {/* Subtle Islamic Pattern */}
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.04 }}>
                        <defs>
                            <pattern id="pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                                <circle cx="40" cy="40" r="25" fill="none" stroke="#d4af37" strokeWidth="1.2" />
                                <circle cx="40" cy="40" r="15" fill="none" stroke="#d4af37" strokeWidth="0.8" />
                                <line x1="40" y1="15" x2="40" y2="65" stroke="#d4af37" strokeWidth="0.8" />
                                <line x1="15" y1="40" x2="65" y2="40" stroke="#d4af37" strokeWidth="0.8" />
                                <line x1="23" y1="23" x2="57" y2="57" stroke="#d4af37" strokeWidth="0.8" />
                                <line x1="57" y1="23" x2="23" y2="57" stroke="#d4af37" strokeWidth="0.8" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#pattern)" />
                    </svg>

                    {/* Floating Particles - More visible */}
                    <div style={{
                        position: 'absolute',
                        top: '12%',
                        left: '15%',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#d4af37',
                        opacity: 0.7,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '20%',
                        right: '20%',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#f4e5c2',
                        opacity: 0.6,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '25%',
                        left: '18%',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#d4af37',
                        opacity: 0.65,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '18%',
                        right: '12%',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#f4e5c2',
                        opacity: 0.7,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '35%',
                        left: '8%',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#c0c0c0',
                        opacity: 0.55,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '40%',
                        right: '10%',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#d4af37',
                        opacity: 0.6,
                        display: 'flex',
                    }} />

                    {/* Border Frame */}
                    <div style={{
                        position: 'absolute',
                        top: '25px',
                        left: '25px',
                        right: '25px',
                        bottom: '25px',
                        border: '2.5px solid #d4af37',
                        borderRadius: '6px',
                        display: 'flex',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '7px',
                            left: '7px',
                            right: '7px',
                            bottom: '7px',
                            border: '1px solid rgba(212, 175, 55, 0.4)',
                            borderRadius: '4px',
                            display: 'flex',
                        }} />
                    </div>

                    {/* Corner Stars */}
                    <svg width="50" height="50" viewBox="0 0 50 50" style={{ position: 'absolute', top: '18px', left: '18px' }}>
                        <path d="M 25 5 L 28 16 L 40 16 L 30 23 L 33 34 L 25 27 L 17 34 L 20 23 L 10 16 L 22 16 Z" fill="#d4af37" opacity="0.85" />
                        <circle cx="25" cy="25" r="7" fill="none" stroke="#d4af37" strokeWidth="1.3" opacity="0.6" />
                    </svg>

                    <svg width="50" height="50" viewBox="0 0 50 50" style={{ position: 'absolute', top: '18px', right: '18px' }}>
                        <path d="M 25 5 L 28 16 L 40 16 L 30 23 L 33 34 L 25 27 L 17 34 L 20 23 L 10 16 L 22 16 Z" fill="#d4af37" opacity="0.85" />
                        <circle cx="25" cy="25" r="7" fill="none" stroke="#d4af37" strokeWidth="1.3" opacity="0.6" />
                    </svg>

                    <svg width="50" height="50" viewBox="0 0 50 50" style={{ position: 'absolute', bottom: '18px', left: '18px' }}>
                        <path d="M 25 5 L 28 16 L 40 16 L 30 23 L 33 34 L 25 27 L 17 34 L 20 23 L 10 16 L 22 16 Z" fill="#d4af37" opacity="0.85" />
                        <circle cx="25" cy="25" r="7" fill="none" stroke="#d4af37" strokeWidth="1.3" opacity="0.6" />
                    </svg>

                    <svg width="50" height="50" viewBox="0 0 50 50" style={{ position: 'absolute', bottom: '18px', right: '18px' }}>
                        <path d="M 25 5 L 28 16 L 40 16 L 30 23 L 33 34 L 25 27 L 17 34 L 20 23 L 10 16 L 22 16 Z" fill="#d4af37" opacity="0.85" />
                        <circle cx="25" cy="25" r="7" fill="none" stroke="#d4af37" strokeWidth="1.3" opacity="0.6" />
                    </svg>

                    {/* Glow around logo */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -130px)',
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, transparent 65%)',
                        display: 'flex',
                    }} />

                    {/* Main Content */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 10,
                        gap: '14px',
                    }}>
                        {/* Logo Icon */}
                        <svg width="75" height="75" viewBox="0 0 24 24" fill="none">
                            <defs>
                                <linearGradient id="starFill" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#f4e5c2', stopOpacity: 1 }} />
                                    <stop offset="50%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#c9a033', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            <path
                                d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z"
                                fill="url(#starFill)"
                                stroke="#f4e5c2"
                                strokeWidth="1.5"
                            />
                        </svg>

                        {/* Title with Shadow Layers */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            marginTop: '8px',
                        }}>
                            {/* Shadow 1 */}
                            <div style={{
                                position: 'absolute',
                                fontFamily: '"Cinzel"',
                                fontSize: '90px',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                color: 'rgba(212, 175, 55, 0.25)',
                                top: '3px',
                                display: 'flex',
                            }}>
                                {title}
                            </div>
                            
                            {/* Shadow 2 */}
                            <div style={{
                                position: 'absolute',
                                fontFamily: '"Cinzel"',
                                fontSize: '90px',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                color: 'rgba(212, 175, 55, 0.4)',
                                top: '1.5px',
                                display: 'flex',
                            }}>
                                {title}
                            </div>

                            {/* Main Title */}
                            <div style={{
                                fontFamily: '"Cinzel"',
                                fontSize: '90px',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                color: '#f4e5c2',
                                display: 'flex',
                            }}>
                                {title}
                            </div>
                        </div>

                        {/* Separator */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '18px',
                            marginTop: '6px',
                            marginBottom: '6px',
                        }}>
                            <div style={{
                                width: '70px',
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)',
                                display: 'flex',
                            }} />
                            
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <circle cx="10" cy="10" r="7.5" fill="none" stroke="#d4af37" strokeWidth="1.5" />
                                <circle cx="10" cy="10" r="3" fill="#d4af37" opacity="0.8" />
                                <line x1="10" y1="2.5" x2="10" y2="17.5" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
                                <line x1="2.5" y1="10" x2="17.5" y2="10" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
                            </svg>
                            
                            <div style={{
                                width: '70px',
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)',
                                display: 'flex',
                            }} />
                        </div>

                        {/* Subtitle */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                        }}>
                            {/* Glow */}
                            <div style={{
                                position: 'absolute',
                                fontFamily: '"Cinzel"',
                                fontSize: '28px',
                                fontWeight: 400,
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'rgba(192, 192, 192, 0.3)',
                                top: '1px',
                                display: 'flex',
                            }}>
                                {subtitle}
                            </div>

                            <div style={{
                                fontFamily: '"Cinzel"',
                                fontSize: '28px',
                                fontWeight: 400,
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: '#d0d0d0',
                                display: 'flex',
                            }}>
                                {subtitle}
                            </div>
                        </div>

                        {/* Tagline */}
                        <div style={{
                            fontFamily: '"Amiri"',
                            fontSize: '22px',
                            fontWeight: 400,
                            color: '#d4af37',
                            marginTop: '2px',
                            fontStyle: 'italic',
                            letterSpacing: '0.03em',
                            display: 'flex',
                        }}>
                            {tagline}
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{
                        position: 'absolute',
                        bottom: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <div style={{
                            fontFamily: '"Cinzel"',
                            fontSize: '15px',
                            letterSpacing: '0.3em',
                            color: '#b0b0b0',
                            opacity: 0.75,
                            display: 'flex',
                        }}>
                            HADITH.MUMIN.INK
                        </div>
                        <div style={{
                            width: '180px',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)',
                            display: 'flex',
                        }} />
                    </div>

                    {/* Bottom Glow */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-60px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '500px',
                        height: '180px',
                        background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.15) 0%, transparent 65%)',
                        borderRadius: '50%',
                        display: 'flex',
                    }} />
                </div>
            ),
            {
                ...size,
                fonts: [
                    cynzelRegular && {
                        name: 'Cinzel',
                        data: cynzelRegular,
                        style: 'normal',
                        weight: 400,
                    },
                    cinzelBold && {
                        name: 'Cinzel',
                        data: cinzelBold,
                        style: 'normal',
                        weight: 700,
                    },
                    amiri && {
                        name: 'Amiri',
                        data: amiri,
                        style: 'normal',
                        weight: 400,
                    },
                ].filter(Boolean) as any,
            }
        );
    } catch (e: any) {
        console.error('Premium Satori-Compatible OG Image Generation Failed:', e);
        return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
    }
}