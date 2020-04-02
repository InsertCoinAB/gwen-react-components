import React from "react"
import styled, { DefaultTheme } from "styled-components"
import { Currency } from "../../types"

interface Props {
	type: Currency
	amount?: number
	icon?: string
	description?: string
	size?: number
}
interface State {
	clicks: number
}

export class Reward extends React.PureComponent<Props, State> {
	state: State = { clicks: 0 }

	easterEgg() {
		this.setState((prevState: Readonly<State>) => ({ ...prevState, clicks: prevState.clicks + 1 }))
	}

	icon() {
		return this.props.icon || `https://gwen.insertcoin.se/widget/images/currency/${this.props.type}.svg`
	}

	render() {
		const size = this.props.size || 80
		return (
			<Wrapper onClick={() => this.easterEgg()} size={size} amount={typeof this.props.amount === "number"}>
				{typeof this.props.amount === "number" && (
					<Amount size={size}>
						<span>{this.props.amount}</span>
					</Amount>
				)}
				<Icon size={size} src={this.icon()} alt="icon" />
				<Description size={size}>{this.props.description}</Description>
				{this.state.clicks >= 10 && <EasterEgg size={size} />}
			</Wrapper>
		)
	}
}

interface WrapperProps {
	theme: DefaultTheme
	size: number
	amount: boolean
}
const Wrapper = styled.div`
	position: relative;
	margin: auto;
	margin-top: ${(p: WrapperProps) => (p.amount ? `${p.theme.proportions(p.size * 0.2)}px` : "0")};
	margin-bottom: ${(p: WrapperProps) => p.theme.proportions(p.size * 0.3)}px;
	border-radius: 100%;
	width: ${(p: WrapperProps) => p.theme.proportions(p.size)}px;
	height: ${(p: WrapperProps) => p.theme.proportions(p.size)}px;
	user-select: none;
`
interface SizeProps {
	theme: DefaultTheme
	size: number
}

const Icon = styled.img`
	display: block;
	width: ${(props: SizeProps) => props.theme.proportions(props.size)}px;
	height: ${(props: SizeProps) => props.theme.proportions(props.size)}px;
	object-fit: contain;
`
const Amount = styled.div`
	display: flex;
	position: absolute;
	top: -20%;
	width: 100%;
	span {
		display: inline-block;
		margin: auto;
		background: ${(p) => p.theme.gwen.colors.background.badge};
		font-size: ${(p: SizeProps) => p.theme.proportions(p.size * 0.175)}px;
		line-height: ${(p: SizeProps) => p.theme.proportions(p.size * 0.2)}px;
		padding: ${(p: SizeProps) => p.theme.proportions(p.size * 0.075)}px ${(p) => p.theme.proportions(p.size * 0.125)}px;
		border-radius: ${(p: SizeProps) => p.theme.proportions(p.size * 0.075)}px;
		box-shadow: ${(p) => p.theme.gwen.boxShadow.default(p.theme.scale)};
	}
`
const Description = styled.div`
	display: flex;
	color: ${(p) => p.theme.gwen.colors.text.secondary};
	font-size: ${(p: SizeProps) => p.theme.proportions(p.size * 0.175)}px;
	line-height: ${(p: SizeProps) => p.theme.proportions(p.size * 0.175)}px;
	font-weight: 400;
	margin-top: ${(p: SizeProps) => p.theme.proportions(p.size * 0.075)}px;
	text-transform: capitalize;
	white-space: nowrap;
	justify-content: center;
`
const EasterEgg = styled.i`
	position: absolute;
	top: 1%;
	left: 1%;
	overflow: hidden;
	width: 102%;
	height: 102%;
	border-radius: 100%;
	&:before,
	&:after {
		position: absolute;
		display: block;
		right: 0;
		content: "";
		width: 0;
		height: 0;
		animation: eatAnimation 1s infinite;
		border-left: ${(p: SizeProps) => p.theme.proportions(p.size * 0.5)}px solid transparent;
	}
	&:before {
		top: 50%;
		border-top: 0 solid ${(p) => p.theme.gwen.colors.background.default};
	}
	&:after {
		bottom: 50%;
		border-bottom: 0 solid ${(p) => p.theme.gwen.colors.background.default};
	}
	@keyframes eatAnimation {
		0% {
			border-top-width: 0;
			border-bottom-width: 0;
		}
		50% {
			border-top-width: ${(p: SizeProps) => p.theme.proportions(p.size * 0.5)}px;
			border-bottom-width: ${(p: SizeProps) => p.theme.proportions(p.size * 0.5)}px;
		}
		100% {
			border-top-width: 0;
			border-bottom-width: 0;
		}
	}
`
