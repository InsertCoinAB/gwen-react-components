import React from "react"
import styled from "styled-components"
import { Objective } from "../components/objective"
import { Rewards } from "../components/reward"
import { MissionData, RewardIcons } from "../types"
import { MissionTranslation } from "./translations"

type Props = {
	mission: MissionData
	translations: MissionTranslation
	rewardIcons?: RewardIcons
}

export class MissionDetails extends React.PureComponent<Props> {
	static cta(url: string) {
		window.location.href = url
	}

	render() {
		const { mission } = this.props
		return (
			<MissionDiv>
				<Title>{this.props.translations.objectives}:</Title>
				{mission.objectives.map((objective, key) => (
					/* eslint-disable-next-line react/no-array-index-key */
					<ObjectiveWrapper key={key}>
						<Objective {...objective} />
					</ObjectiveWrapper>
				))}
				<Rewards rewards={this.props.mission.rewards} translations={this.props.translations} icons={this.props.rewardIcons} />
			</MissionDiv>
		)
	}
}

const MissionDiv = styled.div`
	text-align: center;
`
const Title = styled.h4`
	line-height: ${(p) => p.theme.proportions(35)}px;
	font-size: ${(p) => p.theme.proportions(16)}px;
	font-weight: 400;
	border-bottom: ${(p) => p.theme.gwen.border.default(p.theme.scale)};
	margin: 0;
	margin-bottom: ${(p) => p.theme.proportions(8)}px;
	text-transform: uppercase;
`
const ObjectiveWrapper = styled.div`
	margin: ${(p) => p.theme.proportions(8)}px;
`
