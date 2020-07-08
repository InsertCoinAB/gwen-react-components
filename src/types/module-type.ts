export const ModuleTypes = ["mission", "level", "skill", "shop", "leaderboard", "challenge", "achievement", "selfreporting"] as const

export type ModuleType = typeof ModuleTypes[number]
