import { MessageDto } from "../types/message/message";

const apiUrl = process.env.NEXT_PUBLIC_API_SOCIAL_URL ?? "http://localhost:8081";

export const socialService = {
  async getInbox(socialId: string): Promise<MessageDto[]> {
    try {
      const response = await fetch(`${apiUrl}/api/messages/${socialId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch inbox: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("SocialService getInbox Error:", error);
      throw error;
    }
  },

  async sendMessage(senderId: string, recipientUsername: string, topic: string, content: string) {
  try {
    const response = await fetch(`${apiUrl}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: senderId,
        recipientUsername: recipientUsername, 
        topic: topic,
        content: content
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to send message: ${response.status}`);
    }

    if (response.status === 201) {
      return { success: true };
    }

    return await response.json();
    
  } catch (error) {
    console.error("SocialService sendMessage Error:", error);
    throw error;
  }
},

async deleteMessage (messageId : string, socialId : string) : Promise<void> {
  const response = await fetch(`${apiUrl}/api/messages/${messageId}?socialId=${socialId}`, {
    method : "DELETE",
    headers : {
      'Content-Type': 'application/json',
    }
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete the message');
  }

}
};