export interface RewardData {
	readonly currency: Currency
	readonly amount: number
}

export enum UserCurrencyEnum {
	"xp",
	"coin",
	"vipcurrency",
}

export type UserCurrency = keyof typeof UserCurrencyEnum

export enum CurrencyEnum {
	"xp",
	"coin",
	"vipcurrency",
}

export enum TeamCurrencyEnum {
	"team-xp",
}

export type TeamCurrency = keyof typeof TeamCurrencyEnum

export type Currency = UserCurrency | TeamCurrency

export type RewardIcons = Partial<Record<Currency, string>>
