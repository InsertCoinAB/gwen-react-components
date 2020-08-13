import React from "react"
import styled, { DefaultTheme } from "styled-components"
import { Switch } from "../components/switch"
import { ModuleWrapper } from "../components/wrapper"
import { LeaderboardRow } from "../types"
import { LeaderboardUserColumn } from "./column"
import { LeaderboardList } from "./list"
import { Tabs } from "./tabs"
import { LeaderboardTranslation } from "./translations"

export interface LeaderboardModuleProps {
	columns: LeaderboardUserColumn[]
	active: LeaderboardUserColumn
	leaderboard?: LeaderboardRow[]
	currentUser?: LeaderboardRow
	translations: LeaderboardTranslation
	timespan: "alltime" | "weekly"
	select: (column: string, timespan: "alltime" | "weekly") => void
}

export class LeaderboardModule extends React.PureComponent<LeaderboardModuleProps> {
	render() {
		const { active, columns, select, timespan, translations, currentUser, leaderboard } = this.props
		return (
			<ModuleWrapper>
				<Wrapper>
					<TopWrapper>
						<Tabs
							items={columns.map((column) => ({ text: translations[column], value: column }))}
							value={active}
							onChange={(column) => select(column, timespan)}
						/>
						<LeaderboardList leaderboard={leaderboard} translations={translations} />
					</TopWrapper>
					<BottomWrapper>
						<PlayerScoreWrapper>
							<b>{translations.myScore}:</b>
							<PlayerName2>{currentUser?.nickname ?? "Anonymous"}</PlayerName2>
							<PlayerPoints2 data-cy="leaderboard-current-user-score">{currentUser?.score ?? 0}</PlayerPoints2>
						</PlayerScoreWrapper>
						<TimeToggle>
							<TimeToggleTitleLeft active={timespan === "alltime"}>{translations.alltime}</TimeToggleTitleLeft>
							<Switch onChange={() => select(active, timespan === "alltime" ? "weekly" : "alltime")} value={timespan !== "alltime"} />
							<TimeToggleTitleRight active={timespan === "weekly"}>{translations.weekly}</TimeToggleTitleRight>
						</TimeToggle>
					</BottomWrapper>
				</Wrapper>
			</ModuleWrapper>
		)
	}
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const TopWrapper = styled.div`
	width: 100%;
	box-shadow: ${(p) => p.theme.gwen.boxShadow.default(p.theme.scale)};
	margin-bottom: ${(p) => p.theme.proportions(8)}px;
`

const BottomWrapper = styled.div`
	flex: 1;
	box-shadow: ${(p) => p.theme.gwen.boxShadow.large(p.theme.scale)};
`

const PlayerScoreWrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: ${(p) => p.theme.proportions(73)}px;
	padding: ${(p) => p.theme.proportions(8)}px;
	background: ${(p) => p.theme.gwen.colors.background.header};
	border-bottom: ${(p) => p.theme.gwen.border.default(p.theme.scale)};
	> b {
		color: ${(p) => p.theme.gwen.colors.text.secondary};
		margin-left: ${(p) => p.theme.proportions(12)}px;
	}
`

const TimeToggle = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	height: ${(p) => p.theme.proportions(40)}px;
	width: 100%;
	background: ${(p) => p.theme.gwen.colors.background.header};
`

interface ToggleTitleProps {
	theme: DefaultTheme
	active: boolean
}
const TimeToggleTitle = styled.div`
	position: absolute;
	display: inline-block;
	top: 0;
	line-height: ${(p) => p.theme.proportions(40)}px;
	color: ${(p: ToggleTitleProps) => (p.active ? p.theme.gwen.colors.text.primary : p.theme.gwen.colors.text.secondary)};
	font-weight: 600;
`
const TimeToggleTitleLeft = styled(TimeToggleTitle)`
	right: 57%;
`
const TimeToggleTitleRight = styled(TimeToggleTitle)`
	left: 57%;
`

const PlayerName2 = styled.div`
	width: 50%;
	text-align: left;
	padding: 0 ${(p) => p.theme.proportions(8)}px;
`

const PlayerPoints2 = styled.div`
	width: 30%;
	text-align: right;
`
