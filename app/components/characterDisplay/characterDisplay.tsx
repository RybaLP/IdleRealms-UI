"use client";

import React from 'react';
import CharacterAvatarBox from '../shared/characterAvatar';
import { useGetHeroInfo } from '@/app/hooks/useGetHeroInfo';
import Inventory from './inventory';
import { ItemSlot } from './itemSlot';

interface StatDisplayProps {
  label: string;
  value: number;
  subValue?: number;
  color?: string;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value, subValue, color = "#FFA726" }) => (
  <div className="relative bg-linear-to-r from-[#0a1929]/90 to-[#1a2332]/90 border-2 border-[#3d5a7f]/60 rounded-lg p-2.5 group hover:border-amber-500/40 transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-amber-400 font-bold text-xs uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {label}
        </div>
        {subValue !== undefined && subValue > 0 && (
          <div className="text-cyan-400/70 text-[10px] mt-0.5">
            +{subValue}
          </div>
        )}
      </div>
      <div className="text-white font-bold text-xl drop-shadow-[0_2px_8px_rgba(255,167,38,0.5)]" style={{ color }}>
        {value.toLocaleString()}
      </div>
    </div>
  </div>
);


export default function CharacterDisplay() {
  const { hero, loading } = useGetHeroInfo();

  if (loading || !hero) {
    return (
      <div className="w-96 shrink-0 h-full flex items-center justify-center">
        <div className="text-amber-400 text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      
      {/* Main Character Panel */}
      <div className="flex flex-col">

        {/* Main content area */}
        <div className="p-4 space-y-4">
          
          {/* Top section: Equipment + Avatar + Equipment */}
          <div className="flex items-center justify-center gap-12 min-h-100">
            
            {/* Left equipment column - wykorzystuje całą wysokość */}
            <div className="flex flex-col justify-between h-full py-4" style={{ minHeight: '350px' }}>
              <ItemSlot item={hero.equippedHelmet} slotType="HELMET" />
              <ItemSlot item={hero.equippedArmor} slotType="ARMOR" />
            </div>

            {/* Center: Avatar + Name + Level + Weapon - DUŻY AVATAR */}
            <div className="flex flex-col items-center justify-center">
              {/* Avatar container - powiększony do 150% */}
              <div className="flex flex-col items-center scale-150 mb-12">
                <CharacterAvatarBox />
                
                {/* Name */}
                <h1 className="text-amber-400 text-2xl font-bold drop-shadow-[0_4px_12px_rgba(255,167,38,0.8)] mt-3" 
                    style={{ fontFamily: 'Georgia, serif' }}>
                    {hero.nickname}
                </h1>

                {/* Level */}
                <span className="text-white font-bold text-sm drop-shadow-md mt-1">
                  Level {hero.level}
                </span>
              </div>

              {/* Weapon pod avatarem */}
              <div className="mt-2">
                <ItemSlot item={hero.equippedWeapon} slotType="WEAPON" />
              </div>

            </div>

            {/* Right equipment column - wykorzystuje całą wysokość */}
            <div className="flex flex-col justify-between h-full py-4" style={{ minHeight: '350px' }}>
              <ItemSlot item={hero.equippedGloves} slotType="GLOVES" />
              <ItemSlot item={hero.equippedBoots} slotType="BOOTS" />
            </div>

          </div>

          {/* Stats Panel - ATTRIBUTES ONLY */}
          <div className="space-y-2 mt-8">
            <div className="grid grid-cols-2 gap-2">
              <StatDisplay
                label="STRENGTH"
                value={hero.stats.totalStrength}
                subValue={hero.stats.totalStrength - hero.baseStats.strength}
                color="#FF6B6B"
              />
              <StatDisplay
                label="CONSTITUTION"
                value={hero.stats.totalConstitution}
                subValue={hero.stats.totalConstitution - hero.baseStats.constitution}
                color="#4ECDC4"
              />
              <StatDisplay
                label="DEXTERITY"
                value={hero.stats.totalDexterity}
                subValue={hero.stats.totalDexterity - hero.baseStats.dexterity}
                color="#95E1D3"
              />
              <StatDisplay
                label="LUCK"
                value={hero.stats.totalLuck}
                subValue={hero.stats.totalLuck - hero.baseStats.luck}
                color="#FFD93D"
              />
              <StatDisplay
                label="INTELLIGENCE"
                value={hero.stats.totalIntelligence}
                subValue={hero.stats.totalIntelligence - hero.baseStats.intelligence}
                color="#A78BFA"
              />
              <StatDisplay
                label="ARMOR"
                value={hero.stats.totalArmor}
                color="#FFA726"
              />
            </div>
            
          </div>
        </div>

        <div className="h-4 bg-linear-to-r from-[#2d4a6c] via-[#4a6f94] to-[#2d4a6c] border-t-2 border-[#5a7f9f] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-400/50 to-transparent" />
        </div>

          {/* INVENTORY */}
        <div className='mt-4'>
          <Inventory inventory={hero.inventory}/>
        </div>

      </div>
    </div>
  );
}