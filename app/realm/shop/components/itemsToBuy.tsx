"use client";
import { Item } from "@/app/types/item/item";
import { useGetShopItems } from '@/app/hooks/useGetShopItems';
import { ShopItem } from "./shopItem";
import { useState } from "react";


const ItemsToBuy = () => {
  const { data, isLoading, isError } = useGetShopItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleItemSelect = (item : Item) => {
    if (selectedItem?.id == null) {
      setSelectedItem(item);
    } else {
      setSelectedItem(null);
    }
  }

  const handleBackgroundClick = () => {
    setSelectedItem(null);
  };

  // TODO
  // COMPLETE HANDLE BUY FUNCTION
  const handleBuy = (itemId: number) => {
    console.log('Buying item:', itemId);
  };

  if (isLoading) return <div className="text-amber-500 animate-pulse p-10 text-center">Opening Shop...</div>;
  if (isError || !data) return <div className="text-red-500 p-10 text-center">Shop is closed (Server Error)</div>;

  const shopItems = data.items ?? [];


  return (
    <div className="w-full flex justify-center p-4" onClick={handleBackgroundClick}>
      <div className="grid grid-cols-3 gap-8" onClick={(e) => e.stopPropagation()} >
        {shopItems.length > 0 ? (
          shopItems.map((item: Item) => (
            <div onClick={() => setSelectedItem(item)}>
              <ShopItem 
                key={item.id} 
                item={item} 
                onBuy={handleBuy}
                selectedItem = {selectedItem}
                onSelect={() => handleItemSelect(item)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-3 text-gray-500 italic">No items available in shop...</div>
        )}
      </div>
    </div>
  );
};

export default ItemsToBuy;