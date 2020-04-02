import React from "react"
import { WrapperComponent } from "../theme"
import { LevelAvatarData, LevelData, LevelLog, ModuleLevelUserBehaviorCooldownData, RewardIcons } from "../types"
import { LevelBadge } from "./level-badge"
import { LevelCircle } from "./level-circle"
import { LevelModule } from "./module"
import { SelectAvatar } from "./select-avatar"
import { Status } from "./status"
import { LevelTranslation, LevelTranslations } from "./translations"

interface Props {
	data?: LevelData
	avatar?: LevelAvatarData
	log: LevelLog[]
	cooldowns?: ModuleLevelUserBehaviorCooldownData[]
	selectAvatar?: () => void
	translations?: Partial<LevelTranslation>
	scale?: number
}

export function LevelModuleComponent(props: Props & { rewardIcons: RewardIcons }) {
	const { translations, scale, ...restprops } = props
	return (
		<WrapperComponent scale={scale}>
			<LevelModule {...restprops} scale={scale || 1} translations={{ ...LevelTranslations, ...translations }} />
		</WrapperComponent>
	)
}

export function LevelProfileComponent(props: Omit<Props, "cooldowns" | "log"> & { badge?: boolean }) {
	const { translations, scale, ...restprops } = props
	return (
		<WrapperComponent scale={scale}>
			<LevelCircle size={(scale || 1) * 160} {...restprops} translations={{ ...LevelTranslations, ...translations }} />
		</WrapperComponent>
	)
}

export function LevelStatusComponent(props: Omit<Props, "data" | "selectAvatar">) {
	const { translations, scale, ...restprops } = props
	return (
		<WrapperComponent scale={scale}>
			<Status {...restprops} scale={scale || 1} translations={{ ...LevelTranslations, ...translations }} />
		</WrapperComponent>
	)
}

export interface LevelSelectAvatarProps {
	current?: string
	select: (avatar: LevelAvatarData) => void
	closeModal: () => void
	avatars: LevelAvatarData[]
	scale?: number
}

export function LevelSelectAvatarComponent(props: LevelSelectAvatarProps) {
	const { scale, ...restprops } = props
	return (
		<WrapperComponent scale={scale}>
			<SelectAvatar {...restprops} scale={scale || 1} />
		</WrapperComponent>
	)
}

export function LevelBadgeComponent(props: { level: number; text?: string; scale?: number }) {
	return (
		<WrapperComponent scale={props.scale}>
			<LevelBadge level={props.level} size={(props.scale || 1) * 160} text={props.text || LevelTranslations.level} />
		</WrapperComponent>
	)
}
