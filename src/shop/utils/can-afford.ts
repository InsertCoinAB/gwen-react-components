import { ModuleShopItem, ShopData } from "../../types"

export function userCanAfford(item: ModuleShopItem, shop: Partial<ShopData>) {
	return item.currency === "vip"
		? typeof shop.vipCurrency === "number" && item.value <= shop.vipCurrency
		: typeof shop.coins === "number" && item.value <= shop.coins
}
