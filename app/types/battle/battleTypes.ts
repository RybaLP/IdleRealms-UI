import { MonsterFinalStatsDto } from "../monster/monster";
import { HeroFinalStatsDto } from "../hero/hero";

export interface BattleTurnDto {
  heroAttacking: boolean;
  damage: number;
  isCrit: boolean;
  isDodge: boolean;
  currentHeroHp: number;
  currentMonsterHp: number;
}

export interface PVEbattleResult {
  battleLogs: BattleTurnDto[];

  monsterName: string;
  monsterImageUrl: string;
  monsterWeaponUrl: string | null;

  heroNickname: string;
  heroImageUrl: string;
  heroWeaponUrl: string | null;

  heroFinalStatsDto: HeroFinalStatsDto;
  monsterFinalStatsDto: MonsterFinalStatsDto;

  hasPlayerWon: boolean;

  earnedExp: number;
  earnedGold: number;
}

export interface BattleParticipant {
  name: string;
  imageUrl: string;
  weaponUrl?: string | null;
  level: number;
  maxHp: number;
  currentHp: number;
  
  stats: {
    str: number;
    dex: number;
    int: number;
    con: number;
    luck: number;
    armor: number;
  };
}