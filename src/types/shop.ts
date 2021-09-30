import { ModuleType } from "./module-type"

export type ShopCurrency = "coin"

export interface ShopData {
	coins: number
	totalCoinsEarned?: number
}

export interface ModuleShopItem {
	readonly id: string
	readonly productId: string // !TODO @Gusten, OBS! Customer product ID, not our own (companyProductId)
	readonly value: number
	readonly currency: ShopCurrency
	readonly type: string
	readonly imageUrl?: string
	readonly title: string
	readonly description: string
	readonly availability: Readonly<ShopItemAvailability>
	readonly totalPurchases: number
	readonly cooldownFinish?: number
	readonly globallyAvailable?: number
}

export interface ShopItemAvailability {
	progression?: {
		module: ModuleType
		value: number
	}
	userAmountLimit?: number
	globalAmountLimit?: number
	userCooldown?: number
	period?: {
		from: Date
		to: Date
	}
	userCategoryIds?: string[]
	unavailable?: boolean
}
