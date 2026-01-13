import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string | number | Date) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

export function getCollectionSlug(name: string): string {
    const mapping: Record<string, string> = {
        'Sahih al-Bukhari': 'sahih-bukhari',
        'Sahih Muslim': 'sahih-muslim',
        'Sunan Abi Dawud': 'sunan-abu-dawud',
        'Jami` at-Tirmidhi': 'jami-at-tirmidhi',
        'Sunan an-Nasa\'i': 'sunan-an-nasai',
        'Sunan Ibn Majah': 'sunan-ibn-majah',
        'Muwatta Malik': 'muwatta-malik',
        'Musnad Ahmad bin Hanbal': 'musnad-ahmad',
    };

    if (mapping[name]) return mapping[name];

    return name
        .toLowerCase()
        .replace(/sahih|sunan|jami`|musnad|muwatta/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
}
