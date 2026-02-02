"use client";

import { useTavern } from "@/app/hooks/useTavern";
import { Quest } from "@/app/types/quest/quest";
import { useEffect, useState } from "react";
import { tavernService } from "@/app/services/tavernService";
import { useQueryClient } from "@tanstack/react-query";
import { useGetHeroInfo } from "@/app/hooks/useGetHeroInfo";

interface Props {
  onClose: () => void;
}

const QuestSelectionWindow = ({ onClose }: Props) => {
  const queryClient = useQueryClient();
  const { status, isLoading } = useTavern();
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const stamina = useGetHeroInfo().hero?.energy;

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

  const handleAcceptQuest = async () => {
    if (selectedQuest == null) {
      throw new Error("Mission must be selected!");
    }
    await tavernService.selectMission(selectedQuest);
    await queryClient.invalidateQueries({ queryKey: ["tavern-status"] });
    onClose();
  };

  return (
    <div className="relative w-full max-w-6xl bg-[#0a0a0a]/95 border-x-4 border-y-2 border-[#3d2b1f] p-8 font-serif shadow-[0_0_100px_rgba(0,0,0,1)]">
{/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-[#5c4a3c] hover:text-yellow-600 text-2xl"
      >
        ×
      </button>

      <div className="grid grid-cols-12 gap-8">
        {/* QUEST LIST */}
        <div className="col-span-4 border-r border-[#3d2b1f] pr-4">
          <h3 className="text-yellow-600 text-lg mb-4 uppercase tracking-wider">
            Choose a quest
          </h3>

          <div className="space-y-2">
            {status?.avalibleQuestOffers?.map((quest, index) => {
              const active = selectedQuest === quest;

              return (
                <button
                  key={index}
                  onClick={() => setSelectedQuest(quest)}
                  className={`
                    w-full text-left px-4 py-2 rounded-sm transition-all
                    border-l-4
                    ${
                      active
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

            {/* QUEST DETAIILS  */}
        <div className="col-span-8 flex flex-col">
          <div className="flex-1">
            <h2 className="text-2xl text-yellow-600 mb-4">
              {selectedQuest?.title}
            </h2>

            <p className="text-[#a8927a] italic leading-relaxed text-lg whitespace-pre-line">
              {selectedQuest?.description}
            </p>
          </div>

          {/* REWARDS */}
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
          {/* BUTTONS */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              className="px-6 py-2 bg-[#1a1510] border border-[#3d2b1f] text-[#7d6b5b] hover:text-yellow-500"
              onClick={onClose}
            >
              Back
            </button>

            <button
              className="px-6 py-2 bg-yellow-700 text-black font-bold hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAcceptQuest}
              disabled={(stamina ?? 0) <= 0}
            >
              Accept
            </button>
          </div>
        </div>
      </div>

              {/* STAMINA BAR */}
      <div className="mt-8 pt-6 border-t border-[#3d2b1f] flex flex-col items-center">
        <div className="flex justify-between w-full max-w-2xl mb-2 px-1 uppercase tracking-tighter text-xs font-bold">
          <span className="text-yellow-600 tracking-widest">Thirst for Adventure</span>
          <span className="text-[#a8927a] font-sans">{stamina ?? 0} / 100</span>
        </div>

        <div className="relative w-full max-w-2xl h-5 bg-black border-2 border-[#3d2b1f] shadow-[inset_0_0_10px_rgba(0,0,0,1)] overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(34,197,94,0.2)] ${
              (stamina ?? 0) > 20 
                ? "bg-linear-to-r from-green-900 via-green-500 to-green-400" 
                : "bg-linear-to-r from-red-900 via-red-500 to-red-400"
            }`}
            style={{ width: `${Math.min(100, stamina ?? 0)}%` }}
          />

          <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
          
          <div className="absolute inset-0 flex justify-between px-[10%] pointer-events-none">
             {[...Array(9)].map((_, i) => (
               <div key={i} className="w-px h-full bg-black/20" />
             ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuestSelectionWindow;