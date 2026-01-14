'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GeometricPattern } from '@/components/GeometricPattern';
import { motion } from 'framer-motion';
import { Heart, Shield, Globe, Zap, Users, BookOpen } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen relative">
            <GeometricPattern opacity={0.02} />
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-emerald-900 mb-8">
                            Our <span className="gradient-text">Mission</span>
                        </h1>
                        <p className="text-xl text-emerald-900/60 leading-relaxed">
                            Mumin Hadith Reader is dedicated to making the vast and sacred tradition
                            of Prophetic wisdom accessible, understandable, and beautiful for the modern age.
                        </p>
                    </motion.div>

                    {/* Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {[
                            {
                                icon: Shield,
                                title: 'Authenticity First',
                                desc: 'We prioritize verified narrations from the most respected classical sources.'
                            },
                            {
                                icon: Globe,
                                title: 'Universal Access',
                                desc: 'Supporting multiple languages to connect the global Ummah with the Sunnah.'
                            },
                            {
                                icon: Heart,
                                title: 'Beautiful Experience',
                                desc: 'Ihsaan (excellence) in design to honor the words of the Prophet (ﷺ).'
                            },
                            {
                                icon: Zap,
                                title: 'Modern Technology',
                                desc: 'Lightning fast search and seamless reading on any device.'
                            }
                        ].map((pillar, idx) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-[2.5rem] bg-white border border-emerald-900/5 shadow-sm"
                            >
                                <pillar.icon className="w-10 h-10 text-gold-500 mb-6" />
                                <h3 className="text-xl font-display font-bold text-emerald-900 mb-4">{pillar.title}</h3>
                                <p className="text-emerald-900/60 leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="space-y-12 text-emerald-950/70 leading-relaxed text-lg">
                        <h2 className="text-3xl font-display font-bold text-emerald-900 mb-8">The Mumin Project</h2>
                        <p>
                            Mumin is more than just a website; it is an ecosystem of tools designed to serve
                            the spiritual needs of Muslims. While our developers build the robust Mumin API,
                            this Reader platform serves as the window for users to interact with that data.
                        </p>
                        <p>
                            We believe that knowledge should be free, open, and presented with the utmost respect.
                            Our methodology involves cross-referencing multiple digital libraries and working
                            with students of knowledge to ensure the highest data quality.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
