import { useQuery } from "@tanstack/react-query"
import { dungeonService } from "../services/dungeonService"

export const useDungeonStatus = (dungeonId : number) => {
    return useQuery({
        queryKey : ["dungeon", dungeonId],
        queryFn : () => dungeonService.getDungeonStatus(dungeonId),
        staleTime : 1000 * 60 * 5 
    });
}