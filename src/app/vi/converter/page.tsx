import type { Metadata } from "next";
import { VideoDownloader } from "@/components/VideoDownloader";

export const metadata: Metadata = {
  title: "Công Cụ Tải & Chuyển Đổi Video",
  description:
    "Công cụ tải video cục bộ được xây dựng bởi Võ Thanh Phát. Hỗ trợ YouTube, TikTok, Instagram và nhiều nền tảng khác thông qua yt-dlp.",
  keywords: ["tải video", "chuyển đổi video", "yt-dlp", "youtube downloader", "Võ Thanh Phát"],
  alternates: {
    canonical: "https://korachoco.cv/vi/converter",
    languages: {
      en: "https://korachoco.cv/converter",
      vi: "https://korachoco.cv/vi/converter",
      "x-default": "https://korachoco.cv/converter",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "https://korachoco.cv/vi/converter",
    title: "Công Cụ Tải Video | Võ Thanh Phát",
    description:
      "Công cụ tải video cục bộ hỗ trợ YouTube, TikTok, Instagram và nhiều nền tảng khác.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Công Cụ Chuyển Đổi Video" }],
  },
};

export default async function ViConverterPage() {
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
