import { ModuleShopItem } from "../../types"

export const isAvailable = (item: ModuleShopItem) => {
	return (
		item.globallyAvailable !== 0 &&
		!item.availability.unavailable &&
		(!item.availability.userAmountLimit || item.availability.userAmountLimit > item.totalPurchases)
	)
}
