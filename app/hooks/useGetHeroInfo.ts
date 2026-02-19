import { useQuery } from "@tanstack/react-query";
import { heroService } from "../services/heroService"; 

export const useHeroInfo = () => {
 const { data, isLoading, error, ...queryProps } = useQuery({
    queryKey: ['heroProfile'],
    queryFn: () => heroService.getMyHero(), 
    staleTime: 1000 * 60 * 5, 
  });

  return {
    ...queryProps, 
    hero: data,
    isLoading,
    error,
    isLoaded: !!data,
    nickname: data?.nickname || "Unknown",
    gold: data?.gold || 0,
    experience: data?.experience || 0,
    level: data?.level || 1, 
    visualConfig: data?.visualConfig || "0;0;0;0;0",
  };
};