import React from "react"
import styled from "styled-components"
import { CharacterProgressionTierData } from "../types"
import { StepIcon, StepShape } from "./step-icon"

interface Props {
	stepNumber: number
	tiers: CharacterProgressionTierData[]
	icon: StepShape
	color: string
	background: string
}

export const TieredProgressBar = (props: Props) => {
	const { stepNumber, icon, color, background } = props
	const tiers = props.tiers.filter((t) => typeof t.startStep === "number" && typeof t.endStep === "number")
	return (
		<Wrapper>
			<IconWrapper>
				<StepIcon step={stepNumber} shape={icon} />
			</IconWrapper>
			<Tiers>
				{tiers.map((t) => (
					<Tier
						progress={(() => {
							if (stepNumber < t.startStep) return 0
							if (stepNumber > (t.endStep as number)) return 1
							return (stepNumber - t.startStep) / ((t.endStep as number) - t.startStep)
						})()}
						color={color}
						background={background}
					/>
				))}
			</Tiers>
		</Wrapper>
	)
}
const Wrapper = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: row;
	position: relative;
	align-items: center;
`

const IconWrapper = styled.div`
	position: absolute;
	left: 0;
	height: 35px;
	width: 35px;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
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
			<TierFiller color={props.color || "#0DC979"} width={Math.floor(props.progress * 100)} />
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
	transition: width 0.5s ease-in-out;
`
