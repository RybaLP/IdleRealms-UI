"use client"

import Image from "next/image"
import OponentCredentials from "../components/oponentCredentials"
import { useDungeonStatus } from "@/app/hooks/useDungeonStatus"

const Page = () => {

  const { data, isLoading, isError } = useDungeonStatus(1);
  if (isLoading) return <div>Loading...</div>
  if (isError || !data) return <div>Error...</div>


  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center">
      <Image
        src="/forest-dungeon.jpg"
        alt="Forest Dungeon"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <OponentCredentials floorDescription={data.floorDescription}
      monsterName={data.monsterName} monsterImageUrl={data.monsterImageUrl}
      currentFloor={data.currentFloor}/>


    </div>
  )
}

export default Page