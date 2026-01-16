import Image from "next/image"
import CreateCharacterPanel from "./components/characterCreator/createCharacterPanel"
import CharacterAvatar from "../components/shared/characterAvatar"
import RegisterForm from "./components/registerForm"
import AppearanceCustomizer from "./components/characterCreator/appearanceCustomizer"

const Page = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]"> 
      
      <div className="absolute inset-0 z-0 opacity-70">
        <Image src="/landing-page-bg.png" fill className="object-cover" alt="bg" priority />
      </div>

      <div className="relative z-10 h-screen w-full flex justify-between items-center px-30 pb-20">
        
        <div className="w-87.5">
          <CreateCharacterPanel />
        </div>

        <div className="flex-1 flex flex-col items-center pt-10">
          <div className="w-full max-w-112.5"> 
            <CharacterAvatar />
          </div>
          <div className="mt-8">
            <AppearanceCustomizer />
          </div>
        </div>

        <div className="w-87.5 flex justify-end">
          <RegisterForm />
        </div>

      </div>

      <div className="absolute bottom-8 left-0 w-full flex justify-center z-30">
        <button className="
          min-w-85 py-4
          bg-linear-to-b from-[#ff9d00] to-[#cc7a00] 
          border-[3px] border-[#1a2b3c]
          text-[#0a0a0a] font-[900] text-2xl uppercase tracking-tighter
          shadow-[0_0_30px_rgba(0,0,0,0.7),inset_0_2px_2px_rgba(255,255,255,0.4)]
          hover:from-[#ffb333] hover:to-[#e68a00]
          hover:scale-105 active:scale-95 transition-all
          rounded-sm
        ">
          Create Character
        </button>
      </div>

    </main>
  )
}
export default Page