import { useMutation, useQueryClient } from "@tanstack/react-query";
import { itemService } from "../services/itemService";
import { SwitchItemRequest } from "../types/item/item";
import { HeroProfile } from "../types/hero/hero";

export const useSwitchItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SwitchItemRequest) => itemService.switchItem(request),

    onSuccess: (updatedHeroProfile: HeroProfile) => {
      queryClient.setQueryData(['heroProfile'], updatedHeroProfile);
      queryClient.invalidateQueries({queryKey : ["heroProfile"]});
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });
};