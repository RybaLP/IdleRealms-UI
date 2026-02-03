import CharacterDisplay from "@/app/components/characterDisplay/characterDisplay"
import ShopPanel from "./components/shopPanel"

const ShopPage = () => {
  return (
    <div className="h-screen w-full flex justify-center gap-10 p-6 bg-[#050a12]">
      
      <div className="mt-7 overflow-hidden">
        <CharacterDisplay />
      </div>
      
      <div className="flex-1 flex justify-start overflow-hidden">
        <ShopPanel />
      </div>
      
    </div>
  )
}
export default ShopPage