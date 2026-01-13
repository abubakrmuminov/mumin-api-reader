# 🕌 Mumin Hadith Reader - The Immersive Reading Ecosystem

```text
██████╗ ███████╗ █████╗ ██████╗ ███████╗██████╗ 
██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
██████╔╝█████╗  ███████║██║  ██║█████╗  ██████╔╝
██╔══██╗██╔══╝  ██╔══██║██║  ██║██╔══╝  ██╔══██╗
██║  ██║███████╗██║  ██║██████╔╝███████╗██║  ██║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
```

> **Elevating the Spiritual Reading Experience through technical excellence (Ihsaan).**

The **Mumin Hadith Reader** is a premium, high-performance web platform designed to provide a beautiful and immersive environment for reading, searching, and studying authentic Hadith collections. Built with **Next.js 14**, it combines state-of-the-art web technology with timeless Islamic aesthetics.

---

## 📖 Extended Table of Contents

1.  [Vision & Islamic Philosophy](#1-vision--islamic-philosophy)
2.  [The 7 Pillars of Reader Engineering](#2-the-7-pillars-of-reader-engineering)
3.  [Technology Stack Deep Dive](#3-technology-stack-deep-dive)
    - [The Power of Next.js 14](#the-power-of-nextjs-14)
    - [Design System & Atomic Tokens](#design-system--atomic-tokens)
    - [Client-Side State Synchronization](#client-side-state-synchronization)
4.  [Folder Structure: The Anatomy of the Reader](#4-folder-structure-the-anatomy-of-the-reader)
    - [App Router Architecture (`/src/app`)](#app-router-architecture-srcapp)
    - [Atomic Component Library (`/src/components`)](#atomic-component-library-srccomponents)
5.  [Core Feature Documentation](#5-core-feature-documentation)
    - [Immersive Reading Experience](#immersive-reading-experience)
    - [Advanced Discovery (Hadith of the Day)](#advanced-discovery-hadith-of-the-day)
    - [Offline Personalization](#offline-personalization)
6.  [SEO & Search Leadership Strategy](#6-seo--search-leadership-strategy)
    - [Atomic & Keyword-Rich Routing](#atomic--keyword-rich-routing)
    - [Semantic & Schema.org Infrastructure](#semantic--schemaorg-infrastructure)
7.  [API Specification Reference](#7-api-specification-reference)
    - [Authentication Protocol](#authentication-protocol)
    - [Hadith & Collection Endpoints](#hadith--collection-endpoints)
8.  [Performance Engineering](#8-performance-engineering)
    - [Lighthouse 100 Checklist](#lighthouse-100-checklist)
    - [Hydration Guard Pattern](#hydration-guard-pattern)
9.  [Setup & Local Development](#9-setup--local-development)
    - [Local Development Setup](#local-development-setup)
    - [Environment Configuration](#environment-configuration)
10. [Internationalization (i18n)](#10-internationalization-i18n)
11. [PWA & Offline Capability](#11-pwa--offline-capability)
12. [Security & Content Integrity](#12-security--content-integrity)
13. [Maintenance & Scaling Protocols](#13-maintenance--scaling-protocols)
14. [Project Roadmap (2026)](#14-project-roadmap-2026)
15. [Frequently Asked Questions (FAQ)](#15-frequently-asked-questions-faq)
16. [Troubleshooting & Support](#16-troubleshooting--support)
17. [Final Technical Word](#17-final-technical-word)

---

## 1. Vision & Islamic Philosophy

The **Mumin Hadith Reader** is designed with the concept of **Ihsaan** (technical excellence) at its core. We believe that the digital representation of the Prophetic Sunnah should be as refined and meticulously crafted as the physical manuscripts of old. Our vision is to provide a seamless, distraction-free environment where the beauty of sacred knowledge is matched by the beauty of the interface.

---

## 2. The 7 Pillars of Reader Engineering

Every pixel and line of code in the Reader is guided by these principles:
1.  **Excellence (Ihsaan)**: Striving for near-instant load times and 100/100 Lighthouse scores.
2.  **Harmony (Mizan)**: A balanced color palette that calms the mind and reduces cognitive load.
3.  **Clarity (Bayan)**: Intuitive UX where the user never feels lost.
4.  **Service (Khidmah)**: Building features like bookmarks and tracking to serve the seeker of knowledge.
5.  **Protection (Hifz)**: Ensuring the integrity of the sacred text through secure API interaction.
6.  **Accessibility (Yusr)**: Deeply optimized for screen readers and varied visual needs.
7.  **Sincerity (Ikhlas)**: Open-source, transparent code built for the benefit of the Ummah.

---

## 3. Technology Stack Deep Dive

### The Power of Next.js 14
We take full advantage of **Server Actions** and **React Server Components (RSC)** to fetch collection metadata at the edge, reducing client-side JavaScript and maximizing performance.

### Design System & Atomic Tokens
The Reader uses a custom design system built on **Tailwind CSS**. 
- **Emerald Primary**: `hsl(158, 86%, 17%)`
- **Gold Accent**: `hsl(38, 92%, 50%)`
- **Typography**: Dynamic loading of `Amiri` for Arabic and `Inter` for technical precision.

### Client-Side State Synchronization
We use **Zustand** with the `persist` middleware to manage persistent state (bookmarks, settings) without causing layout shifts, utilizing a custom **Hydration Guard** pattern.

---

## 4. Folder Structure: The Anatomy of the Reader

```text
/src/app
  /collections/             # Dynamic routes for hadith libraries
  /search/                  # High-performance search interface
  /random/                  # Daily wisdom & discovery engine
/src/components
  /ui/                      # Radix-based premium atoms
  /reader/                  # Domain-specific organisms (HadithCard, etc.)
  /layout/                  # Glassmorphic sidebars and navbars
/src/hooks                  # Performance-optimized state hooks
/src/store                  # Persistent Zustand stores
/src/messages               # i18n translation bundles
```

---

## 5. Core Feature Documentation

### Immersive Reading Experience
- **Multi-Theme Engine**: Light, Sepia, and AMOLED-optimized Dark Mode.
- **Typography Controls**: Real-time font scaling (12px to 32px) without layout shift.
- **Arabic Font Engine**: Dynamic loading of Naskh and Kufic inspired fonts.

### Advanced Discovery
- **Daily Wisdom**: Server-side generated "Hadith of the Day".
- **Random Discovery**: A weighted random engine ensuring diverse collection exposure.

### Offline Personalization
- **Bookmarks**: Stored locally via `IndexedDB` for up to 5,000 entries.
- **Reading Progress**: Automatic scroll tracking for pick-up-where-you-left-off functionality.

---

## 6. SEO & Search Leadership Strategy

### Atomic Routing
Our URLs are keyword-rich and predictable: `/collections/sahih-bukhari/42`. This structure follows traditional library cataloging and is highly optimized for search engine indexing.

### Semantic Infrastructure
- **Article Schema**: Every page is decorated with `Article` structured data.
- **Breadcrumb Schema**: Ensures search engines understand the sitewide hierarchy.

---

## 7. API Specification Reference

### Authentication Protocol
The Reader communicates with the Mumin API using an encrypted **API Key** header.
- **Header**: `x-api-key: sk_mumin_...`

### Hadith Endpoints
Returns structured JSON containing `arabicText`, `translation`, and verifiable `grade` (e.g., Sahih, Daif).

---

## 8. Performance Engineering

### Lighthouse 100 Checklist
- [x] All images optimized via `next/image`.
- [x] Zero Layout Shift (CLS) on dynamic content.
- [x] Route Prefetching for seamless navigation.

### Hydration Guard Pattern
Ensures that client-side settings (like dark mode) are applied instantly without the "flash of unstyled content" (FOUC).

---

## 9. Setup & Local Development

1.  `npm install`
2.  `cp .env.example .env.local`
3.  `npm run dev`
4.  Navigate to `http://localhost:3000`

---

## 10. Internationalization (i18n)

The Reader is built to serve the global Ummah.
- **Dynamic Localization**: Uses `next-intl` for seamless switching between Arabic, English, and Russian.
- **RTL Support**: The layout automatically mirrors when Arabic is selected, ensuring the correct reading flow for the sacred text.

---

## 11. PWA & Offline Capability

- **Service Workers**: Caches critical assets for offline access.
- **PWA Manifest**: Allows users to "install" the Mumin Reader on their mobile devices for a native-like experience.

---

## 12. Security & Content Integrity

- **API Safety**: All requests are signed and secured via the Mumin Shield.
- **Data Protection**: Personal data (bookmarks) is stored on the client-side, respecting user privacy and GDPR principles.

---

## 13. Maintenance & Scaling Protocols

- **Monthly Audits**: Automatic checks for broken links and metadata consistency.
- **Scaling**: Optimized for edge deployment on Vercel, ensuring low latency globally.

---

## 14. Project Roadmap (2026)

### Q1: The Foundation
- [x] Immersive Reader Core.
- [x] Bookmark & Progress Sync.
- [x] SEO Optimization.

### Q2: Expansion
- [ ] Offline PWA Mode.
- [ ] Audio Narration Integration.

---

## 15. Frequently Asked Questions (FAQ)

**Q: Are the hadiths verified?**  
A: Yes, every hadith is served with its scholarly grade from the Mumin API.

---

## 16. Troubleshooting & Support

**"Translation missing"**: Run `npm run build` to re-sync the `messages/` folder with the latest i18n keys.

---

## 17. Final Technical Word

The Mumin Hadith Reader is more than an application; it is a digital sanctuary for knowledge. We invite you to explore the source of wisdom with the respect it deserves.

---

🕌 Mumin Development Team
[reader.mumin.ink](https://reader.mumin.ink)
