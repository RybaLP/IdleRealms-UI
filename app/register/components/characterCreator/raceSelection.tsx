import Image from "next/image";

export default function RaceSelection() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-black/40 border border-slate-700">
      <div className="flex flex-col items-center gap-2 cursor-pointer group">
        <div className="w-24 h-24 relative border-2 border-slate-600 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-amber-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-400/50">
          <Image 
            src={'/human.png'} 
            fill 
            className="object-cover"
            alt="human"
          />
        </div>
        <span className="text-slate-300 text-sm font-semibold group-hover:text-amber-400 transition-colors duration-300">
          HUMAN
        </span>
      </div>
      
      <div className="flex flex-col items-center gap-2 cursor-pointer group">
        <div className="w-24 h-24 relative border-2 border-slate-600 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-amber-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-400/50">
          <Image 
            src={'/ork.png'} 
            fill 
            className="object-cover"
            alt="ork"
          />
        </div>
        <span className="text-slate-300 text-sm font-semibold group-hover:text-amber-400 transition-colors duration-300">
          ORK
        </span>
      </div>
      
      <div className="flex flex-col items-center gap-2 cursor-pointer group">
        <div className="w-24 h-24 relative border-2 border-slate-600 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-amber-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-400/50">
          <Image 
            src={'/dark-elf.png'} 
            fill 
            className="object-cover"
            alt="dark elf"
          />
        </div>
        <span className="text-slate-300 text-sm font-semibold group-hover:text-amber-400 transition-colors duration-300">
          DARK-ELF
        </span>
      </div>
    </div>
  );
}