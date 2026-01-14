'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen relative">
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-display font-bold text-emerald-900 mb-12"
                    >
                        Privacy Policy
                    </motion.h1>

                    <div className="prose prose-emerald prose-lg text-emerald-950/70">
                        <p><strong>Last Updated: January 13, 2026</strong></p>

                        <h2 className="text-emerald-900">1. Information We Collect</h2>
                        <p>
                            Mumin Hadith Reader is designed with privacy in mind. We do not require account
                            registration to read hadiths. We may collect minimal anonymous usage data to
                            improve the platform performance.
                        </p>

                        <h2 className="text-emerald-900">2. Local Storage</h2>
                        <p>
                            Your bookmarks and reading settings (font size, theme) are stored locally on
                            your device using browser localStorage. This data never leaves your device
                            and is not accessible by our servers.
                        </p>

                        <h2 className="text-emerald-900">3. Cookies</h2>
                        <p>
                            We use essential cookies to manage your language preference and site
                            functionality. We do not use tracking or advertising cookies.
                        </p>

                        <h2 className="text-emerald-900">4. Third-Party Services</h2>
                        <p>
                            Our API requests are sent to the Mumin API. We may use anonymous analytics
                            providers who respect DO NOT TRACK headers.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
