import React from "react"
import styled from "styled-components"
import { ModuleWrapper, ModuleWrapperLeft, ModuleWrapperRight } from "../components/wrapper"
import { MissionData, MissionThemeData, RewardIcons } from "../types"
import { MissionDetails } from "./details"
import { MissionMap } from "./map"
import { MissionTranslation } from "./translations"

export interface MissionModuleProps {
	translations: MissionTranslation
	current?: number
	mission?: MissionData
	themes: MissionThemeData[]
	select?: (mission: number) => void
	rewardIcons?: RewardIcons
	scale: number
}

export function MissionModule(props: MissionModuleProps) {
	return (
		<ModuleWrapper>
			<ModuleWrapperLeft
				title={
					<>
						{props.translations.mission}: <MissionNumber data-cy="mission-number">{props.mission?.missionNumber}</MissionNumber>
					</>
				}
			>
				{props.mission && <MissionDetails mission={props.mission} translations={props.translations} rewardIcons={props.rewardIcons} />}
			</ModuleWrapperLeft>
			<ModuleWrapperRight>
				<MissionMap themes={props.themes} select={props.select} current={props.current} />
			</ModuleWrapperRight>
		</ModuleWrapper>
	)
}

const MissionNumber = styled.span`
	color: ${(p) => p.theme.gwen.colors.primary};
`
