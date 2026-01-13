'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { CollectionCard } from '@/components/CollectionCard';
import { motion } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';
import { Metadata } from 'next';
import { StructuredData, generateBreadcrumbSchema } from '@/components/StructuredData';
import { hadithApi } from '@/lib/api/client';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

export const metadata: Metadata = {
    title: 'Hadith Collections Library',
    description: 'Explore authentic Hadith collections including Sahih Bukhari, Sahih Muslim, and other major books of the Prophetic tradition.',
    openGraph: {
        title: 'Hadith Collections Library | Mumin',
        description: 'Browse the major books of Hadith in one place.',
        images: ['/og-collections.jpg'],
    }
};

const ALL_COLLECTIONS = [
    {
        slug: 'sahih-bukhari',
        nameEnglish: 'Sahih al-Bukhari',
        nameArabic: 'صحيح البخاري',
        count: 7563,
        description: 'The most authentic collection of Hadith, compiled by Imam Muhammad al-Bukhari.',
    },
    {
        slug: 'sahih-muslim',
        nameEnglish: 'Sahih Muslim',
        nameArabic: 'صحيح مسلم',
        count: 7190,
        description: 'Highly acclaimed collection of authentic sayings of the Prophet (ﷺ) compiled by Imam Muslim.',
    },
    {
        slug: 'sunan-abu-dawud',
        nameEnglish: 'Sunan Abi Dawud',
        nameArabic: 'سنن أبي داود',
        count: 5274,
        description: 'A comprehensive collection of Hadith focusing on legal matters and jurisprudence.',
    },
    {
        slug: 'jami-at-tirmidhi',
        nameEnglish: 'Jami` at-Tirmidhi',
        nameArabic: 'جامع الترمذي',
        count: 3956,
        description: 'One of the six major Hadith collections, known for its classification of Hadith grades.',
    },
    {
        slug: 'sunan-an-nasai',
        nameEnglish: 'Sunan an-Nasa\'i',
        nameArabic: 'سنن النسائي',
        count: 5758,
        description: 'A collection of Hadith with strong emphasis on legal rulings and pure monotheism.',
    },
    {
        slug: 'sunan-ibn-majah',
        nameEnglish: 'Sunan Ibn Majah',
        nameArabic: 'سنن ابن ماجه',
        count: 4341,
        description: 'One of the six canonical Hadith collections, compiled by Imam Ibn Majah.',
    },
    {
        slug: 'muwatta-malik',
        nameEnglish: 'Muwatta Malik',
        nameArabic: 'موطأ مالك',
        count: 1861,
        description: 'One of the earliest compiled Hadith collections, following the School of Medina.',
    },
    {
        slug: 'musnad-ahmad',
        nameEnglish: 'Musnad Ahmad',
        nameArabic: 'مسند أحمد بن حنبل',
        count: 27647,
        description: 'A massive compilation of Hadith arranged by the narrating companions.',
    },
];

export default function CollectionsPage() {
    const [collections, setCollections] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [filter, setFilter] = React.useState('');

    React.useEffect(() => {
        const fetchCollections = async () => {
            try {
                const data = await hadithApi.getCollections();
                setCollections(data);
            } catch (error) {
                console.error('Failed to fetch collections:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCollections();
    }, []);

    const filteredCollections = collections.filter(col =>
        col.nameEnglish.toLowerCase().includes(filter.toLowerCase()) ||
        (col.nameArabic && col.nameArabic.includes(filter))
    );

    const displayCollections = filteredCollections.length > 0 ? filteredCollections : (isLoading ? [] : []);

    return (
        <main className="min-h-screen relative">
            <StructuredData data={generateBreadcrumbSchema([
                { name: 'Home', item: BASE_URL },
                { name: 'Collections', item: `${BASE_URL}/collections` }
            ])} />
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4"
                            >
                                <BookOpen className="w-4 h-4" />
                                Library
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl font-display font-bold text-emerald-900 mb-6"
                            >
                                Hadith Collections
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-emerald-900/60 leading-relaxed"
                            >
                                Browse through the most authentic and globally recognized collections of Prophetic traditions.
                                Each book serves as a pillar of Islamic knowledge and guidance.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative w-full md:w-80"
                        >
                            <input
                                type="text"
                                placeholder="Filter collections..."
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-emerald-900/5 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/10 focus:border-emerald-600/20 transition-all font-medium"
                            />
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-900/20" />
                        </motion.div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-64 rounded-3xl bg-emerald-900/5 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {displayCollections.map((col, idx) => (
                                <motion.div
                                    key={col.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * (idx % 3) }}
                                >
                                    <CollectionCard
                                        slug={col.slug}
                                        nameEnglish={col.nameEnglish}
                                        nameArabic={col.nameArabic}
                                        count={col.totalHadith || col.count || 0}
                                        description={col.description}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Highlight */}
            <section className="py-20 bg-emerald-900/5 border-y border-emerald-900/5 mt-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div>
                        <p className="text-4xl font-display font-bold text-emerald-900 mb-2">50k+</p>
                        <p className="text-sm font-bold text-emerald-900/40 uppercase tracking-widest">Hadiths</p>
                    </div>
                    <div>
                        <p className="text-4xl font-display font-bold text-emerald-900 mb-2">8</p>
                        <p className="text-sm font-bold text-emerald-900/40 uppercase tracking-widest">Collections</p>
                    </div>
                    <div>
                        <p className="text-4xl font-display font-bold text-emerald-900 mb-2">12+</p>
                        <p className="text-sm font-bold text-emerald-900/40 uppercase tracking-widest">Languages</p>
                    </div>
                    <div>
                        <p className="text-4xl font-display font-bold text-emerald-900 mb-2">100%</p>
                        <p className="text-sm font-bold text-emerald-900/40 uppercase tracking-widest">Authentic</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
