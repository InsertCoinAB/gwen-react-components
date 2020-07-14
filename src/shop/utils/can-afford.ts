import { ModuleShopItem, ShopData } from "../../types"

export function userCanAfford(item: ModuleShopItem, shop: ShopData) {
	return item.currency === "vip" ? !!shop.vipCurrency && item.value <= shop.vipCurrency : item.value <= shop.coins
}
