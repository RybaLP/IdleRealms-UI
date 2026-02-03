"use client";

import { useQuery } from "@tanstack/react-query";
import { shopService } from "../services/shopService";
import { ShopItemsResponse } from "../types/item/item";

export const useGetShopItems = () => {

    const {data,isLoading,isError} = useQuery<ShopItemsResponse>({
        queryKey : ["hero-shop"],
        queryFn : () => shopService.getHeroItems(),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10
    });
    return {data, isLoading, isError};
    
}