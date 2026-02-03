export interface Item {
    id: number;
    name: string;
    imageUrl: string;
    itemType: string;
    heroClass: string;
    power: number;
    strengthBonus: number;
    dexterityBonus: number;
    intelligenceBonus: number;
    constitutionBonus: number;
    luckBonus: number;
    price: number;
    requiredLevel: number;
}

export interface ShopItemsResponse {
    items : Item [],
    LocalDateTime : string
}