import Image from "next/image";
import { getDictionary } from "../../get-dictionary";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "vi" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 relative overflow-hidden">
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
                 alt="Avatar"
                 fill
                 sizes="(max-width: 768px) 192px, 192px"
                 className="object-cover"
               />
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
              {dict.home.title}
            </h2>
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

        {/* Footer Decor */}
        <div className="mt-16 text-center opacity-50 text-sm">
          <p>Made by Boxkora™</p>
        </div>
      </div>
    </main>
  );
}
