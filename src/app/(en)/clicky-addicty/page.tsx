import { ClickyGame } from "../../../components/ClickyGame";

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
