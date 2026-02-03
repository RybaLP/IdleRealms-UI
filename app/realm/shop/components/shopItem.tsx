"use client";
import { ItemSlot } from "@/app/components/characterDisplay/itemSlot";
import { Item } from "@/app/types/item/item";

export const ShopItem = ({ 
  item, 
  onBuy, 
  selectedItem, 
  onSelect 
}: { 
  item: Item; 
  onBuy: (itemId: number) => void; 
  selectedItem: Item | null;
  onSelect: () => void;
}) => {
  const isSelected = selectedItem?.id === item.id;

  return (
    <div className="relative flex flex-col items-center gap-2 group">

      {isSelected && (
        <div className="absolute z-50 bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-72 bg-gray-900 border-2 border-amber-600 rounded-xl shadow-2xl p-4">
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-amber-600"></div>
          
          <div className="text-center mb-3">
            <h3 className="text-xl font-bold text-amber-400 mb-1">{item.name}</h3>
            <div className="flex justify-center gap-4 text-sm">
              <span className="text-gray-300">Level: {item.requiredLevel}</span>
              <span className="text-gray-300">Class: {item.heroClass}</span>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Strength</span>
              <span className={`font-bold text-lg ${item.strengthBonus >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.strengthBonus >= 0 ? '+' : ''}{item.strengthBonus}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Dexterity</span>
              <span className={`font-bold text-lg ${item.dexterityBonus >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.dexterityBonus >= 0 ? '+' : ''}{item.dexterityBonus}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Intelligence</span>
              <span className={`font-bold text-lg ${item.intelligenceBonus >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.intelligenceBonus >= 0 ? '+' : ''}{item.intelligenceBonus}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Constitution</span>
              <span className={`font-bold text-lg ${item.constitutionBonus >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.constitutionBonus >= 0 ? '+' : ''}{item.constitutionBonus}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Luck</span>
              <span className={`font-bold text-lg ${item.luckBonus >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.luckBonus >= 0 ? '+' : ''}{item.luckBonus}
              </span>
            </div>
            
            <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-700">
              <span className="text-gray-300 text-lg">Power</span>
              <span className="font-bold text-2xl text-yellow-400">{item.power}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-700">
            <div className="text-2xl font-bold text-amber-300">
              {item.price.toLocaleString()} Gold
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBuy(item.id);
              }}
              className="px-6 py-3 bg-linear-to-r from-green-600 to-emerald-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              BUY
            </button>
          </div>
        </div>
      )}
      
      <div 
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`cursor-pointer transform transition-transform hover:scale-105 active:scale-95 ${
          isSelected ? 'ring-2 ring-amber-500 rounded-lg' : ''
        }`}
      >
        <ItemSlot item={item} slotType={item.itemType}/>
      </div>
    </div>
  );
};