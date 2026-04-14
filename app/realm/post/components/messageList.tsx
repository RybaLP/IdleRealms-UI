import { MessageDto } from "@/app/types/message/message";
import MessageItem from "./messageItem";

interface Props {
  messages: MessageDto[];
  onDelete: (id: string) => void;
  onReply: (msg: MessageDto) => void;
  onMessageSelect: (msg: MessageDto) => void;
}

export default function MessageList({ messages, onDelete, onReply, onMessageSelect }: Props) {
  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          onDelete={onDelete}
          onReply={onReply}
          onSelect={onMessageSelect}
        />
      ))}
    </div>
  );
}