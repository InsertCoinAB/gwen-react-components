import React from "react"
import { WrapperComponent } from "../theme"
import { LeaderboardRow } from "../types/leaderboard"
import { LeaderboardList } from "./list"
import { LeaderboardModule, LeaderboardModuleProps } from "./module"
import { LeaderboardTranslation, LeaderboardTranslations } from "./translations"

export * from "../types/leaderboard"

type LeaderboardProps = {
	leaderboard: LeaderboardRow[]
	translations: Partial<LeaderboardTranslation>
}

export function LeaderboardListComponent(props: LeaderboardProps) {
	const { translations, ...restprops } = props
	return (
		<WrapperComponent>
			<LeaderboardList {...restprops} translations={{ ...LeaderboardTranslations, ...translations }} />
		</WrapperComponent>
	)
}

export function LeaderboardModuleComponent(props: LeaderboardModuleProps) {
	return (
		<WrapperComponent>
			<LeaderboardModule {...props} translations={{ ...LeaderboardTranslations, ...props.translations }} />
		</WrapperComponent>
	)
}
