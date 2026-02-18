import { Item } from "@/app/types/item/item";
import Image from "next/image";

interface ItemSlotProps {
  item: Item | null;
  slotType: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ItemSlot: React.FC<ItemSlotProps> = ({ 
  item, 
  slotType, 
  isSelected = false,
  onClick 
}) => {
  return (
    <div 
      className={`relative w-24 h-24 group cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-amber-500 scale-105' : ''
      }`}
      onClick={onClick}
    >
      
      <div className="absolute inset-0 bg-linear-to-br from-[#2d4a6c] via-[#1a2b3c] to-[#0f1a28] border-2 border-[#4a6f94] rounded-lg shadow-xl">
        <div className="absolute inset-0.5 bg-linear-to-br from-[#0a1520]/40 to-[#1a2838]/60 rounded-md" />
      </div>
      
      {item ? (
        <div className="relative w-full h-full p-2 z-20">
          <div className="relative w-full h-full">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center z-10">
          <div className="text-[#3d5a7f]/40 text-[9px] uppercase font-bold text-center leading-tight">
            {slotType}
          </div>
        </div>
      )}
      
    </div>
  );
};