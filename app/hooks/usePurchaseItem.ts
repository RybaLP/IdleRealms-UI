"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shopService } from "../services/shopService";
import { ShopItemsResponse } from "../types/item/item";

export const usePurchaseItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (itemId: number) => shopService.purchaseItem(itemId),
        
        onSuccess: (data) => {
            queryClient.setQueryData<ShopItemsResponse>(["hero-shop"], (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    items: data.updatedShopItems
                };
            });

            queryClient.invalidateQueries({queryKey : ["heroProfile"]});

        },
        onError: (error: any) => {
            console.error("Purchase error:", error.message);
        }
    });
};