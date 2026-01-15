import Image from "next/image"
import CreateCharacterPanel from "./components/characterCreator/createCharacterPanel"

const Page = () => {
  return (
    <main className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-70">
            <Image src="/landing-page-bg.png" fill className="object-cover" alt="bg" />
        </div>
        <div className="relative z-10 ml-8">
            <CreateCharacterPanel/>
        </div>
    </main>
  )
}
export default Page