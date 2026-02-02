"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BattleParticipant, BattleTurnDto } from "@/app/types/battle/battleTypes";

interface BattleArenaProps {
  leftCharacter: BattleParticipant;
  rightCharacter: BattleParticipant;
  logs: BattleTurnDto[];
  rewards?: { gold: number; exp: number };
  onClose: () => void;
  isVictory: boolean;
  questBackgroundImageUrl: string | undefined;
}

const BattleArena = ({ 
  leftCharacter, 
  rightCharacter, 
  logs, 
  rewards, 
  onClose, 
  isVictory, 
  questBackgroundImageUrl 
}: BattleArenaProps) => {
  const [turnIndex, setTurnIndex] = useState(0);
  const [leftHp, setLeftHp] = useState(leftCharacter.maxHp);
  const [rightHp, setRightHp] = useState(rightCharacter.maxHp);
  const [isFinished, setIsFinished] = useState(false);

  const getValidImage = (url: string | undefined) => {
    if (!url || url === "0;0;0;0;0" || url === "0") return "/human.png";
    return url;
  };

  useEffect(() => {
    if (turnIndex < logs.length) {
      const timer = setTimeout(() => {
        const turn = logs[turnIndex];
        setLeftHp(turn.currentHeroHp);
        setRightHp(turn.currentMonsterHp);
        setTurnIndex((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setIsFinished(true);
    }
  }, [turnIndex, logs]);

  const renderStats = (participant: BattleParticipant, alignment: 'left' | 'right') => {
    const statLabels = [
      { key: 'str', label: 'Strength' },
      { key: 'dex', label: 'Dexterity' },
      { key: 'int', label: 'Intelligence' },
      { key: 'con', label: 'Constitution' },
      { key: 'luck', label: 'Luck' },
    ];

    return (
      <div className={`w-full mt-4 space-y-1 font-sans px-2 ${alignment === 'right' ? 'text-right' : 'text-left'}`}>
        {statLabels.map((s) => (
          <div key={s.key} className={`flex items-center justify-between text-sm border-b border-white/5 pb-1 ${alignment === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-blue-300/80 font-medium">{s.label}</span>
            <span className="text-white font-bold tabular-nums">
              {(participant.stats as any)[s.key].toLocaleString()}
            </span>
          </div>
        ))}
        <div className={`flex items-center justify-between text-sm border-b border-white/5 pb-1 mt-2 opacity-60 ${alignment === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-gray-400">Armor</span>
          <span className="text-gray-300">{participant.stats.armor}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-between py-12 px-4 font-serif overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      {questBackgroundImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={getValidImage(questBackgroundImageUrl)} 
            alt="Background" 
            fill 
            priority 
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
        </div>
      )}

      {/* ARENA CONTENT */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-12 gap-8 items-start">
        
        {/* LEFT CHARACTER (HERO) */}
        <div className="col-span-4 flex flex-col items-center animate-in slide-in-from-left duration-700">
          <div className="relative w-full aspect-square border-4 border-[#3d2b1f] shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black/40 rounded-lg overflow-hidden mb-4">
            <Image 
              src={getValidImage(leftCharacter.imageUrl)} 
              alt={leftCharacter.name} 
              fill 
              className="object-cover scale-110" 
            />
            {/* NAME TAG OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
               <h3 className="text-xl text-blue-400 font-black italic">
                {leftCharacter.name} <span className="text-xs text-gray-400 uppercase ml-2">Lvl {leftCharacter.level}</span>
              </h3>
            </div>
          </div>
          
          <ProgressBar current={leftHp} max={leftCharacter.maxHp} color="bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
          
          {/* STATS UNDER CHARACTER */}
          <div className="w-full bg-black/40 backdrop-blur-sm border border-white/5 rounded-b-lg p-3">
             {renderStats(leftCharacter, 'left')}
          </div>
        </div>

        {/* BATTLE LOGS */}
        <div className="col-span-4 h-[600px] flex flex-col bg-black/60 backdrop-blur-md border border-[#3d2b1f] rounded-lg p-4 shadow-2xl">
          <div className="text-center text-4xl font-black text-white/5 mb-8 tracking-[0.5em] select-none uppercase italic">Combat</div>
          <div className="flex-1 overflow-y-auto space-y-3 px-2 scrollbar-hide">
            {logs.slice(0, turnIndex).map((log, i) => (
              <div 
                key={i} 
                className={`text-center py-2 border-b border-white/5 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  log.heroAttacking ? 'text-blue-100' : 'text-red-100'
                }`}
              >
                <span className="opacity-30 text-[10px] mr-2 uppercase tracking-tighter">Turn {i + 1}</span>
                {log.heroAttacking ? '⚔️' : '🔥'} Hit for <span className="font-bold text-xl">{log.damage}</span>
                {log.isCrit && <span className="ml-2 text-yellow-500 font-black underline italic animate-bounce">CRIT!</span>}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CHARACTER  */}
        <div className="col-span-4 flex flex-col items-center animate-in slide-in-from-right duration-700">
          <div className="relative w-full aspect-square border-4 border-[#3d2b1f] shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black/40 rounded-lg overflow-hidden mb-4">
            <Image 
              src={getValidImage(rightCharacter.imageUrl)} 
              alt={rightCharacter.name} 
              fill 
              className="object-cover scale-110" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-right">
               <h3 className="text-xl text-red-500 font-black italic">
                <span className="text-xs text-gray-400 uppercase mr-2">Lvl {rightCharacter.level}</span> {rightCharacter.name}
              </h3>
            </div>
          </div>

          <ProgressBar current={rightHp} max={rightCharacter.maxHp} color="bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]" flipped />
          
          {/* STATS UNDER CHARACTER */}
          <div className="w-full bg-black/40 backdrop-blur-sm border border-white/5 rounded-b-lg p-3">
             {renderStats(rightCharacter, 'right')}
          </div>
        </div>

      </div>

      {isFinished && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[110] animate-in fade-in duration-500">
          <div className="bg-[#0f0f0f] border-2 border-yellow-600/50 p-12 text-center max-w-lg w-full shadow-[0_0_100px_rgba(0,0,0,1)] relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl opacity-10 font-black">RESULT</div>
            <h2 className={`text-7xl font-black italic mb-6 tracking-tighter ${isVictory ? 'text-yellow-500' : 'text-red-700'}`}>
              {isVictory ? "VICTORY" : "DEFEAT"}
            </h2>
            {rewards && (
              <div className="flex justify-center gap-12 mb-10 text-3xl font-bold border-y border-white/5 py-6 font-sans">
                <div className="flex flex-col"><span className="text-yellow-600">💰 {rewards.gold}</span><span className="text-[10px] text-gray-500 uppercase tracking-widest">Gold</span></div>
                <div className="flex flex-col"><span className="text-blue-500">✨ {rewards.exp}</span><span className="text-[10px] text-gray-500 uppercase tracking-widest">Exp</span></div>
              </div>
            )}
            <button 
              onClick={onClose} 
              className="w-full py-5 bg-yellow-700 hover:bg-yellow-600 text-black font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-yellow-900/20"
            >
              Return to Kingdom
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProgressBar = ({ current, max, color, flipped = false }: { current: number, max: number, color: string, flipped?: boolean }) => (
  <div className="h-10 w-full bg-black/80 border-2 border-[#3d2b1f] relative overflow-hidden shadow-inner">
    <div 
      className={`h-full ${color} transition-all duration-700 ease-out ${flipped ? 'float-right' : ''}`} 
      style={{ width: `${Math.max(0, (current / max) * 100)}%` }}
    />
    <div className="absolute inset-0 flex items-center justify-center text-sm font-black text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
      {current.toLocaleString()} / {max.toLocaleString()}
    </div>
  </div>
);

export default BattleArena;