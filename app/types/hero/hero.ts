import { Item } from "../item/item";

export interface HeroProfile {
    nickname: string;
    heroClass: string;
    level: number;
    experience: number;
    gold: number;
    energy: number;
    visualConfig: string;
    stats: {
        totalStrength: number;
        totalDexterity: number;
        totalIntelligence: number;
        totalConstitution: number;
        totalLuck: number;
        totalArmor: number;
        maxHp: number;
    };
    baseStats: {
        strength: number;
        dexterity: number;
        intelligence: number;
        constitution: number;
        luck: number;
    };
    inventory: Item[];
    equippedHelmet: Item | null;
    equippedWeapon: Item | null;
    equippedArmor: Item | null;
    equippedGloves: Item | null;
    equippedBoots: Item | null;
}

export interface HeroFinalStatsDto {
  totalStrength: number;
  totalDexterity: number;
  totalIntelligence: number;
  totalConstitution: number;
  totalLuck: number;
  totalArmor: number;
  maxHp: number;
  level: number;
}