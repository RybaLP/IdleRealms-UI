import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image src="/landing-page-bg.png" fill className="object-cover" alt="bg" />
        </div>
        
        <div className="relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:cursor-pointer transition-transform hover:scale-105 duration-300">
          <Image 
            src="/IdleRealmsLogo.png" 
            width={600} 
            height={300} 
            alt="Idle Realms Logo"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-6 mt-8">
          
          <Link href="/login" 
            className="px-12 py-4 bg-linear-to-b from-blue-500 to-blue-700 text-white font-bold rounded-md border-b-4 border-blue-900 hover:brightness-125 hover:scale-105 active:border-b-0 active:translate-y-1 transition-all duration-200 uppercase tracking-wider min-w-50 text-center shadow-lg shadow-blue-900/20">
            Log In
          </Link>

          <Link href="/register" 
            className="px-12 py-4 bg-linear-to-b from-amber-500 to-amber-700 text-white font-bold rounded-md border-b-4 border-amber-900 hover:brightness-125 hover:scale-105 active:border-b-0 active:translate-y-1 transition-all duration-200 uppercase tracking-wider min-w-50 text-center shadow-lg shadow-amber-900/20">
            Register
          </Link>

        </div>
    </main>
  );
}