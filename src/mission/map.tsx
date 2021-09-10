import React from "react"
import * as ReactDOM from "react-dom"
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ScrollParams } from "react-virtualized"
import styled from "styled-components"
import { ScrollArrows } from "../components/scroll-arrows"
import { MissionThemeData } from "../types"
import { easeInOut } from "../utils/animations/ease-in-out"
import { MissionMapTile } from "./map-tile"
import { Tiles } from "./tiles"

type Props = {
	current?: number
	themes: MissionThemeData[]
	select?: (mission: number) => void
}
interface State {
	current?: number
	selected?: number
	scrollParams?: ScrollParams
}

export class MissionMap extends React.PureComponent<Props, State> {
	state: State = { current: this.props.current }
	list: React.RefObject<List> = React.createRef()
	tiles?: Tiles

	getTiles() {
		if (this.props.themes && this.props.themes.length > 0) {
			this.tiles = this.tiles || new Tiles(this.props.themes)
			return this.tiles
		}
		return undefined
	}

	select(mission: number) {
		this.setState({ selected: mission })
		if (this.props.select) {
			this.props.select(mission)
		}
	}

	componentDidUpdate(prevProps: Readonly<Props>) {
		if (prevProps.current !== this.props.current) {
			this.animateAndOpenNext(this.props.current)
		}
	}

	private animateAndOpenNext(mission?: number) {
		if (this.list.current) {
			/* eslint-disable-next-line react/no-find-dom-node */
			const list = ReactDOM.findDOMNode(this.list.current) as Element
			if (list) {
				const scroll = list.getBoundingClientRect().width / 2
				this.setState({ current: mission }, () => {
					list.scrollTop += scroll
					easeInOut(list as HTMLElement, "scrollTop", 0)
				})
			}
		}
	}

	render() {
		const cache = new CellMeasurerCache({ fixedHeight: true, fixedWidth: true })
		const current = this.state.current || 1
		const tiles = this.getTiles()
		return (
			<Wrapper>
				<ScrollArrows {...this.state.scrollParams} />
				<AutoSizer>
					{({ height, width }) => (
						<List
							ref={this.list}
							style={{ outline: "none", overflowY: "scroll", paddingRight: "20px", userSelect: "none" }}
							containerStyle={{ width: `${width}px` }}
							height={height}
							rowHeight={width / 2}
							width={width + 20}
							rowCount={Math.max(current + 3, 6)}
							onScroll={(scrollParams: ScrollParams) => this.setState({ scrollParams })}
							overscanRowCount={10}
							rowRenderer={(item) => {
								const mission = Math.max(current + 2, 5) - item.index
								return (
									<CellMeasurer cache={cache} columnIndex={0} key={mission} parent={item.parent} rowIndex={item.index}>
										<div style={item.style}>
											<MissionMapTile
												current={mission === (this.state.selected || current)}
												mission={mission}
												disabled={mission > current}
												tiles={tiles}
												select={(m) => this.select(m)}
												height={width / 2}
											/>
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
	height: 100%;
	overflow: hidden;
`
