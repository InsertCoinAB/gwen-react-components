import React from "react"
import { WrapperComponent } from "../theme"
import { MissionThemeData } from "../types"
import { MissionMap } from "./map"
import { MissionModule, MissionModuleProps } from "./module"
import { MissionTranslations } from "./translations"

type MissionMapComponentProps = {
	current?: number
	themes: MissionThemeData[]
	select?: (mission: number) => void
}

export function MissionMapComponent(props: MissionMapComponentProps) {
	return (
		<WrapperComponent>
			<MissionMap {...props} />
		</WrapperComponent>
	)
}

export function MissionModuleComponent(props: MissionModuleProps) {
	return (
		<WrapperComponent scale={props.scale}>
			<MissionModule {...props} translations={{ ...MissionTranslations, ...props.translations }} />
		</WrapperComponent>
	)
}
