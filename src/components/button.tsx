import React from "react"
import styled, { DefaultTheme } from "styled-components"
import { Color } from "../utils/color"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	widthFactor?: number
	heightFactor?: number
	type?: "default" | "success"
	cyString?: string
	disabled: boolean
}

export class Button extends React.PureComponent<Props> {
	/* eslint-disable-next-line react/static-property-placement */
	static defaultProps: Props = {
		widthFactor: 80,
		heightFactor: 40,
		type: "default",
		disabled: false,
	}

	render() {
		const { onClick, cyString, ...restprops } = this.props
		return (
			<ButtonWrapper
				{...restprops}
				onClick={(event) => (!this.props.disabled && onClick ? onClick(event) : undefined)}
				data-cy={`${cyString ? `${cyString}-` : ""}button`}
			/>
		)
	}
}

type ButtonWrapperProps = { theme: DefaultTheme; disabled: boolean; widthFactor?: number; heightFactor?: number } & Props

const ButtonWrapper = styled.div`
	width: ${(p: ButtonWrapperProps) => p.theme.proportions(p.widthFactor as number)}px;
	height: ${(p: ButtonWrapperProps) => p.theme.proportions(p.heightFactor as number)}px;
	line-height: ${(p: ButtonWrapperProps) => p.theme.proportions(p.heightFactor as number)}px;
	font-size: ${(p: ButtonWrapperProps) => p.theme.proportions(17)}px;
	text-transform: uppercase;
	font-weight: 600;
	border-radius: ${(p: ButtonWrapperProps) => p.theme.proportions(8)}px;
	margin: ${(p: ButtonWrapperProps) => p.theme.proportions(2.4)}px auto 0 auto;
	box-shadow: ${(p: ButtonWrapperProps) => p.theme.gwen.boxShadow.default(p.theme.scale)};
	user-select: none;
	text-align: center;
	cursor: ${(p: ButtonWrapperProps) => (p.disabled ? "default" : "pointer")};
	background: ${(p: ButtonWrapperProps) => {
		if (p.disabled) {
			return p.theme.gwen.colors.inactive
		}
		return p.type === "success" ? p.theme.gwen.colors.button.next : p.theme.gwen.colors.button.default
	}};
	opacity: ${(p: ButtonWrapperProps) => (p.disabled ? 0.5 : 1)};
	color: ${(p: ButtonWrapperProps) => (p.type === "success" ? p.theme.gwen.colors.text.success : p.theme.gwen.colors.text.primary)};
	&:hover {
		background: ${(p: ButtonWrapperProps) =>
			p.disabled ? p.theme.gwen.colors.inactive : Color.darken(p.type === "success" ? p.theme.gwen.colors.secondary : p.theme.gwen.colors.text.success)};
	}
`
