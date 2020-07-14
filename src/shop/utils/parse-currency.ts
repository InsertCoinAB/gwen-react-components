import { Currency, ShopCurrency } from "../../types"

export function parseShopCurrency(currency: ShopCurrency): Currency {
	return currency === "vip" ? "vipcurrency" : "coin"
}
