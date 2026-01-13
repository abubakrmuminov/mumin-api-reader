'use client';

import React from 'react';
import {
    Heart,
    Share2,
    Copy,
    ExternalLink,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Hadith } from '@/lib/api/client';
import { useReadingSettings } from '@/store/useReadingSettings';
import { useBookmarks } from '@/store/useBookmarks';
import { motion } from 'framer-motion';
import { getCollectionSlug } from '@/lib/utils';
import Link from 'next/link';

interface HadithCardProps {
    hadith: Hadith;
    showDetails?: boolean;
}

const GRADES = {
    sahih: { label: 'Sahih', color: 'bg-emerald-500', text: 'Authentic' },
    hasan: { label: 'Hasan', color: 'bg-amber-500', text: 'Good' },
    daif: { label: 'Daif', color: 'bg-ruby', text: 'Weak' },
    mawdu: { label: 'Mawdu', color: 'bg-gray-500', text: 'Fabricated' },
};

export const HadithCard: React.FC<HadithCardProps> = ({ hadith, showDetails = false }) => {
    const { textSize, arabicFont, mode, showTranslation } = useReadingSettings();
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

    const bookmarked = isBookmarked(hadith.id);
    const grade = hadith.translation?.grade?.toLowerCase() as keyof typeof GRADES || 'sahih';
    const gradeInfo = GRADES[grade] || GRADES.sahih;

    const fontSizes = {
        1: { arabic: 'text-lg', english: 'text-sm' },
        2: { arabic: 'text-xl', english: 'text-base' },
        3: { arabic: 'text-2xl', english: 'text-lg' },
        4: { arabic: 'text-3xl', english: 'text-xl' },
        5: { arabic: 'text-4xl', english: 'text-2xl' },
    };

    const currentSize = fontSizes[textSize as keyof typeof fontSizes];

    const handleBookmark = () => {
        if (bookmarked) {
            removeBookmark(hadith.id);
        } else {
            addBookmark({
                hadithId: hadith.id,
                collection: hadith.collection,
                bookNumber: hadith.bookNumber,
                hadithNumber: hadith.hadithNumber,
                textPreview: hadith.translation?.text.substring(0, 100) || '',
                timestamp: Date.now(),
            });
        }
    };

    const copyToClipboard = () => {
        const text = `${hadith.arabicText}\n\n${hadith.translation?.text}\n\n— ${hadith.collection} ${hadith.hadithNumber}`;
        navigator.clipboard.writeText(text);
        // Add toast here
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "group relative p-6 md:p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden",
                mode === 'light' && "bg-white border-emerald-900/5 shadow-islamic hover:shadow-2xl hover:border-emerald-900/10",
                mode === 'sepia' && "bg-[#f4ecd8] border-[#433422]/10 text-[#433422]",
                mode === 'dark' && "bg-[#0a1a16] border-white/5 text-[#e0e0e0] shadow-none",
                mode === 'contrast' && "bg-black border-white/20 text-white"
            )}
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-900/5 rounded-bl-[5rem] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="px-4 py-1.5 rounded-full bg-emerald-900/5 border border-emerald-900/10 backdrop-blur-md">
                        <span className="text-xs font-bold tracking-widest text-emerald-900 uppercase">
                            {hadith.collection} • {hadith.hadithNumber}
                        </span>
                    </div>
                    <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider", gradeInfo.color)}>
                        {gradeInfo.label}
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={handleBookmark}
                        className={cn(
                            "p-2.5 rounded-full transition-all duration-300",
                            bookmarked ? "text-gold-500 bg-gold-500/10" : "text-emerald-900/30 hover:bg-emerald-900/5"
                        )}
                    >
                        <Heart className={cn("w-5 h-5", bookmarked && "fill-current scale-110")} />
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="p-2.5 rounded-full text-emerald-900/30 hover:bg-emerald-900/5 transition-all"
                        title="Copy Citation"
                    >
                        <Copy className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 rounded-full text-emerald-900/30 hover:bg-emerald-900/5 transition-all">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Arabic Text */}
            <div className="mb-8 relative z-10" dir="rtl">
                <p className={cn(
                    "leading-[2.2] text-right font-medium",
                    currentSize.arabic,
                    arabicFont === 'Amiri' && "font-amiri",
                    arabicFont === 'Cairo' && "font-cairo",
                    arabicFont === 'Traditional Arabic' && "font-serif"
                )}>
                    {hadith.arabicText}
                </p>
            </div>

            {/* Translation */}
            {showTranslation && hadith.translation && (
                <div className="mt-8 pt-8 border-t border-emerald-900/5 relative z-10">
                    <div className="flex items-center gap-2 mb-4 text-emerald-900/30">
                        <Globe className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">English Translation</span>
                    </div>
                    <p className={cn(
                        "leading-relaxed font-sans",
                        currentSize.english,
                        mode === 'light' ? "text-emerald-950/80" : "text-inherit opacity-80"
                    )}>
                        {hadith.translation.text}
                    </p>
                    {hadith.translation.narrator && (
                        <p className="mt-4 text-sm font-medium italic opacity-60">
                            — Narrated by {hadith.translation.narrator}
                        </p>
                    )}
                </div>
            )}

            {/* Footer / Actions */}
            <div className="mt-8 flex items-center justify-between relative z-10 pt-4">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-xs font-bold text-emerald-900/40 hover:text-emerald-900 transition-colors uppercase tracking-widest">
                        <Info className="w-4 h-4" />
                        Show Isnad
                    </button>
                    <Link
                        href={`/collections/${getCollectionSlug(hadith.collection)}/${hadith.hadithNumber}`}
                        className="flex items-center gap-2 text-xs font-bold text-emerald-900/40 hover:text-emerald-900 transition-colors uppercase tracking-widest"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Reference
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

const Globe = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24"
        viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" className={className}
    >
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);
