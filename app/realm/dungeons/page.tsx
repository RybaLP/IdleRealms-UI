import Image from "next/image"
import Link from "next/link"

const Page = () => {
  return (
    <div className="relative w-full min-h-200 flex items-center justify-center overflow-hidden rounded-xl border-2 border-slate-800 shadow-2xl bg-black p-8">

      <Image
        src="/dungeon-bg.jpg"
        alt="Dungeons"
        fill
        priority
        sizes="100vw"
        className="object-cover pointer-events-none opacity-40"
      />

      <div className="relative z-10 flex flex-row gap-6 w-full max-w-5xl">

        <Link href="/realm/dungeons/forest" className="relative flex-1 h-105 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] cursor-pointer group">
          <Image src="/forest-dungeon.jpg" alt="Forest Dungeon" fill priority sizes="(max-width: 768px) 100vw, 33vw" className="object-cover pointer-events-none transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="text-white text-lg font-bold tracking-widest uppercase drop-shadow-lg">Forest</span>
          </div>
        </Link>

        <Link href="/realm/dungeons/battlefield" className="relative flex-1 h-105 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] cursor-pointer group">
          <Image src="/battlefield-dungeon.jpg" alt="Battlefield Dungeon" fill priority sizes="(max-width: 768px) 100vw, 33vw" className="object-cover pointer-events-none transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="text-white text-lg font-bold tracking-widest uppercase drop-shadow-lg">Battlefield</span>
          </div>
        </Link>

        <Link href="/realm/dungeons/castle" className="relative flex-1 h-105 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] cursor-pointer group">
          <Image src="/castle-dungeon.jpg" alt="Castle Dungeon" fill priority sizes="(max-width: 768px) 100vw, 33vw" className="object-cover pointer-events-none transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="text-white text-lg font-bold tracking-widest uppercase drop-shadow-lg">Castle</span>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default Page