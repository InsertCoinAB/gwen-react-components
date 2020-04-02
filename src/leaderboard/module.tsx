import React from "react"
import styled, { DefaultTheme } from "styled-components"
import { Input } from "../components/input"
import { Switch } from "../components/switch"
import { ModuleWrapper } from "../components/wrapper"
import { Edit } from "../icons/edit"
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
	updateNickname?: (nickname: string) => void
}
type State = {
	editing: boolean
	editingNickname?: string
}

export class LeaderboardModule extends React.PureComponent<LeaderboardModuleProps, State> {
	state: State = { editing: false }

	render() {
		const { active, columns, select, timespan, translations, updateNickname, currentUser, leaderboard } = this.props
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
							{updateNickname && (
								<PlayerName>
									<PlayerNameInput
										data-cy="leaderboard-input-edit"
										value={this.state.editingNickname}
										disabled={!this.state.editing}
										onChange={(event) => this.setState({ editingNickname: event.target.value })}
										placeholder={translations.anonymous}
									/>
									{this.state.editing ? (
										<EditButton data-cy="leaderboard-button-save" onClick={() => updateNickname(this.state.editingNickname || "")}>
											<img src="https://gwen.insertcoin.se/widget/images/icons/save.svg" alt="checkmark" />
										</EditButton>
									) : (
										<EditButton data-cy="leaderboard-button-edit" onClick={() => this.setState({ editing: true })}>
											<Edit />
										</EditButton>
									)}
									<span data-cy="leaderboard-current-user-score">{currentUser?.score ?? 0}</span>
								</PlayerName>
							)}
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

const PlayerName = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: ${(p) => p.theme.proportions(40)}px;
	padding: 0 ${(p) => p.theme.proportions(8)}px;
	border: ${(p) => p.theme.gwen.border.textInput(p.theme.scale)};
	background: ${(p) => p.theme.gwen.colors.background.header};
	margin: 0 ${(p) => p.theme.proportions(12)}px 0 ${(p) => p.theme.proportions(20)}px;
	flex: 1;
	> span {
		flex: 2;
		padding-left: 10px;
		text-align: center;
		border-left: ${(p) => p.theme.gwen.border.textInput(p.theme.scale)};
		line-height: ${(p) => p.theme.proportions(40)}px;
	}
`

const EditButton = styled.div`
	height: ${(p) => p.theme.proportions(40)}px;
	width: ${(p) => p.theme.proportions(40)}px;
	padding: ${(p) => p.theme.proportions(10)}px;
	cursor: pointer;
	> svg {
		stroke: ${(p) => p.theme.gwen.colors.text.secondary};
		fill: ${(p) => p.theme.gwen.colors.text.secondary};
	}

	&:hover {
		> svg {
			stroke: ${(p) => p.theme.gwen.colors.text.primary};
			fill: ${(p) => p.theme.gwen.colors.text.primary};
		}
	}
`

const PlayerNameInput = styled(Input)``

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
