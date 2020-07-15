import React, { PureComponent } from "react"
import styled from "styled-components"
import { dateDHMS, ModuleLevelUserBehaviorCooldownData, SECOND_MS } from "../types"

interface Props {
	data: ModuleLevelUserBehaviorCooldownData
	onTimeout: (behaviorName: string) => void
}

interface State {
	cooldown: number
}

export class CooldownLogItem extends PureComponent<Props, State> {
	state: State = {
		cooldown: this.props.data.cooldownInMS - Date.now() + new Date(this.props.data.lastReportedAt).getTime(),
	}

	interval: number

	constructor(props: Props) {
		super(props)

		this.interval = setInterval(() => {
			const cooldown = props.data.cooldownInMS - Date.now() + new Date(props.data.lastReportedAt).getTime()
			if (cooldown <= 0) {
				clearInterval(this.interval)
				this.props.onTimeout(props.data.behaviorName)
			} else {
				this.setState({ cooldown })
			}
		}, SECOND_MS)
	}

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillReceiveProps(props: Props) {
		clearInterval(this.interval)
		this.interval = setInterval(() => {
			const cooldown = props.data.cooldownInMS - Date.now() + new Date(props.data.lastReportedAt).getTime()
			if (cooldown <= 0) {
				clearInterval(this.interval)
				this.props.onTimeout(props.data.behaviorName)
			} else {
				this.setState({ cooldown })
			}
		}, SECOND_MS)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<CooldownLogWrapper>
				<CooldownTitle>{this.props.data.behaviorName}</CooldownTitle>
				<CooldownTime>{dateDHMS(this.state.cooldown)}</CooldownTime>
			</CooldownLogWrapper>
		)
	}
}

const CooldownLogWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	background: ${(p) => p.theme.gwen.colors.background.header};
	margin: ${(p) => p.theme.proportions(10)}px;
	padding: ${(p) => p.theme.proportions(8)}px ${(p) => p.theme.proportions(12)}px;
	box-shadow: ${(p) => p.theme.gwen.boxShadow.default(p.theme.scale)};
`

const CooldownTitle = styled.div`
	font-size: ${(p) => p.theme.proportions(15)}px;
	font-weight: bold;
`

const CooldownTime = styled.div`
	color: ${(p) => p.theme.gwen.colors.text.secondary};
`
