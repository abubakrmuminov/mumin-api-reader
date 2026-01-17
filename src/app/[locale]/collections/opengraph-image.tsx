import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mumin Reader - Collections';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

const nobleCream = '#fffdf9';
const emeraldRadiant = '#10b981';
const goldSpiritual = '#fbbf24';
const deepForest = '#064e3b';

const patternSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzA2NGUzYiIgZmlsbC1vcGFjaXR5PSIwLjAzIj48cGF0aCBkPSJNMjAgMGw1IDExIDExIDUtMTEgNS01IDExLTUtMTEtMTEtNSAExMS01IDUtMTF6Ii8+PC9nPjwvc3ZnPg==";
const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyQzIgMTcuNTIgNi40OCAyMiAxMiAyMkMxNy41MiAyMiAyMiAxNy41MiAyMiAxMkMyMiA2LjQ4IDE3LjUyIDIgMTIgMlpNMTIgNEwxNi45NSAxMC41TDE5LjUgMTJMMTYuOTUgMTMuNUwxMiAyMEw3LjA1IDEzLjVMMC41IDEyTDcuMDUgMTAuNUwxMiA0WiIgZmlsbD0iIzA2NGUzYiIvPgo8L3N2Zz4=";

export default async function Image(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    const isRu = locale === 'ru';
    const title = isRu ? 'Коллекции Хадисов' : 'Hadith Collections';
    const subtitle = isRu
        ? 'Все великие сборники в одном месте'
        : 'All major authentic collections in one place';

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
                    width: '800px',
                    height: '800px',
                    background: `radial-gradient(circle, ${goldSpiritual}20 0%, transparent 70%)`,
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
                    padding: '60px 100px',
                    boxShadow: '0 30px 60px rgba(6, 78, 59, 0.08)',
                    zIndex: 10,
                    textAlign: 'center',
                }}>
                    <div style={{
                        display: 'flex',
                        padding: '16px',
                        background: 'white',
                        borderRadius: '24px',
                        marginBottom: '30px',
                        border: '1px solid rgba(6, 78, 59, 0.1)',
                    }}>
                        <img src={logoSrc} width="60" height="60" alt="Logo" />
                    </div>

                    <h1 style={{
                        color: deepForest,
                        fontSize: '72px',
                        fontWeight: 900,
                        margin: 0,
                        marginBottom: '15px',
                        letterSpacing: '-0.02em',
                    }}>
                        {title}
                    </h1>

                    <p style={{
                        color: deepForest,
                        fontSize: '28px',
                        fontWeight: 500,
                        opacity: 0.6,
                        margin: 0,
                    }}>
                        {subtitle}
                    </p>
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '50px',
                    padding: '12px 32px',
                    background: emeraldRadiant,
                    borderRadius: '100px',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 800,
                    zIndex: 10,
                }}>
                    hadith.mumin.ink
                </div>
            </div>
        ),
        size
    );
}