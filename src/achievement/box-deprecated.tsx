import React from "react"
import styled, { DefaultTheme } from "styled-components"
import { Button } from "../components/button"
import { ProgressBar } from "../components/progress-bar"
import { Check } from "../icons/check"
import { AchievementData } from "../types"
import { getAchievementIcon } from "./icon"
import { AchievementTranslations } from "./translations"

interface Props {
	achievement?: AchievementData
	open?: (achievement: AchievementData) => void
	details?: string
	scale?: number
}

export class DeprecatedAchievementBox extends React.PureComponent<Props> {
	open() {
		if (this.props.open && this.props.achievement) {
			this.props.open(this.props.achievement)
		}
	}

	render() {
		const { achievement } = this.props
		const tier = achievement && achievement.tiers.find((a, index) => !a.completed || index === achievement.tiers.length - 1)
		return (
			<AchievementWrapper data-cy={`achievement-wrapper-${tier && tier.completed ? "completed" : "incompleted"}`} active={!!(achievement && tier)}>
				{achievement && tier && (
					<>
						<Title>{achievement.title}</Title>
						<Icon src={getAchievementIcon(tier.icon)} />
						{tier.completed && (
							<AchievementCheck data-cy="achievement-checkmark">
								<Checkmark />
							</AchievementCheck>
						)}
						<ProgressWrapper>
							<ProgressBar completed={tier.progress} amount={tier.amount} />
						</ProgressWrapper>
						<Button widthFactor={142} heightFactor={30} onClick={() => this.open()}>
							{this.props.details || AchievementTranslations.details}
						</Button>
					</>
				)}
			</AchievementWrapper>
		)
	}
}

type AchievementWrapperProps = { active?: boolean; theme: DefaultTheme }
const AchievementWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-bottom: ${(p: AchievementWrapperProps) => p.theme.proportions(8)}px;
	flex: 1;
	background: ${(p: AchievementWrapperProps) => p.theme.gwen.colors.background.default};
	box-shadow: ${(p: AchievementWrapperProps) => (p.active ? p.theme.gwen.boxShadow.default(p.theme.scale) : "")};
	overflow: hidden;
`

const Title = styled.div`
	height: ${(props) => props.theme.proportions(36)}px;
	padding: 0 ${(props) => props.theme.proportions(8)}px;
	background: ${(props) => props.theme.gwen.colors.background.header};
	font-size: ${(props) => props.theme.proportions(18)}px;
	line-height: ${(props) => props.theme.proportions(36)}px;
	font-weight: bold;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-bottom: ${(props) => props.theme.proportions(10)}px;
	border-bottom: ${(props) => props.theme.gwen.border.default(props.theme.scale)};
	text-align: center;
`
const Icon = styled.img`
	height: ${(props) => props.theme.proportions(65)}px;
	width: ${(props) => props.theme.proportions(65)}px;
	margin: 0 auto ${(props) => props.theme.proportions(10)}px;
`
const AchievementCheck = styled.div`
	position: absolute;
	top: ${(props) => props.theme.proportions(45)}px;
	right: ${(props) => props.theme.proportions(10)}px;
	width: ${(props) => props.theme.proportions(35)}px;
	height: ${(props) => props.theme.proportions(35)}px;
	background: ${(props) => props.theme.gwen.colors.background.header};
	font-size: ${(props) => props.theme.proportions(25)}px;
	padding: ${(props) => props.theme.proportions(4)}px;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: ${(props) => props.theme.gwen.boxShadow.default(props.theme.scale)};
	img {
		width: 100%;
		height: auto;
	}
`

const ProgressWrapper = styled.div`
	padding: 0 ${(p) => p.theme.proportions(10)}px ${(p) => p.theme.proportions(10)}px;
`

const Checkmark = styled(Check)`
	path {
		fill: ${(p) => p.theme.gwen.colors.success};
	}
`
