import React from "react"
import styled, { DefaultTheme } from "styled-components"
import { SeedRandom } from "../utils/seed-random"
import { Tiles } from "./tiles"

interface Props {
	current: boolean
	mission: number
	disabled: boolean
	tiles?: Tiles
	select: (mission: number) => void
	height: number
}

export class MissionMapTile extends React.PureComponent<Props> {
	calculatePosition(mission: number) {
		const padding = 16
		const seed = new SeedRandom(mission)
		return mission === 0 ? 50 : seed.random() * (100 - padding * 2) + padding
	}

	render() {
		const size = this.props.height * 0.45
		const missionNumber = this.props.mission
		const start = this.calculatePosition(missionNumber)
		const end = this.calculatePosition(missionNumber + 1)

		const backgroundTile = this.props.tiles?.background(missionNumber)
		const foregroundTile = this.props.tiles?.foreground(missionNumber)
		return (
			<Wrapper>
				{backgroundTile && <BackgroundTile src={backgroundTile} />}
				{foregroundTile && <ForegroundTile src={foregroundTile} />}
				{missionNumber > 0 && (
					<>
						<MissionPath width="100%" height={`${this.props.height / 1.9}px`} viewBox="0 0 400 100" preserveAspectRatio="none">
							<path
								d={`M${start * 4} 110 C ${start * 4} 30, ${end * 4} 70, ${end * 4} -10`}
								stroke="#fff"
								strokeWidth="6"
								strokeDasharray="18 24"
								strokeLinecap="round"
								fill="transparent"
							/>
						</MissionPath>
						<Dot
							data-cy={`mission-select-${missionNumber}`}
							onClick={() => (!this.props.disabled && missionNumber ? this.props.select(missionNumber) : undefined)}
							size={size}
							current={this.props.current}
							disabled={this.props.disabled}
							style={{ marginLeft: `calc(${start}% - ${size / 2}px)` }}
						>
							{missionNumber}
						</Dot>
					</>
				)}
			</Wrapper>
		)
	}
}

const MissionPath = styled.svg`
	display: block;
	position: relative;
	z-index: 3;
	filter: ${(p) => `drop-shadow(0 2px 2px ${p.theme.gwen.boxShadow.color})`};
	overflow: visible;
`

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	background: lightgrey;
`

interface DotType {
	theme: DefaultTheme
	size: number
	disabled: boolean
	current: boolean
}
const Dot = styled.div`
	display: block;
	position: relative;
	z-index: 5;
	width: ${(props: DotType) => props.size}px;
	height: ${(props: DotType) => props.size}px;
	border-radius: 50%;
	background: ${(props: DotType) => {
		if (!props.disabled) {
			return props.current ? props.theme.gwen.colors.primary : "#545454"
		}
		return "#fff"
	}};
	margin: 0;
	text-align: center;
	font-weight: 700;
	font-size: ${(props: DotType) => props.size / 2.5}px;
	line-height: ${(props: DotType) => props.size}px;
	color: ${(props: DotType) => (!props.disabled ? "#fff" : "#545454")};
	box-shadow: ${(props: DotType) => props.theme.gwen.boxShadow.default(props.theme.scale)};
	cursor: ${(props: DotType) => (props.disabled ? "default" : "pointer")};
	${(props: DotType) => (!props.disabled ? `&:hover { background: ${props.theme.gwen.colors.primary}; color: #fff; }` : "")};
`
const Tile = styled.img`
	position: absolute;
	bottom: 0;
	left: -1%;
	pointer-events: none;
	width: 102%;
`
const ForegroundTile = styled(Tile)`
	z-index: 1;
`
const BackgroundTile = styled(Tile)`
	z-index: 0;
`
