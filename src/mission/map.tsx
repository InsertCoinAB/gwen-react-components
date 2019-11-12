import React from "react"
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ScrollParams } from "react-virtualized"
import styled from "styled-components"
import { ScrollArrows } from "../components/scroll-arrows"
import { MissionThemeData } from "../types/mission"
import { MissionMapTile } from "./map-tile"
import { Tiles } from "./tiles"

type Props = {
	current?: number
	themes: MissionThemeData[]
	select?: (mission: number) => void
}
interface State {
	selected?: number
	scrollParams?: ScrollParams
}

const proportion = (n: number) => n
export class MissionMap extends React.PureComponent<Props, State> {
	state: State = {}
	list: React.RefObject<List> = React.createRef()
	tiles?: Tiles

	getTiles() {
		if (this.props.themes && this.props.themes.length > 0) {
			this.tiles = this.tiles || new Tiles(this.props.themes)
			return this.tiles
		}
		return null
	}

	render() {
		const cache = new CellMeasurerCache({ fixedHeight: true, fixedWidth: true })
		const current = this.props.current || 1
		const tiles = this.getTiles()
		return (
			tiles && (
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
								rowCount={Math.max(current + 4, 6)}
								onScroll={(scrollParams: ScrollParams) => this.setState({ scrollParams })}
								overscanRowCount={10}
								rowRenderer={(item) => {
									const mission = Math.max(current + 3, 5) - item.index
									return (
										<CellMeasurer cache={cache} columnIndex={0} key={item.index} parent={item.parent} rowIndex={item.index}>
											<div style={item.style}>
												<MissionMapTile
													current={mission === current}
													mission={mission}
													disabled={mission > current}
													tiles={tiles}
													select={this.props.select}
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
		)
	}
}

const Wrapper = styled.div`
	height: 100%;
	overflow: hidden;
`
