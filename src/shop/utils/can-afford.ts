import { ModuleShopItem, ShopData } from "../../types"

export function userCanAfford(item: ModuleShopItem, shop: Partial<ShopData>) {
	return typeof shop.coins === "number" && item.value <= shop.coins
}
