import { RewardData } from "./reward"

export interface CharacterProgressionTierData {
	title: string
	icon?: string
	startStep?: number
	endStep?: number
	rewards: RewardData[]
}
