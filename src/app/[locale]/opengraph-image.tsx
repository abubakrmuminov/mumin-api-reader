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
                        background: '#0a1a1a',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Layered Background Gradients - Pure divs */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, #0d2626 0%, #0a1a1a 100%)',
                        display: 'flex',
                    }} />

                    {/* Radial Glow Top */}
                    <div style={{
                        position: 'absolute',
                        top: '-200px',
                        left: '300px',
                        width: '600px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                        borderRadius: '50%',
                        display: 'flex',
                    }} />

                    {/* Radial Glow Center */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '800px',
                        height: '800px',
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
                        borderRadius: '50%',
                        display: 'flex',
                    }} />

                    {/* Diagonal Light Beams - Simple SVG */}
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.12 }}>
                        <line x1="600" y1="0" x2="550" y2="630" stroke="#d4af37" strokeWidth="100" opacity="0.3" />
                        <line x1="600" y1="0" x2="650" y2="630" stroke="#d4af37" strokeWidth="100" opacity="0.3" />
                        <line x1="600" y1="0" x2="400" y2="630" stroke="#d4af37" strokeWidth="70" opacity="0.2" />
                        <line x1="600" y1="0" x2="800" y2="630" stroke="#d4af37" strokeWidth="70" opacity="0.2" />
                    </svg>

                    {/* Islamic Geometric Pattern - Simplified */}
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05 }}>
                        <defs>
                            <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <circle cx="50" cy="50" r="30" fill="none" stroke="#d4af37" strokeWidth="1.5" />
                                <circle cx="50" cy="50" r="20" fill="none" stroke="#d4af37" strokeWidth="1" />
                                <line x1="50" y1="20" x2="50" y2="80" stroke="#d4af37" strokeWidth="1" />
                                <line x1="20" y1="50" x2="80" y2="50" stroke="#d4af37" strokeWidth="1" />
                                <line x1="30" y1="30" x2="70" y2="70" stroke="#d4af37" strokeWidth="1" />
                                <line x1="70" y1="30" x2="30" y2="70" stroke="#d4af37" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#pattern)" />
                    </svg>

                    {/* Floating Light Particles */}
                    <div style={{
                        position: 'absolute',
                        top: '18%',
                        left: '12%',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#d4af37',
                        opacity: 0.6,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '28%',
                        right: '18%',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#f4e5c2',
                        opacity: 0.5,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '32%',
                        left: '22%',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#c0c0c0',
                        opacity: 0.4,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '25%',
                        right: '15%',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#d4af37',
                        opacity: 0.55,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '45%',
                        left: '8%',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#f4e5c2',
                        opacity: 0.45,
                        display: 'flex',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '60%',
                        right: '10%',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#d4af37',
                        opacity: 0.5,
                        display: 'flex',
                    }} />

                    {/* Ornate Border Frame - Triple Layer */}
                    <div style={{
                        position: 'absolute',
                        top: '30px',
                        left: '30px',
                        right: '30px',
                        bottom: '30px',
                        border: '3px solid #d4af37',
                        borderRadius: '8px',
                        display: 'flex',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '8px',
                            left: '8px',
                            right: '8px',
                            bottom: '8px',
                            border: '1px solid rgba(212, 175, 55, 0.5)',
                            borderRadius: '4px',
                            display: 'flex',
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '4px',
                                left: '4px',
                                right: '4px',
                                bottom: '4px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '2px',
                                display: 'flex',
                            }} />
                        </div>
                    </div>

                    {/* Corner Islamic Stars - All 4 Corners */}
                    {/* Top Left */}
                    <svg width="70" height="70" viewBox="0 0 70 70" style={{ position: 'absolute', top: '15px', left: '15px' }}>
                        <path d="M 35 8 L 40 23 L 56 23 L 43 33 L 48 48 L 35 38 L 22 48 L 27 33 L 14 23 L 30 23 Z" fill="#d4af37" opacity="0.9" />
                        <circle cx="35" cy="35" r="10" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.7" />
                        <circle cx="35" cy="35" r="6" fill="#d4af37" opacity="0.4" />
                    </svg>

                    {/* Top Right */}
                    <svg width="70" height="70" viewBox="0 0 70 70" style={{ position: 'absolute', top: '15px', right: '15px' }}>
                        <path d="M 35 8 L 40 23 L 56 23 L 43 33 L 48 48 L 35 38 L 22 48 L 27 33 L 14 23 L 30 23 Z" fill="#d4af37" opacity="0.9" />
                        <circle cx="35" cy="35" r="10" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.7" />
                        <circle cx="35" cy="35" r="6" fill="#d4af37" opacity="0.4" />
                    </svg>

                    {/* Bottom Left */}
                    <svg width="70" height="70" viewBox="0 0 70 70" style={{ position: 'absolute', bottom: '15px', left: '15px' }}>
                        <path d="M 35 8 L 40 23 L 56 23 L 43 33 L 48 48 L 35 38 L 22 48 L 27 33 L 14 23 L 30 23 Z" fill="#d4af37" opacity="0.9" />
                        <circle cx="35" cy="35" r="10" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.7" />
                        <circle cx="35" cy="35" r="6" fill="#d4af37" opacity="0.4" />
                    </svg>

                    {/* Bottom Right */}
                    <svg width="70" height="70" viewBox="0 0 70 70" style={{ position: 'absolute', bottom: '15px', right: '15px' }}>
                        <path d="M 35 8 L 40 23 L 56 23 L 43 33 L 48 48 L 35 38 L 22 48 L 27 33 L 14 23 L 30 23 Z" fill="#d4af37" opacity="0.9" />
                        <circle cx="35" cy="35" r="10" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.7" />
                        <circle cx="35" cy="35" r="6" fill="#d4af37" opacity="0.4" />
                    </svg>

                    {/* Glowing Halo around logo area */}
                    <div style={{
                        position: 'absolute',
                        top: '180px',
                        left: '555px',
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
                        display: 'flex',
                    }} />

                    {/* Main Content Container */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 10,
                        gap: '20px',
                    }}>
                        {/* Premium Logo Icon */}
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
                            <defs>
                                <linearGradient id="starFill" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#f4e5c2', stopOpacity: 1 }} />
                                    <stop offset="50%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#b8860b', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            <path
                                d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z"
                                fill="url(#starFill)"
                                stroke="#f4e5c2"
                                strokeWidth="1.5"
                            />
                        </svg>

                        {/* Main Title - Layered for 3D effect */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                        }}>
                            {/* Shadow layer 1 */}
                            <div style={{
                                position: 'absolute',
                                fontFamily: '"Cinzel"',
                                fontSize: '115px',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                color: 'rgba(212, 175, 55, 0.2)',
                                top: '4px',
                                display: 'flex',
                            }}>
                                {title}
                            </div>
                            
                            {/* Shadow layer 2 */}
                            <div style={{
                                position: 'absolute',
                                fontFamily: '"Cinzel"',
                                fontSize: '115px',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                color: 'rgba(212, 175, 55, 0.3)',
                                top: '2px',
                                display: 'flex',
                            }}>
                                {title}
                            </div>

                            {/* Main title with gradient simulation */}
                            <div style={{
                                fontFamily: '"Cinzel"',
                                fontSize: '115px',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                color: '#f4e5c2',
                                display: 'flex',
                                position: 'relative',
                            }}>
                                {title}
                            </div>
                        </div>

                        {/* Elegant Separator */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            marginTop: '10px',
                            marginBottom: '10px',
                        }}>
                            <div style={{
                                width: '90px',
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)',
                                display: 'flex',
                            }} />
                            
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="9" fill="none" stroke="#d4af37" strokeWidth="1.8" />
                                <circle cx="12" cy="12" r="4" fill="#d4af37" opacity="0.8" />
                                <line x1="12" y1="3" x2="12" y2="21" stroke="#d4af37" strokeWidth="1" opacity="0.6" />
                                <line x1="3" y1="12" x2="21" y2="12" stroke="#d4af37" strokeWidth="1" opacity="0.6" />
                            </svg>
                            
                            <div style={{
                                width: '90px',
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)',
                                display: 'flex',
                            }} />
                        </div>

                        {/* Subtitle - Layered */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                        }}>
                            {/* Glow layer */}
                            <div style={{
                                position: 'absolute',
                                fontFamily: '"Cinzel"',
                                fontSize: '36px',
                                fontWeight: 400,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(192, 192, 192, 0.3)',
                                top: '1px',
                                display: 'flex',
                            }}>
                                {subtitle}
                            </div>

                            <div style={{
                                fontFamily: '"Cinzel"',
                                fontSize: '36px',
                                fontWeight: 400,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: '#c0c0c0',
                                display: 'flex',
                            }}>
                                {subtitle}
                            </div>
                        </div>

                        {/* Tagline */}
                        <div style={{
                            fontFamily: '"Amiri"',
                            fontSize: '28px',
                            fontWeight: 400,
                            color: '#d4af37',
                            marginTop: '6px',
                            fontStyle: 'italic',
                            letterSpacing: '0.05em',
                            display: 'flex',
                        }}>
                            {tagline}
                        </div>
                    </div>

                    {/* Footer URL */}
                    <div style={{
                        position: 'absolute',
                        bottom: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                    }}>
                        <div style={{
                            fontFamily: '"Cinzel"',
                            fontSize: '18px',
                            letterSpacing: '0.35em',
                            color: '#c0c0c0',
                            opacity: 0.7,
                            display: 'flex',
                        }}>
                            HADITH.MUMIN.INK
                        </div>
                        <div style={{
                            width: '220px',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)',
                            display: 'flex',
                        }} />
                    </div>

                    {/* Bottom ambient glow */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-80px',
                        left: '400px',
                        width: '400px',
                        height: '160px',
                        background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
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