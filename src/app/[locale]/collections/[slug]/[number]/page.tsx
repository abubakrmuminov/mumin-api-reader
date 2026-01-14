'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
import { Link, useRouter, usePathname } from '@/lib/navigation';
import { StructuredData, generateHadithSchema, generateBreadcrumbSchema } from '@/components/StructuredData';
import { useTranslations } from 'next-intl';

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

// This is a client component.

export default function HadithDeepViewPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const number = parseInt(params.number as string);
    const locale = params.locale as string || 'en';
    const t = useTranslations('Hadith');
    const tColl = useTranslations('Collections');
    const tSettings = useTranslations('Settings');
    const tNav = useTranslations('Navbar');

    const [hadith, setHadith] = useState<Hadith | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        async function loadHadith() {
            if (!slug || !number) return;
            setLoading(true);
            try {
                // Use slug directly as it matches the database format
                const response = await hadithApi.getHadiths({
                    collection: slug,
                    hadithNumber: number,
                    limit: 1,
                    language: locale
                });

                // Handle nested response structure: { success, data: { data: [...], pagination } }
                const responseData = response.data || response;
                const hadiths = responseData.data || responseData;

                if (Array.isArray(hadiths) && hadiths.length > 0) {
                    setHadith(hadiths[0]);
                } else {
                    setHadith(null);
                }
            } catch (err) {
                console.error('Failed to load hadith', err);
                setHadith(null);
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
                        { name: tNav('home'), item: BASE_URL },
                        { name: tNav('collections'), item: `${BASE_URL}/collections` },
                        { name: hadith.collection, item: `${BASE_URL}/collections/${slug}` },
                        { name: `${t('book')} ${hadith.hadithNumber}`, item: `${BASE_URL}/collections/${slug}/${hadith.hadithNumber}` }
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
                            <Link href="/collections" className="hover:text-emerald-900 transition-colors">{tColl('library')}</Link>
                            <ChevronRight className="w-3 h-3" />
                            {hadith && (
                                <Link href={`/collections/${slug}`} className="hover:text-emerald-900 transition-colors">
                                    {hadith.collection}
                                </Link>
                            )}
                            <ChevronRight className="w-3 h-3 text-emerald-900/10" />
                            <span className="text-emerald-900">{t('book')} {number}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigateTo('prev')}
                                disabled={number <= 1}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-sm font-bold text-emerald-900 uppercase tracking-widest hover:border-emerald-600/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                {t('previous')}
                            </button>
                            <button
                                onClick={() => navigateTo('next')}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-sm font-bold text-emerald-900 uppercase tracking-widest hover:border-emerald-600/20 transition-all"
                            >
                                {t('next')}
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
                                        {t('collection_context')}
                                    </h3>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] font-bold text-emerald-900/30 uppercase tracking-[0.2em] mb-1">{t('book')}</p>
                                            <p className="font-semibold text-emerald-900 leading-tight">{t('book')} {hadith?.bookNumber || '...'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-emerald-900/30 uppercase tracking-[0.2em] mb-1">{tColl('title')}</p>
                                            <p className="text-sm text-emerald-900/60 leading-relaxed">{hadith?.collection || '...'}</p>
                                        </div>
                                    </div>
                                    <Link href={`/collections/${slug}`} className="block w-full mt-8 py-3 bg-emerald-900/5 hover:bg-emerald-900 hover:text-white text-emerald-900 font-bold rounded-xl text-center transition-all text-xs uppercase tracking-widest">
                                        {t('view_full_collection')}
                                    </Link>
                                </div>

                                <div className="p-8 rounded-[2.5rem] bg-emerald-900 text-white shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                                    <Settings className="w-8 h-8 text-gold-500 mb-4" />
                                    <h3 className="text-xl font-display font-bold mb-4">{tSettings('title')}</h3>
                                    <p className="text-emerald-100/60 text-sm leading-relaxed mb-6">
                                        {tSettings('customize')}
                                    </p>
                                    <button
                                        onClick={() => setIsSettingsOpen(true)}
                                        className="w-full py-3 bg-white text-emerald-900 font-bold rounded-xl transition-all shadow-lg text-sm uppercase tracking-widest"
                                    >
                                        {tSettings('open_settings')}
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
                                            {t('understanding')}
                                        </h3>
                                        <div className="space-y-6 text-emerald-950/70 leading-relaxed">
                                            <p>
                                                {t('understanding_text', { collection: hadith.collection })}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Actions Row */}
                                    <div className="flex flex-wrap items-center gap-4 justify-center">
                                        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 text-sm font-bold text-emerald-900/60 hover:text-emerald-900 transition-all uppercase tracking-widest">
                                            <Share2 className="w-4 h-4" />
                                            {t('share_link')}
                                        </button>
                                        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 text-sm font-bold text-emerald-900/60 hover:text-emerald-900 transition-all uppercase tracking-widest">
                                            <Printer className="w-4 h-4" />
                                            {t('print')}
                                        </button>
                                        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 text-sm font-bold text-ruby hover:bg-ruby/5 transition-all uppercase tracking-widest">
                                            <Flag className="w-4 h-4" />
                                            {t('report_error')}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="p-20 text-center bg-white rounded-[3rem] border border-emerald-900/5 shadow-islamic">
                                    <h3 className="text-2xl font-display font-bold text-emerald-900 mb-4">{t('not_found')}</h3>
                                    <p className="text-emerald-900/60 mb-8">{t('not_found_message', { number, collection: slug })}</p>
                                    <Link href="/collections" className="text-emerald-600 font-bold uppercase tracking-widest text-sm">{tColl('return_to_library')}</Link>
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
