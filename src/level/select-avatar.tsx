import React from "react"
import { AutoSizer, List, ScrollParams } from "react-virtualized"
import styled, { DefaultTheme } from "styled-components"
import { ScrollArrows } from "../components/scroll-arrows"
import { Check } from "../icons/check"
import { LevelAvatarData } from "../types"

export interface SelectAvatarProps {
	current?: string
	select: (avatar: LevelAvatarData) => void
	closeModal: () => void
	avatars: LevelAvatarData[]
	scale: number
}
interface State {
	scrollParams?: ScrollParams
}

export class SelectAvatar extends React.PureComponent<SelectAvatarProps, State> {
	state: State = {}

	render() {
		return (
			<>
				<ScrollArrows {...this.state.scrollParams} />
				<AutoSizer>
					{({ height, width }) => (
						<List
							style={{ outline: "none", overflowY: "scroll", paddingRight: "20px", userSelect: "none" }}
							containerStyle={{ width: `${width}px` }}
							height={height}
							width={width + 20}
							rowHeight={186 * this.props.scale}
							rowCount={Math.ceil(this.props.avatars.length / 2)}
							onScroll={(scrollParams: ScrollParams) => this.setState({ scrollParams })}
							rowRenderer={(item) => {
								const avatar = this.props.avatars[item.index * 2]
								const avatar2 = this.props.avatars[item.index * 2 + 1]
								return (
									<div
										key={item.index}
										style={{ ...item.style, padding: "15px", display: "flex", alignItems: "center", flexDirection: "column", flexWrap: "wrap" }}
									>
										<Avatar scale={this.props.scale} onClick={() => this.props.select(avatar)} className={avatar.id === this.props.current ? "selected" : ""}>
											<img src={avatar.url} alt="avatar" />
											{avatar.id === this.props.current && (
												<AvatarCheck>
													<Checkmark />
												</AvatarCheck>
											)}
										</Avatar>
										{avatar2 ? (
											<Avatar
												scale={this.props.scale}
												onClick={() => this.props.select(avatar2)}
												className={avatar2.id === this.props.current ? "selected" : ""}
											>
												<img src={avatar2.url} alt="avatar" />
												{avatar2.id === this.props.current && (
													<AvatarCheck>
														<Checkmark />
													</AvatarCheck>
												)}
											</Avatar>
										) : (
											<EmptyAvatar />
										)}
									</div>
								)
							}}
						/>
					)}
				</AutoSizer>
			</>
		)
	}
}

interface ScaleProps {
	scale: number
	theme: DefaultTheme
}

const Avatar = styled.div`
	position: relative;
	width: ${(p) => `calc(50% - ${p.theme.proportions(30)}px)`};
	max-width: ${(p) => p.theme.proportions(156)}px;
	height: ${(p) => p.theme.proportions(156)}px;

	border: ${(p) => p.theme.proportions(10)}px solid ${(p) => p.theme.gwen.colors.background.backdrop};
	border-radius: 100%;
	transition: 0.2s ease-in-out;
	cursor: pointer;
	box-shadow: ${(p: ScaleProps) => p.theme.gwen.boxShadow.default(p.scale)};
	margin: 0 ${(p) => p.theme.proportions(15)}px;
	img {
		display: block;
		border-radius: 100%;
		width: 100%;
	}
	&:hover {
		border-color: ${(p) => p.theme.gwen.colors.background.header};
	}
`
const EmptyAvatar = styled.div`
	width: ${(p) => `calc(50% - ${p.theme.proportions(30)}px)`};
	max-width: ${(p) => p.theme.proportions(156)}px;
	height: ${(p) => p.theme.proportions(156)}px;
`
const AvatarCheck = styled.div`
	position: absolute;
	top: -${(p) => p.theme.proportions(5)}px;
	right: -0px;
	width: ${(p) => p.theme.proportions(35)}px;
	height: ${(p) => p.theme.proportions(35)}px;
	background: ${(p) => p.theme.gwen.colors.background.header};
	font-size: ${(p) => p.theme.proportions(25)}px;
	padding: ${(p) => p.theme.proportions(4)}px;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 100%;
		height: auto;
	}
`

const Checkmark = styled(Check)`
	path {
		fill: ${(p) => p.theme.gwen.colors.success};
	}
`
