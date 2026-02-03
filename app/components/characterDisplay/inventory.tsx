"use client";

import { Item } from "@/app/types/item/item";
import { ItemSlot } from "./itemSlot";

interface InventoryProps {
  inventory: Item[];
}

const Inventory = ({ inventory }: InventoryProps) => {
  const MAX_SLOTS = 5;

  const displaySlots: (Item | null)[] = [
    ...inventory,
    ...Array(MAX_SLOTS - inventory.length).fill(null),
  ];

  return (
    <div className="p-4 pt-0">
      <div className="grid grid-cols-5 gap-2">
        {displaySlots.map((item, index) => (
          <ItemSlot
            key={index}
            item={item}
            slotType={""}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
