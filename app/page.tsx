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
        <Link
          href="/login"
          className="px-12 py-4 text-white font-bold rounded-md uppercase tracking-wider min-w-50 text-center
                     border-2 border-orange-500 bg-transparent
                     hover:bg-orange-500 hover:shadow-[0_0_20px_#f97316] hover:scale-105
                     active:scale-95 transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Log In
        </Link>

        <Link
          href="/register"
          className="px-12 py-4 text-white font-bold rounded-md uppercase tracking-wider min-w-50 text-center
                     border-2 border-blue-500 bg-transparent
                     hover:bg-blue-500 hover:shadow-[0_0_20px_#3b82f6] hover:scale-105
                     active:scale-95 transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Register
        </Link>
      </div>
    </main>
  );
}