import React from "react"
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ScrollParams } from "react-virtualized"
import styled from "styled-components"
import { ScrollArrows } from "../components/scroll-arrows"
import { ModuleLevelUserBehaviorCooldownData } from "../types"
import { CooldownLogItem } from "./cooldown-log-item"

interface Props {
	cooldowns: ModuleLevelUserBehaviorCooldownData[]
}

interface State {
	scrollParams?: ScrollParams
	cooldowns: ModuleLevelUserBehaviorCooldownData[]
}

export class CooldownLog extends React.PureComponent<Props, State> {
	state: State = { cooldowns: this.props.cooldowns.filter((c) => new Date(c.lastReportedAt).getTime() > Date.now() - c.cooldownInMS) }

	deleteItem(behaviorName: string) {
		this.setState((prevState: Readonly<State>) => {
			return { ...prevState, cooldowns: prevState.cooldowns.filter((cd) => cd.behaviorName !== behaviorName) }
		})
	}

	render() {
		const cache = new CellMeasurerCache({ fixedHeight: true, fixedWidth: true })
		const { cooldowns } = this.state
		return (
			<Wrapper>
				<ScrollArrows {...this.state.scrollParams} />
				<AutoSizer>
					{({ height, width }) => (
						<List
							style={{ outline: "none", overflowY: "scroll", paddingRight: "20px" }}
							containerStyle={{ width: `${width}px`, transition: "0.2s ease-in-out" }}
							height={height}
							width={width + 20}
							rowCount={cooldowns.length}
							rowHeight={(item) => (item.index === cooldowns.length - 1 ? 50 : 40)}
							onScroll={(scrollParams: ScrollParams) => this.setState({ scrollParams })}
							rowRenderer={(item) => {
								const data = cooldowns[item.index]
								return (
									<CellMeasurer cache={cache} columnIndex={0} key={data.behaviorName} parent={item.parent} rowIndex={item.index}>
										<div style={{ ...item.style, transition: "0.2s ease-in-out" }}>
											<CooldownLogItem key={item.index} data={data} onTimeout={(behaviorName) => this.deleteItem(behaviorName)} />
										</div>
									</CellMeasurer>
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
`
