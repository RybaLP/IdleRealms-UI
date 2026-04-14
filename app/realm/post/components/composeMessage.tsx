"use client";

import { useState } from "react";
import { useSendMessage } from "@/app/hooks/useSendMessage";
import { toast } from "react-hot-toast";

interface Props {
  senderId : string | undefined,
  onClose: () => void;
  onSent: () => void;
}

export default function ComposeMessage({ senderId, onClose, onSent }: Props) {
  const { mutate, isPending } = useSendMessage();

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");

  const handleSend = () => {
    if (!recipientUsername.trim()) return toast.error("Who is the recipient?");
    if (!content.trim()) return toast.error("The scroll is empty!");

    if (senderId == undefined) {
      return;
    }

    mutate(
      {
        senderId: senderId,
        username: recipientUsername,
        topic: subject || "No Title",
        content: content,
      },
      {
        onSuccess: () => {
          onSent(); 
          alert("Message sent successfuly!");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] backdrop-blur-sm">
      <div className="bg-gray-900 border-2 border-amber-600 rounded-xl w-full max-w-[500px] p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] mx-4">
        <h2 className="text-2xl font-bold text-amber-400 mb-6 text-center tracking-tighter uppercase italic">
          New Message
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Recipient Username"
            value={recipientUsername}
            onChange={(e) => setRecipientUsername(e.target.value)}
            disabled={isPending}
            className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 transition-all outline-none"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={isPending}
            className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 transition-all outline-none"
          />
          <textarea
            placeholder="Write your message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPending}
            rows={6}
            className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white focus:border-amber-500 transition-all outline-none resize-none"
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            disabled={isPending}
          >
            Discard
          </button>
          <button
            onClick={handleSend}
            disabled={isPending}
            className={`px-8 py-2 rounded-lg font-bold shadow-lg transition-all transform active:scale-95 ${
              isPending 
                ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                : "bg-amber-600 hover:bg-amber-500 text-white"
            }`}
          >
            {isPending ? "Sending..." : "Send Scroll"}
          </button>
        </div>
      </div>
    </div>
  );
}