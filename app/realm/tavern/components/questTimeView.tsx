"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { ActiveQuest } from "@/app/types/quest/activeQuest";

interface Props {
  activeQuest: ActiveQuest;
  onFinished: () => void;
}

const QuestTimerView = ({ activeQuest, onFinished }: Props) => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { secondsLeft, isDone, progressWidth } = useMemo(() => {
    if (!now) return { secondsLeft: 0, isDone: false, progressWidth: 0 };

    const start = new Date(activeQuest.startTime).getTime();
    const end = new Date(activeQuest.finishTime).getTime();
    const current = now.getTime();

    const total = end - start;
    const elapsed = current - start;
    
    const progress = Math.min(100, Math.max(0, (elapsed / total) * 100));
    const diff = Math.max(0, Math.floor((end - current) / 1000));

    return { secondsLeft: diff, isDone: diff === 0, progressWidth: progress };
  }, [now, activeQuest.startTime, activeQuest.finishTime]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const secs = s % 60;
    return `${m}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <Image
          src={activeQuest.imageUrl || "/landscapes/default.jpg"} 
          alt="Quest Background" 
          fill 
          className="object-cover opacity-60 transition-transform duration-[20s] scale-110 animate-pulse-slow" 
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black/90" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-4 gap-12 text-center">
        
        <div className="space-y-4">
          <p className="text-yellow-700 font-bold tracking-[0.5em] uppercase text-sm">Active Mission</p>
          <h2 className="text-5xl md:text-7xl text-yellow-600 font-black italic uppercase tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
            {activeQuest.title}
          </h2>
        </div>

        <div className="w-full max-w-3xl space-y-8">
          <div className="relative h-20 bg-black/60 border-2 border-[#3d2b1f] rounded-sm overflow-hidden backdrop-blur-sm shadow-2xl">
            <div 
              className="h-full bg-linear-to-r from-blue-900 via-cyan-600 to-blue-400 shadow-[0_0_30px_rgba(0,191,255,0.4)] transition-all duration-1000 ease-linear"
              style={{ width: `${progressWidth}%` }} 
            />

            <div className="absolute inset-0 flex items-center justify-center font-mono text-4xl text-white font-black tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
              {!now ? "INITIALIZING..." : (isDone ? "OBJECTIVE REACHED" : formatTime(secondsLeft))}
            </div>
          </div>

          <div className="h-24 flex items-center justify-center">
            {isDone ? (
              <button 
                onClick={onFinished} 
                className="group relative px-12 py-6 bg-linear-to-b from-yellow-500 to-yellow-800 text-black font-black text-3xl uppercase tracking-widest border-b-4 border-yellow-900 rounded-sm hover:from-yellow-400 hover:scale-110 active:scale-95 transition-all shadow-[0_20px_50px_rgba(251,191,36,0.3)]"
              >
                <span className="relative z-10">Enter Combat</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ) : (
              <p className="text-[#a8927a] italic text-xl animate-pulse tracking-wide">
                Your hero is traveling to the location...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestTimerView;