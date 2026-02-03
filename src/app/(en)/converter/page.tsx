import { VideoDownloader } from "@/components/VideoDownloader";

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
