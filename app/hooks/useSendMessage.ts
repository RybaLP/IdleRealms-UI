import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialService } from "../services/messageService";
import { toast } from "react-hot-toast";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { senderId: string; username: string; topic: string; content: string }) =>
      socialService.sendMessage(data.senderId, data.username, data.topic, data.content),
    
    onSuccess: () => {
      toast.success("Message sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    
    onError: (error: any) => {
      const errorMessage = error.message.includes("404") 
        ? "Player not found! Check the username." 
        : "Failed to send message.";
      
      toast.error(errorMessage);
    },
  });
};