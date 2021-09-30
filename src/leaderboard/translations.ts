import { GenericTranslation, GenericTranslations } from "../components/translations"
import { LeaderboardUserColumn } from "./column"

export type LeaderboardTranslation = GenericTranslation &
	Record<LeaderboardUserColumn, string> & {
		moduleName: string
		noHighscore: string
		nickname: string
		score: string
		myScore: string
		anonymous: string
		alltime: string
		weekly: string
	}

const ScoreTranslations: Record<LeaderboardUserColumn, string> = {
	achievementTiersCompleted: "Achievement Tiers Completed",
	achievementsCompleted: "Achievements Completed",
	coinGained: "Coins Gained",
	coinSpent: "Coins Spent",
	levelsGained: "Levels Gained",
	missionObjectivesCompleted: "Mission Objectives Completed",
	missionsCompleted: "Missions Completed",
	shopItemsPurchased: "Shop Items Purchased",
	xpGained: "XP Gained",
	teamXpGained: "Team XP Gained",
}

export const LeaderboardTranslations: LeaderboardTranslation = {
	...GenericTranslations,
	...ScoreTranslations,
	moduleName: "Leaderboard",
	noHighscore: "No Highscore",
	nickname: "Nickname",
	score: "Score",
	myScore: "My Score",
	anonymous: "Anonymous",
	alltime: "All Time",
	weekly: "Weekly",
}
