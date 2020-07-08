import React from "react"
import styled from "styled-components"
import { StepIcon, StepShape } from "./step-icon"

interface Props {
	currentStepNumber: number
	currentStepProgress: number
	currentStepTotal: number
	maxStep?: number
	icon: StepShape
	progressColor?: string
	backgroundColor?: string
}

export const StepProgressBar = (props: Props) => {
	const { currentStepNumber, currentStepProgress, currentStepTotal, maxStep, progressColor, backgroundColor } = props
	return (
		<Wrapper>
			<IconWrapper>
				<StepIcon step={currentStepNumber} shape={props.icon} />
			</IconWrapper>
			<Steps>
				{(() => {
					if (!maxStep) return <Step color={progressColor} background={backgroundColor} progress={currentStepProgress / currentStepTotal} />
					const items: JSX.Element[] = []
					for (let i = 1; i <= maxStep; i++) {
						if (i < currentStepNumber) {
							items.push(<Step color={progressColor} background={backgroundColor} progress={1} />)
						} else if (i > currentStepNumber) {
							items.push(<Step color={progressColor} background={backgroundColor} progress={0} />)
						} else {
							items.push(<Step color={progressColor} background={backgroundColor} progress={currentStepProgress / currentStepTotal} />)
						}
					}
					return items
				})()}
			</Steps>
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
	z-index: 1;
`

const Steps = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;
	align-items: center;
`

interface StepProps {
	progress: number
	color?: string
	background?: string
}

const Step = (props: StepProps) => {
	return (
		<StepWrapper color={props.background || "#C9C9C9"}>
			<StepFiller color={props.color || "#0DC979"} width={Math.floor(props.progress * 100)} />
		</StepWrapper>
	)
}

interface BackgroundProps {
	color: string
}

const StepWrapper = styled.div`
	position: relative;
	background: ${(props: BackgroundProps) => props.color};
	display: flex;
	flex-direction: row;
	overflow: hidden;
	height: 10px;
	flex: 1;
	&:last-child {
		border-radius: 0 3px 3px 0;
	}
	&:first-child {
		margin-left: 10px;
	}
	margin-left: 5px;
`

interface FillProps {
	color: string
	width: number
}

const StepFiller = styled.div`
	position: absolute;
	left: 0;
	height: 10px;
	background: ${(props: FillProps) => props.color};
	width: ${(props: FillProps) => props.width}%;
	transition: width 1s linear;
`
