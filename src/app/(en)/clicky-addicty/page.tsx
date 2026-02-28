import type { Metadata } from "next";
import { ClickyGame } from "../../../components/ClickyGame";

export const metadata: Metadata = {
  title: "Clicky Addicty — Addictive Click Game",
  description:
    "Play Clicky Addicty — a fun, fast-paced click game built by Vo Thanh Phat using React. Test your clicking speed and beat your high score!",
  keywords: ["clicky addicty", "click game", "browser game", "react game", "Vo Thanh Phat"],
  alternates: {
    canonical: "https://korachoco.cv/clicky-addicty",
    languages: {
      en: "https://korachoco.cv/clicky-addicty",
      vi: "https://korachoco.cv/vi/clicky-addicty",
      "x-default": "https://korachoco.cv/clicky-addicty",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["vi_VN"],
    url: "https://korachoco.cv/clicky-addicty",
    title: "Clicky Addicty — Addictive Click Game | Vo Thanh Phat",
    description:
      "Play Clicky Addicty — a fun, fast-paced click game built by Vo Thanh Phat. Test your clicking speed and beat your high score!",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Clicky Addicty Game" }],
  },
};

export default function Page() {
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
