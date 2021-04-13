import { RewardData } from "./reward"

export interface AchievementData {
	readonly id: string
	readonly behaviorId: string
	readonly tiers: AchievementTierData[]
	readonly tag?: string
	readonly title: string
	readonly description: string
	readonly icon?: string
	readonly completedAt?: Date
	readonly metadata?: string
	readonly tagKey?: string

	readonly active: boolean
	readonly cta?: string
}

/**
 * @param completed - Deprecated
 */
export interface AchievementTierData {
	readonly title: string
	readonly description: string
	readonly icon?: string
	readonly amount: number
	readonly completed?: Date
	readonly completedAt?: Date
	readonly progress: number
	readonly rewards: RewardData[]
}
