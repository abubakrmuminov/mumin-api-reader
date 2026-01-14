'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { HadithCard } from '@/components/HadithCard';
import { hadithApi, Hadith, PaginatedResponse } from '@/lib/api/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search as SearchIcon, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StructuredData, generateBreadcrumbSchema } from '@/components/StructuredData';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

// This is a client-side only component. The server-side metadata and page structure 
// are handled in a separate server component file if needed.
// However, in Next.js 13+ App Router, you can't export metadata from a 'use client' file.
// We will separate the metadata to a parent server component or metadata file.


export default function SearchResultsPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const [results, setResults] = useState<PaginatedResponse<Hadith> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilters, setActiveFilters] = useState({
        collection: '',
        grade: '',
    });

    useEffect(() => {
        async function performSearch() {
            if (!query) return;

            setLoading(true);
            setError(null);

            try {
                const data = await hadithApi.searchHadiths({
                    q: query,
                    page: 1,
                    limit: 20
                });
                setResults(data);
            } catch (err) {
                console.error('Search failed', err);
                setError('Failed to fetch search results. Please try again.');
            } finally {
                setLoading(false);
            }
        }

        performSearch();
    }, [query]);

    return (
        <main className="min-h-screen relative">
            <StructuredData data={generateBreadcrumbSchema([
                { name: 'Home', item: BASE_URL },
                { name: 'Search', item: `${BASE_URL}/search` }
            ])} />
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Search Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4"
                            >
                                <SearchIcon className="w-4 h-4" />
                                Search Results
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-display font-bold text-emerald-900"
                            >
                                {query ? `Results for "${query}"` : 'All Hadiths'}
                            </motion.h1>
                            {results && (
                                <p className="mt-4 text-emerald-900/40 font-medium">
                                    Found {results.pagination.total.toLocaleString()} results
                                    {results.pagination.total > 0 && ` • Showing page ${results.pagination.page} of ${results.pagination.totalPages}`}
                                </p>
                            )}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-3"
                        >
                            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-sm font-bold text-emerald-900 uppercase tracking-widest hover:border-emerald-600/20 transition-all">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>
                            <div className="h-10 w-px bg-emerald-900/10 hidden md:block" />
                            <div className="flex items-center gap-1">
                                {['All', 'Sahih', 'Hasan'].map((grade) => (
                                    <button
                                        key={grade}
                                        className={cn(
                                            "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                                            grade === 'All'
                                                ? "bg-emerald-900 text-white shadow-md"
                                                : "text-emerald-900/40 hover:bg-emerald-900/5"
                                        )}
                                    >
                                        {grade}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Filters - Desktop */}
                        <div className="hidden lg:block space-y-8">
                            <div className="p-8 rounded-[2rem] bg-emerald-900/5 border border-emerald-900/5">
                                <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-900 uppercase tracking-widest mb-6 border-b border-emerald-900/5 pb-4">
                                    <Filter className="w-4 h-4" />
                                    Collections
                                </h3>
                                <div className="space-y-3">
                                    {['Bukhari', 'Muslim', 'Abu Dawud', 'Tirmidhi', 'Nasa\'i', 'Ibn Majah'].map((col) => (
                                        <label key={col} className="flex items-center gap-3 group cursor-pointer">
                                            <div className="w-5 h-5 rounded-md border-2 border-emerald-900/10 group-hover:border-emerald-600/30 transition-colors flex items-center justify-center">
                                                {/* Checkmark icon if selected */}
                                            </div>
                                            <span className="text-sm font-medium text-emerald-900/60 group-hover:text-emerald-900 transition-colors">{col}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-emerald-900 to-emerald-950 text-white relative overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                                <h3 className="text-xl font-display font-bold mb-4 relative z-10">Advanced Search</h3>
                                <p className="text-emerald-100/60 text-sm leading-relaxed mb-6 relative z-10">
                                    Refine your search by specific narrators, references, or topics.
                                </p>
                                <button className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-emerald-950 font-bold rounded-xl transition-all shadow-lg relative z-10 text-sm uppercase tracking-widest">
                                    Try it Now
                                </button>
                            </div>
                        </div>

                        {/* Results Area */}
                        <div className="lg:col-span-3 space-y-8">
                            {loading ? (
                                <div className="space-y-8">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-full h-80 bg-emerald-900/5 rounded-[2rem] animate-pulse" />
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="p-12 text-center bg-ruby/5 rounded-[2rem] border border-ruby/10">
                                    <AlertCircle className="w-12 h-12 text-ruby mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-ruby mb-2">Search Error</h3>
                                    <p className="text-emerald-950/60">{error}</p>
                                </div>
                            ) : results?.data.length === 0 ? (
                                <div className="p-20 text-center bg-white rounded-[3rem] border border-emerald-900/5 shadow-islamic">
                                    <div className="w-20 h-20 bg-emerald-900/5 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <SearchIcon className="w-10 h-10 text-emerald-900/20" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-emerald-900 mb-4">No results found</h3>
                                    <p className="text-emerald-900/60 max-w-sm mx-auto mb-8">
                                        We couldn't find any hadiths matching your query. Try different keywords or browse by collection.
                                    </p>
                                    <button className="px-8 py-3 bg-emerald-900 text-white font-bold rounded-full text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-lg">
                                        Clear Search
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {results?.data.map((hadith, idx) => (
                                        <HadithCard key={hadith.id} hadith={hadith} />
                                    ))}

                                    {/* Pagination */}
                                    {results && results.pagination.totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-2 pt-8">
                                            <button className="px-6 py-3 rounded-xl border border-emerald-900/10 text-emerald-900 font-bold text-sm tracking-widest uppercase hover:bg-emerald-900/5 transition-all disabled:opacity-30" disabled={!results.pagination.hasPrev}>
                                                Previous
                                            </button>
                                            <div className="px-6 py-3 font-bold text-emerald-900">
                                                Page {results.pagination.page} / {results.pagination.totalPages}
                                            </div>
                                            <button className="px-6 py-3 rounded-xl border border-emerald-900/10 text-emerald-900 font-bold text-sm tracking-widest uppercase hover:bg-emerald-900/5 transition-all disabled:opacity-30" disabled={!results.pagination.hasNext}>
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
