import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/collections',
        '/random',
        '/bookmarks',
        '/about',
        '/privacy',
        '/terms',
        '/methodology',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // In a real production environment, we would fetch all collection slugs and hadith IDs
    // filtering by popularity or static generation.
    const collections = [
        'sahih-bukhari',
        'sahih-muslim',
        'sunan-abu-dawud',
        'jami-at-tirmidhi',
        'sunan-an-nasai',
        'sunan-ibn-majah',
        'muwatta-malik',
        'musnad-ahmad',
    ].map((slug) => ({
        url: `${BASE_URL}/collections/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...routes, ...collections];
}
