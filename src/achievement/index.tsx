import React from "react"
import { WrapperComponent } from "../theme"
import { AchievementData, RewardIcons } from "../types"
import { DeprecatedAchievementBox } from "./box-deprecated"
import { AchievementModule } from "./module"
import { AchievementTiers } from "./tiers"
import { AchievementTranslation, AchievementTranslations } from "./translations"

interface ModuleProps {
	achievements?: AchievementData[]
	open?: (achievement: AchievementData) => void
	translations?: Partial<AchievementTranslation>
	scale?: number
}

export * from "./box"
export * from "./details"

export function AchievementModuleComponent(props: ModuleProps) {
	const { translations, scale, achievements, ...restprops } = props
	return (
		<WrapperComponent scale={scale}>
			{achievements && (
				<AchievementModule {...restprops} achievements={achievements} scale={scale || 1} translations={{ ...AchievementTranslations, ...translations }} />
			)}
		</WrapperComponent>
	)
}

interface BoxProps {
	achievement: AchievementData
	open?: (achievement: AchievementData) => void
	defails?: string
	scale?: number
}

export function DeprecatedAchievementBoxComponent(props: BoxProps) {
	const { scale, ...restprops } = props
	return (
		<WrapperComponent scale={scale}>
			<DeprecatedAchievementBox {...restprops} />
		</WrapperComponent>
	)
}

interface TiersProps {
	achievement: AchievementData
	translations?: Partial<AchievementTranslation>
	rewardIcons?: RewardIcons
	scale?: number
}

export function AchievementTiersComponent(props: TiersProps) {
	const { translations, scale, ...restprops } = props
	return (
		<WrapperComponent scale={scale}>
			<AchievementTiers {...restprops} />
		</WrapperComponent>
	)
}
