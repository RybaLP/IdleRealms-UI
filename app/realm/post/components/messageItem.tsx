import { MessageDto, MessageType } from "@/app/types/message/message";
import InvitationActions from "./invitationActions";

interface Props {
  message: MessageDto;
  onDelete: (id: string) => void;
  onReply: (msg: MessageDto) => void;
  onSelect: (msg: MessageDto) => void;
}

export default function MessageItem({ message, onDelete, onReply, onSelect }: Props) {
  const isInvitation = message.type === MessageType.GUILD_INVITATION && message.status === "PENDING";

  return (
    <div
      className="bg-gray-900/80 border border-gray-700 rounded-lg p-4 hover:bg-gray-800/90 transition cursor-pointer"
      onClick={() => onSelect(message)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold">{message.senderId}</span>
            <span className="text-xs text-gray-400">
              {new Date(message.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="text-white font-semibold mt-1">{message.subject}</div>
          <div className="text-gray-300 text-sm line-clamp-2">{message.content}</div>
        </div>

        <div className="flex gap-2 ml-4">
          {isInvitation && (
            <InvitationActions
              invitationId={message.id}
              referenceId={message.referenceId}
              onComplete={() => onDelete(message.id)}
            />
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onReply(message); }}
            className="px-3 py-1 bg-blue-700 hover:bg-blue-600 text-white text-sm rounded"
          >
            REPLY
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(message.id); }}
            className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white text-sm rounded"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}