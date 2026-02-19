"use client";

import React, { useState, useRef, useEffect } from 'react';
import CharacterAvatarBox from '../shared/characterAvatar';
import Inventory from './inventory';
import { ItemSlot } from './itemSlot';
import { useHeroInfo } from '@/app/hooks/useGetHeroInfo';
import { useSwitchItem } from '@/app/hooks/useSwitchItem';
import { Item } from '@/app/types/item/item';

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
  const { hero, isLoading } = useHeroInfo();
  const switchItemMutation = useSwitchItem();
  const [selectedEquippedItem, setSelectedEquippedItem] = useState<Item | null>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleEquippedSlotClick = (item: Item | null, event: React.MouseEvent<HTMLDivElement>) => {
    if (!item) return;
    setSelectedEquippedItem(item);
    setSelectedElement(event.currentTarget);
  };

  const handleTakeOff = (itemId: number) => {
    switchItemMutation.mutate(
      {
        action: "TAKE_OFF",
        itemId: itemId,
      },
      {
        onSuccess: () => {
          setSelectedEquippedItem(null);
          setSelectedElement(null);
        },
      }
    );
  };

  useEffect(() => {
    if (!selectedEquippedItem || !selectedElement || !tooltipRef.current) return;

    const slotRect = selectedElement.getBoundingClientRect();
    const tooltip = tooltipRef.current;
    const tooltipWidth = 288; // w-72
    const margin = 8;

    let left = slotRect.left + slotRect.width / 2 - tooltipWidth / 2;
    left = Math.max(margin, left);
    left = Math.min(window.innerWidth - tooltipWidth - margin, left);

    const top = slotRect.top - tooltip.offsetHeight - 10; 

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }, [selectedEquippedItem, selectedElement]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node) && 
          selectedElement && !selectedElement.contains(e.target as Node)) {
        setSelectedEquippedItem(null);
        setSelectedElement(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedElement]);

  if (isLoading || !hero) {
    return (
      <div className="w-full h-full flex items-center justify-center">
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
            
            {/* Left equipment column */}
            <div className="flex flex-col justify-between h-full py-4" style={{ minHeight: '350px' }}>
              <div onClick={(e) => handleEquippedSlotClick(hero.equippedHelmet, e)}>
                <ItemSlot item={hero.equippedHelmet} slotType="HELMET" />
              </div>
              <div onClick={(e) => handleEquippedSlotClick(hero.equippedArmor, e)}>
                <ItemSlot item={hero.equippedArmor} slotType="ARMOR" />
              </div>
            </div>

            {/* Center: Avatar + Name + Level + Weapon */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center scale-150 mb-12">
                <CharacterAvatarBox />
                <h1 className="text-amber-400 text-2xl font-bold drop-shadow-[0_4px_12px_rgba(255,167,38,0.8)] mt-3" 
                    style={{ fontFamily: 'Georgia, serif' }}>
                  {hero.nickname}
                </h1>
                <span className="text-white font-bold text-sm drop-shadow-md mt-1">
                  Level {hero.level}
                </span>
              </div>

              <div className="mt-2" onClick={(e) => handleEquippedSlotClick(hero.equippedWeapon, e)}>
                <ItemSlot item={hero.equippedWeapon} slotType="WEAPON" />
              </div>
            </div>

            {/* Right equipment column */}
            <div className="flex flex-col justify-between h-full py-4" style={{ minHeight: '350px' }}>
              <div onClick={(e) => handleEquippedSlotClick(hero.equippedGloves, e)}>
                <ItemSlot item={hero.equippedGloves} slotType="GLOVES" />
              </div>
              <div onClick={(e) => handleEquippedSlotClick(hero.equippedBoots, e)}>
                <ItemSlot item={hero.equippedBoots} slotType="BOOTS" />
              </div>
            </div>
          </div>

          {/* Stats Panel */}
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
          <Inventory inventory={hero.inventory} />
        </div>

      </div>

      {selectedEquippedItem && (
        <div
          ref={tooltipRef}
          className="fixed z-50 w-72 bg-gray-900 border-2 border-amber-600 rounded-xl shadow-2xl p-4"
        >
          <div className="text-center mb-3">
            <h3 className="text-xl font-bold text-amber-400 mb-1">
              {selectedEquippedItem.name}
            </h3>
            <div className="flex justify-center gap-4 text-sm">
              <span className="text-gray-300">
                Level: {selectedEquippedItem.requiredLevel}
              </span>
              <span className="text-gray-300">
                Class: {selectedEquippedItem.heroClass}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {[
              ["Strength", selectedEquippedItem.strengthBonus],
              ["Dexterity", selectedEquippedItem.dexterityBonus],
              ["Intelligence", selectedEquippedItem.intelligenceBonus],
              ["Constitution", selectedEquippedItem.constitutionBonus],
              ["Luck", selectedEquippedItem.luckBonus],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-gray-300">{label}</span>
                <span className={`font-bold text-lg ${(value as number) >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {(value as number) >= 0 ? "+" : ""}{value}
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-700">
              <span className="text-gray-300 text-lg">Power</span>
              <span className="font-bold text-2xl text-yellow-400">
                {selectedEquippedItem.power}
              </span>
            </div>
          </div>

          <div className="flex justify-center pt-3 border-t border-gray-700">
            <button
              onClick={() => handleTakeOff(selectedEquippedItem.id)}
              className="px-8 py-2 bg-linear-to-r from-red-600 to-rose-700 text-white font-bold rounded-lg hover:from-red-700 hover:to-rose-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              TAKE OFF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}