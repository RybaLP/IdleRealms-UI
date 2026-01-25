"use client";

import { useTavern } from "@/app/hooks/useTavern";
import { Quest } from "@/app/types/quest/quest";
import { useEffect, useState } from "react";

interface Props {
  onClose: () => void;
}

const QuestSelectionWindow = ({ onClose }: Props) => {
  const { status, isLoading } = useTavern();
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  useEffect(() => {
    if (status?.avalibleQuestOffers?.length && !selectedQuest) {
      setSelectedQuest(status.avalibleQuestOffers[0]);
    }
  }, [status, selectedQuest]);

  if (isLoading) {
    return (
      <div className="text-yellow-500 animate-pulse font-serif italic text-xl">
        The bartender is looking for new contracts...
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl bg-[#0a0a0a]/95 border-x-4 border-y-2 border-[#3d2b1f] p-8 font-serif shadow-[0_0_100px_rgba(0,0,0,1)]">

      {/* close */}
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-[#5c4a3c] hover:text-yellow-600 text-2xl"
      >
        ×
      </button>

      <div className="grid grid-cols-12 gap-8">

        {/* ================= LEFT COLUMN – QUEST LIST ================= */}
        <div className="col-span-4 border-r border-[#3d2b1f] pr-4">
          <h3 className="text-yellow-600 text-lg mb-4 uppercase tracking-wider">
            Choose a quest
          </h3>

          <div className="space-y-2">
            {status?.avalibleQuestOffers?.map((quest) => {
              const active = selectedQuest?.monsterId === quest.monsterId;

              return (
                <button
                  key={quest.monsterId}
                  onClick={() => setSelectedQuest(quest)}
                  className={`
                    w-full text-left px-4 py-2 rounded-sm transition-all
                    border-l-4
                    ${active
                      ? "bg-[#1a1510] border-yellow-600 text-yellow-500 shadow-md"
                      : "border-transparent text-[#7d6b5b] hover:bg-white/5 hover:text-[#a8927a]"
                    }
                  `}
                >
                  <span className="font-bold uppercase tracking-tight">
                    {quest.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT COLUMN – QUEST DETAILS ================= */}
        <div className="col-span-8 flex flex-col">

          <div className="flex-1">
            <h2 className="text-2xl text-yellow-600 mb-4">
              {selectedQuest?.title}
            </h2>

            <p className="text-[#a8927a] italic leading-relaxed text-lg whitespace-pre-line">
              {selectedQuest?.description}
            </p>
          </div>

          {/* stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#3d2b1f] pt-4 text-center font-sans text-sm font-bold">

            <div className="bg-[#1a1510] p-3 border border-[#3d2b1f]">
              <div className="text-yellow-600">Gold</div>
              <div className="text-lg">{selectedQuest?.goldReward}</div>
            </div>

            <div className="bg-[#1a1510] p-3 border border-[#3d2b1f]">
              <div className="text-blue-500">Experience</div>
              <div className="text-lg">{selectedQuest?.expReward}</div>
            </div>

            <div className="bg-[#1a1510] p-3 border border-[#3d2b1f]">
              <div className="text-slate-400">Duration</div>
              <div className="text-lg">
                {selectedQuest &&
                  `${Math.floor(selectedQuest.durationInSeconds / 60)}:${String(
                    selectedQuest.durationInSeconds % 60
                  ).padStart(2, "0")}`}
              </div>
            </div>

          </div>

          {/* actions */}
          <div className="mt-6 flex justify-end gap-4">
            <button className="px-6 py-2 bg-[#1a1510] border border-[#3d2b1f] text-[#7d6b5b] hover:text-yellow-500">
              Back
            </button>
            <button className="px-6 py-2 bg-yellow-700 text-black font-bold hover:bg-yellow-600">
              Accept
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuestSelectionWindow;
