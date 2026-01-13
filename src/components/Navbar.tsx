'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
    Home,
    BookOpen,
    Shuffle,
    Bookmark,
    Settings,
    Globe,
    Menu,
    X
} from 'lucide-react';
import { SearchBar } from './SearchBar';
import { cn } from '@/lib/utils';
import { useReadingSettings } from '@/store/useReadingSettings';

const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Collections', href: '/collections', icon: BookOpen },
    { name: 'Random', href: '/random', icon: Shuffle },
];

export const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const resetSettings = useReadingSettings((state) => state.resetSettings);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3",
                isScrolled ? "bg-white/80 backdrop-blur-lg border-b border-emerald-900/10 shadow-sm" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 group shrink-0"
                >
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-900 rounded-xl flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-lg">
                        <span className="text-white font-bold -rotate-45 group-hover:-rotate-90 transition-transform duration-500">M</span>
                    </div>
                    <span className="text-xl md:text-2xl font-display font-bold text-emerald-900 hidden sm:block">Mumin</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1 bg-emerald-900/5 p-1 rounded-full">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-emerald-900 text-white shadow-md scale-105"
                                        : "text-emerald-900/60 hover:text-emerald-900 hover:bg-emerald-900/5"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Search Bar - Center on Desktop */}
                <div className="flex-1 max-w-md hidden md:block">
                    <SearchBar />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/bookmarks"
                        className="p-2 text-emerald-900/60 hover:text-emerald-900 hover:bg-emerald-900/5 rounded-full transition-colors relative"
                        title="Bookmarks"
                    >
                        <Bookmark className="w-5 h-5" />
                    </Link>

                    <button
                        className="p-2 text-emerald-900/60 hover:text-emerald-900 hover:bg-emerald-900/5 rounded-full transition-colors"
                        title="Language"
                    >
                        <Globe className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => {/* Toggle Reading Panel */ }}
                        className="p-2 text-emerald-900/60 hover:text-emerald-900 hover:bg-emerald-900/5 rounded-full transition-colors"
                        title="Settings"
                    >
                        <Settings className="w-5 h-5" />
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 lg:hidden text-emerald-900 hover:bg-emerald-900/5 rounded-full transition-colors"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-[65px] bg-white z-40 lg:hidden animate-fade-in p-4">
                    <div className="flex flex-col gap-2 mt-4">
                        <div className="md:hidden mb-6">
                            <SearchBar />
                        </div>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-2xl text-lg font-medium transition-all",
                                    pathname === link.href
                                        ? "bg-emerald-900 text-white"
                                        : "text-emerald-900/60 hover:bg-emerald-900/5"
                                )}
                            >
                                <link.icon className="w-6 h-6" />
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/bookmarks"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-2xl text-lg font-medium transition-all",
                                pathname === '/bookmarks'
                                    ? "bg-emerald-900 text-white"
                                    : "text-emerald-900/60 hover:bg-emerald-900/5"
                            )}
                        >
                            <Bookmark className="w-6 h-6" />
                            Bookmarks
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};
