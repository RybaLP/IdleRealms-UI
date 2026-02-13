"use client";
import { Item } from "@/app/types/item/item";
import { useGetShopItems } from '@/app/hooks/useGetShopItems';
import { ShopItem } from "./shopItem";
import { useState } from "react";
import { usePurchaseItem } from "@/app/hooks/usePurchaseItem";
import { useDispatch } from "react-redux";
import { updateHeroAfterPurchase } from "@/app/store/heroSlice";


const ItemsToBuy = () => {
  const { data, isLoading, isError } = useGetShopItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  
  const {mutate : purchaseItem, isPending} = usePurchaseItem();
  const dispatch = useDispatch();

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

  const handleBuy = (itemId: number) => {
    if (itemId == null) return;

    purchaseItem(itemId, {
      onSuccess: (data) => {
        dispatch(updateHeroAfterPurchase(data));
      },
      onError: (error) => {
        alert(error.message);
      }
    });

  };

  if (isLoading) return <div className="text-amber-500 animate-pulse p-10 text-center">Opening Shop...</div>;
  if (isError || !data) return <div className="text-red-500 p-10 text-center">Shop is closed (Server Error)</div>;

  const shopItems = data.items ?? [];


  return (
    <div className="w-full flex justify-center p-4" onClick={handleBackgroundClick}>
      <div className="grid grid-cols-3 gap-8" onClick={(e) => e.stopPropagation()} >
        {shopItems.length > 0 ? (
          shopItems.map((item: Item) => (
            <div key={item.id} onClick={() => setSelectedItem(item)}>
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