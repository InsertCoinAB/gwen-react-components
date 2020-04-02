import React from "react"
import styled from "styled-components"
import { ProgressBar } from "../components/progress-bar"
import { AchievementData, RewardIcons } from "../types"
import { getAchievementIcon } from "./icon"

interface Props {
	achievement: AchievementData
	rewardIcons?: RewardIcons
}
interface State {
	active: number
	selected: number
}
export class AchievementTiers extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)
		const selected = props.achievement ? props.achievement.tiers.findIndex((a, index) => !a.completed || index === props.achievement.tiers.length - 1) : 0
		this.state = { active: selected, selected }
	}

	render() {
		const { achievement } = this.props
		const { active, selected } = this.state
		const tier = achievement.tiers[selected]
		return (
			<Wrapper>
				<AchievementIcons>
					{this.props.achievement.tiers.map((t, index) => {
						return (
							/* eslint-disable-next-line react/no-array-index-key */
							<IconWrapper key={index} selected={index === selected} greyscale={index > active} onClick={() => this.setState({ selected: index })}>
								<img src={getAchievementIcon(t.icon)} alt="tier-icon" />
							</IconWrapper>
						)
					})}
				</AchievementIcons>
				<ProgressBar completed={tier.progress} amount={tier.amount} />
			</Wrapper>
		)
	}
}

const Wrapper = styled.div`
	text-align: center;
	position: relative;
`
const AchievementIcons = styled.div`
	text-align: center;
	margin-bottom: ${(p) => p.theme.proportions(25)}px;
	display: flex;
`
interface IconWrapperProps {
	selected: boolean
	greyscale: boolean
}
const IconWrapper = styled.div`
	flex: ${(p: IconWrapperProps) => (p.selected ? 2 : 1)};
	${(p: IconWrapperProps) => (p.greyscale ? "filter: grayscale(100%);" : "")}
	transition: 0.3s ease-in-out;
	border-right: ${(p) => p.theme.gwen.border.default(p.theme.scale)};
	:last-child {
		border-right: none;
	}
	img {
		display: inline-block;
		height: ${(p) => p.theme.proportions(80)}px;
		max-width: 100%;
		object-fit: contain;
		transition: 0.3s ease-in-out;
		padding: ${(p: IconWrapperProps) => (p.selected ? 0 : 10)}px;
	}
	&:hover {
		cursor: pointer;
	}
`
