'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { HadithCard } from '@/components/HadithCard';
import { CollectionCard } from '@/components/CollectionCard';
import { ReadingSettingsPanel } from '@/components/ReadingSettingsPanel';
import { hadithApi, Hadith } from '@/lib/api/client';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FEATURED_COLLECTIONS = [
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
];

export default function HomePage() {
  const [dailyHadith, setDailyHadith] = useState<Hadith | null>(null);
  const [featuredCollections, setFeaturedCollections] = useState<any[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [hadith, collections] = await Promise.all([
          hadithApi.getDailyHadith(),
          hadithApi.getCollections()
        ]);
        setDailyHadith(hadith);
        setFeaturedCollections(collections.slice(0, 3));
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen relative">
      <GeometricPattern opacity={0.03} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-2 rounded-full bg-emerald-900/5 border border-emerald-900/10 backdrop-blur-md mb-8"
            >
              <span className="text-sm font-bold tracking-[0.3em] text-emerald-900 uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                Your Spiritual Companion
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold text-emerald-900 mb-6 leading-tight"
            >
              Connect with the <br />
              <span className="gradient-text">Prophetic Wisdom</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-emerald-900/60 max-w-2xl leading-relaxed"
            >
              Read, study, and reflect upon the authentic traditions of the Prophet Muhammad (ﷺ)
              in a beautiful and immersive environment.
            </motion.p>
          </div>

          {/* Daily Hadith Hero Card */}
          <div className="max-w-4xl mx-auto mb-32">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-emerald-900">Today's Hadith</h2>
              <div className="h-px flex-1 mx-8 bg-emerald-900/10" />
              <button className="text-sm font-bold text-emerald-900/40 hover:text-emerald-900 transition-colors uppercase tracking-widest flex items-center gap-2">
                Refresh <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {loading ? (
              <div className="w-full h-96 bg-emerald-900/5 rounded-[3rem] animate-pulse" />
            ) : dailyHadith ? (
              <HadithCard hadith={dailyHadith} />
            ) : (
              <div className="p-12 text-center bg-white rounded-[3rem] border border-emerald-900/5">
                <p className="text-emerald-900/40">Unable to load daily hadith. Please check your connection.</p>
              </div>
            )}
          </div>

          {/* Collections Grid */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-emerald-900 mb-2">Explore Collections</h2>
                <p className="text-emerald-900/60">Discover the major books of Hadith from authentic sources.</p>
              </div>
              <Link
                href="/collections"
                className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-900 text-white font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-lg"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="h-64 rounded-3xl bg-emerald-900/5 animate-pulse" />
                ))
              ) : (
                featuredCollections.map((col, idx) => (
                  <CollectionCard
                    key={col.slug}
                    slug={col.slug}
                    nameEnglish={col.nameEnglish}
                    nameArabic={col.nameArabic}
                    count={col.totalHadith || col.count || 0}
                    description={col.description}
                  />
                ))
              )}
            </div>

            <div className="mt-12 text-center md:hidden">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-900 text-white font-bold text-sm tracking-widest uppercase shadow-lg"
              >
                View All Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white py-20 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center rotate-45">
                <span className="text-emerald-900 font-bold -rotate-45">M</span>
              </div>
              <span className="text-2xl font-display font-bold">Mumin Hadith</span>
            </Link>
            <p className="text-emerald-100/60 max-w-sm leading-relaxed mb-8">
              Connecting the Ummah with the authentic Sunnah through modern technology and beautiful design.
            </p>
            <div className="flex items-center gap-6">
              {/* Social Icons */}
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-gold-500">Platform</h4>
            <ul className="space-y-4 text-emerald-100/60">
              <li><Link href="/collections" className="hover:text-white transition-colors">Collections</Link></li>
              <li><Link href="/random" className="hover:text-white transition-colors">Random Hadith</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Search Results</Link></li>
              <li><Link href="/bookmarks" className="hover:text-white transition-colors">Your Bookmarks</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-gold-500">About</h4>
            <ul className="space-y-4 text-emerald-100/60">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link href="/methodology" className="hover:text-white transition-colors">Methodology</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 text-center text-emerald-100/20 text-xs">
          © 2026 Mumin. All rights reserved. Built with ihsaan for the global Ummah.
        </div>
      </footer>

      <ReadingSettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </main>
  );
}
