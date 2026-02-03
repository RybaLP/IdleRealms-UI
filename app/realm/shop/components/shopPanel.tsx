import Image from "next/image"
import ItemsToBuy from "./itemsToBuy"

const ShopPanel = () => {
  return (
    <div className="w-full h-full bg-linear-to-b overflow-hidden">
      <div className="relative w-full h-full">
        <Image 
          src="/shop.png" 
          alt="Shop" 
          fill
          className="object-cover" 
        />

        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-10">
        <ItemsToBuy />
      </div>
      
      </div>
    </div>
  )
}

export default ShopPanel