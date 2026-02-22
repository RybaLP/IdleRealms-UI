import CharacterDisplay from "@/app/components/characterDisplay/characterDisplay"
import Image from "next/image"

const Page = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center p-6">
      
      <Image
        src="/character-bg.jpg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mt-7">
        <CharacterDisplay />
      </div>

    </div>
  )
}

export default Page