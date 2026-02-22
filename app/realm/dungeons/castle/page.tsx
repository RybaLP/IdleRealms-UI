import Image from "next/image"
import BackButton from "../components/backButton"

const Page = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="/battlefield-dungeon.jpg"
        alt="Battlefield Dungeon"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <BackButton/>
    </div>
  )
}

export default Page