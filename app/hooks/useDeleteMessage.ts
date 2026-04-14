import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialService } from "../services/messageService";

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ messageId, socialId }: { messageId: string; socialId: string }) =>
        socialService.deleteMessage(messageId, socialId),
    
        onSuccess: (_,variables) => {
            queryClient.invalidateQueries({ queryKey: ["messages", variables.socialId] });
        },
    })
}