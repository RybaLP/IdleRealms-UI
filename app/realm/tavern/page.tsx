"use client";

import Image from "next/image";
import { useState } from "react";
import QuestSelectionWindow from "./components/questSelectionWindow";

const TavernPage = () => {
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);

  return (
    <div className="relative w-full h-full min-h-150 flex items-center justify-center overflow-hidden rounded-xl border-2 border-slate-800 shadow-2xl bg-black">
      <Image src="/tavern.png" alt="Tavern" fill priority className="object-cover pointer-events-none" />

      <div
        onClick={() => setIsQuestsOpen(true)}
        className="absolute z-30 cursor-pointer group"
        style={{ top: "10%", left: "36%", width: "21%", height: "48%" }}
      >
        <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/5 transition-all duration-300 shadow-[0_0_50px_rgba(234,179,8,0)] group-hover:shadow-[0_0_50px_rgba(234,179,8,0.4)] border-2 border-transparent group-hover:border-yellow-500/30 transform group-hover:scale-105"></div>
      </div>

      {isQuestsOpen && (
        <div className="absolute z-50 inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <QuestSelectionWindow onClose={() => setIsQuestsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default TavernPage;