import { useMutation, useQueryClient } from "@tanstack/react-query";
import { itemService } from "../services/itemService";
import { HeroProfile } from "../types/hero/hero";

export const useSellItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => itemService.sellItem(itemId),

    onSuccess: (updatedHero: HeroProfile) => {
      queryClient.setQueryData(['heroProfile'], updatedHero);
    },

    onError: (error: Error) => {
      console.error(error.message);
    }
  });
};