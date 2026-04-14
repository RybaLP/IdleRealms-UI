interface Props {
  invitationId: string;
  referenceId: string | null;
  onComplete: () => void;
}

export default function InvitationActions({ invitationId, referenceId, onComplete }: Props) {
//   const { mutate: accept, isPending: isAccepting } = useHandleInvitation("ACCEPT");
//   const { mutate: reject, isPending: isRejecting } = useHandleInvitation("REJECT");

  const handleAccept = () => {
    // accept({ invitationId, referenceId }, { onSuccess: onComplete });
  };

  const handleReject = () => {
    // reject({ invitationId, referenceId }, { onSuccess: onComplete });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={(e) => { e.stopPropagation(); handleAccept(); }}
        // disabled={isAccepting}
        className="px-3 py-1 bg-green-700 hover:bg-green-600 text-white text-sm rounded disabled:opacity-50"
      >
        ACCEPT
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); handleReject(); }}
        // disabled={isRejecting}
        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded disabled:opacity-50"
      >
        REJECT
      </button>
    </div>
  );
}