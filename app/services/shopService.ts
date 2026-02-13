import { PurchaseItemResponse, ShopItemsResponse } from "../types/item/item";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const shopService = {

    async getHeroItems () : Promise<ShopItemsResponse> {

        try {
            const res = await fetch(apiUrl + "/api/shop" , {
                method : "GET",
                credentials : "include"
            })

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.json();
            return data;
            
        } catch (error) {
            throw new Error(error as any);
        }
    },

    async purchaseItem (itemId : number) : Promise<PurchaseItemResponse> {

         try {
            const res = await fetch(apiUrl + "/api/shop/buy" , {
                method : "POST",
                credentials : "include",
                body : JSON.stringify({
                    itemId : itemId
                })
            })

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.json();
            return data;
            
        } catch (error) {
            throw new Error(error as any);
        }

    }
}