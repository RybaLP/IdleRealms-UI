"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import OponentCredentials from "../components/oponentCredentials"
import { useDungeonStatus } from "@/app/hooks/useDungeonStatus"
import { PVEbattleResult } from "@/app/types/battle/battleTypes"
import BattleArena from "@/app/components/battle/battleArenta"
import { dungeonService } from "@/app/services/dungeonService"
import BackButton from "../components/backButton"

const Page = () => {
  const dungeonId = 1

  const [battleResult, setBattleResult] = useState<PVEbattleResult | null>(null)
  const { data, isLoading, isError, refetch } = useDungeonStatus(dungeonId)

  const handleStartDungeonFight = async () => {
    try {
      const result = await dungeonService.fightDungeonMonster(dungeonId)
      setBattleResult(result)
    } catch (error) {
      console.error("Dungeon fight failed:", error)
    }
  }

  const handleCloseReport = () => {
    setBattleResult(null)
    refetch()
  }

  if (isLoading) return <div className="bg-black h-screen" />
  if (isError || !data) return <div>Error loading dungeon...</div>

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
            armor: battleResult.heroFinalStatsDto.totalArmor,
          },
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
            armor: battleResult.monsterFinalStatsDto.totalArmor,
          },
        }}
        logs={battleResult.battleLogs}
        isVictory={battleResult.hasPlayerWon}
        rewards={{
          gold: battleResult.earnedGold,
          exp: battleResult.earnedExp,
        }}
        onClose={handleCloseReport}
        questBackgroundImageUrl="/forest-dungeon.jpg"
      />
    )
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center">
      <Image
        src="/forest-dungeon.jpg"
        alt="Forest Dungeon"
        fill
        priority
        className="object-cover"
      />

     <BackButton/>

      <div className="z-10 w-full flex flex-col items-center">
        <OponentCredentials
          floorDescription={data.floorDescription}
          monsterName={data.monsterName}
          monsterImageUrl={data.monsterImageUrl}
          currentFloor={data.currentFloor}
          onConfirm={handleStartDungeonFight}
        />
      </div>
    </div>
  )
}

export default Page