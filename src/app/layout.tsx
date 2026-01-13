import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Amiri, Cairo, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mumin.ink';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mumin Hadith Reader | Access Authentic Prophetic Wisdom",
    template: "%s | Mumin Hadith"
  },
  description: "A premium, beautiful experience for reading and studying authentic Hadith collections. Your spiritual companion for the Sunnah. 100% authentic narrations.",
  applicationName: "Mumin Hadith",
  authors: [{ name: "Mumin Team" }],
  generator: "Next.js",
  keywords: ["Hadith", "Prophet Muhammad", "Sunnah", "Sahih Bukhari", "Sahih Muslim", "Islamic Knowledge", "Mumin", "Daily Hadith"],
  referrer: "origin-when-cross-origin",
  creator: "Mumin",
  publisher: "Mumin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ar-SA': '/ar',
      'ru-RU': '/ru',
      'ur-PK': '/ur',
      'tr-TR': '/tr',
      'id-ID': '/id',
    },
  },
  openGraph: {
    title: "Mumin Hadith Reader | Access Authentic Prophetic Wisdom",
    description: "Read and study authentic Hadith in a beautiful environment.",
    url: BASE_URL,
    siteName: "Mumin Hadith",
    images: [
      {
        url: "/og-image.jpg", // Placeholder until dynamic OG is ready
        width: 1200,
        height: 630,
        alt: "Mumin Hadith Reader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mumin Hadith Reader",
    description: "Connect with the Prophetic Wisdom.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mumin Hadith",
  },
};

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { StructuredData, generateSearchSchema } from "@/components/StructuredData";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <StructuredData data={generateSearchSchema(BASE_URL)} />
      </head>
      <body
        className={cn(
          "min-h-screen bg-sand font-body antialiased",
          inter.variable,
          playfair.variable,
          amiri.variable,
          cairo.variable,
          poppins.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
