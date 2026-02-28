import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "../../../get-dictionary";

export const metadata: Metadata = {
  title: "Sơ Yếu Lý Lịch — Võ Thanh Phát",
  description:
    "Xem và tải CV của Võ Thanh Phát — Lập Trình Viên Frontend. Kỹ năng bao gồm Next.js, React, TypeScript, Tailwind CSS và thiết kế UI/UX hiện đại.",
  keywords: [
    "CV Võ Thanh Phát",
    "lý lịch lập trình viên frontend",
    "next.js developer cv",
    "web developer resume",
    "portfolio Võ Thanh Phát",
  ],
  alternates: {
    canonical: "https://korachoco.cv/vi/cv",
    languages: {
      en: "https://korachoco.cv/cv",
      vi: "https://korachoco.cv/vi/cv",
      "x-default": "https://korachoco.cv/cv",
    },
  },
  openGraph: {
    type: "profile",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "https://korachoco.cv/vi/cv",
    title: "Sơ Yếu Lý Lịch — Võ Thanh Phát | Lập Trình Viên Frontend",
    description:
      "CV chuyên nghiệp của Võ Thanh Phát — Lập Trình Viên Frontend chuyên về Next.js, TypeScript và giao diện web hiện đại.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CV Võ Thanh Phát" }],
  },
};

export default async function CVPage() {
  const dict = await getDictionary("vi");

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated Background Decor */}
      <div className="absolute top-0 right-0 p-10 opacity-20 pointer-events-none">
        <div className="w-96 h-96 bg-[var(--color-lunar-primary)] rounded-full blur-[120px] animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-10 opacity-15 pointer-events-none">
        <div className="w-80 h-80 bg-[var(--color-lunar-gold)] rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-[var(--color-lunar-secondary)] rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-glow flex items-center justify-center gap-4">
            <span className="text-4xl animate-bounce">📄</span>
            {dict.cv.title}
          </h1>
          <p className="text-xl text-[var(--color-lunar-secondary)] font-medium mb-2">
            {dict.cv.subtitle}
          </p>
          <p className="text-sm text-[var(--color-lunar-muted)] italic">
            {dict.cv.updated}
          </p>
        </div>

        {/* Description */}
        <div className="bg-[var(--color-lunar-card)]/50 backdrop-blur-sm p-6 rounded-2xl border border-[var(--color-lunar-gold)]/30 mb-8 text-center shadow-xl">
          <p className="text-lg text-[var(--color-lunar-text)]">
            {dict.cv.description}
          </p>
        </div>

        {/* CV Display Container */}
        <div className="relative group max-w-3xl mx-auto">
          {/* Animated Border Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-lunar-primary)] via-[var(--color-lunar-gold)] to-[var(--color-lunar-secondary)] rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
          
          {/* Main CV Card */}
          <div className="relative bg-[var(--color-lunar-card)] p-4 sm:p-8 rounded-3xl border-2 border-[var(--color-lunar-gold)]/50 shadow-2xl">
            {/* Spotlight Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--color-lunar-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>
            
            {/* Clickable CV Image */}
            <a
              href="/cv2026.png"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full aspect-[210/297] overflow-hidden rounded-2xl border-4 border-[var(--color-lunar-bg)] shadow-inner group-hover:scale-[1.02] transition-transform duration-500"
            >
              <Image
                src="/cv2026.png"
                alt="Sơ Yếu Lý Lịch 2026"
                fill
                sizes="(max-width: 768px) 95vw, (max-width: 1200px) 60vw, 800px"
                className="object-contain cursor-pointer hover:scale-105 transition-transform duration-700"
                quality={100}
                priority
              />
              
              {/* Hover Overlay for Click Hint */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-2xl font-bold bg-[var(--color-lunar-gold)] px-6 py-3 rounded-full shadow-2xl">
                  🔍 {dict.cv.view_full}
                </div>
              </div>
            </a>

            {/* Corner Decorations */}
            <div className="absolute top-2 left-2 w-12 h-12 border-t-4 border-l-4 border-[var(--color-lunar-primary)] rounded-tl-2xl opacity-60"></div>
            <div className="absolute top-2 right-2 w-12 h-12 border-t-4 border-r-4 border-[var(--color-lunar-secondary)] rounded-tr-2xl opacity-60"></div>
            <div className="absolute bottom-2 left-2 w-12 h-12 border-b-4 border-l-4 border-[var(--color-lunar-gold)] rounded-bl-2xl opacity-60"></div>
            <div className="absolute bottom-2 right-2 w-12 h-12 border-b-4 border-r-4 border-[var(--color-lunar-primary)] rounded-br-2xl opacity-60"></div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center items-center mt-12">
          {/* Download Button */}
          <a
            href="/cv2026.png"
            download="CV_2026.png"
            className="group relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden min-w-[250px] text-center"
          >
            {/* Animated Background Gradient */}
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-lunar-primary)] via-[var(--color-lunar-gold)] to-[var(--color-lunar-secondary)] opacity-90 group-hover:opacity-100 transition-opacity"></span>
            
            {/* Button Content */}
            <span className="relative z-10 text-white flex items-center justify-center gap-3">
              <span className="text-2xl group-hover:animate-bounce">⬇️</span>
              {dict.cv.download}
            </span>
            
            {/* Shine Effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
          </a>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-[var(--color-lunar-card)] px-8 py-4 rounded-full border border-[var(--color-lunar-gold)]/30 shadow-lg">
            <p className="text-sm text-[var(--color-lunar-muted)] flex items-center gap-2">
              <span className="text-xl">✨</span>
              <span>Made with passion by Boxkora™</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
