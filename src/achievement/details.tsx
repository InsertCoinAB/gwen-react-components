import React from "react"
import styled from "styled-components"
import { ChevronDown } from "../icons/chevron-down"
import { AchievementData } from "../types"
import { AchievementProgress } from "./components/achievement-progress"
import { Rewards } from "./components/rewards"
import { getAchievementIcon } from "./icon"
import { AchievementTranslation } from "./translations"

interface Props {
	data: AchievementData
	translations: Partial<AchievementTranslation>
}

interface State {
	activeTierIndex: number
}

export class AchievementDetails extends React.PureComponent<Props, State> {
	state: State = (() => {
		const { tiers } = this.props.data
		const index = tiers.findIndex((t) => !t.completed)
		return { activeTierIndex: index === -1 ? tiers.length - 1 : index }
	})()

	render() {
		const { data, translations } = this.props
		console.log("data", data)
		const { activeTierIndex } = this.state
		console.log("activeTierIndex", activeTierIndex)
		const activeTier = data.tiers[activeTierIndex]

		return (
			<Wrapper>
				<Title>{activeTier.title}</Title>
				<TierSwitcher>
					<TierSwitcherArrow
						direction="left"
						active={activeTierIndex > 0}
						onClick={() => (activeTierIndex > 0 ? this.setState((prevState) => ({ activeTierIndex: prevState.activeTierIndex - 1 })) : {})}
					>
						<ChevronDown />
					</TierSwitcherArrow>
					<Icon>
						<img src={getAchievementIcon(activeTier.icon)} alt="achievement-icon" />
					</Icon>
					<TierSwitcherArrow
						direction="right"
						active={activeTierIndex < data.tiers.length - 1}
						onClick={() => (activeTierIndex < data.tiers.length - 1 ? this.setState((prevState) => ({ activeTierIndex: prevState.activeTierIndex + 1 })) : {})}
					>
						<ChevronDown />
					</TierSwitcherArrow>
				</TierSwitcher>
				<ProgressLabel>{`${activeTier.progress} / ${activeTier.amount}`}</ProgressLabel>
				<ProgressWrapper>
					<AchievementProgress tier={activeTier} />
				</ProgressWrapper>
				<Description>{activeTier.description}</Description>
				{activeTier.rewards.length > 0 && (
					<RewardWrapper>
						<Rewards rewards={activeTier.rewards} rewardTranslation={translations.rewards} />
					</RewardWrapper>
				)}
			</Wrapper>
		)
	}
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
`

const Title = styled.span`
	font-size: 16px;
	font-weight: 600;
`

const TierSwitcher = styled.div`
	height: 25%;
	display: flex;
	flex-direction: row;
	padding: 10px;
	align-items: center;
	justify-content: space-between;
`

interface ArrowProps {
	direction: "left" | "right"
	active: boolean
}

const TierSwitcherArrow = styled.div`
	height: 40%;
	width: 20%;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: ${(props: ArrowProps) => (props.active ? 1 : 0)};
	transform: rotate(${(props: ArrowProps) => (props.direction === "left" ? 90 : -90)}deg);
	transition: transform 0.2s ease-in-out;
	&:hover {
		cursor: ${(props: ArrowProps) => (props.active ? "pointer" : "default")};
		transform: rotate(${(props: ArrowProps) => (props.direction === "left" ? 90 : -90)}deg) scale(1.2);
	}
`

const Icon = styled.div`
	height: 100%;
	flex: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	> img {
		height: 80%;
		object-fit: contain;
	}
`

const ProgressLabel = styled.span`
	font-size: 14px;
`

const ProgressWrapper = styled.div`
	width: 60%;
	display: flex;
	flex-direction: row;
`

const Description = styled.div`
	margin: 15px 0;
	font-size: 16px;
	width: 80%;
	height: 20%;
	text-align: center;
`

const RewardWrapper = styled.div`
	width: 60%;
	height: 20%;
	margin-top: 10px;
`
