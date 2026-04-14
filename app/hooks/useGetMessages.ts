import { useQuery } from "@tanstack/react-query";
import { MessageDto } from "../types/message/message";
import { socialService } from "../services/messageService";

export const useGetMessages = (socialId: string | undefined) => {
  return useQuery<MessageDto[]>({
    queryKey: ["messages", socialId],
    
    queryFn: () => socialService.getInbox(socialId!),
    
    enabled: !!socialId,
    
    staleTime: 1000 * 60,
  });
};