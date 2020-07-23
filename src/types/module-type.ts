export const ModuleTypes = ["mission", "level", "character", "shop", "leaderboard", "achievement", "selfreporting", "self-evaluation", "team"] as const

export type ModuleType = typeof ModuleTypes[number]
