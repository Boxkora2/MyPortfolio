import type { Metadata } from "next";
import { VideoDownloader } from "@/components/VideoDownloader";

export const metadata: Metadata = {
  title: "Video Converter & Downloader Tool",
  description:
    "A local video downloader and converter utility built by Vo Thanh Phat. Supports YouTube, TikTok, Instagram, and more via yt-dlp. Runs only in local environments.",
  keywords: ["video downloader", "video converter", "yt-dlp", "youtube downloader", "Vo Thanh Phat", "web tool"],
  alternates: {
    canonical: "https://korachoco.cv/converter",
    languages: {
      en: "https://korachoco.cv/converter",
      vi: "https://korachoco.cv/vi/converter",
      "x-default": "https://korachoco.cv/converter",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["vi_VN"],
    url: "https://korachoco.cv/converter",
    title: "Video Converter & Downloader | Vo Thanh Phat",
    description:
      "A local video downloader utility supporting YouTube, TikTok, Instagram, and more.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Video Converter Tool" }],
  },
  robots: { index: true, follow: true },
};

export default async function ConverterPage() {
  return (
    <main className="min-h-screen py-[80px] px-4 sm:px-6 relative overflow-hidden flex flex-col items-center">
         {/* Background effects */}
         <div className="absolute top-20 left-10 opacity-20 pointer-events-none">
            <div className="w-72 h-72 bg-pink-500 rounded-full blur-[120px]"></div>
         </div>
         <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none">
            <div className="w-80 h-80 bg-red-600 rounded-full blur-[120px]"></div>
         </div>

         <div className="relative z-10 w-full">
            <VideoDownloader />
         </div>
    </main>
  );
}
