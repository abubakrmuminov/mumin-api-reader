export const OG_PALETTE = {
    // Primary Backgrounds
    midnightGreen: '#022c22', // Deep rich green
    void: '#000000',          // Absolute black for depth
    forest: '#14532d',        // Lighter green for gradients

    // Accents
    gold: '#d4af37',          // Classic gold
    goldLight: '#fcd34d',   // Bright gold highlight
    silver: '#e5e7eb',        // Soft silver/white
    bronze: '#92400e',        // Deep warm accent

    // Text
    cream: '#fffdd0',         // Warm white text
    white: '#ffffff',         // Pure white
    muted: '#9ca3af',         // Secondary text

    // Functional
    overlay: 'rgba(0,0,0,0.4)',
    glass: 'rgba(255,255,255,0.05)',
    border: 'rgba(212, 175, 55, 0.2)', // Gold border
};

export async function loadGoogleFont(font: string, text: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
    const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

    if (resource) {
        const response = await fetch(resource[1]);
        if (response.status == 200) {
            return await response.arrayBuffer();
        }
    }

    throw new Error('Failed to load font data');
}

// Simpler version for full charsets (standard approach for OG)
export async function fetchFont(family: string, weight: number = 400, text?: string) {
    try {
        const params = new URLSearchParams({
            family: `${family}:wght@${weight}`,
            display: 'swap',
        });
        if (text) params.append('text', text);

        const url = `https://fonts.googleapis.com/css2?${params.toString()}`;
        const css = await fetch(url).then((res) => res.text());

        // Extract the WOFF2 or TTF URL
        const resource = css.match(/src: url\((.+)\) format\('woff2'\)/) ||
            css.match(/src: url\((.+)\) format\('truetype'\)/) ||
            css.match(/src: url\((.+)\)/);

        if (!resource) throw new Error('No font url found');

        return await fetch(resource[1]).then((res) => res.arrayBuffer());
    } catch (e) {
        console.error(`Failed to load font ${family}`, e);
        return null;
    }
}
