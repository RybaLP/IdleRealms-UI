import ClassSelection from "./classSelection";
import RaceSelection from "./raceSelection";

export default function CreateCharacterPanel() {
  return (
    <div className="w-125 bg-slate-900/90 border-4 border-slate-700 p-6 flex flex-col gap-6 shadow-2xl">
      <RaceSelection />
      <ClassSelection />
    </div>
  );
}