import type { Metadata } from "next";
import { ClickyGame } from "../../../components/ClickyGame";

export const metadata: Metadata = {
  title: "Nghiện Click — Trò Chơi Click Giải Trí",
  description:
    "Chơi Nghiện Click — trò chơi click thú vị, tạo bởi Võ Thanh Phát bằng React. Kiểm tra tốc độ click của bạn và phá vỡ kỷ lục!",
  keywords: ["nghiện click", "clicky addicty", "trò chơi click", "browser game", "Võ Thanh Phát"],
  alternates: {
    canonical: "https://korachoco.cv/vi/clicky-addicty",
    languages: {
      en: "https://korachoco.cv/clicky-addicty",
      vi: "https://korachoco.cv/vi/clicky-addicty",
      "x-default": "https://korachoco.cv/clicky-addicty",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "https://korachoco.cv/vi/clicky-addicty",
    title: "Nghiện Click — Trò Chơi | Võ Thanh Phát",
    description:
      "Trò chơi click giải trí được tạo bởi Võ Thanh Phát. Kiểm tra tốc độ click của bạn!",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Nghiện Click Game" }],
  },
};

export default function ViClickyPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center">
       {/* Background Decor */}
       <div className="absolute top-20 left-20 p-10 opacity-10 pointer-events-none animate-pulse">
        <div className="w-48 h-48 bg-[var(--color-lunar-primary)] rounded-full blur-[80px]"></div>
      </div>
      <div className="absolute bottom-20 right-20 p-10 opacity-10 pointer-events-none animate-pulse delay-700">
        <div className="w-64 h-64 bg-[var(--color-lunar-gold)] rounded-full blur-[100px]"></div>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-center text-glow">Clicky Addicty</h1>
      
      <ClickyGame />
      
    </main>
  );
}
