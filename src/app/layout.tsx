import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "../components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://korachoco.cv";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vo Thanh Phat | Frontend Developer",
    template: "%s | Vo Thanh Phat",
  },
  description:
    "Portfolio of Vo Thanh Phat — Frontend Developer specialising in Next.js, TypeScript, and modern web interfaces.",
  keywords: [
    "Vo Thanh Phat",
    "Võ Thanh Phát",
    "frontend developer",
    "web developer",
    "portfolio",
    "react",
    "next.js",
    "typescript",
    "ho chi minh city",
    "vietnam developer",
  ],
  authors: [{ name: "Vo Thanh Phat", url: BASE_URL }],
  creator: "Vo Thanh Phat",
  publisher: "Vo Thanh Phat",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["vi_VN"],
    url: BASE_URL,
    siteName: "Vo Thanh Phat",
    title: "Vo Thanh Phat | Frontend Developer",
    description:
      "Portfolio of Vo Thanh Phat — Frontend Developer specialising in Next.js, TypeScript, and modern web interfaces.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vo Thanh Phat — Frontend Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@korachoco",
    creator: "@korachoco",
    title: "Vo Thanh Phat | Frontend Developer",
    description:
      "Portfolio of Vo Thanh Phat — Frontend Developer specialising in Next.js, TypeScript, and modern web interfaces.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  applicationName: "Vo Thanh Phat Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Vo Thanh Phat",
  url: BASE_URL,
  description:
    "Portfolio of Vo Thanh Phat — Frontend Developer specialising in Next.js, TypeScript, and modern web interfaces.",
  author: {
    "@type": "Person",
    name: "Vo Thanh Phat",
    url: BASE_URL,
    jobTitle: "Frontend Developer",
    sameAs: [
      "https://github.com/korachoco",
      "https://linkedin.com/in/korachoco",
    ],
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#7c3aed" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#6d28d9" media="(prefers-color-scheme: light)" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-lunar-bg)] text-[var(--color-lunar-text)]`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
