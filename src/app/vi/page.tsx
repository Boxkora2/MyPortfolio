import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "../../get-dictionary";
import { FeaturedSection } from "@/components/FeaturedSection";

export const metadata: Metadata = {
  title: "Võ Thanh Phát | Lập Trình Viên Frontend",
  description:
    "Trang cá nhân của Võ Thanh Phát — Lập Trình Viên Frontend chuyên về Next.js, TypeScript, React và giao diện web hiện đại.",
  keywords: [
    "Võ Thanh Phát",
    "Vo Thanh Phat",
    "lập trình viên frontend",
    "web developer việt nam",
    "next.js developer",
    "typescript developer",
    "portfolio",
  ],
  alternates: {
    canonical: "https://korachoco.cv/vi",
    languages: {
      en: "https://korachoco.cv",
      vi: "https://korachoco.cv/vi",
      "x-default": "https://korachoco.cv",
    },
  },
  openGraph: {
    type: "profile",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "https://korachoco.cv/vi",
    title: "Võ Thanh Phát | Lập Trình Viên Frontend",
    description:
      "Trang cá nhân của Võ Thanh Phát — Lập Trình Viên Frontend chuyên về Next.js, TypeScript và giao diện web hiện đại.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Võ Thanh Phát — Lập Trình Viên Frontend",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Võ Thanh Phát",
  alternateName: "Vo Thanh Phat",
  url: "https://korachoco.cv/vi",
  jobTitle: "Lập Trình Viên Frontend",
  description: "Lập Trình Viên Frontend từ Việt Nam, chuyên về Next.js, TypeScript, React và giao diện web hiện đại.",
  nationality: {
    "@type": "Country",
    name: "Vietnam",
  },
  knowsLanguage: ["vi", "en"],
  knowsAbout: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Lập Trình Web"],
  image: "https://korachoco.cv/profile.PNG",
  sameAs: [
    "https://github.com/korachoco",
    "https://linkedin.com/in/korachoco",
    "https://korachoco.cv",
  ],
};

export default async function ViHome() {
  const dict = await getDictionary("vi");

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Background Decor (Lunar Theme) */}
      <div className="absolute top-0 right-0 p-10 opacity-20 pointer-events-none">
        <div className="w-64 h-64 bg-[var(--color-lunar-primary)] rounded-full blur-[100px]"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-10 opacity-10 pointer-events-none">
        <div className="w-64 h-64 bg-[var(--color-lunar-secondary)] rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-lunar-primary)] to-[var(--color-lunar-gold)] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[var(--color-lunar-card)]">
               <Image 
                 src="/profile.PNG"
                 alt="Võ Thanh Phát — ảnh đại diện lập trình viên frontend"
                 fill
                 sizes="(max-width: 768px) 192px, 192px"
                 className="object-cover"
                 priority
               />
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
              {dict.home.title}
            </h1>
            <p className="text-xl text-[var(--color-lunar-secondary)] font-medium">
              {dict.home.role}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="grid gap-8">
           <section className="bg-[var(--color-lunar-card)] p-8 rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
             <h3 className="text-2xl font-bold mb-4 text-[var(--color-lunar-primary)] flex items-center gap-2">
               <span>🌸</span> {dict.home.about_title}
             </h3>
             <p className="leading-relaxed text-lg">
               {dict.home.about_text_1}
             </p>
           </section>

           <div className="grid md:grid-cols-2 gap-8">
             <section className="bg-[var(--color-lunar-card)] p-8 rounded-2xl border border-white/5 shadow-xl hover:border-[var(--color-lunar-gold)]/30 transition-colors">
               <h3 className="text-xl font-bold mb-4 text-[var(--color-lunar-gold)] flex items-center gap-2">
                 <span>🏮</span> {dict.home.goals_title}
               </h3>
               <ul className="list-disc list-inside space-y-2 opacity-90">
                 <li>{dict.home.goal_1}</li>
                 <li>{dict.home.goal_2}</li>
               </ul>
             </section>

             <section className="bg-[var(--color-lunar-card)] p-8 rounded-2xl border border-white/5 shadow-xl hover:border-[var(--color-lunar-secondary)]/30 transition-colors">
               <h3 className="text-xl font-bold mb-4 text-[var(--color-lunar-secondary)] flex items-center gap-2">
                 <span>✨</span> {dict.home.commitment_title}
               </h3>
               <p className="leading-relaxed">
                 {dict.home.commitment_text}
               </p>
             </section>
           </div>
        </div>

        {/* Featured Projects & Social Links Section */}
        <div className="mt-16">
          <FeaturedSection />
        </div>

        {/* Footer Decor */}
        <div className="mt-16 text-center opacity-50 text-sm">
          <p>Made by Boxkora™</p>
        </div>
      </div>
    </main>
  );
}
