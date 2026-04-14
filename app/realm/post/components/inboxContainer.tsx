"use client";

import Image from "next/image";
import { useState } from "react";
import { useGetMessages } from "@/app/hooks/useGetMessages";
import { MessageDto } from "@/app/types/message/message";
import MessageList from "./messageList";
import ComposeMessage from "./composeMessage";
import { useHeroInfo } from "@/app/hooks/useGetHeroInfo";
import { useDeleteMessage } from "@/app/hooks/useDeleteMessage";

export default function InboxContainer() {
  const [selectedMessage, setSelectedMessage] = useState<MessageDto | null>(null);
  const [showCompose, setShowCompose] = useState(false);

  const { hero, isLoading: isHeroLoading } = useHeroInfo();
  const {mutate : deleteMessage} = useDeleteMessage();

  const { 
    data: messages, 
    isLoading: isMessagesLoading, 
    refetch 
  } = useGetMessages(hero?.socialId); 

  const handleDelete = async (messageId : string) => {
    if(!hero?.socialId) return;
    deleteMessage({
      messageId : messageId,
      socialId : hero.socialId
    });

  };

  const handleDeleteAll = async () => {
    console.log("Delete all");
  };

  const handleReply = (message: MessageDto) => {
    setSelectedMessage(message);
    setShowCompose(true);
  };

  if (isHeroLoading || isMessagesLoading) {
    return (
      <div className="h-full flex items-center justify-center text-amber-400 font-bold animate-pulse">
        Opening ancient scrolls...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-150 bg-black/90 rounded-xl border-2 border-slate-800 shadow-2xl overflow-hidden">
      <Image
        src="/post.png"
        alt="Inbox background"
        fill
        priority
        className="object-cover pointer-events-none opacity-30"
      />

      <div className="relative z-10 flex flex-col h-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-amber-400 drop-shadow-lg">INBOX</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCompose(true)}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-md shadow-md transition-all active:scale-95"
            >
              NEW MESSAGE
            </button>
            <button
              onClick={handleDeleteAll}
              className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white font-bold rounded-md shadow-md transition-all active:scale-95"
            >
              DELETE ALL
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {messages && messages.length > 0 ? (
            <MessageList
              messages={messages}
              onDelete={handleDelete}
              onReply={handleReply}
              onMessageSelect={setSelectedMessage}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 italic mt-10">
              <p>Your mailbox is empty.</p>
              <p className="text-sm text-gray-600">No ravens arrived lately.</p>
            </div>
          )}
        </div>

        {showCompose && (
          <ComposeMessage
            senderId={hero?.socialId}
            onClose={() => {
              setShowCompose(false);
              setSelectedMessage(null);
            }}
            onSent={() => {
              refetch();
              setShowCompose(false);
              setSelectedMessage(null);
            }}
          />
        )}
      </div>
    </div>
  );
}