import React from "react"
import { TabsWrapper } from "../components/wrapper"
import { LevelLog, ModuleLevelUserBehaviorCooldownData } from "../types"
import { CooldownLog } from "./cooldown-log"
import { EventLog } from "./event-log"
import { LevelTranslation } from "./translations"

export interface StatusProps {
	translations: LevelTranslation
	log: LevelLog[]
	cooldowns?: ModuleLevelUserBehaviorCooldownData[]
	scale: number
}

export class Status extends React.PureComponent<StatusProps> {
	render() {
		const { translations, log, cooldowns, scale } = this.props
		return (
			<TabsWrapper
				elements={{
					events: { title: translations.eventLogTitle, content: <EventLog log={log} scale={scale} /> },
					...(this.props.cooldowns ? { cooldown: { title: translations.cooldownLogTitle, content: <CooldownLog cooldowns={cooldowns || []} /> } } : {}),
				}}
			/>
		)
	}
}
