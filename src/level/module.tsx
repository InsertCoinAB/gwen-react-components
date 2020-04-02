import React from "react"
import { ModuleWrapper, ModuleWrapperLeft, ModuleWrapperRight } from "../components/wrapper"
import { LevelAvatarData, LevelData, LevelLog, ModuleLevelUserBehaviorCooldownData, RewardIcons } from "../types"
import { Profile } from "./profile"
import { Status } from "./status"
import { LevelTranslation } from "./translations"

export interface LevelModuleProps {
	translations: LevelTranslation
	data?: LevelData
	log: LevelLog[]
	avatar?: LevelAvatarData
	cooldowns?: ModuleLevelUserBehaviorCooldownData[]
	selectAvatar?: () => void
	rewardIcons?: RewardIcons
	scale: number
}

export function LevelModule(props: LevelModuleProps) {
	return (
		<ModuleWrapper>
			<ModuleWrapperLeft>
				<Profile
					data={props.data}
					translations={props.translations}
					avatar={props.avatar}
					selectAvatar={props.selectAvatar}
					rewardIcons={props.rewardIcons}
					scale={props.scale}
				/>
			</ModuleWrapperLeft>
			<ModuleWrapperRight>
				<Status log={props.log} translations={props.translations} cooldowns={props.cooldowns} scale={props.scale} />
			</ModuleWrapperRight>
		</ModuleWrapper>
	)
}
