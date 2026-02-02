"use client";

import Image from "next/image";
import { useState } from "react";
import QuestSelectionWindow from "./components/questSelectionWindow";
import QuestTimerView from "./components/questTimeView";
import { useTavern } from "@/app/hooks/useTavern"; 
import { tavernService } from "@/app/services/tavernService";
import { PVEbattleResult } from "@/app/types/battle/battleTypes";
import BattleArena from "@/app/components/battle/battleArenta";

const TavernPage = () => {

  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [battleResult, setBattleResult] = useState<PVEbattleResult | null>(null);
  const { status, isLoading, refetchStatus } = useTavern();
  const [battleBg, setBattleBg] = useState<string | undefined>(undefined);

  const handleStartFight = async () => {
    try {
      const currentImageUrl = status?.activeQuest?.imageUrl;
      const result = await tavernService.claimReward();
      setBattleBg(currentImageUrl)
      setBattleResult(result); 
    } catch (error) {
      console.error("Fight failed:", error);
    }
  };

  const handleCloseReport = () => {
    setBattleResult(null);
    setBattleBg(undefined);
    refetchStatus(); 
  };

  if (isLoading) return <div className="bg-black h-full" />;

  // BATTLE PAGE
  if (battleResult) {
      return (
        <BattleArena 
          leftCharacter={{
            name: battleResult.heroNickname,
            imageUrl: battleResult.heroImageUrl,
            level: battleResult.heroFinalStatsDto.level,
            maxHp: battleResult.heroFinalStatsDto.maxHp,
            currentHp: battleResult.heroFinalStatsDto.maxHp,
            stats: {
              str: battleResult.heroFinalStatsDto.totalStrength,
              dex: battleResult.heroFinalStatsDto.totalDexterity,
              int: battleResult.heroFinalStatsDto.totalIntelligence,
              con: battleResult.heroFinalStatsDto.totalConstitution,
              luck: battleResult.heroFinalStatsDto.totalLuck,
              armor: battleResult.heroFinalStatsDto.totalArmor
            }
          }}
          rightCharacter={{
            name: battleResult.monsterName,
            imageUrl: battleResult.monsterImageUrl,
            level: battleResult.monsterFinalStatsDto.level,
            maxHp: battleResult.monsterFinalStatsDto.maxHp,
            currentHp: battleResult.monsterFinalStatsDto.maxHp,
            stats: {
              str: battleResult.monsterFinalStatsDto.strength,
              dex: battleResult.monsterFinalStatsDto.dexterity,
              int: battleResult.monsterFinalStatsDto.intelligence,
              con: battleResult.monsterFinalStatsDto.constitution,
              luck: battleResult.monsterFinalStatsDto.luck,
              armor: battleResult.monsterFinalStatsDto.totalArmor
            }
          }}
          logs={battleResult.battleLogs}
          isVictory={battleResult.hasPlayerWon}
          rewards={{ gold: battleResult.earnedGold, exp: battleResult.earnedExp }}
          onClose={handleCloseReport}
          questBackgroundImageUrl={battleBg}
        />
      );
    }
// 

  if (isLoading) return <div className="bg-black h-full" />;

  // QUEST IN PROGREESS WAITINGROOM
  if (status?.activeQuest) {
    return (
      <div className="relative w-full h-full min-h-150 flex items-center justify-center bg-[#050505] rounded-xl border-2 border-slate-800 shadow-2xl overflow-hidden">
        <QuestTimerView 
          activeQuest={status.activeQuest} 
          onFinished={handleStartFight} 
        />
      </div>
    );
  }
  // 
  
// TAVERN WITHOUT ANY ACTIVE MISSION
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