"use client";

import { Item } from "@/app/types/item/item";
import { ItemSlot } from "./itemSlot";
import { useState, useRef, useEffect } from "react";
import { useSwitchItem } from "@/app/hooks/useSwitchItem";
import { useSellItem } from "@/app/hooks/useSellItem";


interface InventoryProps {
  inventory: Item[];
}

const Inventory = ({ inventory }: InventoryProps) => {
  // ui
  const MAX_SLOTS = 5;
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // tanstack hooks
  const {mutate: sellItem, isPending, isError} = useSellItem();
  const switchItemMutation = useSwitchItem();


  const handleSlotClick = (item: Item | null) => {
    if (!item) return;
    setSelectedItem((prev) => (prev?.id === item.id ? null : item));
  };

  const handleEquip = (itemId: number) => {
  switchItemMutation.mutate(
    {
      action: "EQUIP",
      itemId: itemId,
    },
    {
      onSuccess: () => {
        setSelectedItem(null);
      },
    }
  );

};

  const handleSell = (itemId: number) => {
    if (isPending) return; 
    sellItem(itemId);
    setSelectedItem(null);
  };

  const displaySlots: (Item | null)[] = [
    ...inventory,
    ...Array(MAX_SLOTS - inventory.length).fill(null),
  ];

  useEffect(() => {
    if (!selectedItem) return;

    const index = displaySlots.findIndex(
      (i) => i?.id === selectedItem.id
    );

    const slot = slotRefs.current[index];
    const tooltip = tooltipRef.current;

    if (!slot || !tooltip) return;

    const slotRect = slot.getBoundingClientRect();
    const tooltipWidth = 288; 
    const margin = 8;

    let left =
      slotRect.left +
      slotRect.width / 2 -
      tooltipWidth / 2;

    left = Math.max(margin, left);
    left = Math.min(
      window.innerWidth - tooltipWidth - margin,
      left
    );

    const top = slotRect.top - tooltip.offsetHeight - 10;

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }, [selectedItem, displaySlots]);

  return (
    <div className="p-4 pt-0">
      <div className="grid grid-cols-5 gap-2">
        {displaySlots.map((item, index) => (
          <div
            key={index}
              ref={(el) => {
              slotRefs.current[index] = el;
            }}

            className="relative"
          >
            <ItemSlot
              item={item}
              slotType={""}
              isSelected={
                item ? selectedItem?.id === item.id : false
              }
              onClick={() => handleSlotClick(item)}
            />
          </div>
        ))}
      </div>

      {selectedItem && (
        <div
          ref={tooltipRef}
          className="fixed z-50 w-72 bg-gray-900 border-2 border-amber-600 rounded-xl shadow-2xl p-4"
        >
          <div className="text-center mb-3">
            <h3 className="text-xl font-bold text-amber-400 mb-1">
              {selectedItem.name}
            </h3>
            <div className="flex justify-center gap-4 text-sm">
              <span className="text-gray-300">
                Level: {selectedItem.requiredLevel}
              </span>
              <span className="text-gray-300">
                Class: {selectedItem.heroClass}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {[
              ["Strength", selectedItem.strengthBonus],
              ["Dexterity", selectedItem.dexterityBonus],
              ["Intelligence", selectedItem.intelligenceBonus],
              ["Constitution", selectedItem.constitutionBonus],
              ["Luck", selectedItem.luckBonus],
            ]
            .filter(([_, value]) => (value as number) > 0)
            .map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between items-center"
              >
                <span className="text-gray-300">
                  {label}
                </span>
                <span
                  className={`font-bold text-lg ${
                    (value as number) >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {(value as number) >= 0 ? "+" : ""}
                  {value}
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-700">
              <span className="text-gray-300 text-lg">
                Power
              </span>
              <span className="font-bold text-2xl text-yellow-400">
                {selectedItem.power}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-700">
            <button
              onClick={() =>
                handleEquip(selectedItem.id)
              }
              className="flex-1 px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              EQUIP
            </button>

            <button
              onClick={() =>
                handleSell(selectedItem.id)
              }
              className="flex-1 px-4 py-2 bg-linear-to-r from-red-600 to-rose-700 text-white font-bold rounded-lg hover:from-red-700 hover:to-rose-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {isPending ? "Selling..." : "Sell Item"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
