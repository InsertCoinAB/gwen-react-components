import React from "react"
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ScrollParams } from "react-virtualized"
import styled from "styled-components"
import { ScrollArrows } from "../components/scroll-arrows"
import { ModuleWrapperFull } from "../components/wrapper"
import { AchievementData } from "../types"
import { DeprecatedAchievementBox } from "./box-deprecated"
import { AchievementTranslation } from "./translations"

interface Props {
	achievements: AchievementData[]
	translations: AchievementTranslation
	open?: (achievement: AchievementData) => void
	scale: number
}
type State = { scrollParams?: ScrollParams }

export class AchievementModule extends React.PureComponent<Props, State> {
	state: State = {}

	open(achievement: AchievementData) {
		if (this.props.open) {
			this.props.open(achievement)
		}
	}

	render() {
		const cache = new CellMeasurerCache({ fixedHeight: true, fixedWidth: true })
		return (
			<ModuleWrapperFull>
				<>
					<ScrollArrows {...this.state.scrollParams} />
					<AutoSizer>
						{({ height, width }) => (
							<List
								style={{ outline: "none", overflowY: "scroll", paddingRight: "20px", userSelect: "none" }}
								containerStyle={{ width: `${width}px` }}
								height={height}
								width={width + 20}
								rowHeight={210 * this.props.scale}
								rowCount={Math.ceil(this.props.achievements.length / 3)}
								onScroll={(scrollParams: ScrollParams) => this.setState({ scrollParams })}
								rowRenderer={(item) => {
									const index = item.index * 3
									return (
										<CellMeasurer cache={cache} columnIndex={0} key={item.index} parent={item.parent} rowIndex={item.index}>
											<Wrapper style={{ ...item.style, display: "flex", flexDirection: "row", flexWrap: "wrap", padding: `${4 * this.props.scale}px` }}>
												<DeprecatedAchievementBox
													achievement={this.props.achievements[index]}
													details={this.props.translations.details}
													open={(a) => this.open(a)}
													scale={this.props.scale}
												/>
												<DeprecatedAchievementBox
													achievement={this.props.achievements[index + 1]}
													details={this.props.translations.details}
													open={(a) => this.open(a)}
													scale={this.props.scale}
												/>
												<DeprecatedAchievementBox
													achievement={this.props.achievements[index + 2]}
													details={this.props.translations.details}
													open={(a) => this.open(a)}
													scale={this.props.scale}
												/>
											</Wrapper>
										</CellMeasurer>
									)
								}}
							/>
						)}
					</AutoSizer>
				</>
			</ModuleWrapperFull>
		)
	}
}

const Wrapper = styled.div`
	> div {
		margin: ${(p) => p.theme.proportions(4)}px;
	}
`
