"use client";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { setClass } from "@/app/store/registerSlice";
import { HeroClass } from "@/app/types/game.types";
import { RootState } from "@/app/redux/reduxStore";

export default function ClassSelection() {
  const dispatch = useDispatch();
  
  const selectedClass = useSelector((state: RootState) => state.register.character.heroClass);

  const handleSelect = (className: HeroClass) => {
    dispatch(setClass(className));
  };

  return (
    <div className="flex justify-center gap-4 p-4 bg-black/40 border border-slate-700">
      
      {/* WARRIOR */}
      <div 
        onClick={() => handleSelect('WARRIOR')}
        className={`cursor-pointer group ${selectedClass === 'WARRIOR' ? 'scale-110' : ''}`}
      >
        <div className={`w-28 h-28 relative border-2 rounded-full overflow-hidden transition-all duration-300 
          ${selectedClass === 'WARRIOR' 
            ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.6)]' 
            : 'border-slate-600 group-hover:border-amber-400'
          } group-hover:rotate-6`}>
          <Image src={'/warrior-icone.png'} fill className="object-cover" alt="warrior" />
        </div>
      </div>
      
      {/* MAGE */}
      <div 
        onClick={() => handleSelect('MAGE')}
        className={`cursor-pointer group ${selectedClass === 'MAGE' ? 'scale-110' : ''}`}
      >
        <div className={`w-28 h-28 relative border-2 rounded-full overflow-hidden transition-all duration-300 
          ${selectedClass === 'MAGE' 
            ? 'border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.6)]' 
            : 'border-slate-600 group-hover:border-amber-400'
          } group-hover:rotate-6`}>
          <Image src={'/mage-icone.png'} fill className="object-cover" alt="mage" />
        </div>
      </div>

      {/* SCOUT */}
      <div 
        onClick={() => handleSelect('SCOUT')}
        className={`cursor-pointer group ${selectedClass === 'SCOUT' ? 'scale-110' : ''}`}
      >
        <div className={`w-28 h-28 relative border-2 rounded-full overflow-hidden transition-all duration-300 
          ${selectedClass === 'SCOUT' 
            ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.6)]' 
            : 'border-slate-600 group-hover:border-amber-400'
          } group-hover:rotate-6`}>
          <Image src={'/scout-icone.png'} fill className="object-cover" alt="scout" />
        </div>
      </div>

    </div>
  );
}