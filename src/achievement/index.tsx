import React from "react"
import { WrapperComponent } from "../theme"
import { AchievementData, RewardIcons } from "../types"
import { AchievementBox } from "./box"
import { DeprecatedAchievementBox } from "./box-deprecated"
import { AchievementDetails } from "./details"
import { AchievementModule } from "./module"
import { AchievementTiers } from "./tiers"
import { AchievementTranslation, AchievementTranslations } from "./translations"

interface BoxProps {
	data: AchievementData
	openDetails: (data: AchievementData) => void
}

export function AchievementBoxComponent(props: BoxProps) {
	return <AchievementBox {...props} />
}

interface DetailsProps {
	data: AchievementData
	translations: Partial<AchievementTranslation>
}

export function AchievementDetailsComponent(props: DetailsProps) {
	return <AchievementDetails {...props} />
}

interface ModuleProps {
	achievements?: AchievementData[]
	open?: (achievement: AchievementData) => void
	translations?: Partial<AchievementTranslation>
	scale?: number
}

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

interface DeprecatedBoxProps {
	achievement: AchievementData
	open?: (achievement: AchievementData) => void
	defails?: string
	scale?: number
}

export function DeprecatedAchievementBoxComponent(props: DeprecatedBoxProps) {
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
