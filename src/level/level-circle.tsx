import React from "react"
import styled, { DefaultTheme } from "styled-components"
import { Edit } from "../icons/edit"
import { GwenTheme } from "../theme"
import { LevelAvatarData, LevelData } from "../types"
import { LevelBadge } from "./level-badge"
import { LevelTranslation } from "./translations"

type Props = {
	translations: LevelTranslation
	data?: LevelData
	size: number
	avatar?: LevelAvatarData
	badge?: boolean
	selectAvatar?: () => void
}
interface State {
	circleTransition?: "full" | "empty"
}
export class LevelCircle extends React.PureComponent<Props, State> {
	/* eslint-disable-next-line react/static-property-placement */
	static defaultProps: Partial<Props> = {
		badge: true,
	}
	state: State = { circleTransition: undefined }

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>) {
		if (nextProps.data && this.props.data && nextProps.data.levelUp && !this.props.data.levelUp) {
			this.setState({ circleTransition: "full" })
			setTimeout(() => this.setState({ circleTransition: "empty" }), 1000)
			setTimeout(() => this.setState({ circleTransition: undefined }), 2000)
		}
	}

	private perimeter(radius: number) {
		return Math.round(Math.PI * radius * 2)
	}

	progress() {
		if (!this.props.data) {
			return 0
		}
		const { level, currentXp, levelXp } = this.props.data
		return level && level > 0 ? (currentXp / levelXp) * 100 : 0
	}

	render() {
		const { translations } = this.props
		const radius = 40
		const missing = this.props.badge ? 0.12 : 0
		let progress = this.progress() / 100
		if (this.state.circleTransition) {
			progress = this.state.circleTransition === "full" ? 1 : 0
		}
		return (
			<LevelCircleWrapper size={this.props.size} badge={this.props.badge}>
				<LevelMeter width={`${this.props.size}px`} height={`${this.props.size}px`} viewBox="-50 -50 100 100">
					<defs>
						<linearGradient id="gradient" gradientTransform="rotate(45)">
							<stop
								offset="0%"
								stopColor={this.props.avatar && this.props.avatar.colors ? this.props.avatar.colors.shirt : GwenTheme.gwen.colors.text.primary}
							/>
							<stop
								offset="100%"
								stopColor={this.props.avatar && this.props.avatar.colors ? this.props.avatar.colors.background : GwenTheme.gwen.colors.text.primary}
							/>
						</linearGradient>
					</defs>
					<circle r={radius} fill="none" strokeWidth="20" stroke={GwenTheme.gwen.colors.inactive} />
					<circle
						transform={`rotate(${180 + missing * 180})`}
						r={radius}
						strokeWidth="20"
						stroke="url(#gradient)"
						fill="none"
						strokeDasharray={this.perimeter(radius)}
						strokeDashoffset={this.perimeter(radius) - progress * (1 - missing) * this.perimeter(radius)}
						style={{ transition: `stroke-dashoffset ${this.state.circleTransition !== "empty" ? 1 : 0}s ease-in-out` }}
					/>
				</LevelMeter>
				<LevelPicture size={this.props.size} src={this.props.avatar && this.props.avatar.url} />
				{this.props.badge && (
					<LevelBadgeWrapper size={this.props.size}>
						{this.props.data && this.props.data.level && <LevelBadge level={this.props.data.level} size={this.props.size} text={translations.level} />}
					</LevelBadgeWrapper>
				)}
				{this.props.selectAvatar && (
					<EditButton size={this.props.size} onClick={() => this.props.selectAvatar && this.props.selectAvatar()}>
						<Edit />
					</EditButton>
				)}
			</LevelCircleWrapper>
		)
	}
}

type SizeType = { size: number; theme: DefaultTheme }
const LevelCircleWrapper = styled.div`
	margin: auto;
	position: relative;
	border-radius: 100%;
	width: ${(p: SizeType) => p.size}px;
	height: ${(p: SizeType & { badge?: boolean }) => p.size * (p.badge ? 1.5 : 1)}px;
	z-index: 10;
`
const LevelPicture = styled.img`
	position: absolute;
	top: ${(p: SizeType) => p.size * 0.1}px;
	left: ${(p: SizeType) => p.size * 0.1}px;
	display: block;
	width: ${(p: SizeType) => p.size * 0.8}px;
	height: ${(p: SizeType) => p.size * 0.8}px;
	border-radius: 100%;
	border: ${(p: SizeType) => `${p.size * 0.05}px solid ${p.theme.gwen.colors.background.badge}`};
	box-shadow: ${(p) => p.theme.gwen.boxShadow.large(p.theme.scale)};
	overflow: hidden;
`
const LevelMeter = styled.svg`
	display: block;
	position: relative;
	top: 0;
	left: 0;
	padding: 0;
	transform: rotateZ(-90deg);
`

const LevelBadgeWrapper = styled.div`
	position: absolute;
	z-index: 1;
	top: ${(p: SizeType) => p.size * 0.57}px;
	left: 0;
	width: 100%;
	height: ${(p: SizeType) => p.size}px;
`
const EditButton = styled.div`
	position: absolute;
	top: -${(p: SizeType) => p.size * 0.1}px;
	right: -${(p: SizeType) => p.size * 0.19}px;
	cursor: pointer;
	padding: ${(p: SizeType) => p.size * 0.03}px ${(p: SizeType) => p.size * 0.03}px ${(p: SizeType) => p.size * 0.04}px ${(p: SizeType) => p.size * 0.04}px;
	height: ${(p: SizeType) => p.size * 0.19}px;
	width: ${(p: SizeType) => p.size * 0.19}px;
	border-radius: 100%;
	background: ${(p) => p.theme.gwen.colors.background.header};
	box-shadow: ${(p: SizeType) => p.size * 0.0125}px 0 ${(p: SizeType) => p.size * 0.03}px 0 ${(p) => p.theme.gwen.boxShadow.color};

	> svg {
		stroke: ${(p) => p.theme.gwen.colors.text.secondary};
		fill: ${(p) => p.theme.gwen.colors.text.secondary};
	}
	&:hover {
		background: ${(p) => p.theme.gwen.colors.text.primary};
		> svg {
			stroke: ${(p) => p.theme.gwen.colors.text.success};
			fill: ${(p) => p.theme.gwen.colors.text.success};
		}
	}
`
