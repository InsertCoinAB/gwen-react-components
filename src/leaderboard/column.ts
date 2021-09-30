export enum LeaderboardUserColumnEnum {
	xpGained,
	coinGained,
	teamXpGained,
	levelsGained,
	missionsCompleted,
	missionObjectivesCompleted,
	achievementsCompleted,
	achievementTiersCompleted,
	shopItemsPurchased,
	coinSpent,
}
export type LeaderboardUserColumn = keyof typeof LeaderboardUserColumnEnum
