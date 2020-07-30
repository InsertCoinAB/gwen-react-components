import React from "react"
import styled from "styled-components"
import { StepIcon, StepShape } from "./step-icon"

export type ProgressCircleProps = {
	step: number
	progress: number
	avatar: string
	shape?: StepShape
	stroke?: { primary: string; background?: string }
	className?: string
}

type State = {
	step: number
	progress: number
	shape: StepShape
	stroke: { primary: string; background?: string }
	shine?: boolean
	shapeFade?: boolean
}

export class ProgressCircle extends React.PureComponent<ProgressCircleProps, State> {
	private RADIUS = 47.5
	private MISSING = 0.04
	state: State = {
		step: this.props.step || 0,
		progress: this.props.progress || 0,
		shape: this.props.shape || "circle",
		stroke: this.props.stroke || { primary: "#5cc580" },
	}
	/* eslint-disable-next-line react/static-property-placement */

	componentDidUpdate(prevProps: Readonly<ProgressCircleProps>) {
		if (this.props.progress !== prevProps.progress) {
			this.progressUpdate(prevProps)
		}
		if (this.props.shape !== prevProps.shape) {
			this.themeUpdate()
		}
	}

	themeUpdate() {
		setTimeout(() => this.setState({ shapeFade: true }), 1000)
		setTimeout(
			() => this.setState((prevState) => ({ shapeFade: false, shape: this.props.shape || prevState.shape, stroke: this.props.stroke || prevState.stroke })),
			1500,
		)
	}

	progressUpdate(prevProps: Readonly<ProgressCircleProps>) {
		if (this.props.progress > prevProps.progress) {
			this.setState({ step: this.props.step, progress: this.props.progress })
		} else {
			this.setState({ progress: 1 })
			setTimeout(() => this.setState({ step: this.props.step, progress: 0, shine: true }), 1000)
			setTimeout(() => this.setState({ progress: this.props.progress, shine: false }), 2000)
		}
	}

	private perimeter(radius: number) {
		return Math.round(Math.PI * radius * 2)
	}

	render() {
		const { avatar, className } = this.props as Required<ProgressCircleProps>
		const { step, progress, shape, shine, shapeFade, stroke } = this.state
		return (
			<Wrapper className={className}>
				<Circle shine={shine}>
					<ProgressMeter viewBox="-50 -50 100 100">
						<circle r={this.RADIUS} fill="none" strokeWidth={5} stroke={stroke?.background} style={{ transition: "stroke 1s ease-in-out" }} />
						<circle
							transform={`rotate(${90 + this.MISSING * 180})`}
							r={this.RADIUS}
							strokeWidth={5}
							stroke={stroke?.primary}
							fill="none"
							strokeLinecap="round"
							strokeDasharray={this.perimeter(this.RADIUS)}
							strokeDashoffset={this.perimeter(this.RADIUS) - progress * (1 - this.MISSING) * this.perimeter(this.RADIUS)}
							style={{ transition: `stroke-dashoffset ${progress === 0 ? 0 : 1}s ease-in-out, stroke 1s ease-in-out` }}
						/>
					</ProgressMeter>
					<ProgressImage src={avatar} alt="avatar" />
				</Circle>
				<StepWrapper shape={shape} fade={shapeFade}>
					<StepIcon step={step} shape={shape} />
				</StepWrapper>
			</Wrapper>
		)
	}
}

const Wrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
`
const Circle = styled.div`
	position: relative;
	border-radius: 100%;
	:after {
		content: "";
		position: absolute;
		top: -110%;
		left: -210%;
		width: 200%;
		height: 200%;
		opacity: 0;
		transform: rotate(45deg);
		background: rgba(255, 255, 255, 0);
		background: linear-gradient(
			to right,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0) 70%,
			rgba(255, 255, 255, 0.25) 77%,
			rgba(255, 255, 255, 0) 92%,
			rgba(255, 255, 255, 0) 100%
		);
		${(p: { shine?: boolean }) =>
			p.shine
				? `
		opacity: 1;
		top: -30%;
		left: -30%;
		transition-property: left, top, opacity;
		transition-duration: 0.7s, 0.7s, 0.15s;
		transition-timing-function: ease;
		`
				: ""}
	}
`
const ProgressMeter = styled.svg`
	display: block;
	width: 100%;
`
const ProgressImage = styled.img`
	position: absolute;
	top: 15%;
	left: 15%;
	display: block;
	width: 70%;
	height: 70%;
	object-fit: contain;
	border-radius: 20%;
	overflow: hidden;
`

interface StepIconProps {
	shape: StepShape
	fade?: boolean
}

const StepWrapper = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	bottom: -${(props: StepIconProps) => (props.shape === "shield" ? 20 : 15)}%;
	height: ${(props: StepIconProps) => (props.shape === "shield" ? 40 : 30)}%;
	opacity: ${(props: StepIconProps) => (props.fade ? 0 : 1)};
	transition: opacity 0.5s ease-in-out;
`
