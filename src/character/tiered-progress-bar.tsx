import React from "react"
import styled from "styled-components"
import { CharacterProgressionTierData } from "../types"
import { RequiredProps } from "../utils/type-extensions/required"
import { StepIcon, StepShape } from "./step-icon"

interface Props {
	stepNumber: number
	tiers: CharacterProgressionTierData[]
	icon: StepShape
	color: string
	background: string
}

interface State {
	icon: StepShape
	color: string
	background: string
	animation: boolean
}

export class TieredProgressBar extends React.PureComponent<Props, State> {
	state: State = {
		icon: this.props.icon,
		color: this.props.color,
		background: this.props.background,
		animation: false,
	}

	componentDidUpdate(prevProps: Props) {
		if (this.props.icon !== prevProps.icon) {
			this.themeUpdate()
		}
	}

	themeUpdate() {
		setTimeout(
			() =>
				this.setState((prevState) => ({
					animation: true,
					color: this.props.color || prevState.color,
					background: this.props.background || prevState.background,
				})),
			500,
		)
		setTimeout(
			() =>
				this.setState((prevState) => ({
					animation: false,
					icon: this.props.icon || prevState.icon,
				})),
			1000,
		)
	}

	render() {
		const { stepNumber } = this.props
		const { icon, color, background, animation } = this.state
		const tiers = this.props.tiers.filter((t) => typeof t.startStep === "number" && typeof t.endStep === "number") as Array<
			RequiredProps<CharacterProgressionTierData, "startStep" | "endStep">
		>

		return (
			<Wrapper data-cy="tiered-progress-bar">
				<IconWrapper animation={animation}>
					<StepIcon step={stepNumber} shape={icon} />
				</IconWrapper>
				<Tiers>
					{tiers.map((t) => (
						<Tier
							progress={(() => {
								if (stepNumber < t.startStep) return 0
								if (stepNumber > t.endStep) return 1
								return (stepNumber - t.startStep) / (t.endStep - t.startStep)
							})()}
							color={color}
							background={background}
						/>
					))}
				</Tiers>
			</Wrapper>
		)
	}
}
const Wrapper = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: row;
	position: relative;
	align-items: center;
`

interface IconProps {
	animation: boolean
}

const IconWrapper = styled.div`
	position: absolute;
	left: 0;
	height: 35px;
	width: 35px;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: ${(props: IconProps) => (props.animation ? 0 : 1)};
	transition: opacity 0.5s ease-in-out;
`

const Tiers = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;
	align-items: center;
`

interface TierProps {
	progress: number
	color?: string
	background?: string
}

const Tier = (props: TierProps) => {
	return (
		<TierWrapper color={props.background || "#C9C9C9"}>
			<TierFiller data-cy="tiered-progress-bar-fill" color={props.color || "#0DC979"} width={Math.floor(props.progress * 100)} />
		</TierWrapper>
	)
}

interface BackgroundProps {
	color: string
}

const TierWrapper = styled.div`
	background: ${(props: BackgroundProps) => props.color};
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	overflow: hidden;
	height: 10px;
	border-radius: 4px;
	flex: 1;
	transition: background 1s ease-in-out;
	&:not(:last-child) {
		margin-right: 5px;
	}
	&:first-child {
		margin-left: 10px;
	}
`

interface FillProps {
	color: string
	width: number
}

const TierFiller = styled.div`
	height: 100%;
	background: ${(props: FillProps) => props.color};
	width: ${(props: FillProps) => props.width}%;
	transition: width 0.5s ease-in-out, background 1s ease-in-out;
`
