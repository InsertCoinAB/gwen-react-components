import { RewardData } from "./reward"

export interface LevelAvatarData {
	readonly id: string
	readonly url: string
	readonly colors: {
		readonly background: string
		readonly shirt: string
	}
}

export interface LevelLog {
	type: ActionType
	xp: number
	date: Date
	text: string
}

export type ActionType = string

export interface ModuleLevelUserBehaviorCooldownData {
	readonly behaviorName: string
	readonly cooldownInMS: number
	readonly lastReportedAt: Date
}

export type LevelData = {
	level: number
	currentXp: number
	totalXp: number
	levelXp: number
	levelUp: boolean
	log: LevelLog
	rewards: RewardData[]
}
