import { useQuery } from "@tanstack/react-query";
import { tavernService } from "../services/tavernService";

export const useTavern = () => {

 const { 
    data: status, 
    isLoading, 
    isError, 
    error,
    refetch,
  } = useQuery({
    queryKey: ["tavern-status"],
    queryFn: () => tavernService.getTavernStatus(),
    refetchInterval: (query) => {
      return query.state.data?.activeQuest ? 5000 : false;
    },
    refetchOnWindowFocus: false,
  });

  return {
    status,
    isLoading,
    isError,
    error,
    refetchStatus: refetch
  }
}