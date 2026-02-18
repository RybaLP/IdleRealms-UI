import Image from "next/image"

const Page = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="/castle-dungeon.jpg"
        alt="Castle Dungeon"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  )
}

export default Page