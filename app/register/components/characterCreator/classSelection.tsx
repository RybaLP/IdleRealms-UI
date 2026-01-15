import Image from "next/image";

export default function ClassSelection() {
  return (
    <div className="flex justify-center gap-4 p-4 bg-black/40 border border-slate-700">
      <div className="cursor-pointer group">
        <div className="w-28 h-28 relative border-2 border-slate-600 rounded-full overflow-hidden transition-all duration-300 group-hover:border-amber-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-400/50 group-hover:rotate-6">
          <Image 
            src={'/warrior-icone.png'} 
            fill 
            className="object-cover"
            alt="warrior"
          />
        </div>
      </div>
      
      <div className="cursor-pointer group">
        <div className="w-28 h-28 relative border-2 border-slate-600 rounded-full overflow-hidden transition-all duration-300 group-hover:border-amber-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-400/50 group-hover:rotate-6">
          <Image 
            src={'/mage-icone.png'} 
            fill 
            className="object-cover"
            alt="mage"
          />
        </div>
      </div>
      
      <div className="cursor-pointer group">
        <div className="w-28 h-28 relative border-2 border-slate-600 rounded-full overflow-hidden transition-all duration-300 group-hover:border-amber-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-400/50 group-hover:rotate-6">
          <Image 
            src={'/scout-icone.png'} 
            fill 
            className="object-cover"
            alt="scout"
          />
        </div>
      </div>
    </div>
  );
}