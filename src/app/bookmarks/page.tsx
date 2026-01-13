'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ExternalLink, Download, Share2, BookOpen } from 'lucide-react';
import { useBookmarks, Bookmark } from '@/store/useBookmarks';
import Link from 'next/link';
import { getCollectionSlug } from '@/lib/utils';

export default function BookmarksPage() {
    const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();

    const exportBookmarks = () => {
        const data = JSON.stringify(bookmarks, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mumin_bookmarks.json';
        a.click();
    };

    return (
        <main className="min-h-screen relative">
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-gold-600 font-bold text-sm tracking-widest uppercase mb-4"
                            >
                                <Heart className="w-4 h-4 fill-current" />
                                Saved Wisdom
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl font-display font-bold text-emerald-900 mb-6"
                            >
                                Your Bookmarks
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-emerald-900/60 leading-relaxed"
                            >
                                Manage your personal collection of saved hadiths. Revisit the narrations
                                that touched your heart and share them with the Ummah.
                            </motion.p>
                        </div>

                        {bookmarks.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3"
                            >
                                <button
                                    onClick={exportBookmarks}
                                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-emerald-900/5 shadow-sm text-xs font-bold text-emerald-900 uppercase tracking-widest hover:border-emerald-600/20 transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    Export
                                </button>
                                <button
                                    onClick={clearBookmarks}
                                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-ruby/5 border border-ruby/10 text-ruby text-xs font-bold uppercase tracking-widest hover:bg-ruby/10 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear All
                                </button>
                            </motion.div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnimatePresence>
                            {bookmarks.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-emerald-900/5 shadow-islamic"
                                >
                                    <div className="w-20 h-20 bg-emerald-900/5 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <Heart className="w-10 h-10 text-emerald-900/10" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-emerald-900 mb-4">No bookmarks yet</h3>
                                    <p className="text-emerald-900/60 max-w-sm mx-auto mb-8">
                                        Start exploring hadiths and click the heart icon to save them to your personal collection.
                                    </p>
                                    <Link
                                        href="/collections"
                                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-900 text-white font-bold text-sm tracking-widest uppercase shadow-lg hover:scale-105 transition-all"
                                    >
                                        Start Exploring
                                    </Link>
                                </motion.div>
                            ) : (
                                bookmarks.map((bookmark, idx) => (
                                    <motion.div
                                        key={bookmark.hadithId}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group flex flex-col p-8 rounded-[2.5rem] bg-white border border-emerald-900/5 shadow-sm hover:shadow-xl hover:border-emerald-900/10 transition-all duration-500"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-emerald-900/5 rounded-xl">
                                                    <BookOpen className="w-5 h-5 text-emerald-900" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-emerald-900 uppercase tracking-widest">
                                                        {bookmark.collection}
                                                    </p>
                                                    <p className="text-[10px] text-emerald-900/40">
                                                        Book {bookmark.bookNumber} • Reference {bookmark.hadithNumber}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeBookmark(bookmark.hadithId)}
                                                className="p-2 text-ruby/20 hover:text-ruby hover:bg-ruby/5 rounded-full transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <p className="text-emerald-950/70 leading-relaxed mb-8 line-clamp-3">
                                            {bookmark.textPreview}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-emerald-900/5">
                                            <p className="text-[10px] text-emerald-900/30 uppercase tracking-widest">
                                                Saved {new Date(bookmark.timestamp).toLocaleDateString()}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-emerald-900/40 hover:text-emerald-900 transition-colors">
                                                    <Share2 className="w-4 h-4" />
                                                </button>
                                                <Link
                                                    href={`/collections/${getCollectionSlug(bookmark.collection)}/${bookmark.hadithNumber}`}
                                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-900/5 hover:bg-emerald-900 hover:text-white text-emerald-900 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                                                >
                                                    View Full <ExternalLink className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </main>
    );
}
