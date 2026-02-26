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

export const metadata: Metadata = {
  metadataBase: new URL("https://korachoco.cv"),
  title: {
    default: "Vo Thanh Phat | Frontend Developer",
    template: "%s | Vo Thanh Phat"
  },
  description: "Portfolio of Vo Thanh Phat — Frontend Developer specialising in Next.js, TypeScript, and modern web interfaces.",
  keywords: ["Vo Thanh Phat", "frontend developer", "web developer", "portfolio", "react", "next.js", "typescript"],
  authors: [{ name: "Vo Thanh Phat" }],
  creator: "Vo Thanh Phat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://korachoco.cv",
    siteName: "Vo Thanh Phat",
    title: "Vo Thanh Phat | Frontend Developer",
    description: "Portfolio of Vo Thanh Phat — Frontend Developer specialising in Next.js, TypeScript, and modern web interfaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vo Thanh Phat | Frontend Developer",
    description: "Portfolio of Vo Thanh Phat — Frontend Developer specialising in Next.js, TypeScript, and modern web interfaces.",
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
            <Analytics />
            <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
