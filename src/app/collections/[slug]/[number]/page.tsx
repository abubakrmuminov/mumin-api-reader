'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { HadithCard } from '@/components/HadithCard';
import { ReadingSettingsPanel } from '@/components/ReadingSettingsPanel';
import { hadithApi, Hadith } from '@/lib/api/client';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    BookOpen,
    Settings,
    Share2,
    Printer,
    Flag
} from 'lucide-react';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { StructuredData, generateHadithSchema, generateBreadcrumbSchema } from '@/components/StructuredData';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

// SEO Title Mapping
const COLLECTION_NAMES: Record<string, string> = {
    'sahih-bukhari': 'Sahih al-Bukhari',
    'sahih-muslim': 'Sahih Muslim',
    'sunan-abu-dawud': 'Sunan Abi Dawud',
    'jami-at-tirmidhi': 'Jami` at-Tirmidhi',
    'sunan-an-nasai': 'Sunan an-Nasa\'i',
    'sunan-ibn-majah': 'Sunan Ibn Majah',
    'muwatta-malik': 'Muwatta Malik',
    'musnad-ahmad': 'Musnad Ahmad bin Hanbal',
};

export async function generateMetadata(
    { params }: { params: { slug: string; number: string } }
): Promise<Metadata> {
    const slug = params.slug;
    const number = parseInt(params.number);

    const collectionName = COLLECTION_NAMES[slug] || slug.replace(/-/g, ' ');
    let hadithTitle = `Hadith ${number} from ${collectionName}`;
    let hadithDescription = `Read Hadith number ${number} from the collection ${collectionName}.`;

    try {
        const response = await hadithApi.getHadiths({
            collection: collectionName,
            hadithNumber: number,
            limit: 1
        });

        if (response.data.length > 0) {
            const hadith = response.data[0];
            hadithTitle = `Hadith ${hadith.hadithNumber} - ${hadith.collection}`;
            hadithDescription = hadith.translation?.text.substring(0, 160) + '...' || hadithDescription;
        }
    } catch (error) {
        console.error('Failed to fetch hadith for metadata:', error);
    }

    const canonicalUrl = `${BASE_URL}/collections/${slug}/${number}`;

    return {
        title: hadithTitle,
        description: hadithDescription,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: hadithTitle,
            description: hadithDescription,
            url: canonicalUrl,
            type: 'article',
            siteName: 'Mumin Ink',
            images: [
                {
                    url: `${BASE_URL}/api/og?title=${encodeURIComponent(hadithTitle)}`,
                    width: 1200,
                    height: 630,
                    alt: hadithTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: hadithTitle,
            description: hadithDescription,
            images: [`${BASE_URL}/api/og?title=${encodeURIComponent(hadithTitle)}`],
        },
    };
}

export default function HadithDeepViewPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const number = parseInt(params.number as string);

    const [hadith, setHadith] = useState<Hadith | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        async function loadHadith() {
            if (!slug || !number) return;
            setLoading(true);
            try {
                const collectionName = COLLECTION_NAMES[slug] || slug.replace(/-/g, ' ');
                const response = await hadithApi.getHadiths({
                    collection: collectionName,
                    hadithNumber: number,
                    limit: 1
                });

                if (response.data.length > 0) {
                    setHadith(response.data[0]);
                } else {
                    setHadith(null);
                }
            } catch (err) {
                console.error('Failed to load hadith', err);
            } finally {
                setLoading(false);
            }
        }
        loadHadith();
    }, [slug, number]);

    const navigateTo = (direction: 'next' | 'prev') => {
        const nextNumber = direction === 'next' ? number + 1 : number - 1;
        if (nextNumber > 0) {
            router.push(`/collections/${slug}/${nextNumber}`);
        }
    };

    return (
        <main className="min-h-screen relative">
            {hadith && (
                <>
                    <StructuredData data={generateHadithSchema(hadith, BASE_URL)} />
                    <StructuredData data={generateBreadcrumbSchema([
                        { name: 'Home', item: BASE_URL },
                        { name: 'Collections', item: `${BASE_URL}/collections` },
                        { name: hadith.collection, item: `${BASE_URL}/collections/${slug}` },
                        { name: `Hadith ${hadith.hadithNumber}`, item: `${BASE_URL}/collections/${slug}/${hadith.hadithNumber}` }
                    ])} />
                </>
            )}
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-24 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumbs & Navigation */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-emerald-900/40">
                            <Link href="/collections" className="hover:text-emerald-900 transition-colors">Library</Link>
                            <ChevronRight className="w-3 h-3" />
                            {hadith && (
                                <Link href={`/collections/${slug}`} className="hover:text-emerald-900 transition-colors">
                                    {hadith.collection}
                                </Link>
                            )}
                            <ChevronRight className="w-3 h-3 text-emerald-900/10" />
                            <span className="text-emerald-900">Hadith {number}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigateTo('prev')}
                                disabled={number <= 1}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-sm font-bold text-emerald-900 uppercase tracking-widest hover:border-emerald-600/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </button>
                            <button
                                onClick={() => navigateTo('next')}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-sm font-bold text-emerald-900 uppercase tracking-widest hover:border-emerald-600/20 transition-all"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Context Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="sticky top-24 space-y-8">
                                <div className="p-8 rounded-[2.5rem] bg-white border border-emerald-900/5 shadow-islamic">
                                    <h3 className="text-lg font-display font-bold text-emerald-900 mb-6 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-gold-500" />
                                        Collection Context
                                    </h3>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] font-bold text-emerald-900/30 uppercase tracking-[0.2em] mb-1">Book</p>
                                            <p className="font-semibold text-emerald-900 leading-tight">Book {hadith?.bookNumber || '...'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-emerald-900/30 uppercase tracking-[0.2em] mb-1">Collection</p>
                                            <p className="text-sm text-emerald-900/60 leading-relaxed">{hadith?.collection || '...'}</p>
                                        </div>
                                    </div>
                                    <Link href={`/collections/${slug}`} className="block w-full mt-8 py-3 bg-emerald-900/5 hover:bg-emerald-900 hover:text-white text-emerald-900 font-bold rounded-xl text-center transition-all text-xs uppercase tracking-widest">
                                        View Full Collection
                                    </Link>
                                </div>

                                <div className="p-8 rounded-[2.5rem] bg-emerald-900 text-white shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                                    <Settings className="w-8 h-8 text-gold-500 mb-4" />
                                    <h3 className="text-xl font-display font-bold mb-4">Reading Settings</h3>
                                    <p className="text-emerald-100/60 text-sm leading-relaxed mb-6">
                                        Customize fonts, sizes, and colors for a comfortable reading experience.
                                    </p>
                                    <button
                                        onClick={() => setIsSettingsOpen(true)}
                                        className="w-full py-3 bg-white text-emerald-900 font-bold rounded-xl transition-all shadow-lg text-sm uppercase tracking-widest"
                                    >
                                        Open Settings
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Hadith Content */}
                        <div className="lg:col-span-3 space-y-8">
                            {loading ? (
                                <div className="w-full h-screen bg-emerald-900/5 rounded-[3rem] animate-pulse" />
                            ) : hadith ? (
                                <>
                                    <HadithCard hadith={hadith} showDetails />

                                    {/* Additional Commentary */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="p-8 md:p-12 rounded-[3rem] bg-emerald-900/5 border border-emerald-900/5"
                                    >
                                        <h3 className="text-xl font-display font-bold text-emerald-900 mb-6 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center text-emerald-950">
                                                <span className="font-bold">?</span>
                                            </div>
                                            Understanding this Narration
                                        </h3>
                                        <div className="space-y-6 text-emerald-950/70 leading-relaxed">
                                            <p>
                                                This narration from {hadith.collection} provides profound guidance for the believer.
                                                Scholars have noted that the context of this tradition is essential for its correct application.
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Actions Row */}
                                    <div className="flex flex-wrap items-center gap-4 justify-center">
                                        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 text-sm font-bold text-emerald-900/60 hover:text-emerald-900 transition-all uppercase tracking-widest">
                                            <Share2 className="w-4 h-4" />
                                            Share Link
                                        </button>
                                        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 text-sm font-bold text-emerald-900/60 hover:text-emerald-900 transition-all uppercase tracking-widest">
                                            <Printer className="w-4 h-4" />
                                            Print
                                        </button>
                                        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 text-sm font-bold text-ruby hover:bg-ruby/5 transition-all uppercase tracking-widest">
                                            <Flag className="w-4 h-4" />
                                            Report Error
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="p-20 text-center bg-white rounded-[3rem] border border-emerald-900/5 shadow-islamic">
                                    <h3 className="text-2xl font-display font-bold text-emerald-900 mb-4">Hadith not found</h3>
                                    <p className="text-emerald-900/60 mb-8">We couldn't find hadith №{number} in {COLLECTION_NAMES[slug] || slug}.</p>
                                    <Link href="/collections" className="text-emerald-600 font-bold uppercase tracking-widest text-sm">Return to Library</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <ReadingSettingsPanel
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </main>
    );
}
