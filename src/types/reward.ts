export interface RewardData {
	readonly currency: Currency
	readonly amount: number
}

export enum UserCurrencyEnum {
	"xp",
	"coin",
}
export type UserCurrency = keyof typeof UserCurrencyEnum

export enum TeamCurrencyEnum {
	"team-xp",
}
export type TeamCurrency = keyof typeof TeamCurrencyEnum

export type Currency = UserCurrency | TeamCurrency | string /* "string" here means: UUID of a character progressions currencyId */

/* Only to be used in speciell locations where the hard coded currency values are to be referenced */
export type CurrencyStrictLegacy = UserCurrency | TeamCurrency

export type RewardIcons = Partial<Record<Currency, string>>
