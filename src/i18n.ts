import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'ar', 'ru', 'ur', 'tr', 'id'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
    const activeLocale = locale || defaultLocale;
    if (!locales.includes(activeLocale as any)) notFound();

    return {
        locale: activeLocale,
        messages: (await import(`./messages/${activeLocale}.json`)).default
    };
});
