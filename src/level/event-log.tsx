import React from "react"
import { AutoSizer, Index, List, ScrollParams } from "react-virtualized"
import styled, { DefaultTheme } from "styled-components"
import { ScrollArrows } from "../components/scroll-arrows"
import { LevelLog, ModuleType } from "../types"

type Props = {
	log: LevelLog[]
	navigate?: (module: string) => void
	scale: number
}
interface State {
	scrollParams?: ScrollParams
}

export class EventLog extends React.Component<Props, State> {
	state: State = {}
	list: React.RefObject<List> = React.createRef()
	open: Map<number, boolean> = new Map()

	componentDidUpdate() {
		if (this.list.current) {
			this.list.current.recomputeRowHeights()
		}
	}

	getModule(log: LevelLog): ModuleType | undefined {
		if (log.type === "GWEN_LEVEL_UP") {
			return "level"
		}
		if (log.type === "GWEN_MISSION_COMPLETE") {
			return "mission"
		}
		if (log.type === "GWEN_ACHIEVEMENT_COMPLETE") {
			return "achievement"
		}
		return undefined
	}

	getRowHeight(item: Index) {
		let height = 62
		if (this.open.get(item.index)) {
			height = this.getModule(this.props.log[item.index]) ? 154 : 94
		}
		height += +item.index === this.props.log.length - 1 ? 10 : 0
		return height
	}

	render() {
		return (
			<Wrapper>
				<ScrollArrows {...this.state.scrollParams} />
				<AutoSizer>
					{({ height, width }) => (
						<List
							style={{ outline: "none", overflowY: "scroll", paddingRight: "20px" }}
							containerStyle={{ width: `${width}px`, transition: "0.2s ease-in-out" }}
							ref={this.list}
							height={height}
							width={width + 20}
							rowCount={this.props.log.length}
							rowHeight={(item) => this.getRowHeight(item) * this.props.scale}
							onScroll={(scrollParams: ScrollParams) => this.setState({ scrollParams })}
							rowRenderer={(item) => {
								const log = this.props.log[item.index]
								const module = this.getModule(log)
								return (
									<div key={item.index} style={{ ...item.style, transition: "0.2s ease-in-out" }}>
										<EventLogWrapper>
											<EventLogHeader>
												<span>{log.text}</span>
												<span>{`+${log.xp}XP`}</span>
											</EventLogHeader>
											<EventLogBody expanded={!!this.open.get(item.index)} button={!!module}>
												<EventLogBodyDate>{new Date(log.date).toLocaleString()}</EventLogBodyDate>
											</EventLogBody>
											<EventLogExpand
												expanded={!!this.open.get(item.index)}
												onClick={() => {
													if (!this.open.get(item.index)) {
														this.open.clear()
													}
													this.open.set(item.index, !this.open.get(item.index))
													if (this.list.current) {
														this.list.current.recomputeRowHeights()
													}
												}}
											>
												▾
											</EventLogExpand>
										</EventLogWrapper>
									</div>
								)
							}}
						/>
					)}
				</AutoSizer>
			</Wrapper>
		)
	}
}

const Wrapper = styled.div`
	position: relative;
	height: 100%;
	background: ${(p) => p.theme.gwen.colors.background.default};
`
const EventLogWrapper = styled.div`
	display: block;
	font-size: ${(p) => p.theme.proportions(15)}px;
	margin: ${(p) => p.theme.proportions(10)}px;
	box-shadow: ${(p) => p.theme.gwen.boxShadow.default(p.theme.scale)};
`
const EventLogHeader = styled.div`
	background: ${(p) => p.theme.gwen.colors.background.header};
	border-bottom: ${(p) => p.theme.proportions(1)}px solid ${(p) => p.theme.gwen.colors.divider};
	display: flex;
	padding: ${(p) => p.theme.proportions(8)}px ${(p) => p.theme.proportions(12)}px;
	line-height: ${(p) => p.theme.proportions(16)}px;
	span {
		flex: 1;
		&:nth-child(1) {
			font-weight: bold;
			text-align: left;
			flex: 3;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		&:nth-child(2) {
			text-align: right;
			color: ${(p) => p.theme.gwen.colors.text.secondary};
			flex: 1;
		}
	}
`
interface ExpandedType {
	theme: DefaultTheme
	expanded: boolean
	button?: boolean
}
const EventLogBody = styled.div`
	overflow: hidden;
	transition: 0.2s ease-in-out;
	height: ${(p: ExpandedType) => {
		if (p.expanded) {
			return p.theme.proportions(p.button ? 92 : 32)
		}
		return 0
	}}px;
	background: ${(p) => p.theme.gwen.colors.background.default};
	border-bottom: ${(p: ExpandedType) => (p.expanded ? p.theme.proportions(1) : 0)}px solid ${(p) => p.theme.gwen.colors.divider};
`
const EventLogBodyDate = styled.div`
	color: ${(p) => p.theme.gwen.colors.text.secondary};
	font-size: ${(p) => p.theme.proportions(14)}px;
	padding: ${(p) => p.theme.proportions(8)}px ${(p) => p.theme.proportions(12)}px;
	text-align: center;
`
const EventLogExpand = styled.div`
	height: ${(p: ExpandedType) => p.theme.proportions(20)}px;
	background: ${(p) => p.theme.gwen.colors.background.header};
	color: ${(p) => p.theme.gwen.colors.secondary};
	transform: ${(p: ExpandedType) => (p.expanded ? "rotate(180deg)" : "")};
	cursor: pointer;
	text-align: center;
`
