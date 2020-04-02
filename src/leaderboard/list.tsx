import React from "react"
import styled, { DefaultTheme } from "styled-components"
import { Placement } from "../icons/leaderboard/placement"
import { LeaderboardRow } from "../types"
import { LeaderboardTranslation } from "./translations"

type Props = {
	leaderboard?: LeaderboardRow[]
	translations: LeaderboardTranslation
}
export class LeaderboardList extends React.PureComponent<Props> {
	parseScore(num: number) {
		let newNum: string = num ? num.toString() : "-"
		if (num > 100000) {
			newNum = `${(Math.round(num / 1000) * 1000).toString().slice(0, num.toString().length - 3)}k`
		}
		return newNum
	}

	render() {
		return (
			<Wrapper>
				{this.props.leaderboard && (
					<>
						<Podium>
							<SpotWrapper data-cy="leaderboard-podium-spot">
								{this.props.leaderboard[1] && (
									<>
										<PodiumName height={1.5}>{this.props.leaderboard[1].nickname}</PodiumName>
										<PodiumScore height={1.5}>{this.parseScore(this.props.leaderboard[1].score)}</PodiumScore>
									</>
								)}
								<PodiumBar height={1.5}>
									<Placement placement={2} />
								</PodiumBar>
							</SpotWrapper>
							<SpotWrapper data-cy="leaderboard-podium-spot">
								{this.props.leaderboard[0] ? (
									<>
										<PodiumName height={2}>{this.props.leaderboard[0].nickname}</PodiumName>
										<PodiumScore height={2}>{this.parseScore(this.props.leaderboard[0].score)}</PodiumScore>
									</>
								) : (
									<PodiumWarning height={2}>{this.props.translations.noHighscore}</PodiumWarning>
								)}
								<PodiumBar height={2}>
									<Placement placement={1} />
								</PodiumBar>
							</SpotWrapper>
							<SpotWrapper data-cy="leaderboard-podium-spot">
								{this.props.leaderboard[2] && (
									<>
										<PodiumName height={1}>{this.props.leaderboard[2].nickname}</PodiumName>
										<PodiumScore height={1}>{this.parseScore(this.props.leaderboard[2].score)}</PodiumScore>
									</>
								)}
								<PodiumBar height={1}>
									<Placement placement={3} />
								</PodiumBar>
							</SpotWrapper>
						</Podium>
						<List>
							<LeaderboardHeader>
								<HeaderPlacement>#</HeaderPlacement>
								<HeaderName>{this.props.translations.nickname}</HeaderName>
								<HeaderPoints>{this.props.translations.score}</HeaderPoints>
							</LeaderboardHeader>
							{this.props.leaderboard.slice(3, 10).map((p, index) => {
								return (
									/* eslint-disable-next-line react/no-array-index-key */
									<ListItem key={index} data-cy="leaderboard-item">
										<ItemPlacement>{index + 4}</ItemPlacement>
										<ItemName>{p.nickname}</ItemName>
										<ItemPoints>{this.parseScore(p.score)}</ItemPoints>
									</ListItem>
								)
							})}
						</List>
					</>
				)}
			</Wrapper>
		)
	}
}

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	background: ${(p) => p.theme.gwen.colors.background.default};
`
interface PodiumProps {
	theme: DefaultTheme
	height: number
	animateInput?: boolean
}

const Podium = styled.div`
	width: 100%;
	height: ${(p) => p.theme.proportions(160)}px;
	display: flex;
	align-items: center;
`
const SpotWrapper = styled.div`
	position: relative;
	height: 100%;
	flex: 1;
`
const PodiumName = styled.h3`
	position: absolute;
	bottom: ${(p: PodiumProps) => p.height * p.theme.proportions(50) + p.theme.proportions(12)}px;
	text-align: center;
	width: 100%;
	font-size: ${(p) => p.theme.proportions(14)}px;
`
const PodiumWarning = styled(PodiumName)`
	text-transform: uppercase;
`
const PodiumScore = styled.span`
	position: absolute;
	left: 0;
	bottom: ${(p: PodiumProps) => p.height * p.theme.proportions(50) + p.theme.proportions(6)}px;
	text-align: center;
	width: 100%;
`
const PodiumBar = styled.div`
	position: absolute;
	bottom: 0;
	left: ${(p) => `calc(50% - ${p.theme.proportions(20)}px)`};
	width: ${(p) => p.theme.proportions(40)}px;
	height: ${(p: PodiumProps) => p.height * p.theme.proportions(50)}px;
	padding: ${(p) => p.theme.proportions(8)}px;

	font-size: ${(p) => p.theme.proportions(20)}px;
	background: ${(p) => p.theme.gwen.colors.background.podium};
	color: ${(p) => p.theme.gwen.colors.text.success};
	> img {
		width: 70%;
	}
	text-align: center;
`
const List = styled.div`
	width: 100%;
	height: ${(p) => p.theme.proportions(300)}px;
	border-top: ${(p) => p.theme.gwen.border.default(p.theme.scale)};
`

const LeaderboardHeader = styled.div`
	display: flex;
	height: calc(100% / 8);
	line-height: ${(p) => p.theme.proportions(35)}px;
	width: 100%;
	border-bottom: ${(p) => p.theme.gwen.border.default(p.theme.scale)};
	background: ${(p) => p.theme.gwen.colors.background.header};
	color: ${(p) => p.theme.gwen.colors.text.secondary};
`
const HeaderPlacement = styled.div`
	width: 10%;
	padding-left: ${(p) => p.theme.proportions(20)}px;
`
const HeaderName = styled.div`
	width: 60%;
	text-align: left;
	padding: 0 ${(p) => p.theme.proportions(8)}px;
`

const HeaderPoints = styled.div`
	width: 30%;
	text-align: right;
	padding-right: ${(p) => p.theme.proportions(20)}px;
`

const ListItem = styled(LeaderboardHeader)`
	background: transparent;
	color: ${(p) => p.theme.gwen.colors.text.primary};
	border: none;
	&:nth-child(2n + 1) {
		background: rgba(0, 0, 0, 0.05);
	}
`
const ItemPlacement = styled(HeaderPlacement)``
const ItemName = styled(HeaderName)`
	background: rgba(0, 0, 0, 0.025);
`
const ItemPoints = styled(HeaderPoints)``
