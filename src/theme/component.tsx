import React from "react"
import styled, { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./global"
import { GwenTheme } from "./theme"

interface Props {
	children?: JSX.Element | JSX.Element[]
	scale?: number
}

export class WrapperComponent extends React.PureComponent<Props> {
	render() {
		const GS = GlobalStyle()
		const scale = this.props.scale || 1
		return (
			<ThemeProvider
				theme={{ gwen: GwenTheme.gwen, scale, proportions: (times: number, manualScale?: number) => times * (manualScale || this.props.scale || 1) }}
			>
				<GwenWrapper className="gwen">
					<GS />
					{this.props.children}
				</GwenWrapper>
			</ThemeProvider>
		)
	}
}

const GwenWrapper = styled.div`
	height: 100%;
	width: 100%;
`
