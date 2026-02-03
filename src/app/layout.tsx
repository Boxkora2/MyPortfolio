import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://korachoco.cv"),
  title: {
    default: "My Portfolio | Web Developer",
    template: "%s | My Portfolio"
  },
  description: "Web Developer Portfolio - Building modern web applications with passion and expertise",
  keywords: ["web developer", "portfolio", "react", "next.js", "typescript", "frontend developer"],
  authors: [{ name: "Boxkora" }],
  creator: "Boxkora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://korachoco.cv",
    siteName: "My Portfolio",
    title: "My Portfolio | Web Developer",
    description: "Web Developer Portfolio - Building modern web applications with passion and expertise",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Portfolio | Web Developer",
    description: "Web Developer Portfolio - Building modern web applications with passion and expertise",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-lunar-bg)] text-[var(--color-lunar-text)]`}
        suppressHydrationWarning
      >
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
